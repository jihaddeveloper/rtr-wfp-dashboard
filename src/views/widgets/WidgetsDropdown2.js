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

const WidgetsDropdown2 = () => {
  const random = () => Math.round(Math.random() * 100)

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
    return item.month === previousMonth && item.year === '2024' && item.libraryStatus
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
  const allLibraryObsDataCurrent = allLibraryObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2024'
  }).length

  const allG1TeacherPreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G1' &&
        item.teacherStatus
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

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

  const allG2TeacherPreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G2' &&
        item.teacherStatus
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

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

  const allTrainedTeacher =
    instructG1Trained.length +
    instructG2Trained.length +
    headTeacherTrained.length +
    libraryTrained.length +
    goodGovornanceTrained.length +
    schoolPerformanceTrained.length
  //Filter Teacher data

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

      // Teacher number filtering
      // allTeacherG1 = response.data.filter((item) => {
      //   return item.grade.includes('G1')
      // }).length
      // // Teacher number filtering

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
      {/* <CHeader>
        <strong>Performance</strong>
      </CHeader> */}
      <CRow>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>G1 Teacher Trending Status 2024</strong>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'Priority 1',
                      backgroundColor: 'rgba(238, 6, 6, 0.2)',
                      borderColor: 'rgba(238, 6, 6, 0.2)',
                      pointBackgroundColor: 'rgba(238, 6, 6, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Priority 2',
                      backgroundColor: 'rgba(243, 220, 9, 0.2)',
                      borderColor: 'rgba(243, 220, 9, 0.2)',
                      pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Priority 3',
                      backgroundColor: 'rgba(8, 78, 8, 0.2)',
                      borderColor: 'rgba(8, 78, 8, 0.2)',
                      pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>G2 Teacher Trending Status 2024</strong>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'Priority 1',
                      backgroundColor: 'rgba(238, 6, 6, 0.2)',
                      borderColor: 'rgba(238, 6, 6, 0.2)',
                      pointBackgroundColor: 'rgba(238, 6, 6, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Priority 2',
                      backgroundColor: 'rgba(243, 220, 9, 0.2)',
                      borderColor: 'rgba(243, 220, 9, 0.2)',
                      pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Priority 3',
                      backgroundColor: 'rgba(8, 78, 8, 0.2)',
                      borderColor: 'rgba(8, 78, 8, 0.2)',
                      pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Library Trending Status 2024</strong>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'Developing',
                      backgroundColor: 'rgba(238, 6, 6, 0.2)',
                      borderColor: 'rgba(238, 6, 6, 0.2)',
                      pointBackgroundColor: 'rgba(238, 6, 6, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Functioning',
                      backgroundColor: 'rgba(243, 220, 9, 0.2)',
                      borderColor: 'rgba(243, 220, 9, 0.2)',
                      pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Highly Functioning',
                      backgroundColor: 'rgba(8, 78, 8, 0.2)',
                      borderColor: 'rgba(8, 78, 8, 0.2)',
                      pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>School Trending Status 2024</strong>
            </CCardHeader>
            <CCardBody>
              <CChartLine
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'Priority 1',
                      backgroundColor: 'rgba(238, 6, 6, 0.2)',
                      borderColor: 'rgba(238, 6, 6, 0.2)',
                      pointBackgroundColor: 'rgba(238, 6, 6, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Priority 2',
                      backgroundColor: 'rgba(243, 220, 9, 0.2)',
                      borderColor: 'rgba(243, 220, 9, 0.2)',
                      pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                    {
                      label: 'Priority 3',
                      backgroundColor: 'rgba(8, 78, 8, 0.2)',
                      borderColor: 'rgba(8, 78, 8, 0.2)',
                      pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                      pointBorderColor: '#fff',
                      data: [
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                        random(),
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow></CRow>
      <CRow>
        <CCol sm={3} lg={3}>
          <CLink href="/bangla/di-bangla-class">
            {/* <CCard className="mb-3">
              <CCardHeader>
                <strong>G1 Teacher Visited</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total G1 Teacher</CTableHeaderCell>
                      <CTableDataCell>{allTeacherG1}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">No of Visited G1 Teracher</CTableHeaderCell>
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
                <strong>G1 Teacher Visit Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Visited', 'Total'],
                    datasets: [
                      {
                        data: [
                          allG1TeacherP1PreviousMonth +
                            allG1TeacherP2PreviousMonth +
                            allG1TeacherP3PreviousMonth,
                          allTeacherG1,
                        ],
                        backgroundColor: ['#46db2c', '#db5e2c'],
                        hoverBackgroundColor: ['#46db2c', '#db5e2c'],
                      },
                    ],
                  }}
                  width="200px"
                  height="200px"
                  options={{ maintainAspectRatio: true }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="/bangla/di-bangla-class">
            {/* <CCard className="mb-3">
              <CCardHeader>
                <strong>G2 Teacher Visited</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total G2 Teacher</CTableHeaderCell>
                      <CTableDataCell>{allTeacherG2}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">No of Visited G2 Teacher</CTableHeaderCell>
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
                <strong>G2 Teacher Visit Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Visited', 'Total'],
                    datasets: [
                      {
                        data: [
                          allG2TeacherP1PreviousMonth +
                            allG2TeacherP2PreviousMonth +
                            allG2TeacherP3PreviousMonth,
                          allTeacherG2,
                        ],
                        backgroundColor: ['#46db2c', '#db5e2c'],
                        hoverBackgroundColor: ['#46db2c', '#db5e2c'],
                      },
                    ],
                  }}
                  width="200px"
                  height="200px"
                  options={{ maintainAspectRatio: true }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="/library/di-library-observation">
            {/* <CCard className="mb-3">
              <CCardHeader>
                <strong>Library Observed</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total Library</CTableHeaderCell>
                      <CTableDataCell>900</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">No of Rated Libarary</CTableHeaderCell>
                      <CTableDataCell>{allLibraryObsDataPreviousMonth}</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CCardBody>
            </CCard> */}
            <CCard className="mb-3">
              <CCardHeader>
                <strong>Library Observaton Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Rated', 'Total'],
                    datasets: [
                      {
                        data: [allLibraryObsDataPreviousMonth, allSchoolData.length],
                        backgroundColor: ['#46db2c', '#db5e2c'],
                        hoverBackgroundColor: ['#46db2c', '#db5e2c'],
                      },
                    ],
                  }}
                  width="200px"
                  height="200px"
                  options={{ maintainAspectRatio: true }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="/bangla/di-bangla-class">
            {/* <CCard className="mb-3">
              <CCardHeader>
                <strong>G2 Teacher Visited</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total G2 Teacher</CTableHeaderCell>
                      <CTableDataCell>{allTeacherG2}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">No of Visited G2 Teacher</CTableHeaderCell>
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
                <strong>School Visit by LPO Chart</strong> <small>({previousMonthYear})</small>
              </CCardHeader>
              <CCardBody>
                <CChartPie
                  data={{
                    labels: ['Visited', 'Total'],
                    datasets: [
                      {
                        data: [
                          allG2TeacherP1PreviousMonth +
                            allG2TeacherP2PreviousMonth +
                            allG2TeacherP3PreviousMonth,
                          allTeacherG2,
                        ],
                        backgroundColor: ['#46db2c', '#db5e2c'],
                        hoverBackgroundColor: ['#46db2c', '#db5e2c'],
                      },
                    ],
                  }}
                  width="200px"
                  height="200px"
                  options={{ maintainAspectRatio: true }}
                />
              </CCardBody>
            </CCard>
          </CLink>
        </CCol>
      </CRow>

      <CRow></CRow>

      <CRow></CRow>
    </CRow>
  )
}

export default WidgetsDropdown2
