import { useState } from "react";
import { FILTERS } from "../constants/filterList";
import Button from "../components/Button"; // 공통 Button 컴포넌트

const FilterOptionList = ({ filters, openFilter, onFilterChange, onClose }) => {
  const [activeSubOptionKey, setActiveSubOptionKey] = useState(null);
  const [pendingSubSelect, setPendingSubSelect] = useState(null);

  if (!openFilter) return null;

  const activeFilter = FILTERS[openFilter];
  const activeOption = activeFilter.options.find(
    (option) => option.value === activeSubOptionKey
  );

  const handleMainOptionClick = (value) => {
    const selectedOption = activeFilter.options.find(
      (option) => option.value === value
    );

    if (selectedOption?.subOptions) {
      setActiveSubOptionKey(value);
      setPendingSubSelect(filters[`${openFilter}Sub`] || null);
    } else {
      // subOptions 없으면 바로 적용 후 닫기
      onFilterChange(openFilter, value);
      onFilterChange(`${openFilter}Sub`, null);
      onClose();
    }
  };

  const handlePendingSubSelect = (subValue, repeatName = null) => {
    if (Array.isArray(activeOption.subOptions)) {
      // 매주, 매달일 떄 처리(중복가능)
      setPendingSubSelect((prev) => {
        if (!prev) return [subValue]; // 이전 값 없으면 새 배열
        if (prev.includes(subValue)) {
          // 이미 선택된 값이면 제거
          return prev.filter((value) => value !== subValue);
        }
        return [...prev, subValue];
      });
    } else {
      // 매년 일때 처리(월 선택하나/일 선택하나)
      setPendingSubSelect((prev) => ({
        // subOptions ({ months: [], days: [] })
        ...prev,
        [repeatName]: subValue,
      }));
    }
  };

  const handleSave = () => {
    onFilterChange(openFilter, activeSubOptionKey);
    onFilterChange(`${openFilter}Sub`, pendingSubSelect);
    setActiveSubOptionKey(null);
    setPendingSubSelect(null);
    onClose();
  };

  const handleCancel = () => {
    setActiveSubOptionKey(null);
    setPendingSubSelect(null);
    onClose();
  };

  return (
    <div>
      <div className="absolute z-10 mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-md animate-[slide-up_160ms_ease-out] max-h-[70vh] overflow-auto">
        {!activeSubOptionKey ? (
          // mainOption 리스트
          <div className="grid grid-cols-2 gap-y-6 gap-x-10">
            {activeFilter.options.map((option) => {
              const isSelected = filters[openFilter] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleMainOptionClick(option.value)}
                  className={`flex items-center gap-2 text-left text-lg font-semibold rounded-md px-2 py-1 transition-colors
                    ${
                      isSelected
                        ? "bg-[#CAE8F2] text-[#223F43]"
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
                  const isSelected =
                    Array.isArray(pendingSubSelect) &&
                    pendingSubSelect.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      className={`px-2 py-1 border rounded text-center transition-colors ${
                        isSelected
                          ? "bg-[#CAE8F2] text-[#223F43]"
                          : "hover:bg-gray-100 text-gray-800"
                      }`}
                      onClick={() => handlePendingSubSelect(sub)}
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
                            pendingSubSelect?.[repeatName] === value;
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
                                handlePendingSubSelect({
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

            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={handleCancel} variant="cancel">
                취소
              </Button>
              <Button onClick={handleSave} variant="confirm">
                저장
              </Button>
            </div>
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
