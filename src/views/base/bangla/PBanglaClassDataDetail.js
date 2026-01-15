//  Author: Mohammad Jihad Hossain
//  Create Date: 09/09/2025
//  Modify Date: 02/11/2025
//  Description: PLFObservation  file

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
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
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCardTitle,
} from '@coreui/react'

import { CChart, CChartBar, CChartLine } from '@coreui/react-chartjs'
import { DocsCallout, DocsExample } from 'src/components'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import MaterialTable from 'material-table'
import { BorderBottom } from '@material-ui/icons'

//Icon
//Icon

const PBanglaClassDataDetail = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBanglaObsData, setAllBanglaObsData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

  // For error handling row update
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  // For error handling row update

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')
      await getAllBanglaClass(console.log('get bangla class called'))
      await getAllTeacher(console.log('get teacher class called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Teacher
  const getAllTeacher = async () => {
    setIsLoading(true)
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

  // Teacher filter data
  const g1Teacher = allTeacherData.filter((item) => {
    return item.instructionG1 === '1'
  }).length

  const g2Teacher = allTeacherData.filter((item) => {
    return item.instructionG2 === '1'
  }).length
  // Teacher filter data

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
  const allG1TeacherPreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus
    )
  }).length

  const allG1TeacherP0PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 0'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allG1TeacherP1PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allG1TeacherP2PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allG1TeacherP3PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G1' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // G1

  // G2
  const allG2TeacherPreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus
    )
  }).length

  const allG2TeacherP0PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 0'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allG2TeacherP1PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allG2TeacherP2PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allG2TeacherP3PreviousMonth = allBanglaObsData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'G2' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // G2
  // PreviousMonth
  // Bangla Observation Data by filter

  // Get All Book-checkout Data for school
  const getAllBanglaClass = async () => {
    setIsLoading(true)
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
      console.log('Data:' + response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Book-checkout Data for school

  // Row update function
  const handleRowUpdateAllBanglaClass = (newData, oldData, resolve) => {
    //validation

    let errorList = []
    // if (newData.first_name === '') {
    //   errorList.push('Please enter first name')
    // }
    // if (newData.last_name === '') {
    //   errorList.push('Please enter last name')
    // }
    // if (newData.email === '' || validateEmail(newData.email) === false) {
    //   errorList.push('Please enter a valid email')
    // }

    if (errorList.length < 1) {
      axios
        .patch('http://118.179.80.51:8080/api/v1/p-bangla-class/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allBanglaObsData]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllBanglaObsData([...dataUpdate])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Update failed! Server error'])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }
  // Row update function
  // Row add function
  const handleRowAddBanglaClass = (newData, resolve) => {
    //validation

    let errorList = []
    // if (newData.first_name === '') {
    //   errorList.push('Please enter first name')
    // }
    // if (newData.last_name === '') {
    //   errorList.push('Please enter last name')
    // }
    // if (newData.email === '' || validateEmail(newData.email) === false) {
    //   errorList.push('Please enter a valid email')
    // }

    if (errorList.length < 1) {
      axios
        .post('http://118.179.80.51:8080/api/v1/p-bangla-class/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allBanglaObsData]
          dataToAdd.push(newData)
          setAllBanglaObsData([...dataToAdd])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Add BanglaClass failed! Server error'])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }
  // Row add function

  // Row delete function
  const handleRowDeleteBanglaClass = (oldData, resolve) => {
    //validation

    let errorList = []
    // if (newData.first_name === '') {
    //   errorList.push('Please enter first name')
    // }
    // if (newData.last_name === '') {
    //   errorList.push('Please enter last name')
    // }
    // if (newData.email === '' || validateEmail(newData.email) === false) {
    //   errorList.push('Please enter a valid email')
    // }

    if (errorList.length < 1) {
      axios
        .delete('http://118.179.80.51:8080/api/v1/p-bangla-class/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allBanglaObsData]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllBanglaObsData([...dataDelete])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Delete failed! Server error'])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }
  // Row delete function

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
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>PREVAIL Bangla Class Observation 2025</strong>
              {/* <strong>{allBCOData.length}</strong> */}
            </CCardHeader>
            <CCardBody>
              <CAccordion alwaysOpen>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>
                    <strong>Grade wise Teacher Performance</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow>
                      <CCol sm={6}>
                        <strong>G1 Teacher Visited {previousMonthYear}</strong>
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
                              <CTableDataCell>{g1Teacher}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                No of Visited G1 Teracher
                              </CTableHeaderCell>
                              <CTableDataCell>{allG1TeacherPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol sm={6}>
                        <strong>G1 Teacher Priority {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">Priority 0</CTableHeaderCell>
                              <CTableDataCell>{allG1TeacherP0PreviousMonth}</CTableDataCell>
                            </CTableRow>
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
                              <CTableDataCell>{allG1TeacherPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                    </CRow>
                  </CAccordionBody>
                  <CAccordionBody>
                    <CRow>
                      <CCol sm={6}>
                        <strong>G2 Teacher Visited {previousMonthYear}</strong>
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
                              <CTableDataCell>{g2Teacher}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                No of Visited G2 Teracher
                              </CTableHeaderCell>
                              <CTableDataCell>{allG2TeacherPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol sm={6}>
                        <strong>G2 Teacher Priority {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">Priority 0</CTableHeaderCell>
                              <CTableDataCell>{allG2TeacherP0PreviousMonth}</CTableDataCell>
                            </CTableRow>
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
                              <CTableDataCell>{allG2TeacherPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                    </CRow>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>
                    <strong>Monthly Trending Teacher Performance</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>G1 Teacher Priority Chart</strong> <small>(2025)</small>
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
                            exportButton: true,
                            exportAllData: true,
                            search: true,
                            filtering: true,
                            grouping: true,
                            sorting: true,
                            pageSize: 3,
                            pageSizeOptions: [3, 10, 20],
                            maxBodyHeight: '700px',
                            headerStyle: {
                              position: 'sticky',
                              top: 0,
                              backgroundColor: '#7e93b4ff',
                              fontWeight: 'bold',
                              width: '5px',
                              height: '5px',
                              textAlign: 'center',
                              color: '#0d0d0eff',
                              borderRight: '1px solid #0e0d0dff',
                              borderLeft: '1px solid #0e0d0dff',
                              borderStyle: 'solid',
                            },
                            rowStyle: {
                              fontSize: 14,
                              backgroundColor: '#E5DED4',
                              borderRight: '1px solid #131111ff',
                              borderLeft: '1px solid #0e0d0dff',
                              borderStyle: 'solid',
                              width: '5px',
                              height: '5px',
                              padding: '0 5px',
                            },
                            cellStyle: {
                              borderRight: '1px solid #0c0b0bff',
                              borderLeft: '1px solid #0e0d0dff',
                              borderBottom: '1px solid #0c0b0bff',
                              borderStyle: 'solid',
                              height: '5px',
                              minHeight: '5px',
                              maxHeight: '5px',
                              padding: '0 5px',
                            },
                            maintainAspectRatio: false,
                          }}
                          //style={{ height: '300px', width: '1300px' }}
                        />
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>G1 Teacher Priority</strong> <small>(2025)</small>
                      </CCardHeader>
                      <CCardBody>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                              <CTableHeaderCell scope="col">January</CTableHeaderCell>
                              <CTableHeaderCell scope="col">February</CTableHeaderCell>
                              <CTableHeaderCell scope="col">March</CTableHeaderCell>
                              <CTableHeaderCell scope="col">April</CTableHeaderCell>
                              <CTableHeaderCell scope="col">May</CTableHeaderCell>
                              <CTableHeaderCell scope="col">June</CTableHeaderCell>
                              <CTableHeaderCell scope="col">July</CTableHeaderCell>
                              <CTableHeaderCell scope="col">August</CTableHeaderCell>
                              <CTableHeaderCell scope="col">September</CTableHeaderCell>
                              <CTableHeaderCell scope="col">October</CTableHeaderCell>
                              <CTableHeaderCell scope="col">November</CTableHeaderCell>
                              <CTableHeaderCell scope="col">December</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">Priority 0</CTableHeaderCell>
                              <CTableDataCell>{allG1TeacherP0January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP0March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP0April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP0May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP0June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP0July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                              <CTableDataCell>{allG1TeacherP1January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP1February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP1March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP1April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP1May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP1June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP1July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP1August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP1September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP1October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP1November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP1December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allG1TeacherP2January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP2February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP2March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP2April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP2May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP2June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP2July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP2August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP2September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP2October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP2November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP2December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allG1TeacherP3January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP3February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP3March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP3April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP3May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP3June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG1TeacherP3July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP3August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP3September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP3October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP3November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP3December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allG1TeacherP0January +
                                  allG1TeacherP1January +
                                  allG1TeacherP2January +
                                  allG1TeacherP3January}
                              </CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0February +
                                  allG1TeacherP1February +
                                  allG1TeacherP2February +
                                  allG1TeacherP3February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0March +
                                  allG1TeacherP1March +
                                  allG1TeacherP2March +
                                  allG1TeacherP3March}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0April +
                                  allG1TeacherP1April +
                                  allG1TeacherP2April +
                                  allG1TeacherP3April}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0May +
                                  allG1TeacherP1May +
                                  allG1TeacherP2May +
                                  allG1TeacherP3May}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0June +
                                  allG1TeacherP1June +
                                  allG1TeacherP2June +
                                  allG1TeacherP3June}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0July +
                                  allG1TeacherP1July +
                                  allG1TeacherP2July +
                                  allG1TeacherP3July}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0August +
                                  allG1TeacherP1August +
                                  allG1TeacherP2August +
                                  allG1TeacherP3August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0September +
                                  allG1TeacherP1September +
                                  allG1TeacherP2September +
                                  allG1TeacherP3September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0October +
                                  allG1TeacherP1October +
                                  allG1TeacherP2October +
                                  allG1TeacherP3October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0November +
                                  allG1TeacherP1November +
                                  allG1TeacherP2November +
                                  allG1TeacherP3November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG1TeacherP0December +
                                  allG1TeacherP1December +
                                  allG1TeacherP2December +
                                  allG1TeacherP3December}
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>G2 Teacher Priority Chart</strong> <small>(2025)</small>
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
                          style={{ height: '300px', width: '1250px' }} // Inline style for height width
                        />
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>G2 Teacher Priority</strong> <small>(2025)</small>
                      </CCardHeader>
                      <CCardBody>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                              <CTableHeaderCell scope="col">January</CTableHeaderCell>
                              <CTableHeaderCell scope="col">February</CTableHeaderCell>
                              <CTableHeaderCell scope="col">March</CTableHeaderCell>
                              <CTableHeaderCell scope="col">April</CTableHeaderCell>
                              <CTableHeaderCell scope="col">May</CTableHeaderCell>
                              <CTableHeaderCell scope="col">June</CTableHeaderCell>
                              <CTableHeaderCell scope="col">July</CTableHeaderCell>
                              <CTableHeaderCell scope="col">August</CTableHeaderCell>
                              <CTableHeaderCell scope="col">September</CTableHeaderCell>
                              <CTableHeaderCell scope="col">October</CTableHeaderCell>
                              <CTableHeaderCell scope="col">November</CTableHeaderCell>
                              <CTableHeaderCell scope="col">December</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">Priority 0</CTableHeaderCell>
                              <CTableDataCell>{allG2TeacherP0January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP0March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP0April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP0May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP0June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP0July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                              <CTableDataCell>{allG2TeacherP1January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP1February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP1March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP1April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP1May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP1June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP1July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP1August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP1September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP1October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP1November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP1December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allG2TeacherP2January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP2February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP2March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP2April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP2May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP2June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP2July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP2August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP2September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP2October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP2November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP2December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allG2TeacherP3January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP3February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP3March}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP3April}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP3May}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP3June}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allG2TeacherP3July}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP3August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP3September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP3October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP3November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP3December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allG2TeacherP0January +
                                  allG2TeacherP1January +
                                  allG2TeacherP2January +
                                  allG2TeacherP3January}
                              </CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0February +
                                  allG2TeacherP1February +
                                  allG2TeacherP2February +
                                  allG2TeacherP3February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0March +
                                  allG2TeacherP1March +
                                  allG2TeacherP2March +
                                  allG2TeacherP3March}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0April +
                                  allG2TeacherP1April +
                                  allG2TeacherP2April +
                                  allG2TeacherP3April}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0May +
                                  allG2TeacherP1May +
                                  allG2TeacherP2May +
                                  allG2TeacherP3May}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0June +
                                  allG2TeacherP1June +
                                  allG2TeacherP2June +
                                  allG2TeacherP3June}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0July +
                                  allG2TeacherP1July +
                                  allG2TeacherP2July +
                                  allG2TeacherP3July}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0August +
                                  allG2TeacherP1August +
                                  allG2TeacherP2August +
                                  allG2TeacherP3August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0September +
                                  allG2TeacherP1September +
                                  allG2TeacherP2September +
                                  allG2TeacherP3September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0October +
                                  allG2TeacherP1October +
                                  allG2TeacherP2October +
                                  allG2TeacherP3October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0November +
                                  allG2TeacherP1November +
                                  allG2TeacherP2November +
                                  allG2TeacherP3November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allG2TeacherP0December +
                                  allG2TeacherP1December +
                                  allG2TeacherP2December +
                                  allG2TeacherP3December}
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                </CAccordionItem>
                {/* <CAccordionItem itemKey={3}>
                  <CAccordionHeader>
                    <strong>All PREVAIL Bangla Observation Data</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <MaterialTable
                      title={allBanglaObsData.length + ' Data'}
                      columns={[
                        {
                          title: 'Date',
                          field: 'date',
                          type: 'date',
                          sorting: 'true',
                        },
                        { title: 'School', field: 'school' },
                        {
                          title: 'Teacher',
                          field: 'classTeacher',
                        },
                        { title: 'Teacher Priority', field: 'teacherStatus', sorting: 'true' },
                        { title: 'LPO ID', field: 'lpo', type: 'string' },
                        { title: 'LPO Name', field: 'lpoName', type: 'string' },
                        {
                          title: 'LF ID',
                          field: 'lf',
                          type: 'string',
                        },
                        {
                          title: 'LF Name',
                          field: 'lfName',
                          type: 'string',
                        },
                        { title: 'Year', field: 'year', sorting: 'true' },
                        { title: 'Month', field: 'month', sorting: 'true' },
                        { title: 'District', field: 'district' },
                        { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                        { title: 'Office', field: 'fieldOffice', sorting: 'true' },
                        { title: 'Project', field: 'project', sorting: 'true' },

                        {
                          title: 'Grade',
                          field: 'grade',
                        },
                        {
                          title: 'Section',
                          field: 'section',
                        },
                        {
                          title: 'ClassStartTime',
                          field: 'classStartTime',
                        },
                        {
                          title: 'ClassEndTime',
                          field: 'classEndTime',
                        },

                        {
                          title: 'ContentName',
                          field: 'contentName',
                        },
                        {
                          title: 'PeriodDay',
                          field: 'periodDay',
                        },
                        {
                          title: 'TotalAdmittedStudent',
                          field: 'totalAdmittedStudent',
                          filtering: false,
                        },

                        {
                          title: 'TotalPresentStudent',
                          field: 'totalPresentStudent',
                          filtering: false,
                        },

                        {
                          title: 'Note',
                          field: 'note',
                        },

                        {
                          title: 'lastFollowupTopic1',
                          field: 'lastFollowupTopic1',
                          filtering: false,
                        },
                        {
                          title: 'lastFollowupTopic2',
                          field: 'lastFollowupTopic2',
                          filtering: false,
                        },
                        {
                          title: 'lastFollowupTopic3',
                          field: 'lastFollowupTopic3',
                          filtering: false,
                        },

                        {
                          title: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                          field: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind11TeacherFollowedTeacherGuideInClassNote',
                          field: 'ind11TeacherFollowedTeacherGuideInClassNote',
                          filtering: false,
                        },

                        {
                          title: 'ind12FollowedIDoWeDoYouDoStatus',
                          field: 'ind12FollowedIDoWeDoYouDoStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind12FollowedIDoWeDoYouDoNote',
                          field: 'ind12FollowedIDoWeDoYouDoNote',
                          filtering: false,
                        },

                        {
                          title: 'ind13FollowedContinuityOfLessonStatus',
                          field: 'ind13FollowedContinuityOfLessonStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind13FollowedContinuityOfLessonNote',
                          field: 'ind13FollowedContinuityOfLessonNote',
                          filtering: false,
                        },

                        {
                          title: 'ind14ImplementedAllTaskInTimeStatus',
                          field: 'ind14ImplementedAllTaskInTimeStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind14ImplementedAllTaskInTimeNote',
                          field: 'ind14ImplementedAllTaskInTimeNote',
                          filtering: false,
                        },

                        {
                          title: 'ind15InstructedToUseWorkbookStatus',
                          field: 'ind15InstructedToUseWorkbookStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind15InstructedToUseWorkbookNote',
                          field: 'ind15InstructedToUseWorkbookNote',
                          filtering: false,
                        },

                        {
                          title: 'ind16IndependentReadingOpportunityStatus',
                          field: 'ind16IndependentReadingOpportunityStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind16IndependentReadingOpportunityNote',
                          field: 'ind16IndependentReadingOpportunityNote',
                          filtering: false,
                        },

                        {
                          title: 'ind21CorrectlyPronouncedStatus',
                          field: 'ind21CorrectlyPronouncedStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind21CorrectlyPronouncedNote',
                          field: 'ind21CorrectlyPronouncedNote',
                          filtering: false,
                        },

                        {
                          title: 'ind22TaughtCorrectlyAllowPracticeStatus',
                          field: 'ind22TaughtCorrectlyAllowPracticeStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind22TaughtCorrectlyAllowPracticeNote',
                          field: 'ind22TaughtCorrectlyAllowPracticeNote',
                          filtering: false,
                        },

                        {
                          title: 'ind23DemonstratesFluentReadingStatus',
                          field: 'ind23DemonstratesFluentReadingStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind23DemonstratesFluentReadingNote',
                          field: 'ind23DemonstratesFluentReadingNote',
                          filtering: false,
                        },

                        {
                          title: 'ind24AllowReadIndividuallyPairGroupsStatus',
                          field: 'ind24AllowReadIndividuallyPairGroupsStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind24AllowReadIndividuallyPairGroupsNote',
                          field: 'ind24AllowReadIndividuallyPairGroupsNote',
                          filtering: false,
                        },

                        {
                          title: 'ind25FollowsInstructionsInWritingStatus',
                          field: 'ind25FollowsInstructionsInWritingStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind25FollowsInstructionsInWritingNote',
                          field: 'ind25FollowsInstructionsInWritingNote',
                          filtering: false,
                        },

                        {
                          title: 'ind31AskedHelpfulQuestionsStatus',
                          field: 'ind31AskedHelpfulQuestionsStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind31AskedHelpfulQuestionsNote',
                          field: 'ind31AskedHelpfulQuestionsNote',
                          filtering: false,
                        },

                        {
                          title: 'ind32TaughtVocabularyNewSentenceStatus',
                          field: 'ind32TaughtVocabularyNewSentenceStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind32TaughtVocabularyNewSentenceNote',
                          field: 'ind32TaughtVocabularyNewSentenceNote',
                          filtering: false,
                        },
                        {
                          title: 'ind33CheckWritingSpellingPunctuationStatus',
                          field: 'ind33CheckWritingSpellingPunctuationStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind33CheckWritingSpellingPunctuationNote',
                          field: 'ind33CheckWritingSpellingPunctuationNote',
                          filtering: false,
                        },

                        {
                          title: 'ind34CheckedWeDoYouDoStatus',
                          field: 'ind34CheckedWeDoYouDoStatus',
                          filtering: false,
                        },
                        {
                          title: 'ind34CheckedWeDoYouDoNote',
                          field: 'ind34CheckedWeDoYouDoNote',
                          filtering: false,
                        },

                        { title: 'bestPracticeInd1', field: 'bestPracticeInd1', filtering: false },
                        { title: 'bestPracticeInd2', field: 'bestPracticeInd2', filtering: false },

                        {
                          title: 'coachingSupportInd1',
                          field: 'coachingSupportInd1',
                          filtering: false,
                        },
                        {
                          title: 'coachingSupportInd2',
                          field: 'coachingSupportInd2',
                          filtering: false,
                        },

                        { title: 'agreedStatement1', field: 'agreedStatement1', filtering: false },
                        { title: 'agreedStatement2', field: 'agreedStatement2', filtering: false },

                        { title: 'question1', field: 'question1', filtering: false },

                        { title: 'student1', field: 'student1', filtering: false },
                        { title: 'student2', field: 'student2', filtering: false },
                        { title: 'student3', field: 'student3', filtering: false },

                        { title: 'noRightFor1', field: 'noRightFor1', filtering: false },
                        { title: 'noWrongFor1', field: 'noWrongFor1', filtering: false },
                        { title: 'totalFor1', field: 'totalFor1', filtering: false },
                        { title: 'noRightFor2', field: 'noRightFor2', filtering: false },
                        { title: 'noWrongFor2', field: 'noWrongFor2', filtering: false },
                        { title: 'totalFor2', field: 'totalFor2', filtering: false },
                        { title: 'noRightFor3', field: 'noRightFor3', filtering: false },
                        { title: 'noWrongFor3', field: 'noWrongFor3', filtering: false },
                        { title: 'totalFor3', field: 'totalFor3', filtering: false },
                      ]}
                      editable={{
                        onRowAdd: (newData) =>
                          new Promise((resolve) => {
                            handleRowAddBanglaClass(newData, resolve)
                          }),
                        // onRowDelete: (oldData) =>
                        //   new Promise((resolve) => {
                        //     handleRowDeleteBanglaClass(oldData, resolve)
                        //   }),
                        onRowUpdate: (newData, oldData) =>
                          new Promise((resolve) => {
                            handleRowUpdateAllBanglaClass(newData, oldData, resolve)
                          }),
                      }}
                      options={{
                        exportButton: true,
                        exportAllData: true,
                        search: true,
                        filtering: true,
                        grouping: true,
                        sorting: true,
                        pageSize: 5,
                        pageSizeOptions: [5, 10, 20],
                        // maxBodyHeight: '300px',
                        headerStyle: {
                          position: 'sticky',
                          top: 0,
                          backgroundColor: '#7e93b4ff',
                          fontWeight: 'bold',
                          width: 15,
                          textAlign: 'center',
                          color: '#0d0d0eff',
                          borderRight: '1px solid #0e0d0dff',
                          borderLeft: '1px solid #0e0d0dff',
                          borderStyle: 'solid',
                        },
                        rowStyle: {
                          fontSize: 14,
                          backgroundColor: '#d8a68dff',
                          borderRight: '1px solid #131111ff',
                          borderLeft: '1px solid #0e0d0dff',
                          borderStyle: 'solid',
                        },
                        cellStyle: {
                          borderRight: '1px solid #0c0b0bff',
                          borderLeft: '1px solid #0e0d0dff',
                          borderBottom: '1px solid #0c0b0bff',
                          borderStyle: 'solid',
                        },
                        maintainAspectRatio: false,
                      }}
                      style={{ height: '300px', width: '1250px' }}
                      data={allBanglaObsData}
                    />
                  </CAccordionBody>
                </CAccordionItem> */}
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard style={{ width: '1310px', height: '900px' }}>
            <CCardHeader>
              <strong>All PREVAIL Bangla Observation Data</strong>
              <small>Total School-{allBanglaObsData.length}</small>
            </CCardHeader>
            <CCardBody>
              <CCardTitle></CCardTitle>
              <MaterialTable
                title="For filtering drag and drop the headers bellow"
                columns={[
                  {
                    title: 'Date',
                    field: 'date',
                    type: 'date',
                    sorting: 'true',
                  },
                  { title: 'School', field: 'school' },
                  {
                    title: 'Teacher',
                    field: 'classTeacher',
                  },
                  { title: 'Teacher Priority', field: 'teacherStatus', sorting: 'true' },
                  { title: 'LPO ID', field: 'lpo', type: 'string' },
                  { title: 'LPO Name', field: 'lpoName', type: 'string' },
                  {
                    title: 'LF ID',
                    field: 'lf',
                    type: 'string',
                  },
                  {
                    title: 'LF Name',
                    field: 'lfName',
                    type: 'string',
                  },
                  { title: 'Year', field: 'year', sorting: 'true' },
                  { title: 'Month', field: 'month', sorting: 'true' },
                  { title: 'District', field: 'district' },
                  { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                  { title: 'Office', field: 'fieldOffice', sorting: 'true' },
                  { title: 'Project', field: 'project', sorting: 'true' },

                  {
                    title: 'Grade',
                    field: 'grade',
                  },
                  {
                    title: 'Section',
                    field: 'section',
                  },
                  {
                    title: 'ClassStartTime',
                    field: 'classStartTime',
                  },
                  {
                    title: 'ClassEndTime',
                    field: 'classEndTime',
                  },

                  {
                    title: 'ContentName',
                    field: 'contentName',
                  },
                  {
                    title: 'PeriodDay',
                    field: 'periodDay',
                  },
                  {
                    title: 'TotalAdmittedStudent',
                    field: 'totalAdmittedStudent',
                    filtering: false,
                  },

                  {
                    title: 'TotalPresentStudent',
                    field: 'totalPresentStudent',
                    filtering: false,
                  },

                  {
                    title: 'Note',
                    field: 'note',
                  },

                  {
                    title: 'lastFollowupTopic1',
                    field: 'lastFollowupTopic1',
                    filtering: false,
                  },
                  {
                    title: 'lastFollowupTopic2',
                    field: 'lastFollowupTopic2',
                    filtering: false,
                  },
                  {
                    title: 'lastFollowupTopic3',
                    field: 'lastFollowupTopic3',
                    filtering: false,
                  },

                  {
                    title: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                    field: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind11TeacherFollowedTeacherGuideInClassNote',
                    field: 'ind11TeacherFollowedTeacherGuideInClassNote',
                    filtering: false,
                  },

                  {
                    title: 'ind12FollowedIDoWeDoYouDoStatus',
                    field: 'ind12FollowedIDoWeDoYouDoStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind12FollowedIDoWeDoYouDoNote',
                    field: 'ind12FollowedIDoWeDoYouDoNote',
                    filtering: false,
                  },

                  {
                    title: 'ind13FollowedContinuityOfLessonStatus',
                    field: 'ind13FollowedContinuityOfLessonStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind13FollowedContinuityOfLessonNote',
                    field: 'ind13FollowedContinuityOfLessonNote',
                    filtering: false,
                  },

                  {
                    title: 'ind14ImplementedAllTaskInTimeStatus',
                    field: 'ind14ImplementedAllTaskInTimeStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind14ImplementedAllTaskInTimeNote',
                    field: 'ind14ImplementedAllTaskInTimeNote',
                    filtering: false,
                  },

                  {
                    title: 'ind15InstructedToUseWorkbookStatus',
                    field: 'ind15InstructedToUseWorkbookStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind15InstructedToUseWorkbookNote',
                    field: 'ind15InstructedToUseWorkbookNote',
                    filtering: false,
                  },

                  {
                    title: 'ind16IndependentReadingOpportunityStatus',
                    field: 'ind16IndependentReadingOpportunityStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind16IndependentReadingOpportunityNote',
                    field: 'ind16IndependentReadingOpportunityNote',
                    filtering: false,
                  },

                  {
                    title: 'ind21CorrectlyPronouncedStatus',
                    field: 'ind21CorrectlyPronouncedStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind21CorrectlyPronouncedNote',
                    field: 'ind21CorrectlyPronouncedNote',
                    filtering: false,
                  },

                  {
                    title: 'ind22TaughtCorrectlyAllowPracticeStatus',
                    field: 'ind22TaughtCorrectlyAllowPracticeStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind22TaughtCorrectlyAllowPracticeNote',
                    field: 'ind22TaughtCorrectlyAllowPracticeNote',
                    filtering: false,
                  },

                  {
                    title: 'ind23DemonstratesFluentReadingStatus',
                    field: 'ind23DemonstratesFluentReadingStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind23DemonstratesFluentReadingNote',
                    field: 'ind23DemonstratesFluentReadingNote',
                    filtering: false,
                  },

                  {
                    title: 'ind24AllowReadIndividuallyPairGroupsStatus',
                    field: 'ind24AllowReadIndividuallyPairGroupsStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind24AllowReadIndividuallyPairGroupsNote',
                    field: 'ind24AllowReadIndividuallyPairGroupsNote',
                    filtering: false,
                  },

                  {
                    title: 'ind25FollowsInstructionsInWritingStatus',
                    field: 'ind25FollowsInstructionsInWritingStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind25FollowsInstructionsInWritingNote',
                    field: 'ind25FollowsInstructionsInWritingNote',
                    filtering: false,
                  },

                  {
                    title: 'ind31AskedHelpfulQuestionsStatus',
                    field: 'ind31AskedHelpfulQuestionsStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind31AskedHelpfulQuestionsNote',
                    field: 'ind31AskedHelpfulQuestionsNote',
                    filtering: false,
                  },

                  {
                    title: 'ind32TaughtVocabularyNewSentenceStatus',
                    field: 'ind32TaughtVocabularyNewSentenceStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind32TaughtVocabularyNewSentenceNote',
                    field: 'ind32TaughtVocabularyNewSentenceNote',
                    filtering: false,
                  },
                  {
                    title: 'ind33CheckWritingSpellingPunctuationStatus',
                    field: 'ind33CheckWritingSpellingPunctuationStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind33CheckWritingSpellingPunctuationNote',
                    field: 'ind33CheckWritingSpellingPunctuationNote',
                    filtering: false,
                  },

                  {
                    title: 'ind34CheckedWeDoYouDoStatus',
                    field: 'ind34CheckedWeDoYouDoStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind34CheckedWeDoYouDoNote',
                    field: 'ind34CheckedWeDoYouDoNote',
                    filtering: false,
                  },

                  { title: 'bestPracticeInd1', field: 'bestPracticeInd1', filtering: false },
                  { title: 'bestPracticeInd2', field: 'bestPracticeInd2', filtering: false },

                  {
                    title: 'coachingSupportInd1',
                    field: 'coachingSupportInd1',
                    filtering: false,
                  },
                  {
                    title: 'coachingSupportInd2',
                    field: 'coachingSupportInd2',
                    filtering: false,
                  },

                  { title: 'agreedStatement1', field: 'agreedStatement1', filtering: false },
                  { title: 'agreedStatement2', field: 'agreedStatement2', filtering: false },

                  { title: 'question1', field: 'question1', filtering: false },

                  { title: 'student1', field: 'student1', filtering: false },
                  { title: 'student2', field: 'student2', filtering: false },
                  { title: 'student3', field: 'student3', filtering: false },

                  { title: 'noRightFor1', field: 'noRightFor1', filtering: false },
                  { title: 'noWrongFor1', field: 'noWrongFor1', filtering: false },
                  { title: 'totalFor1', field: 'totalFor1', filtering: false },
                  { title: 'noRightFor2', field: 'noRightFor2', filtering: false },
                  { title: 'noWrongFor2', field: 'noWrongFor2', filtering: false },
                  { title: 'totalFor2', field: 'totalFor2', filtering: false },
                  { title: 'noRightFor3', field: 'noRightFor3', filtering: false },
                  { title: 'noWrongFor3', field: 'noWrongFor3', filtering: false },
                  { title: 'totalFor3', field: 'totalFor3', filtering: false },
                ]}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      handleRowAddBanglaClass(newData, resolve)
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      handleRowDeleteBanglaClass(oldData, resolve)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdateAllBanglaClass(newData, oldData, resolve)
                    }),
                }}
                options={{
                  exportButton: true,
                  exportAllData: true,
                  search: true,
                  filtering: true,
                  grouping: true,
                  sorting: true,
                  pageSize: 3,
                  pageSizeOptions: [3, 10, 20],
                  maxBodyHeight: '700px',
                  headerStyle: {
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#7e93b4ff',
                    fontWeight: 'bold',
                    width: '5px',
                    height: '5px',
                    textAlign: 'center',
                    color: '#0d0d0eff',
                    borderRight: '1px solid #0e0d0dff',
                    borderLeft: '1px solid #0e0d0dff',
                    borderStyle: 'solid',
                  },
                  rowStyle: {
                    fontSize: 14,
                    backgroundColor: '#E5DED4',
                    borderRight: '1px solid #131111ff',
                    borderLeft: '1px solid #0e0d0dff',
                    borderStyle: 'solid',
                    width: '5px',
                    height: '5px',
                    padding: '0 5px',
                  },
                  cellStyle: {
                    borderRight: '1px solid #0c0b0bff',
                    borderLeft: '1px solid #0e0d0dff',
                    borderBottom: '1px solid #0c0b0bff',
                    borderStyle: 'solid',
                    height: '5px',
                    minHeight: '5px',
                    maxHeight: '5px',
                    padding: '0 5px',
                  },
                  maintainAspectRatio: false,
                }}
                style={{ height: '700px', width: '1300px' }}
                data={allBanglaObsData}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default PBanglaClassDataDetail
