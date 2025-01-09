import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CLink,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import {
  cilArrowBottom,
  cilArrowTop,
  cilOptions,
  cilChartPie,
  cilBell,
  cilCalculator,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPeople,
  cilStorage,
  cilSchool,
  cilUser,
  cilFile,
  cilRoom,
  cilLibrary,
  cilBook,
  cilColumns,
  cilColorBorder,
  cilInstitution,
  cilWc,
} from '@coreui/icons'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import MaterialTable from 'material-table'

const WidgetsDropdown1 = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allBCOdata, setAllBCOdata] = useState([])
  const [allSchoolData, setAllSchoolData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])
  const [allEmployeeData, setAllEmployeeData] = useState([])
  const [allBookCaptainData, setAllBookCaptainData] = useState([])
  const [allStudentData, setAllStudentData] = useState([])
  const [allLibraryData, setAllLibraryData] = useState([])

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')
      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      await getAllSchool(console.log('get all school called'))
      await getAllTeacher(console.log('get all teacher called'))
      await getAllEmployee(console.log('get all employee called'))
      await getAllBookCaptain(console.log('get all BookCaptain called'))
      await getAllLibrary()
      await getAllStudent()
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Filter Teacher data
  const headTeacherTrained = allTeacherData.filter((item) => item.headteacherTraining === 'Yes')
  const instructG1Trained = allTeacherData.filter((item) => item.instructionG1 === 'Yes')
  const instructG2Trained = allTeacherData.filter((item) => item.instructionG2 === 'Yes')
  const srmPrimaryTrained = allTeacherData.filter((item) => item.instructionPreprimary === 'Yes')
  const libraryTrained = allTeacherData.filter((item) => item.libraryManagementSRM === 'Yes')
  const goodGovornanceTrained = allTeacherData.filter(
    (item) => item.goodGovernanceHeadteacher === 'Yes',
  )
  const schoolPerformanceTrained = allTeacherData.filter(
    (item) => item.school_performance_headteacher === 'Yes',
  )

  const allTrainedTeacher =
    instructG1Trained.length +
    instructG2Trained.length +
    headTeacherTrained.length +
    libraryTrained.length +
    goodGovornanceTrained.length +
    schoolPerformanceTrained.length
  // Filter Teacher data

  // Get All School Data
  const getAllSchool = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/di-school', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllSchoolData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All School Data

  // Get All Employee Data
  const getAllEmployee = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/employees', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllEmployeeData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Employee Data

  // Get All Teacher
  const getAllTeacher = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/di-teacher', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllTeacherData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Teacher

  // Get All Book-checkout Data for school
  const getAllBookCheckoutSchool = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/book-checkouts', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBCOdata(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Book-checkout Data for school

  // Get All BookCaptain Data
  const getAllBookCaptain = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/book-captain', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBookCaptainData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All BookCaptain Data

  // Get All Library Data
  const getAllLibrary = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/library', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLibraryData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Library Data

  // Get All Student Data
  const getAllStudent = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/student', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllStudentData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Student Data

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
      </Box>
    )
  }

  return (
    <CRow>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilRoom} height={24} />}
            title={
              <>
                LP Covered District(s) : 9 <span className="fs-6 fw-normal"></span>
                <br></br>
                GEP Covered District(s) : 9 <span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of District(s) Coverd"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CIcon icon={cilInstitution} height={24} />}
            title={
              <>
                LP School(s) : 2217 <span className="fs-6 fw-normal"></span>
                <br></br>
                GEP School(s) : 118 <span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of School(s) Supported"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="info"
            icon={<CIcon icon={cilUser} height={24} />}
            title={
              <>
                LP Teacher(s) : 13929 <span className="fs-6 fw-normal"></span>
                <br></br>
                LP Teacher(s) : 124 <span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of Teacher(s) Supported"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="warning"
            icon={<CIcon icon={cilSchool} height={24} />}
            title={
              <>
                LP Student(s) : 870105<span className="fs-6 fw-normal"></span>
                <br></br>
                GEP Student(s) : 11549<span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of Student(s) Supported"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="danger"
            icon={<CIcon icon={cilColumns} height={24} />}
            title={
              <>
                LP Library(s) : 12077 <span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of Classroom Corner Library(s) Established"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="dark"
            icon={<CIcon icon={cilWc} height={24} />}
            title={
              <>
                Oriented Book Captain(s) : 31858
                <span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of Book Captain(s) Oriented"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilColorBorder} height={24} />}
            title={
              <>
                No of Book(s) Developed : ####<span className="fs-6 fw-normal"></span>
                <br></br>
                No of Book(s) Distributed : 3087609<span className="fs-6 fw-normal"></span>
              </>
            }
            value="QRM Information"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="primary"
            icon={<CIcon icon={cilUser} height={24} />}
            title={
              <>
                Trained Govt. Official(s) : 188 <span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of Govt. Official(s) Trained"
          />
        </CLink>
      </CCol>

      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="info"
            icon={<CIcon icon={cilUser} height={24} />}
            title={
              <>
                Trained Master Trainer(s) : 138 <span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of Master Trainer(s) Trained"
          />
        </CLink>
      </CCol>
      <CCol sm={4} lg={4}>
        {/* <CLink href="/training">
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilColorBorder} height={24} />}
            title={
              <>
                <strong>DI Program : </strong>389<span className="fs-6 fw-normal"></span>
                <br></br>
                <strong>Custom Project : </strong>129<span className="fs-6 fw-normal"></span>
              </>
            }
            value="No of Book(s) Developed"
          />
        </CLink> */}
      </CCol>
      <CCol sm={4} lg={4}>
        <CLink href="/di/base/district">
          <CWidgetStatsF
            className="mb-3"
            color="success"
            icon={<CIcon icon={cilRoom} height={24} />}
            title={
              <>
                <strong></strong>WFP USDA, UNICEF HOST, UNICEF REFUGEE
                <span className="fs-6 fw-normal"></span>
                <br></br>
                <strong>ESHO SHIKHI, WORLD BANK</strong>
                <span className="fs-6 fw-normal"></span>
              </>
            }
            value="Name of Custom Project(s)"
          />
        </CLink>
      </CCol>

      <CCol sm={4} lg={4}></CCol>
    </CRow>
  )
}

export default WidgetsDropdown1
