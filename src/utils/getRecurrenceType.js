export const getRecurrenceType = (type) => {
  switch (type) {
    case "daily":
      return "매일";
    case "weekly":
      return "매주";
    case "monthly":
      return "매달";
    case "yearly":
      return "매년";
  }
};
