import { useState } from "react";

const StoryPage = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const tabs = ["전체", "내가작성글", "공유스토리"];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-gray-900 border-gray-900 font-extrabold"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-400 text-xl mt-5">
            + 버튼을 눌러 일정을 등록해보세요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
