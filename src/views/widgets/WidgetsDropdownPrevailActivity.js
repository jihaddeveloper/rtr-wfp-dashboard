//  Author: Mohammad Jihad Hossain
//  Create Date: 09/09/2025
//  Modify Date: 04/05/2026
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
  const [allPPObsData, setAllPPObsData] = useState([])
  const [allSRMObsData, setAllSRMObsData] = useState([])

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
      // await getAllEmployee(console.log('get all employee called'))
      // await getAllBookCaptain(console.log('get all BookCaptain called'))
      // await getAllLibrary()
      // await getAllStudent()
      await getAllLibraryObs()
      await getAllBanglaObs()
      await getAllLFObservation()
      await getAllPPObservation()
      await getAllSRMObservation()
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
    return item.gradeG1 === '1'
  }).length

  const allTeacherG2 = allTeacherData.filter((item) => {
    return item.gradeG2 === '1'
  }).length

  const allTeacherG3 = allTeacherData.filter((item) => {
    return item.gradeG3 === '1'
  }).length

  const allTeacherPP = allTeacherData.filter((item) => {
    return item.gradePPrimary === '1'
  }).length

  const allTeacherLibary = allTeacherData.filter((item) => {
    return item.libraryManagementSRM === '1'
  }).length
  // Teacher number by filter

  // LF Observation Data by filter
  const allLFObsDataCurrent = allLFObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2026'
  }).length

  const allLFObsDataPreviousMonth = allLFObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2026'
  }).length

  // Trending
  // Priority 1
  const allLFObsDataP1January = allLFObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1February = allLFObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1March = allLFObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1April = allLFObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1May = allLFObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1June = allLFObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1July = allLFObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1August = allLFObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1September = allLFObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1October = allLFObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1November = allLFObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsDataP1December = allLFObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length
  // Priority 1

  // Priority 2
  const allLFObsDataP2January = allLFObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2February = allLFObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2March = allLFObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2April = allLFObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2May = allLFObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2June = allLFObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2July = allLFObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2August = allLFObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2September = allLFObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2October = allLFObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2November = allLFObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsDataP2December = allLFObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length
  // Priority 2

  // Priority 3
  const allLFObsDataP3January = allLFObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3February = allLFObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3March = allLFObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3April = allLFObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3May = allLFObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3June = allLFObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3July = allLFObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3August = allLFObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3September = allLFObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3October = allLFObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3November = allLFObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObsDataP3December = allLFObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length
  // Priority 3
  // Trending
  // LF Observation Data by filter

  // Bangla Observation Data by filter
  const allBanglaObsDataCurrent = allBanglaObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2026'
  }).length

  const allBanglaObsDataPreviousMonth = allBanglaObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2026'
  }).length

  // Trending
  // G1
  // P0
  const allG1TeacherP0January = allBanglaObsData
    .filter((item) => {
      return (
        item.month === 'January' &&
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
      item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
        item.year === '2026' &&
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
      const response = await axios('http://118.179.80.51:8080/api/v1/p-book-checkout', {
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

  // BCO filter data

  // BCO filter data

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
      const response = await axios('http://118.179.80.51:8080/api/v1/p-library-observation', {
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

  // Library Observation Data by filter
  const allLibraryObsDataCurrent = allLibraryObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2026' && item.libraryStatus
  }).length

  const allLibraryObsDataPreviousMonth = allLibraryObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2026' && item.libraryStatus
  }).length

  const allNotObservedLibararyPreviousMonth = 494 - allLibraryObsDataPreviousMonth

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

  // Get All PP Observation Data
  const getAllPPObservation = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-preprimary', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllPPObsData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All PP Observation Data

  // PP Observation Data by filter
  const allPPObsDataCurrent = allPPObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2026'
  }).length

  const allPPObsDataPreviousMonth = allPPObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2026'
  }).length

  // Trending
  // Priority 1
  const allPPObsDataP1January = allPPObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1February = allPPObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1March = allPPObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1April = allPPObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1May = allPPObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1June = allPPObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1July = allPPObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1August = allPPObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1September = allPPObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1October = allPPObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1November = allPPObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allPPObsDataP1December = allPPObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length
  // Priority 1

  // Priority 2
  const allPPObsDataP2January = allPPObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2February = allPPObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2March = allPPObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2April = allPPObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2May = allPPObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2June = allPPObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2July = allPPObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2August = allPPObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2September = allPPObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2October = allPPObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2November = allPPObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allPPObsDataP2December = allPPObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length
  // Priority 2

  // Priority 3
  const allPPObsDataP3January = allPPObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3February = allPPObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3March = allPPObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3April = allPPObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3May = allPPObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3June = allPPObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3July = allPPObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3August = allPPObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3September = allPPObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3October = allPPObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3November = allPPObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allPPObsDataP3December = allPPObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length
  // Priority 3
  // Trending
  // PP Observation Data by filter

  // Get All SRM Observation Data
  const getAllSRMObservation = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-srm-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllSRMObsData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Get All SRM Observation Data
  // SRM Observation Data by filter
  const allSRMObsDataCurrent = allSRMObsData.filter((item) => {
    return item.month === currentMonth && item.year === '2026'
  }).length

  const allSRMObsDataPreviousMonth = allSRMObsData.filter((item) => {
    return item.month === previousMonth && item.year === '2026'
  }).length

  // Trending
  // Priority 1
  const allSRMObsDataP1January = allSRMObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1February = allSRMObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1March = allSRMObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1April = allSRMObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1May = allSRMObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1June = allSRMObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1July = allSRMObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1August = allSRMObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1September = allSRMObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1October = allSRMObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1November = allSRMObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length

  const allSRMObsDataP1December = allSRMObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 1'
  }).length
  // Priority 1

  // Priority 2
  const allSRMObsDataP2January = allSRMObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2February = allSRMObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2March = allSRMObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2April = allSRMObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2May = allSRMObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2June = allSRMObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2July = allSRMObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2August = allSRMObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2September = allSRMObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2October = allSRMObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2November = allSRMObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length

  const allSRMObsDataP2December = allSRMObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 2'
  }).length
  // Priority 2

  // Priority 3
  const allSRMObsDataP3January = allSRMObsData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3February = allSRMObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3March = allSRMObsData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3April = allSRMObsData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3May = allSRMObsData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3June = allSRMObsData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3July = allSRMObsData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3August = allSRMObsData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3September = allSRMObsData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3October = allSRMObsData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3November = allSRMObsData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length

  const allSRMObsDataP3December = allSRMObsData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 3'
  }).length
  // Priority 3
  // Trending
  // SRM Observation Data by filter

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
              <strong>Grade-1 Teacher Priority (2026)</strong>
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
              <strong>Grade-2 Teacher Priority (2026)</strong>
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
              <strong>Grade-3 Teacher Priority (2026)</strong>
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
              <strong>PrePrimary Teacher Priority (2026)</strong>
            </CCardHeader>
            <CLink href="/prevail/p-preprimary">
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
                          allPPObsDataP1January,
                          allPPObsDataP1February,
                          allPPObsDataP1March,
                          allPPObsDataP1April,
                          allPPObsDataP1May,
                          allPPObsDataP1June,
                          allPPObsDataP1July,
                          allPPObsDataP1August,
                          allPPObsDataP1September,
                          allPPObsDataP1October,
                          allPPObsDataP1November,
                          allPPObsDataP1December,
                        ],
                      },
                      {
                        label: 'Priority 2',
                        backgroundColor: '#3baa8bff',
                        borderColor: '#3baa8bff',
                        pointBackgroundColor: '#3baa8bff',
                        pointBorderColor: '#3baa8bff',
                        data: [
                          allPPObsDataP2January,
                          allPPObsDataP2February,
                          allPPObsDataP2March,
                          allPPObsDataP2April,
                          allPPObsDataP2May,
                          allPPObsDataP2June,
                          allPPObsDataP2July,
                          allPPObsDataP2August,
                          allPPObsDataP2September,
                          allPPObsDataP2October,
                          allPPObsDataP2November,
                          allPPObsDataP2December,
                        ],
                      },
                      {
                        label: 'Priority 3',
                        backgroundColor: '#006B4D',
                        borderColor: '#006B4D',
                        pointBackgroundColor: '#006B4D',
                        pointBorderColor: '#006B4D',
                        data: [
                          allPPObsDataP3January,
                          allPPObsDataP3February,
                          allPPObsDataP3March,
                          allPPObsDataP3April,
                          allPPObsDataP3May,
                          allPPObsDataP3June,
                          allPPObsDataP3July,
                          allPPObsDataP3August,
                          allPPObsDataP3September,
                          allPPObsDataP3October,
                          allPPObsDataP3November,
                          allPPObsDataP3December,
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
              <strong>SRM Teacher Priority (2026)</strong>
            </CCardHeader>
            <CLink href="/prevail/p-srm">
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
                          allSRMObsDataP1January,
                          allSRMObsDataP1February,
                          allSRMObsDataP1March,
                          allSRMObsDataP1April,
                          allSRMObsDataP1May,
                          allSRMObsDataP1June,
                          allSRMObsDataP1July,
                          allSRMObsDataP1August,
                          allSRMObsDataP1September,
                          allSRMObsDataP1October,
                          allSRMObsDataP1November,
                          allSRMObsDataP1December,
                        ],
                      },
                      {
                        label: 'Priority 2',
                        backgroundColor: '#3baa8bff',
                        borderColor: '#3baa8bff',
                        pointBackgroundColor: '#3baa8bff',
                        pointBorderColor: '#3baa8bff',
                        data: [
                          allSRMObsDataP2January,
                          allSRMObsDataP2February,
                          allSRMObsDataP2March,
                          allSRMObsDataP2April,
                          allSRMObsDataP2May,
                          allSRMObsDataP2June,
                          allSRMObsDataP2July,
                          allSRMObsDataP2August,
                          allSRMObsDataP2September,
                          allSRMObsDataP2October,
                          allSRMObsDataP2November,
                          allSRMObsDataP2December,
                        ],
                      },
                      {
                        label: 'Priority 3',
                        backgroundColor: '#006B4D',
                        borderColor: '#006B4D',
                        pointBackgroundColor: '#006B4D',
                        pointBorderColor: '#006B4D',
                        data: [
                          allSRMObsDataP3January,
                          allSRMObsDataP3February,
                          allSRMObsDataP3March,
                          allSRMObsDataP3April,
                          allSRMObsDataP3May,
                          allSRMObsDataP3June,
                          allSRMObsDataP3July,
                          allSRMObsDataP3August,
                          allSRMObsDataP3September,
                          allSRMObsDataP3October,
                          allSRMObsDataP3November,
                          allSRMObsDataP3December,
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
              <strong>LF Priority (2026)</strong>
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
              <CLink href="prevail/p-teacher">
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
                        data: [
                          allTeacherPP,
                          allPPObsDataPreviousMonth,
                          allTeacherG1,
                          160,
                          allTeacherG2,
                          134,
                          allTeacherG3,
                          110,
                        ],
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
              <CLink href="/prevail/p-library-observation">
                <CChartBar
                  data={{
                    labels: ['Total Library', 'Observed Library', 'Not observed'],
                    datasets: [
                      {
                        label: ['Library'],
                        backgroundColor: ['#00546B', '#4ca6beff', '#8eb4beff'],
                        data: [
                          494,
                          allLibraryObsDataPreviousMonth,
                          allNotObservedLibararyPreviousMonth,
                        ],
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
              <strong>BCO Status</strong> <small>({previousMonthYear})</small>
            </CCardHeader>
            <CCardBody>
              {/* <p className="text-medium-emphasis small">
                        Use contextual classes to color tables, table rows or individual cells.
                      </p> */}
              {/* <DocsExample href="components/table#variants"> */}
              <CLink href="prevail/p-bco">
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
              <strong>Teacher Training</strong> <small> Till to ({previousMonthYear})</small>
            </CCardHeader>
            <CCardBody>
              {/* <p className="text-medium-emphasis small">
                        Use contextual classes to color tables, table rows or individual cells.
                      </p> */}
              {/* <DocsExample href="components/table#variants"> */}
              <CLink href="/prevail/p-teacher">
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
                      <CTableDataCell>{allTeacherG1}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="primary">
                      <CTableHeaderCell scope="row">Instruction Training G2</CTableHeaderCell>
                      <CTableDataCell>{allTeacherG2}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="secondary">
                      <CTableHeaderCell scope="row">Instruction Training G3</CTableHeaderCell>
                      <CTableDataCell>{allTeacherG3}</CTableDataCell>
                    </CTableRow>
                    <CTableRow color="danger">
                      <CTableHeaderCell scope="row">Library Teacher Training</CTableHeaderCell>
                      <CTableDataCell>{allTeacherLibary}</CTableDataCell>
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
