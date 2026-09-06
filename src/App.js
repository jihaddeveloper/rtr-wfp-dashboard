//  Author: Mohammad Jihad Hossain
//  Create Date: 12/07/2025
//  Modify Date: 12/07/2026
//  Description: App  file

import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DashboardPrevail = React.lazy(() => import('./views/dashboard/DashboardPrevail'))
const DashboardWFP = React.lazy(() => import('./views/dashboard/DashboardWFP'))
const Login2 = React.lazy(() => import('./views/pages/login/Login2'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// 🔐 Dynamic Guard for Protected Pages
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user')
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

// 🔓 Dynamic Guard for Auth Pages (Prevents logged-in users from seeing the login page again)
const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user')
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            {/* Public Auth Routes */}
            <Route
              path="/login"
              name="Login Page"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route path="/signup" name="Register Page" element={<Register />} />
            <Route path="/404" name="Page 404" element={<Page404 />} />
            <Route path="/500" name="Page 500" element={<Page500 />} />
            {/* Public Auth Routes */}

            {/* Base Redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            {/* Base Redirect */}

            {/* Fallback to Dashboard / Shell Routing Layout */}
            <Route
              path="/*"
              name="Admin Home"
              element={
                <ProtectedRoute>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />
            {/* Fallback to Dashboard / Shell Routing Layout */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
