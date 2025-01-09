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
  CHeader,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
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

const WidgetsDropdown3 = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allBCOdata, setAllBCOdata] = useState([])
  const [allSchoolData, setAllSchoolData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])
  const [allEmployeeData, setAllEmployeeData] = useState([])
  const [allBookCaptainData, setAllBookCaptainData] = useState([])
  const [allStudentData, setAllStudentData] = useState([])
  const [allLibraryData, setAllLibraryData] = useState([])
  const [allLibraryObsData, setAllLibraryObsData] = useState([])
  const [allBanglaObsData, setAllBanglaObsData] = useState([])

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  const currentYear = new Date().getFullYear()
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

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
      await getAllLibraryObs()
      await getAllBanglaObs()
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

  //Filter Teacher data

  // Teacher number by filter
  const allTeacherG1 = allTeacherData.filter((item) => {
    return item.grade.includes('G1')
  }).length
  const allTeacherG2 = allTeacherData.filter((item) => {
    return item.grade.includes('G2')
  }).length
  // Teacher number by filter

  // Library Observation Data by filter
  const allLibraryObsDataPreviousMonth = allLibraryObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2024'
  }).length

  const allLibraryObsDevPreviousMonth = allLibraryObsData.filter((item) => {
    return (
      item.month === previousMonth && item.year === '2024' && item.libraryStatus === 'Developing'
    )
  }).length

  const allLibraryObsFunPreviousMonth = allLibraryObsData.filter((item) => {
    return (
      item.month === previousMonth && item.year === '2024' && item.libraryStatus === 'Functioning'
    )
  }).length

  const allLibraryObsHighFunPreviousMonth = allLibraryObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length
  // Library Observation Data by filter

  // Bangla Observation Data by filter
  const allG1TeacherCurrentMonth = allBanglaObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2024' && item.grade === 'G1'
  }).length

  const allG1TeacherP1PreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 1'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP2PreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 2'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP3PreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 3'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherCurrentMonth = allBanglaObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2024' && item.grade === 'G2'
  }).length

  const allG2TeacherP1PreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 1'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP2PreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 2'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP3PreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 3'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length
  // Bangla Observation Data by filter

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

  // Get All LibraryObs Data
  const getAllLibraryObs = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/di-library-observation', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLibraryObsData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Get All LibraryObs Data
  const getAllBanglaObs = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/di-bangla-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBanglaObsData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CRow>
      {/* <CHeader>
        <strong>Performance</strong>
      </CHeader> */}
      <CRow>
        <CCol sm={3} lg={3}>
          <CLink href="/bangla/di-bangla-class">
            {/* <CCard className="mb-4">
              <CCardHeader>
                <strong>G1 Teacher Priority</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                      <CTableDataCell>{allG1TeacherP1PreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                      <CTableDataCell>{allG1TeacherP2PreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                      <CTableDataCell>{allG1TeacherP3PreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                      <CTableDataCell>
                        {allG1TeacherP1PreviousMonth +
                          allG1TeacherP2PreviousMonth +
                          allG1TeacherP3PreviousMonth}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard> */}
            <CCard className="mb-3">
              <CCardHeader>
                <strong>G1 Teacher Status Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Priority 1', 'Priority 2', 'Priority 3'],
                    datasets: [
                      {
                        data: [
                          allG1TeacherP1PreviousMonth,
                          allG1TeacherP2PreviousMonth,
                          allG1TeacherP3PreviousMonth,
                        ],
                        backgroundColor: ['#db5e2c', '#FFCE56', '#46db2c'],
                        hoverBackgroundColor: ['#db5e2c', '#FFCE56', '#46db2c'],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="/bangla/di-bangla-class">
            {/* <CCard className="mb-4">
              <CCardHeader>
                <strong>G2 Teacher Priority</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                      <CTableDataCell>{allG2TeacherP1PreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                      <CTableDataCell>{allG2TeacherP2PreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                      <CTableDataCell>{allG2TeacherP3PreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                      <CTableDataCell>
                        {allG2TeacherP1PreviousMonth +
                          allG2TeacherP2PreviousMonth +
                          allG2TeacherP3PreviousMonth}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard> */}
            <CCard className="mb-3">
              <CCardHeader>
                <strong>G2 Teacher Status Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Priority 1', 'Priority 2', 'Priority 3'],
                    datasets: [
                      {
                        data: [
                          allG2TeacherP1PreviousMonth,
                          allG2TeacherP2PreviousMonth,
                          allG2TeacherP3PreviousMonth,
                        ],
                        backgroundColor: ['#db5e2c', '#FFCE56', '#46db2c'],
                        hoverBackgroundColor: [, '#db5e2c', '#FFCE56', '#46db2c'],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="/library/di-library-observation">
            {/* <CCard className="mb-4">
              <CCardHeader>
                <strong>Library Rating</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Developing</CTableHeaderCell>
                      <CTableDataCell>{allLibraryObsDevPreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Functioning</CTableHeaderCell>
                      <CTableDataCell>{allLibraryObsFunPreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">Highly Functioning</CTableHeaderCell>
                      <CTableDataCell>{allLibraryObsHighFunPreviousMonth}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                      <CTableDataCell>
                        {allLibraryObsDevPreviousMonth +
                          allLibraryObsFunPreviousMonth +
                          allLibraryObsHighFunPreviousMonth}
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard> */}
            <CCard className="mb-3">
              <CCardHeader>
                <strong>Library Rating Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Developing', 'Functioning', 'Highly Functioning'],
                    datasets: [
                      {
                        data: [
                          allLibraryObsDevPreviousMonth,
                          allLibraryObsFunPreviousMonth,
                          allLibraryObsHighFunPreviousMonth,
                        ],
                        backgroundColor: ['#db5e2c', '#FFCE56', '#46db2c'],
                        hoverBackgroundColor: [, '#db5e2c', '#FFCE56', '#46db2c'],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="/library/di-library-observation">
            <CCard className="mb-3">
              <CCardHeader>
                <strong>School Rating Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Priority 1', 'Priority 2', 'Priority 3'],
                    datasets: [
                      {
                        data: [
                          allLibraryObsDevPreviousMonth,
                          allLibraryObsFunPreviousMonth,
                          allLibraryObsHighFunPreviousMonth,
                        ],
                        backgroundColor: ['#db5e2c', '#FFCE56', '#46db2c'],
                        hoverBackgroundColor: [, '#db5e2c', '#FFCE56', '#46db2c'],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm={4} lg={4}>
          <CLink href="/bco/di-bco-analysis">
            <CCard className="mb-4">
              <CCardHeader>
                <strong>BCO Status</strong> <small>(September-24)</small>
              </CCardHeader>
              <CCardBody>
                {/* <p className="text-medium-emphasis small">
                  Use contextual classes to color tables, table rows or individual cells.
                </p> */}
                {/* <DocsExample href="components/table#variants"> */}
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Book checkout number</CTableHeaderCell>
                      <CTableDataCell>20570</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Average BCO</CTableHeaderCell>
                      <CTableDataCell>1.90</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">BCO Student Percent</CTableHeaderCell>
                      <CTableDataCell>67.00</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Book checkin number</CTableHeaderCell>
                      <CTableDataCell>18904</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                {/* </DocsExample> */}
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>

        <CCol sm={4} lg={4}>
          <CLink href="/school/school-monitoring">
            <CCard className="mb-4">
              <CCardHeader>
                <strong>School Rating</strong> <small>(September-24)</small>
              </CCardHeader>
              <CCardBody>
                {/* <p className="text-medium-emphasis small">
                  Use contextual classes to color tables, table rows or individual cells.
                </p> */}
                {/* <DocsExample href="components/table#variants"> */}
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                      <CTableDataCell>570</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                      <CTableDataCell>890</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                      <CTableDataCell>720</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                      <CTableDataCell>2980</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                {/* </DocsExample> */}
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={4} lg={4}>
          <CLink href="/library/all-library">
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Teacher Training</strong> <small>(2024)</small>
              </CCardHeader>
              <CCardBody>
                {/* <p className="text-medium-emphasis small">
                  Use contextual classes to color tables, table rows or individual cells.
                </p> */}
                {/* <DocsExample href="components/table#variants"> */}
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">G1 Training</CTableHeaderCell>
                      <CTableDataCell>1570</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">G2 Training</CTableHeaderCell>
                      <CTableDataCell>1690</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">Library Training</CTableHeaderCell>
                      <CTableDataCell>1620</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Head Teacher Training</CTableHeaderCell>
                      <CTableDataCell>1108</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
                {/* </DocsExample> */}
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default WidgetsDropdown3
