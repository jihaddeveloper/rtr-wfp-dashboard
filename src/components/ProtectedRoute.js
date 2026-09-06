//  Author: Mohammad Jihad Hossain
//  Create Date: 12/07/2026
//  Modify Date: 21/08/2026
//  Description: ProtectedRoute  file

import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

// Mock custom hook representing your Auth State
// Replace this with your actual Redux, Context API, or Auth0 selector
const useAuth = () => {
  const rawUser = localStorage.getItem('user')
  const user = rawUser ? JSON.parse(rawUser) : null
  const token = user.token

  console.log('user: ' + user)

  // Extract roles safely whether it's a string, array, or null
  let userRoles = []

  if (Array.isArray(user.role)) {
    userRoles = user.role
  } else if (typeof user.role === 'string') {
    userRoles = [user.role]
  } else if (Array.isArray(user.roles)) {
    userRoles = user.roles
  } else if (typeof user.roles === 'string') {
    userRoles = [user.roles]
  }

  // Clean up role strings (e.g., convert "lpo" -> "ROLE_LPO" if prefix is missing)
  const normalizedRoles = userRoles.map((r) => {
    const upper = String(r).toUpperCase().trim()
    return upper.startsWith('ROLE_') ? upper : `ROLE_${upper}`
  })

  // if (user?.role) {
  //   userRoles = Array.isArray(user.role) ? user.role : [user.role]
  // } else if (user?.roles) {
  //   userRoles = Array.isArray(user.roles) ? user.roles : [user.roles]
  // }

  if (!user) return { user: null, isAuthenticated: false, role: [] }

  return {
    user: user ? user : null,
    isAuthenticated: !!token,
    role: normalizedRoles,
  }
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, role } = useAuth()
  const location = useLocation()

  console.log('role: ' + role)

  // 1. Not logged in -> Redirect to login
  if (!isAuthenticated) {
    // Redirect unauthenticated users to Login page
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 2. If route requires specific roles, check permissions
  if (allowedRoles && allowedRoles.length > 0) {
    // Normalize required route roles to match uppercase format
    const normalizedAllowed = allowedRoles.map((r) => {
      const upper = String(r).toUpperCase().trim()
      return upper.startsWith('ROLE_') ? upper : `ROLE_${upper}`
    })

    // Check if user has AT LEAST ONE matching role
    const hasPermission = normalizedAllowed.some((allowedRole) => role.includes(allowedRole))

    if (!hasPermission) {
      console.warn(
        `[ProtectedRoute] Access Denied for path "${
          location.pathname
        }". Required: ${normalizedAllowed.join(', ')} | User has: ${role.join(', ')}`,
      )
      return <Navigate to="/500" replace />
    }
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
}

export default ProtectedRoute
