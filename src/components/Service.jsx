import React from "react";
import { FaShippingFast, FaHeadset, FaShieldAlt } from "react-icons/fa";

const Service = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 text-center py-10">
      <div className="flex flex-col items-center">
        <div className="bg-gray-200 p-4 rounded-full">
          <FaShippingFast className="text-3xl text-black" />
        </div>
        <h3 className="font-bold mt-4">FREE AND FAST DELIVERY</h3>
        <p className="text-gray-600">Free delivery for all orders over $140</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-gray-200 p-4 rounded-full">
          <FaHeadset className="text-3xl text-black" />
        </div>
        <h3 className="font-bold mt-4">24/7 CUSTOMER SERVICE</h3>
        <p className="text-gray-600">Friendly 24/7 customer support</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-gray-200 p-4 rounded-full">
          <FaShieldAlt className="text-3xl text-black" />
        </div>
        <h3 className="font-bold mt-4">MONEY BACK GUARANTEE</h3>
        <p className="text-gray-600">We return money within 30 days</p>
      </div>
    </div>
  );
};

export default Service;
