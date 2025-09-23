import { useState } from "react";

const TabButton = ({
  tabs = ["전체", "완료된일", "해야할일"],
  onTabChange = null,
  defaultTab = "전체",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="w-[calc(100vw-200px)] flex border-b border-gray-200">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabClick(tab)}
          className={`px-6 py-4 text-sm border-b-3 border-gray-200 transition-colors ${
            activeTab === tab
              ? "text-gray-800 border-gray-700 font-bold"
              : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 font-medium"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabButton;
