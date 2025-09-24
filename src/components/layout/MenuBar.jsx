import MenuCard from "./MenuCard";
import { AdminMenus, UserMenus } from "../../constants/menuList";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const MenuBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <nav className="min-w-[200px] p-[36px_15px_0_15px] flex flex-col gap-6 border-r border-[#D9D9D9] text-xl ">
        {UserMenus.map((menu) => (
          <MenuCard
            key={menu.id}
            icon={menu.icon}
            menu={menu.name}
            to={menu.params}
            onClick={() => navigate(menu.params)}
            activeClassName={
              location.pathname === menu.params ? "bg-gray-200" : ""
            }
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
            onClick={() => navigate(menu.params)}
            activeClassName={
              location.pathname === menu.params ? "bg-gray-200" : ""
            }
          />
        ))}
      </nav> */}
    </>
  );
};

export default MenuBar;
