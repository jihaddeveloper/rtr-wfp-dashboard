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

const WidgetsDropdownPrevailActivity = () => {
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
  const [allLFObsData, setAllLFObsData] = useState([])

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

  // Teacher number by filter
  const allTeacherG1 = allTeacherData.filter((item) => {
    return item.grade.includes('G1')
  }).length
  const allTeacherG2 = allTeacherData.filter((item) => {
    return item.grade.includes('G2')
  }).length
  // Teacher number by filter

  // LF Observation Data by filter
  const allLFObsDataCurrent = allLFObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2025'
  }).length

  const allLFObsDataPreviousMonth = allLFObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2025'
  }).length

  // Trending
  // Priority 1
  const allLFObsDataP1January = allLFObsData.filter((item) => {
    return item.month === 'January' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1February = allLFObsData.filter((item) => {
    return item.month === 'February' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1March = allLFObsData.filter((item) => {
    return item.month === 'March' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1April = allLFObsData.filter((item) => {
    return item.month === 'April' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1May = allLFObsData.filter((item) => {
    return item.month === 'May' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1June = allLFObsData.filter((item) => {
    return item.month === 'June' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1July = allLFObsData.filter((item) => {
    return item.month === 'July' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1August = allLFObsData.filter((item) => {
    return item.month === 'August' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1September = allLFObsData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1October = allLFObsData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1November = allLFObsData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1December = allLFObsData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length
  // Priority 1

  // Priority 2
  const allLFObsDataP2January = allLFObsData.filter((item) => {
    return item.month === 'January' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2February = allLFObsData.filter((item) => {
    return item.month === 'February' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2March = allLFObsData.filter((item) => {
    return item.month === 'March' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2April = allLFObsData.filter((item) => {
    return item.month === 'April' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2May = allLFObsData.filter((item) => {
    return item.month === 'May' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2June = allLFObsData.filter((item) => {
    return item.month === 'June' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2July = allLFObsData.filter((item) => {
    return item.month === 'July' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2August = allLFObsData.filter((item) => {
    return item.month === 'August' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2September = allLFObsData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2October = allLFObsData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2November = allLFObsData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2December = allLFObsData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length
  // Priority 2

  // Priority 3
  const allLFObsDataP3January = allLFObsData.filter((item) => {
    return item.month === 'January' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3February = allLFObsData.filter((item) => {
    return item.month === 'February' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3March = allLFObsData.filter((item) => {
    return item.month === 'March' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3April = allLFObsData.filter((item) => {
    return item.month === 'April' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3May = allLFObsData.filter((item) => {
    return item.month === 'May' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3June = allLFObsData.filter((item) => {
    return item.month === 'June' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3July = allLFObsData.filter((item) => {
    return item.month === 'July' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3August = allLFObsData.filter((item) => {
    return item.month === 'August' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3September = allLFObsData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3October = allLFObsData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3November = allLFObsData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3December = allLFObsData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length
  // Priority 3
  // Trending
  // LF Observation Data by filter

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

  // P0
  const allG1TeacherP0January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP0October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG1TeacherP0November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG1TeacherP0December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P0

  // P1
  const allG1TeacherP1January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 1'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP1October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG1TeacherP1November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG1TeacherP1December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P1

  // P2
  const allG1TeacherP2January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 2'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP2October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG1TeacherP2November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG1TeacherP2December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P2

  // P3
  const allG1TeacherP3January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 3'
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
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 3'
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
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 3'
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
        item.year === '2025' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 3'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP3October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG1TeacherP3November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG1TeacherP3December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P3
  // G1

  // G2
  // P0
  const allG2TeacherP0January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0February = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'February' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0March = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'March' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0April = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'April' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0May = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'May' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0June = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'June' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0July = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'July' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0August = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'August' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0September = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 0'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP0October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG2TeacherP0November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG2TeacherP0December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P0

  // P1
  const allG2TeacherP1January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 1'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP1October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG2TeacherP1November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG2TeacherP1December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P1

  // P2
  const allG2TeacherP2January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 2'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP2October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG2TeacherP2November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG2TeacherP2December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P2

  // P3
  const allG2TeacherP3January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 3'
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
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 3'
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
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 3'
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
        item.year === '2025' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 3'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP3October = allBanglaObsData.filter((item) => {
    return (
      item.month === 'October' &&
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

  const allG2TeacherP3November = allBanglaObsData.filter((item) => {
    return (
      item.month === 'November' &&
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

  const allG2TeacherP3December = allBanglaObsData.filter((item) => {
    return (
      item.month === 'December' &&
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
  // P3
  // G2
  // Trending

  // PreviousMonth
  // G1
  const allG1TeacherPreviousMonth = allBanglaObsData
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
        item.year === '2025' &&
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
  // PreviousMonth
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

  // Get All LF Observation Data
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
      setAllLFObsData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All LF Observation Data

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
      <CRow xs={12}>
        <CCol xs={12} sm={4} lg={4}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>G1 Teacher Status Trending 2025</strong>
            </CCardHeader>
            <CLink href="/bangla/p-bangla-detail">
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
                        label: 'Priority 0',
                        backgroundColor: '#addcecff',
                        borderColor: '#addcecff',
                        pointBackgroundColor: '#addcecff',
                        pointBorderColor: '#addcecff',
                        data: [
                          allG1TeacherP0January,
                          allG1TeacherP0February,
                          allG1TeacherP0March,
                          allG1TeacherP0April,
                          allG1TeacherP0May,
                          allG1TeacherP0June,
                          allG1TeacherP0July,
                          allG1TeacherP0August,
                          allG1TeacherP0September,
                          allG1TeacherP0October,
                          allG1TeacherP0November,
                          allG1TeacherP0December,
                        ],
                      },
                      {
                        label: 'Priority 1',
                        backgroundColor: '#8ddaf3ff',
                        borderColor: '#8ddaf3ff',
                        pointBackgroundColor: '#8ddaf3ff',
                        pointBorderColor: '#8ddaf3ff',
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
                        backgroundColor: '#35a8ceff',
                        borderColor: '#35a8ceff',
                        pointBackgroundColor: '#35a8ceff',
                        pointBorderColor: '#35a8ceff',
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
                        backgroundColor: '#007AA4',
                        borderColor: '#007AA4',
                        pointBackgroundColor: '#007AA4',
                        pointBorderColor: '#007AA4',
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
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: '#333', // Custom tick color
                        },
                        grid: {
                          display: true, // Hide y-axis grid lines
                        },
                      },
                      x: {
                        grid: {
                          display: true, // Hide x-axis grid lines
                        },
                        ticks: {
                          color: '#333',
                        },
                      },
                    },
                  }}
                  labels=""
                  style={{ height: '250px' }} // Inline style for height
                />
              </CCardBody>
            </CLink>
          </CCard>
        </CCol>
        <CCol xs={12} sm={4} lg={4}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>G2 Teacher Status Trending 2025</strong>
            </CCardHeader>
            <CLink href="/bangla/p-bangla-detail">
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
                        label: 'Priority 0',
                        backgroundColor: '#cdd3c2ff',
                        borderColor: '#cdd3c2ff',
                        pointBackgroundColor: '#cdd3c2ff',
                        pointBorderColor: '#cdd3c2ff',
                        data: [
                          allG2TeacherP0January,
                          allG2TeacherP0February,
                          allG2TeacherP0March,
                          allG2TeacherP0April,
                          allG2TeacherP0May,
                          allG2TeacherP0June,
                          allG2TeacherP0July,
                          allG2TeacherP0August,
                          allG2TeacherP0September,
                          allG2TeacherP0October,
                          allG2TeacherP0November,
                          allG2TeacherP0December,
                        ],
                      },
                      {
                        label: 'Priority 1',
                        backgroundColor: '#cae09aff',
                        borderColor: '#cae09aff',
                        pointBackgroundColor: '#cae09aff',
                        pointBorderColor: '#cae09aff',
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
                        backgroundColor: '#8eac4fff',
                        borderColor: '#8eac4fff',
                        pointBackgroundColor: '#8eac4fff',
                        pointBorderColor: '#8eac4fff',
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
                        backgroundColor: '#205c4bff',
                        borderColor: '#205c4bff',
                        pointBackgroundColor: '#205c4bff',
                        pointBorderColor: '#205c4bff',
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
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: '#333', // Custom tick color
                        },
                        grid: {
                          display: true, // Hide y-axis grid lines
                        },
                      },
                      x: {
                        grid: {
                          display: true, // Hide x-axis grid lines
                        },
                        ticks: {
                          color: '#333',
                        },
                      },
                    },
                  }}
                  labels=""
                  style={{ height: '250px' }} // Inline style for height
                />
              </CCardBody>
            </CLink>
          </CCard>
        </CCol>
        <CCol xs={12} sm={4} lg={4}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>LF Priority Trending 2025</strong>
            </CCardHeader>
            <CLink href="/prevail/p-lf-observation-detail">
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
                        backgroundColor: '#79d6bcff',
                        borderColor: '#79d6bcff',
                        pointBackgroundColor: '#79d6bcff',
                        pointBorderColor: '#79d6bcff',
                        data: [
                          allLFObsDataP1January,
                          allLFObsDataP1February,
                          allLFObsDataP1March,
                          allLFObsDataP1April,
                          allLFObsDataP1May,
                          allLFObsDataP1June,
                          allLFObsDataP1July,
                          allLFObsDataP1August,
                          allLFObsDataP1September,
                          allLFObsDataP1October,
                          allLFObsDataP1November,
                          allLFObsDataP1December,
                        ],
                      },
                      {
                        label: 'Priority 2',
                        backgroundColor: '#3baa8bff',
                        borderColor: '#3baa8bff',
                        pointBackgroundColor: '#3baa8bff',
                        pointBorderColor: '#3baa8bff',
                        data: [
                          allLFObsDataP2January,
                          allLFObsDataP2February,
                          allLFObsDataP2March,
                          allLFObsDataP2April,
                          allLFObsDataP2May,
                          allLFObsDataP2June,
                          allLFObsDataP2July,
                          allLFObsDataP2August,
                          allLFObsDataP2September,
                          allLFObsDataP2October,
                          allLFObsDataP2November,
                          allLFObsDataP2December,
                        ],
                      },
                      {
                        label: 'Priority 3',
                        backgroundColor: '#006B4D',
                        borderColor: '#006B4D',
                        pointBackgroundColor: '#006B4D',
                        pointBorderColor: '#006B4D',
                        data: [
                          allLFObsDataP3January,
                          allLFObsDataP3February,
                          allLFObsDataP3March,
                          allLFObsDataP3April,
                          allLFObsDataP3May,
                          allLFObsDataP3June,
                          allLFObsDataP3July,
                          allLFObsDataP3August,
                          allLFObsDataP3September,
                          allLFObsDataP3October,
                          allLFObsDataP3November,
                          allLFObsDataP3December,
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
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: '#333', // Custom tick color
                        },
                        grid: {
                          display: true, // Hide y-axis grid lines
                        },
                      },
                      x: {
                        grid: {
                          display: true, // Hide x-axis grid lines
                        },
                        ticks: {
                          color: '#333',
                        },
                      },
                    },
                  }}
                  labels=""
                  style={{ height: '250px' }} // Inline style for height
                />
              </CCardBody>
            </CLink>
          </CCard>
        </CCol>
      </CRow>
      <CRow></CRow>
      <CRow>
        <CCol xs={8}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong># of Teacher Supported</strong> <small>({previousMonthYear})</small>
            </CCardHeader>
            <CCardBody>
              <CLink href="/bangla/di-bangla-class">
                <CChartBar
                  data={{
                    labels: [
                      'PPE',
                      'PPE supported',
                      'G-1',
                      'G-1 supported',
                      'G-2',
                      'G-2 supported',
                      'G-3',
                      'G-3 supported',
                    ],
                    datasets: [
                      {
                        label: ['Teacher'],
                        backgroundColor: [
                          '#5F564A',
                          '#5F564A',
                          '#00546B',
                          '#00546B',
                          '#A3C754',
                          '#A3C754',
                          '#994263',
                          '#994263',
                        ],
                        data: [140, 120, 210, 160, 224, 134, 160, 110],
                      },
                    ],
                  }}
                  labels="Grade wise Support Provided"
                  style={{ height: '400px' }} // Inline style for height
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                        position: 'bottom',
                      },
                      title: {
                        display: true,
                        text: '',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: '#333', // Custom tick color
                        },
                      },
                      x: {
                        ticks: {
                          color: '#333',
                        },
                      },
                    },
                  }}
                />
              </CLink>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={4}>
          <CCard className="mb-3">
            <CCardHeader>
              <strong>Library Observaton</strong> <small>({previousMonthYear})</small>
            </CCardHeader>
            <CCardBody>
              <CLink href="/library/di-library-observation">
                <CChartBar
                  data={{
                    labels: ['Total Library', 'Observed Library', 'Not observed'],
                    datasets: [
                      {
                        label: ['Library'],
                        backgroundColor: ['#00546B', '#4ca6beff', '#8eb4beff'],
                        data: [365, 200, 165],
                      },
                    ],
                  }}
                  labels="Library"
                  style={{ height: '400px' }} // Inline style for height
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                        position: 'bottom',
                      },
                      title: {
                        display: true,
                        text: '',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: '#333', // Custom tick color
                        },
                      },
                      x: {
                        ticks: {
                          color: '#333',
                        },
                      },
                    },
                  }}
                />
                {/* <CChartPie
                  data={{
                    labels: ['Total Library', 'Observed Library', 'Not observed'],
                    datasets: [
                      {
                        data: [allSchoolData.length, allLibraryObsDataPreviousMonth, 10],
                        backgroundColor: ['#998a90ff', '#8f5a6eff', '#994263'],
                        hoverBackgroundColor: ['#998a90ff', '#8f5a6eff', '#994263'],
                      },
                    ],
                  }}
                  width="200px"
                  height="200px"
                  options={{ maintainAspectRatio: true }}
                /> */}
              </CLink>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm={6} lg={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>BCO Status</strong> <small>({currentMonthYear})</small>
            </CCardHeader>
            <CCardBody>
              {/* <p className="text-medium-emphasis small">
                        Use contextual classes to color tables, table rows or individual cells.
                      </p> */}
              {/* <DocsExample href="components/table#variants"> */}
              <CLink href="/bco/di-bco-analysis">
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Particular</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Total Book Checked-out</CTableHeaderCell>
                      <CTableDataCell>20570</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Per Child Book Checked-out</CTableHeaderCell>
                      <CTableDataCell>1.90</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">
                        Percentage of Student Checked-out Books
                      </CTableHeaderCell>
                      <CTableDataCell>67.00</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Number of Book Checked-in</CTableHeaderCell>
                      <CTableDataCell>18904</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CLink>
              {/* </DocsExample> */}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} lg={6}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Teacher Training</strong> <small> Till to ({currentMonthYear})</small>
            </CCardHeader>
            <CCardBody>
              {/* <p className="text-medium-emphasis small">
                        Use contextual classes to color tables, table rows or individual cells.
                      </p> */}
              {/* <DocsExample href="components/table#variants"> */}
              <CLink href="/library/all-library">
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Particular</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    <CTableRow color="success">
                      <CTableHeaderCell scope="row">Instruction Training G1 </CTableHeaderCell>
                      <CTableDataCell>1570</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Instruction Training G2</CTableHeaderCell>
                      <CTableDataCell>1690</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">Library Teacher Training</CTableHeaderCell>
                      <CTableDataCell>1620</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Head Teacher Training</CTableHeaderCell>
                      <CTableDataCell>1108</CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                </CTable>
              </CLink>
              {/* </DocsExample> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow></CRow>

      <CRow></CRow>
    </CRow>
  )
}

export default WidgetsDropdownPrevailActivity
