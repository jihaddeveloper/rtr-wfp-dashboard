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

const BCOSchoolMonthly = () => {
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
  const [reportData23Jan, setReportData23Jan] = useState([])
  const [reportData23Feb, setReportData23Feb] = useState([])
  const [reportData23Mar, setReportData23Mar] = useState([])
  const [reportData23Apr, setReportData23Apr] = useState([])
  const [reportData23May, setReportData23May] = useState([])
  const [reportData23Jun, setReportData23Jun] = useState([])
  const [reportData23Jul, setReportData23Jul] = useState([])
  const [reportData23Aug, setReportData23Aug] = useState([])
  const [reportData23Sep, setReportData23Sep] = useState([])
  const [reportData23Oct, setReportData23Oct] = useState([])
  const [reportData23Nov, setReportData23Nov] = useState([])
  const [reportData23Dec, setReportData23Dec] = useState([])

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
      pushReportData23Jan(console.log('pushReportData23Jan called'))
      pushReportData23Feb(console.log('pushReportData23Feb called'))
      pushReportData23Mar(console.log('pushReportData23Mar called'))
      pushReportData23Apr(console.log('pushReportData23Apr called'))
      pushReportData23May(console.log('pushReportData23May called'))
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
      cfoNoBCOPerStudentJan23 = (cfoTotalBookCheckoutJan23 / cfoTotalStudentJan23).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentJan23) + parseFloat(uNoBCOPerStudentJan23)) /
      //   2
      // ).toFixed(2)
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
      cfoNoBCOPerStudentFeb23 = (cfoTotalBookCheckoutFeb23 / cfoTotalStudentFeb23).toFixed(2)
      //   (
      //   (parseFloat(kNoBCOPerStudentFeb23) + parseFloat(uNoBCOPerStudentFeb23)) /
      //   2
      // ).toFixed(2)
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
      cfoNoBCOPerStudentMar23 = (cfoTotalBookCheckoutMar23 / cfoTotalStudentMar23).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentMar23) + parseFloat(uNoBCOPerStudentMar23)) /
      //   2
      // ).toFixed(2)
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
      cfoNoBCOPerStudentApr23 = (cfoTotalBookCheckoutApr23 / cfoTotalStudentApr23).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentApr23) + parseFloat(uNoBCOPerStudentApr23)) /
      //   2
      // ).toFixed(2)
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
      cfoNoBCOPerStudentMay23 = (cfoTotalBookCheckoutMay23 / cfoTotalStudentMay23).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentMay23) + parseFloat(uNoBCOPerStudentMay23)) /
      //   2
      // ).toFixed(2)
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

  const pushReportData23Jan = () => {
    const reportObject23Jan = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentJan23,
        ukhiya: uTotalStudentJan23,
        cfo: cfoTotalStudentJan23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutJan23,
        ukhiya: uTotalBookCheckoutJan23,
        cfo: cfoTotalBookCheckoutJan23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinJan23,
        ukhiya: uTotalBookCheckinJan23,
        cfo: cfoTotalBookCheckinJan23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentJan23,
        ukhiya: uNoBCOPerStudentJan23,
        cfo: cfoNoBCOPerStudentJan23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOJan23,
        ukhiya: uNoStudentBCOJan23,
        cfo: cfoNoStudentBCOJan23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOJan23,
        ukhiya: uPercentStudentBCOJan23,
        cfo: cfoPercentStudentBCOJan23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIJan23,
        ukhiya: uNoStudentBCIJan23,
        cfo: cfoNoStudentBCIJan23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIJan23,
        ukhiya: uPercentStudentBCIJan23,
        cfo: cfoPercentStudentBCIJan23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOJan23,
        ukhiya: uNoGirlBCOJan23,
        cfo: cfoNoGirlBCOJan23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOJan23,
        ukhiya: uPercentGirlBCOJan23,
        cfo: cfoPercentGirlBCOJan23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOJan23,
        ukhiya: uNoBoyBCOJan23,
        cfo: cfoNoBoyBCOJan23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOJan23,
        ukhiya: uPercentBoyBCOJan23,
        cfo: cfoPercentBoyBCOJan23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOJan23,
        ukhiya: uNoSchoolBCOJan23,
        cfo: cfoNoSchoolBCOJan23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOJan23,
        ukhiya: uNoSchoolZeroBCOJan23,
        cfo: cfoNoSchoolZeroBCOJan23,
      },
    ]
    console.log('reportObject', reportObject23Jan)
    setReportData23Jan(reportObject23Jan)
  }

  const pushReportData23Feb = () => {
    const reportObject23Feb = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentFeb23,
        ukhiya: uTotalStudentFeb23,
        cfo: cfoTotalStudentFeb23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutFeb23,
        ukhiya: uTotalBookCheckoutFeb23,
        cfo: cfoTotalBookCheckoutFeb23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinFeb23,
        ukhiya: uTotalBookCheckinFeb23,
        cfo: cfoTotalBookCheckinFeb23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentFeb23,
        ukhiya: uNoBCOPerStudentFeb23,
        cfo: cfoNoBCOPerStudentFeb23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOFeb23,
        ukhiya: uNoStudentBCOFeb23,
        cfo: cfoNoStudentBCOFeb23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOFeb23,
        ukhiya: uPercentStudentBCOFeb23,
        cfo: cfoPercentStudentBCOFeb23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIFeb23,
        ukhiya: uNoStudentBCIFeb23,
        cfo: cfoNoStudentBCIFeb23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIFeb23,
        ukhiya: uPercentStudentBCIFeb23,
        cfo: cfoPercentStudentBCIFeb23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOFeb23,
        ukhiya: uNoGirlBCOFeb23,
        cfo: cfoNoGirlBCOFeb23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOFeb23,
        ukhiya: uPercentGirlBCOFeb23,
        cfo: cfoPercentGirlBCOFeb23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOFeb23,
        ukhiya: uNoBoyBCOFeb23,
        cfo: cfoNoBoyBCOFeb23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOFeb23,
        ukhiya: uPercentBoyBCOFeb23,
        cfo: cfoPercentBoyBCOFeb23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOFeb23,
        ukhiya: uNoSchoolBCOFeb23,
        cfo: cfoNoSchoolBCOFeb23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOFeb23,
        ukhiya: uNoSchoolZeroBCOFeb23,
        cfo: cfoNoSchoolZeroBCOFeb23,
      },
    ]
    console.log('reportObject', reportObject23Feb)
    setReportData23Feb(reportObject23Feb)
  }

  const pushReportData23Mar = () => {
    const reportObject23Mar = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentMar23,
        ukhiya: uTotalStudentMar23,
        cfo: cfoTotalStudentMar23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutMar23,
        ukhiya: uTotalBookCheckoutMar23,
        cfo: cfoTotalBookCheckoutMar23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinMar23,
        ukhiya: uTotalBookCheckinMar23,
        cfo: cfoTotalBookCheckinMar23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentMar23,
        ukhiya: uNoBCOPerStudentMar23,
        cfo: cfoNoBCOPerStudentMar23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOMar23,
        ukhiya: uNoStudentBCOMar23,
        cfo: cfoNoStudentBCOMar23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOMar23,
        ukhiya: uPercentStudentBCOMar23,
        cfo: cfoPercentStudentBCOMar23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIMar23,
        ukhiya: uNoStudentBCIMar23,
        cfo: cfoNoStudentBCIMar23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIMar23,
        ukhiya: uPercentStudentBCIMar23,
        cfo: cfoPercentStudentBCIMar23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOMar23,
        ukhiya: uNoGirlBCOMar23,
        cfo: cfoNoGirlBCOMar23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOMar23,
        ukhiya: uPercentGirlBCOMar23,
        cfo: cfoPercentGirlBCOMar23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOMar23,
        ukhiya: uNoBoyBCOMar23,
        cfo: cfoNoBoyBCOMar23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOMar23,
        ukhiya: uPercentBoyBCOMar23,
        cfo: cfoPercentBoyBCOMar23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOMar23,
        ukhiya: uNoSchoolBCOMar23,
        cfo: cfoNoSchoolBCOMar23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOMar23,
        ukhiya: uNoSchoolZeroBCOMar23,
        cfo: cfoNoSchoolZeroBCOMar23,
      },
    ]
    console.log('reportObject', reportObject23Mar)
    setReportData23Mar(reportObject23Mar)
  }

  const pushReportData23Apr = () => {
    const reportObject23Apr = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentApr23,
        ukhiya: uTotalStudentApr23,
        cfo: cfoTotalStudentApr23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutApr23,
        ukhiya: uTotalBookCheckoutApr23,
        cfo: cfoTotalBookCheckoutApr23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinApr23,
        ukhiya: uTotalBookCheckinApr23,
        cfo: cfoTotalBookCheckinApr23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentApr23,
        ukhiya: uNoBCOPerStudentApr23,
        cfo: cfoNoBCOPerStudentApr23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOApr23,
        ukhiya: uNoStudentBCOApr23,
        cfo: cfoNoStudentBCOApr23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOApr23,
        ukhiya: uPercentStudentBCOApr23,
        cfo: cfoPercentStudentBCOApr23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIApr23,
        ukhiya: uNoStudentBCIApr23,
        cfo: cfoNoStudentBCIApr23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIApr23,
        ukhiya: uPercentStudentBCIApr23,
        cfo: cfoPercentStudentBCIApr23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOApr23,
        ukhiya: uNoGirlBCOApr23,
        cfo: cfoNoGirlBCOApr23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOApr23,
        ukhiya: uPercentGirlBCOApr23,
        cfo: cfoPercentGirlBCOApr23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOApr23,
        ukhiya: uNoBoyBCOApr23,
        cfo: cfoNoBoyBCOApr23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOApr23,
        ukhiya: uPercentBoyBCOApr23,
        cfo: cfoPercentBoyBCOApr23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOApr23,
        ukhiya: uNoSchoolBCOApr23,
        cfo: cfoNoSchoolBCOApr23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOApr23,
        ukhiya: uNoSchoolZeroBCOApr23,
        cfo: cfoNoSchoolZeroBCOApr23,
      },
    ]
    console.log('reportObject', reportObject23Apr)
    setReportData23Apr(reportObject23Apr)
  }

  const pushReportData23May = () => {
    const reportObject23May = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentMay23,
        ukhiya: uTotalStudentMay23,
        cfo: cfoTotalStudentMay23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutMay23,
        ukhiya: uTotalBookCheckoutMay23,
        cfo: cfoTotalBookCheckoutMay23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinMay23,
        ukhiya: uTotalBookCheckinMay23,
        cfo: cfoTotalBookCheckinMay23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentMay23,
        ukhiya: uNoBCOPerStudentMay23,
        cfo: cfoNoBCOPerStudentMay23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOMay23,
        ukhiya: uNoStudentBCOMay23,
        cfo: cfoNoStudentBCOMay23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOMay23,
        ukhiya: uPercentStudentBCOMay23,
        cfo: cfoPercentStudentBCOMay23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIMay23,
        ukhiya: uNoStudentBCIMay23,
        cfo: cfoNoStudentBCIMay23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIMay23,
        ukhiya: uPercentStudentBCIMay23,
        cfo: cfoPercentStudentBCIMay23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOMay23,
        ukhiya: uNoGirlBCOMay23,
        cfo: cfoNoGirlBCOMay23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOMay23,
        ukhiya: uPercentGirlBCOMay23,
        cfo: cfoPercentGirlBCOMay23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOMay23,
        ukhiya: uNoBoyBCOMay23,
        cfo: cfoNoBoyBCOMay23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOMay23,
        ukhiya: uPercentBoyBCOMay23,
        cfo: cfoPercentBoyBCOMay23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOMay23,
        ukhiya: uNoSchoolBCOMay23,
        cfo: cfoNoSchoolBCOMay23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOMay23,
        ukhiya: uNoSchoolZeroBCOMay23,
        cfo: cfoNoSchoolZeroBCOMay23,
      },
    ]
    console.log('reportObject', reportObject23May)
    setReportData23May(reportObject23May)
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
            <strong>Report-2023</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>January 2023</strong>
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
                    data={reportData23Jan}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>February 2023</strong>
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
                    data={reportData23Feb}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>March 2023</strong>
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
                    data={reportData23Mar}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>April 2023</strong>
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
                    data={reportData23Apr}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>May 2023</strong>
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
                    data={reportData23May}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>June 2023</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>July 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>August 2023</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={9}>
                <CAccordionHeader>
                  <strong>September 2023</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={10}>
                <CAccordionHeader>
                  <strong>October 2023</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={11}>
                <CAccordionHeader>
                  <strong>November 2023</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={12}>
                <CAccordionHeader>
                  <strong>December 2023</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={13}>
                <CAccordionHeader>
                  <strong>Annual 2023</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Report-2022</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>January 2022</strong>
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
                  <strong>February 2022</strong>
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
                    //data={reportDataQ2}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>March 2022</strong>
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
                    //data={reportData23Mar}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>April 2022</strong>
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
                    //data={reportDataQ4}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>May 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>June 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>July 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>August 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={9}>
                <CAccordionHeader>
                  <strong>September 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={10}>
                <CAccordionHeader>
                  <strong>October 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={11}>
                <CAccordionHeader>
                  <strong>November 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={12}>
                <CAccordionHeader>
                  <strong>December 2022</strong>
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
                    //data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={13}>
                <CAccordionHeader>
                  <strong>Annual 2022</strong>
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
                    //data={reportData}
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

export default BCOSchoolMonthly
