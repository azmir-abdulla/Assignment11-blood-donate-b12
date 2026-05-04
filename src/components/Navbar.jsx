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
            <>
              <div className="relative group">
                <Link to="/auth/UserProfile">
                  <img
                    src={user.photoURL || "https://i.ibb.co/5nDfxpQ/user.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#6BCB77] cursor-pointer"
                  />
                </Link>
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {user.displayName || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn bg-[#cb6b6b] hover:bg-[#FF8C42] text-white btn-sm"
              >
                Logout
              </button>
            </>
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
