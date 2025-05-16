import Color from 'color';

// 색상의 밝기를 계산하는 상수
const BRIGHTNESS_THRESHOLD = 125; // 어두운 색상 기준점
const RED_WEIGHT = 299;
const GREEN_WEIGHT = 587; 
const BLUE_WEIGHT = 114;
const BRIGHTNESS_DIVISOR = 1000;

type colorThiefRGB = [number, number, number];

const isDark = ([r, g, b]: colorThiefRGB) => {
  const brightness = (r * RED_WEIGHT + g * GREEN_WEIGHT + b * BLUE_WEIGHT) / BRIGHTNESS_DIVISOR;
  return brightness < BRIGHTNESS_THRESHOLD;
};


const brightenColor = (rgb: colorThiefRGB) => {
  if (!isDark(rgb)) {
    return rgb;
  }

  const [r, g, b] = rgb;
  return Color(`rgb(${r}, ${g}, ${b})`)
    .lighten(0.4)
    .saturate(0.1)
    .rgb()
    .array();
};

export {
  brightenColor
}