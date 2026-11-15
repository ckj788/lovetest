'use client';
import { useId } from 'react';

// Figma's text-layer export includes its artboard color. Remove that color at
// render time so the original glyph can sit on cream, lilac, and report cards.
export function BrandFlower({className='',color='#d64c24',size=24}:{className?:string;color?:string;size?:number}) {
    const filterId='flower-'+useId().replace(/:/g,'');
    return <svg className={className} width={size} height={size} viewBox="0 0 126 122" aria-hidden="true" focusable="false">
        <defs><filter id={filterId} colorInterpolationFilters="sRGB"><feColorMatrix result="previous-alpha" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 -2.361111 0 2.092593"/><feFlood floodColor={color}/><feComposite operator="in" in2="previous-alpha"/></filter></defs>
        <image href="/design/flower-ink.png" width="126" height="122" filter={'url(#'+filterId+')'}/>
    </svg>;
}
