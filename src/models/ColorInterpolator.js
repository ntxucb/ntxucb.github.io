export default function interpolateColors(color1, color2, t = 0) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const hsv1 = rgbToHsv(rgb1.r, rgb1.g, rgb1.b);
  const hsv2 = rgbToHsv(rgb2.r, rgb2.g, rgb2.b);

  // console.log(hsv1, hsv2)
  // console.log(t)
  t = Math.max(0, Math.min(1, t));
  const easedT = Math.max(0, Math.min(1, 3 * t * t - 2 * t * t * t));
  const a = 1;
  const b = 5;
  const easedH = Math.max(0, Math.min(Math.exp(b * (t - a)) - 0.1, 1));
  const h = interpolateHue(hsv1.h, hsv2.h, easedH);
  const s = cubicInterpolate(hsv1.s, hsv2.s, easedH);
  const v = cubicInterpolate(hsv1.v, hsv2.v, easedT);
  const rgb = hsvToRgb(h, s, v);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

function rgbToHsv(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    v = max;
  const d = max - min;

  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h: (h + 360) % 360, s, v };
}

function hsvToRgb(h, s, v) {
  h = (h % 360) / 60;
  const c = v * s;
  const x = c * (1 - Math.abs((h % 2) - 1));
  const m = v - c;
  let [r, g, b] = [0, 0, 0];

  if (0 <= h && h < 1) [r, g, b] = [c, x, 0];
  else if (h < 2) [r, g, b] = [x, c, 0];
  else if (h < 3) [r, g, b] = [0, c, x];
  else if (h < 4) [r, g, b] = [0, x, c];
  else if (h < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function interpolateHue(h1, h2, t) {
  const d = ((h1 - h2 + 180) % 360) - 180;
  return (h1 - d * t + 360) % 360;
}

function cubicInterpolate(a, b, t) {
  return a + (b - a) * t;
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}
