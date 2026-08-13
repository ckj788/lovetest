'use client';

import React from 'react';

export const CelestialArt: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer 1px Orbit Circle */}
      <div className="absolute inset-0 rounded-full border border-zinc-800 animate-spin-slow" />
      
      {/* Second 1px Dashed Orbit Circle */}
      <div className="absolute inset-4 rounded-full border border-dashed border-zinc-700/60" />
      
      {/* Inner 1px Circle */}
      <div className="absolute inset-10 rounded-full border border-zinc-800" />
      
      {/* Center 1px Crosshair Axis */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-zinc-800/80" />
        <div className="absolute h-full w-[1px] bg-zinc-800/80" />
      </div>

      {/* Planetary Orbit Points */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 bg-black px-1">
        ☉
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[10px] font-mono text-zinc-500 bg-black px-1">
        ☽
      </div>
      <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 bg-black px-1">
        ♀
      </div>
      <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-500 bg-black px-1">
        ♂
      </div>

      {/* Center Star Marker */}
      <div className="relative text-white font-mono text-lg z-10">✦</div>
    </div>
  );
};
