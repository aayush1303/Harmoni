import React from 'react'
import heroImage from "../assets/ecom.jpg"
const Hero = () => {
    return (
        <div className="relative w-full h-screen bg-cover " style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="flex items-center justify-center h-full relative z-10 text-center text-black px-4 sm:px-8 md:px-16 ">
                <div className='lg:w-[50%]'>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
                        Welcome to <span className="text-yellow-400 ">My Store</span> Your Shopping Destination
                    </h1>
                    <p className="text-lg sm:text-xl mb-6 text-gray-800">
                    Discover a wide range of products tailored just for you. Shop with ease
                    and find exactly what you need.
                    </p>
                    <button className="bg-yellow-400 text-black px-8 py-3 text-xl font-semibold rounded-lg hover:bg-yellow-500 transition-all">
                        Shop Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero