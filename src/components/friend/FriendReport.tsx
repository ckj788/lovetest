'use client';
import {FriendFull} from '../../types/report';
import {PremiumFriendReport} from '../report/PremiumFriendReport';
export function FriendReport({result}:{result:FriendFull}){return <PremiumFriendReport result={result}/>;}
