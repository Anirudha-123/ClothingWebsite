import React, { useState } from "react";
import { megaMenu, navLink } from "../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLoginModal } from "../context/LoginModal";

import { useEffect } from "react";
import { logout } from "../redux/authSlice";
const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileCategory, setMobileCategory] = useState("Mens");
  // const [mobileCategory, setMobileCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const token = localStorage.getItem("token");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { setLoginModalOpen } = useLoginModal();

  const categoryMap = {
    // Mens: ["shirt", "jeans", "t-shirt", "kurta", "hoodie", "blazer", "sweater"],

    Mens: ["shirt", "jeans", "t-shirt"],
    // Womens: [
    //   "kurti",
    //   "t-shirt",
    //   "top",
    //   "jeans",
    //   "dress",
    //   "skirt",
    //   "jacket",
    //   "sweater",
    // ],

    Womens: ["kurti", "t-shirt", "jeans"],
    // Kids: ["shirt", "shorts"],
  };

  return (
    <>
      <div className="header fixed  top-0 left-0 right-0 z-40 bg-gray-900 max-w-8xl   mx-auto  flex justify-between items-center px-3 h-16 md:h-16 border-b-2 border-white/20">
        <Link to="/">
          <h3 className="text-amber-100 text-xl md:text-2xl font-bold ">
            Clothing <span className="text-blue-200">Store</span>
          </h3>
        </Link>

        <nav className="hidden lg:flex space-x-6 font-semibold h-full">
          {navLink.map((nav) => (
            <div
              key={nav.name}
              className="flex items-center h-full "
              onMouseEnter={() => setActiveMenu(nav.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <div className="flex items-center h-full group">
                <span
                  className="relative px-3 py-2 cursor-pointer text-white"
                  onClick={() => {
                    navigate(`${nav.path ? nav.path : "/"}`);
                  }}
                >
                  {nav.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                </span>
              </div>

              {megaMenu[nav.name] && activeMenu === nav.name && (
                <div className="absolute left-0 top-full w-full px-5">
                  <div className="h-90 bg-gray-700 shadow-xl p-6 grid grid-cols-4 gap-6 z-50 mx-auto max-w-7xl ">
                    {Object.entries(megaMenu[nav.name]).map(
                      ([section, items]) => (
                        <div key={section}>
                          <h4 className="font-bold text-red-400 mb-3">
                            {section}
                          </h4>

                          <ul className="space-y-2">
                            {items.map((item) => (
                              <li
                                key={item}
                                className="text-gray-300 hover:text-amber-300 cursor-pointer"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* <div className="text-end flex gap-4">

               <div className="">
          
          <button className="bg-blue-500  text-white transition  font-bold px-3 py-2 md:px-5 md:py-2 ">
            Cart{" "}
          </button>
        </div>
               <div className=" hidden md:flex">
          
          <button className="bg-blue-500  text-white transition  font-bold px-3 py-2 md:px-5 md:py-2 ">
            Login{" "}
          </button>
        </div>
             </div>
       

        <button
          className="md:hidden text-2xl text-white "
          onClick={() => {
            setMobileOpen(true);
            setMobileCategory("Mens");
          }}
        >
          ☰
        </button> */}

        <div className=" flex  items-center ">
          <div className="">
            <button className=" text-white transition font-bold px-3 py-2 md:px-5 md:py-2 flex items-center justify-center">
              <IoCartOutline
                size={28}
                className="text-lg md:text-xl"
                onClick={() => navigate("/cart")}
              />
            </button>
          </div>

          {/* <div className="hidden md:flex">
            {token ? (
              <>
               

                  <span
                  className="text-white border-b border-gray-500 pb-2"
                  onClick={() => localStorage.removeItem("token")}
                >
                  Logout
                </span>
              
              </>
            ) : (
              <>

                <button className="bg-blue-500 text-white transition font-bold px-3 py-2 md:px-5 md:py-2">
                  Login
                </button>
              
              </>
            )}
          </div> */}

          <div className="hidden md:flex gap-3 items-center">
            {isAuthenticated ? (
              <div
                className="  text-2xl text-white ms-3"
                onClick={() => navigate("/profile")}
              >
                <FaRegUser />
              </div>
            ) : (
              <button
                className="border rounded-2xl hover:bg-blue-400 text-white transition font-bold px-3 py-2 md:px-4 md:py-1"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </button>
            )}
          </div>

          <button
            className="md:hidden text-2xl text-white mx-2 "
            onClick={() => {
              setMobileOpen(true);
              setMobileCategory("Mens");
            }}
          >
            ☰
          </button>

          <div
            className="md:hidden  text-2xl text-white ms-3"
            onClick={() => navigate("/profile")}
          >
            <FaRegUser />
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 bg-gray-900 z-50 md:hidden min-h-screen">
          {/* CLOSE BUTTON */}
          <button
            className="text-3xl absolute right-6 top-6 text-white"
            onClick={() => {
              setMobileOpen(false);
              setMobileCategory(null);
            }}
          >
            ✕
          </button>

          {/* CATEGORY TABS */}
          <div className="flex justify-around text-2xl pt-24">
            {["Mens", "Womens"].map((cat) => (
              <span
                key={cat}
                onClick={() => setMobileCategory(cat)}
                className={`relative group cursor-pointer px-2 pb-1 ${
                  mobileCategory === cat ? "text-amber-300" : "text-white"
                }`}
              >
                {cat}

                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-amber-500 transition-all duration-300 ${
                    mobileCategory === cat ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </span>
            ))}
          </div>

          {/* CATEGORY CONTENT */}
          <div className="mt-10 px-8">
            {mobileCategory && (
              <div className="flex flex-col space-y-4 text-xl">
                {categoryMap[mobileCategory]?.map((item) => (
                  <Link
                    key={item}
                    to={`/${mobileCategory.toLowerCase()}/${item}`}
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileCategory(null);
                    }}
                    className="text-white border-b border-gray-500 pb-2 capitalize"
                  >
                    {item}
                  </Link>
                ))}

                <Link
                  to="/contact"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileCategory(null);
                  }}
                  className="text-white border-b border-gray-500 pb-2"
                >
                  Contact
                </Link>

                <div className="block w-full mt-3">
                  <img
                    src={
                      mobileCategory === "Mens"
                        ? "/about3.jpg"
                        : mobileCategory === "Womens"
                          ? "/img2.jpg"
                          : "/img5.jpg"
                    }
                    alt="category"
                    className="w-full h-60 object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
