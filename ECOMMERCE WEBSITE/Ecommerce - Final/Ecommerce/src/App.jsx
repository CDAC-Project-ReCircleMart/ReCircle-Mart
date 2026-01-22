/**
 * App.jsx
 * Root component of the app
 * All page routes are defined here
 *
 * For now:
 * - Only Home page is active
 * - Other routes are placeholders so navigation doesn't break
 */

import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home/Home.jsx";
import Messages from "./pages/Messages/Messages.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
import Favourites from "./pages/Favourites/Favourites";
import Login from "./pages/Login/Login";
import ProductDetail from "./pages/Product/ProductDetail.jsx";

<Route path="/product/:id" element={<ProductDetail />} />


export default function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Temporary placeholder routes (so links work) */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<div>Register Page</div>} />
        <Route path="/product/:id" element={<div>Product Detail Page</div>} />
        <Route path="/sell" element={<div>Sell Page</div>} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/Favourites" element={<Favourites />} />

      </Routes>
    </div>
  );
}
