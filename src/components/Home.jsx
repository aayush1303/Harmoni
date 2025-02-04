import React,{useState} from 'react'
import Nav from './Nav'
import Hero from './Hero'
import Banner from './Banner'
import Products from './Products'
import Service from './Service'
import Footer from './Footer'

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productList, setProductList] = useState([]);

    const handleSearch = (category, products) => {
        setSelectedCategory(category);
        setProductList(products);
    };


    return (
        <>
            <Nav onSearch={handleSearch} />
            <Hero />
            <Banner/>
            <Products />
            <Service/>
            <Footer/>
        </>
    )
}

export default Home