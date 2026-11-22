# 好友模式：Vercel 存储配置

好友模式需要共享存储，才能让另一台设备打开邀请、提交答案，并让第一人看到完成状态。Vercel 的函数内存和本地文件不能保证持久保存或跨实例同步；仅重新部署不会解决缺少存储的问题。

## 一次性配置

1. 打开 Vercel 中的 lovetest 项目，进入 **Storage**，创建或连接 **Upstash Redis**，确保连接的是当前项目，并用于 **Production**。如果已有数据库，直接连接，不需要新建第二个。
2. 在项目 **Settings → Environment Variables** 检查下面任意一组完整的变量。Vercel 集成通常会自动加入。不要使用 read-only token。

   - `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`
   - 或 `KV_REST_API_URL` 和 `KV_REST_API_TOKEN`

3. 在自己的终端运行下面命令生成密钥，再把输出填入 Vercel 的 `DATA_ENCRYPTION_KEY`，选择 **Production**。不要提交到 GitHub 或发到聊天中。保存好密钥，以后重新部署时保持相同；更换它会导致旧报告无法解密。

   ```sh
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. 在 **Deployments** 重新部署最新版本。Vercel 新增环境变量后，已运行的部署不会自动使用它们。

## 验证

- 打开 `https://lovetest-nu-seven.vercel.app/api/reports/availability`，应返回 `{"available":true}`。它会实际读取 Redis，验证配置和连通性；不会返回密钥或创建答题记录。
- 第一台设备完成 8 题，看到邀请链接；第二台设备或无痕窗口打开邀请并完成 8 题。第一人刷新状态后应显示两人已完成。完整报告仍遵循当前解锁规则；连接 Redis 本身不表示已经付款。
- 配置缺失时，首页会提前说明好友邀请尚不可用，避免答到第 8 题才发现问题。网络中途失败会保留最后一题，提供重试；未完成答案按邀请分别保存在当前浏览器 7 天。

## Stripe 收款

1. 在 Stripe Workbench 的 Webhooks 中添加当前生产域名的 `/api/stripe/webhook`。例如生产域名仍为 `lovetest-nu-seven.vercel.app` 时，填写 `https://lovetest-nu-seven.vercel.app/api/stripe/webhook`。订阅 `checkout.session.completed`、`checkout.session.async_payment_succeeded` 和 `charge.refunded`。
2. 在 Vercel 的 Production 环境变量中确认 `STRIPE_SECRET_KEY`，并将该 Webhook 的签名密钥存入 `STRIPE_WEBHOOK_SECRET`。两个密钥须来自同一 Stripe 账号和模式。将 `APP_URL` 设为网站生产地址，尤其是在使用自定义主域名时。Vercel 提供生产域名系统变量时，应用可用它生成回跳地址。
3. 重新部署最新代码。Solo 一次支付 $7.99。Bestie 在双方答完后由发起人支付 $9.99，一次为双方解锁。

### 在正式域名测试 Stripe 沙盒

在 Vercel 的 Production 环境设置 `STRIPE_ALLOW_TEST_CHECKOUT=true`，将 `STRIPE_SECRET_KEY` 设为 Stripe 沙盒的服务端密钥并重新部署。期间所有访客的付款入口都会切到测试模式，页面会显示测试标记。可以用测试卡完成付款，回到报告页后，服务端从 Stripe 查询已保存的 Checkout Session，确认付款后才会解锁。

保留 `STRIPE_WEBHOOK_SECRET` 对应正式 Webhook。需要验证沙盒的异步通知或退款时，在同一个 Stripe 沙盒创建指向 `/api/stripe/webhook` 的端点，订阅上述三个事件，并把签名密钥填入 `STRIPE_TEST_WEBHOOK_SECRET`。结束测试时，恢复正式服务端密钥并重新部署。`STRIPE_ALLOW_TEST_CHECKOUT` 只对测试密钥生效。已生成收银台链接的旧报告需使用原模式处理，新订单请重新开始一份测试。

本地联调时，在 `.env.development.local` 将 `STRIPE_SECRET_KEY` 设置为 Stripe 沙盒的测试密钥，重启开发服务即可从报告页打开 Stripe 测试收银台。若要验证 Webhook 和退款，再运行 `stripe listen --forward-to localhost:3008/api/stripe/webhook` 并将监听器的签名密钥存入该文件的 `STRIPE_WEBHOOK_SECRET`。
