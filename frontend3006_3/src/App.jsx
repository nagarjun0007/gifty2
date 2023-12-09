import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import User from "./components/User";
import HeaderMenu from "./components/Header";
import Post from "./components/Gallery";
import { About } from "./components/About";
import ProtectedRoute from "./utils/ProtectedRoute";
import CreatePost from "./components/Post/CreatePost";
import { UserContext } from "./context/UserContext";
import { CartContext } from "./context/CartContext";
import CartFloatingButton from "./components/AddToCart/CartFloatingButton";
import { ProductContext } from "./context/ProductContext";
import { AuthContext } from "./context/AuthContext";
import Checkout from "./components/Checkout";
import axios from "axios";
import { DashboardContext } from "./context/DashboardContext";
function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useState("");
  const [active, setActive] = useState("Profile");
  // axios.defaults.baseURL = "https://gifty-backend.onrender.com/api";
  // axios.defaults.baseURL = "http://localhost:3001/api/"; // api for frontend local
  axios.defaults.baseURL =
    "https://gifty2-gbn1egha3-nagarjun-reddys-projects.vercel.app/"; // api for frontend on vercel

  function updateUserDetails(userData) {
    setUserDetails(userData);
  }

  function updateCart(items) {
    setCart(items);
  }

  function updateProducts(products) {
    setProducts(products);
  }
  function updateAuth(token) {
    setAuth(token);
  }

  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: "'Source Sans 3', sans-serif",
          lineHeight: "1.6",
          headings: {
            fontFamily: "'Playfair Display', serif",
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ToastContainer transition={Slide} />
        <AuthContext.Provider value={{ auth, updateAuth }}>
          <UserContext.Provider value={{ userDetails, updateUserDetails }}>
            <ProductContext.Provider value={{ products, updateProducts }}>
              <CartContext.Provider value={{ cart, updateCart }}>
                <DashboardContext.Provider value={{ active, setActive }}>
                  <HeaderMenu />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/gallery"
                      element={
                        <ProtectedRoute isLoggedIn={userDetails}>
                          <Post />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/user"
                      element={
                        <ProtectedRoute isLoggedIn={userDetails}>
                          <User />
                        </ProtectedRoute>
                      }
                    />{" "}
                    <Route
                      path="/create"
                      element={
                        <ProtectedRoute isLoggedIn={userDetails}>
                          <CreatePost />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute isLoggedIn={userDetails}>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                  <Footer />
                </DashboardContext.Provider>
                <CartFloatingButton />
              </CartContext.Provider>
            </ProductContext.Provider>
          </UserContext.Provider>
        </AuthContext.Provider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
