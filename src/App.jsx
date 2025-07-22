import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="bg-background text-foreground">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        richColors
        duration={1000}
        visibleToasts={2}
      />
    </div>
  );
};

export default App;
