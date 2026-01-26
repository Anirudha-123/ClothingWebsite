import React, { useState } from "react";
import { megaMenu, navLink } from "../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

import { useEffect } from "react";
const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileCategory, setMobileCategory] = useState("Mens");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }

    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="header fixed  top-0 left-0 right-0 z-40 bg-gray-900 max-w-8xl   mx-auto  flex justify-between items-center px-3 h-16 md:h-16 border-b-2 border-white/20">
        <Link to="/">
          <h3 className="text-amber-100 text-xl md:text-2xl font-bold ">
            Clothing <span className="text-blue-200">Store</span>
          </h3>
        </Link>

        <nav className="hidden md:flex space-x-6 font-semibold h-full">
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

        <div className=" flex gap-4 items-center ">
          <div className="">
            <button className=" text-white transition font-bold px-3 py-2 md:px-5 md:py-2 flex items-center justify-center">
              <IoCartOutline size={28} className="text-lg md:text-xl" onClick={() => navigate("/cart")}/>
            </button>
          </div>

          <div className="hidden md:flex">
            <button className="bg-blue-500 text-white transition font-bold px-3 py-2 md:px-5 md:py-2">
              Login
            </button>
          </div>

          <button
            className="md:hidden text-2xl text-white"
            onClick={() => {
              setMobileOpen(true);
              setMobileCategory("Mens");
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-bottom-nav fixed inset-0 bg-gray-900 z-50 md:hidden min-h-screen">
          <button
            className="text-3xl absolute right-6 top-6 text-white"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>

          <div className="flex justify-around text-2xl pt-24">
            {["Mens", "Womens", "Kids"].map((cat) => (
              <span
                key={cat}
                onClick={() => setMobileCategory(cat)}
                className={`relative group cursor-pointer px-2 pb-1 ${
                  mobileCategory === cat ? "text-amber-300" : "text-white"
                }`}
              >
                {cat}

                {/* underline animation */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 bg-amber-500 transition-all duration-300 ${
                    mobileCategory === cat ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </span>
            ))}
          </div>

          <div className="mt-10 px-8 ">
            {mobileCategory === "Mens" && (
              <div
                className="flex flex-col space-y-4 text-xl
              "
              >
                <span className="text-white border-b border-gray-500 pb-2">
                  <Link to="/mens" onClick={() => setMobileOpen(false)}>
                    Shirt
                  </Link>
                </span>

                <span className="text-white border-b border-gray-500 pb-2">
                  Jeans
                </span>

                <span className="text-white border-b border-gray-500 pb-2">
                  T-Shirt
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Kurta
                </span>

                <span className="text-white border-b border-gray-500 pb-2">
                  Hoodie
                </span>

                <span className="text-white border-b border-gray-500 pb-2">
                  Blazer
                </span>

                <span className="text-white border-b border-gray-500 pb-2">
                  Sweater
                </span>

                <Link
                  to={"/contact"}
                  className="block no-underline border-b border-gray-500 pb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-white">Contact</span>
                </Link>
                <span className="block w-full mt-3 bg-gray-300">
                  <img
                    src="/about3.jpg"
                    alt="logo"
                    className="w-full h-60 object-cover"
                  />
                </span>
              </div>
            )}

            {mobileCategory === "Womens" && (
              <div className="flex flex-col space-y-4 text-xl">
                <span className="text-white border-b border-gray-500 pb-2">
                  Kurti
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Top
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Jeans
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Dress
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Skirt
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Jacket
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Sweater
                </span>
                <Link
                  to={"/contact"}
                  className="block no-underline border-b border-gray-500 pb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-white">Contact</span>
                </Link>

                <span className="block w-full mt-3 bg-gray-50">
                  <img
                    src="/img2.jpg"
                    alt="logo"
                    className="w-full h-60 object-cover"
                  />
                </span>
              </div>
            )}

            {mobileCategory === "Kids" && (
              <div className="flex flex-col space-y-4 text-xl">
                <span className="text-white border-b border-gray-500 pb-2">
                  Shirt
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Shorts
                </span>
                <span className="text-white border-b border-gray-500 pb-2">
                  Jackets
                </span>
                <Link
                  to={"/contact"}
                  className="block no-underline border-b border-gray-500 pb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-white">Contact</span>
                </Link>

                <span className="block w-full mt-3 bg-gray-50">
                  <img
                    src="/img5.jpg"
                    alt="logo"
                    className="w-full h-80 object-cover"
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
