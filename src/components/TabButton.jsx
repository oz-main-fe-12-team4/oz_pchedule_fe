import { useState } from "react";

const TabButton = ({
  tabs = ["전체", "완료된일", "해야할일"],
  onTabChange = null,
}) => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (

    <div className="w-full min-h-screen bg-gray-50">
      <div className={`bg-white border-b border-gray-200`}>
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={`${tab}-${index}`}
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
      </div>
    </div>
  );
};

export default TabButton;
