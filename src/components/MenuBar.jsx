import { FaRegCalendarAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbCalendarQuestion } from "react-icons/tb";
import { TbClockCheck } from "react-icons/tb";
import { IoMdShare } from "react-icons/io";
import { BiSolidUserRectangle } from "react-icons/bi";

const MenuBar = () => {
  return (
    <>
      <nav className="w-[200px] h-[calc(100vh-100.18px)] p-9 border-r border-[#D9D9D9]">
        <ul className="flex flex-col justify-center items-start gap-10 text-xl">
          <li className="flex gap-2 items-center">
            <FaRegCalendarAlt />
            캘린더
          </li>
          <li className="flex gap-2 items-center">
            <FaListCheck />할 일
          </li>
          <li className="flex gap-2 items-center">
            <TbClockCheck />
            루틴
          </li>
          <li className="flex gap-2 items-center">
            <TbCalendarQuestion />
            언젠가
          </li>
          <li className="flex gap-2 items-center">
            <IoMdShare />
            일정 스토리
          </li>
        </ul>
      </nav>
      {/* <nav className="w-[200px] h-screen p-9 border-r border-[#D9D9D9]">
        <ul className="flex flex-col justify-center items-start gap-10 text-xl">
          <li className="flex gap-2 items-center">
            <BiSolidUserRectangle />
            유저 목록
          </li>
          <li className="flex gap-2 items-center">
            <IoMdShare />
            일정 스토리
          </li>
        </ul>
      </nav> */}
    </>
  );
};

export default MenuBar;
