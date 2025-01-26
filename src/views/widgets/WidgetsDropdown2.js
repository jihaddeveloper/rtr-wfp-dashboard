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
  const [allSchoolMonitoringData, setAllSchoolMonitoringData] = useState([])

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

  // School Monitoring
  const allSchoolMoniDataCurrent = allSchoolMonitoringData.filter((item) => {
    return item.month === currentMonth && item.year === '2025'
  }).length

  const allSchoolMoniDataPreviousMonth = allSchoolMonitoringData.filter((item) => {
    return item.month === previousMonth && item.year === '2024'
  }).length

  // Trending
  // Priority 1
  const allSchoolMoniDataP1January = allSchoolMonitoringData.filter((item) => {
    return item.month === 'January' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1February = allSchoolMonitoringData.filter((item) => {
    return item.month === 'February' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1March = allSchoolMonitoringData.filter((item) => {
    return item.month === 'March' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1April = allSchoolMonitoringData.filter((item) => {
    return item.month === 'April' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1May = allSchoolMonitoringData.filter((item) => {
    return item.month === 'May' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1June = allSchoolMonitoringData.filter((item) => {
    return item.month === 'June' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1July = allSchoolMonitoringData.filter((item) => {
    return item.month === 'July' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1August = allSchoolMonitoringData.filter((item) => {
    return item.month === 'August' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1September = allSchoolMonitoringData.filter((item) => {
    return item.month === 'September' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1October = allSchoolMonitoringData.filter((item) => {
    return item.month === 'October' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1November = allSchoolMonitoringData.filter((item) => {
    return item.month === 'November' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length

  const allSchoolMoniDataP1December = allSchoolMonitoringData.filter((item) => {
    return item.month === 'December' && item.year === '2024' && item.libraryStatus === 'Priority 1'
  }).length
  // Priority 1

  // Priority 2
  const allSchoolMoniDataP2January = allSchoolMonitoringData.filter((item) => {
    return item.month === 'January' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2February = allSchoolMonitoringData.filter((item) => {
    return item.month === 'February' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2March = allSchoolMonitoringData.filter((item) => {
    return item.month === 'March' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2April = allSchoolMonitoringData.filter((item) => {
    return item.month === 'April' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2May = allSchoolMonitoringData.filter((item) => {
    return item.month === 'May' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2June = allSchoolMonitoringData.filter((item) => {
    return item.month === 'June' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2July = allSchoolMonitoringData.filter((item) => {
    return item.month === 'July' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2August = allSchoolMonitoringData.filter((item) => {
    return item.month === 'August' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2September = allSchoolMonitoringData.filter((item) => {
    return item.month === 'September' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2October = allSchoolMonitoringData.filter((item) => {
    return item.month === 'October' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2November = allSchoolMonitoringData.filter((item) => {
    return item.month === 'November' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length

  const allSchoolMoniDataP2December = allSchoolMonitoringData.filter((item) => {
    return item.month === 'December' && item.year === '2024' && item.libraryStatus === 'Priority 2'
  }).length
  // Priority 2

  // Priority 3
  const allSchoolMoniDataP3January = allSchoolMonitoringData.filter((item) => {
    return item.month === 'January' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3February = allSchoolMonitoringData.filter((item) => {
    return item.month === 'February' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3March = allSchoolMonitoringData.filter((item) => {
    return item.month === 'March' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3April = allSchoolMonitoringData.filter((item) => {
    return item.month === 'April' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3May = allSchoolMonitoringData.filter((item) => {
    return item.month === 'May' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3June = allSchoolMonitoringData.filter((item) => {
    return item.month === 'June' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3July = allSchoolMonitoringData.filter((item) => {
    return item.month === 'July' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3August = allSchoolMonitoringData.filter((item) => {
    return item.month === 'August' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3September = allSchoolMonitoringData.filter((item) => {
    return item.month === 'September' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3October = allSchoolMonitoringData.filter((item) => {
    return item.month === 'October' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3November = allSchoolMonitoringData.filter((item) => {
    return item.month === 'November' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length

  const allSchoolMoniDataP3December = allSchoolMonitoringData.filter((item) => {
    return item.month === 'December' && item.year === '2024' && item.libraryStatus === 'Priority 3'
  }).length
  // Priority 3

  // Trending

  // School Monitoring

  // Library Observation Data by filter
  const allLibraryObsDataCurrent = allLibraryObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2024'
  }).length

  const allLibraryObsDataPreviousMonth = allLibraryObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2024' && item.libraryStatus
  }).length

  // Trending
  // Developing
  const allLibraryObsDevJanuary = allLibraryObsData.filter((item) => {
    return item.month === 'January' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevFebruary = allLibraryObsData.filter((item) => {
    return item.month === 'February' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevMarch = allLibraryObsData.filter((item) => {
    return item.month === 'March' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevApril = allLibraryObsData.filter((item) => {
    return item.month === 'April' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevMay = allLibraryObsData.filter((item) => {
    return item.month === 'May' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevJune = allLibraryObsData.filter((item) => {
    return item.month === 'June' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevJuly = allLibraryObsData.filter((item) => {
    return item.month === 'July' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevAugust = allLibraryObsData.filter((item) => {
    return item.month === 'August' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevSeptember = allLibraryObsData.filter((item) => {
    return item.month === 'September' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevOctober = allLibraryObsData.filter((item) => {
    return item.month === 'October' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevNovember = allLibraryObsData.filter((item) => {
    return item.month === 'November' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length

  const allLibraryObsDevDecember = allLibraryObsData.filter((item) => {
    return item.month === 'December' && item.year === '2024' && item.libraryStatus === 'Developing'
  }).length
  // Developing

  // Functioning
  const allLibraryObsFunJanuary = allLibraryObsData.filter((item) => {
    return item.month === 'January' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunFebruary = allLibraryObsData.filter((item) => {
    return item.month === 'February' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunMarch = allLibraryObsData.filter((item) => {
    return item.month === 'March' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunApril = allLibraryObsData.filter((item) => {
    return item.month === 'April' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunMay = allLibraryObsData.filter((item) => {
    return item.month === 'May' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunJune = allLibraryObsData.filter((item) => {
    return item.month === 'June' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunJuly = allLibraryObsData.filter((item) => {
    return item.month === 'July' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunAugust = allLibraryObsData.filter((item) => {
    return item.month === 'August' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunSeptember = allLibraryObsData.filter((item) => {
    return (
      item.month === 'September' && item.year === '2024' && item.libraryStatus === 'Functioning'
    )
  }).length

  const allLibraryObsFunOctober = allLibraryObsData.filter((item) => {
    return item.month === 'October' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunNovember = allLibraryObsData.filter((item) => {
    return item.month === 'November' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length

  const allLibraryObsFunDecember = allLibraryObsData.filter((item) => {
    return item.month === 'December' && item.year === '2024' && item.libraryStatus === 'Functioning'
  }).length
  // Functioning

  // Highly Functioning
  const allLibraryObsHighFunJanuary = allLibraryObsData.filter((item) => {
    return (
      item.month === 'January' &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunFebruary = allLibraryObsData.filter((item) => {
    return (
      item.month === 'February' &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunMarch = allLibraryObsData.filter((item) => {
    return (
      item.month === 'March' && item.year === '2024' && item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunApril = allLibraryObsData.filter((item) => {
    return (
      item.month === 'April' && item.year === '2024' && item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunMay = allLibraryObsData.filter((item) => {
    return (
      item.month === 'May' && item.year === '2024' && item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunJune = allLibraryObsData.filter((item) => {
    return (
      item.month === 'June' && item.year === '2024' && item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunJuly = allLibraryObsData.filter((item) => {
    return (
      item.month === 'July' && item.year === '2024' && item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunAugust = allLibraryObsData.filter((item) => {
    return (
      item.month === 'August' && item.year === '2024' && item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunSeptember = allLibraryObsData.filter((item) => {
    return (
      item.month === 'September' &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunOctober = allLibraryObsData.filter((item) => {
    return (
      item.month === 'October' &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunNovember = allLibraryObsData.filter((item) => {
    return (
      item.month === 'November' &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length

  const allLibraryObsHighFunDecember = allLibraryObsData.filter((item) => {
    return (
      item.month === 'December' &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length
  // Highly Functioning
  // Trending

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
  // Trending
  // G1
  // P1
  const allG1TeacherP1January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
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

  const allG1TeacherP1February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
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

  const allG1TeacherP1March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
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

  const allG1TeacherP1April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
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

  const allG1TeacherP1May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
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

  const allG1TeacherP1June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
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

  const allG1TeacherP1July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
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

  const allG1TeacherP1August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
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

  const allG1TeacherP1September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
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

  const allG1TeacherP1October = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'October' &&
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

  const allG1TeacherP1November = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'November' &&
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

  const allG1TeacherP1December = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'December' &&
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
  // P1

  // P2
  const allG1TeacherP2January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
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

  const allG1TeacherP2February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
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

  const allG1TeacherP2March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
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

  const allG1TeacherP2April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
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

  const allG1TeacherP2May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
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

  const allG1TeacherP2June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
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

  const allG1TeacherP2July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
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

  const allG1TeacherP2August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
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

  const allG1TeacherP2September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
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

  const allG1TeacherP2October = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'October' &&
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

  const allG1TeacherP2November = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'November' &&
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

  const allG1TeacherP2December = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'December' &&
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
  // P2

  // P3
  const allG1TeacherP3January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
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

  const allG1TeacherP3February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
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

  const allG1TeacherP3March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
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

  const allG1TeacherP3April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
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

  const allG1TeacherP3May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
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

  const allG1TeacherP3June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
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

  const allG1TeacherP3July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
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

  const allG1TeacherP3August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
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

  const allG1TeacherP3September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
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

  const allG1TeacherP3October = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'October' &&
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

  const allG1TeacherP3November = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'November' &&
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

  const allG1TeacherP3December = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'December' &&
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
  // P3
  // G1

  // G2
  // P1
  const allG2TeacherP1January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
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

  const allG2TeacherP1February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
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

  const allG2TeacherP1March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
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

  const allG2TeacherP1April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
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

  const allG2TeacherP1May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
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

  const allG2TeacherP1June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
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

  const allG2TeacherP1July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
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

  const allG2TeacherP1August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
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

  const allG2TeacherP1September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
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

  const allG2TeacherP1October = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'October' &&
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

  const allG2TeacherP1November = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'November' &&
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

  const allG2TeacherP1December = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'December' &&
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
  // P1

  // P2
  const allG2TeacherP2January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
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

  const allG2TeacherP2February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
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

  const allG2TeacherP2March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
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

  const allG2TeacherP2April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
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

  const allG2TeacherP2May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
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

  const allG2TeacherP2June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
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

  const allG2TeacherP2July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
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

  const allG2TeacherP2August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
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

  const allG2TeacherP2September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
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

  const allG2TeacherP2October = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'October' &&
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

  const allG2TeacherP2November = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'November' &&
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

  const allG2TeacherP2December = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'December' &&
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
  // P2

  // P3
  const allG2TeacherP3January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
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

  const allG2TeacherP3February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
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

  const allG2TeacherP3March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
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

  const allG2TeacherP3April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
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

  const allG2TeacherP3May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
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

  const allG2TeacherP3June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
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

  const allG2TeacherP3July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
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

  const allG2TeacherP3August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
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

  const allG2TeacherP3September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
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

  const allG2TeacherP3October = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'October' &&
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

  const allG2TeacherP3November = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'November' &&
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

  const allG2TeacherP3December = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'December' &&
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
  // P3
  // G2
  // Trending

  // G1
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
  // G1

  // G2
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
  // G2
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

  // Get All BanglaObs Data
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

  // Get All SchoolMonitoring Data
  const getAllSchoolMonitoring = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1//school-monitoring', {
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
    <CRow>
      {/* <CHeader>
        <strong>Performance</strong>
      </CHeader> */}
      <CRow>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>G1 Teacher Status Trending 2024</strong>
            </CCardHeader>
            <CLink href="/bangla/di-bangla-class">
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
                          allG1TeacherP1January,
                          allG1TeacherP1February,
                          allG1TeacherP1March,
                          allG1TeacherP1April,
                          allG1TeacherP1May,
                          allG1TeacherP1June,
                          allG1TeacherP1July,
                          allG1TeacherP1August,
                          allG1TeacherP1September,
                          allG1TeacherP1October,
                          allG1TeacherP1November,
                          allG1TeacherP1December,
                        ],
                      },
                      {
                        label: 'Priority 2',
                        backgroundColor: 'rgba(243, 220, 9, 0.2)',
                        borderColor: 'rgba(243, 220, 9, 0.2)',
                        pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allG1TeacherP2January,
                          allG1TeacherP2February,
                          allG1TeacherP2March,
                          allG1TeacherP2April,
                          allG1TeacherP2May,
                          allG1TeacherP2June,
                          allG1TeacherP2July,
                          allG1TeacherP2August,
                          allG1TeacherP2September,
                          allG1TeacherP2October,
                          allG1TeacherP2November,
                          allG1TeacherP2December,
                        ],
                      },
                      {
                        label: 'Priority 3',
                        backgroundColor: 'rgba(8, 78, 8, 0.2)',
                        borderColor: 'rgba(8, 78, 8, 0.2)',
                        pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allG1TeacherP3January,
                          allG1TeacherP3February,
                          allG1TeacherP3March,
                          allG1TeacherP3April,
                          allG1TeacherP3May,
                          allG1TeacherP3June,
                          allG1TeacherP3July,
                          allG1TeacherP3August,
                          allG1TeacherP3September,
                          allG1TeacherP3October,
                          allG1TeacherP3November,
                          allG1TeacherP3December,
                        ],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CLink>
          </CCard>
        </CCol>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>G2 Teacher Status Trending 2024</strong>
            </CCardHeader>
            <CLink href="/bangla/di-bangla-class">
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
                          allG2TeacherP1January,
                          allG2TeacherP1February,
                          allG2TeacherP1March,
                          allG2TeacherP1April,
                          allG2TeacherP1May,
                          allG2TeacherP1June,
                          allG2TeacherP1July,
                          allG2TeacherP1August,
                          allG2TeacherP1September,
                          allG2TeacherP1October,
                          allG2TeacherP1November,
                          allG2TeacherP1December,
                        ],
                      },
                      {
                        label: 'Priority 2',
                        backgroundColor: 'rgba(243, 220, 9, 0.2)',
                        borderColor: 'rgba(243, 220, 9, 0.2)',
                        pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allG2TeacherP2January,
                          allG2TeacherP2February,
                          allG2TeacherP2March,
                          allG2TeacherP2April,
                          allG2TeacherP2May,
                          allG2TeacherP2June,
                          allG2TeacherP2July,
                          allG2TeacherP2August,
                          allG2TeacherP2September,
                          allG2TeacherP2October,
                          allG2TeacherP2November,
                          allG2TeacherP2December,
                        ],
                      },
                      {
                        label: 'Priority 3',
                        backgroundColor: 'rgba(8, 78, 8, 0.2)',
                        borderColor: 'rgba(8, 78, 8, 0.2)',
                        pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allG2TeacherP3January,
                          allG2TeacherP3February,
                          allG2TeacherP3March,
                          allG2TeacherP3April,
                          allG2TeacherP3May,
                          allG2TeacherP3June,
                          allG2TeacherP3July,
                          allG2TeacherP3August,
                          allG2TeacherP3September,
                          allG2TeacherP3October,
                          allG2TeacherP3November,
                          allG2TeacherP3December,
                        ],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CLink>
          </CCard>
        </CCol>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Library Status Trending 2024</strong>
            </CCardHeader>
            <CLink href="/library/di-library-observation">
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
                          allLibraryObsDevJanuary,
                          allLibraryObsDevFebruary,
                          allLibraryObsDevMarch,
                          allLibraryObsDevApril,
                          allLibraryObsDevMay,
                          allLibraryObsDevJune,
                          allLibraryObsDevJuly,
                          allLibraryObsDevAugust,
                          allLibraryObsDevSeptember,
                          allLibraryObsDevOctober,
                          allLibraryObsDevNovember,
                          allLibraryObsDevDecember,
                        ],
                      },
                      {
                        label: 'Functioning',
                        backgroundColor: 'rgba(243, 220, 9, 0.2)',
                        borderColor: 'rgba(243, 220, 9, 0.2)',
                        pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allLibraryObsFunJanuary,
                          allLibraryObsFunFebruary,
                          allLibraryObsFunMarch,
                          allLibraryObsFunApril,
                          allLibraryObsFunMay,
                          allLibraryObsFunJune,
                          allLibraryObsFunJuly,
                          allLibraryObsFunAugust,
                          allLibraryObsFunSeptember,
                          allLibraryObsFunOctober,
                          allLibraryObsFunNovember,
                          allLibraryObsFunDecember,
                        ],
                      },
                      {
                        label: 'Highly Functioning',
                        backgroundColor: 'rgba(8, 78, 8, 0.2)',
                        borderColor: 'rgba(8, 78, 8, 0.2)',
                        pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allLibraryObsHighFunJanuary,
                          allLibraryObsHighFunFebruary,
                          allLibraryObsHighFunMarch,
                          allLibraryObsHighFunApril,
                          allLibraryObsHighFunMay,
                          allLibraryObsHighFunJune,
                          allLibraryObsHighFunJuly,
                          allLibraryObsHighFunAugust,
                          allLibraryObsHighFunSeptember,
                          allLibraryObsHighFunOctober,
                          allLibraryObsHighFunNovember,
                          allLibraryObsHighFunDecember,
                        ],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CLink>
          </CCard>
        </CCol>
        <CCol sm={3} lg={3}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>School Status Trending 2024</strong>
            </CCardHeader>
            <CLink href="/school/school-monitoring">
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
                          allSchoolMoniDataP1January,
                          allSchoolMoniDataP1February,
                          allSchoolMoniDataP1March,
                          allSchoolMoniDataP1April,
                          allSchoolMoniDataP1May,
                          allSchoolMoniDataP1June,
                          allSchoolMoniDataP1July,
                          allSchoolMoniDataP1August,
                          allSchoolMoniDataP1September,
                          allSchoolMoniDataP1October,
                          allSchoolMoniDataP1November,
                          allSchoolMoniDataP1December,
                        ],
                      },
                      {
                        label: 'Priority 2',
                        backgroundColor: 'rgba(243, 220, 9, 0.2)',
                        borderColor: 'rgba(243, 220, 9, 0.2)',
                        pointBackgroundColor: 'rgba(243, 220, 9, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allSchoolMoniDataP2January,
                          allSchoolMoniDataP2February,
                          allSchoolMoniDataP2March,
                          allSchoolMoniDataP2April,
                          allSchoolMoniDataP2May,
                          allSchoolMoniDataP2June,
                          allSchoolMoniDataP2July,
                          allSchoolMoniDataP2August,
                          allSchoolMoniDataP2September,
                          allSchoolMoniDataP2October,
                          allSchoolMoniDataP2November,
                          allSchoolMoniDataP2December,
                        ],
                      },
                      {
                        label: 'Priority 3',
                        backgroundColor: 'rgba(8, 78, 8, 0.2)',
                        borderColor: 'rgba(8, 78, 8, 0.2)',
                        pointBackgroundColor: 'rgba(8, 78, 8, 0.2)',
                        pointBorderColor: '#fff',
                        data: [
                          allSchoolMoniDataP3January,
                          allSchoolMoniDataP3February,
                          allSchoolMoniDataP3March,
                          allSchoolMoniDataP3April,
                          allSchoolMoniDataP3May,
                          allSchoolMoniDataP3June,
                          allSchoolMoniDataP3July,
                          allSchoolMoniDataP3August,
                          allSchoolMoniDataP3September,
                          allSchoolMoniDataP3October,
                          allSchoolMoniDataP3November,
                          allSchoolMoniDataP3December,
                        ],
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CLink>
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
          <CLink href="/school/school-monitoring">
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
                        data: [allSchoolMoniDataPreviousMonth, allSchoolData.length],
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
