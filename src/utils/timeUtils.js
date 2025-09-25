const pad = (n) => n.toString().padStart(2, "0");

// 값이 최소/최대 범위를 벗어나지 않도록 제한
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

// 시간 객체를 분 단위로 변환 {h: 13, m: 45} → 825
const toMinutes = ({ h, m }) => h * 60 + m;

// 분 단위를 시간 객체로 변환 825 → {h: 13, m: 45}
const fromMinutes = (minutes) => {
  const h = Math.floor(minutes / 60) % 24;
  const m = minutes % 60;
  return { h, m };
};

// HH:mm 형식 문자열을 시간 객체로 변환  {h: , m: }
const parseInput = (value) => {
  const input = value.trim();
  const match = input.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  if (!match) return null;
  return { h: Number(match[1]), m: Number(match[2]) };
};

// 시간 객체를 HH:mm 문자열로 변환 "13:45"
const formatTime = (h, m) => `${pad(h)}:${pad(m)}`;

// 지정한 step 단위로 분을 반올림
const snapToStep = (minutes, step) => Math.round(minutes / step) * step;

export default {
  pad,
  clamp,
  toMinutes,
  fromMinutes,
  parseInput,
  formatTime,
  snapToStep,
};
