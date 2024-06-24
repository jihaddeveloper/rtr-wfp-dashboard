import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CTable,
  CBadge,
  CButton,
  CCollapse,
} from '@coreui/react'

import {
  CChart,
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsCallout, DocsExample } from 'src/components'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import MaterialTable from 'material-table'
//Icon
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'

//Icon

import { Chart } from 'react-google-charts'

const BanglaClassReport = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  //const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBanglaClass, setAllBanglaClass] = useState([])

  // Report data
  const [reportOvserallByMonth, setReportOvserallByMonth] = useState([])
  const [reportOvserallByUpazilla, setReportOvserallByUpazilla] = useState([])
  const [reportOvserallByGrade, setReportOvserallByGrade] = useState([])

  const [reportOvserallByMonth24, setReportOvserallByMonth24] = useState([])
  const [reportOvserallByUpazilla24, setReportOvserallByUpazilla24] = useState([])
  const [reportOvserallByGrade24, setReportOvserallByGrade24] = useState([])
  // Report data

  // Chart data
  const [teacherPrioritybyMonthChartData, setTeacherPrioritybyMonthChartData] = useState([])
  const [teacherPrioritybyUpazillaChartData, setTeacherPrioritybyUpazillaChartData] = useState([])
  const [teacherPrioritybyGradeChartData, setTeacherPrioritybyGradeChartData] = useState([])

  const [teacherPrioritybyMonthChartData24, setTeacherPrioritybyMonthChartData24] = useState([])
  const [teacherPrioritybyUpazillaChartData24, setTeacherPrioritybyUpazillaChartData24] = useState(
    [],
  )
  const [teacherPrioritybyGradeChartData24, setTeacherPrioritybyGradeChartData24] = useState([])
  // Chart data

  // 2023
  // Teacher Priority Status
  // By Month
  let rating23P1 = 'Priority 1'
  let jan23P1 = 0
  let feb23P1 = 0
  let mar23P1 = 0
  let apr23P1 = 0
  let may23P1 = 0
  let jun23P1 = 0
  let jul23P1 = 0
  var aug23P1 = 0
  var sep23P1 = 0
  var oct23P1 = 0
  var nov23P1 = 0
  var dec23P1 = 0

  let rating23P2 = 'Priority 2'
  let jan23P2 = 0
  let feb23P2 = 0
  let mar23P2 = 0
  let apr23P2 = 0
  let may23P2 = 0
  let jun23P2 = 0
  let jul23P2 = 0
  var aug23P2 = 0
  var sep23P2 = 0
  var oct23P2 = 0
  var nov23P2 = 0
  var dec23P2 = 0

  let rating23P3 = 'Priority 3'
  let jan23P3 = 0
  let feb23P3 = 0
  let mar23P3 = 0
  let apr23P3 = 0
  let may23P3 = 0
  let jun23P3 = 0
  let jul23P3 = 0
  var aug23P3 = 0
  var sep23P3 = 0
  var oct23P3 = 0
  var nov23P3 = 0
  var dec23P3 = 0

  let rating23T = 'Total'
  let jan23T = 0
  let feb23T = 0
  let mar23T = 0
  let apr23T = 0
  let may23T = 0
  let jun23T = 0
  let jul23T = 0
  var aug23T = 0
  var sep23T = 0
  var oct23T = 0
  var nov23T = 0
  var dec23T = 0
  // By Month

  // By Upazilla
  let rT23P1U = 0
  let rT23P1K = 0

  let rT23P2U = 0
  let rT23P2K = 0

  let rT23P3U = 0
  let rT23P3K = 0
  // By Upazilla

  // By Grade
  let rT23P1G1 = 0
  let rT23P1G2 = 0

  let rT23P2G1 = 0
  let rT23P2G2 = 0

  let rT23P3G1 = 0
  let rT23P3G2 = 0
  // By Grade
  // 2023

  // 2024
  // Teacher Priority Status
  // By Month
  let rating24P1 = 'Priority 1'
  let jan24P1 = 0
  let feb24P1 = 0
  let mar24P1 = 0
  let apr24P1 = 0
  let may24P1 = 0
  let jun24P1 = 0
  let jul24P1 = 0
  var aug24P1 = 0
  var sep24P1 = 0
  var oct24P1 = 0
  var nov24P1 = 0
  var dec24P1 = 0

  let rating24P2 = 'Priority 2'
  let jan24P2 = 0
  let feb24P2 = 0
  let mar24P2 = 0
  let apr24P2 = 0
  let may24P2 = 0
  let jun24P2 = 0
  let jul24P2 = 0
  var aug24P2 = 0
  var sep24P2 = 0
  var oct24P2 = 0
  var nov24P2 = 0
  var dec24P2 = 0

  let rating24P3 = 'Priority 3'
  let jan24P3 = 0
  let feb24P3 = 0
  let mar24P3 = 0
  let apr24P3 = 0
  let may24P3 = 0
  let jun24P3 = 0
  let jul24P3 = 0
  var aug24P3 = 0
  var sep24P3 = 0
  var oct24P3 = 0
  var nov24P3 = 0
  var dec24P3 = 0

  let rating24T = 'Total'
  let jan24T = 0
  let feb24T = 0
  let mar24T = 0
  let apr24T = 0
  let may24T = 0
  let jun24T = 0
  let jul24T = 0
  var aug24T = 0
  var sep24T = 0
  var oct24T = 0
  var nov24T = 0
  var dec24T = 0
  // By Month

  // By Upazilla
  let rT24P1U = 0
  let rT24P1K = 0

  let rT24P2U = 0
  let rT24P2K = 0

  let rT24P3U = 0
  let rT24P3K = 0
  // By Upazilla

  // By Grade
  let rT24P1G1 = 0
  let rT24P1G2 = 0

  let rT24P2G1 = 0
  let rT24P2G2 = 0

  let rT24P3G1 = 0
  let rT24P3G2 = 0
  // By Grade
  // 2024

  // Teacher Priority Status

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')

      await getAllBanglaClass(console.log('get bangla class called'))

      // Report
      pushOverallResultByMonth()
      pushOverallResultByUpazilla()
      pushOverallResultByGrade()

      pushOverallResultByMonth24()
      pushOverallResultByUpazilla24()
      pushOverallResultByGrade24()
      // Report

      // Chart
      pushTeacherPrioritybyMonthChartData(console.log('pushTeacherPrioritybyMonthChartData called'))
      pushTeacherPrioritybyMonthChartData24()
      // Chart
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Book-checkout Data for school
  const getAllBanglaClass = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/bangla-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBanglaClass(response.data)

      // 2023
      // Overerall result
      // By Month
      // Priority 1
      jan23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'January' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      feb23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'February' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      mar23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'March' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      apr23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'April' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      may23P1 = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.month === 'May' && item.teacherStatus === 'Priority 1'
        }).length,
      )

      jun23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'June' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      jul23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'July' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      aug23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'August' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      sep23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.month === 'September' &&
            item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      oct23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'October' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      nov23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'November' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      dec23P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'December' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )
      // Priority 1

      // Priority 2
      jan23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'January' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      feb23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'February' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      mar23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'March' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      apr23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'April' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      may23P2 = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.month === 'May' && item.teacherStatus === 'Priority 2'
        }).length,
      )

      jun23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'June' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      jul23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'July' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      aug23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'August' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      sep23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.month === 'September' &&
            item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      oct23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'October' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      nov23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'November' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      dec23P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'December' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )
      // Priority 2

      // Priority 3
      jan23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'January' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      feb23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'February' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      mar23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'March' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      apr23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'April' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      may23P3 = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.month === 'May' && item.teacherStatus === 'Priority 3'
        }).length,
      )

      jun23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'June' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      jul23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'July' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      aug23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'August' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      sep23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.month === 'September' &&
            item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      oct23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'October' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      nov23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'November' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      dec23P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.month === 'December' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )
      // Priority 3
      // By Month

      // By Upazilla
      // Priority 1
      rT23P1U = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.upazilla === 'Ukhiya' &&
            item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      rT23P1K = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.upazilla === 'Kutubdia' &&
            item.teacherStatus === 'Priority 1'
          )
        }).length,
      )
      // Priority 1

      // Priority 2
      rT23P2U = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.upazilla === 'Ukhiya' &&
            item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      rT23P2K = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.upazilla === 'Kutubdia' &&
            item.teacherStatus === 'Priority 2'
          )
        }).length,
      )
      // Priority 2

      // Priority 3
      rT23P3U = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.upazilla === 'Ukhiya' &&
            item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      rT23P3K = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.upazilla === 'Kutubdia' &&
            item.teacherStatus === 'Priority 3'
          )
        }).length,
      )
      // Priority 3
      // By Upazilla

      // By Grade
      // Priority 1
      rT23P1G1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.grade === 'Grade 1' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      rT23P1G2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.grade === 'Grade 2' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )
      // Priority 1

      // Priority 2
      rT23P2G1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.grade === 'Grade 1' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      rT23P2G2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.grade === 'Grade 2' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )
      // Priority 2

      // Priority 3
      rT23P3G1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.grade === 'Grade 1' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      rT23P3G2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' && item.grade === 'Grade 2' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )
      // Priority 3
      // By Grade
      // 2023

      // 2024
      // Overerall result
      // By Month
      // Priority 1
      jan24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'January' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      feb24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'February' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      mar24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'March' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      apr24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'April' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      may24P1 = parseInt(
        response.data.filter((item) => {
          return item.year === '2024' && item.month === 'May' && item.teacherStatus === 'Priority 1'
        }).length,
      )

      jun24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'June' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      jul24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'July' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      aug24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'August' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      sep24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.month === 'September' &&
            item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      oct24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'October' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      nov24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'November' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      dec24P1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'December' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )
      // Priority 1

      // Priority 2
      jan24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'January' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      feb24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'February' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      mar24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'March' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      apr24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'April' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      may24P2 = parseInt(
        response.data.filter((item) => {
          return item.year === '2024' && item.month === 'May' && item.teacherStatus === 'Priority 2'
        }).length,
      )

      jun24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'June' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      jul24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'July' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      aug24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'August' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      sep24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.month === 'September' &&
            item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      oct24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'October' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      nov24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'November' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      dec24P2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'December' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )
      // Priority 2

      // Priority 3
      jan24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'January' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      feb24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'February' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      mar24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'March' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      apr24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'April' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      may24P3 = parseInt(
        response.data.filter((item) => {
          return item.year === '2024' && item.month === 'May' && item.teacherStatus === 'Priority 3'
        }).length,
      )

      jun24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'June' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      jul24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'July' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      aug24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'August' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      sep24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.month === 'September' &&
            item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      oct24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'October' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      nov24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'November' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      dec24P3 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.month === 'December' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )
      // Priority 3
      // By Month

      // By Upazilla
      // Priority 1
      rT24P1U = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.upazilla === 'Ukhiya' &&
            item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      rT24P1K = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.upazilla === 'Kutubdia' &&
            item.teacherStatus === 'Priority 1'
          )
        }).length,
      )
      // Priority 1

      // Priority 2
      rT24P2U = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.upazilla === 'Ukhiya' &&
            item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      rT24P2K = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.upazilla === 'Kutubdia' &&
            item.teacherStatus === 'Priority 2'
          )
        }).length,
      )
      // Priority 2

      // Priority 3
      rT24P3U = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.upazilla === 'Ukhiya' &&
            item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      rT24P3K = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' &&
            item.upazilla === 'Kutubdia' &&
            item.teacherStatus === 'Priority 3'
          )
        }).length,
      )
      // Priority 3
      // By Upazilla

      // By Grade
      // Priority 1
      rT24P1G1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.grade === 'Grade 1' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )

      rT24P1G2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.grade === 'Grade 2' && item.teacherStatus === 'Priority 1'
          )
        }).length,
      )
      // Priority 1

      // Priority 2
      rT24P2G1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.grade === 'Grade 1' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )

      rT24P2G2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.grade === 'Grade 2' && item.teacherStatus === 'Priority 2'
          )
        }).length,
      )
      // Priority 2

      // Priority 3
      rT24P3G1 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.grade === 'Grade 1' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )

      rT24P3G2 = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2024' && item.grade === 'Grade 2' && item.teacherStatus === 'Priority 3'
          )
        }).length,
      )
      // Priority 3
      // By Grade
      // 2024

      // Overerall result
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Report Data
  // 2023
  // By Month
  const pushOverallResultByMonth = () => {
    const reportObjectOverallResultByMonth = [
      {
        rating: rating23P1,
        jan: jan23P1,
        feb: feb23P1,
        mar: mar23P1,
        apr: apr23P1,
        may: may23P1,
        jun: jun23P1,
        jul: jul23P1,
        aug: aug23P1,
        sep: sep23P1,
        oct: oct23P1,
        nov: nov23P1,
        dec: dec23P1,
        tot:
          jan23P1 +
          feb23P1 +
          mar23P1 +
          apr23P1 +
          may23P1 +
          jun23P1 +
          jul23P1 +
          aug23P1 +
          sep23P1 +
          oct23P1 +
          nov23P1 +
          dec23P1,
      },
      {
        rating: rating23P2,
        jan: jan23P2,
        feb: feb23P2,
        mar: mar23P2,
        apr: apr23P2,
        may: may23P2,
        jun: jun23P2,
        jul: jul23P2,
        aug: aug23P2,
        sep: sep23P2,
        oct: oct23P2,
        nov: nov23P2,
        dec: dec23P2,
        tot:
          jan23P2 +
          feb23P2 +
          mar23P2 +
          apr23P2 +
          may23P2 +
          jun23P2 +
          jul23P2 +
          aug23P2 +
          sep23P2 +
          oct23P2 +
          nov23P2 +
          dec23P2,
      },
      {
        rating: rating23P3,
        jan: jan23P3,
        feb: feb23P3,
        mar: mar23P3,
        apr: apr23P3,
        may: may23P3,
        jun: jun23P3,
        jul: jul23P3,
        aug: aug23P3,
        sep: sep23P3,
        oct: oct23P3,
        nov: nov23P3,
        dec: dec23P3,
        tot:
          jan23P3 +
          feb23P3 +
          mar23P3 +
          apr23P3 +
          may23P3 +
          jun23P3 +
          jul23P3 +
          aug23P3 +
          sep23P3 +
          oct23P3 +
          nov23P3 +
          dec23P3,
      },
      {
        rating: rating23T,
        jan: jan23P1 + jan23P2 + jan23P3,
        feb: feb23P1 + feb23P2 + feb23P3,
        mar: mar23P1 + mar23P2 + mar23P3,
        apr: apr23P1 + apr23P2 + apr23P3,
        may: may23P1 + may23P2 + may23P3,
        jun: jun23P1 + jun23P2 + jun23P3,
        jul: jul23P1 + jul23P2 + jul23P3,
        aug: aug23P1 + aug23P2 + aug23P3,
        sep: sep23P1 + sep23P2 + sep23P3,
        oct: oct23P1 + oct23P2 + oct23P3,
        nov: nov23P1 + nov23P2 + nov23P3,
        dec: dec23P1 + dec23P2 + dec23P3,
        tot:
          jan23P1 +
          feb23P1 +
          mar23P1 +
          apr23P1 +
          may23P1 +
          jun23P1 +
          jul23P1 +
          aug23P1 +
          sep23P1 +
          oct23P1 +
          nov23P1 +
          dec23P1 +
          jan23P2 +
          feb23P2 +
          mar23P2 +
          apr23P2 +
          may23P2 +
          jun23P2 +
          jul23P2 +
          aug23P2 +
          sep23P2 +
          oct23P2 +
          nov23P2 +
          dec23P2 +
          jan23P3 +
          feb23P3 +
          mar23P3 +
          apr23P3 +
          may23P3 +
          jun23P3 +
          jul23P3 +
          aug23P3 +
          sep23P3 +
          oct23P3 +
          nov23P3 +
          dec23P3,
      },
    ]
    console.log('reportObjectOverallResultByMonth :', reportObjectOverallResultByMonth)
    setReportOvserallByMonth(reportObjectOverallResultByMonth)
  }
  // By Month

  // By Upazilla
  const pushOverallResultByUpazilla = () => {
    const reportObjectOverallResultByUpazilla = [
      {
        rating: rating23P1,
        ukhiya: rT23P1U,
        kutubdia: rT23P1K,
        cfo: rT23P1U + rT23P1K,
      },
      {
        rating: rating23P2,
        ukhiya: rT23P2U,
        kutubdia: rT23P2K,
        cfo: rT23P2U + rT23P2K,
      },
      {
        rating: rating23P3,
        ukhiya: rT23P3U,
        kutubdia: rT23P3K,
        cfo: rT23P3U + rT23P3K,
      },
      {
        rating: rating23T,
        ukhiya: rT23P1U + rT23P2U + rT23P3U,
        kutubdia: rT23P1K + rT23P2K + rT23P3K,
        cfo: rT23P1U + rT23P1K + rT23P2U + rT23P2K + rT23P3U + rT23P3K,
      },
    ]
    console.log('reportObjectOverallResultByUpazilla :', reportObjectOverallResultByUpazilla)
    setReportOvserallByUpazilla(reportObjectOverallResultByUpazilla)
  }
  // By Upazilla

  // By Grade
  const pushOverallResultByGrade = () => {
    const reportObjectOverallResultByGrade = [
      {
        rating: rating23P1,
        grade1: rT23P1G1,
        grade2: rT23P1G2,
        cfo: rT23P1G1 + rT23P1G2,
      },
      {
        rating: rating23P2,
        grade1: rT23P2G1,
        grade2: rT23P2G2,
        cfo: rT23P2G1 + rT23P2G2,
      },
      {
        rating: rating23P3,
        grade1: rT23P3G1,
        grade2: rT23P3G2,
        cfo: rT23P3G1 + rT23P3G2,
      },
      {
        rating: rating23T,
        grade1: rT23P1G1 + rT23P2G1 + rT23P3G1,
        grade2: rT23P1G2 + rT23P2G2 + rT23P3G2,
        cfo: rT23P1G1 + rT23P2G1 + rT23P3G1 + rT23P1G2 + rT23P2G2 + rT23P3G2,
      },
    ]
    console.log('reportObjectOverallResultByGrade :', reportObjectOverallResultByGrade)
    setReportOvserallByGrade(reportObjectOverallResultByGrade)
  }
  // By Grade
  // 2023

  // 2024
  // By Month
  const pushOverallResultByMonth24 = () => {
    const reportObjectOverallResultByMonth24 = [
      {
        rating: rating24P1,
        jan: jan24P1,
        feb: feb24P1,
        mar: mar24P1,
        apr: apr24P1,
        may: may24P1,
        jun: jun24P1,
        jul: jul24P1,
        aug: aug24P1,
        sep: sep24P1,
        oct: oct24P1,
        nov: nov24P1,
        dec: dec24P1,
        tot:
          jan24P1 +
          feb24P1 +
          mar24P1 +
          apr24P1 +
          may24P1 +
          jun24P1 +
          jul24P1 +
          aug24P1 +
          sep24P1 +
          oct24P1 +
          nov24P1 +
          dec24P1,
      },
      {
        rating: rating24P2,
        jan: jan24P2,
        feb: feb24P2,
        mar: mar24P2,
        apr: apr24P2,
        may: may24P2,
        jun: jun24P2,
        jul: jul24P2,
        aug: aug24P2,
        sep: sep24P2,
        oct: oct24P2,
        nov: nov24P2,
        dec: dec24P2,
        tot:
          jan24P2 +
          feb24P2 +
          mar24P2 +
          apr24P2 +
          may24P2 +
          jun24P2 +
          jul24P2 +
          aug24P2 +
          sep24P2 +
          oct24P2 +
          nov24P2 +
          dec24P2,
      },
      {
        rating: rating24P3,
        jan: jan24P3,
        feb: feb24P3,
        mar: mar24P3,
        apr: apr24P3,
        may: may24P3,
        jun: jun24P3,
        jul: jul24P3,
        aug: aug24P3,
        sep: sep24P3,
        oct: oct24P3,
        nov: nov24P3,
        dec: dec24P3,
        tot:
          jan24P3 +
          feb24P3 +
          mar24P3 +
          apr24P3 +
          may24P3 +
          jun24P3 +
          jul24P3 +
          aug24P3 +
          sep24P3 +
          oct24P3 +
          nov24P3 +
          dec24P3,
      },
      {
        rating: rating24T,
        jan: jan24P1 + jan24P2 + jan24P3,
        feb: feb24P1 + feb24P2 + feb24P3,
        mar: mar24P1 + mar24P2 + mar24P3,
        apr: apr24P1 + apr24P2 + apr24P3,
        may: may24P1 + may24P2 + may24P3,
        jun: jun24P1 + jun24P2 + jun24P3,
        jul: jul24P1 + jul24P2 + jul24P3,
        aug: aug24P1 + aug24P2 + aug24P3,
        sep: sep24P1 + sep24P2 + sep24P3,
        oct: oct24P1 + oct24P2 + oct24P3,
        nov: nov24P1 + nov24P2 + nov24P3,
        dec: dec24P1 + dec24P2 + dec24P3,
        tot:
          jan24P1 +
          feb24P1 +
          mar24P1 +
          apr24P1 +
          may24P1 +
          jun24P1 +
          jul24P1 +
          aug24P1 +
          sep24P1 +
          oct24P1 +
          nov24P1 +
          dec24P1 +
          jan24P2 +
          feb24P2 +
          mar24P2 +
          apr24P2 +
          may24P2 +
          jun24P2 +
          jul24P2 +
          aug24P2 +
          sep24P2 +
          oct24P2 +
          nov24P2 +
          dec24P2 +
          jan24P3 +
          feb24P3 +
          mar24P3 +
          apr24P3 +
          may24P3 +
          jun24P3 +
          jul24P3 +
          aug24P3 +
          sep24P3 +
          oct24P3 +
          nov24P3 +
          dec24P3,
      },
    ]
    console.log('reportObjectOverallResultByMonth24 :', reportObjectOverallResultByMonth24)
    setReportOvserallByMonth24(reportObjectOverallResultByMonth24)
  }
  // By Month

  // By Upazilla
  const pushOverallResultByUpazilla24 = () => {
    const reportObjectOverallResultByUpazilla24 = [
      {
        rating: rating24P1,
        ukhiya: rT24P1U,
        kutubdia: rT24P1K,
        cfo: rT24P1U + rT24P1K,
      },
      {
        rating: rating24P2,
        ukhiya: rT24P2U,
        kutubdia: rT24P2K,
        cfo: rT24P2U + rT24P2K,
      },
      {
        rating: rating24P3,
        ukhiya: rT24P3U,
        kutubdia: rT24P3K,
        cfo: rT24P3U + rT24P3K,
      },
      {
        rating: rating24T,
        ukhiya: rT24P1U + rT24P2U + rT24P3U,
        kutubdia: rT24P1K + rT24P2K + rT24P3K,
        cfo: rT24P1U + rT24P1K + rT24P2U + rT24P2K + rT24P3U + rT24P3K,
      },
    ]
    console.log('reportObjectOverallResultByUpazilla24 :', reportObjectOverallResultByUpazilla24)
    setReportOvserallByUpazilla24(reportObjectOverallResultByUpazilla24)
  }
  // By Upazilla

  // By Grade
  const pushOverallResultByGrade24 = () => {
    const reportObjectOverallResultByGrade24 = [
      {
        rating: rating24P1,
        grade1: rT24P1G1,
        grade2: rT24P1G2,
        cfo: rT24P1G1 + rT24P1G2,
      },
      {
        rating: rating24P2,
        grade1: rT24P2G1,
        grade2: rT24P2G2,
        cfo: rT24P2G1 + rT24P2G2,
      },
      {
        rating: rating24P3,
        grade1: rT24P3G1,
        grade2: rT24P3G2,
        cfo: rT24P3G1 + rT24P3G2,
      },
      {
        rating: rating24T,
        grade1: rT24P1G1 + rT24P2G1 + rT24P3G1,
        grade2: rT24P1G2 + rT24P2G2 + rT24P3G2,
        cfo: rT24P1G1 + rT24P2G1 + rT24P3G1 + rT24P1G2 + rT24P2G2 + rT24P3G2,
      },
    ]
    console.log('reportObjectOverallResultByGrade24 :', reportObjectOverallResultByGrade24)
    setReportOvserallByGrade24(reportObjectOverallResultByGrade24)
  }
  // By Grade
  // 2024
  // Report Data

  // Chart Data
  // 2023
  // Teacher Priority by Month
  const pushTeacherPrioritybyMonthChartData = () => {
    setTeacherPrioritybyMonthChartData({
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
          backgroundColor: '#ff3333',
          borderColor: '#ff3333',
          pointBackgroundColor: '#ff3333',
          pointBorderColor: '#fff',
          data: [
            jan23P1,
            feb23P1,
            mar23P1,
            apr23P1,
            may23P1,
            jun23P1,
            jul23P1,
            aug23P1,
            sep23P1,
            oct23P1,
            nov23P1,
            dec23P1,
          ],
        },
        {
          label: 'Priority 2',
          backgroundColor: '#f5e942',
          borderColor: '#f5e942',
          pointBackgroundColor: '#f5e942',
          pointBorderColor: '#fff',
          data: [
            jan23P2,
            feb23P2,
            mar23P2,
            apr23P2,
            may23P2,
            jun23P2,
            jul23P2,
            aug23P2,
            sep23P2,
            oct23P2,
            nov23P2,
            dec23P2,
          ],
        },
        {
          label: 'Priority 3',
          backgroundColor: '#03fc6f',
          borderColor: '#03fc6f',
          pointBackgroundColor: '#03fc6f',
          pointBorderColor: '#fff',
          data: [
            jan23P3,
            feb23P3,
            mar23P3,
            apr23P3,
            may23P3,
            jun23P3,
            jul23P3,
            aug23P3,
            sep23P3,
            oct23P3,
            nov23P3,
            dec23P3,
          ],
        },
      ],
    })
  }
  // Teacher Priority by Month

  // Teacher Priority by Upazilla
  const pushTeacherPrioritybyUpazillaChartData = () => {
    setTeacherPrioritybyUpazillaChartData({
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
          backgroundColor: '#ff3333',
          borderColor: '#ff3333',
          pointBackgroundColor: '#ff3333',
          pointBorderColor: '#fff',
          data: [
            jan23P1,
            feb23P1,
            mar23P1,
            apr23P1,
            may23P1,
            jun23P1,
            jul23P1,
            aug23P1,
            sep23P1,
            oct23P1,
            nov23P1,
            dec23P1,
          ],
        },
        {
          label: 'Priority 2',
          backgroundColor: '#f5e942',
          borderColor: '#f5e942',
          pointBackgroundColor: '#f5e942',
          pointBorderColor: '#fff',
          data: [
            jan23P2,
            feb23P2,
            mar23P2,
            apr23P2,
            may23P2,
            jun23P2,
            jul23P2,
            aug23P2,
            sep23P2,
            oct23P2,
            nov23P2,
            dec23P2,
          ],
        },
        {
          label: 'Priority 3',
          backgroundColor: '#03fc6f',
          borderColor: '#03fc6f',
          pointBackgroundColor: '#03fc6f',
          pointBorderColor: '#fff',
          data: [
            jan23P3,
            feb23P3,
            mar23P3,
            apr23P3,
            may23P3,
            jun23P3,
            jul23P3,
            aug23P3,
            sep23P3,
            oct23P3,
            nov23P3,
            dec23P3,
          ],
        },
      ],
    })
  }
  // Teacher Priority by Upazilla

  // Teacher Priority by Grade
  // Teacher Priority by Grade
  // 2023
  // Chart Data

  // Chart Data
  // 2024
  // Teacher Priority by Month
  const pushTeacherPrioritybyMonthChartData24 = () => {
    setTeacherPrioritybyMonthChartData24({
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
          backgroundColor: '#ff3333',
          borderColor: '#ff3333',
          pointBackgroundColor: '#ff3333',
          pointBorderColor: '#fff',
          data: [
            jan24P1,
            feb24P1,
            mar24P1,
            apr24P1,
            may24P1,
            jun24P1,
            jul24P1,
            aug24P1,
            sep24P1,
            oct24P1,
            nov24P1,
            dec24P1,
          ],
        },
        {
          label: 'Priority 2',
          backgroundColor: '#f5e942',
          borderColor: '#f5e942',
          pointBackgroundColor: '#f5e942',
          pointBorderColor: '#fff',
          data: [
            jan24P2,
            feb24P2,
            mar24P2,
            apr24P2,
            may24P2,
            jun24P2,
            jul24P2,
            aug24P2,
            sep24P2,
            oct24P2,
            nov24P2,
            dec24P2,
          ],
        },
        {
          label: 'Priority 3',
          backgroundColor: '#03fc6f',
          borderColor: '#03fc6f',
          pointBackgroundColor: '#03fc6f',
          pointBorderColor: '#fff',
          data: [
            jan24P3,
            feb24P3,
            mar24P3,
            apr24P3,
            may24P3,
            jun24P3,
            jul24P3,
            aug24P3,
            sep24P3,
            oct24P3,
            nov24P3,
            dec24P3,
          ],
        },
      ],
    })
  }
  // Teacher Priority by Month

  // Teacher Priority by Upazilla
  const pushTeacherPrioritybyUpazillaChartData24 = () => {
    setTeacherPrioritybyUpazillaChartData24({
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
          backgroundColor: '#ff3333',
          borderColor: '#ff3333',
          pointBackgroundColor: '#ff3333',
          pointBorderColor: '#fff',
          data: [
            jan24P1,
            feb24P1,
            mar24P1,
            apr24P1,
            may24P1,
            jun24P1,
            jul24P1,
            aug24P1,
            sep24P1,
            oct24P1,
            nov24P1,
            dec24P1,
          ],
        },
        {
          label: 'Priority 2',
          backgroundColor: '#f5e942',
          borderColor: '#f5e942',
          pointBackgroundColor: '#f5e942',
          pointBorderColor: '#fff',
          data: [
            jan24P2,
            feb24P2,
            mar24P2,
            apr24P2,
            may24P2,
            jun24P2,
            jul24P2,
            aug24P2,
            sep24P2,
            oct24P2,
            nov24P2,
            dec24P2,
          ],
        },
        {
          label: 'Priority 3',
          backgroundColor: '#03fc6f',
          borderColor: '#03fc6f',
          pointBackgroundColor: '#03fc6f',
          pointBorderColor: '#fff',
          data: [
            jan24P3,
            feb24P3,
            mar24P3,
            apr24P3,
            may24P3,
            jun24P3,
            jul24P3,
            aug24P3,
            sep24P3,
            oct24P3,
            nov24P3,
            dec24P3,
          ],
        },
      ],
    })
  }
  // Teacher Priority by Upazilla

  // Teacher Priority by Grade
  // Teacher Priority by Grade
  // 2024
  // Chart Data

  // Chart
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
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bangla Observation Report 2023</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Teacher Priority by Month 2023</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Teacher Priority'}
                    columns={[
                      { title: 'Rating', field: 'rating' },
                      { title: 'January', field: 'jan' },
                      { title: 'February', field: 'feb' },
                      { title: 'March', field: 'mar' },
                      { title: 'April', field: 'apr' },
                      { title: 'May', field: 'may' },
                      { title: 'June', field: 'jun' },
                      { title: 'July', field: 'jul' },
                      { title: 'August', field: 'aug' },
                      { title: 'September', field: 'sep' },
                      { title: 'October', field: 'oct' },
                      { title: 'November', field: 'nov' },
                      { title: 'December', field: 'dec' },
                      { title: 'Total', field: 'tot' },
                    ]}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      grouping: false,
                      sorting: false,
                      search: false,
                      paging: false,
                      pageSize: 12,
                      pageSizeOptions: [12, 24, 36],
                      maxBodyHeight: '550px',
                      headerStyle: {
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#bcceeb',
                        fontWeight: 'bold',
                        width: 15,
                        textAlign: 'left',
                        color: '#884fc9',
                        borderRight: '1px solid #eee',
                        borderStyle: 'solid',
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={reportOvserallByMonth}
                  />
                </CAccordionBody>

                <CAccordionBody>
                  <CCardBody>
                    <CChart
                      type="line"
                      data={teacherPrioritybyMonthChartData}
                      labels="months"
                      width="400px"
                      height="400px"
                      options={{ maintainAspectRatio: false }}
                    />
                  </CCardBody>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Teacher Priority by Upazilla 2023</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Teacher Priority by Upazilla'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Rating', field: 'rating' },
                      { title: 'Ukhiya', field: 'ukhiya' },
                      { title: 'Kutubdia', field: 'kutubdia' },
                      { title: 'CFO', field: 'cfo' },
                    ]}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      grouping: false,
                      sorting: false,
                      search: false,
                      paging: false,
                      pageSize: 12,
                      pageSizeOptions: [12, 24, 36],
                      maxBodyHeight: '550px',
                      headerStyle: {
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#bcceeb',
                        fontWeight: 'bold',
                        width: 15,
                        textAlign: 'left',
                        color: '#884fc9',
                        borderRight: '1px solid #eee',
                        borderStyle: 'solid',
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={reportOvserallByUpazilla}
                  />
                </CAccordionBody>

                <CAccordionBody>
                  <CCardBody>
                    <CChart
                      type="line"
                      data={''}
                      labels="months"
                      width="400px"
                      height="400px"
                      options={{ maintainAspectRatio: false }}
                    />
                  </CCardBody>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Teacher Priority by Grade 2023</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Teacher Priority by Grade'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Rating', field: 'rating' },
                      { title: 'Grade 1', field: 'grade1' },
                      { title: 'Grade 2', field: 'grade2' },
                      { title: 'CFO', field: 'cfo' },
                    ]}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      grouping: false,
                      sorting: false,
                      search: false,
                      paging: false,
                      pageSize: 12,
                      pageSizeOptions: [12, 24, 36],
                      maxBodyHeight: '550px',
                      headerStyle: {
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#bcceeb',
                        fontWeight: 'bold',
                        width: 15,
                        textAlign: 'left',
                        color: '#884fc9',
                        borderRight: '1px solid #eee',
                        borderStyle: 'solid',
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={reportOvserallByGrade}
                  />
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bangla Observation Report 2024</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Teacher Priority by Month 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Teacher Priority'}
                    columns={[
                      { title: 'Rating', field: 'rating' },
                      { title: 'January', field: 'jan' },
                      { title: 'February', field: 'feb' },
                      { title: 'March', field: 'mar' },
                      { title: 'April', field: 'apr' },
                      { title: 'May', field: 'may' },
                      { title: 'June', field: 'jun' },
                      { title: 'July', field: 'jul' },
                      { title: 'August', field: 'aug' },
                      { title: 'September', field: 'sep' },
                      { title: 'October', field: 'oct' },
                      { title: 'November', field: 'nov' },
                      { title: 'December', field: 'dec' },
                      { title: 'Total', field: 'tot' },
                    ]}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      grouping: false,
                      sorting: false,
                      search: false,
                      paging: false,
                      pageSize: 12,
                      pageSizeOptions: [12, 24, 36],
                      maxBodyHeight: '550px',
                      headerStyle: {
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#bcceeb',
                        fontWeight: 'bold',
                        width: 15,
                        textAlign: 'left',
                        color: '#884fc9',
                        borderRight: '1px solid #eee',
                        borderStyle: 'solid',
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={reportOvserallByMonth24}
                  />
                </CAccordionBody>

                <CAccordionBody>
                  <CCardBody>
                    <CChart
                      type="line"
                      data={teacherPrioritybyMonthChartData24}
                      labels="months"
                      width="400px"
                      height="400px"
                      options={{ maintainAspectRatio: false }}
                    />
                  </CCardBody>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Teacher Priority by Upazilla 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Teacher Priority by Upazilla'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Rating', field: 'rating' },
                      { title: 'Ukhiya', field: 'ukhiya' },
                      { title: 'Kutubdia', field: 'kutubdia' },
                      { title: 'CFO', field: 'cfo' },
                    ]}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      grouping: false,
                      sorting: false,
                      search: false,
                      paging: false,
                      pageSize: 12,
                      pageSizeOptions: [12, 24, 36],
                      maxBodyHeight: '550px',
                      headerStyle: {
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#bcceeb',
                        fontWeight: 'bold',
                        width: 15,
                        textAlign: 'left',
                        color: '#884fc9',
                        borderRight: '1px solid #eee',
                        borderStyle: 'solid',
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={reportOvserallByUpazilla24}
                  />
                </CAccordionBody>

                <CAccordionBody>
                  <CCardBody>
                    <CChart
                      type="line"
                      data={''}
                      labels="months"
                      width="400px"
                      height="400px"
                      options={{ maintainAspectRatio: false }}
                    />
                  </CCardBody>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Teacher Priority by Grade 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Teacher Priority by Grade'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Rating', field: 'rating' },
                      { title: 'Grade 1', field: 'grade1' },
                      { title: 'Grade 2', field: 'grade2' },
                      { title: 'CFO', field: 'cfo' },
                    ]}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      grouping: false,
                      sorting: false,
                      search: false,
                      paging: false,
                      pageSize: 12,
                      pageSizeOptions: [12, 24, 36],
                      maxBodyHeight: '550px',
                      headerStyle: {
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#bcceeb',
                        fontWeight: 'bold',
                        width: 15,
                        textAlign: 'left',
                        color: '#884fc9',
                        borderRight: '1px solid #eee',
                        borderStyle: 'solid',
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={reportOvserallByGrade24}
                  />
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BanglaClassReport
