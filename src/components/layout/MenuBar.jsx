import MenuCard from "./MenuCard";
import { AdminMenus, UserMenus } from "../../constants/menuList";
import { useState } from "react";

const MenuBar = () => {
  const url = new URL(window.location.href);
  const [activeMenu, setActiveMenu] = useState(url.pathname);

  const handleClickMenu = (params) => {
    setActiveMenu(params);
  };

  return (
    <>
      <nav className="min-w-[200px] p-[36px_15px_0_15px] flex flex-col gap-6 border-r border-[#D9D9D9] text-xl ">
        {UserMenus.map((menu) => (
          <MenuCard
            key={menu.id}
            icon={menu.icon}
            menu={menu.name}
            to={menu.params}
            onClick={() => handleClickMenu(menu.params)}
            activeClassName={activeMenu === menu.params ? "bg-gray-200" : ""}
          />
        ))}
      </nav>
      {/* <nav className="min-w-[200px] pt-9 flex flex-col gap-6 border-r border-[#D9D9D9] text-xl ">
        {AdminMenus.map((menu) => (
          <MenuCard
            key={menu.id}
            icon={menu.icon}
            menu={menu.name}
            to={menu.params}
            onClick={() => handleClickMenu(menu.params)}
            activeClassName={activeMenu === menu.params ? "bg-gray-200" : ""}
          />
        ))}
      </nav> */}
    </>
  );
};

export default MenuBar;
