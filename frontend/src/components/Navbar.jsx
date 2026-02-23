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
                <span
                  className="text-white border-b border-gray-500 pb-2"
                  onClick={() => localStorage.removeItem("token")}
                >
                  Logout
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