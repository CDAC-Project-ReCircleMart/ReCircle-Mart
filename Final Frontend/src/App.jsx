import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import PublicRoutes from "./routes/PublicRoutes";
import { AuthProvider } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Login from "./pages/auth/Login";


export default function App() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Hide navbar for admin routes
  const isAdminPage = location.pathname.startsWith("/admin");
  const shouldShowNavbar = !isAdminPage;

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showLogin]);

  // return (
  //   <AuthProvider>
  //     <div className="app-wrapper">
  //       {/* NAVBAR - Only show for non-admin pages */}
  //       {shouldShowNavbar && <Navbar />}

  //       {/* TOAST */}
  //       <ToastContainer position="top-right" autoClose={3000} />

  //       {/* ROUTES */}
  //       <PublicRoutes />
  //     </div>
  //   </AuthProvider>
  // );

  return (
    <AuthProvider>
      <div className="app-wrapper">
        {/* NAVBAR - Only show for non-admin pages */}
        {shouldShowNavbar && (
          <Navbar onLoginClick={() => setShowLogin(true)} />
        )}

        {/* ROUTES */}
        <div className={showLogin ? "page-disabled" : ""}>
          <PublicRoutes />
        </div>

        {/* LOGIN OVERLAY */}
        {showLogin && <Login onClose={() => setShowLogin(false)} />}

        {/* TOAST */}
        <ToastContainer position="top-right" autoClose={3000} />

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
