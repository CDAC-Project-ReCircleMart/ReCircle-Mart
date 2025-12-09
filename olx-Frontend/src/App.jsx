import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sell from './pages/Sell';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        {/* to home page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/listing/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}

export default App;
