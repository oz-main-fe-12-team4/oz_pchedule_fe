import React from "react";
import { FaShareAlt, FaUser } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { FILTERS } from "../constants/FILTER_LIST";

const FilterOptionList = ({ filters, openFilter, onFilterChange, onClose }) => {
  if (!openFilter) return null;

  const current = FILTERS[openFilter];
  const handleSelect = (value) => {
    onFilterChange(openFilter, value);
    onClose();
  };

  return (
    <div>
      <div className="absolute z-10 mt-2 w-[360px] rounded-2xl bg-white p-5 shadow-md animate-[slide-up_160ms_ease-out] max-h-[70vh] overflow-auto">
        <div className="grid grid-cols-2 gap-y-6 gap-x-10">
          {current.options.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`flex items-center gap-2 text-left text-lg font-semibold rounded-md px-2 py-1 transition-colors
                ${
                  filters[openFilter] === opt.value
                    ? "bg-[#CAE8F2] text-[#223F43]"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
            >
              {opt.icon && <span className="text-[#223F43]">{opt.icon}</span>}
              {opt.name}
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes slide-up { from { transform: translateY(8%); opacity:.6 } to { transform: translateY(0); opacity:1 } }
      `}</style>
    </div>
  );
};

export default FilterOptionList;
