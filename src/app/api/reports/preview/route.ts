import {NextRequest,NextResponse} from 'next/server';
import {previewModeEnabled,unlockPreview} from '../../../../lib/reports';
export const dynamic='force-dynamic';
export async function POST(req:NextRequest){
 if(!previewModeEnabled())return NextResponse.json({error:'Preview unlock is unavailable.'},{status:404});
 try{const {token}=await req.json();return NextResponse.json(await unlockPreview(token||''),{headers:{'Cache-Control':'no-store'}});}catch{return NextResponse.json({error:'Unable to unlock this preview. Use the initiating person’s private link.'},{status:403});}
}
