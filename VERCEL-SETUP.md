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

本次不接入或更改真实支付。支付接入前的预览解锁设置见 `REPORT-FLOW.md`。
