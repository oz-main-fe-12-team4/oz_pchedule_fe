import { useState } from "react";
import { FILTERS } from "../constants/filterList";

const FilterOptionList = ({ filters, openFilter, onFilterChange, onClose }) => {
  const [activeSubOptionKey, setActiveSubOptionKey] = useState(null);

  if (!openFilter) return null;

  const activeFilter = FILTERS[openFilter];
  const activeOption = activeFilter.options.find(
    (option) => option.value === activeSubOptionKey
  );

  const handleMainOptionClick = (value) => {
    onFilterChange(openFilter, value);

    const selectedOption = activeFilter.options.find(
      (option) => option.value === value
    );

    if (selectedOption?.subOptions) {
      setActiveSubOptionKey(value);
    } else {
      setActiveSubOptionKey(null);
      onClose();
    }
  };

  const handleSubOptionClick = (subValue) => {
    onFilterChange(`${openFilter}Sub`, subValue);
    setActiveSubOptionKey(null);
    onClose();
  };

  return (
    <div>
      <div className="absolute z-10 mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-md animate-[slide-up_160ms_ease-out] max-h-[70vh] overflow-auto">
        {!activeSubOptionKey ? (
          // 메인 옵션 리스트
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            {activeFilter.options.map((option) => {
              const isSelected = filters[openFilter] === option.value;
              return (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => handleMainOptionClick(option.value)}
                  className={`flex items-center gap-2 text-left text-lg font-semibold rounded-md px-2 py-1 transition-colors
                    ${
                      isSelected
                        ? "bg-[#CAE8F2] text-[#223F43]" // 선택된 옵션 색
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                >
                  {option.Icon && (
                    <option.Icon className={option.iconClass} size={14} />
                  )}
                  <span>{option.name}</span>
                </button>
              );
            })}
          </div>
        ) : (
          // subOptions 리스트
          <div>
            {Array.isArray(activeOption?.subOptions) ? (
              <div className="grid grid-cols-7 gap-2">
                {activeOption.subOptions.map((sub) => {
                  const isSelected = filters[`${openFilter}Sub`] === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      className={`px-2 py-1 border rounded text-center transition-colors ${
                        isSelected
                          ? "bg-[#CAE8F2] text-[#223F43]"
                          : "hover:bg-gray-100 text-gray-800"
                      }`}
                      onClick={() => handleSubOptionClick(sub)}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(activeOption?.subOptions || {}).map(
                  ([repeatName, values]) => (
                    <div key={repeatName}>
                      <div className="font-semibold mb-1">{repeatName}</div>
                      <div className="grid grid-cols-7 gap-1">
                        {values.map((value) => {
                          const isSelected =
                            filters[`${openFilter}Sub`]?.group === repeatName &&
                            filters[`${openFilter}Sub`]?.value === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              className={`px-2 py-1 border rounded text-center transition-colors ${
                                isSelected
                                  ? "bg-[#CAE8F2] text-[#223F43]"
                                  : "hover:bg-gray-100 text-gray-800"
                              }`}
                              onClick={() =>
                                handleSubOptionClick({
                                  group: repeatName,
                                  value,
                                })
                              }
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(8%); opacity:.6 }
          to { transform: translateY(0); opacity:1 }
        }
      `}</style>
    </div>
  );
};

export default FilterOptionList;
