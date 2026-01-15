//  Author: Mohammad Jihad Hossain
//  Create Date: 09/09/2025
//  Modify Date: 02/11/2025
//  Description: PLFObservation  file

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
  CWidgetStatsD,
  CWidgetStatsE,
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
  cilArrowRight,
} from '@coreui/icons'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import MaterialTable from 'material-table'

const WidgetsDropdownPrevailStatus = () => {
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
  const [allSchoolMonitoringData, setAllSchoolMonitoringData] = useState([])
  const [allLFObservationData, setAllLFObservationData] = useState([])

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
      await getAllSchoolMonitoring()
      await getAllLFObservation()
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

  // G1
  // Number
  // Current Month
  const allG1TeacherCurrentMonth = allBanglaObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.grade === 'G1'
  }).length

  // Priority 0
  const allG1TeacherP0CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 0'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 0

  // Priority 1
  const allG1TeacherP1CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 1

  // Priority 2
  const allG1TeacherP2CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 2

  // Priority 3
  const allG1TeacherP3CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 3
  // Current Month

  // Previous Month
  const allG1TeacherPreviousMonth = allBanglaObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.grade === 'G1'
  }).length

  // Priority 0
  const allG1TeacherP0PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 0'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 0

  // Priority 1
  const allG1TeacherP1PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 1

  // Priority 2
  const allG1TeacherP2PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 2

  // Priority 3
  const allG1TeacherP3PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 3
  // Previous Month
  // Number

  // Percent
  // Priority 0
  const allG1TeacherP0CurrentMonthPercent = calculatePercentage(
    allG1TeacherP0CurrentMonth,
    allG1TeacherCurrentMonth,
  )

  // Priority 1
  const allG1TeacherP1CurrentMonthPercent = calculatePercentage(
    allG1TeacherP1CurrentMonth,
    allG1TeacherCurrentMonth,
  )
  // Priority 1

  // Priority 2
  const allG1TeacherP2CurrentMonthPercent = calculatePercentage(
    allG1TeacherP2CurrentMonth,
    allG1TeacherCurrentMonth,
  )
  // Priority 2

  // Priority 3
  const allG1TeacherP3CurrentMonthPercent = calculatePercentage(
    allG1TeacherP3CurrentMonth,
    allG1TeacherCurrentMonth,
  )
  // Priority 3
  // Current Month

  // Previous Month
  // Priority 0
  const allG1TeacherP0PreviousMonthPercent = calculatePercentage(
    allG1TeacherP0PreviousMonth,
    allG1TeacherPreviousMonth,
  )
  // Priority 0

  // Priority 1
  const allG1TeacherP1PreviousMonthPercent = calculatePercentage(
    allG1TeacherP1PreviousMonth,
    allG1TeacherPreviousMonth,
  )
  // Priority 1

  // Priority 2
  const allG1TeacherP2PreviousMonthPercent = calculatePercentage(
    allG1TeacherP2PreviousMonth,
    allG1TeacherPreviousMonth,
  )
  // Priority 2

  // Priority 3
  const allG1TeacherP3PreviousMonthPercent = calculatePercentage(
    allG1TeacherP3PreviousMonth,
    allG1TeacherPreviousMonth,
  )
  // Priority 3
  // Previous Month
  // Percent
  // G1

  // G2
  // Number
  // Current Month
  const allG2TeacherCurrentMonth = allBanglaObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.grade === 'G2'
  }).length

  // Priority 0
  const allG2TeacherP0CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 0'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 0

  // Priority 1
  const allG2TeacherP1CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 1

  // Priority 2
  const allG2TeacherP2CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 2

  // Priority 3
  const allG2TeacherP3CurrentMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === currentMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 3
  // G2
  // Current Month

  // Previous Month
  const allG2TeacherPreviousMonth = allBanglaObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.grade === 'G2'
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  // Priority 0
  const allG2TeacherP0PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 0'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 0

  // Priority 1
  const allG2TeacherP1PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 1

  // Priority 2
  const allG2TeacherP2PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // Priority 2

  // Priority 3
  const allG2TeacherP3PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  // Priority 3
  // Previous Month
  // Number

  // Percent
  // Priority 0
  const allG2TeacherP0CurrentMonthPercent = calculatePercentage(
    allG2TeacherP0CurrentMonth,
    allG2TeacherCurrentMonth,
  )
  // Priority 0

  // Priority 1
  const allG2TeacherP1CurrentMonthPercent = calculatePercentage(
    allG2TeacherP1CurrentMonth,
    allG2TeacherCurrentMonth,
  )
  // Priority 1

  // Priority 2
  const allG2TeacherP2CurrentMonthPercent = calculatePercentage(
    allG2TeacherP2CurrentMonth,
    allG2TeacherCurrentMonth,
  )
  // Priority 2

  // Priority 3
  const allG2TeacherP3CurrentMonthPercent = calculatePercentage(
    allG2TeacherP3CurrentMonth,
    allG2TeacherCurrentMonth,
  )
  // Priority 3
  // G2
  // Current Month

  // Previous Month
  // Priority 0
  const allG2TeacherP0PreviousMonthPercent = calculatePercentage(
    allG2TeacherP0PreviousMonth,
    allG2TeacherPreviousMonth,
  )
  // Priority 0

  // Priority 1
  const allG2TeacherP1PreviousMonthPercent = calculatePercentage(
    allG2TeacherP1PreviousMonth,
    allG2TeacherPreviousMonth,
  )
  // Priority 1

  // Priority 2
  const allG2TeacherP2PreviousMonthPercent = calculatePercentage(
    allG2TeacherP2PreviousMonth,
    allG2TeacherPreviousMonth,
  )
  // Priority 2

  // Priority 3
  const allG2TeacherP3PreviousMonthPercent = calculatePercentage(
    allG2TeacherP3PreviousMonth,
    allG2TeacherPreviousMonth,
  )
  // Priority 3
  // Previous Month
  // Percent
  // G2
  // Bangla Observation Data by filter

  // LF Observation Data by filter
  // Number
  // Current Month
  const allLFObsCurrentMonth = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025'
  }).length

  const allLFObsCurrentMonthP1 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsCurrentMonthP2 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsCurrentMonthP3 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length
  // Current Month

  // Previous Month
  const allLFObsPreviousMonth = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025'
  }).length

  const allLFObsPreviousMonthP1 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsPreviousMonthP2 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsPreviousMonthP3 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length
  // Previous Month
  // Number

  // Percent
  // Current Month
  const allLFObsCurrentMonthP1Percent = calculatePercentage(
    allLFObsCurrentMonthP1,
    allLFObsCurrentMonth,
  )
  const allLFObsCurrentMonthP2Percent = calculatePercentage(
    allLFObsCurrentMonthP2,
    allLFObsCurrentMonth,
  )

  const allLFObsCurrentMonthP3Percent = calculatePercentage(
    allLFObsCurrentMonthP3,
    allLFObsCurrentMonth,
  )
  // Current Month

  // Previous Month
  const allLFObsPreviousMonthP1Percent = calculatePercentage(
    allLFObsPreviousMonthP1,
    allLFObsPreviousMonth,
  )

  const allLFObsPreviousMonthP2Percent = calculatePercentage(
    allLFObsPreviousMonthP2,
    allLFObsPreviousMonth,
  )

  const allLFObsPreviousMonthP3Percent = calculatePercentage(
    allLFObsPreviousMonthP3,
    allLFObsPreviousMonth,
  )
  // Previous Month
  // Percent

  // LF Observation Data by filter

  // Percentage function
  function calculatePercentage(part, total) {
    if (total === 0) {
      return 0 // Avoid division by zero
    }
    return ((part / total) * 100).toFixed()
  }
  // Percentage function

  // Get All School Data
  const getAllSchool = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-school', {
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
      const response = await axios('http://118.179.80.51:8080/api/v1/p-employee', {
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
      const response = await axios('http://118.179.80.51:8080/api/v1/p-teacher', {
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

  // Get All BanglaObs Data
  const getAllBanglaObs = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-bangla-class', {
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

  // Get All LFObservation Data
  const getAllLFObservation = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-lf-observation', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLFObservationData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All LFObservation Data

  // Get All SchoolMonitoring Data
  const getAllSchoolMonitoring = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/school-monitoring', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllSchoolMonitoringData(response.data)
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
    <CRow className="gx-0">
      {/* <CHeader>
        <strong>Performance</strong>
      </CHeader> */}
      <CRow>
        <CCol xs={12}>
          <CRow>
            <CCol sm={2} lg={2}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>G1 Teacher Status</strong> <small>({previousMonthYear}) Percent</small>
                </CCardHeader>
                <CCardBody>
                  <CLink href="/bangla/p-bangla-detail">
                    <CChartPie
                      data={{
                        labels: ['Priority 0', 'Priority 1', 'Priority 2', 'Priority 3'],
                        datasets: [
                          {
                            data: [
                              allG1TeacherP0PreviousMonthPercent,
                              allG1TeacherP1PreviousMonthPercent,
                              allG1TeacherP2PreviousMonthPercent,
                              allG1TeacherP3PreviousMonthPercent,
                            ],
                            backgroundColor: ['#addcecff', '#8ddaf3ff', '#35a8ceff', '#007AA4'],
                            hoverBackgroundColor: [
                              '#e3e9d5ff',
                              '#cae09aff',
                              '#8eac4fff',
                              '#658f0aff',
                            ],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom',
                          },
                          title: {
                            display: true,
                            text: '',
                          },
                        },
                      }}
                      labels=""
                      style={{ height: '350px' }} // Inline style for height
                    />
                  </CLink>
                </CCardBody>
                <CCardHeader>
                  <small>Total G1 Observation {allG1TeacherPreviousMonth}</small>
                </CCardHeader>
              </CCard>
            </CCol>
            <CCol sm={2} lg={2}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>G2 Teacher Status</strong> <small>({previousMonthYear}) Percent</small>
                </CCardHeader>
                <CCardBody>
                  <CLink href="/bangla/p-bangla-detail">
                    <CChartPie
                      data={{
                        labels: ['Priority 0', 'Priority 1', 'Priority 2', 'Priority 3'],
                        datasets: [
                          {
                            data: [
                              allG2TeacherP0PreviousMonthPercent,
                              allG2TeacherP1PreviousMonthPercent,
                              allG2TeacherP2PreviousMonthPercent,
                              allG2TeacherP3PreviousMonthPercent,
                            ],
                            backgroundColor: ['#d1d4c9ff', '#becaa3ff', '#b2c980ff', '#435c0fff'],
                            hoverBackgroundColor: [
                              '#cdd3c2ff',
                              '#cae09aff',
                              '#8eac4fff',
                              '#205c4bff',
                            ],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom',
                          },
                          title: {
                            display: true,
                            text: '',
                          },
                        },
                      }}
                      labels=""
                      style={{ height: '350px' }} // Inline style for height
                    />
                  </CLink>
                </CCardBody>
                <CCardHeader>
                  <small>Total G2 Observation {allG2TeacherPreviousMonth}</small>
                </CCardHeader>
              </CCard>
            </CCol>
            <CCol sm={2} lg={2}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>LF Priority Status</strong> <small>({previousMonthYear}) Percent</small>
                </CCardHeader>
                <CCardBody>
                  <CLink href="/prevail/p-lf-observation-detail">
                    <CChartPie
                      data={{
                        datasets: [
                          {
                            backgroundColor: ['#79d6bcff', '#3baa8bff', '#006B4D'],
                            hoverBackgroundColor: ['#cae09aff', '#8eac4fff', '#658f0aff'],
                            data: [
                              allLFObsPreviousMonthP1Percent,
                              allLFObsPreviousMonthP2Percent,
                              allLFObsPreviousMonthP3Percent,
                            ],
                          },
                        ],
                        labels: ['Priority 1', 'Priority 2', 'Priority 3'],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom',
                          },
                          title: {
                            display: true,
                            text: '',
                          },
                        },
                      }}
                      labels=""
                      style={{ height: '350px' }} // Inline style for height
                    />
                  </CLink>
                </CCardBody>
                <CCardHeader>
                  <small>Total LF Observation {allLFObsPreviousMonth}</small>
                </CCardHeader>
              </CCard>
            </CCol>
            <CCol sm={2} lg={2}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Library Rating Status</strong>{' '}
                  <small>({previousMonthYear}) Percent</small>
                </CCardHeader>
                <CCardBody>
                  <CLink href="/prevail/p-library-observation">
                    <CChartDoughnut
                      data={{
                        datasets: [
                          {
                            backgroundColor: ['#617c83ff', '#457785ff', '#00546B'],
                            hoverBackgroundColor: ['#cae09aff', '#8eac4fff', '#658f0aff'],
                            data: [0, 0, 0],
                          },
                        ],
                        labels: ['Developing', 'Functioning', 'Highly Functioning'],
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'bottom',
                          },
                          title: {
                            display: true,
                            text: '',
                          },
                        },
                      }}
                      labels=""
                      style={{ height: '350px' }} // Inline style for height
                    />
                  </CLink>
                </CCardBody>
                <CCardHeader>
                  <small>Total Library Observation {0}</small>
                </CCardHeader>
              </CCard>
            </CCol>
            <CCol sm={4} lg={4}>
              <CRow>
                <CWidgetStatsF
                  className="mb-3"
                  color="success"
                  icon={<CIcon icon={cilInstitution} height={50} />}
                  title="School"
                  //values={[{ title: 'Total School', value: '365' }]}
                  footer={
                    <CLink
                      className="font-weight-bold font-xs text-body-secondary"
                      href="/prevail/p-school-detail"
                      // rel="noopener norefferer"
                      // target="_blank"
                    >
                      View more
                      <CIcon icon={cilArrowRight} className="float-end" width={16} />
                    </CLink>
                  }
                  value={
                    <>
                      {allSchoolData.length} <span className="fs-6 fw-normal"></span>
                      <br></br>
                    </>
                  }
                  style={{ height: '147px' }} // Inline style for height
                />
                <CWidgetStatsF
                  className="mb-3"
                  color="info"
                  icon={<CIcon icon={cilUser} height={50} />}
                  title="Teacher"
                  //values={[{ title: 'Total Teacher', value: '2365' }]}
                  value={
                    <>
                      {allTeacherData.length} <span className="fs-6 fw-normal"></span>
                    </>
                  }
                  footer={
                    <CLink
                      className="font-weight-bold font-xs text-body-secondary"
                      href="/prevail/p-teacher-detail"
                      // rel="noopener norefferer"
                      // target="_blank"
                    >
                      View more
                      <CIcon icon={cilArrowRight} className="float-end" width={16} />
                    </CLink>
                  }
                  style={{ height: '147px' }} // Inline style for height
                />
                <CWidgetStatsF
                  className="mb-3"
                  color="primary"
                  icon={<CIcon icon={cilSchool} height={50} />}
                  title="Student"
                  //values={[{ title: 'Total Student', value: '91903' }]}
                  value={
                    <>
                      35546 {/*  {allStudentData.length} */}
                      <span className="fs-6 fw-normal"></span>
                    </>
                  }
                  footer={
                    <CLink
                      className="font-weight-bold font-xs text-body-secondary"
                      href="/di/base/district"
                      // rel="noopener norefferer"
                      // target="_blank"
                    >
                      View more
                      <CIcon icon={cilArrowRight} className="float-end" width={16} />
                    </CLink>
                  }
                  style={{ height: '147px' }} // Inline style for height
                />
              </CRow>
            </CCol>
          </CRow>
        </CCol>

        {/* <CCol sm={3} lg={3}>
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
        </CCol> */}
      </CRow>
    </CRow>
  )
}

export default WidgetsDropdownPrevailStatus
