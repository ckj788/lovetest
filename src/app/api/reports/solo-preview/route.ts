import {NextRequest,NextResponse} from 'next/server';
import {validAnswers} from '../../../../lib/reports';
import {soloBrowserReport} from '../../../../lib/soloBrowserReport';
export const dynamic='force-dynamic';
export async function POST(req:NextRequest){try{const {answers,unlock}=await req.json();if(!validAnswers('solo',answers))return NextResponse.json({error:'Please answer all eight questions.'},{status:400});return NextResponse.json(soloBrowserReport(answers,unlock===true),{headers:{'Cache-Control':'no-store'}});}catch{return NextResponse.json({error:'Unable to generate your result. Please retry.'},{status:400});}}
