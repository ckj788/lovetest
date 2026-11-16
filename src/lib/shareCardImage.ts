import { FLOWER_PATH } from './brandFlower';

export interface ShareCardContent { title: string; caption: string; symbol: string }

// Pure text layout also handles long words and languages without spaces.
export function wrapCardText(text: string, maxWidth: number, measure: (value: string) => number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\r?\n/)) {
    let line = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (line && measure(line + ' ' + word) > maxWidth) { lines.push(line); line = ''; }
      if (measure(word) > maxWidth) {
        if (line) { lines.push(line); line = ''; }
        for (const char of Array.from(word)) {
          if (line && measure(line + char) > maxWidth) { lines.push(line); line = ''; }
          line += char;
        }
      } else line += (line ? ' ' : '') + word;
    }
    if (line) lines.push(line);
  }
  return lines;
}

export async function createShareCardImage(content: ShareCardContent): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Image creation is unavailable.');
  ctx.fillStyle = '#504e76'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#c4c3e3'; ctx.lineWidth = 2; ctx.strokeRect(48, 48, 984, 1824);
  ctx.fillStyle = '#fdf8e2'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = '600 38px Arial, sans-serif'; ctx.fillText('mixedsigns', 540, 170);
  ctx.save(); ctx.translate(444, 330); ctx.scale(1.5, 1.5); ctx.fill(new Path2D(FLOWER_PATH), 'evenodd'); ctx.restore();
  const textSymbol = /^[✳✿✦✻]$/.test(content.symbol);
  ctx.font = textSymbol ? '80px Georgia, serif' : '80px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
  ctx.fillText(content.symbol + (textSymbol ? '\uFE0E' : ''), 540, 650);
  const fit = (text: string, start: number, limit: number, serif: boolean) => {
    let size = start, lines: string[];
    do {
      ctx.font = serif ? `italic ${size}px Georgia, serif` : `${size}px Arial, sans-serif`;
      lines = wrapCardText(text, 860, value => ctx.measureText(value).width);
      if (lines.length * size * 1.35 <= limit || size <= 12) break;
      size -= 2;
    } while (true);
    return { lines, size };
  };
  const title = fit(content.title, 88, 410, true);
  let y = 790;
  for (const line of title.lines) { ctx.fillText(line, 540, y); y += title.size * 1.35; }
  const caption = fit(content.caption, 43, 390, false);
  y = Math.max(1100, y + 55);
  for (const line of caption.lines) { ctx.fillText(line, 540, y); y += caption.size * 1.35; }
  ctx.font = '30px Arial, sans-serif'; ctx.fillStyle = '#e1dff1';
  ctx.fillText('A little less guessing.', 540, 1710); ctx.fillText('A little more clarity.', 540, 1755);
  return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Image creation failed.')), 'image/png'));
}
