import { Outlet } from "react-router";
import Header from "./Header";
import MenuBar from "./MenuBar";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <MenuBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
