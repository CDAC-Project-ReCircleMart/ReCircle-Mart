import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import PublicRoutes from "./routes/PublicRoutes";
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
