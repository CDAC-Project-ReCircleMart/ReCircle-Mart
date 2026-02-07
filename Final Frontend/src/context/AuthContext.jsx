import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";


// CREATE CONTEXT
const AuthContext = createContext();

// PROVIDER
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔴 LOAD USER FROM LOCAL STORAGE ON APP START
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp < Date.now() / 1000;

        if (isExpired) {
          // Token is dead: Clean up storage

          console.log("this message is from in if statement ")
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("e2ee_pub");
          localStorage.removeItem("e2ee_priv");
          setUser(null);
        } else {
          // Token is alive: Resume session
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        // Invalid token format: Clean up
        console.log("this message from catch block")
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("e2ee_pub");
        localStorage.removeItem("e2ee_priv");
      }
    }

    setLoading(false);
  }, []);
  // 🔴 LOGIN FUNCTION
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const { token, user } = res.data;

    // SAVE TO LOCAL STORAGE
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // UPDATE STATE
    setUser(user);

    return user;
  };

  // 🔴 REGISTER FUNCTION
  const register = async (data) => {
    // data = { firstName, lastName, email, password, avatar }
    const res = await api.post("/auth/register", data);
    return res.data;
  };

  // 🔴 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK (EASY TO USE)
export function useAuth() {
  return useContext(AuthContext);
}
