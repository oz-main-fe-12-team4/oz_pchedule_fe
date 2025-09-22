const RenderRecurrenceByType = ({ recurrence }) => {
  switch (recurrence.type) {
    case "daily":
      return "";
    case "weekly":
      return recurrence.weekdays.map((day, i) => <span key={i}>{day} </span>);
    case "monthly":
      return recurrence.day_of_month + "일";
    case "yearly":
      return `${recurrence.month_of_year}월 ${recurrence.day_of_month}일`;
  }
};

export default RenderRecurrenceByType;
