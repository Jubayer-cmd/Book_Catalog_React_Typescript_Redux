import { Link } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function Navbar() {
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
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Books House</a>
        </div>
        <div className="navbar-end">
          {token ? (
            <button
              className="btn btn-ghost bg-violet-500 text-white"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </button>
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
