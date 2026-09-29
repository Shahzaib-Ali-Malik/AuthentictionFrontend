import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = ({ userRole }) => {
  const { user } = useSelector(store => store.authReducer)

  // 1. If not logged in, send to login
  if (!user) {
    return <Navigate to='/login' replace />
  }

  console.log("user",user);
  
  console.log("Current User Role:", user.role, "| Required Role:", userRole);

  // 2. If a specific role is required and doesn't match
  if (userRole && user.role !== userRole) {
    // Prevent redirect loops by checking where they should go
    if (user.role === 'seller') {
      return <Navigate to="/admin-dashboard" replace />
    }
    return <Navigate to="/main" replace />
  }
  
  return <Outlet />
}

export default ProtectedRoute