// api명세서 =>
// startDate: Wed Oct 01 2025 11:02:11 GMT+0900 (한국 표준시) {}
// endDate: Wed Oct 01 2025 11:02:11 GMT+0900 (한국 표준시) {}
// startTime: "00:00"
// endTime: "23:59"

// 문자열을 Date형식으로 바꾸기
export const toDate = (value) => {
  if (!value) return new Date();
  if (value instanceof Date) return value;

  // 문자열로 바꾸고 나서 날짜와 시간 분리하기
  const splitText = value.replace(/\s+/g, " ").trim();
  const [ymd, hms] = splitText.split(" ");
  const [y, m, d] = ymd.split("-").map((n) => String(n).padStart(2, "0"));
  const hmsToString = `${y}-${m}-${d}${hms ? "T" + hms : ""}`;

  const dateObj = new Date(hmsToString);
  return isNaN(dateObj.getTime()) ? new Date() : dateObj;
};

// 시간을 00:00 형식으로 만들기
export const toTimeString = (value) => {
  const date = toDate(value);
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

// 날짜와 시간을 문자열로 바꾸기
export const toTime = (value) => {
  if (!value) return "날짜 없음";
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) return "날짜 없음";
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// 날짜와 기간을 합쳐서 api 보낼때
export const toApiDate = (dateInput, timeString = "00:00:00") => {
  const date = toDate(dateInput); // 이미 있는 toDate 재사용
  if (!date) return "";

  const [hh = "00", mm = "00", ss = "00"] = String(timeString).split(":");
  const local = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(hh),
    Number(mm),
    Number(ss)
  );
  return local.toISOString();
};

// period에서 문자열로 시간만 가져오기
export const toApiTime = (TimeInput) => {
  if (!TimeInput) return "00:00";
  const dateObj = new Date(TimeInput);
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

// 수정 모달창에서 제한된 기간으로 설정하기
export const toPeriod = (dateInput, min, max) => {
  const date = toDate(dateInput);
  const minD = min ? toDate(min) : null;
  const mixD = max ? toDate(max) : null;
  if (minD && date < minD) return minD;
  if (mixD && date > mixD) return mixD;
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
