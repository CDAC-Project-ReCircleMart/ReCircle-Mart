import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home/Home.jsx";
import Messages from "./pages/Messages/Messages.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
import Favourites from "./pages/Favourites/Favourites";

// Login and Register
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

//Sell form
import Sell from "./pages/Sell/Sell";
import CarForm from "./pages/Sell/SubCategory/CarForm.jsx";
import BikeForm from "./pages/Sell/SubCategory/BikeForm.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import ScooterForm from "./pages/Sell/SubCategory/ScooterForm";
import BicycleForm from "./pages/Sell/SubCategory/BicycleForm";
import FurnitureForm from "./pages/Sell/SubCategory/FurnitureForm";
import ElectronicsForm from "./pages/Sell/SubCategory/ElectronicsForm";
import FashionForm from "./pages/Sell/SubCategory/FashionForm";

// Navbar
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <div className="app-wrapper">
      {/* NAVBAR ALWAYS ON TOP */}
      <Navbar />

      {/* PAGE CONTENT */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Product detail */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* NAV BAR LINKS */}
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/favourites" element={<Favourites />} />

        {/* SELL CATEGORY PAGE */}
        <Route path="/sell" element={<Sell />} />

        {/* CAR FORM */}
        <Route path="/sell/cars" element={<CarForm />} />

        {/* BIKE FORMS – DYNAMIC SUB CATEGORY */}
        <Route path="/sell/bikes/:type" element={<BikeForm />} />
        <Route path="/sell/bikes/scooters" element={<ScooterForm />} />
        <Route path="/sell/bikes/bicycles" element={<BicycleForm />} />

        {/* furniture */}
        <Route path="/sell/furniture" element={<FurnitureForm />} />

        {/* Electronics */}
        <Route path="/sell/electronics" element={<ElectronicsForm />} />

        {/* Electronics */}
        <Route path="/sell/Fashion" element={<FashionForm />} />
      </Routes>
    </div>
  );
}
