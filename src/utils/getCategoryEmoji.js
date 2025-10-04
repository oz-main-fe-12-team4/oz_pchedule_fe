export const getCategoryEmoji = (category) => {
  switch (category) {
    case "daily":
      return "🏠";
    case "hobby":
      return "🎨";
    case "travel":
      return "✈️";
    case "learning":
      return "📚";
    case "event":
      return "🎉";
    case "other":
      return "🌀";
  }
};
