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

  const [reportData23Q1, setReportData23Q1] = useState([])
  const [reportData23Q2, setReportData23Q2] = useState([])
  const [reportData23Q3, setReportData23Q3] = useState([])
  const [reportData23Q4, setReportData23Q4] = useState([])
  const [reportData23Annual, setReportData23Annual] = useState([])

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

  // 2022
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
  // 2022

  // 2023
  // Annual
  // Ukhiya Data
  let uTotalStudent23 = 0
  let uTotalBookCheckout23 = 0
  let uTotalBookCheckin23 = 0
  let uNoBCOPerStudent23 = 0
  let uNoStudentBCO23 = 0
  let uPercentStudentBCO23 = 0
  let uNoStudentBCI23 = 0
  let uPercentStudentBCI23 = 0
  let uNoGirlBCO23 = 0
  let uPercentGirlBCO23 = 0
  let uNoBoyBCO23 = 0
  let uPercentBoyBCO23 = 0
  let uNoSchoolBCO23 = 0
  let uNoSchoolZeroBCO23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudent23 = 0
  let kTotalBookCheckout23 = 0
  let kTotalBookCheckin23 = 0
  let kNoBCOPerStudent23 = 0
  let kNoStudentBCO23 = 0
  let kPercentStudentBCO23 = 0
  let kNoStudentBCI23 = 0
  let kPercentStudentBCI23 = 0
  let kNoGirlBCO23 = 0
  let kPercentGirlBCO23 = 0
  let kNoBoyBCO23 = 0
  let kPercentBoyBCO23 = 0
  let kNoSchoolBCO23 = 0
  let kNoSchoolZeroBCO23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudent23 = 0
  let cfoTotalBookCheckout23 = 0
  let cfoTotalBookCheckin23 = 0
  let cfoNoBCOPerStudent23 = 0
  let cfoNoStudentBCO23 = 0
  let cfoPercentStudentBCO23 = 0
  let cfoNoStudentBCI23 = 0
  let cfoPercentStudentBCI23 = 0
  let cfoNoGirlBCO23 = 0
  let cfoPercentGirlBCO23 = 0
  let cfoNoBoyBCO23 = 0
  let cfoPercentBoyBCO23 = 0
  let cfoNoSchoolBCO23 = 0
  let cfoNoSchoolZeroBCO23 = 0
  // CFO Data
  // Annual

  // Quarter 1
  // Ukhiya Data
  let uTotalStudent23Q1 = 0
  let uTotalBookCheckout23Q1 = 0
  let uTotalBookCheckin23Q1 = 0
  let uNoBCOPerStudent23Q1 = 0
  let uNoStudentBCO23Q1 = 0
  let uPercentStudentBCO23Q1 = 0
  let uNoStudentBCI23Q1 = 0
  let uPercentStudentBCI23Q1 = 0
  let uNoGirlBCO23Q1 = 0
  let uPercentGirlBCO23Q1 = 0
  let uNoBoyBCO23Q1 = 0
  let uPercentBoyBCO23Q1 = 0
  let uNoSchoolBCO23Q1 = 0
  let uNoSchoolZeroBCO23Q1 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudent23Q1 = 0
  let kTotalBookCheckout23Q1 = 0
  let kTotalBookCheckin23Q1 = 0
  let kNoBCOPerStudent23Q1 = 0
  let kNoStudentBCO23Q1 = 0
  let kPercentStudentBCO23Q1 = 0
  let kNoStudentBCI23Q1 = 0
  let kPercentStudentBCI23Q1 = 0
  let kNoGirlBCO23Q1 = 0
  let kPercentGirlBCO23Q1 = 0
  let kNoBoyBCO23Q1 = 0
  let kPercentBoyBCO23Q1 = 0
  let kNoSchoolBCO23Q1 = 0
  let kNoSchoolZeroBCO23Q1 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudent23Q1 = 0
  let cfoTotalBookCheckout23Q1 = 0
  let cfoTotalBookCheckin23Q1 = 0
  let cfoNoBCOPerStudent23Q1 = 0
  let cfoNoStudentBCO23Q1 = 0
  let cfoPercentStudentBCO23Q1 = 0
  let cfoNoStudentBCI23Q1 = 0
  let cfoPercentStudentBCI23Q1 = 0
  let cfoNoGirlBCO23Q1 = 0
  let cfoPercentGirlBCO23Q1 = 0
  let cfoNoBoyBCO23Q1 = 0
  let cfoPercentBoyBCO23Q1 = 0
  let cfoNoSchoolBCO23Q1 = 0
  let cfoNoSchoolZeroBCO23Q1 = 0
  // CFO Data
  // Quarter 1

  // Quarter 2
  // Ukhiya Data
  let uTotalStudent23Q2 = 0
  let uTotalBookCheckout23Q2 = 0
  let uTotalBookCheckin23Q2 = 0
  let uNoBCOPerStudent23Q2 = 0
  let uNoStudentBCO23Q2 = 0
  let uPercentStudentBCO23Q2 = 0
  let uNoStudentBCI23Q2 = 0
  let uPercentStudentBCI23Q2 = 0
  let uNoGirlBCO23Q2 = 0
  let uPercentGirlBCO23Q2 = 0
  let uNoBoyBCO23Q2 = 0
  let uPercentBoyBCO23Q2 = 0
  let uNoSchoolBCO23Q2 = 0
  let uNoSchoolZeroBCO23Q2 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudent23Q2 = 0
  let kTotalBookCheckout23Q2 = 0
  let kTotalBookCheckin23Q2 = 0
  let kNoBCOPerStudent23Q2 = 0
  let kNoStudentBCO23Q2 = 0
  let kPercentStudentBCO23Q2 = 0
  let kNoStudentBCI23Q2 = 0
  let kPercentStudentBCI23Q2 = 0
  let kNoGirlBCO23Q2 = 0
  let kPercentGirlBCO23Q2 = 0
  let kNoBoyBCO23Q2 = 0
  let kPercentBoyBCO23Q2 = 0
  let kNoSchoolBCO23Q2 = 0
  let kNoSchoolZeroBCO23Q2 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudent23Q2 = 0
  let cfoTotalBookCheckout23Q2 = 0
  let cfoTotalBookCheckin23Q2 = 0
  let cfoNoBCOPerStudent23Q2 = 0
  let cfoNoStudentBCO23Q2 = 0
  let cfoPercentStudentBCO23Q2 = 0
  let cfoNoStudentBCI23Q2 = 0
  let cfoPercentStudentBCI23Q2 = 0
  let cfoNoGirlBCO23Q2 = 0
  let cfoPercentGirlBCO23Q2 = 0
  let cfoNoBoyBCO23Q2 = 0
  let cfoPercentBoyBCO23Q2 = 0
  let cfoNoSchoolBCO23Q2 = 0
  let cfoNoSchoolZeroBCO23Q2 = 0
  // CFO Data
  // Quarter 2

  // Quarter 3
  // Ukhiya Data
  let uTotalStudent23Q3 = 0
  let uTotalBookCheckout23Q3 = 0
  let uTotalBookCheckin23Q3 = 0
  let uNoBCOPerStudent23Q3 = 0
  let uNoStudentBCO23Q3 = 0
  let uPercentStudentBCO23Q3 = 0
  let uNoStudentBCI23Q3 = 0
  let uPercentStudentBCI23Q3 = 0
  let uNoGirlBCO23Q3 = 0
  let uPercentGirlBCO23Q3 = 0
  let uNoBoyBCO23Q3 = 0
  let uPercentBoyBCO23Q3 = 0
  let uNoSchoolBCO23Q3 = 0
  let uNoSchoolZeroBCO23Q3 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudent23Q3 = 0
  let kTotalBookCheckout23Q3 = 0
  let kTotalBookCheckin23Q3 = 0
  let kNoBCOPerStudent23Q3 = 0
  let kNoStudentBCO23Q3 = 0
  let kPercentStudentBCO23Q3 = 0
  let kNoStudentBCI23Q3 = 0
  let kPercentStudentBCI23Q3 = 0
  let kNoGirlBCO23Q3 = 0
  let kPercentGirlBCO23Q3 = 0
  let kNoBoyBCO23Q3 = 0
  let kPercentBoyBCO23Q3 = 0
  let kNoSchoolBCO23Q3 = 0
  let kNoSchoolZeroBCO23Q3 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudent23Q3 = 0
  let cfoTotalBookCheckout23Q3 = 0
  let cfoTotalBookCheckin23Q3 = 0
  let cfoNoBCOPerStudent23Q3 = 0
  let cfoNoStudentBCO23Q3 = 0
  let cfoPercentStudentBCO23Q3 = 0
  let cfoNoStudentBCI23Q3 = 0
  let cfoPercentStudentBCI23Q3 = 0
  let cfoNoGirlBCO23Q3 = 0
  let cfoPercentGirlBCO23Q3 = 0
  let cfoNoBoyBCO23Q3 = 0
  let cfoPercentBoyBCO23Q3 = 0
  let cfoNoSchoolBCO23Q3 = 0
  let cfoNoSchoolZeroBCO23Q3 = 0
  // CFO Data
  // Quarter 3

  // Quarter 4
  // Ukhiya Data
  let uTotalStudent23Q4 = 0
  let uTotalBookCheckout23Q4 = 0
  let uTotalBookCheckin23Q4 = 0
  let uNoBCOPerStudent23Q4 = 0
  let uNoStudentBCO23Q4 = 0
  let uPercentStudentBCO23Q4 = 0
  let uNoStudentBCI23Q4 = 0
  let uPercentStudentBCI23Q4 = 0
  let uNoGirlBCO23Q4 = 0
  let uPercentGirlBCO23Q4 = 0
  let uNoBoyBCO23Q4 = 0
  let uPercentBoyBCO23Q4 = 0
  let uNoSchoolBCO23Q4 = 0
  let uNoSchoolZeroBCO23Q4 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudent23Q4 = 0
  let kTotalBookCheckout23Q4 = 0
  let kTotalBookCheckin23Q4 = 0
  let kNoBCOPerStudent23Q4 = 0
  let kNoStudentBCO23Q4 = 0
  let kPercentStudentBCO23Q4 = 0
  let kNoStudentBCI23Q4 = 0
  let kPercentStudentBCI23Q4 = 0
  let kNoGirlBCO23Q4 = 0
  let kPercentGirlBCO23Q4 = 0
  let kNoBoyBCO23Q4 = 0
  let kPercentBoyBCO23Q4 = 0
  let kNoSchoolBCO23Q4 = 0
  let kNoSchoolZeroBCO23Q4 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudent23Q4 = 0
  let cfoTotalBookCheckout23Q4 = 0
  let cfoTotalBookCheckin23Q4 = 0
  let cfoNoBCOPerStudent23Q4 = 0
  let cfoNoStudentBCO23Q4 = 0
  let cfoPercentStudentBCO23Q4 = 0
  let cfoNoStudentBCI23Q4 = 0
  let cfoPercentStudentBCI23Q4 = 0
  let cfoNoGirlBCO23Q4 = 0
  let cfoPercentGirlBCO23Q4 = 0
  let cfoNoBoyBCO23Q4 = 0
  let cfoPercentBoyBCO23Q4 = 0
  let cfoNoSchoolBCO23Q4 = 0
  let cfoNoSchoolZeroBCO23Q4 = 0
  // CFO Data
  // Quarter 4
  // 2023

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      pushReportData(console.log('pushReportData called'))
      pushReportDataQ2(console.log('pushReportDataQ2 called'))
      pushReportDataQ3(console.log('pushReportDataQ3 called'))
      pushReportDataQ4(console.log('pushReportDataQ4 called'))
      pushReportData23(console.log('pushReportData23 called'))
      pushReportData23Q1(console.log('pushReportData23Q1 called'))
      pushReportData23Q2(console.log('pushReportData23Q2 called'))
      pushReportData23Q3(console.log('pushReportData23Q3 called'))
      pushReportData23Q4(console.log('pushReportData23Q4 called'))
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

      // 2022
      // Annual
      // Ukhiya
      uTotalStudent = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2022')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

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

      kTotalBookCheckout = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2022')
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
      cfoPercentStudentBCO = ((cfoNoStudentBCO * 100) / cfoTotalStudent).toFixed(2)

      //   (
      //   (parseFloat(kPercentStudentBCO) + parseFloat(uPercentStudentBCO)) /
      //   2
      // ).toFixed(2)

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
      cfoNoBCOPerStudentQ2 = (cfoTotalBookCheckoutQ2 / cfoTotalStudentQ2).toFixed(2)
      cfoNoStudentBCOQ2 = kNoStudentBCOQ2 + uNoStudentBCOQ2
      cfoPercentStudentBCOQ2 = ((cfoNoStudentBCOQ2 * 100) / cfoTotalStudentQ2).toFixed(2)

      //   (
      //   (parseFloat(kPercentStudentBCOQ2) + parseFloat(uPercentStudentBCOQ2)) /
      //   2
      // ).toFixed(2)

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
      // Ukhiya
      uTotalStudentQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('uTotalStudent: ' + uTotalStudent)

      uTotalBookCheckoutQ3 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentQ3 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOQ3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIQ3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOQ3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOQ3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOQ3 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2022' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length

      uNoSchoolZeroBCOQ3 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2022' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckoutQ3 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentQ3 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOQ3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIQ3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOQ3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOQ3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOQ3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOQ3 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          item.year === '2022' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length

      kNoSchoolZeroBCOQ3 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2022' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentQ3 = parseInt(kTotalStudentQ3) + parseInt(uTotalStudentQ3)
      cfoTotalBookCheckoutQ3 = kTotalBookCheckoutQ3 + uTotalBookCheckoutQ3
      cfoTotalBookCheckinQ3 = kTotalBookCheckinQ3 + uTotalBookCheckinQ3
      cfoNoBCOPerStudentQ3 = (cfoTotalBookCheckoutQ3 / cfoTotalStudentQ3).toFixed(2)
      cfoNoStudentBCOQ3 = kNoStudentBCOQ3 + uNoStudentBCOQ3
      cfoPercentStudentBCOQ3 = ((cfoNoStudentBCOQ3 * 100) / cfoTotalStudentQ3).toFixed(2)

      cfoNoStudentBCIQ3 = kNoStudentBCIQ3 + uNoStudentBCIQ3
      cfoPercentStudentBCIQ3 = (
        (parseFloat(kPercentStudentBCIQ3) + parseFloat(uPercentStudentBCIQ3)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOQ3 = kNoGirlBCOQ3 + uNoGirlBCOQ3
      cfoPercentGirlBCOQ3 = (
        (parseFloat(kPercentGirlBCOQ3) + parseFloat(uPercentGirlBCOQ3)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOQ3 = kNoBoyBCOQ3 + uNoBoyBCOQ3
      cfoPercentBoyBCOQ3 = (
        (parseFloat(kPercentBoyBCOQ3) + parseFloat(uPercentBoyBCOQ3)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOQ3 = kNoSchoolBCOQ3 + uNoSchoolBCOQ3
      cfoNoSchoolZeroBCOQ3 = kNoSchoolZeroBCOQ3 + uNoSchoolZeroBCOQ3
      // CFO
      // Quarter 3

      // Quarter 4
      // Ukhiya
      uTotalStudentQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentQ4 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOQ4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIQ4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOQ4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOQ4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOQ4 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2022' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length

      uNoSchoolZeroBCOQ4 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2022' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckoutQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentQ4 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOQ4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIQ4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOQ4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOQ4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2022' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOQ4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2022' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOQ4 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          item.year === '2022' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length

      kNoSchoolZeroBCOQ4 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2022' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentQ4 = parseInt(kTotalStudentQ4) + parseInt(uTotalStudentQ4)
      cfoTotalBookCheckoutQ4 = kTotalBookCheckoutQ4 + uTotalBookCheckoutQ4
      cfoTotalBookCheckinQ4 = kTotalBookCheckinQ4 + uTotalBookCheckinQ4
      cfoNoBCOPerStudentQ4 = (cfoTotalBookCheckoutQ4 / cfoTotalStudentQ4).toFixed(2)
      cfoNoStudentBCOQ4 = kNoStudentBCOQ4 + uNoStudentBCOQ4
      cfoPercentStudentBCOQ4 = ((cfoNoStudentBCOQ4 * 100) / cfoTotalStudentQ4).toFixed(2)

      cfoNoStudentBCIQ4 = kNoStudentBCIQ4 + uNoStudentBCIQ4
      cfoPercentStudentBCIQ4 = (
        (parseFloat(kPercentStudentBCIQ4) + parseFloat(uPercentStudentBCIQ4)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOQ4 = kNoGirlBCOQ4 + uNoGirlBCOQ4
      cfoPercentGirlBCOQ4 = (
        (parseFloat(kPercentGirlBCOQ4) + parseFloat(uPercentGirlBCOQ4)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOQ4 = kNoBoyBCOQ4 + uNoBoyBCOQ4
      cfoPercentBoyBCOQ4 = (
        (parseFloat(kPercentBoyBCOQ4) + parseFloat(uPercentBoyBCOQ4)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOQ4 = kNoSchoolBCOQ4 + uNoSchoolBCOQ4
      cfoNoSchoolZeroBCOQ4 = kNoSchoolZeroBCOQ4 + uNoSchoolZeroBCOQ4
      // CFO
      // Quarter 4
      // 2022

      // 2023
      // Annual
      // Ukhiya
      uTotalStudent23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckout23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya' && item.year === '2023',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)
      // (uTotalBookCheckout23 / uTotalStudent23).toFixed(2)

      uNoStudentBCO23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCI23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCI23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya' && item.year === '2023',
      ).length

      uNoSchoolZeroBCO23 = response.data.filter(
        (item) =>
          item.upazilla === 'Ukhiya' && item.year === '2023' && item.schoolTotalNoStudentBC === 0,
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckout23 = response.data
        .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent23 = (kTotalBookCheckout23 / kTotalStudent23).toFixed(2)

      kNoStudentBCO23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO23 = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCI23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCI23 = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO23 = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO23 = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023',
      ).length

      kNoSchoolZeroBCO23 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' && item.year === '2023' && item.schoolTotalNoStudentBC === 0,
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent23 = parseInt(kTotalStudent23) + parseInt(uTotalStudent23)
      cfoTotalBookCheckout23 = kTotalBookCheckout23 + uTotalBookCheckout23
      cfoTotalBookCheckin23 = kTotalBookCheckin23 + uTotalBookCheckin23
      cfoNoBCOPerStudent23 = (cfoTotalBookCheckout23 / cfoTotalStudent23).toFixed(2)

      cfoNoStudentBCO23 = kNoStudentBCO23 + uNoStudentBCO23
      cfoPercentStudentBCO23 = ((cfoNoStudentBCO23 * 100) / cfoTotalStudent23).toFixed(2)

      //   (
      //   (parseFloat(kPercentStudentBCO23) + parseFloat(uPercentStudentBCO23)) /
      //   2
      // ).toFixed(2)

      cfoNoStudentBCI23 = kNoStudentBCI23 + uNoStudentBCI23
      cfoPercentStudentBCI23 = (
        (parseFloat(kPercentStudentBCI23) + parseFloat(uPercentStudentBCI23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCO23 = kNoGirlBCO23 + uNoGirlBCO23
      cfoPercentGirlBCO23 = (
        (parseFloat(kPercentGirlBCO23) + parseFloat(uPercentGirlBCO23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCO23 = kNoBoyBCO23 + uNoBoyBCO23

      cfoPercentBoyBCO23 = (
        (parseFloat(kPercentBoyBCO23) + parseFloat(uPercentBoyBCO23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCO23 = kNoSchoolBCO23 + uNoSchoolBCO23
      cfoNoSchoolZeroBCO23 = kNoSchoolZeroBCO23 + uNoSchoolZeroBCO23
      // CFO
      // Annual

      // Quarter 1
      // Ukhiya
      uTotalStudent23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckout23Q1 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent23Q1 = (uTotalBookCheckout23Q1 / uTotalStudent23Q1).toFixed(2)

      uNoStudentBCO23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCI23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCI23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO23Q1 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'January' || item.month === 'February' || item.month === 'March'),
      ).length

      uNoSchoolZeroBCO23Q1 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'January' || item.month === 'February' || item.month === 'March'),
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckout23Q1 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent23Q1 = (kTotalBookCheckout23Q1 / kTotalStudent23Q1).toFixed(2)

      kNoStudentBCO23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCI23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCI23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO23Q1 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'January' || item.month === 'February' || item.month === 'March'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO23Q1 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
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
              item.year === '2023' &&
              (item.month === 'January' || item.month === 'February' || item.month === 'March'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO23Q1 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'January' || item.month === 'February' || item.month === 'March'),
      ).length

      kNoSchoolZeroBCO23Q1 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'January' || item.month === 'February' || item.month === 'March'),
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent23Q1 = parseInt(kTotalStudent23Q1) + parseInt(uTotalStudent23Q1)
      cfoTotalBookCheckout23Q1 = kTotalBookCheckout23Q1 + uTotalBookCheckout23Q1
      cfoTotalBookCheckin23Q1 = kTotalBookCheckin23Q1 + uTotalBookCheckin23Q1
      cfoNoBCOPerStudent23Q1 = (cfoTotalBookCheckout23Q1 / cfoTotalStudent23Q1).toFixed(2)

      cfoNoStudentBCO23Q1 = kNoStudentBCO23Q1 + uNoStudentBCO23Q1
      cfoPercentStudentBCO23Q1 = ((cfoNoStudentBCO23Q1 * 100) / cfoTotalStudent23Q1).toFixed(2)

      cfoNoStudentBCI23Q1 = kNoStudentBCI23Q1 + uNoStudentBCI23Q1
      cfoPercentStudentBCI23Q1 = (
        (parseFloat(kPercentStudentBCI23Q1) + parseFloat(uPercentStudentBCI23Q1)) /
        2
      ).toFixed(2)

      cfoNoGirlBCO23Q1 = kNoGirlBCO23Q1 + uNoGirlBCO23Q1
      cfoPercentGirlBCO23Q1 = (
        (parseFloat(kPercentGirlBCO23Q1) + parseFloat(uPercentGirlBCO23Q1)) /
        2
      ).toFixed(2)

      cfoNoBoyBCO23Q1 = kNoBoyBCO23Q1 + uNoBoyBCO23Q1
      cfoPercentBoyBCO23Q1 = (
        (parseFloat(kPercentBoyBCO23Q1) + parseFloat(uPercentBoyBCO23Q1)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCO23Q1 = kNoSchoolBCO23Q1 + uNoSchoolBCO23Q1
      cfoNoSchoolZeroBCO23Q1 = kNoSchoolZeroBCO23Q1 + uNoSchoolZeroBCO23Q1
      // CFO
      // Quarter 1

      // Quarter 2
      // Ukhiya
      uTotalStudent23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckout23Q2 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent23Q2 = (uTotalBookCheckout23Q2 / uTotalStudent23Q2).toFixed(2)

      uNoStudentBCO23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCI23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCI23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO23Q2 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length

      uNoSchoolZeroBCO23Q2 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckout23Q2 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent23Q2 = (kTotalBookCheckout23Q2 / kTotalStudent23Q2).toFixed(2)

      kNoStudentBCO23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCI23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCI23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO23Q2 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'April' || item.month === 'May' || item.month === 'June'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO23Q2 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
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
              item.year === '2023' &&
              (item.month === 'April' || item.month === 'May' || item.month === 'June'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO23Q2 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length

      kNoSchoolZeroBCO23Q2 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'April' || item.month === 'May' || item.month === 'June'),
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent23Q2 = parseInt(kTotalStudent23Q2) + parseInt(uTotalStudent23Q2)
      cfoTotalBookCheckout23Q2 = kTotalBookCheckout23Q2 + uTotalBookCheckout23Q2
      cfoTotalBookCheckin23Q2 = kTotalBookCheckin23Q2 + uTotalBookCheckin23Q2
      cfoNoBCOPerStudent23Q2 = (cfoTotalBookCheckout23Q2 / cfoTotalStudent23Q2).toFixed(2)

      cfoNoStudentBCO23Q2 = kNoStudentBCO23Q2 + uNoStudentBCO23Q2
      cfoPercentStudentBCO23Q2 = ((cfoNoStudentBCO23Q2 * 100) / cfoTotalStudent23Q2).toFixed(2)

      cfoNoStudentBCI23Q2 = kNoStudentBCI23Q2 + uNoStudentBCI23Q2
      cfoPercentStudentBCI23Q2 = (
        (parseFloat(kPercentStudentBCI23Q2) + parseFloat(uPercentStudentBCI23Q2)) /
        2
      ).toFixed(2)

      cfoNoGirlBCO23Q2 = kNoGirlBCO23Q2 + uNoGirlBCO23Q2
      cfoPercentGirlBCO23Q2 = (
        (parseFloat(kPercentGirlBCO23Q2) + parseFloat(uPercentGirlBCO23Q2)) /
        2
      ).toFixed(2)

      cfoNoBoyBCO23Q2 = kNoBoyBCO23Q2 + uNoBoyBCO23Q2
      cfoPercentBoyBCO23Q2 = (
        (parseFloat(kPercentBoyBCO23Q2) + parseFloat(uPercentBoyBCO23Q2)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCO23Q2 = kNoSchoolBCO23Q2 + uNoSchoolBCO23Q2
      cfoNoSchoolZeroBCO23Q2 = kNoSchoolZeroBCO23Q2 + uNoSchoolZeroBCO23Q2
      // CFO
      // Quarter 2

      // Quarter 3
      // Ukhiya
      uTotalStudent23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckout23Q3 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent23Q3 = (uTotalBookCheckout23Q3 / uTotalStudent23Q3).toFixed(2)

      uNoStudentBCO23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCI23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCI23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO23Q3 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length

      uNoSchoolZeroBCO23Q3 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckout23Q3 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent23Q3 = (kTotalBookCheckout23Q3 / kTotalStudent23Q3).toFixed(2)

      kNoStudentBCO23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCI23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCI23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO23Q3 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'July' || item.month === 'August' || item.month === 'September'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO23Q3 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
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
              item.year === '2023' &&
              (item.month === 'July' || item.month === 'August' || item.month === 'September'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO23Q3 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length

      kNoSchoolZeroBCO23Q3 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'July' || item.month === 'August' || item.month === 'September'),
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent23Q3 = parseInt(kTotalStudent23Q3) + parseInt(uTotalStudent23Q3)
      cfoTotalBookCheckout23Q3 = kTotalBookCheckout23Q3 + uTotalBookCheckout23Q3
      cfoTotalBookCheckin23Q3 = kTotalBookCheckin23Q3 + uTotalBookCheckin23Q3
      cfoNoBCOPerStudent23Q3 = (cfoTotalBookCheckout23Q3 / cfoTotalStudent23Q3).toFixed(2)

      cfoNoStudentBCO23Q3 = kNoStudentBCO23Q3 + uNoStudentBCO23Q3
      cfoPercentStudentBCO23Q3 = ((cfoNoStudentBCO23Q3 * 100) / cfoTotalStudent23Q3).toFixed(2)

      cfoNoStudentBCI23Q3 = kNoStudentBCI23Q3 + uNoStudentBCI23Q3
      cfoPercentStudentBCI23Q3 = (
        (parseFloat(kPercentStudentBCI23Q3) + parseFloat(uPercentStudentBCI23Q3)) /
        2
      ).toFixed(2)

      cfoNoGirlBCO23Q3 = kNoGirlBCO23Q3 + uNoGirlBCO23Q3
      cfoPercentGirlBCO23Q3 = (
        (parseFloat(kPercentGirlBCO23Q3) + parseFloat(uPercentGirlBCO23Q3)) /
        2
      ).toFixed(2)

      cfoNoBoyBCO23Q3 = kNoBoyBCO23Q3 + uNoBoyBCO23Q3
      cfoPercentBoyBCO23Q3 = (
        (parseFloat(kPercentBoyBCO23Q3) + parseFloat(uPercentBoyBCO23Q3)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCO23Q3 = kNoSchoolBCO23Q3 + uNoSchoolBCO23Q3
      cfoNoSchoolZeroBCO23Q3 = kNoSchoolZeroBCO23Q3 + uNoSchoolZeroBCO23Q3
      // CFO
      // Quarter 3

      // Quarter 4
      // Ukhiya
      uTotalStudent23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckout23Q4 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent23Q4 = (uTotalBookCheckout23Q4 / uTotalStudent23Q4).toFixed(2)

      uNoStudentBCO23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCI23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCI23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO23Q4 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length

      uNoSchoolZeroBCO23Q4 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckout23Q4 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent23Q4 = (kTotalBookCheckout23Q4 / kTotalStudent23Q4).toFixed(2)

      kNoStudentBCO23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCI23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCI23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO23Q4 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            (item.month === 'October' || item.month === 'November' || item.month === 'December'),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO23Q4 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
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
              item.year === '2023' &&
              (item.month === 'October' || item.month === 'November' || item.month === 'December'),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO23Q4 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length

      kNoSchoolZeroBCO23Q4 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          (item.month === 'October' || item.month === 'November' || item.month === 'December'),
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent23Q4 = parseInt(kTotalStudent23Q4) + parseInt(uTotalStudent23Q4)
      cfoTotalBookCheckout23Q4 = kTotalBookCheckout23Q4 + uTotalBookCheckout23Q4
      cfoTotalBookCheckin23Q4 = kTotalBookCheckin23Q4 + uTotalBookCheckin23Q4
      cfoNoBCOPerStudent23Q4 = (cfoTotalBookCheckout23Q4 / cfoTotalStudent23Q4).toFixed(2)

      cfoNoStudentBCO23Q4 = kNoStudentBCO23Q4 + uNoStudentBCO23Q4
      cfoPercentStudentBCO23Q4 = ((cfoNoStudentBCO23Q4 * 100) / cfoTotalStudent23Q4).toFixed(2)

      cfoNoStudentBCI23Q4 = kNoStudentBCI23Q4 + uNoStudentBCI23Q4
      cfoPercentStudentBCI23Q4 = (
        (parseFloat(kPercentStudentBCI23Q4) + parseFloat(uPercentStudentBCI23Q4)) /
        2
      ).toFixed(2)

      cfoNoGirlBCO23Q4 = kNoGirlBCO23Q4 + uNoGirlBCO23Q4
      cfoPercentGirlBCO23Q4 = (
        (parseFloat(kPercentGirlBCO23Q4) + parseFloat(uPercentGirlBCO23Q4)) /
        2
      ).toFixed(2)

      cfoNoBoyBCO23Q4 = kNoBoyBCO23Q4 + uNoBoyBCO23Q4
      cfoPercentBoyBCO23Q4 = (
        (parseFloat(kPercentBoyBCO23Q4) + parseFloat(uPercentBoyBCO23Q4)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCO23Q4 = kNoSchoolBCO23Q4 + uNoSchoolBCO23Q4
      cfoNoSchoolZeroBCO23Q4 = kNoSchoolZeroBCO23Q4 + uNoSchoolZeroBCO23Q4
      // CFO
      // Quarter 4
      // 2023

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
        area: 'Average Book Checkout Per Child',
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
        area: 'Average Book Checkout Per Child',
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

  const pushReportDataQ3 = () => {
    const reportObjectQ3 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentQ3,
        ukhiya: uTotalStudentQ3,
        cfo: cfoTotalStudentQ3,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutQ3,
        ukhiya: uTotalBookCheckoutQ3,
        cfo: cfoTotalBookCheckoutQ3,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinQ3,
        ukhiya: uTotalBookCheckinQ3,
        cfo: cfoTotalBookCheckinQ3,
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        kutubdia: kNoBCOPerStudentQ3,
        ukhiya: uNoBCOPerStudentQ3,
        cfo: cfoNoBCOPerStudentQ3,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOQ3,
        ukhiya: uNoStudentBCOQ3,
        cfo: cfoNoStudentBCOQ3,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOQ3,
        ukhiya: uPercentStudentBCOQ3,
        cfo: cfoPercentStudentBCOQ3,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIQ3,
        ukhiya: uNoStudentBCIQ3,
        cfo: cfoNoStudentBCIQ3,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIQ3,
        ukhiya: uPercentStudentBCIQ3,
        cfo: cfoPercentStudentBCIQ3,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOQ3,
        ukhiya: uNoGirlBCOQ3,
        cfo: cfoNoGirlBCOQ3,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOQ3,
        ukhiya: uPercentGirlBCOQ3,
        cfo: cfoPercentGirlBCOQ3,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOQ3,
        ukhiya: uNoBoyBCOQ3,
        cfo: cfoNoBoyBCOQ3,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOQ3,
        ukhiya: uPercentBoyBCOQ3,
        cfo: cfoPercentBoyBCOQ3,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOQ3,
        ukhiya: uNoSchoolBCOQ3,
        cfo: cfoNoSchoolBCOQ3,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOQ3,
        ukhiya: uNoSchoolZeroBCOQ3,
        cfo: cfoNoSchoolZeroBCOQ3,
      },
    ]
    console.log('reportObject', reportObjectQ3)
    setReportDataQ3(reportObjectQ3)
  }

  const pushReportDataQ4 = () => {
    const reportObjectQ4 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentQ4,
        ukhiya: uTotalStudentQ4,
        cfo: cfoTotalStudentQ4,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutQ4,
        ukhiya: uTotalBookCheckoutQ4,
        cfo: cfoTotalBookCheckoutQ4,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinQ4,
        ukhiya: uTotalBookCheckinQ4,
        cfo: cfoTotalBookCheckinQ4,
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        kutubdia: kNoBCOPerStudentQ4,
        ukhiya: uNoBCOPerStudentQ4,
        cfo: cfoNoBCOPerStudentQ4,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOQ4,
        ukhiya: uNoStudentBCOQ4,
        cfo: cfoNoStudentBCOQ4,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOQ4,
        ukhiya: uPercentStudentBCOQ4,
        cfo: cfoPercentStudentBCOQ4,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIQ4,
        ukhiya: uNoStudentBCIQ4,
        cfo: cfoNoStudentBCIQ4,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIQ4,
        ukhiya: uPercentStudentBCIQ4,
        cfo: cfoPercentStudentBCIQ4,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOQ4,
        ukhiya: uNoGirlBCOQ4,
        cfo: cfoNoGirlBCOQ4,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOQ4,
        ukhiya: uPercentGirlBCOQ4,
        cfo: cfoPercentGirlBCOQ4,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOQ4,
        ukhiya: uNoBoyBCOQ4,
        cfo: cfoNoBoyBCOQ4,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOQ4,
        ukhiya: uPercentBoyBCOQ4,
        cfo: cfoPercentBoyBCOQ4,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOQ4,
        ukhiya: uNoSchoolBCOQ4,
        cfo: cfoNoSchoolBCOQ4,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOQ4,
        ukhiya: uNoSchoolZeroBCOQ4,
        cfo: cfoNoSchoolZeroBCOQ4,
      },
    ]
    console.log('reportObject', reportObjectQ4)
    setReportDataQ4(reportObjectQ4)
  }

  const pushReportData23 = () => {
    const reportObject23 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudent23,
        ukhiya: uTotalStudent23,
        cfo: cfoTotalStudent23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckout23,
        ukhiya: uTotalBookCheckout23,
        cfo: cfoTotalBookCheckout23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin23,
        ukhiya: uTotalBookCheckin23,
        cfo: cfoTotalBookCheckin23,
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        kutubdia: kNoBCOPerStudent23,
        ukhiya: uNoBCOPerStudent23,
        cfo: cfoNoBCOPerStudent23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCO23,
        ukhiya: uNoStudentBCO23,
        cfo: cfoNoStudentBCO23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCO23,
        ukhiya: uPercentStudentBCO23,
        cfo: cfoPercentStudentBCO23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI23,
        ukhiya: uNoStudentBCI23,
        cfo: cfoNoStudentBCI23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCI23,
        ukhiya: uPercentStudentBCI23,
        cfo: cfoPercentStudentBCI23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO23,
        ukhiya: uNoGirlBCO23,
        cfo: cfoNoGirlBCO23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO23,
        ukhiya: uPercentGirlBCO23,
        cfo: cfoPercentGirlBCO23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO23,
        ukhiya: uNoBoyBCO23,
        cfo: cfoNoBoyBCO23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO23,
        ukhiya: uPercentBoyBCO23,
        cfo: cfoPercentBoyBCO23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCO23,
        ukhiya: uNoSchoolBCO23,
        cfo: cfoNoSchoolBCO23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCO23,
        ukhiya: uNoSchoolZeroBCO23,
        cfo: cfoNoSchoolZeroBCO23,
      },
    ]
    console.log('reportObject', reportObject23)
    setReportData23Annual(reportObject23)
  }

  const pushReportData23Q1 = () => {
    const reportObject23Q1 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudent23Q1,
        ukhiya: uTotalStudent23Q1,
        cfo: cfoTotalStudent23Q1,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckout23Q1,
        ukhiya: uTotalBookCheckout23Q1,
        cfo: cfoTotalBookCheckout23Q1,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin23Q1,
        ukhiya: uTotalBookCheckin23Q1,
        cfo: cfoTotalBookCheckin23Q1,
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        kutubdia: kNoBCOPerStudent23Q1,
        ukhiya: uNoBCOPerStudent23Q1,
        cfo: cfoNoBCOPerStudent23Q1,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCO23Q1,
        ukhiya: uNoStudentBCO23Q1,
        cfo: cfoNoStudentBCO23Q1,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCO23Q1,
        ukhiya: uPercentStudentBCO23Q1,
        cfo: cfoPercentStudentBCO23Q1,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI23Q1,
        ukhiya: uNoStudentBCI23Q1,
        cfo: cfoNoStudentBCI23Q1,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCI23Q1,
        ukhiya: uPercentStudentBCI23Q1,
        cfo: cfoPercentStudentBCI23Q1,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO23Q1,
        ukhiya: uNoGirlBCO23Q1,
        cfo: cfoNoGirlBCO23Q1,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO23Q1,
        ukhiya: uPercentGirlBCO23Q1,
        cfo: cfoPercentGirlBCO23Q1,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO23Q1,
        ukhiya: uNoBoyBCO23Q1,
        cfo: cfoNoBoyBCO23Q1,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO23Q1,
        ukhiya: uPercentBoyBCO23Q1,
        cfo: cfoPercentBoyBCO23Q1,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCO23Q1,
        ukhiya: uNoSchoolBCO23Q1,
        cfo: cfoNoSchoolBCO23Q1,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCO23Q1,
        ukhiya: uNoSchoolZeroBCO23Q1,
        cfo: cfoNoSchoolZeroBCO23Q1,
      },
    ]
    console.log('reportObject23Q1', reportObject23Q1)
    setReportData23Q1(reportObject23Q1)
  }

  const pushReportData23Q2 = () => {
    const reportObject23Q2 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudent23Q2,
        ukhiya: uTotalStudent23Q2,
        cfo: cfoTotalStudent23Q2,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckout23Q2,
        ukhiya: uTotalBookCheckout23Q2,
        cfo: cfoTotalBookCheckout23Q2,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin23Q2,
        ukhiya: uTotalBookCheckin23Q2,
        cfo: cfoTotalBookCheckin23Q2,
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        kutubdia: kNoBCOPerStudent23Q2,
        ukhiya: uNoBCOPerStudent23Q2,
        cfo: cfoNoBCOPerStudent23Q2,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCO23Q2,
        ukhiya: uNoStudentBCO23Q2,
        cfo: cfoNoStudentBCO23Q2,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCO23Q2,
        ukhiya: uPercentStudentBCO23Q2,
        cfo: cfoPercentStudentBCO23Q2,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI23Q2,
        ukhiya: uNoStudentBCI23Q2,
        cfo: cfoNoStudentBCI23Q2,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCI23Q2,
        ukhiya: uPercentStudentBCI23Q2,
        cfo: cfoPercentStudentBCI23Q2,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO23Q2,
        ukhiya: uNoGirlBCO23Q2,
        cfo: cfoNoGirlBCO23Q2,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO23Q2,
        ukhiya: uPercentGirlBCO23Q2,
        cfo: cfoPercentGirlBCO23Q2,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO23Q2,
        ukhiya: uNoBoyBCO23Q2,
        cfo: cfoNoBoyBCO23Q2,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO23Q2,
        ukhiya: uPercentBoyBCO23Q2,
        cfo: cfoPercentBoyBCO23Q2,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCO23Q2,
        ukhiya: uNoSchoolBCO23Q2,
        cfo: cfoNoSchoolBCO23Q2,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCO23Q2,
        ukhiya: uNoSchoolZeroBCO23Q2,
        cfo: cfoNoSchoolZeroBCO23Q2,
      },
    ]
    console.log('reportObject23Q2', reportObject23Q2)
    setReportData23Q2(reportObject23Q2)
  }

  const pushReportData23Q3 = () => {
    const reportObject23Q3 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudent23Q3,
        ukhiya: uTotalStudent23Q3,
        cfo: cfoTotalStudent23Q3,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckout23Q3,
        ukhiya: uTotalBookCheckout23Q3,
        cfo: cfoTotalBookCheckout23Q3,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin23Q3,
        ukhiya: uTotalBookCheckin23Q3,
        cfo: cfoTotalBookCheckin23Q3,
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        kutubdia: kNoBCOPerStudent23Q3,
        ukhiya: uNoBCOPerStudent23Q3,
        cfo: cfoNoBCOPerStudent23Q3,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCO23Q3,
        ukhiya: uNoStudentBCO23Q3,
        cfo: cfoNoStudentBCO23Q3,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCO23Q3,
        ukhiya: uPercentStudentBCO23Q3,
        cfo: cfoPercentStudentBCO23Q3,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI23Q3,
        ukhiya: uNoStudentBCI23Q3,
        cfo: cfoNoStudentBCI23Q3,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCI23Q3,
        ukhiya: uPercentStudentBCI23Q3,
        cfo: cfoPercentStudentBCI23Q3,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO23Q3,
        ukhiya: uNoGirlBCO23Q3,
        cfo: cfoNoGirlBCO23Q3,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO23Q3,
        ukhiya: uPercentGirlBCO23Q3,
        cfo: cfoPercentGirlBCO23Q3,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO23Q3,
        ukhiya: uNoBoyBCO23Q3,
        cfo: cfoNoBoyBCO23Q3,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO23Q3,
        ukhiya: uPercentBoyBCO23Q3,
        cfo: cfoPercentBoyBCO23Q3,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCO23Q3,
        ukhiya: uNoSchoolBCO23Q3,
        cfo: cfoNoSchoolBCO23Q3,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCO23Q3,
        ukhiya: uNoSchoolZeroBCO23Q3,
        cfo: cfoNoSchoolZeroBCO23Q3,
      },
    ]
    console.log('reportObject23Q3', reportObject23Q3)
    setReportData23Q3(reportObject23Q3)
  }

  const pushReportData23Q4 = () => {
    const reportObject23Q4 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudent23Q4,
        ukhiya: uTotalStudent23Q4,
        cfo: cfoTotalStudent23Q4,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckout23Q4,
        ukhiya: uTotalBookCheckout23Q4,
        cfo: cfoTotalBookCheckout23Q4,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin23Q4,
        ukhiya: uTotalBookCheckin23Q4,
        cfo: cfoTotalBookCheckin23Q4,
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        kutubdia: kNoBCOPerStudent23Q4,
        ukhiya: uNoBCOPerStudent23Q4,
        cfo: cfoNoBCOPerStudent23Q4,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCO23Q4,
        ukhiya: uNoStudentBCO23Q4,
        cfo: cfoNoStudentBCO23Q4,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCO23Q4,
        ukhiya: uPercentStudentBCO23Q4,
        cfo: cfoPercentStudentBCO23Q4,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI23Q4,
        ukhiya: uNoStudentBCI23Q4,
        cfo: cfoNoStudentBCI23Q4,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCI23Q4,
        ukhiya: uPercentStudentBCI23Q4,
        cfo: cfoPercentStudentBCI23Q4,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO23Q4,
        ukhiya: uNoGirlBCO23Q4,
        cfo: cfoNoGirlBCO23Q4,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO23Q4,
        ukhiya: uPercentGirlBCO23Q4,
        cfo: cfoPercentGirlBCO23Q4,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO23Q4,
        ukhiya: uNoBoyBCO23Q4,
        cfo: cfoNoBoyBCO23Q4,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO23Q4,
        ukhiya: uPercentBoyBCO23Q4,
        cfo: cfoPercentBoyBCO23Q4,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCO23Q4,
        ukhiya: uNoSchoolBCO23Q4,
        cfo: cfoNoSchoolBCO23Q4,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCO23Q4,
        ukhiya: uNoSchoolZeroBCO23Q4,
        cfo: cfoNoSchoolZeroBCO23Q4,
      },
    ]
    console.log('reportObject23Q4', reportObject23Q4)
    setReportData23Q4(reportObject23Q4)
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
            <strong>Report-2022</strong>
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
                    data={reportDataQ3}
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
                    data={reportDataQ4}
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

        <CCard className="mb-4">
          <CCardHeader>
            <strong>Report-2023</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>1st Quarterl(January-March) 2023</strong>
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
                    data={reportData23Q1}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>2nd Quarter(April-June) 2023</strong>
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
                    data={reportData23Q2}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>3rd Quarter(July-September) 2023</strong>
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
                    data={reportData23Q3}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>4rth Quarter(October-December) 2023</strong>
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
                    data={reportData23Q4}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>Total 2023</strong>
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
                    data={reportData23Annual}
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
