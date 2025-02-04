import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-10 mx-auto">
        {/* Exclusive Section */}
        <div>
          <h3 className="font-bold text-lg">Exclusive</h3>
          <p className="mt-2">Subscribe</p>
          <p className="text-gray-400 text-sm">Get 10% off your first order</p>
          <div className="flex items-center mt-3 border border-white p-2 rounded-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none text-white flex-1 placeholder-gray-400"
            />
            <FaPaperPlane className="text-white cursor-pointer" />
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-bold text-lg">Support</h3>
          <p className="mt-2">1234, Park Street, DL-1111, India.</p>
          <a href="mailto:Test@testmail.com" className="text-gray-400 block hover:text-yellow-400">
            Test@testmail.com
          </a>
          <p className="mt-2">+91-999-999-9999</p>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="font-bold text-lg">Account</h3>
          <ul className="mt-2 space-y-2">
            <li className="hover:text-yellow-400 cursor-pointer">My Account</li>
            <li className="hover:text-yellow-400 cursor-pointer">Login / Register</li>
            <li className="hover:text-yellow-400 cursor-pointer">Cart</li>
            <li className="hover:text-yellow-400 cursor-pointer">Wishlist</li>
            <li className="hover:text-yellow-400 cursor-pointer">Shop</li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="font-bold text-lg">Quick Link</h3>
          <ul className="mt-2 space-y-2">
            <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-yellow-400 cursor-pointer">Terms Of Use</li>
            <li className="hover:text-yellow-400 cursor-pointer">FAQ</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        &copy; Copyright Name 2025. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
