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

const AnalysisBCODI = () => {
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
  const [reportData24, setReportData24] = useState([])
  const [reportData23Feb, setReportData23Feb] = useState([])
  const [reportData23Mar, setReportData23Mar] = useState([])
  const [reportData23Apr, setReportData23Apr] = useState([])

  // Chart Data
  const [schoolBCOPerChildChartData, setSchoolBCOPerChildChartData] = useState({})
  const [schoolTotalBookCheckOutInChartData, setSchoolTotalBookCheckOutInChartData] = useState({})
  const [schoolNoStudentBCOInChartData, setSchoolNoStudentBCOInChartData] = useState({})
  const [schoolPercentStudentBCOInChartData, setSchoolPercentStudentBCOInChartData] = useState({})

  const [allBCOData, setAllBCOData] = useState([])

  const [allBCODIData, setAllBCODIData] = useState([])

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

  // June
  // Ukhiya Data
  let uTotalStudentJun23 = 0
  let uTotalBookCheckoutJun23 = 0
  let uTotalBookCheckinJun23 = 0
  let uNoBCOPerStudentJun23 = 0
  let uNoStudentBCOJun23 = 0
  let uPercentStudentBCOJun23 = 0
  let uNoStudentBCIJun23 = 0
  let uPercentStudentBCIJun23 = 0
  let uNoGirlBCOJun23 = 0
  let uPercentGirlBCOJun23 = 0
  let uNoBoyBCOJun23 = 0
  let uPercentBoyBCOJun23 = 0
  let uNoSchoolBCOJun23 = 0
  let uNoSchoolZeroBCOJun23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentJun23 = 0
  let kTotalBookCheckoutJun23 = 0
  let kTotalBookCheckinJun23 = 0
  let kNoBCOPerStudentJun23 = 0
  let kNoStudentBCOJun23 = 0
  let kPercentStudentBCOJun23 = 0
  let kNoStudentBCIJun23 = 0
  let kPercentStudentBCIJun23 = 0
  let kNoGirlBCOJun23 = 0
  let kPercentGirlBCOJun23 = 0
  let kNoBoyBCOJun23 = 0
  let kPercentBoyBCOJun23 = 0
  let kNoSchoolBCOJun23 = 0
  let kNoSchoolZeroBCOJun23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentJun23 = 0
  let cfoTotalBookCheckoutJun23 = 0
  let cfoTotalBookCheckinJun23 = 0
  let cfoNoBCOPerStudentJun23 = 0
  let cfoNoStudentBCOJun23 = 0
  let cfoPercentStudentBCOJun23 = 0
  let cfoNoStudentBCIJun23 = 0
  let cfoPercentStudentBCIJun23 = 0
  let cfoNoGirlBCOJun23 = 0
  let cfoPercentGirlBCOJun23 = 0
  let cfoNoBoyBCOJun23 = 0
  let cfoPercentBoyBCOJun23 = 0
  let cfoNoSchoolBCOJun23 = 0
  let cfoNoSchoolZeroBCOJun23 = 0
  // CFO Data
  // June

  // July
  // Ukhiya Data
  let uTotalStudentJul23 = 0
  let uTotalBookCheckoutJul23 = 0
  let uTotalBookCheckinJul23 = 0
  let uNoBCOPerStudentJul23 = 0
  let uNoStudentBCOJul23 = 0
  let uPercentStudentBCOJul23 = 0
  let uNoStudentBCIJul23 = 0
  let uPercentStudentBCIJul23 = 0
  let uNoGirlBCOJul23 = 0
  let uPercentGirlBCOJul23 = 0
  let uNoBoyBCOJul23 = 0
  let uPercentBoyBCOJul23 = 0
  let uNoSchoolBCOJul23 = 0
  let uNoSchoolZeroBCOJul23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentJul23 = 0
  let kTotalBookCheckoutJul23 = 0
  let kTotalBookCheckinJul23 = 0
  let kNoBCOPerStudentJul23 = 0
  let kNoStudentBCOJul23 = 0
  let kPercentStudentBCOJul23 = 0
  let kNoStudentBCIJul23 = 0
  let kPercentStudentBCIJul23 = 0
  let kNoGirlBCOJul23 = 0
  let kPercentGirlBCOJul23 = 0
  let kNoBoyBCOJul23 = 0
  let kPercentBoyBCOJul23 = 0
  let kNoSchoolBCOJul23 = 0
  let kNoSchoolZeroBCOJul23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentJul23 = 0
  let cfoTotalBookCheckoutJul23 = 0
  let cfoTotalBookCheckinJul23 = 0
  let cfoNoBCOPerStudentJul23 = 0
  let cfoNoStudentBCOJul23 = 0
  let cfoPercentStudentBCOJul23 = 0
  let cfoNoStudentBCIJul23 = 0
  let cfoPercentStudentBCIJul23 = 0
  let cfoNoGirlBCOJul23 = 0
  let cfoPercentGirlBCOJul23 = 0
  let cfoNoBoyBCOJul23 = 0
  let cfoPercentBoyBCOJul23 = 0
  let cfoNoSchoolBCOJul23 = 0
  let cfoNoSchoolZeroBCOJul23 = 0
  // CFO Data
  // July

  // August
  // Ukhiya Data
  let uTotalStudentAug23 = 0
  let uTotalBookCheckoutAug23 = 0
  let uTotalBookCheckinAug23 = 0
  let uNoBCOPerStudentAug23 = 0
  let uNoStudentBCOAug23 = 0
  let uPercentStudentBCOAug23 = 0
  let uNoStudentBCIAug23 = 0
  let uPercentStudentBCIAug23 = 0
  let uNoGirlBCOAug23 = 0
  let uPercentGirlBCOAug23 = 0
  let uNoBoyBCOAug23 = 0
  let uPercentBoyBCOAug23 = 0
  let uNoSchoolBCOAug23 = 0
  let uNoSchoolZeroBCOAug23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentAug23 = 0
  let kTotalBookCheckoutAug23 = 0
  let kTotalBookCheckinAug23 = 0
  let kNoBCOPerStudentAug23 = 0
  let kNoStudentBCOAug23 = 0
  let kPercentStudentBCOAug23 = 0
  let kNoStudentBCIAug23 = 0
  let kPercentStudentBCIAug23 = 0
  let kNoGirlBCOAug23 = 0
  let kPercentGirlBCOAug23 = 0
  let kNoBoyBCOAug23 = 0
  let kPercentBoyBCOAug23 = 0
  let kNoSchoolBCOAug23 = 0
  let kNoSchoolZeroBCOAug23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentAug23 = 0
  let cfoTotalBookCheckoutAug23 = 0
  let cfoTotalBookCheckinAug23 = 0
  let cfoNoBCOPerStudentAug23 = 0
  let cfoNoStudentBCOAug23 = 0
  let cfoPercentStudentBCOAug23 = 0
  let cfoNoStudentBCIAug23 = 0
  let cfoPercentStudentBCIAug23 = 0
  let cfoNoGirlBCOAug23 = 0
  let cfoPercentGirlBCOAug23 = 0
  let cfoNoBoyBCOAug23 = 0
  let cfoPercentBoyBCOAug23 = 0
  let cfoNoSchoolBCOAug23 = 0
  let cfoNoSchoolZeroBCOAug23 = 0
  // CFO Data
  // August

  // September
  // Ukhiya Data
  let uTotalStudentSep23 = 0
  let uTotalBookCheckoutSep23 = 0
  let uTotalBookCheckinSep23 = 0
  let uNoBCOPerStudentSep23 = 0
  let uNoStudentBCOSep23 = 0
  let uPercentStudentBCOSep23 = 0
  let uNoStudentBCISep23 = 0
  let uPercentStudentBCISep23 = 0
  let uNoGirlBCOSep23 = 0
  let uPercentGirlBCOSep23 = 0
  let uNoBoyBCOSep23 = 0
  let uPercentBoyBCOSep23 = 0
  let uNoSchoolBCOSep23 = 0
  let uNoSchoolZeroBCOSep23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentSep23 = 0
  let kTotalBookCheckoutSep23 = 0
  let kTotalBookCheckinSep23 = 0
  let kNoBCOPerStudentSep23 = 0
  let kNoStudentBCOSep23 = 0
  let kPercentStudentBCOSep23 = 0
  let kNoStudentBCISep23 = 0
  let kPercentStudentBCISep23 = 0
  let kNoGirlBCOSep23 = 0
  let kPercentGirlBCOSep23 = 0
  let kNoBoyBCOSep23 = 0
  let kPercentBoyBCOSep23 = 0
  let kNoSchoolBCOSep23 = 0
  let kNoSchoolZeroBCOSep23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentSep23 = 0
  let cfoTotalBookCheckoutSep23 = 0
  let cfoTotalBookCheckinSep23 = 0
  let cfoNoBCOPerStudentSep23 = 0
  let cfoNoStudentBCOSep23 = 0
  let cfoPercentStudentBCOSep23 = 0
  let cfoNoStudentBCISep23 = 0
  let cfoPercentStudentBCISep23 = 0
  let cfoNoGirlBCOSep23 = 0
  let cfoPercentGirlBCOSep23 = 0
  let cfoNoBoyBCOSep23 = 0
  let cfoPercentBoyBCOSep23 = 0
  let cfoNoSchoolBCOSep23 = 0
  let cfoNoSchoolZeroBCOSep23 = 0
  // CFO Data
  // September

  // October
  // Ukhiya Data
  let uTotalStudentOct23 = 0
  let uTotalBookCheckoutOct23 = 0
  let uTotalBookCheckinOct23 = 0
  let uNoBCOPerStudentOct23 = 0
  let uNoStudentBCOOct23 = 0
  let uPercentStudentBCOOct23 = 0
  let uNoStudentBCIOct23 = 0
  let uPercentStudentBCIOct23 = 0
  let uNoGirlBCOOct23 = 0
  let uPercentGirlBCOOct23 = 0
  let uNoBoyBCOOct23 = 0
  let uPercentBoyBCOOct23 = 0
  let uNoSchoolBCOOct23 = 0
  let uNoSchoolZeroBCOOct23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentOct23 = 0
  let kTotalBookCheckoutOct23 = 0
  let kTotalBookCheckinOct23 = 0
  let kNoBCOPerStudentOct23 = 0
  let kNoStudentBCOOct23 = 0
  let kPercentStudentBCOOct23 = 0
  let kNoStudentBCIOct23 = 0
  let kPercentStudentBCIOct23 = 0
  let kNoGirlBCOOct23 = 0
  let kPercentGirlBCOOct23 = 0
  let kNoBoyBCOOct23 = 0
  let kPercentBoyBCOOct23 = 0
  let kNoSchoolBCOOct23 = 0
  let kNoSchoolZeroBCOOct23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentOct23 = 0
  let cfoTotalBookCheckoutOct23 = 0
  let cfoTotalBookCheckinOct23 = 0
  let cfoNoBCOPerStudentOct23 = 0
  let cfoNoStudentBCOOct23 = 0
  let cfoPercentStudentBCOOct23 = 0
  let cfoNoStudentBCIOct23 = 0
  let cfoPercentStudentBCIOct23 = 0
  let cfoNoGirlBCOOct23 = 0
  let cfoPercentGirlBCOOct23 = 0
  let cfoNoBoyBCOOct23 = 0
  let cfoPercentBoyBCOOct23 = 0
  let cfoNoSchoolBCOOct23 = 0
  let cfoNoSchoolZeroBCOOct23 = 0
  // CFO Data
  // October

  // November
  // Ukhiya Data
  let uTotalStudentNov23 = 0
  let uTotalBookCheckoutNov23 = 0
  let uTotalBookCheckinNov23 = 0
  let uNoBCOPerStudentNov23 = 0
  let uNoStudentBCONov23 = 0
  let uPercentStudentBCONov23 = 0
  let uNoStudentBCINov23 = 0
  let uPercentStudentBCINov23 = 0
  let uNoGirlBCONov23 = 0
  let uPercentGirlBCONov23 = 0
  let uNoBoyBCONov23 = 0
  let uPercentBoyBCONov23 = 0
  let uNoSchoolBCONov23 = 0
  let uNoSchoolZeroBCONov23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentNov23 = 0
  let kTotalBookCheckoutNov23 = 0
  let kTotalBookCheckinNov23 = 0
  let kNoBCOPerStudentNov23 = 0
  let kNoStudentBCONov23 = 0
  let kPercentStudentBCONov23 = 0
  let kNoStudentBCINov23 = 0
  let kPercentStudentBCINov23 = 0
  let kNoGirlBCONov23 = 0
  let kPercentGirlBCONov23 = 0
  let kNoBoyBCONov23 = 0
  let kPercentBoyBCONov23 = 0
  let kNoSchoolBCONov23 = 0
  let kNoSchoolZeroBCONov23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentNov23 = 0
  let cfoTotalBookCheckoutNov23 = 0
  let cfoTotalBookCheckinNov23 = 0
  let cfoNoBCOPerStudentNov23 = 0
  let cfoNoStudentBCONov23 = 0
  let cfoPercentStudentBCONov23 = 0
  let cfoNoStudentBCINov23 = 0
  let cfoPercentStudentBCINov23 = 0
  let cfoNoGirlBCONov23 = 0
  let cfoPercentGirlBCONov23 = 0
  let cfoNoBoyBCONov23 = 0
  let cfoPercentBoyBCONov23 = 0
  let cfoNoSchoolBCONov23 = 0
  let cfoNoSchoolZeroBCONov23 = 0
  // CFO Data
  // November

  // December
  // Ukhiya Data
  let uTotalStudentDec23 = 0
  let uTotalBookCheckoutDec23 = 0
  let uTotalBookCheckinDec23 = 0
  let uNoBCOPerStudentDec23 = 0
  let uNoStudentBCODec23 = 0
  let uPercentStudentBCODec23 = 0
  let uNoStudentBCIDec23 = 0
  let uPercentStudentBCIDec23 = 0
  let uNoGirlBCODec23 = 0
  let uPercentGirlBCODec23 = 0
  let uNoBoyBCODec23 = 0
  let uPercentBoyBCODec23 = 0
  let uNoSchoolBCODec23 = 0
  let uNoSchoolZeroBCODec23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentDec23 = 0
  let kTotalBookCheckoutDec23 = 0
  let kTotalBookCheckinDec23 = 0
  let kNoBCOPerStudentDec23 = 0
  let kNoStudentBCODec23 = 0
  let kPercentStudentBCODec23 = 0
  let kNoStudentBCIDec23 = 0
  let kPercentStudentBCIDec23 = 0
  let kNoGirlBCODec23 = 0
  let kPercentGirlBCODec23 = 0
  let kNoBoyBCODec23 = 0
  let kPercentBoyBCODec23 = 0
  let kNoSchoolBCODec23 = 0
  let kNoSchoolZeroBCODec23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentDec23 = 0
  let cfoTotalBookCheckoutDec23 = 0
  let cfoTotalBookCheckinDec23 = 0
  let cfoNoBCOPerStudentDec23 = 0
  let cfoNoStudentBCODec23 = 0
  let cfoPercentStudentBCODec23 = 0
  let cfoNoStudentBCIDec23 = 0
  let cfoPercentStudentBCIDec23 = 0
  let cfoNoGirlBCODec23 = 0
  let cfoPercentGirlBCODec23 = 0
  let cfoNoBoyBCODec23 = 0
  let cfoPercentBoyBCODec23 = 0
  let cfoNoSchoolBCODec23 = 0
  let cfoNoSchoolZeroBCODec23 = 0
  // CFO Data
  // December
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

  // DI
  // 2024
  // January
  let allTotalStudentJanuary24 = 0
  let allTotalBookCheckoutJanuary24 = 0
  let allTotalBookCheckinJanuary24 = 0
  let allNoBCOPerStudentJanuary24 = 0
  let allNoStudentBCOJanuary24 = 0
  let allPercentStudentBCOJanuary24 = 0
  let allNoStudentBCIJanuary24 = 0
  let allPercentStudentBCIJanuary24 = 0
  let allNoGirlBCOJanuary24 = 0
  let allPercentGirlBCOJanuary24 = 0
  let allNoBoyBCOJanuary24 = 0
  let allPercentBoyBCOJanuary24 = 0
  let allNoSchoolBCOJanuary24 = 0
  let allNoSchoolZeroBCOJanuary24 = 0
  // January

  // February
  let allTotalStudentFebruary24 = 0
  let allTotalBookCheckoutFebruary24 = 0
  let allTotalBookCheckinFebruary24 = 0
  let allNoBCOPerStudentFebruary24 = 0
  let allNoStudentBCOFebruary24 = 0
  let allPercentStudentBCOFebruary24 = 0
  let allNoStudentBCIFebruary24 = 0
  let allPercentStudentBCIFebruary24 = 0
  let allNoGirlBCOFebruary24 = 0
  let allPercentGirlBCOFebruary24 = 0
  let allNoBoyBCOFebruary24 = 0
  let allPercentBoyBCOFebruary24 = 0
  let allNoSchoolBCOFebruary24 = 0
  let allNoSchoolZeroBCOFebruary24 = 0
  // February

  // March
  let allTotalStudentMarch24 = 0
  let allTotalBookCheckoutMarch24 = 0
  let allTotalBookCheckinMarch24 = 0
  let allNoBCOPerStudentMarch24 = 0
  let allNoStudentBCOMarch24 = 0
  let allPercentStudentBCOMarch24 = 0
  let allNoStudentBCIMarch24 = 0
  let allPercentStudentBCIMarch24 = 0
  let allNoGirlBCOMarch24 = 0
  let allPercentGirlBCOMarch24 = 0
  let allNoBoyBCOMarch24 = 0
  let allPercentBoyBCOMarch24 = 0
  let allNoSchoolBCOMarch24 = 0
  let allNoSchoolZeroBCOMarch24 = 0
  // March

  // April
  let allTotalStudentApril24 = 0
  let allTotalBookCheckoutApril24 = 0
  let allTotalBookCheckinApril24 = 0
  let allNoBCOPerStudentApril24 = 0
  let allNoStudentBCOApril24 = 0
  let allPercentStudentBCOApril24 = 0
  let allNoStudentBCIApril24 = 0
  let allPercentStudentBCIApril24 = 0
  let allNoGirlBCOApril24 = 0
  let allPercentGirlBCOApril24 = 0
  let allNoBoyBCOApril24 = 0
  let allPercentBoyBCOApril24 = 0
  let allNoSchoolBCOApril24 = 0
  let allNoSchoolZeroBCOApril24 = 0
  // April

  // May
  let allTotalStudentMay24 = 0
  let allTotalBookCheckoutMay24 = 0
  let allTotalBookCheckinMay24 = 0
  let allNoBCOPerStudentMay24 = 0
  let allNoStudentBCOMay24 = 0
  let allPercentStudentBCOMay24 = 0
  let allNoStudentBCIMay24 = 0
  let allPercentStudentBCIMay24 = 0
  let allNoGirlBCOMay24 = 0
  let allPercentGirlBCOMay24 = 0
  let allNoBoyBCOMay24 = 0
  let allPercentBoyBCOMay24 = 0
  let allNoSchoolBCOMay24 = 0
  let allNoSchoolZeroBCOMay24 = 0
  // May

  // June
  let allTotalStudentJune24 = 0
  let allTotalBookCheckoutJune24 = 0
  let allTotalBookCheckinJune24 = 0
  let allNoBCOPerStudentJune24 = 0
  let allNoStudentBCOJune24 = 0
  let allPercentStudentBCOJune24 = 0
  let allNoStudentBCIJune24 = 0
  let allPercentStudentBCIJune24 = 0
  let allNoGirlBCOJune24 = 0
  let allPercentGirlBCOJune24 = 0
  let allNoBoyBCOJune24 = 0
  let allPercentBoyBCOJune24 = 0
  let allNoSchoolBCOJune24 = 0
  let allNoSchoolZeroBCOJune24 = 0
  // June

  // July
  let allTotalStudentJuly24 = 0
  let allTotalBookCheckoutJuly24 = 0
  let allTotalBookCheckinJuly24 = 0
  let allNoBCOPerStudentJuly24 = 0
  let allNoStudentBCOJuly24 = 0
  let allPercentStudentBCOJuly24 = 0
  let allNoStudentBCIJuly24 = 0
  let allPercentStudentBCIJuly24 = 0
  let allNoGirlBCOJuly24 = 0
  let allPercentGirlBCOJuly24 = 0
  let allNoBoyBCOJuly24 = 0
  let allPercentBoyBCOJuly24 = 0
  let allNoSchoolBCOJuly24 = 0
  let allNoSchoolZeroBCOJuly24 = 0
  // July

  // August
  let allTotalStudentAugust24 = 0
  let allTotalBookCheckoutAugust24 = 0
  let allTotalBookCheckinAugust24 = 0
  let allNoBCOPerStudentAugust24 = 0
  let allNoStudentBCOAugust24 = 0
  let allPercentStudentBCOAugust24 = 0
  let allNoStudentBCIAugust24 = 0
  let allPercentStudentBCIAugust24 = 0
  let allNoGirlBCOAugust24 = 0
  let allPercentGirlBCOAugust24 = 0
  let allNoBoyBCOAugust24 = 0
  let allPercentBoyBCOAugust24 = 0
  let allNoSchoolBCOAugust24 = 0
  let allNoSchoolZeroBCOAugust24 = 0
  // August

  // September
  let allTotalStudentSeptember24 = 0
  let allTotalBookCheckoutSeptember24 = 0
  let allTotalBookCheckinSeptember24 = 0
  let allNoBCOPerStudentSeptember24 = 0
  let allNoStudentBCOSeptember24 = 0
  let allPercentStudentBCOSeptember24 = 0
  let allNoStudentBCISeptember24 = 0
  let allPercentStudentBCISeptember24 = 0
  let allNoGirlBCOSeptember24 = 0
  let allPercentGirlBCOSeptember24 = 0
  let allNoBoyBCOSeptember24 = 0
  let allPercentBoyBCOSeptember24 = 0
  let allNoSchoolBCOSeptember24 = 0
  let allNoSchoolZeroBCOSeptember24 = 0
  // September

  // October
  let allTotalStudentOctober24 = 0
  let allTotalBookCheckoutOctober24 = 0
  let allTotalBookCheckinOctober24 = 0
  let allNoBCOPerStudentOctober24 = 0
  let allNoStudentBCOOctober24 = 0
  let allPercentStudentBCOOctober24 = 0
  let allNoStudentBCIOctober24 = 0
  let allPercentStudentBCIOctober24 = 0
  let allNoGirlBCOOctober24 = 0
  let allPercentGirlBCOOctober24 = 0
  let allNoBoyBCOOctober24 = 0
  let allPercentBoyBCOOctober24 = 0
  let allNoSchoolBCOOctober24 = 0
  let allNoSchoolZeroBCOOctober24 = 0
  // October

  // November
  let allTotalStudentNovember24 = 0
  let allTotalBookCheckoutNovember24 = 0
  let allTotalBookCheckinNovember24 = 0
  let allNoBCOPerStudentNovember24 = 0
  let allNoStudentBCONovember24 = 0
  let allPercentStudentBCONovember24 = 0
  let allNoStudentBCINovember24 = 0
  let allPercentStudentBCINovember24 = 0
  let allNoGirlBCONovember24 = 0
  let allPercentGirlBCONovember24 = 0
  let allNoBoyBCONovember24 = 0
  let allPercentBoyBCONovember24 = 0
  let allNoSchoolBCONovember24 = 0
  let allNoSchoolZeroBCONovember24 = 0
  // November

  // December
  let allTotalStudentDecember24 = 0
  let allTotalBookCheckoutDecember24 = 0
  let allTotalBookCheckinDecember24 = 0
  let allNoBCOPerStudentDecember24 = 0
  let allNoStudentBCODecember24 = 0
  let allPercentStudentBCODecember24 = 0
  let allNoStudentBCIDecember24 = 0
  let allPercentStudentBCIDecember24 = 0
  let allNoGirlBCODecember24 = 0
  let allPercentGirlBCODecember24 = 0
  let allNoBoyBCODecember24 = 0
  let allPercentBoyBCODecember24 = 0
  let allNoSchoolBCODecember24 = 0
  let allNoSchoolZeroBCODecember24 = 0
  // December
  // 2024
  // DI

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      await getAllBookCheckoutDI(console.log('get bookcheckout DI called'))

      pushReportData23(console.log('pushReportData23 called'))
      pushReportData24(console.log('pushReportData234 called'))

      // Chart
      pushSchoolBCOPerChildChartData()
      pushSchoolTotalBookCheckOutInChartData()
      pushSchoolNoStudentBCOInChartData()
      pushSchoolPercentStudentBCOInChartData()
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

      //   parseFloat(
      //   (parseFloat(kNoBCOPerStudentJan23) + parseFloat(uNoBCOPerStudentJan23)) / 2,
      // ).toFixed(2)
      cfoNoStudentBCOJan23 = kNoStudentBCOJan23 + uNoStudentBCOJan23
      cfoPercentStudentBCOJan23 = parseFloat(
        (parseFloat(kPercentStudentBCOJan23) + parseFloat(uPercentStudentBCOJan23)) / 2,
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

  const getAllBookCheckoutDI = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/di-book-checkouts', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBCODIData(response.data)

      // Filter Data
      // Trending
      // January
      // allTotalStudentJanuary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'June')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckoutJanuary24 = response.data
      //   .filter(
      //     (item) =>
      //       item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      //   )
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckinJanuary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'June')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allNoBCOPerStudentJanuary24 = (
      //   response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'June')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCOJanuary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'June')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCOJanuary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'June')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCIJanuary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'June')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCIJanuary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'June')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoGirlBCOJanuary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'June')
      //   .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentGirlBCOJanuary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'June')
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirl)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoBoyBCOJanuary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'June')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentBoyBCOJanuary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'June')
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoy)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoSchoolBCOJanuary24 = response.data.filter(
      //   (item) =>
      //     item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      // ).length

      // allNoSchoolZeroBCOJanuary24 = response.data.filter(
      //   (item) =>
      //     item.year === '2024' && item.month === 'June' && item.schoolTotalNoStudentBC === 0,
      // ).length
      // January

      // February
      // allTotalStudentFebruary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'February')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckoutFebruary24 = response.data
      //   .filter(
      //     (item) =>
      //       item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'February',
      //   )
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckinFebruary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'February')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allNoBCOPerStudentFebruary24 = (
      //   response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 &&
      //         item.year === '2024' &&
      //         item.month === 'February',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'February')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCOFebruary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'February')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCOFebruary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 &&
      //         item.year === '2024' &&
      //         item.month === 'February',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'February')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCIFebruary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'February')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCIFebruary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 &&
      //         item.year === '2024' &&
      //         item.month === 'February',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'February')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoGirlBCOFebruary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'February')
      //   .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentGirlBCOFebruary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 &&
      //         item.year === '2024' &&
      //         item.month === 'February',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'February')
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirl)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoBoyBCOFebruary24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'February')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentBoyBCOFebruary24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 &&
      //         item.year === '2024' &&
      //         item.month === 'February',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'February')
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoy)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoSchoolBCOFebruary24 = response.data.filter(
      //   (item) =>
      //     item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'February',
      // ).length

      // allNoSchoolZeroBCOFebruary24 = response.data.filter(
      //   (item) =>
      //     item.year === '2024' && item.month === 'February' && item.schoolTotalNoStudentBC === 0,
      // ).length
      // February

      // March
      // allTotalStudentMarch24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'June')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckoutMarch24 = response.data
      //   .filter(
      //     (item) =>
      //       item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
      //   )
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckinMarch24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'July')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allNoBCOPerStudentMarch24 = (
      //   response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'March',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'March')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCOMarch24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'March')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCOMarch24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'March',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'March')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCIMarch24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'March')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCIMarch24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'March',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'March')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoGirlBCOMarch24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'March')
      //   .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentGirlBCOMarch24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'March',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'March')
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirl)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoBoyBCOMarch24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'March')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentBoyBCOMarch24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'March',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'March')
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoy)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoSchoolBCOMarch24 = response.data.filter(
      //   (item) =>
      //     item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'March',
      // ).length

      // allNoSchoolZeroBCOMarch24 = response.data.filter(
      //   (item) =>
      //     item.year === '2024' && item.month === 'March' && item.schoolTotalNoStudentBC === 0,
      // ).length
      // March

      // April
      // allTotalStudentApril24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'May')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckoutApril24 = response.data
      //   .filter(
      //     (item) =>
      //       item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'April',
      //   )
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckinApril24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'April')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allNoBCOPerStudentApril24 = (
      //   response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'April',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'April')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCOApril24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'April')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCOApril24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'April',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'April')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCIApril24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'April')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCIApril24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'April',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'April')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoGirlBCOApril24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'April')
      //   .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentGirlBCOApril24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'April',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'April')
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirl)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoBoyBCOApril24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'April')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentBoyBCOApril24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'April',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'April')
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoy)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoSchoolBCOApril24 = response.data.filter(
      //   (item) =>
      //     item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'April',
      // ).length

      // allNoSchoolZeroBCOApril24 = response.data.filter(
      //   (item) =>
      //     item.year === '2024' && item.month === 'April' && item.schoolTotalNoStudentBC === 0,
      // ).length
      // April

      // May
      // allTotalStudentMay24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'May')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckoutMay24 = response.data
      //   .filter(
      //     (item) =>
      //       item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'May',
      //   )
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allTotalBookCheckinMay24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'May')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allNoBCOPerStudentMay24 = (
      //   response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'May',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'May')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCOMay24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'May')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCOMay24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'May',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'May')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoStudentBCIMay24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'May')
      //   .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentStudentBCIMay24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'May',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'May')
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoGirlBCOMay24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'May')
      //   .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentGirlBCOMay24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'May',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'May')
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirl)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoBoyBCOMay24 = response.data
      //   .filter((item) => item.year === '2024' && item.month === 'May')
      //   .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //   .reduce(function (acc, value) {
      //     return acc + value
      //   })

      // allPercentBoyBCOMay24 = (
      //   (response.data
      //     .filter(
      //       (item) =>
      //         item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'May',
      //     )
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.year === '2024' && item.month === 'May')
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoy)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      // allNoSchoolBCOMay24 = response.data.filter(
      //   (item) => item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'May',
      // ).length

      // allNoSchoolZeroBCOMay24 = response.data.filter(
      //   (item) => item.year === '2024' && item.month === 'May' && item.schoolTotalNoStudentBC === 0,
      // ).length
      // May

      // June
      allTotalStudentJune24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckoutJune24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckinJune24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allNoBCOPerStudentJune24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'June')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCOJune24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCOJune24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'June')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCIJune24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCIJune24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'June')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoGirlBCOJune24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentGirlBCOJune24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'June')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoBoyBCOJune24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentBoyBCOJune24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'June')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoSchoolBCOJune24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'June',
      ).length

      allNoSchoolZeroBCOJune24 = response.data.filter(
        (item) =>
          item.year === '2024' && item.month === 'June' && item.schoolTotalNoStudentBC === 0,
      ).length
      // June

      // July
      allTotalStudentJuly24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'July')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckoutJuly24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckinJuly24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'July')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allNoBCOPerStudentJuly24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'July')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCOJuly24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'July')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCOJuly24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'July')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCIJuly24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'July')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCIJuly24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'July')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoGirlBCOJuly24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'July')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentGirlBCOJuly24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'July')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoBoyBCOJuly24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'July')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentBoyBCOJuly24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'July')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoSchoolBCOJuly24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'July',
      ).length

      allNoSchoolZeroBCOJuly24 = response.data.filter(
        (item) =>
          item.year === '2024' && item.month === 'July' && item.schoolTotalNoStudentBC === 0,
      ).length
      // July

      // August
      allTotalStudentAugust24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'August')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckoutAugust24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckinAugust24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'August')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allNoBCOPerStudentAugust24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'August')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCOAugust24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'August')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCOAugust24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'August')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCIAugust24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'August')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCIAugust24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'August')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoGirlBCOAugust24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'August')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentGirlBCOAugust24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'August')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoBoyBCOAugust24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'August')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentBoyBCOAugust24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'August')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoSchoolBCOAugust24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'August',
      ).length

      allNoSchoolZeroBCOAugust24 = response.data.filter(
        (item) =>
          item.year === '2024' && item.month === 'August' && item.schoolTotalNoStudentBC === 0,
      ).length
      // August

      // September
      allTotalStudentSeptember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'September')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckoutSeptember24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckinSeptember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'September')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allNoBCOPerStudentSeptember24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'September')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCOSeptember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'September')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCOSeptember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'September')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCISeptember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'September')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCISeptember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'September')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoGirlBCOSeptember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'September')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentGirlBCOSeptember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'September')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoBoyBCOSeptember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'September')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentBoyBCOSeptember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'September')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoSchoolBCOSeptember24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'September',
      ).length

      allNoSchoolZeroBCOSeptember24 = response.data.filter(
        (item) =>
          item.year === '2024' && item.month === 'September' && item.schoolTotalNoStudentBC === 0,
      ).length
      // September

      // October
      allTotalStudentOctober24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'October')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckoutOctober24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckinOctober24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'October')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allNoBCOPerStudentOctober24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'October')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCOOctober24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'October')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCOOctober24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'October')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCIOctober24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'October')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCIOctober24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'October')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoGirlBCOOctober24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'October')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentGirlBCOOctober24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'October')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoBoyBCOOctober24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'October')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentBoyBCOOctober24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'October')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoSchoolBCOOctober24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'October',
      ).length

      allNoSchoolZeroBCOOctober24 = response.data.filter(
        (item) =>
          item.year === '2024' && item.month === 'October' && item.schoolTotalNoStudentBC === 0,
      ).length
      // October

      // November
      allTotalStudentNovember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'November')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckoutNovember24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckinNovember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'November')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allNoBCOPerStudentNovember24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'November')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCONovember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'November')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCONovember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'November')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCINovember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'November')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCINovember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'November')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoGirlBCONovember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'November')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentGirlBCONovember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'November')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoBoyBCONovember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'November')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentBoyBCONovember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'November')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoSchoolBCONovember24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'November',
      ).length

      allNoSchoolZeroBCONovember24 = response.data.filter(
        (item) =>
          item.year === '2024' && item.month === 'November' && item.schoolTotalNoStudentBC === 0,
      ).length
      // November

      // December
      allTotalStudentDecember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'December')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckoutDecember24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allTotalBookCheckinDecember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'December')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allNoBCOPerStudentDecember24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'December')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCODecember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'December')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCODecember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'December')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoStudentBCIDecember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'December')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentStudentBCIDecember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'December')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoGirlBCODecember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'December')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentGirlBCODecember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'December')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoBoyBCODecember24 = response.data
        .filter((item) => item.year === '2024' && item.month === 'December')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      allPercentBoyBCODecember24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.year === '2024' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.year === '2024' && item.month === 'December')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      allNoSchoolBCODecember24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.year === '2024' && item.month === 'December',
      ).length

      allNoSchoolZeroBCODecember24 = response.data.filter(
        (item) =>
          item.year === '2024' && item.month === 'December' && item.schoolTotalNoStudentBC === 0,
      ).length
      // December

      // Trending
      // Filter Data

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
        june: cfoTotalStudentJun23,
        july: cfoTotalStudentJul23,
        august: cfoTotalStudentAug23,
        september: cfoTotalStudentSep23,
        october: cfoTotalStudentOct23,
        november: cfoTotalStudentNov23,
        december: cfoTotalStudentDec23,
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
        june: cfoTotalBookCheckoutJun23,
        july: cfoTotalBookCheckoutJul23,
        august: cfoTotalBookCheckoutAug23,
        september: cfoTotalBookCheckoutSep23,
        october: cfoTotalBookCheckoutOct23,
        november: cfoTotalBookCheckoutNov23,
        december: cfoTotalBookCheckoutDec23,
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
        june: cfoTotalBookCheckinJun23,
        july: cfoTotalBookCheckinJul23,
        august: cfoTotalBookCheckinAug23,
        september: cfoTotalBookCheckinSep23,
        october: cfoTotalBookCheckinOct23,
        november: cfoTotalBookCheckinNov23,
        december: cfoTotalBookCheckinDec23,
        remark: '',
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        january: cfoNoBCOPerStudentJan23,
        february: cfoNoBCOPerStudentFeb23,
        march: cfoNoBCOPerStudentMar23,
        april: cfoNoBCOPerStudentApr23,
        may: cfoNoBCOPerStudentMay23,
        june: cfoNoBCOPerStudentJun23,
        july: cfoNoBCOPerStudentJul23,
        august: cfoNoBCOPerStudentAug23,
        september: cfoNoBCOPerStudentSep23,
        october: cfoNoBCOPerStudentOct23,
        november: cfoNoBCOPerStudentNov23,
        december: cfoNoBCOPerStudentDec23,
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
        june: cfoNoStudentBCOJun23,
        july: cfoNoStudentBCOJul23,
        august: cfoNoStudentBCOAug23,
        september: cfoNoStudentBCOSep23,
        october: cfoNoStudentBCOOct23,
        november: cfoNoStudentBCONov23,
        december: cfoNoStudentBCODec23,
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
        june: cfoPercentStudentBCOJun23,
        july: cfoPercentStudentBCOJul23,
        august: cfoPercentStudentBCOAug23,
        september: cfoPercentStudentBCOSep23,
        october: cfoPercentStudentBCOOct23,
        november: cfoPercentStudentBCONov23,
        december: cfoPercentStudentBCODec23,
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
        june: cfoNoStudentBCIJun23,
        july: cfoNoStudentBCIJul23,
        august: cfoNoStudentBCIAug23,
        september: cfoNoStudentBCISep23,
        october: cfoNoStudentBCIOct23,
        november: cfoNoStudentBCINov23,
        december: cfoNoStudentBCIDec23,
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
        june: cfoPercentStudentBCIJun23,
        july: cfoPercentStudentBCIJul23,
        august: cfoPercentStudentBCIAug23,
        september: cfoPercentStudentBCISep23,
        october: cfoPercentStudentBCIOct23,
        november: cfoPercentStudentBCINov23,
        december: cfoPercentStudentBCIDec23,
        remark: '',
      },
    ]
    console.log('reportObject', reportObject23)
    setReportData23(reportObject23)
  }

  const pushReportData24 = () => {
    const reportObject24 = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        january: allTotalStudentJanuary24,
        february: allTotalStudentFebruary24,
        march: allTotalStudentMarch24,
        april: allTotalStudentApril24,
        may: allTotalStudentMay24,
        june: allTotalStudentJune24,
        july: allTotalStudentJuly24,
        august: allTotalStudentAugust24,
        september: allTotalStudentSeptember24,
        october: allTotalStudentOctober24,
        november: allTotalStudentNovember24,
        december: allTotalStudentDecember24,
        remark: '',
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        january: allTotalBookCheckoutJanuary24,
        february: allTotalBookCheckoutFebruary24,
        march: allTotalBookCheckoutMarch24,
        april: allTotalBookCheckoutApril24,
        may: allTotalBookCheckoutMay24,
        june: allTotalBookCheckoutJune24,
        july: allTotalBookCheckoutJuly24,
        august: allTotalBookCheckoutAugust24,
        september: allTotalBookCheckoutSeptember24,
        october: allTotalBookCheckoutOctober24,
        november: allTotalBookCheckoutNovember24,
        december: allTotalBookCheckoutDecember24,
        remark: '',
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        january: allTotalBookCheckinJanuary24,
        february: allTotalBookCheckinFebruary24,
        march: allTotalBookCheckinMarch24,
        april: allTotalBookCheckinApril24,
        may: allTotalBookCheckinMay24,
        june: allTotalBookCheckinJune24,
        july: allTotalBookCheckinJuly24,
        august: allTotalBookCheckinAugust24,
        september: allTotalBookCheckinSeptember24,
        october: allTotalBookCheckinOctober24,
        november: allTotalBookCheckinNovember24,
        december: allTotalBookCheckinDecember24,
        remark: '',
      },
      {
        sl: 4,
        area: 'Average Book Checkout Per Child',
        january: allNoBCOPerStudentJanuary24,
        february: allNoBCOPerStudentFebruary24,
        march: allNoBCOPerStudentMarch24,
        april: allNoBCOPerStudentApril24,
        may: allNoBCOPerStudentMay24,
        june: allNoBCOPerStudentJune24,
        july: allNoBCOPerStudentJuly24,
        august: allNoBCOPerStudentAugust24,
        september: allNoBCOPerStudentSeptember24,
        october: allNoBCOPerStudentOctober24,
        november: allNoBCOPerStudentNovember24,
        december: allNoBCOPerStudentDecember24,
        remark: '',
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        january: allNoStudentBCOJanuary24,
        february: allNoStudentBCOFebruary24,
        march: allNoStudentBCOMarch24,
        april: allNoStudentBCOApril24,
        may: allNoStudentBCOMay24,
        june: allNoStudentBCOJune24,
        july: allNoStudentBCOJuly24,
        august: allNoStudentBCOAugust24,
        september: allNoStudentBCOSeptember24,
        october: allNoStudentBCOOctober24,
        november: allNoStudentBCONovember24,
        december: allNoStudentBCODecember24,
        remark: '',
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        january: allPercentStudentBCOJanuary24,
        february: allPercentStudentBCOFebruary24,
        march: allPercentStudentBCOMarch24,
        april: allPercentStudentBCOApril24,
        may: allPercentStudentBCOMay24,
        june: allPercentStudentBCOJune24,
        july: allPercentStudentBCOJuly24,
        august: allPercentStudentBCOAugust24,
        september: allPercentStudentBCOSeptember24,
        october: allPercentStudentBCOOctober24,
        november: allPercentStudentBCONovember24,
        december: allPercentStudentBCODecember24,
        remark: '',
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        january: allNoStudentBCIJanuary24,
        february: allNoStudentBCIFebruary24,
        march: allNoStudentBCIMarch24,
        april: allNoStudentBCIApril24,
        may: allNoStudentBCIMay24,
        june: allNoStudentBCIJune24,
        july: allNoStudentBCIJuly24,
        august: allNoStudentBCIAugust24,
        september: allNoStudentBCISeptember24,
        october: allNoStudentBCIOctober24,
        november: allNoStudentBCINovember24,
        december: allNoStudentBCIDecember24,
        remark: '',
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        january: allPercentStudentBCIJanuary24,
        february: allPercentStudentBCIFebruary24,
        march: allPercentStudentBCIMarch24,
        april: allPercentStudentBCIApril24,
        may: allPercentStudentBCIMay24,
        june: allPercentStudentBCIJune24,
        july: allPercentStudentBCIJuly24,
        august: allPercentStudentBCIAugust24,
        september: allPercentStudentBCISeptember24,
        october: allPercentStudentBCIOctober24,
        november: allPercentStudentBCINovember24,
        december: allPercentStudentBCIDecember24,
        remark: '',
      },
    ]
    console.log('reportObject24', reportObject24)
    setReportData24(reportObject24)
  }

  // Push School BCO analysis chart data
  const pushSchoolBCOPerChildChartData = () => {
    setSchoolBCOPerChildChartData({
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
          label: 'Book checkout per child',
          borderColor: '#264a2f',
          backgroundColor: [
            '#ff3333',
            '#f59b42',
            '#d1f542',
            '#5df542',
            '#42f5d4',
            '#427bf5',
            '#7b42f5',
            '#f54266',
            '#d4bcc1',
            '#c9bcd4',
            '#4e6769',
            '#ccb889',
            '',
          ],
          data: [
            allNoBCOPerStudentJanuary24,
            allNoBCOPerStudentFebruary24,
            allNoBCOPerStudentMarch24,
            allNoBCOPerStudentApril24,
            allNoBCOPerStudentMay24,
            allNoBCOPerStudentJune24,
            allNoBCOPerStudentJuly24,
            allNoBCOPerStudentAugust24,
            allNoBCOPerStudentSeptember24,
            allNoBCOPerStudentOctober24,
            allNoBCOPerStudentNovember24,
            allNoBCOPerStudentDecember24,
          ],
        },
      ],
    })
  }

  const pushSchoolTotalBookCheckOutInChartData = () => {
    setSchoolTotalBookCheckOutInChartData({
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
          label: 'Book Checkout',
          backgroundColor: '#ff3333',
          borderColor: '#ff3333',
          pointBackgroundColor: '#ff3333',
          pointBorderColor: '#fff',
          data: [
            allTotalBookCheckoutJanuary24,
            allTotalBookCheckoutFebruary24,
            allTotalBookCheckoutMarch24,
            allTotalBookCheckoutApril24,
            allTotalBookCheckoutMay24,
            allTotalBookCheckoutJune24,
            allTotalBookCheckoutJuly24,
            allTotalBookCheckoutAugust24,
            allTotalBookCheckoutSeptember24,
            allTotalBookCheckoutOctober24,
            allTotalBookCheckoutNovember24,
            allTotalBookCheckoutDecember24,
          ],
        },
        {
          label: 'Book Checkin',
          backgroundColor: '#03fc6f',
          borderColor: '#03fc6f',
          pointBackgroundColor: '#03fc6f',
          pointBorderColor: '#fff',
          data: [
            allTotalBookCheckinJanuary24,
            allTotalBookCheckinFebruary24,
            allTotalBookCheckinMarch24,
            allTotalBookCheckinApril24,
            allTotalBookCheckinMay24,
            allTotalBookCheckinJune24,
            allTotalBookCheckinJuly24,
            allTotalBookCheckinAugust24,
            allTotalBookCheckinSeptember24,
            allTotalBookCheckinOctober24,
            allTotalBookCheckinNovember24,
            allTotalBookCheckinDecember24,
          ],
        },
      ],
    })
  }

  const pushSchoolNoStudentBCOInChartData = () => {
    setSchoolNoStudentBCOInChartData({
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
          label: 'No of Student Checkout',
          backgroundColor: '#0380fc',
          borderColor: '#0380fc',
          pointBackgroundColor: '#0380fc',
          pointBorderColor: '#fff',
          data: [
            allNoStudentBCOJanuary24,
            allNoStudentBCOFebruary24,
            allNoStudentBCOMarch24,
            allNoStudentBCOApril24,
            allNoStudentBCOMay24,
            allNoStudentBCOJune24,
            allNoStudentBCOJuly24,
            allNoStudentBCOAugust24,
            allNoStudentBCOSeptember24,
            allNoStudentBCOOctober24,
            allNoStudentBCONovember24,
            allNoStudentBCODecember24,
          ],
        },
        {
          label: 'No of Student Checkin',
          backgroundColor: '#fc03ce',
          borderColor: '#fc03ce',
          pointBackgroundColor: '#fc03ce',
          pointBorderColor: '#fff',
          data: [
            allNoStudentBCIJanuary24,
            allNoStudentBCIFebruary24,
            allNoStudentBCIMarch24,
            allNoStudentBCIApril24,
            allNoStudentBCIMay24,
            allNoStudentBCIJune24,
            allNoStudentBCIJuly24,
            allNoStudentBCIAugust24,
            allNoStudentBCISeptember24,
            allNoStudentBCIOctober24,
            allNoStudentBCINovember24,
            allNoStudentBCIDecember24,
          ],
        },
      ],
    })
  }

  const pushSchoolPercentStudentBCOInChartData = () => {
    setSchoolPercentStudentBCOInChartData({
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
          label: 'Percent of Student Checkout',
          backgroundColor: '#03fc1c',
          borderColor: '#03fc1c',
          pointBackgroundColor: '#03fc1c',
          pointBorderColor: '#fff',
          data: [
            allPercentStudentBCOJanuary24,
            allPercentStudentBCOFebruary24,
            allPercentStudentBCOMarch24,
            allPercentStudentBCOApril24,
            allPercentStudentBCOMay24,
            allPercentStudentBCOJune24,
            allPercentStudentBCOJuly24,
            allPercentStudentBCOAugust24,
            allPercentStudentBCOSeptember24,
            allPercentStudentBCOOctober24,
            allPercentStudentBCONovember24,
            allPercentStudentBCODecember24,
          ],
        },
        {
          label: 'Percent of Student Checkin',
          backgroundColor: '#a503fc',
          borderColor: '#a503fc',
          pointBackgroundColor: '#a503fc',
          pointBorderColor: '#fff',
          data: [
            allPercentStudentBCIJanuary24,
            allPercentStudentBCIFebruary24,
            allPercentStudentBCIMarch24,
            allPercentStudentBCIApril24,
            allPercentStudentBCIMay24,
            allPercentStudentBCIJune24,
            allPercentStudentBCIJuly24,
            allPercentStudentBCIAugust24,
            allPercentStudentBCISeptember24,
            allPercentStudentBCIOctober24,
            allPercentStudentBCINovember24,
            allPercentStudentBCIDecember24,
          ],
        },
      ],
    })
  }
  // Push School BCO analysis chart data

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
        <CCol sm={3} lg={3}>
          <CLink href="/bco/di-mfo">
            <CCard className="mb-3">
              <CCardHeader>
                <strong>MFO Analysis</strong>
              </CCardHeader>
              <CCardBody></CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="/bco/di-nrfo">
            <CCard className="mb-3">
              <CCardHeader>
                <strong>NrFO Analysis</strong>
              </CCardHeader>
              <CCardBody></CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="*">
            <CCard className="mb-3">
              <CCardHeader>
                <strong>JFO Analysis</strong>
              </CCardHeader>
              <CCardBody></CCardBody>
            </CCard>
          </CLink>
        </CCol>
        <CCol sm={3} lg={3}>
          <CLink href="*">
            <CCard className="mb-3">
              <CCardHeader>
                <strong>HFO Analysis</strong>
              </CCardHeader>
              <CCardBody></CCardBody>
            </CCard>
          </CLink>
        </CCol>
      </CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>BCO Analysis-2024 All FO</strong>
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
                { title: 'October', field: 'october' },
                { title: 'November', field: 'november' },
                { title: 'December', field: 'december' },
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
              data={reportData24}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Average Book Checkout Per Student-2024</strong>
          </CCardHeader>
          <CCardBody>
            <CChart
              type="line"
              data={schoolBCOPerChildChartData}
              labels="months"
              width="400px"
              height="400px"
              options={{ maintainAspectRatio: false }}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Number of Book Checkout Checkin-2024</strong>
          </CCardHeader>
          <CCardBody>
            <CChart
              type="line"
              data={schoolTotalBookCheckOutInChartData}
              labels="months"
              width="400px"
              height="400px"
              options={{ maintainAspectRatio: false }}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Number of Student Checkout Checkin-2024</strong>
          </CCardHeader>
          <CCardBody>
            <CChart
              type="line"
              data={schoolNoStudentBCOInChartData}
              labels="months"
              width="400px"
              height="400px"
              options={{ maintainAspectRatio: false }}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Percent of Student Checkout Checkin-2024</strong>
          </CCardHeader>
          <CCardBody>
            <CChart
              type="line"
              data={schoolPercentStudentBCOInChartData}
              labels="months"
              width="400px"
              height="400px"
              options={{ maintainAspectRatio: false }}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All BCO Data-2024</strong>
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allBCODIData.length + ' BCO Data'}
              columns={[
                { title: 'school', field: 'school' },
                {
                  title: 'date',
                  field: 'date',
                  type: 'date',
                  sorting: 'true',
                },
                { title: 'month', field: 'month', sorting: 'true' },
                { title: 'year', field: 'year', sorting: 'true' },
                { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                { title: 'district', field: 'district' },
                { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                { title: 'visitor', field: 'visitor' },

                { title: 'visitorOffice', field: 'visitorOffice' },
                {
                  title: 'headTeacher',
                  field: 'headTeacher',
                },
                { title: 'lpo', field: 'lpo', type: 'string' },
                { title: 'lpoName', field: 'lpoName', type: 'string' },
                {
                  title: 'lf',
                  field: 'lf',
                  type: 'string',
                },
                { title: 'lfName', field: 'lfName', type: 'string' },
                { title: 'note', field: 'note', type: 'string' },
                { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                { title: 'schoolTotalNoStudentBCIn', field: 'schoolTotalNoStudentBCIn' },

                { title: 'schoolTotalNoBookBCIn', field: 'schoolTotalNoBookBCIn' },

                { title: 'schoolTotalNoSpStudent', field: 'schoolTotalNoSpStudent' },

                { title: 'schoolTotalNoSpStudentBC', field: 'schoolTotalNoSpStudentBC' },

                { title: 'schoolTotalNoSpBookBC', field: 'schoolTotalNoSpBookBC' },

                { title: 'schoolTotalNoSpStudentBCIn', field: 'schoolTotalNoSpStudentBCIn' },

                { title: 'schoolTotalNoSpBookBCIn', field: 'schoolTotalNoSpBookBCIn' },

                { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy' },
                { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl' },
                { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal' },

                { title: 'priPrimaryNoSpBoyBC', field: 'priPrimaryNoSpBoyBC' },
                { title: 'priPrimaryNoSpGirlBC', field: 'priPrimaryNoSpGirlBC' },
                { title: 'priPrimaryNoSpTotalBC', field: 'priPrimaryNoSpTotalBC' },

                {
                  title: 'priPrimaryNoBookSpBoyBC',
                  field: 'priPrimaryNoBookSpBoyBC',
                },
                {
                  title: 'priPrimaryNoBookSpGirlBC',
                  field: 'priPrimaryNoBookSpGirlBC',
                },
                {
                  title: 'priPrimaryNoBookSpTotalBC',
                  field: 'priPrimaryNoBookSpTotalBC',
                },

                { title: 'classOneBoy', field: 'classOneBoy' },
                { title: 'classOneGirl', field: 'classOneGirl' },
                { title: 'classOneTotal', field: 'classOneTotal' },

                { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                { title: 'classOneSpBoy', field: 'classOneSpBoy' },
                { title: 'classOneSpGirl', field: 'classOneSpGirl' },
                { title: 'classOneSpTotal', field: 'classOneSpTotal' },

                { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC' },
                { title: 'classOneNoSpGirlBC', field: 'classOneNoSpGirlBC' },
                { title: 'classOneNoSpTotalBC', field: 'classOneNoSpTotalBC' },

                {
                  title: 'classOneNoBookSpBoyBC',
                  field: 'classOneNoBookSpBoyBC',
                },
                {
                  title: 'classOneNoBookSpGirlBC',
                  field: 'classOneNoBookSpGirlBC',
                },
                {
                  title: 'classOneNoBookSpTotalBC',
                  field: 'classOneNoBookSpTotalBC',
                },

                { title: 'classTwoBoy', field: 'classTwoBoy' },
                { title: 'classTwoGirl', field: 'classTwoGirl' },
                { title: 'classTwoTotal', field: 'classTwoTotal' },

                { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                { title: 'classTwoSpBoy', field: 'classTwoSpBoy' },
                { title: 'classTwoSpGirl', field: 'classTwoSpGirl' },
                { title: 'classTwoSpTotal', field: 'classTwoSpTotal' },

                { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC' },
                { title: 'classTwoNoSpGirlBC', field: 'classTwoNoSpGirlBC' },
                { title: 'classTwoNoSpTotalBC', field: 'classTwoNoSpTotalBC' },

                {
                  title: 'classTwoNoBookSpBoyBC',
                  field: 'classTwoNoBookSpBoyBC',
                },
                {
                  title: 'classTwoNoBookSpGirlBC',
                  field: 'classTwoNoBookSpGirlBC',
                },
                {
                  title: 'classTwoNoBookSpTotalBC',
                  field: 'classTwoNoBookSpTotalBC',
                },

                { title: 'classThreeBoy', field: 'classThreeBoy' },
                { title: 'classThreeGirl', field: 'classThreeGirl' },
                { title: 'classThreeTotal', field: 'classThreeTotal' },

                { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                { title: 'classThreeSpBoy', field: 'classThreeSpBoy' },
                { title: 'classThreeSpGirl', field: 'classThreeSpGirl' },
                { title: 'classThreeSpTotal', field: 'classThreeSpTotal' },

                { title: 'classThreeNoSpBoyBC', field: 'classThreeNoSpBoyBC' },
                { title: 'classThreeNoSpGirlBC', field: 'classThreeNoSpGirlBC' },
                { title: 'classThreeNoSpTotalBC', field: 'classThreeNoSpTotalBC' },

                {
                  title: 'classThreeNoBookSpBoyBC',
                  field: 'classThreeNoBookSpBoyBC',
                },
                {
                  title: 'classThreeNoBookSpGirlBC',
                  field: 'classThreeNoBookSpGirlBC',
                },
                {
                  title: 'classThreeNoBookSpTotalBC',
                  field: 'classThreeNoBookSpTotalBC',
                },

                { title: 'classFourBoy', field: 'classFourBoy' },
                { title: 'classFourGirl', field: 'classFourGirl' },
                { title: 'classFourTotal', field: 'classFourTotal' },

                { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                { title: 'classFourSpBoy', field: 'classFourSpBoy' },
                { title: 'classFourSpGirl', field: 'classFourSpGirl' },
                { title: 'classFourSpTotal', field: 'classFourSpTotal' },

                { title: 'classFourNoSpBoyBC', field: 'classFourNoSpBoyBC' },
                { title: 'classFourNoSpGirlBC', field: 'classFourNoSpGirlBC' },
                { title: 'classFourNoSpTotalBC', field: 'classFourNoSpTotalBC' },

                {
                  title: 'classFourNoBookSpBoyBC',
                  field: 'classFourNoBookSpBoyBC',
                },
                {
                  title: 'classFourNoBookSpGirlBC',
                  field: 'classFourNoBookSpGirlBC',
                },
                {
                  title: 'classFourNoBookSpTotalBC',
                  field: 'classFourNoBookSpTotalBC',
                },

                { title: 'classFiveBoy', field: 'classFiveBoy' },
                { title: 'classFiveGirl', field: 'classFiveGirl' },
                { title: 'classFiveTotal', field: 'classFiveTotal' },

                { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },

                { title: 'classFiveSpBoy', field: 'classFiveSpBoy' },
                { title: 'classFiveSpGirl', field: 'classFiveSpGirl' },
                { title: 'classFiveSpTotal', field: 'classFiveSpTotal' },

                { title: 'classFiveNoSpBoyBC', field: 'classFiveNoSpBoyBC' },
                { title: 'classFiveNoSpGirlBC', field: 'classFiveNoSpGirlBC' },
                { title: 'classFiveNoSpTotalBC', field: 'classFiveNoSpTotalBC' },

                {
                  title: 'classFiveNoBookSpBoyBC',
                  field: 'classFiveNoBookSpBoyBC',
                },
                {
                  title: 'classFiveNoBookSpGirlBC',
                  field: 'classFiveNoBookSpGirlBC',
                },
                {
                  title: 'classFiveNoBookSpTotalBC',
                  field: 'classFiveNoBookSpTotalBC',
                },

                { title: 'priPrimaryNoBoyBCIn', field: 'priPrimaryNoBoyBCIn' },
                { title: 'priPrimaryNoGirlBCIn', field: 'priPrimaryNoGirlBCIn' },
                { title: 'priPrimaryNoTotalBCIn', field: 'priPrimaryNoTotalBCIn' },

                { title: 'priPrimaryNoBookBoyBCIn', field: 'priPrimaryNoBookBoyBCIn' },
                { title: 'priPrimaryNoBookGirlBCIn', field: 'priPrimaryNoBookGirlBCIn' },
                {
                  title: 'priPrimaryNoBookTotalBCIn',
                  field: 'priPrimaryNoBookTotalBCIn',
                },

                { title: 'priPrimaryNoSpBoyBCIn', field: 'priPrimaryNoSpBoyBCIn' },
                {
                  title: 'priPrimaryNoSpGirlBCIn',
                  field: 'priPrimaryNoSpGirlBCIn',
                },
                {
                  title: 'priPrimaryNoSpTotalBCIn',
                  field: 'priPrimaryNoSpTotalBCIn',
                },

                {
                  title: 'priPrimaryNoBookSpBoyBCIn',
                  field: 'priPrimaryNoBookSpBoyBCIn',
                },
                {
                  title: 'priPrimaryNoBookSpGirlBCIn',
                  field: 'priPrimaryNoBookSpGirlBCIn',
                },
                {
                  title: 'priPrimaryNoBookSpTotalBCIn',
                  field: 'priPrimaryNoBookSpTotalBCIn',
                },

                { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn' },
                { title: 'classOneNoGirlBCIn', field: 'classOneNoGirlBCIn' },
                { title: 'classOneNoTotalBCIn', field: 'classOneNoTotalBCIn' },

                { title: 'classOneNoBookBoyBCIn', field: 'classOneNoBookBoyBCIn' },
                { title: 'classOneNoBookGirlBCIn', field: 'classOneNoBookGirlBCIn' },
                {
                  title: 'classOneNoBookTotalBCIn',
                  field: 'classOneNoBookTotalBCIn',
                },

                { title: 'classOneNoSpBoyBCIn', field: 'classOneNoSpBoyBCIn' },
                {
                  title: 'classOneNoSpGirlBCIn',
                  field: 'classOneNoSpGirlBCIn',
                },
                {
                  title: 'classOneNoSpTotalBCIn',
                  field: 'classOneNoSpTotalBCIn',
                },

                {
                  title: 'classOneNoBookSpBoyBCIn',
                  field: 'classOneNoBookSpBoyBCIn',
                },
                {
                  title: 'classOneNoBookSpGirlBCIn',
                  field: 'classOneNoBookSpGirlBCIn',
                },
                {
                  title: 'classOneNoBookSpTotalBCIn',
                  field: 'classOneNoBookSpTotalBCIn',
                },

                { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn' },
                { title: 'classTwoNoGirlBCIn', field: 'classTwoNoGirlBCIn' },
                { title: 'classTwoNoTotalBCIn', field: 'classTwoNoTotalBCIn' },

                { title: 'classTwoNoBookBoyBCIn', field: 'classTwoNoBookBoyBCIn' },
                { title: 'classTwoNoBookGirlBCIn', field: 'classTwoNoBookGirlBCIn' },
                {
                  title: 'classTwoNoBookTotalBCIn',
                  field: 'classTwoNoBookTotalBCIn',
                },

                { title: 'classTwoNoSpBoyBCIn', field: 'classTwoNoSpBoyBCIn' },
                {
                  title: 'classTwoNoSpGirlBCIn',
                  field: 'classTwoNoSpGirlBCIn',
                },
                {
                  title: 'classTwoNoSpTotalBCIn',
                  field: 'classTwoNoSpTotalBCIn',
                },

                {
                  title: 'classTwoNoBookSpBoyBCIn',
                  field: 'classTwoNoBookSpBoyBCIn',
                },
                {
                  title: 'classTwoNoBookSpGirlBCIn',
                  field: 'classTwoNoBookSpGirlBCIn',
                },
                {
                  title: 'classTwoNoBookSpTotalBCIn',
                  field: 'classTwoNoBookSpTotalBCIn',
                },

                { title: 'classThreeNoBoyBCIn', field: 'classThreeNoBoyBCIn' },
                { title: 'classThreeNoGirlBCIn', field: 'classThreeNoGirlBCIn' },
                { title: 'classThreeNoTotalBCIn', field: 'classThreeNoTotalBCIn' },

                { title: 'classThreeNoBookBoyBCIn', field: 'classThreeNoBookBoyBCIn' },
                { title: 'classThreeNoBookGirlBCIn', field: 'classThreeNoBookGirlBCIn' },
                {
                  title: 'classThreeNoBookTotalBCIn',
                  field: 'classThreeNoBookTotalBCIn',
                },

                { title: 'classThreeNoSpBoyBCIn', field: 'classThreeNoSpBoyBCIn' },
                {
                  title: 'classThreeNoSpGirlBCIn',
                  field: 'classThreeNoSpGirlBCIn',
                },
                {
                  title: 'classThreeNoSpTotalBCIn',
                  field: 'classThreeNoSpTotalBCIn',
                },

                {
                  title: 'classThreeNoBookSpBoyBCIn',
                  field: 'classThreeNoBookSpBoyBCIn',
                },
                {
                  title: 'classThreeNoBookSpGirlBCIn',
                  field: 'classThreeNoBookSpGirlBCIn',
                },
                {
                  title: 'classThreeNoBookSpTotalBCIn',
                  field: 'classThreeNoBookSpTotalBCIn',
                },

                { title: 'classFourNoBoyBCIn', field: 'classFourNoBoyBCIn' },
                { title: 'classFourNoGirlBCIn', field: 'classFourNoGirlBCIn' },
                { title: 'classFourNoTotalBCIn', field: 'classFourNoTotalBCIn' },

                { title: 'classFourNoBookBoyBCIn', field: 'classFourNoBookBoyBCIn' },
                { title: 'classFourNoBookGirlBCIn', field: 'classFourNoBookGirlBCIn' },
                {
                  title: 'classFourNoBookTotalBCIn',
                  field: 'classFourNoBookTotalBCIn',
                },

                { title: 'classFourNoSpBoyBCIn', field: 'classFourNoSpBoyBCIn' },
                {
                  title: 'classFourNoSpGirlBCIn',
                  field: 'classFourNoSpGirlBCIn',
                },
                {
                  title: 'classFourNoSpTotalBCIn',
                  field: 'classFourNoSpTotalBCIn',
                },

                {
                  title: 'classFourNoBookSpBoyBCIn',
                  field: 'classFourNoBookSpBoyBCIn',
                },
                {
                  title: 'classFourNoBookSpGirlBCIn',
                  field: 'classFourNoBookSpGirlBCIn',
                },
                {
                  title: 'classFourNoBookSpTotalBCIn',
                  field: 'classFourNoBookSpTotalBCIn',
                },

                { title: 'classFiveNoBoyBCIn', field: 'classFiveNoBoyBCIn' },
                { title: 'classFiveNoGirlBCIn', field: 'classFiveNoGirlBCIn' },
                { title: 'classFiveNoTotalBCIn', field: 'classFiveNoTotalBCIn' },

                { title: 'classFiveNoBookBoyBCIn', field: 'classFiveNoBookBoyBCIn' },
                { title: 'classFiveNoBookGirlBCIn', field: 'classFiveNoBookGirlBCIn' },
                {
                  title: 'classFiveNoBookTotalBCIn',
                  field: 'classFiveNoBookTotalBCIn',
                },

                { title: 'classFiveNoSpBoyBCIn', field: 'classFiveNoSpBoyBCIn' },
                {
                  title: 'classFiveNoSpGirlBCIn',
                  field: 'classFiveNoSpGirlBCIn',
                },
                {
                  title: 'classFiveNoSpTotalBCIn',
                  field: 'classFiveNoSpTotalBCIn',
                },

                {
                  title: 'classFiveNoBookSpBoyBCIn',
                  field: 'classFiveNoBookSpBoyBCIn',
                },
                {
                  title: 'classFiveNoBookSpGirlBCIn',
                  field: 'classFiveNoBookSpGirlBCIn',
                },
                {
                  title: 'classFiveNoBookSpTotalBCIn',
                  field: 'classFiveNoBookSpTotalBCIn',
                },
              ]}
              options={{
                exportButton: true,
                exportAllData: true,
                grouping: true,
                sorting: true,
                filtering: true,
                pageSize: 5,
                pageSizeOptions: [5, 10, 20],
                maxBodyHeight: '400px',
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
              data={allBCODIData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AnalysisBCODI
