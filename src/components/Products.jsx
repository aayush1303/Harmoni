import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,incrementQty, decrementQty  } from "../redux/cartSlice";


const Products = () => {
    const [randomProducts, setRandomProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cartItems);


    const loadCategories = () => {
        const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
        setCategories(storedCategories);
    };

    useEffect(() => {
        loadCategories(); // Load initially

        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setRandomProducts(data))
            .catch((err) => console.error("Error fetching products:", err));

        // Poll for localStorage changes
        const interval = setInterval(() => {
            loadCategories();
        }, 1000); // Check every second

        return () => clearInterval(interval);
    }, []);


    // Remove category and update localStorage
    const onClearCategory = (categoryToRemove) => {
        const updatedCategories = categories.filter(({ category }) => category !== categoryToRemove);
        localStorage.setItem("categories", JSON.stringify(updatedCategories));
        setCategories([...updatedCategories]); // Trigger re-render
    };


    const truncate = (text, limit) =>
        text.length > limit ? text.substring(0, limit) + "..." : text;

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-400" />
                ))}
                {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-yellow-400" />
                ))}
            </div>
        );
    };

    const displayedProducts =
        categories.length > 0
            ? categories.flatMap(({ products }) => products)
            : randomProducts;

    return (
        <div className="w-full p-10 lg:p-20 lg:px-10">
            <div className="flex gap-2 items-start mb-4">
                <div className="bg-orange-400 h-8 w-3"></div>
                <p className="text-lg text-orange-400 font-semibold">Our Products</p>
            </div>
            <h3 className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold mb-10">
                Explore Our Products
            </h3>

            {categories.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-10">
                    {categories.map(({ category }) => (
                        <button
                            key={category}
                            onClick={() => onClearCategory(category)}
                            className="bg-yellow-400 text-black px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            {category} <IoClose className="text-lg" />
                        </button>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {displayedProducts.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
                    >
                        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                            <img
                                className="object-cover w-full h-full"
                                src={product.image}
                                alt={product.title}
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-4 px-5 pb-5 flex flex-col flex-1">
                            <h5 className="text-xl text-center tracking-tight text-slate-900">
                                {truncate(product.title, 25)}
                            </h5>

                            {/* Push everything else to the bottom */}
                            <div className="flex flex-col flex-1 justify-end">
                                <div className="mt-2 gap-3 mb-4 flex flex-col items-center">
                                    <p className="text-3xl font-bold text-slate-900">${product.price}</p>
                                    <div className="flex items-center">{renderStars(product.rating?.rate || 0)}</div>
                                </div>
                                <button onClick={() => dispatch(addToCart(product))}
                                    className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-400">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Product Modal */}
            {selectedProduct && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setSelectedProduct(null)}
                >
                    <div
                        className="relative bg-white rounded-2xl top-10 shadow-lg p-4 md:p-7 w-11/12 md:w-2/3 lg:w-1/2 max-w-3xl flex flex-col md:flex-row items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <IoClose size={24} />
                        </button>

                        {/* Image */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-60 h-60 object-contain"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="w-full md:w-1/2 px-5 md:px-8">
                            <h2 className="text-xl md:text-2xl font-semibold">{selectedProduct.title}</h2>
                            <div className="flex items-center mt-2">
                                {renderStars(selectedProduct.rating?.rate || 0)}
                                <span className="ml-2 text-sm text-gray-600">
                                    ({selectedProduct.rating?.count || 0} Reviews)
                                </span>
                            </div>
                            <p className="text-lg font-bold text-gray-800 mt-2">${selectedProduct.price}</p>
                            <p className="text-gray-600 text-sm mt-2">{truncate(selectedProduct.description, 400)}</p>
                            {/* Quantity & Buy Now */}
                            <div className="flex items-center mt-4">
                                <button onClick={() => dispatch(decrementQty(selectedProduct.id))} className="border border-gray-300 px-3 py-1 rounded-l bg-gray-100">
                                    -
                                </button>
                                <span className="px-4 py-1 border border-gray-300">{cart[selectedProduct.id]?.quantity || 0}</span>
                                <button onClick={() => dispatch(incrementQty(selectedProduct.id))} className="border border-gray-300 px-3 py-1 rounded-r bg-gray-100">
                                    +
                                </button>
                            </div>

                            <button className="w-full mt-4 bg-black text-white py-2.5 rounded-md hover:bg-yellow-400">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
