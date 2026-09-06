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
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [designation, setDesignation] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [mobile, setMobileNumber] = useState('')
  const [error, setError] = useState('') // State to manage error messages
  const navaigate = useNavigate() // Get the history object for redirection

  const handleSignup = async () => {
    try {
      // Check for empty fields
      if (!name || !email || !password || !confirmPassword || !mobile) {
        setError('Please fill in all fields.')
        return
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        name,
        username,
        employeeId,
        designation,
        email,
        password,
        role,
      })
      // Handle successful signup
      console.log(response.data)
      navaigate('/login')
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
                      value={name}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
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
                  {/* <CInputGroup className="mb-3">
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
                  </CInputGroup> */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPeople} />
                    </CInputGroupText>
                    <CFormSelect value={role} onChange={(e) => setRole(e.target.value)}>
                      <option>Select Role</option>
                      <option value="cmt">CMT</option>
                      <option value="manager">Manager</option>
                      <option value="lpo">LPO</option>
                      <option value="lf">LF</option>
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
