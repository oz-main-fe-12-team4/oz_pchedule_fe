import Button from "./Button";
import { FILTER_LABELS, FILTERS } from "../../constants/filterList";

const FilterButtons = ({ keys, onFilterToggle, selected }) => {
  return (
    <div className="flex w-[300px] gap-2 shrink-0">
      {keys.map((filterKey) => {
        const selectedOption =
          selected?.[filterKey] &&
          FILTERS[filterKey]?.options.find(
            (opt) => opt.value === selected[filterKey]
          );

        return (
          <div key={filterKey}>
            <Button
              variant="category"
              onClick={() => onFilterToggle(filterKey)}
              type="button"
            >
              {selectedOption?.Icon ? (
                <selectedOption.Icon
                  className={selectedOption.iconClass}
                  size={12}
                />
              ) : null}
              {FILTER_LABELS[filterKey]}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default FilterButtons;
