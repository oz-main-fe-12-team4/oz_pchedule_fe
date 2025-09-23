import React from "react";
import logo from "../assets/Logo.svg";
import { IoSearch } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router";

const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between flex-row mx-10 my-3">
        <Link to={"/"}>
          <img src={logo} alt="pchedule logo" className="w-[90px]" />
        </Link>
        <div className="flex justify-evenly gap-7 text-[#192A2D]">
          <IoSearch size={34} />
          <IoMdNotifications size={34} />
          <FaCircleUser size={34} />
        </div>
      </header>
      <div className="w-screen border-b border-[#D9D9D9]" />
    </div>
  );
};

export default Header;
