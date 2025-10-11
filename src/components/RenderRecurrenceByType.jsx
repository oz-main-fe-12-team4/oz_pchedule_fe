const RenderRecurrenceByType = ({ endPeriod, recurrence }) => {
  switch (recurrence.recurrence_type) {
    case "DAILY":
      return `~ ${new Date(endPeriod).getFullYear()}.${
        new Date(endPeriod).getMonth() + 1
      }.${new Date(endPeriod).getDate()}`;
    case "WEEKLY":
      return recurrence.weekdays.map((day, i) => <span key={i}>{day} </span>);
    case "MONTHLY":
      return recurrence.day_of_month + "일";
    case "YEARLY":
      return `${recurrence.month_of_year}월 ${recurrence.day_of_month}일`;
  }
};

export default RenderRecurrenceByType;
