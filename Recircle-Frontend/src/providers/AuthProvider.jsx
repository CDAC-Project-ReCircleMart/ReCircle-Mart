import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user state from local storage
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });


    const login = (userData) => {
        setUser(userData);
        // Save user state to local storage
        localStorage.setItem('user', JSON.stringify(userData));

    };

    const logout = () => {
        setUser(null);
        // Remove user state from local storage
        localStorage.removeItem('user');
        // Optionally, you can also clear the token if it's stored separately
        localStorage.removeItem('token');
    };

    useEffect(() => {
        // Optional: Add logic to check user state on app load
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);