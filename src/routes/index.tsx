import App from "../App";

import { createBrowserRouter } from "react-router-dom";
import BookDetails from "../components/Books/BookDetails";
import AddBooks from "../pages/AddBooks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import SingnUp from "../pages/SingnUp";
import WishList from "../pages/WishList";
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
    path: "/bookdetails/:id",
    element: <BookDetails />,
  },

  {
    path: "/wishlist",
    element: <WishList />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addbooks",
    element: <AddBooks />,
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
