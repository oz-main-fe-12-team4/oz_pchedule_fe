import React from "react";
import Button from "./Button";
import { FILTER_LABELS } from "../constants/filterList";

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
