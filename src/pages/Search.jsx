import { useState } from "react";
import Input from "../components/common/Input";
import { RiFileSearchFill } from "react-icons/ri";
import TabButton from "../components/common/TabButton";

function Search() {
  const [searchString, setSearchString] = useState("");
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

      <TabButton tabs={tabs} />

      <div className="flex flex-col justify-center items-center gap-5 text-[#c2c2c2] p-20">
        <RiFileSearchFill size={100} />
        <p>검색 일정이 없습니다.</p>
      </div>
    </div>
  );
}
export default Search;
