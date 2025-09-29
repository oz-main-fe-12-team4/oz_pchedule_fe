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

// 날짜와 기간을 합쳐서 api 보낼때
export const toApiDate = (dateObj, timeString) => {
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = dateObj.getDate();
  return `${y}-${m}-${d} ${timeString}:00`;
};

// 수정 모달창에서 제한된 기간으로 설정하기
export const toPeriod = (dateInput, min, max) => {
  const date = toDate(dateInput);
  if (min && date < min) return min;
  if (max && date > max) return max;
  return date;
};

//반복 필터링을 api 보낼때
export const recurrenceToArgs = ({ repeat = "none", repeatSub } = {}) => {
  const isRecurrence = repeat !== "none";
  const recurrenceType = repeat;

  let recurrenceWeekdays = [];
  let recurrenceDay = "";
  let recurrenceMonth = "";

  switch (repeat) {
    case "weekly":
      recurrenceWeekdays = Array.isArray(repeatSub) ? repeatSub : [];
      break;

    case "monthly":
      recurrenceDay = String(
        Array.isArray(repeatSub) ? repeatSub[0] ?? "" : repeatSub ?? ""
      );
      break;

    case "yearly":
      if (Array.isArray(repeatSub)) {
        recurrenceMonth = String(repeatSub[0] ?? "");
        recurrenceDay = String(repeatSub[1] ?? "");
      } else if (repeatSub && typeof repeatSub === "object") {
        recurrenceMonth = String(repeatSub.month ?? repeatSub.months ?? "");
        recurrenceDay = String(repeatSub.day ?? repeatSub.days ?? "");
      }
      break;

    default:
      break;
  }

  return {
    isRecurrence,
    recurrenceType,
    recurrenceWeekdays,
    recurrenceDay,
    recurrenceMonth,
  };
};
