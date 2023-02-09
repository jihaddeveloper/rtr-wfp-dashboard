import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
import idLocale from 'date-fns/locale/id'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

const BCOSchoolQuarterly = () => {
  const [isLoading, setIsLoading] = useState(true)

  //Selected Date
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Report Data
  const [reportData, setReportData] = useState([])
  const [reportDataQ1, setReportDataQ1] = useState([])
  const [reportDataQ2, setReportDataQ2] = useState([])
  const [reportDataQ3, setReportDataQ3] = useState([])
  const [reportDataQ4, setReportDataQ4] = useState([])

  const [allBCOData, setAllBCOData] = useState([])

  // Report Data Ukhiya
  const [ukhiyaReportData, setUkhiyaReportData] = useState([])
  // Report Data Kutubdia
  const [kutubdiaReportData, setKutubdiaReportData] = useState([])

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonth = current.toLocaleString('default', { month: 'long' })
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })

  // Annual
  // Ukhiya Data
  let uTotalStudent = 0
  let uTotalBookCheckout = 0
  let uTotalBookCheckin = 0
  let uNoBCOPerStudent = 0
  let uNoStudentBCO = 0
  let uPercentStudentBCO = 0
  let uNoStudentBCI = 0
  let uPercentStudentBCI = 0
  let uNoGirlBCO = 0
  let uPercentGirlBCO = 0
  let uNoBoyBCO = 0
  let uPercentBoyBCO = 0
  let uNoSchoolBCO = 0
  let uNoSchoolZeroBCO = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudent = 0
  let kTotalBookCheckout = 0
  let kTotalBookCheckin = 0
  let kNoBCOPerStudent = 0
  let kNoStudentBCO = 0
  let kPercentStudentBCO = 0
  let kNoStudentBCI = 0
  let kPercentStudentBCI = 0
  let kNoGirlBCO = 0
  let kPercentGirlBCO = 0
  let kNoBoyBCO = 0
  let kPercentBoyBCO = 0
  let kNoSchoolBCO = 0
  let kNoSchoolZeroBCO = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudent = 0
  let cfoTotalBookCheckout = 0
  let cfoTotalBookCheckin = 0
  let cfoNoBCOPerStudent = 0
  let cfoNoStudentBCO = 0
  let cfoPercentStudentBCO = 0
  let cfoNoStudentBCI = 0
  let cfoPercentStudentBCI = 0
  let cfoNoGirlBCO = 0
  let cfoPercentGirlBCO = 0
  let cfoNoBoyBCO = 0
  let cfoPercentBoyBCO = 0
  let cfoNoSchoolBCO = 0
  let cfoNoSchoolZeroBCO = 0
  // CFO Data
  // Annual

  // Quarter 2
  // Ukhiya Data
  let uTotalStudentQ2 = 0
  let uTotalBookCheckoutQ2 = 0
  let uTotalBookCheckinQ2 = 0
  let uNoBCOPerStudentQ2 = 0
  let uNoStudentBCOQ2 = 0
  let uPercentStudentBCOQ2 = 0
  let uNoStudentBCIQ2 = 0
  let uPercentStudentBCIQ2 = 0
  let uNoGirlBCOQ2 = 0
  let uPercentGirlBCOQ2 = 0
  let uNoBoyBCOQ2 = 0
  let uPercentBoyBCOQ2 = 0
  let uNoSchoolBCOQ2 = 0
  let uNoSchoolZeroBCOQ2 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentQ2 = 0
  let kTotalBookCheckoutQ2 = 0
  let kTotalBookCheckinQ2 = 0
  let kNoBCOPerStudentQ2 = 0
  let kNoStudentBCOQ2 = 0
  let kPercentStudentBCOQ2 = 0
  let kNoStudentBCIQ2 = 0
  let kPercentStudentBCIQ2 = 0
  let kNoGirlBCOQ2 = 0
  let kPercentGirlBCOQ2 = 0
  let kNoBoyBCOQ2 = 0
  let kPercentBoyBCOQ2 = 0
  let kNoSchoolBCOQ2 = 0
  let kNoSchoolZeroBCOQ2 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentQ2 = 0
  let cfoTotalBookCheckoutQ2 = 0
  let cfoTotalBookCheckinQ2 = 0
  let cfoNoBCOPerStudentQ2 = 0
  let cfoNoStudentBCOQ2 = 0
  let cfoPercentStudentBCOQ2 = 0
  let cfoNoStudentBCIQ2 = 0
  let cfoPercentStudentBCIQ2 = 0
  let cfoNoGirlBCOQ2 = 0
  let cfoPercentGirlBCOQ2 = 0
  let cfoNoBoyBCOQ2 = 0
  let cfoPercentBoyBCOQ2 = 0
  let cfoNoSchoolBCOQ2 = 0
  let cfoNoSchoolZeroBCOQ2 = 0
  // CFO Data
  // Quarter 2

  // Quarter 3
  // Ukhiya Data
  let uTotalStudentQ3 = 0
  let uTotalBookCheckoutQ3 = 0
  let uTotalBookCheckinQ3 = 0
  let uNoBCOPerStudentQ3 = 0
  let uNoStudentBCOQ3 = 0
  let uPercentStudentBCOQ3 = 0
  let uNoStudentBCIQ3 = 0
  let uPercentStudentBCIQ3 = 0
  let uNoGirlBCOQ3 = 0
  let uPercentGirlBCOQ3 = 0
  let uNoBoyBCOQ3 = 0
  let uPercentBoyBCOQ3 = 0
  let uNoSchoolBCOQ3 = 0
  let uNoSchoolZeroBCOQ3 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentQ3 = 0
  let kTotalBookCheckoutQ3 = 0
  let kTotalBookCheckinQ3 = 0
  let kNoBCOPerStudentQ3 = 0
  let kNoStudentBCOQ3 = 0
  let kPercentStudentBCOQ3 = 0
  let kNoStudentBCIQ3 = 0
  let kPercentStudentBCIQ3 = 0
  let kNoGirlBCOQ3 = 0
  let kPercentGirlBCOQ3 = 0
  let kNoBoyBCOQ3 = 0
  let kPercentBoyBCOQ3 = 0
  let kNoSchoolBCOQ3 = 0
  let kNoSchoolZeroBCOQ3 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentQ3 = 0
  let cfoTotalBookCheckoutQ3 = 0
  let cfoTotalBookCheckinQ3 = 0
  let cfoNoBCOPerStudentQ3 = 0
  let cfoNoStudentBCOQ3 = 0
  let cfoPercentStudentBCOQ3 = 0
  let cfoNoStudentBCIQ3 = 0
  let cfoPercentStudentBCIQ3 = 0
  let cfoNoGirlBCOQ3 = 0
  let cfoPercentGirlBCOQ3 = 0
  let cfoNoBoyBCOQ3 = 0
  let cfoPercentBoyBCOQ3 = 0
  let cfoNoSchoolBCOQ3 = 0
  let cfoNoSchoolZeroBCOQ3 = 0
  // CFO Data
  // Quarter 3

  // Quarter 4
  // Ukhiya Data
  let uTotalStudentQ4 = 0
  let uTotalBookCheckoutQ4 = 0
  let uTotalBookCheckinQ4 = 0
  let uNoBCOPerStudentQ4 = 0
  let uNoStudentBCOQ4 = 0
  let uPercentStudentBCOQ4 = 0
  let uNoStudentBCIQ4 = 0
  let uPercentStudentBCIQ4 = 0
  let uNoGirlBCOQ4 = 0
  let uPercentGirlBCOQ4 = 0
  let uNoBoyBCOQ4 = 0
  let uPercentBoyBCOQ4 = 0
  let uNoSchoolBCOQ4 = 0
  let uNoSchoolZeroBCOQ4 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentQ4 = 0
  let kTotalBookCheckoutQ4 = 0
  let kTotalBookCheckinQ4 = 0
  let kNoBCOPerStudentQ4 = 0
  let kNoStudentBCOQ4 = 0
  let kPercentStudentBCOQ4 = 0
  let kNoStudentBCIQ4 = 0
  let kPercentStudentBCIQ4 = 0
  let kNoGirlBCOQ4 = 0
  let kPercentGirlBCOQ4 = 0
  let kNoBoyBCOQ4 = 0
  let kPercentBoyBCOQ4 = 0
  let kNoSchoolBCOQ4 = 0
  let kNoSchoolZeroBCOQ4 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentQ4 = 0
  let cfoTotalBookCheckoutQ4 = 0
  let cfoTotalBookCheckinQ4 = 0
  let cfoNoBCOPerStudentQ4 = 0
  let cfoNoStudentBCOQ4 = 0
  let cfoPercentStudentBCOQ4 = 0
  let cfoNoStudentBCIQ4 = 0
  let cfoPercentStudentBCIQ4 = 0
  let cfoNoGirlBCOQ4 = 0
  let cfoPercentGirlBCOQ4 = 0
  let cfoNoBoyBCOQ4 = 0
  let cfoPercentBoyBCOQ4 = 0
  let cfoNoSchoolBCOQ4 = 0
  let cfoNoSchoolZeroBCOQ4 = 0
  // CFO Data
  // Quarter 4

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      pushReportData(console.log('pushReportData called'))
      pushReportDataQ2(console.log('pushReportDataQ2 called'))
    }
    call()
    //getSummerizeData(console.log('getSummerizeData called'))
  }, [])

  // Get All Book-checkout Data for school
  const getAllBookCheckoutSchool = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/book-checkouts', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBCOData(response.data)
      setUkhiyaReportData(
        response.data.filter((item) => item.upazilla === 'Ukhiya' && item.month === currentMonth),
      )
      setKutubdiaReportData(
        response.data.filter((item) => item.upazilla === 'Kutubdia' && item.month === currentMonth),
      )

      //console.log('selected date:' + selectedDate)

      // console.log('Ukhiya Data Length: ' + ukhiyaReportData.length)
      // console.log('Kutubdia Data Length: ' + kutubdiaReportData.length)

      // Annual
      // Ukhiya
      uTotalStudent = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('uTotalStudent: ' + uTotalStudent)

      uTotalBookCheckout = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya' && item.year === '2022',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCO = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCI = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCI = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya' && item.year === '2022',
      ).length

      uNoSchoolZeroBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Ukhiya' && item.year === '2022' && item.schoolTotalNoStudentBC === 0,
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckout = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2022',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2022',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2022',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCO = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCI = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCI = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2022',
      ).length

      kNoSchoolZeroBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' && item.year === '2022' && item.schoolTotalNoStudentBC === 0,
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent = parseInt(kTotalStudent) + parseInt(uTotalStudent)
      cfoTotalBookCheckout = kTotalBookCheckout + uTotalBookCheckout
      cfoTotalBookCheckin = kTotalBookCheckin + uTotalBookCheckin
      cfoNoBCOPerStudent = (
        (parseFloat(kNoBCOPerStudent) + parseFloat(uNoBCOPerStudent)) /
        2
      ).toFixed(2)

      cfoNoStudentBCO = kNoStudentBCO + uNoStudentBCO
      cfoPercentStudentBCO = (
        (parseFloat(kPercentStudentBCO) + parseFloat(uPercentStudentBCO)) /
        2
      ).toFixed(2)

      cfoNoStudentBCI = kNoStudentBCI + uNoStudentBCI
      cfoPercentStudentBCI = (
        (parseFloat(kPercentStudentBCI) + parseFloat(uPercentStudentBCI)) /
        2
      ).toFixed(2)

      cfoNoGirlBCO = kNoGirlBCO + uNoGirlBCO
      cfoPercentGirlBCO = ((parseFloat(kPercentGirlBCO) + parseFloat(uPercentGirlBCO)) / 2).toFixed(
        2,
      )

      cfoNoBoyBCO = kNoBoyBCO + uNoBoyBCO

      cfoPercentBoyBCO = ((parseFloat(kPercentBoyBCO) + parseFloat(uPercentBoyBCO)) / 2).toFixed(2)

      cfoNoSchoolBCO = kNoSchoolBCO + uNoSchoolBCO
      cfoNoSchoolZeroBCO = kNoSchoolZeroBCO + uNoSchoolZeroBCO
      // CFO
      // Annual

      // Quarter 2
      // Ukhiya
      uTotalStudentQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('uTotalStudent: ' + uTotalStudent)

      uTotalBookCheckoutQ2 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentQ2 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOQ2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIQ2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOQ2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOQ2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOQ2 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2022' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length

      uNoSchoolZeroBCOQ2 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2022' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutQ2 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentQ2 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOQ2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIQ2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOQ2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOQ2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOQ2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOQ2 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          item.year === '2022' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length

      kNoSchoolZeroBCOQ2 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2022' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentQ2 = parseInt(kTotalStudentQ2) + parseInt(uTotalStudentQ2)
      cfoTotalBookCheckoutQ2 = kTotalBookCheckoutQ2 + uTotalBookCheckoutQ2
      cfoTotalBookCheckinQ2 = kTotalBookCheckinQ2 + uTotalBookCheckinQ2
      cfoNoBCOPerStudentQ2 = (
        (parseFloat(kNoBCOPerStudentQ2) + parseFloat(uNoBCOPerStudentQ2)) /
        2
      ).toFixed(2)
      cfoNoStudentBCOQ2 = kNoStudentBCOQ2 + uNoStudentBCOQ2
      cfoPercentStudentBCOQ2 = (
        (parseFloat(kPercentStudentBCOQ2) + parseFloat(uPercentStudentBCOQ2)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIQ2 = kNoStudentBCIQ2 + uNoStudentBCIQ2
      cfoPercentStudentBCIQ2 = (
        (parseFloat(kPercentStudentBCIQ2) + parseFloat(uPercentStudentBCIQ2)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOQ2 = kNoGirlBCOQ2 + uNoGirlBCOQ2
      cfoPercentGirlBCOQ2 = (
        (parseFloat(kPercentGirlBCOQ2) + parseFloat(uPercentGirlBCOQ2)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOQ2 = kNoBoyBCOQ2 + uNoBoyBCOQ2
      cfoPercentBoyBCOQ2 = (
        (parseFloat(kPercentBoyBCOQ2) + parseFloat(uPercentBoyBCOQ2)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOQ2 = kNoSchoolBCOQ2 + uNoSchoolBCOQ2
      cfoNoSchoolZeroBCOQ2 = kNoSchoolZeroBCOQ2 + uNoSchoolZeroBCOQ2
      // CFO
      // Quarter 2

      // Quarter 3
      // Quarter 3

      // Quarter 4
      // Quarter 4

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const pushReportData = () => {
    const reportObject = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudent,
        ukhiya: uTotalStudent,
        cfo: cfoTotalStudent,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckout,
        ukhiya: uTotalBookCheckout,
        cfo: cfoTotalBookCheckout,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin,
        ukhiya: uTotalBookCheckin,
        cfo: cfoTotalBookCheckin,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudent,
        ukhiya: uNoBCOPerStudent,
        cfo: cfoNoBCOPerStudent,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCO,
        ukhiya: uNoStudentBCO,
        cfo: cfoNoStudentBCO,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCO,
        ukhiya: uPercentStudentBCO,
        cfo: cfoPercentStudentBCO,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI,
        ukhiya: uNoStudentBCI,
        cfo: cfoNoStudentBCI,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCI,
        ukhiya: uPercentStudentBCI,
        cfo: cfoPercentStudentBCI,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO,
        ukhiya: uNoGirlBCO,
        cfo: cfoNoGirlBCO,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO,
        ukhiya: uPercentGirlBCO,
        cfo: cfoPercentGirlBCO,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO,
        ukhiya: uNoBoyBCO,
        cfo: cfoNoBoyBCO,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO,
        ukhiya: uPercentBoyBCO,
        cfo: cfoPercentBoyBCO,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCO,
        ukhiya: uNoSchoolBCO,
        cfo: cfoNoSchoolBCO,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCO,
        ukhiya: uNoSchoolZeroBCO,
        cfo: cfoNoSchoolZeroBCO,
      },
    ]
    console.log('reportObject', reportObject)
    setReportData(reportObject)
  }

  const pushReportDataQ2 = () => {
    const reportObjectQ2 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentQ2,
        ukhiya: uTotalStudentQ2,
        cfo: cfoTotalStudentQ2,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutQ2,
        ukhiya: uTotalBookCheckoutQ2,
        cfo: cfoTotalBookCheckoutQ2,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinQ2,
        ukhiya: uTotalBookCheckinQ2,
        cfo: cfoTotalBookCheckinQ2,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentQ2,
        ukhiya: uNoBCOPerStudentQ2,
        cfo: cfoNoBCOPerStudentQ2,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOQ2,
        ukhiya: uNoStudentBCOQ2,
        cfo: cfoNoStudentBCOQ2,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOQ2,
        ukhiya: uPercentStudentBCOQ2,
        cfo: cfoPercentStudentBCOQ2,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIQ2,
        ukhiya: uNoStudentBCIQ2,
        cfo: cfoNoStudentBCIQ2,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIQ2,
        ukhiya: uPercentStudentBCIQ2,
        cfo: cfoPercentStudentBCIQ2,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOQ2,
        ukhiya: uNoGirlBCOQ2,
        cfo: cfoNoGirlBCOQ2,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOQ2,
        ukhiya: uPercentGirlBCOQ2,
        cfo: cfoPercentGirlBCOQ2,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOQ2,
        ukhiya: uNoBoyBCOQ2,
        cfo: cfoNoBoyBCOQ2,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOQ2,
        ukhiya: uPercentBoyBCOQ2,
        cfo: cfoPercentBoyBCOQ2,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOQ2,
        ukhiya: uNoSchoolBCOQ2,
        cfo: cfoNoSchoolBCOQ2,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOQ2,
        ukhiya: uNoSchoolZeroBCOQ2,
        cfo: cfoNoSchoolZeroBCOQ2,
      },
    ]
    console.log('reportObject', reportObjectQ2)
    setReportDataQ2(reportObjectQ2)
  }

  //console.log('Ukhiya total student: ' + uTotalStudent)

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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Report</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>1st Quarterl(January-March) 2022</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Sl', field: 'sl' },
                      { title: 'Particular Area', field: 'area' },
                      { title: 'Kutubdia', field: 'kutubdia' },
                      { title: 'Ukhiya', field: 'ukhiya' },
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
                    // data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>2nd Quarter(April-June) 2022</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Sl', field: 'sl' },
                      { title: 'Particular Area', field: 'area' },
                      { title: 'Kutubdia', field: 'kutubdia' },
                      { title: 'Ukhiya', field: 'ukhiya' },
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
                    data={reportDataQ2}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>3rd Quarter(July-September) 2022</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Sl', field: 'sl' },
                      { title: 'Particular Area', field: 'area' },
                      { title: 'Kutubdia', field: 'kutubdia' },
                      { title: 'Ukhiya', field: 'ukhiya' },
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
                    data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>4rth Quarter(October-December) 2022</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Sl', field: 'sl' },
                      { title: 'Particular Area', field: 'area' },
                      { title: 'Kutubdia', field: 'kutubdia' },
                      { title: 'Ukhiya', field: 'ukhiya' },
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
                    data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>Total 2022</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Sl', field: 'sl' },
                      { title: 'Particular Area', field: 'area' },
                      { title: 'Kutubdia', field: 'kutubdia' },
                      { title: 'Ukhiya', field: 'ukhiya' },
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
                    data={reportData}
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

export default BCOSchoolQuarterly
