import { FaRegCalendarAlt } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbCalendarQuestion } from "react-icons/tb";
import { TbClockCheck } from "react-icons/tb";
import { IoMdShare } from "react-icons/io";
import { BiSolidUserRectangle } from "react-icons/bi";

const calendarIcon = <FaRegCalendarAlt />;

const scheduleIcon = <FaListCheck />;

const routineIcon = <TbClockCheck />;

const somedayIcon = <TbCalendarQuestion />;

const scheduleStoryIcon = <IoMdShare />;

const userListIcon = <BiSolidUserRectangle />;

export const UserMenus = [
  { id: 1, icon: calendarIcon, name: "캘린더", params: "/" },
  { id: 2, icon: scheduleIcon, name: "할 일", params: "/daily" },
  { id: 3, icon: routineIcon, name: "루틴", params: "/routine" },
  { id: 4, icon: somedayIcon, name: "언젠가", params: "/someday" },
  {
    id: 5,
    icon: scheduleStoryIcon,
    name: "일정 스토리",
    params: "/schedule_story",
  },
];

export const AdminMenus = [
  { id: 1, icon: userListIcon, name: "유저 목록", params: "/admin/user_list" },
  {
    id: 2,
    icon: scheduleStoryIcon,
    name: "일정 스토리",
    params: "/admin/schedule_story",
  },
];
