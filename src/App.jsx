import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import ProductDetail from "./Components/ProductDetail";

const App = () => {
  return (
    <div className="bg-[#fdfffc]">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
