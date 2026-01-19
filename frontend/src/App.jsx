import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

import Home from "./pages/home/Home.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Mens from "./pages/Mens/Mens.jsx";



function App() {
  return (
    <>
      <Router>
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
