import React, { Fragment } from "react";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-indigo-500 px-5 py-3 flex justify-end">
        <Link to={'/Login'}>
          <button className="text-white ml-auto bg-slate-800 border-0 py-2 px-3 md:px-5 lg:px-8 focus:outline-none hover:bg-slate-700 rounded">
            Sign In
          </button>
        </Link>
        <button className="text-white mx-3 px-2 bg-slate-800 border-0 py-2 md:px-5 focus:outline-none hover:bg-slate-700 rounded">
          <CiLogout />
        </button>
      </div>
    </>
  );
};

export default Navbar;
