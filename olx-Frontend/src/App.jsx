import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sell from './pages/Sell';
import Notification from './pages/Notification';
import ProductDetail from './pages/ProductDetail';

import Profile from './pages/Profile/Profile';
import Messages from './pages/Messages';

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <Routes>
        <Route path='/notifications' element={<Notification />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/messages' element={<Messages />} />
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
