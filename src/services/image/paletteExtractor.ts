import { ColorSwatch } from '../../types/visualDNA';

// Extract real color palette from any image element or data URL
export async function extractPaletteFromImage(imageSrc: string): Promise<{
  palette: ColorSwatch[];
  averageLuminance: number;
  densityScore: number;
}> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const sampleSize = 100;
      canvas.width = sampleSize;
      canvas.height = sampleSize;

      if (!ctx) {
        resolve({
          palette: defaultFallbackPalette(),
          averageLuminance: 0.2,
          densityScore: 50,
        });
        return;
      }

      ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
      const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      const data = imageData.data;

      // Color bucket map
      const colorCounts: { [hex: string]: { count: number; r: number; g: number; b: number } } = {};
      let totalLuminance = 0;
      let nonZeroPixels = 0;

      for (let i = 0; i < data.length; i += 16) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a < 128) continue; // Skip transparent

        // Quantize colors (steps of 24)
        const qr = Math.round(r / 24) * 24;
        const qg = Math.round(g / 24) * 24;
        const qb = Math.round(b / 24) * 24;
        const hex = rgbToHex(qr, qg, qb);

        if (!colorCounts[hex]) {
          colorCounts[hex] = { count: 0, r: qr, g: qg, b: qb };
        }
        colorCounts[hex].count++;

        // Luminance calculation
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        totalLuminance += lum;
        nonZeroPixels++;
      }

      // Sort by frequency
      const sortedColors = Object.values(colorCounts).sort((a, b) => b.count - a.count);
      const avgLum = nonZeroPixels > 0 ? totalLuminance / nonZeroPixels : 0.3;

      // Pick top 4 distinct swatches
      const distinctSwatches: ColorSwatch[] = [];
      const roles: ColorSwatch['role'][] = ['Background', 'Dominant', 'Accent', 'Secondary'];

      for (const item of sortedColors) {
        if (distinctSwatches.length >= 4) break;

        const isDistinct = distinctSwatches.every((existing) => {
          const hex = rgbToHex(item.r, item.g, item.b);
          return colorDistance(hex, existing.hex) > 40;
        });

        if (isDistinct || distinctSwatches.length === 0) {
          const hex = rgbToHex(item.r, item.g, item.b);
          const role = roles[distinctSwatches.length] || 'Neutral';
          distinctSwatches.push({
            hex,
            name: getColorDescriptor(item.r, item.g, item.b),
            role,
            rgb: `rgb(${item.r}, ${item.g}, ${item.b})`,
            harmony: getHarmonyRole(distinctSwatches.length, hex),
          });
        }
      }

      // If we couldn't get 4 distinct colors, fill from fallback
      while (distinctSwatches.length < 4) {
        distinctSwatches.push(defaultFallbackPalette()[distinctSwatches.length]);
      }

      // Estimate visual density based on color entropy
      const densityScore = Math.min(95, Math.max(25, Math.round(Object.keys(colorCounts).length * 1.8)));

      resolve({
        palette: distinctSwatches,
        averageLuminance: avgLum,
        densityScore,
      });
    };

    img.onerror = () => {
      resolve({
        palette: defaultFallbackPalette(),
        averageLuminance: 0.2,
        densityScore: 50,
      });
    };
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = Math.min(255, Math.max(0, c)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function colorDistance(hex1: string, hex2: string): number {
  const c1 = hexToRgb(hex1);
  const c2 = hexToRgb(hex2);
  if (!c1 || !c2) return 100;
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function getColorDescriptor(r: number, g: number, b: number): string {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  if (lum < 30) return 'Obsidian Void';
  if (lum > 220) return 'Luminous White';

  if (r > g + 40 && r > b + 40) return 'Crimson Vermilion';
  if (g > r + 30 && g > b + 30) return 'Emerald Canopy';
  if (b > r + 30 && b > g + 30) return 'Midnight Cobalt';
  if (r > 180 && g > 150 && b < 100) return 'Celestial Gold';
  if (g > 160 && b > 160 && r < 100) return 'Ethereal Cyan';
  if (r > 120 && g < 80 && b > 120) return 'Amethyst Violet';
  if (r > 130 && g > 110 && b < 90) return 'Amber Ochre';
  return 'Tonal Neutral';
}

function getHarmonyRole(index: number, _hex: string): string {
  const harmonies = ['Base Foundation', 'Primary Energy', 'Luminous Contrast', 'Supporting Neutral'];
  return harmonies[index] || 'Harmonic Complement';
}

function defaultFallbackPalette(): ColorSwatch[] {
  return [
    { hex: '#08090d', name: 'Obsidian Black', role: 'Background', harmony: 'Base Foundation' },
    { hex: '#e5c158', name: 'Celestial Gold', role: 'Dominant', harmony: 'Primary Energy' },
    { hex: '#4ee0d8', name: 'Ethereal Cyan', role: 'Accent', harmony: 'Luminous Contrast' },
    { hex: '#9da4b8', name: 'Slate Silver', role: 'Secondary', harmony: 'Supporting Neutral' },
  ];
}
