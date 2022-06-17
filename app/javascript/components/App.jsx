import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserAuth from './user/UserAuth';
import Home from "./home/Home";
import Offer from "./offer/Offer";
import NewOffer from "./offer/NewOffer";
import Product from "./product/Product"
import NewCategory from "./category/NewCategory";
import Category from "./category/Category";
import NewProduct from "./product/NewProduct";
import Carts from "./cart/Carts";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fruit" element={<UserAuth />} />
                <Route path="/cart" element={<Carts />} />
                <Route path="/newoffer" element={<NewOffer />} />
                <Route path="/alloffer" element={<Offer />} />
                <Route path="/product" element={<Product />} />
                <Route path="/newproduct" element={<NewProduct />} />
                <Route path="/newcategory" element={<NewCategory />} />
                <Route path="/category" element={<Category />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App;