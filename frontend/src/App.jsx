import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Contact from "./pages/contact/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Mens from "./pages/Mens/Mens.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home.jsx";
import AddNewProduct from "./pages/admin/AddNewProduct.jsx";
import Products from "./pages/admin/Products.jsx";
import "./App.css";
import { LoginModalProvider } from "./context/LoginModal.jsx";
import Login from "./pages/modal/Login.jsx";

function App() {
  return (
    <>
      <LoginModalProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose="3000"
            toastClassName="custom-toast"
          />

          

          <Header />
          <ScrollToTop />
          <Routes>
            <Route path="/mens" element={<Mens></Mens>}></Route>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="/contact" element={<Contact></Contact>}></Route>
            <Route path="/mens" element={<Mens></Mens>}></Route>
            <Route
              path="/product/:id"
              element={<ProductDetails></ProductDetails>}
            ></Route>

            {/* Admin Routes */}

            <Route path="/admin/products" element={<Products />}></Route>
            <Route
              path="/admin/addProduct"
              element={<AddNewProduct></AddNewProduct>}
            ></Route>
          </Routes>
          <Footer />
              <Login></Login>

        </Router>
      </LoginModalProvider>
    </>
  );
}

export default App;
