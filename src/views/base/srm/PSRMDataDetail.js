//  Author: Mohammad Jihad Hossain
//  Create Date: 11/01/2026
//  Modify Date: 23/04/2026
//  Description: PSRMDataDetail  file

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

const PSRMDataDetail = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBanglaObsData, setAllBanglaObsData] = useState([])

  const [allPSRMData, setAllPSRMData] = useState([])

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
      await getAllPSRM(console.log('get SRM class called'))
      await getAllTeacher(console.log('get teacher class called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All SRM Data for school
  const getAllPSRM = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-srm-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllPSRMData(response.data)
      setIsLoading(false)
      console.log('Data:' + response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All SRM Data for school

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

  const srmTeacher = allTeacherData.filter((item) => {
    return item.libraryManagementSRM === '1'
  }).length
  // Teacher filter data

  // Bangla Observation Data by filter
  // Trending
  // PP
  // P1
  const allSRMTeacherP1January = allPSRMData.filter((item) => {
    return (
      item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1February = allPSRMData.filter((item) => {
    return (
      item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1March = allPSRMData.filter((item) => {
    return (
      item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1April = allPSRMData.filter((item) => {
    return (
      item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1May = allPSRMData.filter((item) => {
    return (
      item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1June = allPSRMData.filter((item) => {
    return (
      item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1July = allPSRMData.filter((item) => {
    return (
      item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1August = allPSRMData.filter((item) => {
    return (
      item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1September = allPSRMData.filter((item) => {
    return (
      item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1October = allPSRMData.filter((item) => {
    return (
      item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1November = allPSRMData.filter((item) => {
    return (
      item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP1December = allPSRMData.filter((item) => {
    return (
      item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // P1

  // P2
  const allSRMTeacherP2January = allPSRMData.filter((item) => {
    return (
      item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2February = allPSRMData.filter((item) => {
    return (
      item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2March = allPSRMData.filter((item) => {
    return (
      item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2April = allPSRMData.filter((item) => {
    return (
      item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2May = allPSRMData.filter((item) => {
    return (
      item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2June = allPSRMData.filter((item) => {
    return (
      item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2July = allPSRMData.filter((item) => {
    return (
      item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2August = allPSRMData.filter((item) => {
    return (
      item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2September = allPSRMData.filter((item) => {
    return (
      item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2October = allPSRMData.filter((item) => {
    return (
      item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2November = allPSRMData.filter((item) => {
    return (
      item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP2December = allPSRMData.filter((item) => {
    return (
      item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length
  // P2

  // P3
  const allSRMTeacherP3January = allPSRMData.filter((item) => {
    return (
      item.month === 'January' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3February = allPSRMData.filter((item) => {
    return (
      item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3March = allPSRMData.filter((item) => {
    return (
      item.month === 'March' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3April = allPSRMData.filter((item) => {
    return (
      item.month === 'April' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3May = allPSRMData.filter((item) => {
    return (
      item.month === 'May' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3June = allPSRMData.filter((item) => {
    return (
      item.month === 'June' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3July = allPSRMData.filter((item) => {
    return (
      item.month === 'July' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3August = allPSRMData.filter((item) => {
    return (
      item.month === 'August' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3September = allPSRMData.filter((item) => {
    return (
      item.month === 'September' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3October = allPSRMData.filter((item) => {
    return (
      item.month === 'October' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3November = allPSRMData.filter((item) => {
    return (
      item.month === 'November' && item.year === '2026' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length
  // .filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.classTeacher === value.classTeacher),
  // ).length

  const allSRMTeacherP3December = allPSRMData.filter((item) => {
    return (
      item.month === 'December' && item.year === '2026' && item.teacherStatus === 'Priority 3'
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
  const allPSRMTeacherPreviousMonth = allPSRMData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.teacherStatus
  }).length

  const allPSRMTeacherP1PreviousMonth = allPSRMData.filter((item) => {
    return (
      item.month === previousMonth && item.year === '2025' && item.teacherStatus === 'Priority 1'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allPSRMTeacherP2PreviousMonth = allPSRMData.filter((item) => {
    return (
      item.month === previousMonth && item.year === '2025' && item.teacherStatus === 'Priority 2'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  const allPSRMTeacherP3PreviousMonth = allPSRMData.filter((item) => {
    return (
      item.month === previousMonth && item.year === '2025' && item.teacherStatus === 'Priority 3'
      // && item.fieldOffice === 'NrFO'
    )
  }).length

  // PP
  // PreviousMonth
  // Bangla Observation Data by filter

  // Row update function
  const handleRowUpdateAllPSRMClass = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/p-srm-class/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allPSRMData]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllPSRMData([...dataUpdate])
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
  const handleRowAddPSRMClass = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/p-srm-class/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allPSRMData]
          dataToAdd.push(newData)
          setAllPSRMData([...dataToAdd])
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
  const handleRowDeletePSRMClass = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/p-srm-class/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allPSRMData]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllPSRMData([...dataDelete])
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
              <strong>PREVAIL SRM Class 2026</strong>
              {/* <strong>{allBCOData.length}</strong> */}
            </CCardHeader>
            <CCardBody>
              <CAccordion alwaysOpen>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>
                    <strong>SRM Teacher Performance</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow>
                      <CCol sm={6}>
                        <strong>SRM Teacher Visited {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total SRM Teacher</CTableHeaderCell>
                              <CTableDataCell>{srmTeacher}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Visited SRM Teracher</CTableHeaderCell>
                              <CTableDataCell>{allPSRMTeacherPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol sm={6}>
                        <strong>SRM Teacher Priority {previousMonthYear}</strong>
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
                              <CTableDataCell>{allPSRMTeacherP1PreviousMonth}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allPSRMTeacherP1PreviousMonth}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allPSRMTeacherP2PreviousMonth}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>{allPSRMTeacherP3PreviousMonth}</CTableDataCell>
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
                        <strong>SRM Teacher Priority Chart</strong> <small>(2026)</small>
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
                                  allSRMTeacherP1January,
                                  allSRMTeacherP1February,
                                  allSRMTeacherP1March,
                                  allSRMTeacherP1April,
                                  allSRMTeacherP1May,
                                  allSRMTeacherP1June,
                                  allSRMTeacherP1July,
                                  allSRMTeacherP1August,
                                  allSRMTeacherP1September,
                                  allSRMTeacherP1October,
                                  allSRMTeacherP1November,
                                  allSRMTeacherP1December,
                                ],
                              },
                              {
                                label: 'Priority 2',
                                backgroundColor: '#35a8ceff',
                                borderColor: '#35a8ceff',
                                pointBackgroundColor: '#35a8ceff',
                                pointBorderColor: '#35a8ceff',
                                data: [
                                  allSRMTeacherP2January,
                                  allSRMTeacherP2February,
                                  allSRMTeacherP2March,
                                  allSRMTeacherP2April,
                                  allSRMTeacherP2May,
                                  allSRMTeacherP2June,
                                  allSRMTeacherP2July,
                                  allSRMTeacherP2August,
                                  allSRMTeacherP2September,
                                  allSRMTeacherP2October,
                                  allSRMTeacherP2November,
                                  allSRMTeacherP2December,
                                ],
                              },
                              {
                                label: 'Priority 3',
                                backgroundColor: '#007AA4',
                                borderColor: '#007AA4',
                                pointBackgroundColor: '#007AA4',
                                pointBorderColor: '#007AA4',
                                data: [
                                  allSRMTeacherP3January,
                                  allSRMTeacherP3February,
                                  allSRMTeacherP3March,
                                  allSRMTeacherP3April,
                                  allSRMTeacherP3May,
                                  allSRMTeacherP3June,
                                  allSRMTeacherP3July,
                                  allSRMTeacherP3August,
                                  allSRMTeacherP3September,
                                  allSRMTeacherP3October,
                                  allSRMTeacherP3November,
                                  allSRMTeacherP3December,
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
                              <CTableDataCell>{allSRMTeacherP1January}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1February}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1March}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1April}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1May}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1June}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1July}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1August}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1September}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1October}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1November}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP1December}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allSRMTeacherP2January}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2February}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2March}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2April}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2May}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2June}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2July}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2August}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2September}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2October}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2November}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP2December}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allSRMTeacherP3January}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3February}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3March}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3April}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3May}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3June}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3July}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3August}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3September}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3October}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3November}</CTableDataCell>
                              <CTableDataCell>{allSRMTeacherP3December}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allSRMTeacherP1January +
                                  allSRMTeacherP2January +
                                  allSRMTeacherP3January}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1February +
                                  allSRMTeacherP2February +
                                  allSRMTeacherP3February}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1March + allSRMTeacherP2March + allSRMTeacherP3March}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1April + allSRMTeacherP2April + allSRMTeacherP3April}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1May + allSRMTeacherP2May + allSRMTeacherP3May}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1June + allSRMTeacherP2June + allSRMTeacherP3June}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1July + allSRMTeacherP2July + allSRMTeacherP3July}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1August +
                                  allSRMTeacherP2August +
                                  allSRMTeacherP3August}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1September +
                                  allSRMTeacherP2September +
                                  allSRMTeacherP3September}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1October +
                                  allSRMTeacherP2October +
                                  allSRMTeacherP3October}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1November +
                                  allSRMTeacherP2November +
                                  allSRMTeacherP3November}
                              </CTableDataCell>
                              <CTableDataCell>
                                {allSRMTeacherP1December +
                                  allSRMTeacherP2December +
                                  allSRMTeacherP3December}
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
          <CCard style={{ width: '1310px', height: '900px' }}>
            <CCardHeader>
              <strong>All PREVAIL PSRM Data</strong>
              <small> Total Observation-{allPSRMData.length}</small>
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
                    title: 'pointTeacher',
                    field: 'pointTeacher',
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
                    title: 'totalAdmittedStudent',
                    field: 'totalAdmittedStudent',
                  },
                  {
                    title: 'totalPresentStudent',
                    field: 'totalPresentStudent',
                  },
                  {
                    title: 'note',
                    field: 'note',
                  },
                  {
                    title: 'typeOfReadingPartA',
                    field: 'typeOfReadingPartA',
                  },

                  {
                    title: 'partAInd11TeacherHelpedStudentToSeatStatus',
                    field: 'partAInd11TeacherHelpedStudentToSeatStatus',
                  },
                  {
                    title: 'partAInd11TeacherHelpedStudentToSeatNote',
                    field: 'partAInd11TeacherHelpedStudentToSeatNote',
                  },
                  {
                    title: 'partAInd12TeacherShowedABookDetailStatus',
                    field: 'partAInd12TeacherShowedABookDetailStatus',
                  },

                  {
                    title: 'partAInd12TeacherShowedABookDetailNote',
                    field: 'partAInd12TeacherShowedABookDetailNote',
                  },

                  {
                    title: 'partAInd13TeacherTeachesWordWithMeaningStatus',
                    field: 'partAInd13TeacherTeachesWordWithMeaningStatus',
                  },

                  {
                    title: 'partAInd13TeacherTeachesWordWithMeaningNote',
                    field: 'partAInd13TeacherTeachesWordWithMeaningNote',
                  },
                  {
                    title: 'partAInd21TeacherInspireToParticipateStatus',
                    field: 'partAInd21TeacherInspireToParticipateStatus',
                  },
                  {
                    title: 'partAInd21TeacherInspireToParticipateNote',
                    field: 'partAInd21TeacherInspireToParticipateNote',
                  },

                  {
                    title: 'partAInd22TeacherShowedPictureTextStatus',
                    field: 'partAInd22TeacherShowedPictureTextStatus',
                  },
                  {
                    title: 'partAInd22TeacherShowedPictureTextNote',
                    field: 'partAInd22TeacherShowedPictureTextNote',
                  },

                  {
                    title: 'partAInd23TeacherTeachesByActionStatus',
                    field: 'partAInd23TeacherTeachesByActionStatus',
                  },
                  {
                    title: 'partAInd23TeacherTeachesByActionNote',
                    field: 'partAInd23TeacherTeachesByActionNote',
                  },

                  {
                    title: 'partAInd24TeacherAskedNextStepStatus',
                    field: 'partAInd24TeacherAskedNextStepStatus',
                  },
                  {
                    title: 'partAInd24TeacherAskedNextStepNote',
                    field: 'partAInd24TeacherAskedNextStepNote',
                  },

                  {
                    title: 'partAInd25TeacherSelectedBookAsLevelStatus',
                    field: 'partAInd25TeacherSelectedBookAsLevelStatus',
                  },
                  {
                    title: 'partAInd25TeacherSelectedBookAsLevelNote',
                    field: 'partAInd25TeacherSelectedBookAsLevelNote',
                  },

                  {
                    title: 'partAInd26TeacherAskedToParticipateInReadingStatus',
                    field: 'partAInd26TeacherAskedToParticipateInReadingStatus',
                  },
                  {
                    title: 'partAInd26TeacherAskedToParticipateInReadingNote',
                    field: 'partAInd26TeacherAskedToParticipateInReadingNote',
                  },

                  {
                    title: 'partAInd31TeacherAllowToBCOStatus',
                    field: 'partAInd31TeacherAllowToBCOStatus',
                  },
                  {
                    title: 'partAInd31TeacherAllowToBCONote',
                    field: 'partAInd31TeacherAllowToBCONote',
                  },

                  {
                    title: 'partAInd32TeacherAskedQuestionForAssessmentStatus',
                    field: 'partAInd32TeacherAskedQuestionForAssessmentStatus',
                  },
                  {
                    title: 'partAInd32TeacherAskedQuestionForAssessmentNote',
                    field: 'partAInd32TeacherAskedQuestionForAssessmentNote',
                  },

                  {
                    title: 'partAInd33TeacherParticipateStudentToSRMStatus',
                    field: 'partAInd33TeacherParticipateStudentToSRMStatus',
                  },
                  {
                    title: 'partAInd33TeacherParticipateStudentToSRMNote',
                    field: 'partAInd33TeacherParticipateStudentToSRMNote',
                  },

                  {
                    title: 'partAInd34TeacherCongratulatedStudentStatus',
                    field: 'partAInd34TeacherCongratulatedStudentStatus',
                  },
                  {
                    title: 'partAInd34TeacherCongratulatedStudentNote',
                    field: 'partAInd34TeacherCongratulatedStudentNote',
                  },

                  {
                    title: 'bestPracticeIndicator1PartA',
                    field: 'bestPracticeIndicator1PartA',
                  },
                  {
                    title: 'bestPracticeIndicator2PartA',
                    field: 'bestPracticeIndicator2PartA',
                  },

                  {
                    title: 'coachingSupportIndicator1PartA',
                    field: 'coachingSupportIndicator1PartA',
                  },
                  {
                    title: 'coachingSupportIndicator2PartA',
                    field: 'coachingSupportIndicator2PartA',
                  },

                  {
                    title: 'agreedStatementTeacherPartA',
                    field: 'agreedStatementTeacherPartA',
                  },
                  {
                    title: 'agreedStatementLFPartA',
                    field: 'agreedStatementLFPartA',
                  },

                  {
                    title: 'typeOfReadingPartB',
                    field: 'typeOfReadingPartB',
                  },
                  {
                    title: 'partBInd11TeacherHelpedStudentToSeatStatus',
                    field: 'partBInd11TeacherHelpedStudentToSeatStatus',
                  },
                  {
                    title: 'partBInd11TeacherHelpedStudentToSeatNote',
                    field: 'partBInd11TeacherHelpedStudentToSeatNote',
                  },
                  {
                    title: 'partBInd12TeacherInstructSRMStatus',
                    field: 'partBInd12TeacherInstructSRMStatus',
                  },

                  {
                    title: 'partBInd12TeacherInstructSRMNote',
                    field: 'partBInd12TeacherInstructSRMNote',
                  },
                  {
                    title: 'partBInd13TeacherCheckedBookLevelStatus',
                    field: 'partBInd13TeacherCheckedBookLevelStatus',
                  },

                  {
                    title: 'partBInd13TeacherCheckedBookLevelNote',
                    field: 'partBInd13TeacherCheckedBookLevelNote',
                  },

                  {
                    title: 'partBInd21TeacherListenAndAskQuestionStatus',
                    field: 'partBInd21TeacherListenAndAskQuestionStatus',
                  },

                  {
                    title: 'partBInd21TeacherListenAndAskQuestionNote',
                    field: 'partBInd21TeacherListenAndAskQuestionNote',
                  },
                  {
                    title: 'partBInd22TeacherCheckedStudentParticipationStatus',
                    field: 'partBInd22TeacherCheckedStudentParticipationStatus',
                  },
                  {
                    title: 'partBInd22TeacherCheckedStudentParticipationNote',
                    field: 'partBInd22TeacherCheckedStudentParticipationNote',
                  },

                  {
                    title: 'partBInd31TeacherHelpedStudentToShareStatus',
                    field: 'partBInd31TeacherHelpedStudentToShareStatus',
                  },

                  {
                    title: 'partBInd31TeacherHelpedStudentToShareNote',
                    field: 'partBInd31TeacherHelpedStudentToShareNote',
                  },

                  {
                    title: 'partBInd32TeacherInspiredStudentEffortStatus',
                    field: 'partBInd32TeacherInspiredStudentEffortStatus',
                  },
                  {
                    title: 'partBInd32TeacherInspiredStudentEffortNote',
                    field: 'partBInd32TeacherInspiredStudentEffortNote',
                  },
                  {
                    title: 'partBInd33TeacherInspiredStudentForSRMStatus',
                    field: 'partBInd33TeacherInspiredStudentForSRMStatus',
                  },

                  {
                    title: 'partBInd33TeacherInspiredStudentForSRMNote',
                    field: 'partBInd33TeacherInspiredStudentForSRMNote',
                  },
                  {
                    title: 'partBInd34TeacherAllowedStudentToBCOStatus',
                    field: 'partBInd34TeacherAllowedStudentToBCOStatus',
                  },

                  {
                    title: 'partBInd34TeacherAllowedStudentToBCONote',
                    field: 'partBInd34TeacherAllowedStudentToBCONote',
                  },
                  {
                    title: 'bestPracticeIndicator1PartB',
                    field: 'bestPracticeIndicator1PartB',
                  },

                  {
                    title: 'bestPracticeIndicator2PartB',
                    field: 'bestPracticeIndicator2PartB',
                  },
                  {
                    title: 'coachingSupportIndicator1PartB',
                    field: 'coachingSupportIndicator1PartB',
                  },

                  {
                    title: 'coachingSupportIndicator2PartB',
                    field: 'coachingSupportIndicator2PartB',
                  },
                  {
                    title: 'agreedStatementTeacherPartB',
                    field: 'agreedStatementTeacherPartB',
                  },

                  {
                    title: 'agreedStatementLFPartB',
                    field: 'agreedStatementLFPartB',
                  },
                ]}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      handleRowAddPSRMClass(newData, resolve)
                    }),
                  // onRowDelete: (oldData) =>
                  //   new Promise((resolve) => {
                  //     handleRowDeletePSRMClass(oldData, resolve)
                  //   }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdateAllPSRMClass(newData, oldData, resolve)
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
                data={allPSRMData.toReversed()}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default PSRMDataDetail
