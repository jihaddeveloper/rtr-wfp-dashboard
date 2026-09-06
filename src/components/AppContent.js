//  Author: Mohammad Jihad Hossain
//  Create Date: 12/07/2025
//  Modify Date: 12/07/2026
//  Description: AppContent  file

import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import ProtectedRoute from '../components/ProtectedRoute'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            const Component = route.element // Assign component reference
            if (!Component) return null

            return (
              Component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <ProtectedRoute allowedRoles={route.allowedRoles}>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              )
            )
          })}

          {/* Fallback for routes inside DefaultLayout */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
