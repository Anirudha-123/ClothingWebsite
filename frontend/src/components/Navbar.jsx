import React, { useState } from "react";



function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeDropdown, setHomeDropdown] = useState(false);
  return (
    <>
      <div className="bg-gray-900">
        <div className=" header   max-w-7xl mx-auto  flex justify-between items-center py-4 ">
          <div className="text-xl font-bold text-gray-200">
            Clothing <span className="text-blue-600">Store</span>
          </div>

          <nav className="hidden md:flex space-x-8 relative">
            <div
              className=""
              onMouseOver={() => setHomeDropdown(true)}
              onMouseLeave={() => setHomeDropdown(false)}
            >
              <a href="#" className="text-gray-200  py-4 hover:text-blue-600">
                Home
              </a>

              {homeDropdown && (
                <div className="absolute top-full text-start left-0 bg-gray-800  rounded shadow-lg   z-40 ">
                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-700 "
                  >
                    Mens
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Womens
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                  >
                    Kids
                  </a>
                </div>
              )}
            </div>

            <a href="#" className="text-gray-200 hover:text-blue-600">
              Shop
            </a>
            <a href="#" className="text-gray-200 hover:text-blue-600">
              About
            </a>
            <a href="#" className="text-gray-200 hover:text-blue-600">
              Contact
            </a>
          </nav>

          <button
            className="md:hidden text-2xl text-amber-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className=" fixed inset-0 bg-gray-900 z-50   md:hidden   ">
            <button
              className="absolute top-6 right-6 text-3xl text-white"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            <div className="flex flex-col space-y-6 pt-19 pl-6">
              <a
                href="#"
                className=" text-white text-2xl font-semibold hover:text-blue-400 "
              >
                Home
              </a>
              <a href="#" className=" text-white text-2xl font-semibold">
                Shop
              </a>
              <a href="#" className=" text-white text-2xl font-semibold">
                About
              </a>
              <a href="#" className=" text-white text-2xl font-semibold">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
