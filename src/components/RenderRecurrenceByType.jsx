const RenderRecurrenceByType = ({ recurrence }) => {
  switch (recurrence.type) {
    case "DAILY":
      return "";
    case "WEEKLY":
      return recurrence.weekdays.map((day, i) => <span key={i}>{day} </span>);
    case "MONTHLY":
      return recurrence.day_of_month + "일";
    case "YEARLY":
      return `${recurrence.month_of_year}월 ${recurrence.day_of_month}일`;
  }
};

export default RenderRecurrenceByType;
