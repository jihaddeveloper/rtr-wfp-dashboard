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
  // Report data

  // Chart data
  const [teacherPrioritybyMonthChartData, setTeacherPrioritybyMonthChartData] = useState([])
  const [teacherPrioritybyUpazillaChartData, setTeacherPrioritybyUpazillaChartData] = useState([])
  const [teacherPrioritybyGradeChartData, setTeacherPrioritybyGradeChartData] = useState([])
  // Chart data

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
      // Report

      // Chart
      pushTeacherPrioritybyMonthChartData(console.log('pushTeacherPrioritybyMonthChartData called'))
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

      // Overerall result
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Report Data
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
  // Report Data

  // Chart Data
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
            <strong>Bangla Observation Report</strong>
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
                  <strong>Teacher Priority by Upazilla</strong>
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
                  <strong>Teacher Priority by Grade</strong>
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
    </CRow>
  )
}

export default BanglaClassReport
