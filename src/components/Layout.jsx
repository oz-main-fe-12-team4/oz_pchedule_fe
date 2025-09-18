import { Outlet } from "react-router";
import { Header } from "./Header";
import MenuBar from "./MenuBar";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div>
        <MenuBar />
        <Outlet />
      </div>
    </div>
  );
};
