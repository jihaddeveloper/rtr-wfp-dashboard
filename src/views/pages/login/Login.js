//  Author: Mohammad Jihad Hossain
//  Create Date: 12/07/2025
//  Modify Date: 12/07/2026
//  Description: Login  file

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allEmployeeData, setAllEmployeeData] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  // Make sure your backend port matches this and is running!
  const API_URL = 'http://118.179.80.51:8080/api/auth/'

  // Login method
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('') // Clear any previous errors

    try {
      if (!username || !password) {
        setError('Please enter both username and password.')
        return
      }

      const response = await axios.post(API_URL + 'signin', { username, password })
      console.log('Login successful:', response.data)

      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))

        //attach the JWT to every Axios request
        axios.interceptors.request.use((config) => {
          const user = JSON.parse(localStorage.getItem('user'))
          if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`
          }
          return config
        })

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        // attach the JWT to every Axios request
        // Use React Router to navigate
        navigate('/dashboard')
      } else {
        setError('No token received from the server.')
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message)

      if (error.response) {
        // Extract message property if data is an object, fallback to data if string, or generic text
        const serverMessage =
          error.response.data?.message ||
          (typeof error.response.data === 'string'
            ? error.response.data
            : 'Invalid username or password.')

        setError(serverMessage)
      } else {
        setError('Cannot connect to the server. Is your backend running?')
      }
    }
  }

  // Logout method
  const logout = () => {
    localStorage.removeItem('user')
  }
  // Logout method

  // Get All Employee Data
  const getAllEmployee = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('http://118.179.80.51:8080/api/v1/p-employee')
      setAllEmployeeData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load employees:', error)
      setIsLoading(false)
    }
  }

  // Using useEffect to call the API once mounted
  useEffect(() => {
    getAllEmployee()
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>

                    {/* 👇 Visual error feedback helper */}
                    {error && (
                      <div className="alert alert-danger p-2 small mb-3" role="alert">
                        {error}
                      </div>
                    )}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
