import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sell from "./pages/Sell";
import Notification from "./pages/Notification";
import ProductDetail from "./pages/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import Messages from "./pages/Messages";
import Fav from "./pages/Fav";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <div className="app-root">
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* ✅ HOME */}
          <Route path="/" element={<Home />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED */}
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/fav" element={<Fav />} />

          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
