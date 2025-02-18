import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaProductHunt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";
import { Helmet } from "react-helmet-async";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import useRole from "../../hook/useRole";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FcStatistics } from "react-icons/fc";
import { MdPayment } from "react-icons/md";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, isLoading] = useRole();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Dashboard | Home</title>
      </Helmet>
      <div className="flex items-start mx-auto w-11/12 max-w-[1440px] h-screen">
        <div className="bg-gray-800 h-full">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 md:hidden bg-gray-800 text-white"
          >
            <FaBars />
          </button>
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 w-64  bg-gray-800 text-white transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform md:relative md:translate-x-0  h-full`}
          >
            <div className="p-5 text-center text-xl font-bold">
              <h1 className="uppercase"> {role} Dashboard</h1>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col text-sm space-y-4 p-5">
              {/* home  */}
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <FaHome className="mr-3" /> Home
              </NavLink>

              {/* Statistics */}
              {role === "admin"  && (
                <NavLink
                  to="/dashboard"
                  end
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                  replace
                >
                  <FcStatistics className="mr-3" /> Statistics
                </NavLink>
              )}

              {/* sales-report */}
              {role === "admin"  && (
                <NavLink
                  to="/dashboard/sales-report"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                  replace
                >
                  <FcStatistics className="mr-3" /> Sales Report
                </NavLink>
              )}
              {/* Seller home page */}
              {role === "seller" && (
                <NavLink
                  to="/dashboard/seller-home"
                  end
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                  replace
                >
                  <FcStatistics className="mr-3" /> Seller Statistics
                </NavLink>
              )}

              {/* Manage Medicines */}
              {role === "seller" && (
                <NavLink
                  to="/dashboard/manage-medicines"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <AiFillMedicineBox className="mr-3" /> Manage Medicines
                </NavLink>
              )}

              {/*Ask for Ads */}
              {role === "seller" && (
                <NavLink
                  to="/dashboard/ads"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <RiAdvertisementFill className="mr-3" /> Ask for Ads
                </NavLink>
              )}

              {/* Manage category */}
              {role === "admin" && (
                <NavLink
                  to="/dashboard/manage-category"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <FaProductHunt className="mr-3" /> Manage Category
                </NavLink>
              )}

              {/* Banner Advertise */}
              {role === "admin" && (
                <NavLink
                  to="/dashboard/advertise"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <RiAdvertisementFill className="mr-3" /> Banner Advertise
                </NavLink>
              )}

              {/* user  */}
              {role === "admin" && (
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <FaUsers className="mr-3" />
                  Manage Users
                </NavLink>
              )}

              {/* Payment history */}
              {role !== "admin" && (
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center p-2 rounded hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <MdPayment className="mr-3" /> Payment History
                </NavLink>
              )}

              {/* profile  */}
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <FaUser className="mr-3" /> Profile
              </NavLink>


              {/* logout  */}
              <NavLink
                onClick={handleLogOut}
                to="/dashboard/logout"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <FaSignOutAlt className="mr-3" /> Logout
              </NavLink>
            </nav>
          </aside>
        </div>
        {/* Dynamic Content */}
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
