import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import TestH from "./test/TestH";
import TestD from "./test/TestD";
import TestJ from "./test/TestJ";
import TestL from "./test/TestL";
import Main from "./pages/Main";
import DailyPage from "./pages/DailyPage";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Main,
      },
      {
        path: "/daily",
        Component: DailyPage,
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
    Component: TestH,
  },
  {
    path: "/testD",
    Component: TestD,
  },
  {
    path: "/testJ",
    Component: TestJ,
  },
  {
    path: "/testL",
    Component: TestL,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
