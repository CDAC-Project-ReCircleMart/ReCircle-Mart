import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Hide navbar for admin routes
  const isAdminPage = location.pathname.startsWith("/admin");
  const shouldShowNavbar = !isAdminPage;

  return (
    <AuthProvider>
      <div className="app-wrapper">
        {/* NAVBAR - Only show for non-admin pages */}
        {shouldShowNavbar && <Navbar />}

        {/* TOAST */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* ROUTES */}
        <PublicRoutes />
      </div>
    </AuthProvider>
  );
}

// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import PublicRoutes from "./routes/PublicRoutes";
// import { AuthProvider } from "./context/AuthContext";

// export default function App() {
//   return (
//     <AuthProvider>
//       <div className="app-wrapper">
//         {/* TOAST */}
//         <ToastContainer position="top-right" autoClose={3000} />

//         {/* ROUTES */}
//         <PublicRoutes />
//       </div>
//     </AuthProvider>
//   );
// }
