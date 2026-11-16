'use client';
import { FLOWER_PATH } from '../../lib/brandFlower';
export function BrandFlower({className='',color='#d64c24',size=24}:{className?:string;color?:string;size?:number}) {
    return <svg className={className} width={size} height={size} viewBox="0 0 128 128" aria-hidden="true" focusable="false">
        <path d={FLOWER_PATH} fill={color} fillRule="evenodd"/>
    </svg>;
}
