import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { IoLanguage } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import useCart from "../hook/useCart";
import toast from "react-hot-toast";
import useRole from "../hook/useRole";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [carts] = useCart()
  const [role] = useRole()
  const [openMenu, setOpenMenu] = useState(false);


  // Calculate total price on the frontend
  const totalPrice = carts.reduce((acc, cart) => acc + cart.unitPrice * cart.count, 0);

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={()=>setOpenMenu(false)}> Home </NavLink>
      </li>
      <li>
        <NavLink to="/shop" onClick={()=>setOpenMenu(false)}>Shop</NavLink>
      </li>
      <li>
        <a href="/#artical" onClick={()=>setOpenMenu(false)}>Artical</a>
      </li>
      <li>
        <a href="/#contact" onClick={()=>setOpenMenu(false)}>Contact</a>
      </li>
    </>
  );

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-base-100 shadow-lg sticky top-0 left-0 w-full z-50">
      <nav className="navbar mx-auto max-w-[1440px]">
        <div className="flex-1">
          {/* mobile menu */}
          {user === null && (
            <>
              <div
                onClick={() => setOpenMenu(!openMenu)}
                className="cursor-pointer text-xl md:hidden mr-3"
              >
                {openMenu ? <RxCross2 /> : <FaBars />}
              </div>
              <div>
                {openMenu && (
                  <ul className="absolute top-16 left-0  md:hidden menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow ml-3">{links}</ul>)}
              </div>
            </>
          )}
          <Link to="/" className=" text-xl font-bold text-primaryTextColor">
            MediMart
          </Link>
        </div>
        <div className="flex-none z-50  gap-1 md:gap-3">
          {user === null && (
            <ul className="menu menu-horizontal px-1 hidden lg:flex">{links}</ul>
          )}
          <Menu>
            <MenuButton className="inline-flex items-center gap-2  rounded-md bg-mainColor py-1 px-2 md:py-1.5 md:px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white">
              Lan
              <IoLanguage />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom"
              className="w-16 mt-2 origin-top-right rounded-xl border z-50 border-black bg-gray-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button className="group  flex w-full items-center gap-2 rounded-lg py-1 px-2 md:py-1.5 md:px-3 data-[focus]:bg-white/10">
                  Eng
                </button>
              </MenuItem>

              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1 px-2 md:py-1.5 md:px-3 data-[focus]:bg-white/10">
                  Ban
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>

          {/* join us button  */}
          {/* cart icon dropdown */}
          {/*user image icon dropdown */}
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item ">{carts?.length}</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-48 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">{carts?.length} Items</span>
                    <p className="text-black flex items-start gap-1">Subtotal: <span className="flex items-center font-semibold">{totalPrice}</span> Taka </p>
                    <div className="card-actions">
                      <Link to='/cart-page' className="py-1 w-full text-center text-white rounded-lg bg-mainColor ">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
                >
                  {links}
                  {role === 'user' && (
                    <li>
                      <NavLink to={`/dashboard/profile`}>  Dashboard  </NavLink>
                    </li>
                  )}
                  {role === 'admin' && (
                    <li>
                      <NavLink to={`/dashboard`} >  Dashboard  </NavLink>
                    </li>
                  )}
                  {role === 'seller' && (
                    <li>
                      <NavLink to={`/dashboard/seller-home`}  >  Dashboard  </NavLink>
                    </li>
                  )}
                  <li>
                    <Link to='dashboard/profile'>Profile </Link>
                  </li>
                  <li className="bg-mainColor text-center w-full hover:bg-secondBgColor rounded-md text-white  mt-0.5">
                    <Link onClick={handleLogOut}>Logout</Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/join-us">
              <Button className=" mx-2 rounded-md bg-mainColor py-1 px-2 md:py-1.5 md:px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-secondBgColor data-[open]:bg-secondBgColor data-[focus]:outline-1 data-[focus]:outline-white">
                Join US
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
