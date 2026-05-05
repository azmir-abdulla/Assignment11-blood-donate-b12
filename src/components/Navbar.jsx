import React, { use, useState, useEffect } from "react";
import { IoMdLogIn } from "react-icons/io";

import { Link, NavLink } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState("light");

  // Theme Toggle
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Successfully logged out!"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ToastContainer />

      <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-10">
        <div className="navbar-start">
          <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
            <img src={Logo} alt="Logo" className="w-25" />
            <span className="text-2xl font-extrabold text-[#222] tracking-tight"></span>
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-gray-600 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#fc2222] font-semibold"
                    : "hover:text-[#870a0a]"
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/donation-request"
                className={({ isActive }) =>
                  isActive ? "text-[#fc2222] font-semibold" : "text-[#870a0a]"
                }
              >
                Donation Request
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/funding-request"
                className={({ isActive }) =>
                  isActive ? "text-[#fc2222] font-semibold" : "text-[#870a0a]"
                }
              >
                Funding
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <button onClick={toggleTheme} className="text-xl">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full border-2 border-[#6BCB77]">
                  <img
                    src={user.photoURL || "https://i.ibb.co/5nDfxpQ/user.png"}
                    alt="User"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="px-3 py-2 text-sm font-bold text-center border-b mb-2 truncate text-gray-700 pointer-events-none">
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/dashboard" className="font-medium text-[#222]">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-500 font-semibold hover:bg-red-50">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn bg-[#ff2c2c] hover:bg-[#ffffff] text-white btn-sm flex items-center gap-1 hover:text-[#870a0a] "
              >
                <IoMdLogIn /> Login
              </Link>

              <Link
                to="/auth/register"
                className="btn bg-[#ff2c2c] hover:bg-[#6BCB77] text-white btn-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
