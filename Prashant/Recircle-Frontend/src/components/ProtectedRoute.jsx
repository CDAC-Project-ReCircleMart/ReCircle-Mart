import React from 'react'

import { useAuth } from '../providers/AuthProvider'

import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function ProtectedRoute({ children }) {
    const { user } = useAuth();
    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!user) {
    //         toast.error("Please login to continue");
    //         navigate("/login", { replace: true });
    //     }
    // }, [user, navigate]);

    // if (!user) return null; // prevent flicker

    // return children;

    return user ? children : <Navigate to='/login' />
}



export default ProtectedRoute
