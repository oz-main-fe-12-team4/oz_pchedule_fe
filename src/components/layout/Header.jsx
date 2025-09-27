import React from "react";
import logo from "../../assets/Logo.svg";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router";
import { useState } from "react";
import { notificationList } from "../../assets/data/dummyNotificationList";
import NotificationCard from "../NotificationCard";
import { fetchLogout } from "../../sevices/authApi";
import { useNavigate } from "react-router";
import useUserStore from "../../stores/userStore";

const Header = () => {
  const [isDropdownProfile, setIsDropdownProfile] = useState(false);
  const [isDropdownNotification, setIsDropdownNotification] = useState(false);
  const navigate = useNavigate();
  const { clearUserData } = useUserStore();

  const sortedNotificationList = notificationList.data.sort(
    (a, b) => b.id - a.id
  );

  const handleClickLogoutButton = async () => {
    const res = await fetchLogout();
    if (res.status === 200) {
      clearUserData();
      navigate("/");
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between flex-row mx-10 my-3">
        <Link to={"/"}>
          <img src={logo} alt="pchedule logo" className="w-[90px]" />
        </Link>
        <div className="flex justify-evenly gap-7 text-[#192A2D]">
          <IoSearch size={34} />
          <div
            onClick={() => (
              setIsDropdownNotification((prev) => !prev),
              setIsDropdownProfile(false)
            )}
          >
            <IoMdNotifications size={34} />
            {isDropdownNotification && (
              <div className="p-5 rounded-2xl bg-white shadow-[0_0_40px_-10px_#0000003f] absolute top-20 right-5 flex flex-col justify-center items-center gap-3 z-50 text-gray-400">
                {sortedNotificationList.map((el) => (
                  <NotificationCard key={el.id} notification={el} />
                ))}
              </div>
            )}
          </div>
          <div
            onClick={() => (
              setIsDropdownProfile((prev) => !prev),
              setIsDropdownNotification(false)
            )}
          >
            <FaCircleUser size={34} />
            {isDropdownProfile && (
              <div className="p-5 rounded-2xl bg-white shadow-[0_0_40px_-10px_#0000003f] absolute top-20 right-5 flex flex-col justify-center items-center gap-3 z-50 text-gray-400">
                <Link to={"/my_page"} className="hover:text-black">
                  마이페이지
                </Link>
                <button
                  onClick={handleClickLogoutButton}
                  className="cursor-pointer hover:text-black"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="w-screen border-b border-[#D9D9D9]" />
    </div>
  );
};

export default Header;
