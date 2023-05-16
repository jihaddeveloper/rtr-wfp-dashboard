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

const AnalysisBCO = () => {
  const [isLoading, setIsLoading] = useState(true)

  //Selected Date
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Report Data
  const [reportData22Total, setReportData22Total] = useState([])
  const [reportData22Jan, setReportData22Jan] = useState([])
  const [reportData22Feb, setReportData22Feb] = useState([])
  const [reportData22Mar, setReportData22Mar] = useState([])
  const [reportData22Apr, setReportData22Apr] = useState([])

  const [reportData23Total, setReportData23Total] = useState([])
  const [reportData23, setReportData23] = useState([])
  const [reportData23Feb, setReportData23Feb] = useState([])
  const [reportData23Mar, setReportData23Mar] = useState([])
  const [reportData23Apr, setReportData23Apr] = useState([])

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

  // 2023
  // Total
  // Ukhiya Data
  let uTotalStudentTotal23 = 0
  let uTotalBookCheckoutTotal23 = 0
  let uTotalBookCheckinTotal23 = 0
  let uNoBCOPerStudentTotal23 = 0
  let uNoStudentBCOTotal23 = 0
  let uPercentStudentBCOTotal23 = 0
  let uNoStudentBCITotal23 = 0
  let uPercentStudentBCITotal23 = 0
  let uNoGirlBCOTotal23 = 0
  let uPercentGirlBCOTotal23 = 0
  let uNoBoyBCOTotal23 = 0
  let uPercentBoyBCOTotal23 = 0
  let uNoSchoolBCOTotal23 = 0
  let uNoSchoolZeroBCOTotal23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentTotal23 = 0
  let kTotalBookCheckoutTotal23 = 0
  let kTotalBookCheckinTotal23 = 0
  let kNoBCOPerStudentTotal23 = 0
  let kNoStudentBCOTotal23 = 0
  let kPercentStudentBCOTotal23 = 0
  let kNoStudentBCITotal23 = 0
  let kPercentStudentBCITotal23 = 0
  let kNoGirlBCOTotal23 = 0
  let kPercentGirlBCOTotal23 = 0
  let kNoBoyBCOTotal23 = 0
  let kPercentBoyBCOTotal23 = 0
  let kNoSchoolBCOTotal23 = 0
  let kNoSchoolZeroBCOTotal23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentTotal23 = 0
  let cfoTotalBookCheckoutTotal23 = 0
  let cfoTotalBookCheckinTotal23 = 0
  let cfoNoBCOPerStudentTotal23 = 0
  let cfoNoStudentBCOTotal23 = 0
  let cfoPercentStudentBCOTotal23 = 0
  let cfoNoStudentBCITotal23 = 0
  let cfoPercentStudentBCITotal23 = 0
  let cfoNoGirlBCOTotal23 = 0
  let cfoPercentGirlBCOTotal23 = 0
  let cfoNoBoyBCOTotal23 = 0
  let cfoPercentBoyBCOTotal23 = 0
  let cfoNoSchoolBCOTotal23 = 0
  let cfoNoSchoolZeroBCOTotal23 = 0
  // CFO Data
  // Total

  // Jan
  // Ukhiya Data
  let uTotalStudentJan23 = 0
  let uTotalBookCheckoutJan23 = 0
  let uTotalBookCheckinJan23 = 0
  let uNoBCOPerStudentJan23 = 0
  let uNoStudentBCOJan23 = 0
  let uPercentStudentBCOJan23 = 0
  let uNoStudentBCIJan23 = 0
  let uPercentStudentBCIJan23 = 0
  let uNoGirlBCOJan23 = 0
  let uPercentGirlBCOJan23 = 0
  let uNoBoyBCOJan23 = 0
  let uPercentBoyBCOJan23 = 0
  let uNoSchoolBCOJan23 = 0
  let uNoSchoolZeroBCOJan23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentJan23 = 0
  let kTotalBookCheckoutJan23 = 0
  let kTotalBookCheckinJan23 = 0
  let kNoBCOPerStudentJan23 = 0
  let kNoStudentBCOJan23 = 0
  let kPercentStudentBCOJan23 = 0
  let kNoStudentBCIJan23 = 0
  let kPercentStudentBCIJan23 = 0
  let kNoGirlBCOJan23 = 0
  let kPercentGirlBCOJan23 = 0
  let kNoBoyBCOJan23 = 0
  let kPercentBoyBCOJan23 = 0
  let kNoSchoolBCOJan23 = 0
  let kNoSchoolZeroBCOJan23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentJan23 = 0
  let cfoTotalBookCheckoutJan23 = 0
  let cfoTotalBookCheckinJan23 = 0
  let cfoNoBCOPerStudentJan23 = 0
  let cfoNoStudentBCOJan23 = 0
  let cfoPercentStudentBCOJan23 = 0
  let cfoNoStudentBCIJan23 = 0
  let cfoPercentStudentBCIJan23 = 0
  let cfoNoGirlBCOJan23 = 0
  let cfoPercentGirlBCOJan23 = 0
  let cfoNoBoyBCOJan23 = 0
  let cfoPercentBoyBCOJan23 = 0
  let cfoNoSchoolBCOJan23 = 0
  let cfoNoSchoolZeroBCOJan23 = 0
  // CFO Data
  // Jan

  // Feb
  // Ukhiya Data
  let uTotalStudentFeb23 = 0
  let uTotalBookCheckoutFeb23 = 0
  let uTotalBookCheckinFeb23 = 0
  let uNoBCOPerStudentFeb23 = 0
  let uNoStudentBCOFeb23 = 0
  let uPercentStudentBCOFeb23 = 0
  let uNoStudentBCIFeb23 = 0
  let uPercentStudentBCIFeb23 = 0
  let uNoGirlBCOFeb23 = 0
  let uPercentGirlBCOFeb23 = 0
  let uNoBoyBCOFeb23 = 0
  let uPercentBoyBCOFeb23 = 0
  let uNoSchoolBCOFeb23 = 0
  let uNoSchoolZeroBCOFeb23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentFeb23 = 0
  let kTotalBookCheckoutFeb23 = 0
  let kTotalBookCheckinFeb23 = 0
  let kNoBCOPerStudentFeb23 = 0
  let kNoStudentBCOFeb23 = 0
  let kPercentStudentBCOFeb23 = 0
  let kNoStudentBCIFeb23 = 0
  let kPercentStudentBCIFeb23 = 0
  let kNoGirlBCOFeb23 = 0
  let kPercentGirlBCOFeb23 = 0
  let kNoBoyBCOFeb23 = 0
  let kPercentBoyBCOFeb23 = 0
  let kNoSchoolBCOFeb23 = 0
  let kNoSchoolZeroBCOFeb23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentFeb23 = 0
  let cfoTotalBookCheckoutFeb23 = 0
  let cfoTotalBookCheckinFeb23 = 0
  let cfoNoBCOPerStudentFeb23 = 0
  let cfoNoStudentBCOFeb23 = 0
  let cfoPercentStudentBCOFeb23 = 0
  let cfoNoStudentBCIFeb23 = 0
  let cfoPercentStudentBCIFeb23 = 0
  let cfoNoGirlBCOFeb23 = 0
  let cfoPercentGirlBCOFeb23 = 0
  let cfoNoBoyBCOFeb23 = 0
  let cfoPercentBoyBCOFeb23 = 0
  let cfoNoSchoolBCOFeb23 = 0
  let cfoNoSchoolZeroBCOFeb23 = 0
  // CFO Data
  // Feb

  // March
  // Ukhiya Data
  let uTotalStudentMar23 = 0
  let uTotalBookCheckoutMar23 = 0
  let uTotalBookCheckinMar23 = 0
  let uNoBCOPerStudentMar23 = 0
  let uNoStudentBCOMar23 = 0
  let uPercentStudentBCOMar23 = 0
  let uNoStudentBCIMar23 = 0
  let uPercentStudentBCIMar23 = 0
  let uNoGirlBCOMar23 = 0
  let uPercentGirlBCOMar23 = 0
  let uNoBoyBCOMar23 = 0
  let uPercentBoyBCOMar23 = 0
  let uNoSchoolBCOMar23 = 0
  let uNoSchoolZeroBCOMar23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentMar23 = 0
  let kTotalBookCheckoutMar23 = 0
  let kTotalBookCheckinMar23 = 0
  let kNoBCOPerStudentMar23 = 0
  let kNoStudentBCOMar23 = 0
  let kPercentStudentBCOMar23 = 0
  let kNoStudentBCIMar23 = 0
  let kPercentStudentBCIMar23 = 0
  let kNoGirlBCOMar23 = 0
  let kPercentGirlBCOMar23 = 0
  let kNoBoyBCOMar23 = 0
  let kPercentBoyBCOMar23 = 0
  let kNoSchoolBCOMar23 = 0
  let kNoSchoolZeroBCOMar23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentMar23 = 0
  let cfoTotalBookCheckoutMar23 = 0
  let cfoTotalBookCheckinMar23 = 0
  let cfoNoBCOPerStudentMar23 = 0
  let cfoNoStudentBCOMar23 = 0
  let cfoPercentStudentBCOMar23 = 0
  let cfoNoStudentBCIMar23 = 0
  let cfoPercentStudentBCIMar23 = 0
  let cfoNoGirlBCOMar23 = 0
  let cfoPercentGirlBCOMar23 = 0
  let cfoNoBoyBCOMar23 = 0
  let cfoPercentBoyBCOMar23 = 0
  let cfoNoSchoolBCOMar23 = 0
  let cfoNoSchoolZeroBCOMar23 = 0
  // CFO Data
  // March

  // April
  // Ukhiya Data
  let uTotalStudentApr23 = 0
  let uTotalBookCheckoutApr23 = 0
  let uTotalBookCheckinApr23 = 0
  let uNoBCOPerStudentApr23 = 0
  let uNoStudentBCOApr23 = 0
  let uPercentStudentBCOApr23 = 0
  let uNoStudentBCIApr23 = 0
  let uPercentStudentBCIApr23 = 0
  let uNoGirlBCOApr23 = 0
  let uPercentGirlBCOApr23 = 0
  let uNoBoyBCOApr23 = 0
  let uPercentBoyBCOApr23 = 0
  let uNoSchoolBCOApr23 = 0
  let uNoSchoolZeroBCOApr23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentApr23 = 0
  let kTotalBookCheckoutApr23 = 0
  let kTotalBookCheckinApr23 = 0
  let kNoBCOPerStudentApr23 = 0
  let kNoStudentBCOApr23 = 0
  let kPercentStudentBCOApr23 = 0
  let kNoStudentBCIApr23 = 0
  let kPercentStudentBCIApr23 = 0
  let kNoGirlBCOApr23 = 0
  let kPercentGirlBCOApr23 = 0
  let kNoBoyBCOApr23 = 0
  let kPercentBoyBCOApr23 = 0
  let kNoSchoolBCOApr23 = 0
  let kNoSchoolZeroBCOApr23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentApr23 = 0
  let cfoTotalBookCheckoutApr23 = 0
  let cfoTotalBookCheckinApr23 = 0
  let cfoNoBCOPerStudentApr23 = 0
  let cfoNoStudentBCOApr23 = 0
  let cfoPercentStudentBCOApr23 = 0
  let cfoNoStudentBCIApr23 = 0
  let cfoPercentStudentBCIApr23 = 0
  let cfoNoGirlBCOApr23 = 0
  let cfoPercentGirlBCOApr23 = 0
  let cfoNoBoyBCOApr23 = 0
  let cfoPercentBoyBCOApr23 = 0
  let cfoNoSchoolBCOApr23 = 0
  let cfoNoSchoolZeroBCOApr23 = 0
  // CFO Data
  // April

  // May
  // Ukhiya Data
  let uTotalStudentMay23 = 0
  let uTotalBookCheckoutMay23 = 0
  let uTotalBookCheckinMay23 = 0
  let uNoBCOPerStudentMay23 = 0
  let uNoStudentBCOMay23 = 0
  let uPercentStudentBCOMay23 = 0
  let uNoStudentBCIMay23 = 0
  let uPercentStudentBCIMay23 = 0
  let uNoGirlBCOMay23 = 0
  let uPercentGirlBCOMay23 = 0
  let uNoBoyBCOMay23 = 0
  let uPercentBoyBCOMay23 = 0
  let uNoSchoolBCOMay23 = 0
  let uNoSchoolZeroBCOMay23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentMay23 = 0
  let kTotalBookCheckoutMay23 = 0
  let kTotalBookCheckinMay23 = 0
  let kNoBCOPerStudentMay23 = 0
  let kNoStudentBCOMay23 = 0
  let kPercentStudentBCOMay23 = 0
  let kNoStudentBCIMay23 = 0
  let kPercentStudentBCIMay23 = 0
  let kNoGirlBCOMay23 = 0
  let kPercentGirlBCOMay23 = 0
  let kNoBoyBCOMay23 = 0
  let kPercentBoyBCOMay23 = 0
  let kNoSchoolBCOMay23 = 0
  let kNoSchoolZeroBCOMay23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentMay23 = 0
  let cfoTotalBookCheckoutMay23 = 0
  let cfoTotalBookCheckinMay23 = 0
  let cfoNoBCOPerStudentMay23 = 0
  let cfoNoStudentBCOMay23 = 0
  let cfoPercentStudentBCOMay23 = 0
  let cfoNoStudentBCIMay23 = 0
  let cfoPercentStudentBCIMay23 = 0
  let cfoNoGirlBCOMay23 = 0
  let cfoPercentGirlBCOMay23 = 0
  let cfoNoBoyBCOMay23 = 0
  let cfoPercentBoyBCOMay23 = 0
  let cfoNoSchoolBCOMay23 = 0
  let cfoNoSchoolZeroBCOMay23 = 0
  // CFO Data
  // May
  // 2023

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

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      pushReportData23(console.log('pushReportData23 called'))
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

      // Annual 2023
      // Ukhiya
      uTotalStudent = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2022' && item.month === 'April',
        )
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
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2022' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckout = response.data
        .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
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
      // Annual 2023

      // January 2023
      // Ukhiya
      uTotalStudentJan23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutJan23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinJan23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentJan23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOJan23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOJan23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIJan23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIJan23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOJan23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOJan23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOJan23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOJan23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOJan23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'January',
      ).length

      uNoSchoolZeroBCOJan23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'January',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentJan23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutJan23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinJan23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentJan23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'January',
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
              item.year === '2023' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOJan23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOJan23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIJan23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIJan23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOJan23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOJan23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOJan23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOJan23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOJan23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
      ).length

      kNoSchoolZeroBCOJan23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'January',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentJan23 = parseInt(kTotalStudentJan23) + parseInt(uTotalStudentJan23)
      cfoTotalBookCheckoutJan23 = kTotalBookCheckoutJan23 + uTotalBookCheckoutJan23
      cfoTotalBookCheckinJan23 = kTotalBookCheckinJan23 + uTotalBookCheckinJan23
      cfoNoBCOPerStudentJan23 = (
        (parseFloat(kNoBCOPerStudentJan23) + parseFloat(uNoBCOPerStudentJan23)) /
        2
      ).toFixed(2)
      cfoNoStudentBCOJan23 = kNoStudentBCOJan23 + uNoStudentBCOJan23
      cfoPercentStudentBCOJan23 = (
        (parseFloat(kPercentStudentBCOJan23) + parseFloat(uPercentStudentBCOJan23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIJan23 = kNoStudentBCIJan23 + uNoStudentBCIJan23
      cfoPercentStudentBCIJan23 = (
        (parseFloat(kPercentStudentBCIJan23) + parseFloat(uPercentStudentBCIJan23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOJan23 = kNoGirlBCOJan23 + uNoGirlBCOJan23
      cfoPercentGirlBCOJan23 = (
        (parseFloat(kPercentGirlBCOJan23) + parseFloat(uPercentGirlBCOJan23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOJan23 = kNoBoyBCOJan23 + uNoBoyBCOJan23
      cfoPercentBoyBCOJan23 = (
        (parseFloat(kPercentBoyBCOJan23) + parseFloat(uPercentBoyBCOJan23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOJan23 = kNoSchoolBCOJan23 + uNoSchoolBCOJan23
      cfoNoSchoolZeroBCOJan23 = kNoSchoolZeroBCOJan23 + uNoSchoolZeroBCOJan23
      // CFO
      // January 2023

      // February 2023
      // Ukhiya
      uTotalStudentFeb23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutFeb23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinFeb23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentFeb23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOFeb23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIFeb23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOFeb23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOFeb23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOFeb23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'February',
      ).length

      uNoSchoolZeroBCOFeb23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'February',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentFeb23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutFeb23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinFeb23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentFeb23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'February',
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
              item.year === '2023' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOFeb23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIFeb23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOFeb23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOFeb23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOFeb23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOFeb23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'February',
      ).length

      kNoSchoolZeroBCOFeb23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'February',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentFeb23 = parseInt(kTotalStudentFeb23) + parseInt(uTotalStudentFeb23)
      cfoTotalBookCheckoutFeb23 = kTotalBookCheckoutFeb23 + uTotalBookCheckoutFeb23
      cfoTotalBookCheckinFeb23 = kTotalBookCheckinFeb23 + uTotalBookCheckinFeb23
      cfoNoBCOPerStudentFeb23 = (
        (parseFloat(kNoBCOPerStudentFeb23) + parseFloat(uNoBCOPerStudentFeb23)) /
        2
      ).toFixed(2)
      cfoNoStudentBCOFeb23 = kNoStudentBCOFeb23 + uNoStudentBCOFeb23
      cfoPercentStudentBCOFeb23 = (
        (parseFloat(kPercentStudentBCOFeb23) + parseFloat(uPercentStudentBCOFeb23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIFeb23 = kNoStudentBCIFeb23 + uNoStudentBCIFeb23
      cfoPercentStudentBCIFeb23 = (
        (parseFloat(kPercentStudentBCIFeb23) + parseFloat(uPercentStudentBCIFeb23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOFeb23 = kNoGirlBCOFeb23 + uNoGirlBCOFeb23
      cfoPercentGirlBCOFeb23 = (
        (parseFloat(kPercentGirlBCOFeb23) + parseFloat(uPercentGirlBCOFeb23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOFeb23 = kNoBoyBCOFeb23 + uNoBoyBCOFeb23
      cfoPercentBoyBCOFeb23 = (
        (parseFloat(kPercentBoyBCOFeb23) + parseFloat(uPercentBoyBCOFeb23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOFeb23 = kNoSchoolBCOFeb23 + uNoSchoolBCOFeb23
      cfoNoSchoolZeroBCOFeb23 = kNoSchoolZeroBCOFeb23 + uNoSchoolZeroBCOFeb23
      // CFO
      // February 2023

      // March 2023
      // Ukhiya
      uTotalStudentMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutMar23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentMar23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOMar23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIMar23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOMar23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOMar23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOMar23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'March',
      ).length

      uNoSchoolZeroBCOMar23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'March',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutMar23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentMar23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'March',
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
              item.year === '2023' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOMar23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIMar23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOMar23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOMar23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOMar23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOMar23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'March',
      ).length

      kNoSchoolZeroBCOMar23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'March',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentMar23 = parseInt(kTotalStudentMar23) + parseInt(uTotalStudentMar23)
      cfoTotalBookCheckoutMar23 = kTotalBookCheckoutMar23 + uTotalBookCheckoutMar23
      cfoTotalBookCheckinMar23 = kTotalBookCheckinMar23 + uTotalBookCheckinMar23
      cfoNoBCOPerStudentMar23 = (
        (parseFloat(kNoBCOPerStudentMar23) + parseFloat(uNoBCOPerStudentMar23)) /
        2
      ).toFixed(2)
      cfoNoStudentBCOMar23 = kNoStudentBCOMar23 + uNoStudentBCOMar23
      cfoPercentStudentBCOMar23 = (
        (parseFloat(kPercentStudentBCOMar23) + parseFloat(uPercentStudentBCOMar23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIMar23 = kNoStudentBCIMar23 + uNoStudentBCIMar23
      cfoPercentStudentBCIMar23 = (
        (parseFloat(kPercentStudentBCIMar23) + parseFloat(uPercentStudentBCIMar23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOMar23 = kNoGirlBCOMar23 + uNoGirlBCOMar23
      cfoPercentGirlBCOMar23 = (
        (parseFloat(kPercentGirlBCOMar23) + parseFloat(uPercentGirlBCOMar23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOMar23 = kNoBoyBCOMar23 + uNoBoyBCOMar23
      cfoPercentBoyBCOMar23 = (
        (parseFloat(kPercentBoyBCOMar23) + parseFloat(uPercentBoyBCOMar23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOMar23 = kNoSchoolBCOMar23 + uNoSchoolBCOMar23
      cfoNoSchoolZeroBCOMar23 = kNoSchoolZeroBCOMar23 + uNoSchoolZeroBCOMar23
      // CFO
      // March 2023

      // April 2023
      // Ukhiya
      uTotalStudentApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutApr23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentApr23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOApr23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIApr23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOApr23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOApr23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOApr23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'April',
      ).length

      uNoSchoolZeroBCOApr23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'April',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutApr23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentApr23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'April',
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
              item.year === '2023' &&
              item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOApr23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIApr23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOApr23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOApr23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOApr23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOApr23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'April',
      ).length

      kNoSchoolZeroBCOApr23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'April',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentApr23 = parseInt(kTotalStudentApr23) + parseInt(uTotalStudentApr23)
      cfoTotalBookCheckoutApr23 = kTotalBookCheckoutApr23 + uTotalBookCheckoutApr23
      cfoTotalBookCheckinApr23 = kTotalBookCheckinApr23 + uTotalBookCheckinApr23
      cfoNoBCOPerStudentApr23 = (
        (parseFloat(kNoBCOPerStudentApr23) + parseFloat(uNoBCOPerStudentApr23)) /
        2
      ).toFixed(2)
      cfoNoStudentBCOApr23 = kNoStudentBCOApr23 + uNoStudentBCOApr23
      cfoPercentStudentBCOApr23 = (
        (parseFloat(kPercentStudentBCOApr23) + parseFloat(uPercentStudentBCOApr23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIApr23 = kNoStudentBCIApr23 + uNoStudentBCIApr23
      cfoPercentStudentBCIApr23 = (
        (parseFloat(kPercentStudentBCIApr23) + parseFloat(uPercentStudentBCIApr23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOApr23 = kNoGirlBCOApr23 + uNoGirlBCOApr23
      cfoPercentGirlBCOApr23 = (
        (parseFloat(kPercentGirlBCOApr23) + parseFloat(uPercentGirlBCOApr23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOApr23 = kNoBoyBCOApr23 + uNoBoyBCOApr23
      cfoPercentBoyBCOApr23 = (
        (parseFloat(kPercentBoyBCOApr23) + parseFloat(uPercentBoyBCOApr23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOApr23 = kNoSchoolBCOApr23 + uNoSchoolBCOApr23
      cfoNoSchoolZeroBCOApr23 = kNoSchoolZeroBCOApr23 + uNoSchoolZeroBCOApr23
      // CFO
      // April 2023

      // May 2023
      // Ukhiya
      uTotalStudentMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutMay23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentMay23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOMay23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIMay23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOMay23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOMay23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOMay23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'May',
      ).length

      uNoSchoolZeroBCOMay23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'May',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutMay23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentMay23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'May',
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
              item.year === '2023' &&
              item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOMay23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIMay23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOMay23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOMay23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOMay23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOMay23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'May',
      ).length

      kNoSchoolZeroBCOMay23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'May',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentMay23 = parseInt(kTotalStudentMay23) + parseInt(uTotalStudentMay23)
      cfoTotalBookCheckoutMay23 = kTotalBookCheckoutMay23 + uTotalBookCheckoutMay23
      cfoTotalBookCheckinMay23 = kTotalBookCheckinMay23 + uTotalBookCheckinMay23
      cfoNoBCOPerStudentMay23 = (
        (parseFloat(kNoBCOPerStudentMay23) + parseFloat(uNoBCOPerStudentMay23)) /
        2
      ).toFixed(2)
      cfoNoStudentBCOMay23 = kNoStudentBCOMay23 + uNoStudentBCOMay23
      cfoPercentStudentBCOMay23 = (
        (parseFloat(kPercentStudentBCOMay23) + parseFloat(uPercentStudentBCOMay23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIMay23 = kNoStudentBCIMay23 + uNoStudentBCIMay23
      cfoPercentStudentBCIMay23 = (
        (parseFloat(kPercentStudentBCIMay23) + parseFloat(uPercentStudentBCIMay23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOMay23 = kNoGirlBCOMay23 + uNoGirlBCOMay23
      cfoPercentGirlBCOMay23 = (
        (parseFloat(kPercentGirlBCOMay23) + parseFloat(uPercentGirlBCOMay23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOMay23 = kNoBoyBCOMay23 + uNoBoyBCOMay23
      cfoPercentBoyBCOMay23 = (
        (parseFloat(kPercentBoyBCOMay23) + parseFloat(uPercentBoyBCOMay23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOMay23 = kNoSchoolBCOMay23 + uNoSchoolBCOMay23
      cfoNoSchoolZeroBCOMay23 = kNoSchoolZeroBCOMay23 + uNoSchoolZeroBCOMay23
      // CFO
      // May 2023

      // June 2023
      // June 2023

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const pushReportData23 = () => {
    const reportObject23 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        january: cfoTotalStudentJan23,
        february: cfoTotalStudentFeb23,
        march: cfoTotalStudentMar23,
        april: cfoTotalStudentApr23,
        may: cfoTotalStudentMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        january: cfoTotalBookCheckoutJan23,
        february: cfoTotalBookCheckoutFeb23,
        march: cfoTotalBookCheckoutMar23,
        april: cfoTotalBookCheckoutApr23,
        may: cfoTotalBookCheckoutMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        january: cfoTotalBookCheckinJan23,
        february: cfoTotalBookCheckinFeb23,
        march: cfoTotalBookCheckinMar23,
        april: cfoTotalBookCheckinApr23,
        may: cfoTotalBookCheckinMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        january: cfoNoBCOPerStudentJan23,
        february: cfoNoBCOPerStudentFeb23,
        march: cfoNoBCOPerStudentMar23,
        april: cfoNoBCOPerStudentApr23,
        may: cfoNoBCOPerStudentMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        january: cfoNoStudentBCOJan23,
        february: cfoNoStudentBCOFeb23,
        march: cfoNoStudentBCOMar23,
        april: cfoNoStudentBCOApr23,
        may: cfoNoStudentBCOMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        january: cfoPercentStudentBCOJan23,
        february: cfoPercentStudentBCOFeb23,
        march: cfoPercentStudentBCOMar23,
        april: cfoPercentStudentBCOApr23,
        may: cfoPercentStudentBCOMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        january: cfoNoStudentBCIJan23,
        february: cfoNoStudentBCIFeb23,
        march: cfoNoStudentBCIMar23,
        april: cfoNoStudentBCIApr23,
        may: cfoNoStudentBCIMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        january: cfoPercentStudentBCIJan23,
        february: cfoPercentStudentBCIFeb23,
        march: cfoPercentStudentBCIMar23,
        april: cfoPercentStudentBCIApr23,
        may: cfoPercentStudentBCIMay23,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        remark: '',
      },
    ]
    console.log('reportObject', reportObject23)
    setReportData23(reportObject23)
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
            <strong>BCO Analysis-2023</strong>
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={''}
              // title={JSON.stringify(reportData)}
              columns={[
                { title: 'Sl', field: 'sl' },
                { title: 'Particular Area', field: 'area' },
                { title: 'January', field: 'january' },
                { title: 'February', field: 'february' },
                { title: 'March', field: 'march' },
                { title: 'April', field: 'april' },
                { title: 'May', field: 'may' },
                { title: 'June', field: 'june' },
                { title: 'July', field: 'july' },
                { title: 'August', field: 'august' },
                { title: 'September', field: 'september' },
                { title: 'Remarks', field: 'remark' },
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
              data={reportData23}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Analysis Chart-2023</strong>
          </CCardHeader>
          <CCardBody>
            <strong>Under construction</strong>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AnalysisBCO
