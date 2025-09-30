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
import Search from "./pages/Search";
import Routine from "./pages/Routine";
import ScheduleStory from "./pages/ScheduleStory";
import Someday from "./pages/Someday";
import Daily from "./pages/Daily";
import AdminPage from "./pages/AdminPage";
import ScheduleStoryDetailPage from "./pages/ScheduleStoryDetailPage";
import { fetchGetUserList } from "./services/userApi";

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
        Component: Daily,
      },
      {
        path: "/routine",
        Component: Routine,
      },
      {
        path: "/someday",
        Component: Someday,
      },
      {
        path: "/schedule_story",
        Component: ScheduleStory,
      },
      {
        path: "/schedule_story/:scheduleStoryId",
        Component: ScheduleStoryDetailPage,
      },
      {
        path: "/search",
        Component: Search,
      },
      {
        path: "/admin/user_list",
        loader: async () => await fetchGetUserList(),
        Component: AdminPage,
      },
      {
        path: "/admin/schedule_story",
        Component: ScheduleStory,
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
