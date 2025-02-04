import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { GoPerson } from "react-icons/go";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";


const Nav = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);

    const cartItems = useSelector((state) => Object.values(state.cart.cartItems));
    const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const fetchProducts = (query) => {
        if (query) {
            fetch(`https://fakestoreapi.com/products/category/${query}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0) {
                        alert("Category not found! Try 'jewelery' or 'men's clothing'.");
                        return;
                    }
    
                    setProducts(data);
                    console.log("Fetched Products:", data);
                    onSearch(query, data);
                    const existingData = JSON.parse(localStorage.getItem("categories")) || [];
    
                    // Check if category already exists
                    const categoryExists = existingData.some(item => item.category === query);
    
                    if (!categoryExists) {
                        const updatedData = [...existingData, { category: query, products: data }];
                        localStorage.setItem("categories", JSON.stringify(updatedData));
                    }
                    alert("Data fetched successfully!");
                    setSearchQuery("");
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                    alert("An error occurred while fetching products.");
                });
        }
    };
    


    return (
        <nav className="fixed top-0 left-0 w-full bg-yellow-400 text-black flex justify-between items-center py-4 px-10 shadow-lg z-[1000]">
            <FaBarsStaggered 
                className="cursor-pointer hover:text-gray-400 flex lg:hidden" 
                onClick={toggleSidebar} 
            />
            <div className="text-2xl font-bold">Harmoni</div>

            <ul className="hidden lg:flex space-x-6 text-md font-semibold">
                <li className="cursor-pointer">Homepage</li>
                <li className="cursor-pointer">Categories</li>
                <li className="cursor-pointer">Contact Us</li>
                <li className="relative group cursor-pointer">
                    <p className="flex items-center gap-2 justify-center">More Options <IoIosArrowDown /></p>
                    <div className="absolute left-0 hidden mt-4 border-t-4 border-black rounded-b-lg bg-white text-black shadow-lg group-hover:block">
                        <ul className="space-y-2 p-4 gap-2 flex flex-col items-start px-10 ">
                            <li className="text-nowrap">Men</li>
                            <li className="text-nowrap">Women</li>
                            <li className="text-nowrap">Kids</li>
                        </ul>
                    </div>
                </li>
            </ul>

            <div className="flex space-x-6 items-center">
                <FaSearch className="cursor-pointer hover:text-gray-400 text-xl" onClick={toggleOverlay} />
                <div className="relative text-xl">
                    <GrCart className="cursor-pointer hover:text-gray-400" />
                    <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {totalQty}
                    </span>
                </div>
                <div className="lg:flex items-center justify-center rounded-full p-2 text-white bg-black hidden">
                    <GoPerson className="cursor-pointer hover:text-gray-400 lg:flex hidden" />
                </div>
            </div>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-[1100] transform transition-transform duration-500 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="text-2xl font-bold">Harmoni</div>
                    <FaTimes 
                        className="cursor-pointer text-xl hover:text-gray-400" 
                        onClick={toggleSidebar} 
                    />
                </div>
                <ul className="flex flex-col space-y-4 p-6 text-lg font-semibold">
                    <li className="cursor-pointer hover:text-yellow-500">Homepage</li>
                    <li className="cursor-pointer hover:text-yellow-500">Categories</li>
                    <li className="cursor-pointer hover:text-yellow-500">Contact Us</li>
                </ul>
            </div>

            {/* Overlay */}
            <div
                className={`fixed top-0 left-0 w-full h-[50vh] shadow-lg bg-white rounded-b-lg transition-transform duration-500 ease-in-out transform ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
            >
                <div className="flex justify-between items-center p-4">
                    <div className="text-2xl font-bold">Harmoni</div>
                    <FaTimes className="cursor-pointer" onClick={toggleOverlay} />
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Search category..."
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && fetchProducts(searchQuery)}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Nav;
