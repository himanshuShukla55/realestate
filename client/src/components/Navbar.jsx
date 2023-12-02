import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== "")
      setSearchParams((prev) => {
        prev.set("searchTerm", searchTerm);
        return prev;
      });
  };

  useEffect(() => {
    const searchTermFromParams = searchParams.get("searchTerm");
    if (searchTermFromParams) setSearchTerm(searchTermFromParams);
  }, []);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-6xl p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Real</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="bg-slate-100 flex items-center p-3 rounded-md"
        >
          <input
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
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
            className=" sm:mx-2 text-slate-700 hover:text-slate-400"
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
