import { Routes, Route } from "react-router-dom";
import Home from "../components/user/Home";
import ProductDetail from "../components/user/ProductDetail";

export default function PublicRoutes() {
  return (
    <Routes>
      {/* Home / Listings page */}
      <Route path="/" element={<Home />} />

      {/* Product detail page */}
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
}
