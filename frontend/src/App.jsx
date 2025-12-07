import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ListingDetail from "./pages/ListingDetail";
import SearchListings from "./pages/SearchListings";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Messages from "./pages/Messages";
import CreateListing from "./pages/CreateListing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export default function App() {
  const location = useLocation();

  // Pages where Navbar and Footer should NOT be shown
  const hideNavFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <AuthProvider>
      {!hideNavFooter && <Navbar />}{" "}
      {/* Only show Navbar if not login/register */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/search" element={<SearchListings />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!hideNavFooter && <Footer />}{" "}
      {/* Only show Footer if not login/register */}
    </AuthProvider>
  );
}
