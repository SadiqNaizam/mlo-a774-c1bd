/**
 * Converts an HSL color value string to a HEX color string.
 * Assumes hsl is in the format "H S% L%".
 * @param {string} hsl - The HSL color string.
 * @returns {string} The HEX color string.
 */
export const hslToHex = (hsl: string): string => {
  const [h, s, l] = hsl.split(' ').map((val, i) => {
    if (i === 0) return parseFloat(val); // Hue
    return parseFloat(val.replace('%', '')); // Saturation & Lightness
  });

  const sNormalized = s / 100;
  const lNormalized = l / 100;

  const c = (1 - Math.abs(2 * lNormalized - 1)) * sNormalized;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNormalized - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const toHex = (c: number) => c.toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Converts a HEX color string to an HSL color value string.
 * @param {string} hex - The HEX color string.
 * @returns {string} The HSL color string in the format "H S% L%".
 */
export const hexToHsl = (hex: string): string => {
  const formattedHex = hex.replace(/^#/, '');
  const fullHex = formattedHex.length === 3 ? formattedHex.split('').map(c => c + c).join('') : formattedHex;

  const r = parseInt(fullHex.substring(0, 2), 16) / 255;
  const g = parseInt(fullHex.substring(2, 4), 16) / 255;
  const b = parseInt(fullHex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};