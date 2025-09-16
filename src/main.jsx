import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import Login from "./pages/Login";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/login",
    Component: Login,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
