// api명세서 => YYYY-M-D HH:mm:ss

// 문자열을 Date형식으로 바꾸기
export const toDate = (value) => {
  if (value instanceof Date) return value;
  if (typeof value !== "string") return new Date();

  // 문자열로 바꾸고 나서 날짜와 시간 분리하기
  const splitText = value.replace(/\s+/g, " ").trim();
  const [ymd, hms] = splitText.split(" ");
  const [y, m, d] = ymd.split("-").map((n) => String(n).padStart(2, "0"));
  const hmsToString = `${y}-${m}-${d}${hms ? "T" + hms : ""}`;

  const dateObj = new Date(hmsToString);
  return isNaN(dateObj.getTime()) ? new Date() : dateObj;
};

// 날짜와 시간을 문자열로 바꾸기
export const toTime = (value) => {
  const date = toDate(value);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// 시간을 00:00 형식으로 만들기
export const toTimeString = (value) => {
  const date = toDate(value);
  return date.toTimeString().slice(0, 5);
};
