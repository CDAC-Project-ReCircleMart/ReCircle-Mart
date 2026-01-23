import React from 'react';
import { ToastContainer } from 'react-toastify'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sell from './pages/Sell';
import Notification from './pages/Notification';
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from "./components/ProtectedRoute"
import Profile from './pages/Profile/Profile';
import Messages from './pages/Messages';
import Fav from './pages/Fav';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <div className="app-root">

      <AuthProvider>
        <Navbar />
        <Routes>

          <Route path='/fav' element={<Fav />} />
          <Route path='/notifications' element={<Notification />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/messages' element={<Messages />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/listing/:id" element={<ProductDetail />} />
        </Routes>

      </AuthProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
