import React from "react";
import { Button } from "./Button";

const FILTER_LABELS = {
  category: "카테고리",
  priority: "중요도",
  share: "공유",
  repeat: "반복",
  latest: "최신순",
};

const FilterButtons = ({ onFilterToggle }) => {
  return (
    <div className="flex w-[300px] gap-2 shrink-0">
      {Object.entries(FILTER_LABELS).map(([key, label]) => (
        <div key={key}>
          <Button
            variant="category"
            onClick={() => onFilterToggle(key)}
            type="button"
          >
            {label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;
