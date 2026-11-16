// Five circular petals joined to a central ring. A real vector outline, with no bitmap or filter.
const center = 64, ring = 32, distance = 41, petal = 23;
const join = Math.acos((ring * ring + distance * distance - petal * petal) / (2 * ring * distance));
const point = (angle: number) => `${(center + ring * Math.cos(angle)).toFixed(4)} ${(center + ring * Math.sin(angle)).toFixed(4)}`;
export const FLOWER_PATH = Array.from({ length: 5 }, (_, i) => {
  const angle = -Math.PI / 2 + i * Math.PI * 2 / 5;
  return `${i === 0 ? 'M' : 'L'}${point(angle - join)} A23 23 0 1 1 ${point(angle + join)} A32 32 0 0 1 ${point(angle + Math.PI * 2 / 5 - join)}`;
}).join(' ') + ' Z M84 64 A20 20 0 1 0 44 64 A20 20 0 1 0 84 64 Z';
