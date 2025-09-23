import { useState } from "react";
import { FILTERS } from "../../constants/filterList";
import Button from "../common/Button";

const FilterOptionList = ({ filters, openFilter, onFilterChange, onClose }) => {
  const [activeSubOptionKey, setActiveSubOptionKey] = useState(null);
  const [pendingSubSelect, setPendingSubSelect] = useState(null);
  const [selectedYearly, setSelectedYearly] = useState([]);
  const [currentYearly, setCurrentYearly] = useState({
    month: null,
    day: null,
  });

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
      setPendingSubSelect((prev) => ({
        ...prev,
        [repeatName]: subValue,
      }));
    }
  };

  const handleYearlyMonthSelect = (month) => {
    setCurrentYearly({ month, day: null });
  };

  const handleYearlyDaySelect = (day) => {
    if (!currentYearly.month) return;
    const newSet = { month: currentYearly.month, day };
    setSelectedYearly((prev) => [...prev, newSet]);
    setCurrentYearly({ month: null, day: null });
  };

  // 연간 반복 세트 삭제
  const handleRemoveYearlySet = (index) => {
    setSelectedYearly((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onFilterChange(openFilter, activeSubOptionKey);
    if (activeSubOptionKey === "yearly") {
      onFilterChange(`${openFilter}Sub`, selectedYearly);
    } else {
      onFilterChange(`${openFilter}Sub`, pendingSubSelect);
    }
    setActiveSubOptionKey(null);
    setPendingSubSelect(null);
    onClose();
  };

  const handleCancel = () => {
    setActiveSubOptionKey(null);
    setPendingSubSelect(null);
    setCurrentYearly({ month: null, day: null });
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
        ) : activeSubOptionKey === "yearly" ? (
          // 연간 반복: 월/일 선택
          <div>
            <div className="mb-2 font-semibold">월 선택</div>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {activeOption.subOptions.months.map((month) => (
                <button
                  key={month}
                  className={`px-2 py-1 border rounded text-center ${
                    currentYearly.month === month
                      ? "bg-[#CAE8F2] text-[#223F43]"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => handleYearlyMonthSelect(month)}
                >
                  {month}
                </button>
              ))}
            </div>

            <div className="mb-2 font-semibold">일 선택</div>
            <div className="grid grid-cols-7 gap-2 mb-3">
              {activeOption.subOptions.days.map((day) => (
                <button
                  key={day}
                  className={`px-2 py-1 border rounded text-center ${
                    selectedYearly.some(
                      (set) =>
                        set.month === currentYearly.month && set.day === day
                    )
                      ? "bg-[#CAE8F2] text-[#223F43]"
                      : "hover:bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => handleYearlyDaySelect(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedYearly.map((set, idx) => (
                <div
                  key={`${set.month}-${set.day}-${idx}`}
                  className="flex items-center gap-1 px-2 py-1 bg-[#CAE8F2] text-[#223F43] rounded"
                >
                  <span>{`${set.month}월 ${set.day}일`}</span>
                  <button onClick={() => handleRemoveYearlySet(idx)}>x</button>
                </div>
              ))}
            </div>
          </div>
        ) : Array.isArray(activeOption?.subOptions) ? (
          // 기존 배열 subOptions
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
          // subOptions
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
                            handlePendingSubSelect({ group: repeatName, value })
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
