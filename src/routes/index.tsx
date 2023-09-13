import App from "../App";

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SingnUp from "../pages/SingnUp";
import NotFound from "../pages/NotFound";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SingnUp />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
