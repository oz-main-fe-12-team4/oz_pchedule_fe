export const getColorOfPriority = (priority) => {
  switch (priority) {
    case "긴급":
      return "border-red-500";
    case "높음":
      return "border-orange-400";
    case "중간":
      return "border-yellow-400";
    case "낮음":
      return "border-green-400";
    case "보류":
      return "border-blue-300";
    default:
      return "border-gray-200";
  }
};
