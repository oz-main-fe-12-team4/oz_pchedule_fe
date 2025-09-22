import { Link } from "react-router";

const MenuCard = ({ icon, menu, activeClassName, ...props }) => {
  return (
    <Link
      {...props}
      className={`w-[100%] h-14 pl-6 flex gap-2 items-center rounded-xl ${activeClassName}`}
    >
      {icon}
      {menu}
    </Link>
  );
};

export default MenuCard;
