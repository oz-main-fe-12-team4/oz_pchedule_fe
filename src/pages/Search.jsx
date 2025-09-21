import { useState } from "react";
import Input from "../components/Input";
import { RiFileSearchFill } from "react-icons/ri";

function Search() {
  const [searchString, setSearchString] = useState("");
  const [activeTab, setActiveTab] = useState("전체");
  const tabs = ["전체", "할일", "루틴", "언젠가", "일정스토리"];

  return (
    <div>
      <div className="w-[60vw] p-5">
        <Input
          inputId={"search"}
          value={searchString}
          setValue={setSearchString}
          placeholder={"일정을 검색하세요."}
        />
      </div>

      <div className="border-b border-gray-200">
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

      <div className="flex flex-col justify-center items-center gap-5 text-[#c2c2c2] p-20">
        <RiFileSearchFill size={100} />
        <p>검색 일정이 없습니다.</p>
      </div>
    </div>
  );
}
export default Search;
