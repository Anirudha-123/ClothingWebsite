import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Contact from "./pages/contact/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Mens from "./pages/mens/Mens.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home.jsx";
import AddNewProduct from "./pages/admin/AddNewProduct.jsx";
import Products from "./pages/admin/Products.jsx";
import "./App.css";
import { LoginModalProvider } from "./context/LoginModal.jsx";
import Login from "./pages/modal/Login.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import Checkout1 from "./pages/checkout/Checkout1.jsx";
import Orders from "./pages/order/Orders.jsx";
import OrderDetails from "./pages/order/OrderDetails.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Womens from "./pages/womens/Womens.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import MainLayout from "./components/MainLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import About from "./pages/about/About.jsx";
import ProductsPage from "./pages/productPage/ProductsPage.jsx";



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

          {/* <Header /> */}
          <ScrollToTop />
          <Routes>
            {/* USER ROUTES */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/mens" element={<Mens />} />
              <Route path="/womens" element={<Womens />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/product/:id" element={<ProductDetails />} />
                 <Route path="/checkout1" element={<Checkout1></Checkout1>}></Route>
                             <Route path="/orderSuccess" element={<OrderSuccess></OrderSuccess>}></Route>
            <Route path="/orders" element={<Orders></Orders>}></Route>
<Route path="/orders/:id" element={<OrderDetails />} />


   <Route path="/:category" element={<ProductsPage />} />
<Route path="/:category/:subCategory" element={<ProductsPage />} />

                 
            </Route>

            {/* ADMIN ROUTES */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="addProduct" element={<AddNewProduct />} />
            </Route>
          </Routes>
          {/* <Footer /> */}
          <Login></Login>
        </Router>
      </LoginModalProvider>
    </>
  );
}

export default App;
