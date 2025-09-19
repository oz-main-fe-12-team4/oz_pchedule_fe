import React from "react";
import Button from "./Button";
import { FILTER_LABELS } from "../constants/filterList";

const FilterButtons = ({ onFilterToggle }) => {
  const KEYS = ["category", "latest", "priority"];
  return (
    <div className="flex w-[300px] gap-2 shrink-0">
      {KEYS.map((key) => (
        <div key={key}>
          <Button
            variant="category"
            onClick={() => onFilterToggle(key)}
            type="button"
          >
            {FILTER_LABELS[key]}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FilterButtons;
