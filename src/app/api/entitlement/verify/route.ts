import { GET } from '../../reports/route';
export { GET };
// A checkout return parameter never grants entitlement. Only signed webhooks do.
export async function POST() { return Response.json({ error: 'Use the authenticated report endpoint.' }, { status: 410 }); }
