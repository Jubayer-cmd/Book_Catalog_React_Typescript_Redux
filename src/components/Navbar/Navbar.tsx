import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth.data);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <Link className="mx-5" to="/">
                Home
              </Link>
              <Link className="mx-5 my-3" to="/wishlist">
                Wishlist
              </Link>
              <Link className="mx-5" to="/addbooks">
                Add Books
              </Link>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link to={"/home"} className="btn btn-ghost normal-case text-xl">
            Books House
          </Link>
        </div>
        <div className="navbar-end">
          {token ? (
            <div className="flex items-center justify-center">
              <button
                onClick={() => navigate("/addbooks")}
                className=" p-1 rounded-md bg-violet-500 text-white mr-2"
              >
                +Books
              </button>
              <button
                className=" p-1 rounded-md bg-violet-500 text-white"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              className="btn btn-ghost bg-violet-500 text-white"
              to="/login"
            >
              SignIn
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
