//  Author: Mohammad Jihad Hossain
//  Create Date: 11/01/2026
//  Modify Date: 11/01/2026
//  Description: PPreprimaryDataDetail  file

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

const PPreprimaryDataDetail = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBanglaObsData, setAllBanglaObsData] = useState([])

  const [allPPrePrimaryData, setAllPPrePrimaryData] = useState([])

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
      await getAllPPrePrimary(console.log('get preprimary class called'))
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

  const ppTeacher = allTeacherData.filter((item) => {
    return item.instructionG1 === 'PP'
  }).length

  const g1Teacher = allTeacherData.filter((item) => {
    return item.instructionG1 === '1'
  }).length

  const g2Teacher = allTeacherData.filter((item) => {
    return item.instructionG2 === '1'
  }).length
  // Teacher filter data

  // Bangla Observation Data by filter
  // Trending
  // PP
  // P1
  const allPPTeacherP1January = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'January' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1February = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'February' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1March = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'March' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1April = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'April' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1May = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'May' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1June = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'June' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1July = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'July' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1August = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'August' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1September = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'September' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1October = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'October' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1November = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'November' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP1December = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'December' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
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
  const allPPTeacherP2January = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'January' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2February = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'February' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2March = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'March' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2April = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'April' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2May = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'May' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2June = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'June' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2July = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'July' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2August = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'August' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2September = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'September' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2October = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'October' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2November = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'November' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP2December = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'December' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
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
  const allPPTeacherP3January = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'January' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3February = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'February' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3March = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'March' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3April = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'April' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3May = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'May' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3June = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'June' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3July = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'July' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3August = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'August' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3September = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'September' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3October = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'October' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3November = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'November' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allPPTeacherP3December = allPPrePrimaryData.filter((item) => {
    return (
      item.month === 'December' &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // P3
  // PP
  // Trending

  // PreviousMonth
  // PP
  const allPPTeacherPreviousMonth = allPPrePrimaryData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus
    )
  }).length

  const allPPTeacherP1PreviousMonth = allPPrePrimaryData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allPPTeacherP2PreviousMonth = allPPrePrimaryData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allPPTeacherP3PreviousMonth = allPPrePrimaryData.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2025' &&
      item.grade === 'PP' &&
      item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // PP
  // PreviousMonth
  // Bangla Observation Data by filter

  // Get All Book-checkout Data for school
  const getAllPPrePrimary = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-preprimary', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllPPrePrimaryData(response.data)
      setIsLoading(false)
      console.log('Data:' + response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Book-checkout Data for school

  // Row update function
  const handleRowUpdateAllPPrePrimaryClass = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/p-preprimary/' + newData.id, newData, {
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
  const handleRowAddPPrePrimaryClass = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/p-preprimary/', newData, {
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
          setErrorMessages(['Add PPrePrimary failed! Server error'])
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
  const handleRowDeletePPrePrimaryClass = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/p-preprimary/' + oldData.id, {
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
              <strong>PREVAIL PrePrimary Class Observation 2026</strong>
              {/* <strong>{allBCOData.length}</strong> */}
            </CCardHeader>
            <CCardBody>
              <CAccordion alwaysOpen>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>
                    <strong>PrePrimary Teacher Performance</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow>
                      <CCol sm={6}>
                        <strong>PrePrimary Teacher Visited {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">
                                Total PrePrimary Teacher
                              </CTableHeaderCell>
                              <CTableDataCell>{ppTeacher}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                No of Visited PrePrimary Teracher
                              </CTableHeaderCell>
                              <CTableDataCell>{allPPTeacherPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol sm={6}>
                        <strong>PrePrimary Teacher Priority {previousMonthYear}</strong>
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
                              <CTableDataCell>{allPPTeacherP1PreviousMonth}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allPPTeacherP1PreviousMonth}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allPPTeacherP2PreviousMonth}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>{allPPTeacherP3PreviousMonth}</CTableDataCell>
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
                        <strong>PrePrimary Teacher Priority Chart</strong> <small>(2026)</small>
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
                                backgroundColor: '#8ddaf3ff',
                                borderColor: '#8ddaf3ff',
                                pointBackgroundColor: '#8ddaf3ff',
                                pointBorderColor: '#8ddaf3ff',
                                data: [
                                  allPPTeacherP1January,
                                  allPPTeacherP1February,
                                  allPPTeacherP1March,
                                  allPPTeacherP1April,
                                  allPPTeacherP1May,
                                  allPPTeacherP1June,
                                  allPPTeacherP1July,
                                  allPPTeacherP1August,
                                  allPPTeacherP1September,
                                  allPPTeacherP1October,
                                  allPPTeacherP1November,
                                  allPPTeacherP1December,
                                ],
                              },
                              {
                                label: 'Priority 2',
                                backgroundColor: '#35a8ceff',
                                borderColor: '#35a8ceff',
                                pointBackgroundColor: '#35a8ceff',
                                pointBorderColor: '#35a8ceff',
                                data: [
                                  allPPTeacherP2January,
                                  allPPTeacherP2February,
                                  allPPTeacherP2March,
                                  allPPTeacherP2April,
                                  allPPTeacherP2May,
                                  allPPTeacherP2June,
                                  allPPTeacherP2July,
                                  allPPTeacherP2August,
                                  allPPTeacherP2September,
                                  allPPTeacherP2October,
                                  allPPTeacherP2November,
                                  allPPTeacherP2December,
                                ],
                              },
                              {
                                label: 'Priority 3',
                                backgroundColor: '#007AA4',
                                borderColor: '#007AA4',
                                pointBackgroundColor: '#007AA4',
                                pointBorderColor: '#007AA4',
                                data: [
                                  allPPTeacherP3January,
                                  allPPTeacherP3February,
                                  allPPTeacherP3March,
                                  allPPTeacherP3April,
                                  allPPTeacherP3May,
                                  allPPTeacherP3June,
                                  allPPTeacherP3July,
                                  allPPTeacherP3August,
                                  allPPTeacherP3September,
                                  allPPTeacherP3October,
                                  allPPTeacherP3November,
                                  allPPTeacherP3December,
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
                        <strong>PrePrimary Teacher Priority</strong> <small>(2026)</small>
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
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                              <CTableDataCell>{allPPTeacherP1January}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1February}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1March}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1April}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1May}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1June}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1July}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1August}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1September}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1October}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1November}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP1December}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allPPTeacherP2January}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2February}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2March}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2April}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2May}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2June}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2July}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2August}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2September}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2October}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2November}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP2December}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allPPTeacherP3January}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3February}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3March}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3April}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3May}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3June}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3July}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3August}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3September}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3October}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3November}</CTableDataCell>
                              <CTableDataCell>{allPPTeacherP3December}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allPPTeacherP1January +
                                  allPPTeacherP2January +
                                  allPPTeacherP3January}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1February +
                                  allPPTeacherP2February +
                                  allPPTeacherP3February}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1March + allPPTeacherP2March + allPPTeacherP3March}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1April + allPPTeacherP2April + allPPTeacherP3April}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1May + allPPTeacherP2May + allPPTeacherP3May}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1June + allPPTeacherP2June + allPPTeacherP3June}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1July + allPPTeacherP2July + allPPTeacherP3July}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1August + allPPTeacherP2August + allPPTeacherP3August}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1September +
                                  allPPTeacherP2September +
                                  allPPTeacherP3September}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1October +
                                  allPPTeacherP2October +
                                  allPPTeacherP3October}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1November +
                                  allPPTeacherP2November +
                                  allPPTeacherP3November}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allPPTeacherP1December +
                                  allPPTeacherP2December +
                                  allPPTeacherP3December}
                              </CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard style={{ width: '1310px', height: '1000px' }}>
            <CCardHeader>
              <strong>All PREVAIL PPrePrimary Observation Data</strong>
              <small> Total Observation-{allPPrePrimaryData.length}</small>
            </CCardHeader>
            <CCardBody>
              <CCardTitle></CCardTitle>
              <MaterialTable
                title={'For filtering drag and drop the headers bellow'}
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
                  },

                  {
                    title: 'TotalPresentStudent',
                    field: 'totalPresentStudent',
                  },

                  {
                    title: 'Note',
                    field: 'note',
                  },

                  {
                    title: 'lastFollowupIndicator1',
                    field: 'lastFollowupIndicator1',
                  },
                  {
                    title: 'lastFollowupIndicator2',
                    field: 'lastFollowupIndicator2',
                  },
                  {
                    title: 'lastFollowupIndicator3',
                    field: 'lastFollowupIndicator3',
                  },

                  {
                    title: 'ind11UsedRtRMaterialStatus',
                    field: 'ind11UsedRtRMaterialStatus',
                  },
                  {
                    title: 'ind11UsedRtRMaterialNote',
                    field: 'ind11UsedRtRMaterialNote',
                  },

                  {
                    title: 'ind12PlanWiseTeachingStatus',
                    field: 'ind12PlanWiseTeachingStatus',
                  },
                  {
                    title: 'ind12PlanWiseTeachingNote',
                    field: 'ind12PlanWiseTeachingNote',
                  },

                  {
                    title: 'ind13FollowedIWeUDoStatus',
                    field: 'ind13FollowedIWeUDoStatus',
                  },
                  {
                    title: 'ind13FollowedIWeUDoNote',
                    field: 'ind13FollowedIWeUDoNote',
                  },

                  {
                    title: 'ind14UsedStandardLanguageAllowPracticeStatus',
                    field: 'ind14UsedStandardLanguageAllowPracticeStatus',
                  },
                  {
                    title: 'ind14UsedStandardLanguageAllowPracticeNote',
                    field: 'ind14UsedStandardLanguageAllowPracticeNote',
                  },

                  {
                    title: 'ind21UsedRtRReadingMaterialStatus',
                    field: 'ind21UsedRtRReadingMaterialStatus',
                  },
                  {
                    title: 'ind21UsedRtRReadingMaterialNote',
                    field: 'ind21UsedRtRReadingMaterialNote',
                  },

                  {
                    title: 'ind22FollowedPlanContinuityStatus',
                    field: 'ind22FollowedPlanContinuityStatus',
                  },
                  {
                    title: 'ind22FollowedPlanContinuityNote',
                    field: 'ind22FollowedPlanContinuityNote',
                  },

                  {
                    title: 'ind23AskedRelatedQuestionStatus',
                    field: 'ind23AskedRelatedQuestionStatus',
                  },
                  {
                    title: 'ind23AskedRelatedQuestionNote',
                    field: 'ind23AskedRelatedQuestionNote',
                  },

                  {
                    title: 'ind24ShowedPictureAllowedSpeakingStatus',
                    field: 'ind24ShowedPictureAllowedSpeakingStatus',
                  },
                  {
                    title: 'ind24ShowedPictureAllowedSpeakingNote',
                    field: 'ind24ShowedPictureAllowedSpeakingNote',
                  },

                  {
                    title: 'ind31UsedReadingMaterialForAssessmentStatus',
                    field: 'ind31UsedReadingMaterialForAssessmentStatus',
                  },
                  {
                    title: 'ind31UsedReadingMaterialForAssessmentNote',
                    field: 'ind31UsedReadingMaterialForAssessmentNote',
                  },

                  {
                    title: 'ind32FollowedTeachingPlanStatus',
                    field: 'ind32FollowedTeachingPlanStatus',
                  },
                  {
                    title: 'ind32FollowedTeachingPlanNote',
                    field: 'ind32FollowedTeachingPlanNote',
                  },

                  {
                    title: 'ind33AssessmentOn5StudentStatus',
                    field: 'ind33AssessmentOn5StudentStatus',
                  },
                  {
                    title: 'ind33AssessmentOn5StudentNote',
                    field: 'ind33AssessmentOn5StudentNote',
                  },

                  {
                    title: 'ind34Allowed5StudentStoryTellingStatus',
                    field: 'ind34Allowed5StudentStoryTellingStatus',
                  },
                  {
                    title: 'ind34Allowed5StudentStoryTellingNote',
                    field: 'ind34Allowed5StudentStoryTellingNote',
                  },

                  {
                    title: 'bestPracticeIndicator1',
                    field: 'bestPracticeIndicator1',
                  },
                  {
                    title: 'bestPracticeIndicator2',
                    field: 'bestPracticeIndicator2',
                  },
                  {
                    title: 'bestPracticeIndicator3',
                    field: 'bestPracticeIndicator3',
                  },
                  {
                    title: 'coachingSupportIndicator1',
                    field: 'coachingSupportIndicator1',
                  },

                  {
                    title: 'coachingSupportIndicator2',
                    field: 'coachingSupportIndicator2',
                  },
                  {
                    title: 'coachingSupportIndicator3',
                    field: 'coachingSupportIndicator3',
                  },

                  { title: 'agreedStatement1', field: 'agreedStatement1' },
                  { title: 'agreedStatement2', field: 'agreedStatement2' },
                ]}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      handleRowAddPPrePrimaryClass(newData, resolve)
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      handleRowDeletePPrePrimaryClass(oldData, resolve)
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdateAllPPrePrimaryClass(newData, oldData, resolve)
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
                style={{ height: '300px', width: '1300px' }}
                data={allPPrePrimaryData}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default PPreprimaryDataDetail
