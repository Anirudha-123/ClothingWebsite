import React from 'react'

const Footer = () => {
  return (
    <><footer className="bg-gray-900 text-gray-200 pt-10 " style={{marginTop:"100px"}}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      
      <div>
        <h3 className="text-amber-100 text-xl md:text-2xl font-bold ">
            Clothing <span className="text-blue-200">Store</span>
          </h3>
        <p className="text-gray-400 text-sm">
          Upgrade your wardrobe with the latest trends in fashion. Stay stylish and confident.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white transition">Men</a></li>
          <li><a href="#" className="hover:text-white transition">Women</a></li>
          <li><a href="#" className="hover:text-white transition">Kids</a></li>
          <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
        <ul className="space-y-2 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          <li><a href="#" className="hover:text-white transition">Shipping</a></li>
          <li><a href="#" className="hover:text-white transition">Returns</a></li>
          <li><a href="#" className="hover:text-white transition">FAQ</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
        <p className="text-gray-400 text-sm mb-3">
          Subscribe to our newsletter to get the latest updates and offers.
        </p>
        <form className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
          >
            Subscribe
          </button>
        </form>

        <div className="flex gap-3 mt-4">
          <a href="#" className="hover:text-white transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-white transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-white transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-white transition">
            <i className="fab fa-pinterest"></i>
          </a>
        </div>
      </div>
    </div>

    <div className="mt-10  border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm pb-10">
     <p>
  © 2026 Clothing Store | Designed & Developed by{"  "}
  <span className="text-white font-medium">  Anirudha</span>
</p>

      <div className="flex gap-4 mt-3 md:mt-0">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
      </div>
    
    </div>
  </div>
</footer>
</>
  )
}

export default Footer
