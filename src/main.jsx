import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Login from "./pages/Login";
import Signin from "./pages/Signin";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/calendar",
      },
      {
        path: "/schedule",
      },
      {
        path: "/routine",
      },
      {
        path: "/someday",
      },
      {
        path: "/share_schedule",
      },
      {
        path: "/admin/user_list",
      },
      {
        path: "/admin/share_schedule",
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signin",
    Component: Signin,
  },
  {
    path: "/my_page",
  },
  {
    path: "/testH",
  },
  {
    path: "/testD",
  },
  {
    path: "/testJ",
  },
  {
    path: "/testL",
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
