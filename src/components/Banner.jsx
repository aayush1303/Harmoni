import React from 'react'

const Banner = () => {
    return (
        <div className='w-full h-[300px] bg-black text-white flex flex-col items-start justify-center'>
            <div className="flex gap-4 flex-col items-start pl-10 w-[90%]">
                <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    Discover Your Next Favorite Item
                </h2>
                <p className="text-lg md:text-xl">
                    Browse our exclusive collection and find the perfect product tailored just for you.
                </p>
            </div>
            <div className="flex space-x-4 mt-5 pl-10">
                <button className="bg-white text-black px-6 py-2 rounded-lg hover:text-black hover:bg-yellow-400">
                    Shop Now
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-2 rounded-lg hover:bg-yellow-400 hover:border-transparent hover:text-black">
                    Explore
                </button>
            </div>
        </div>
    )
}

export default Banner