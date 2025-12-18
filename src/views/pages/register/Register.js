import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'
import { cilLockLocked, cilUser, cilPhone, cilPeople } from '@coreui/icons'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('ROLE_CUSTOMER')
  const [mobile, setMobileNumber] = useState('')
  const [error, setError] = useState('') // State to manage error messages
  const history = useNavigate() // Get the history object for redirection

  const handleSignup = async () => {
    try {
      // Check for empty fields
      if (!fullName || !email || !password || !confirmPassword || !mobile) {
        setError('Please fill in all fields.')
        return
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const response = await axios.post('http://localhost:8081/auth/signup', {
        fullName,
        email,
        password,
        role,
        mobile,
      })
      // Handle successful signup
      console.log(response.data)
      history('/dashboard')
    } catch (error) {
      // Handle signup error
      console.error('Signup failed:', error.response ? error.response.data : error.message)
      setError(error.response ? error.response.data : error.message)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  {/* Render error message if exists */}
                  {error && <p className="text-danger">{error}</p>}
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      autoComplete="username"
                      id="fullName"
                      placeholder={'Full Name'}
                      value={fullName}
                      type="text"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      id="email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Mobile Number"
                      autoComplete=""
                      id="mobileNumber"
                      value={mobile}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPeople} />
                    </CInputGroupText>
                    <CFormSelect value={role} onChange={(e) => setRole(e.target.value)}>
                      <option>Select Role</option>
                      <option value="ROLE_CMT">CMT</option>
                      <option value="ROLE_MANAGER">Manager</option>
                      <option value="ROLE_LPO">LPO</option>
                      <option value="ROLE_LF">LF</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" onClick={handleSignup}>
                      Create Account
                    </CButton>
                  </div>
                  <div className="d-grid">
                    <p>
                      Already Register? <a href="/login">Login</a>
                    </p>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
