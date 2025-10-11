export const getRecurrenceType = (type) => {
  switch (type) {
    case "DAILY":
      return "매일";
    case "WEEKLY":
      return "매주";
    case "MONTHLY":
      return "매달";
    case "YEARLY":
      return "매년";
  }
};
