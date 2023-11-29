import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form className="bg-slate-100 flex items-center p-3 rounded-md">
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="search..."
          />
          <FaSearch className="text-slate-600" />
        </form>
        <div className="flex items-center">
          <Link
            className="hidden sm:mx-2 sm:inline text-slate-700 hover:text-slate-400"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hidden sm:mx-2 sm:inline text-slate-700 hover:text-slate-400"
            to="/about"
          >
            About
          </Link>
          <Link
            className="hidden sm:mx-2 sm:inline text-slate-700 hover:text-slate-400"
            to={currentUser ? "/profile" : "/sign-in"}
          >
            {currentUser ? (
              <img
                className="rounded-full w-7 h-7 hover:scale-110"
                src={currentUser.avatar}
                alt={currentUser.username}
              />
            ) : (
              "Sign In"
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
