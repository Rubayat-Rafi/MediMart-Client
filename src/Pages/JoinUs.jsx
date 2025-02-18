import { Helmet } from "react-helmet-async";
import {  NavLink, Outlet } from "react-router-dom";

const JoinUs = () => {
  return (
    <>
    <Helmet>
      <title>MediMart | Join Us</title>
    </Helmet>
    <div className="min-h-[calc(100vh-288px)] flex items-center justify-center">
      <div className="bg-base-100 md:min-w-[476px] rounded-lg shadow-xl my-10 border">
        {/* Links  */}
        <div className="flex items-center w-full justify-center">
      <NavLink
        to="/join-us"
        end
        className={({ isActive }) =>
          isActive
            ? "w-1/2 text-center border-b-2 border-[#059669] text-primaryTextColor py-3 font-semibold"
            : "w-1/2 text-center border-b py-3 text-gray-500"
        }
      >
        Sign In
      </NavLink>
      <NavLink
        to="signup"
        className={({ isActive }) =>
          isActive
            ? "w-1/2 text-center border-b-2 border-[#059669] text-primaryTextColor py-3 font-semibold"
            : "w-1/2 text-center border-b py-3 text-gray-500"
        }
      >
        Sign Up
      </NavLink>
    </div>

        <div>
            <Outlet/>
        </div>
      </div>
    </div>
    </>
  );
};

export default JoinUs;
