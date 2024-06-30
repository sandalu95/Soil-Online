import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import SignUp from "./pages/SignUp/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop/Shop";
import "./App.css";
import { useState } from "react";
import {
  getLoggedInUser,
  removeLoggedInUser,
  setLoggedInUser,
} from "./data/repository";
import { CartContextProvider } from "./context/CartContext";
import Settings from "./pages/Profile/Settings/Settings";
import Address from "./pages/Profile/Address/Address";
import Orders from "./pages/Profile/Orders/Orders";
import Blog from "./pages/Blog/Blog";
import Article from "./pages/Blog/Article";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Shipping from "./pages/Shipping/Shipping";
import Checkout from "./pages/Checkout/Checkout";
import MealPlanning from "./pages/Meal Planning/MealPlanning";
import Product from "./pages/Product/Product";
import { ToastContainer } from "react-toastify";
import {
  getCartItems,
  addToCartAPI,
  deleteCartAPI,
  findOrCreateCart,
  removeFromCartAPI,
  updateItemAmount,
  getStoredCartId,
  storeCartId,
  removeCartId,
} from "./data/cart";
import { findProduct } from "./data/products";

const cartRepository = {
  getCartItems,
  addToCartAPI,
  deleteCartAPI,
  findOrCreateCart,
  removeFromCartAPI,
  updateItemAmount,
  getStoredCartId,
  storeCartId,
  removeCartId,
};

const productRepository = { findProduct };

function App() {
  const [user, setUser] = useState(getLoggedInUser());

  const logout = () => {
    removeLoggedInUser();
    setUser(undefined);
    removeCartId();
  };

  const login = (user) => {
    setLoggedInUser(user);
    setUser(user);
  };

  return (
    <div className="app-container">
      <Router>
        <CartContextProvider
          user={user}
          cartRepository={cartRepository}
          productRepository={productRepository}
        >
          <Header onLogout={logout} />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/account" element={<Profile />}>
              <Route path="orders" element={<Orders user={user} />}></Route>
              <Route path="settings" element={<Settings user={user} />}></Route>
              <Route path="addresses" element={<Address user={user} />}></Route>
            </Route>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/signUp" element={<SignUp onLogin={login} />} />
            <Route path="/cart" element={<Cart user={user} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/products/:product-name" element={<Product />} />
            <Route path="/diet-plans" element={<MealPlanning />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping-delivery" element={<Shipping />} />
            <Route path="/blog/article/:id" element={<Article />} />
            <Route path="/checkout" element={<Checkout user={user} />} />
          </Routes>
          <Footer />
        </CartContextProvider>
      </Router>
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}

export default App;
