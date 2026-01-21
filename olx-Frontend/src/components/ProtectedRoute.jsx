import React from 'react'

import { Navigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

function ProtectedRoute({ children }) {
    // get the user info from AuthContext
    const { user } = useAuth

    return user ? children : <Navigate to='/login' />
}

export default ProtectedRoute
