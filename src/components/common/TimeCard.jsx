import React from "react";

function TimeCard({ time }) {
  return (
    <div className="w-24 bg-[#CAE8F2] rounded-md text-center py-1 px-3 text-sm font-medium text-gray-700 select-none flex items-center justify-center">
      {time}
    </div>
  );
}

export default TimeCard;
