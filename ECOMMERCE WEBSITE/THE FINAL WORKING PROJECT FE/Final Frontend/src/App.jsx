import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import PublicRoutes from "./routes/PublicRoutes";

// 🔴 ADD THIS
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
 
      <AuthProvider>
        <div className="app-wrapper">
          {/* NAVBAR */}
          <Navbar />

          {/* TOAST */}
          <ToastContainer position="top-right" autoClose={3000} />

          {/* ROUTES */}
          <PublicRoutes />
        </div>
      </AuthProvider>
  
  );
}

//later use
// import ProtectedRoute from "./routes/ProtectedRoute";

// <Route element={<ProtectedRoute />}>
//   <Route path="/profile" element={<Profile />} />
//   <Route path="/edit-profile" element={<EditProfile />} />
//   <Route path="/sell" element={<Sell />} />
//   <Route path="/messages" element={<Messages />} />
// </Route>
