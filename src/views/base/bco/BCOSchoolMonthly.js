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

  const [reportData23Annual, setReportData23Annual] = useState([])
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

  const [reportData24Annual, setReportData24Annual] = useState([])
  const [reportData24Jan, setReportData24Jan] = useState([])
  const [reportData24Feb, setReportData24Feb] = useState([])
  const [reportData24Mar, setReportData24Mar] = useState([])
  const [reportData24Apr, setReportData24Apr] = useState([])
  const [reportData24May, setReportData24May] = useState([])
  const [reportData24Jun, setReportData24Jun] = useState([])
  const [reportData24Jul, setReportData24Jul] = useState([])
  const [reportData24Aug, setReportData24Aug] = useState([])
  const [reportData24Sep, setReportData24Sep] = useState([])
  const [reportData24Oct, setReportData24Oct] = useState([])
  const [reportData24Nov, setReportData24Nov] = useState([])
  const [reportData24Dec, setReportData24Dec] = useState([])

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
  // Annual
  // Ukhiya Data
  let uTotalStudentAnnual23 = 0
  let uTotalBookCheckoutAnnual23 = 0
  let uTotalBookCheckinAnnual23 = 0
  let uNoBCOPerStudentAnnual23 = 0
  let uNoStudentBCOAnnual23 = 0
  let uPercentStudentBCOAnnual23 = 0
  let uNoStudentBCIAnnual23 = 0
  let uPercentStudentBCIAnnual23 = 0
  let uNoGirlBCOAnnual23 = 0
  let uPercentGirlBCOAnnual23 = 0
  let uNoBoyBCOAnnual23 = 0
  let uPercentBoyBCOAnnual23 = 0
  let uNoSchoolBCOAnnual23 = 0
  let uNoSchoolZeroBCOAnnual23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentAnnual23 = 0
  let kTotalBookCheckoutAnnual23 = 0
  let kTotalBookCheckinAnnual23 = 0
  let kNoBCOPerStudentAnnual23 = 0
  let kNoStudentBCOAnnual23 = 0
  let kPercentStudentBCOAnnual23 = 0
  let kNoStudentBCIAnnual23 = 0
  let kPercentStudentBCIAnnual23 = 0
  let kNoGirlBCOAnnual23 = 0
  let kPercentGirlBCOAnnual23 = 0
  let kNoBoyBCOAnnual23 = 0
  let kPercentBoyBCOAnnual23 = 0
  let kNoSchoolBCOAnnual23 = 0
  let kNoSchoolZeroBCOAnnual23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentAnnual23 = 0
  let cfoTotalBookCheckoutAnnual23 = 0
  let cfoTotalBookCheckinAnnual23 = 0
  let cfoNoBCOPerStudentAnnual23 = 0
  let cfoNoStudentBCOAnnual23 = 0
  let cfoPercentStudentBCOAnnual23 = 0
  let cfoNoStudentBCIAnnual23 = 0
  let cfoPercentStudentBCIAnnual23 = 0
  let cfoNoGirlBCOAnnual23 = 0
  let cfoPercentGirlBCOAnnual23 = 0
  let cfoNoBoyBCOAnnual23 = 0
  let cfoPercentBoyBCOAnnual23 = 0
  let cfoNoSchoolBCOAnnual23 = 0
  let cfoNoSchoolZeroBCOAnnual23 = 0
  // CFO Data
  // Annual

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
  let uTotalStudentJune23 = 0
  let uTotalBookCheckoutJune23 = 0
  let uTotalBookCheckinJune23 = 0
  let uNoBCOPerStudentJune23 = 0
  let uNoStudentBCOJune23 = 0
  let uPercentStudentBCOJune23 = 0
  let uNoStudentBCIJune23 = 0
  let uPercentStudentBCIJune23 = 0
  let uNoGirlBCOJune23 = 0
  let uPercentGirlBCOJune23 = 0
  let uNoBoyBCOJune23 = 0
  let uPercentBoyBCOJune23 = 0
  let uNoSchoolBCOJune23 = 0
  let uNoSchoolZeroBCOJune23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentJune23 = 0
  let kTotalBookCheckoutJune23 = 0
  let kTotalBookCheckinJune23 = 0
  let kNoBCOPerStudentJune23 = 0
  let kNoStudentBCOJune23 = 0
  let kPercentStudentBCOJune23 = 0
  let kNoStudentBCIJune23 = 0
  let kPercentStudentBCIJune23 = 0
  let kNoGirlBCOJune23 = 0
  let kPercentGirlBCOJune23 = 0
  let kNoBoyBCOJune23 = 0
  let kPercentBoyBCOJune23 = 0
  let kNoSchoolBCOJune23 = 0
  let kNoSchoolZeroBCOJune23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentJune23 = 0
  let cfoTotalBookCheckoutJune23 = 0
  let cfoTotalBookCheckinJune23 = 0
  let cfoNoBCOPerStudentJune23 = 0
  let cfoNoStudentBCOJune23 = 0
  let cfoPercentStudentBCOJune23 = 0
  let cfoNoStudentBCIJune23 = 0
  let cfoPercentStudentBCIJune23 = 0
  let cfoNoGirlBCOJune23 = 0
  let cfoPercentGirlBCOJune23 = 0
  let cfoNoBoyBCOJune23 = 0
  let cfoPercentBoyBCOJune23 = 0
  let cfoNoSchoolBCOJune23 = 0
  let cfoNoSchoolZeroBCOJune23 = 0
  // CFO Data
  // June

  // July
  // Ukhiya Data
  let uTotalStudentJuly23 = 0
  let uTotalBookCheckoutJuly23 = 0
  let uTotalBookCheckinJuly23 = 0
  let uNoBCOPerStudentJuly23 = 0
  let uNoStudentBCOJuly23 = 0
  let uPercentStudentBCOJuly23 = 0
  let uNoStudentBCIJuly23 = 0
  let uPercentStudentBCIJuly23 = 0
  let uNoGirlBCOJuly23 = 0
  let uPercentGirlBCOJuly23 = 0
  let uNoBoyBCOJuly23 = 0
  let uPercentBoyBCOJuly23 = 0
  let uNoSchoolBCOJuly23 = 0
  let uNoSchoolZeroBCOJuly23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentJuly23 = 0
  let kTotalBookCheckoutJuly23 = 0
  let kTotalBookCheckinJuly23 = 0
  let kNoBCOPerStudentJuly23 = 0
  let kNoStudentBCOJuly23 = 0
  let kPercentStudentBCOJuly23 = 0
  let kNoStudentBCIJuly23 = 0
  let kPercentStudentBCIJuly23 = 0
  let kNoGirlBCOJuly23 = 0
  let kPercentGirlBCOJuly23 = 0
  let kNoBoyBCOJuly23 = 0
  let kPercentBoyBCOJuly23 = 0
  let kNoSchoolBCOJuly23 = 0
  let kNoSchoolZeroBCOJuly23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentJuly23 = 0
  let cfoTotalBookCheckoutJuly23 = 0
  let cfoTotalBookCheckinJuly23 = 0
  let cfoNoBCOPerStudentJuly23 = 0
  let cfoNoStudentBCOJuly23 = 0
  let cfoPercentStudentBCOJuly23 = 0
  let cfoNoStudentBCIJuly23 = 0
  let cfoPercentStudentBCIJuly23 = 0
  let cfoNoGirlBCOJuly23 = 0
  let cfoPercentGirlBCOJuly23 = 0
  let cfoNoBoyBCOJuly23 = 0
  let cfoPercentBoyBCOJuly23 = 0
  let cfoNoSchoolBCOJuly23 = 0
  let cfoNoSchoolZeroBCOJuly23 = 0
  // CFO Data
  // July

  // August
  // Ukhiya Data
  let uTotalStudentAugust23 = 0
  let uTotalBookCheckoutAugust23 = 0
  let uTotalBookCheckinAugust23 = 0
  let uNoBCOPerStudentAugust23 = 0
  let uNoStudentBCOAugust23 = 0
  let uPercentStudentBCOAugust23 = 0
  let uNoStudentBCIAugust23 = 0
  let uPercentStudentBCIAugust23 = 0
  let uNoGirlBCOAugust23 = 0
  let uPercentGirlBCOAugust23 = 0
  let uNoBoyBCOAugust23 = 0
  let uPercentBoyBCOAugust23 = 0
  let uNoSchoolBCOAugust23 = 0
  let uNoSchoolZeroBCOAugust23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentAugust23 = 0
  let kTotalBookCheckoutAugust23 = 0
  let kTotalBookCheckinAugust23 = 0
  let kNoBCOPerStudentAugust23 = 0
  let kNoStudentBCOAugust23 = 0
  let kPercentStudentBCOAugust23 = 0
  let kNoStudentBCIAugust23 = 0
  let kPercentStudentBCIAugust23 = 0
  let kNoGirlBCOAugust23 = 0
  let kPercentGirlBCOAugust23 = 0
  let kNoBoyBCOAugust23 = 0
  let kPercentBoyBCOAugust23 = 0
  let kNoSchoolBCOAugust23 = 0
  let kNoSchoolZeroBCOAugust23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentAugust23 = 0
  let cfoTotalBookCheckoutAugust23 = 0
  let cfoTotalBookCheckinAugust23 = 0
  let cfoNoBCOPerStudentAugust23 = 0
  let cfoNoStudentBCOAugust23 = 0
  let cfoPercentStudentBCOAugust23 = 0
  let cfoNoStudentBCIAugust23 = 0
  let cfoPercentStudentBCIAugust23 = 0
  let cfoNoGirlBCOAugust23 = 0
  let cfoPercentGirlBCOAugust23 = 0
  let cfoNoBoyBCOAugust23 = 0
  let cfoPercentBoyBCOAugust23 = 0
  let cfoNoSchoolBCOAugust23 = 0
  let cfoNoSchoolZeroBCOAugust23 = 0
  // CFO Data
  // August

  // September
  // Ukhiya Data
  let uTotalStudentSeptember23 = 0
  let uTotalBookCheckoutSeptember23 = 0
  let uTotalBookCheckinSeptember23 = 0
  let uNoBCOPerStudentSeptember23 = 0
  let uNoStudentBCOSeptember23 = 0
  let uPercentStudentBCOSeptember23 = 0
  let uNoStudentBCISeptember23 = 0
  let uPercentStudentBCISeptember23 = 0
  let uNoGirlBCOSeptember23 = 0
  let uPercentGirlBCOSeptember23 = 0
  let uNoBoyBCOSeptember23 = 0
  let uPercentBoyBCOSeptember23 = 0
  let uNoSchoolBCOSeptember23 = 0
  let uNoSchoolZeroBCOSeptember23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentSeptember23 = 0
  let kTotalBookCheckoutSeptember23 = 0
  let kTotalBookCheckinSeptember23 = 0
  let kNoBCOPerStudentSeptember23 = 0
  let kNoStudentBCOSeptember23 = 0
  let kPercentStudentBCOSeptember23 = 0
  let kNoStudentBCISeptember23 = 0
  let kPercentStudentBCISeptember23 = 0
  let kNoGirlBCOSeptember23 = 0
  let kPercentGirlBCOSeptember23 = 0
  let kNoBoyBCOSeptember23 = 0
  let kPercentBoyBCOSeptember23 = 0
  let kNoSchoolBCOSeptember23 = 0
  let kNoSchoolZeroBCOSeptember23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentSeptember23 = 0
  let cfoTotalBookCheckoutSeptember23 = 0
  let cfoTotalBookCheckinSeptember23 = 0
  let cfoNoBCOPerStudentSeptember23 = 0
  let cfoNoStudentBCOSeptember23 = 0
  let cfoPercentStudentBCOSeptember23 = 0
  let cfoNoStudentBCISeptember23 = 0
  let cfoPercentStudentBCISeptember23 = 0
  let cfoNoGirlBCOSeptember23 = 0
  let cfoPercentGirlBCOSeptember23 = 0
  let cfoNoBoyBCOSeptember23 = 0
  let cfoPercentBoyBCOSeptember23 = 0
  let cfoNoSchoolBCOSeptember23 = 0
  let cfoNoSchoolZeroBCOSeptember23 = 0
  // CFO Data
  // September

  // October
  // Ukhiya Data
  let uTotalStudentOctober23 = 0
  let uTotalBookCheckoutOctober23 = 0
  let uTotalBookCheckinOctober23 = 0
  let uNoBCOPerStudentOctober23 = 0
  let uNoStudentBCOOctober23 = 0
  let uPercentStudentBCOOctober23 = 0
  let uNoStudentBCIOctober23 = 0
  let uPercentStudentBCIOctober23 = 0
  let uNoGirlBCOOctober23 = 0
  let uPercentGirlBCOOctober23 = 0
  let uNoBoyBCOOctober23 = 0
  let uPercentBoyBCOOctober23 = 0
  let uNoSchoolBCOOctober23 = 0
  let uNoSchoolZeroBCOOctober23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentOctober23 = 0
  let kTotalBookCheckoutOctober23 = 0
  let kTotalBookCheckinOctober23 = 0
  let kNoBCOPerStudentOctober23 = 0
  let kNoStudentBCOOctober23 = 0
  let kPercentStudentBCOOctober23 = 0
  let kNoStudentBCIOctober23 = 0
  let kPercentStudentBCIOctober23 = 0
  let kNoGirlBCOOctober23 = 0
  let kPercentGirlBCOOctober23 = 0
  let kNoBoyBCOOctober23 = 0
  let kPercentBoyBCOOctober23 = 0
  let kNoSchoolBCOOctober23 = 0
  let kNoSchoolZeroBCOOctober23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentOctober23 = 0
  let cfoTotalBookCheckoutOctober23 = 0
  let cfoTotalBookCheckinOctober23 = 0
  let cfoNoBCOPerStudentOctober23 = 0
  let cfoNoStudentBCOOctober23 = 0
  let cfoPercentStudentBCOOctober23 = 0
  let cfoNoStudentBCIOctober23 = 0
  let cfoPercentStudentBCIOctober23 = 0
  let cfoNoGirlBCOOctober23 = 0
  let cfoPercentGirlBCOOctober23 = 0
  let cfoNoBoyBCOOctober23 = 0
  let cfoPercentBoyBCOOctober23 = 0
  let cfoNoSchoolBCOOctober23 = 0
  let cfoNoSchoolZeroBCOOctober23 = 0
  // CFO Data
  // October

  // November
  // Ukhiya Data
  let uTotalStudentNovember23 = 0
  let uTotalBookCheckoutNovember23 = 0
  let uTotalBookCheckinNovember23 = 0
  let uNoBCOPerStudentNovember23 = 0
  let uNoStudentBCONovember23 = 0
  let uPercentStudentBCONovember23 = 0
  let uNoStudentBCINovember23 = 0
  let uPercentStudentBCINovember23 = 0
  let uNoGirlBCONovember23 = 0
  let uPercentGirlBCONovember23 = 0
  let uNoBoyBCONovember23 = 0
  let uPercentBoyBCONovember23 = 0
  let uNoSchoolBCONovember23 = 0
  let uNoSchoolZeroBCONovember23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentNovember23 = 0
  let kTotalBookCheckoutNovember23 = 0
  let kTotalBookCheckinNovember23 = 0
  let kNoBCOPerStudentNovember23 = 0
  let kNoStudentBCONovember23 = 0
  let kPercentStudentBCONovember23 = 0
  let kNoStudentBCINovember23 = 0
  let kPercentStudentBCINovember23 = 0
  let kNoGirlBCONovember23 = 0
  let kPercentGirlBCONovember23 = 0
  let kNoBoyBCONovember23 = 0
  let kPercentBoyBCONovember23 = 0
  let kNoSchoolBCONovember23 = 0
  let kNoSchoolZeroBCONovember23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentNovember23 = 0
  let cfoTotalBookCheckoutNovember23 = 0
  let cfoTotalBookCheckinNovember23 = 0
  let cfoNoBCOPerStudentNovember23 = 0
  let cfoNoStudentBCONovember23 = 0
  let cfoPercentStudentBCONovember23 = 0
  let cfoNoStudentBCINovember23 = 0
  let cfoPercentStudentBCINovember23 = 0
  let cfoNoGirlBCONovember23 = 0
  let cfoPercentGirlBCONovember23 = 0
  let cfoNoBoyBCONovember23 = 0
  let cfoPercentBoyBCONovember23 = 0
  let cfoNoSchoolBCONovember23 = 0
  let cfoNoSchoolZeroBCONovember23 = 0
  // CFO Data
  // November

  // December
  // Ukhiya Data
  let uTotalStudentDecember23 = 0
  let uTotalBookCheckoutDecember23 = 0
  let uTotalBookCheckinDecember23 = 0
  let uNoBCOPerStudentDecember23 = 0
  let uNoStudentBCODecember23 = 0
  let uPercentStudentBCODecember23 = 0
  let uNoStudentBCIDecember23 = 0
  let uPercentStudentBCIDecember23 = 0
  let uNoGirlBCODecember23 = 0
  let uPercentGirlBCODecember23 = 0
  let uNoBoyBCODecember23 = 0
  let uPercentBoyBCODecember23 = 0
  let uNoSchoolBCODecember23 = 0
  let uNoSchoolZeroBCODecember23 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentDecember23 = 0
  let kTotalBookCheckoutDecember23 = 0
  let kTotalBookCheckinDecember23 = 0
  let kNoBCOPerStudentDecember23 = 0
  let kNoStudentBCODecember23 = 0
  let kPercentStudentBCODecember23 = 0
  let kNoStudentBCIDecember23 = 0
  let kPercentStudentBCIDecember23 = 0
  let kNoGirlBCODecember23 = 0
  let kPercentGirlBCODecember23 = 0
  let kNoBoyBCODecember23 = 0
  let kPercentBoyBCODecember23 = 0
  let kNoSchoolBCODecember23 = 0
  let kNoSchoolZeroBCODecember23 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentDecember23 = 0
  let cfoTotalBookCheckoutDecember23 = 0
  let cfoTotalBookCheckinDecember23 = 0
  let cfoNoBCOPerStudentDecember23 = 0
  let cfoNoStudentBCODecember23 = 0
  let cfoPercentStudentBCODecember23 = 0
  let cfoNoStudentBCIDecember23 = 0
  let cfoPercentStudentBCIDecember23 = 0
  let cfoNoGirlBCODecember23 = 0
  let cfoPercentGirlBCODecember23 = 0
  let cfoNoBoyBCODecember23 = 0
  let cfoPercentBoyBCODecember23 = 0
  let cfoNoSchoolBCODecember23 = 0
  let cfoNoSchoolZeroBCODecember23 = 0
  // CFO Data
  // December

  // 2023

  // 2024
  // Jan
  // Ukhiya Data
  let uTotalStudentJan24 = 0
  let uTotalBookCheckoutJan24 = 0
  let uTotalBookCheckinJan24 = 0
  let uNoBCOPerStudentJan24 = 0
  let uNoStudentBCOJan24 = 0
  let uPercentStudentBCOJan24 = 0
  let uNoStudentBCIJan24 = 0
  let uPercentStudentBCIJan24 = 0
  let uNoGirlBCOJan24 = 0
  let uPercentGirlBCOJan24 = 0
  let uNoBoyBCOJan24 = 0
  let uPercentBoyBCOJan24 = 0
  let uNoSchoolBCOJan24 = 0
  let uNoSchoolZeroBCOJan24 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentJan24 = 0
  let kTotalBookCheckoutJan24 = 0
  let kTotalBookCheckinJan24 = 0
  let kNoBCOPerStudentJan24 = 0
  let kNoStudentBCOJan24 = 0
  let kPercentStudentBCOJan24 = 0
  let kNoStudentBCIJan24 = 0
  let kPercentStudentBCIJan24 = 0
  let kNoGirlBCOJan24 = 0
  let kPercentGirlBCOJan24 = 0
  let kNoBoyBCOJan24 = 0
  let kPercentBoyBCOJan24 = 0
  let kNoSchoolBCOJan24 = 0
  let kNoSchoolZeroBCOJan24 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentJan24 = 0
  let cfoTotalBookCheckoutJan24 = 0
  let cfoTotalBookCheckinJan24 = 0
  let cfoNoBCOPerStudentJan24 = 0
  let cfoNoStudentBCOJan24 = 0
  let cfoPercentStudentBCOJan24 = 0
  let cfoNoStudentBCIJan24 = 0
  let cfoPercentStudentBCIJan24 = 0
  let cfoNoGirlBCOJan24 = 0
  let cfoPercentGirlBCOJan24 = 0
  let cfoNoBoyBCOJan24 = 0
  let cfoPercentBoyBCOJan24 = 0
  let cfoNoSchoolBCOJan24 = 0
  let cfoNoSchoolZeroBCOJan24 = 0
  // CFO Data
  // Jan

  // Feb
  // Ukhiya Data
  let uTotalStudentFeb24 = 0
  let uTotalBookCheckoutFeb24 = 0
  let uTotalBookCheckinFeb24 = 0
  let uNoBCOPerStudentFeb24 = 0
  let uNoStudentBCOFeb24 = 0
  let uPercentStudentBCOFeb24 = 0
  let uNoStudentBCIFeb24 = 0
  let uPercentStudentBCIFeb24 = 0
  let uNoGirlBCOFeb24 = 0
  let uPercentGirlBCOFeb24 = 0
  let uNoBoyBCOFeb24 = 0
  let uPercentBoyBCOFeb24 = 0
  let uNoSchoolBCOFeb24 = 0
  let uNoSchoolZeroBCOFeb24 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentFeb24 = 0
  let kTotalBookCheckoutFeb24 = 0
  let kTotalBookCheckinFeb24 = 0
  let kNoBCOPerStudentFeb24 = 0
  let kNoStudentBCOFeb24 = 0
  let kPercentStudentBCOFeb24 = 0
  let kNoStudentBCIFeb24 = 0
  let kPercentStudentBCIFeb24 = 0
  let kNoGirlBCOFeb24 = 0
  let kPercentGirlBCOFeb24 = 0
  let kNoBoyBCOFeb24 = 0
  let kPercentBoyBCOFeb24 = 0
  let kNoSchoolBCOFeb24 = 0
  let kNoSchoolZeroBCOFeb24 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentFeb24 = 0
  let cfoTotalBookCheckoutFeb24 = 0
  let cfoTotalBookCheckinFeb24 = 0
  let cfoNoBCOPerStudentFeb24 = 0
  let cfoNoStudentBCOFeb24 = 0
  let cfoPercentStudentBCOFeb24 = 0
  let cfoNoStudentBCIFeb24 = 0
  let cfoPercentStudentBCIFeb24 = 0
  let cfoNoGirlBCOFeb24 = 0
  let cfoPercentGirlBCOFeb24 = 0
  let cfoNoBoyBCOFeb24 = 0
  let cfoPercentBoyBCOFeb24 = 0
  let cfoNoSchoolBCOFeb24 = 0
  let cfoNoSchoolZeroBCOFeb24 = 0
  // CFO Data
  // Feb

  // Mar
  // Ukhiya Data
  let uTotalStudentMar24 = 0
  let uTotalBookCheckoutMar24 = 0
  let uTotalBookCheckinMar24 = 0
  let uNoBCOPerStudentMar24 = 0
  let uNoStudentBCOMar24 = 0
  let uPercentStudentBCOMar24 = 0
  let uNoStudentBCIMar24 = 0
  let uPercentStudentBCIMar24 = 0
  let uNoGirlBCOMar24 = 0
  let uPercentGirlBCOMar24 = 0
  let uNoBoyBCOMar24 = 0
  let uPercentBoyBCOMar24 = 0
  let uNoSchoolBCOMar24 = 0
  let uNoSchoolZeroBCOMar24 = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentMar24 = 0
  let kTotalBookCheckoutMar24 = 0
  let kTotalBookCheckinMar24 = 0
  let kNoBCOPerStudentMar24 = 0
  let kNoStudentBCOMar24 = 0
  let kPercentStudentBCOMar24 = 0
  let kNoStudentBCIMar24 = 0
  let kPercentStudentBCIMar24 = 0
  let kNoGirlBCOMar24 = 0
  let kPercentGirlBCOMar24 = 0
  let kNoBoyBCOMar24 = 0
  let kPercentBoyBCOMar24 = 0
  let kNoSchoolBCOMar24 = 0
  let kNoSchoolZeroBCOMar24 = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentMar24 = 0
  let cfoTotalBookCheckoutMar24 = 0
  let cfoTotalBookCheckinMar24 = 0
  let cfoNoBCOPerStudentMar24 = 0
  let cfoNoStudentBCOMar24 = 0
  let cfoPercentStudentBCOMar24 = 0
  let cfoNoStudentBCIMar24 = 0
  let cfoPercentStudentBCIMar24 = 0
  let cfoNoGirlBCOMar24 = 0
  let cfoPercentGirlBCOMar24 = 0
  let cfoNoBoyBCOMar24 = 0
  let cfoPercentBoyBCOMar24 = 0
  let cfoNoSchoolBCOMar24 = 0
  let cfoNoSchoolZeroBCOMar24 = 0
  // CFO Data
  // Mar
  // 2024

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
      pushReportData23Annual(console.log('pushReportData23Annual called'))
      pushReportData23Jan(console.log('pushReportData23Jan called'))
      pushReportData23Feb(console.log('pushReportData23Feb called'))
      pushReportData23Mar(console.log('pushReportData23Mar called'))
      pushReportData23Apr(console.log('pushReportData23Apr called'))
      pushReportData23May(console.log('pushReportData23May called'))
      pushReportData23Jun(console.log('pushReportData23Jun called'))
      pushReportData23Jul(console.log('pushReportData23Jul called'))
      pushReportData23Aug(console.log('pushReportData23Aug called'))
      pushReportData23Sep(console.log('pushReportData23Sep called'))
      pushReportData23Oct(console.log('pushReportData23Oct called'))
      pushReportData23Nov(console.log('pushReportData23Nov called'))
      pushReportData23Dec(console.log('pushReportData23Dec called'))

      pushReportData24Jan(console.log('pushReportData24Jan called'))
      pushReportData24Feb(console.log('pushReportData24Feb called'))
      pushReportData24Mar(console.log('pushReportData24Mar called'))
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

      // Annual 2022
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
      // Annual 2022

      // 2023
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
      // Ukhiya
      uTotalStudentJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutJune23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentJune23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOJune23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIJune23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOJune23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOJune23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOJune23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'June',
      ).length

      uNoSchoolZeroBCOJune23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'June',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutJune23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentJune23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'June',
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
              item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOJune23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIJune23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOJune23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOJune23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOJune23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOJune23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'June',
      ).length

      kNoSchoolZeroBCOJune23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'June',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentJune23 = parseInt(kTotalStudentJune23) + parseInt(uTotalStudentJune23)
      cfoTotalBookCheckoutJune23 = kTotalBookCheckoutJune23 + uTotalBookCheckoutJune23
      cfoTotalBookCheckinJune23 = kTotalBookCheckinJune23 + uTotalBookCheckinJune23
      cfoNoBCOPerStudentJune23 = (cfoTotalBookCheckoutJune23 / cfoTotalStudentJune23).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentJune23) + parseFloat(uNoBCOPerStudentJune23)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCOJune23 = kNoStudentBCOJune23 + uNoStudentBCOJune23
      cfoPercentStudentBCOJune23 = (
        (parseFloat(kPercentStudentBCOJune23) + parseFloat(uPercentStudentBCOJune23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIJune23 = kNoStudentBCIJune23 + uNoStudentBCIJune23
      cfoPercentStudentBCIJune23 = (
        (parseFloat(kPercentStudentBCIJune23) + parseFloat(uPercentStudentBCIJune23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOJune23 = kNoGirlBCOJune23 + uNoGirlBCOJune23
      cfoPercentGirlBCOJune23 = (
        (parseFloat(kPercentGirlBCOJune23) + parseFloat(uPercentGirlBCOJune23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOJune23 = kNoBoyBCOJune23 + uNoBoyBCOJune23
      cfoPercentBoyBCOJune23 = (
        (parseFloat(kPercentBoyBCOJune23) + parseFloat(uPercentBoyBCOJune23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOJune23 = kNoSchoolBCOJune23 + uNoSchoolBCOJune23
      cfoNoSchoolZeroBCOJune23 = kNoSchoolZeroBCOJune23 + uNoSchoolZeroBCOJune23
      // CFO
      // June 2023

      // July 2023
      // Ukhiya
      uTotalStudentJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutJuly23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentJuly23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOJuly23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIJuly23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOJuly23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOJuly23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOJuly23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'July',
      ).length

      uNoSchoolZeroBCOJuly23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'July',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutJuly23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentJuly23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'July',
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
              item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOJuly23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIJuly23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOJuly23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOJuly23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOJuly23 = (
        (response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOJuly23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'July',
      ).length

      kNoSchoolZeroBCOJuly23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'July',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentJuly23 = parseInt(kTotalStudentJuly23) + parseInt(uTotalStudentJuly23)
      cfoTotalBookCheckoutJuly23 = kTotalBookCheckoutJuly23 + uTotalBookCheckoutJuly23
      cfoTotalBookCheckinJuly23 = kTotalBookCheckinJuly23 + uTotalBookCheckinJuly23
      cfoNoBCOPerStudentJuly23 = (cfoTotalBookCheckoutJuly23 / cfoTotalStudentJuly23).toFixed(2)

      cfoNoStudentBCOJuly23 = kNoStudentBCOJuly23 + uNoStudentBCOJuly23
      cfoPercentStudentBCOJuly23 = (
        (parseFloat(kPercentStudentBCOJuly23) + parseFloat(uPercentStudentBCOJuly23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIJuly23 = kNoStudentBCIJuly23 + uNoStudentBCIJuly23
      cfoPercentStudentBCIJuly23 = (
        (parseFloat(kPercentStudentBCIJuly23) + parseFloat(uPercentStudentBCIJuly23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOJuly23 = kNoGirlBCOJuly23 + uNoGirlBCOJuly23
      cfoPercentGirlBCOJuly23 = (
        (parseFloat(kPercentGirlBCOJuly23) + parseFloat(uPercentGirlBCOJuly23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOJuly23 = kNoBoyBCOJuly23 + uNoBoyBCOJuly23
      cfoPercentBoyBCOJuly23 = (
        (parseFloat(kPercentBoyBCOJuly23) + parseFloat(uPercentBoyBCOJuly23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOJuly23 = kNoSchoolBCOJuly23 + uNoSchoolBCOJuly23
      cfoNoSchoolZeroBCOJuly23 = kNoSchoolZeroBCOJuly23 + uNoSchoolZeroBCOJuly23
      // CFO
      // July 2023

      // August 2023
      // Ukhiya
      uTotalStudentAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutAugust23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentAugust23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOAugust23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'August',
      ).length

      uNoSchoolZeroBCOAugust23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'August',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutAugust23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentAugust23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'August',
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
              item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOAugust23 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOAugust23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOAugust23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'August',
      ).length

      kNoSchoolZeroBCOAugust23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'August',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentAugust23 = parseInt(kTotalStudentAugust23) + parseInt(uTotalStudentAugust23)
      cfoTotalBookCheckoutAugust23 = kTotalBookCheckoutAugust23 + uTotalBookCheckoutAugust23
      cfoTotalBookCheckinAugust23 = kTotalBookCheckinAugust23 + uTotalBookCheckinAugust23
      cfoNoBCOPerStudentAugust23 = (cfoTotalBookCheckoutAugust23 / cfoTotalStudentAugust23).toFixed(
        2,
      )

      //   (
      //   (parseFloat(kNoBCOPerStudentAugust23) + parseFloat(uNoBCOPerStudentAugust23)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCOAugust23 = kNoStudentBCOAugust23 + uNoStudentBCOAugust23
      cfoPercentStudentBCOAugust23 = (
        (parseFloat(kPercentStudentBCOAugust23) + parseFloat(uPercentStudentBCOAugust23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIAugust23 = kNoStudentBCIAugust23 + uNoStudentBCIAugust23
      cfoPercentStudentBCIAugust23 = (
        (parseFloat(kPercentStudentBCIAugust23) + parseFloat(uPercentStudentBCIAugust23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOAugust23 = kNoGirlBCOAugust23 + uNoGirlBCOAugust23
      cfoPercentGirlBCOAugust23 = (
        (parseFloat(kPercentGirlBCOAugust23) + parseFloat(uPercentGirlBCOAugust23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOAugust23 = kNoBoyBCOAugust23 + uNoBoyBCOAugust23
      cfoPercentBoyBCOAugust23 = (
        (parseFloat(kPercentBoyBCOAugust23) + parseFloat(uPercentBoyBCOAugust23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOAugust23 = kNoSchoolBCOAugust23 + uNoSchoolBCOAugust23
      cfoNoSchoolZeroBCOAugust23 = kNoSchoolZeroBCOAugust23 + uNoSchoolZeroBCOAugust23
      // CFO
      // August 2023

      // September
      // Ukhiya
      uTotalStudentSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutSeptember23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentSeptember23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOSeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCISeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCISeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOSeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOSeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOSeptember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'September',
      ).length

      uNoSchoolZeroBCOSeptember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'September',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutSeptember23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentSeptember23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'September',
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
              item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOSeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCISeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCISeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOSeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOSeptember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOSeptember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOSeptember23 = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'September',
      ).length

      kNoSchoolZeroBCOSeptember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'September',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentSeptember23 =
        parseInt(kTotalStudentSeptember23) + parseInt(uTotalStudentSeptember23)
      cfoTotalBookCheckoutSeptember23 =
        kTotalBookCheckoutSeptember23 + uTotalBookCheckoutSeptember23
      cfoTotalBookCheckinSeptember23 = kTotalBookCheckinSeptember23 + uTotalBookCheckinSeptember23
      cfoNoBCOPerStudentSeptember23 = (
        cfoTotalBookCheckoutSeptember23 / cfoTotalStudentSeptember23
      ).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentSeptember23) + parseFloat(uNoBCOPerStudentSeptember23)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCOSeptember23 = kNoStudentBCOSeptember23 + uNoStudentBCOSeptember23
      cfoPercentStudentBCOSeptember23 = (
        (parseFloat(kPercentStudentBCOSeptember23) + parseFloat(uPercentStudentBCOSeptember23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCISeptember23 = kNoStudentBCISeptember23 + uNoStudentBCISeptember23
      cfoPercentStudentBCISeptember23 = (
        (parseFloat(kPercentStudentBCISeptember23) + parseFloat(uPercentStudentBCISeptember23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOSeptember23 = kNoGirlBCOSeptember23 + uNoGirlBCOSeptember23
      cfoPercentGirlBCOSeptember23 = (
        (parseFloat(kPercentGirlBCOSeptember23) + parseFloat(uPercentGirlBCOSeptember23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOSeptember23 = kNoBoyBCOSeptember23 + uNoBoyBCOSeptember23
      cfoPercentBoyBCOSeptember23 = (
        (parseFloat(kPercentBoyBCOSeptember23) + parseFloat(uPercentBoyBCOSeptember23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOSeptember23 = kNoSchoolBCOSeptember23 + uNoSchoolBCOSeptember23
      cfoNoSchoolZeroBCOSeptember23 = kNoSchoolZeroBCOSeptember23 + uNoSchoolZeroBCOSeptember23
      // CFO
      // September

      // October
      // Ukhiya
      uTotalStudentOctober23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutOctober23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinOctober23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentOctober23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOOctober23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIOctober23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOOctober23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOOctober23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOOctober23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'October',
      ).length

      uNoSchoolZeroBCOOctober23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'October',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentOctober23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutOctober23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinOctober23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentOctober23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'October',
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
              item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOOctober23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIOctober23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOOctober23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOOctober23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOOctober23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOOctober23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'October',
      ).length

      kNoSchoolZeroBCOOctober23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'October',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentOctober23 = parseInt(kTotalStudentOctober23) + parseInt(uTotalStudentOctober23)
      cfoTotalBookCheckoutOctober23 = kTotalBookCheckoutOctober23 + uTotalBookCheckoutOctober23
      cfoTotalBookCheckinOctober23 = kTotalBookCheckinOctober23 + uTotalBookCheckinOctober23
      cfoNoBCOPerStudentOctober23 = (
        cfoTotalBookCheckoutOctober23 / cfoTotalStudentOctober23
      ).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentSeptember23) + parseFloat(uNoBCOPerStudentSeptember23)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCOOctober23 = kNoStudentBCOOctober23 + uNoStudentBCOOctober23
      cfoPercentStudentBCOOctober23 = (
        (parseFloat(kPercentStudentBCOOctober23) + parseFloat(uPercentStudentBCOOctober23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIOctober23 = kNoStudentBCIOctober23 + uNoStudentBCIOctober23
      cfoPercentStudentBCIOctober23 = (
        (parseFloat(kPercentStudentBCIOctober23) + parseFloat(uPercentStudentBCIOctober23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOOctober23 = kNoGirlBCOOctober23 + uNoGirlBCOOctober23
      cfoPercentGirlBCOOctober23 = (
        (parseFloat(kPercentGirlBCOOctober23) + parseFloat(uPercentGirlBCOOctober23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOOctober23 = kNoBoyBCOOctober23 + uNoBoyBCOOctober23
      cfoPercentBoyBCOOctober23 = (
        (parseFloat(kPercentBoyBCOOctober23) + parseFloat(uPercentBoyBCOOctober23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOOctober23 = kNoSchoolBCOOctober23 + uNoSchoolBCOOctober23
      cfoNoSchoolZeroBCOOctober23 = kNoSchoolZeroBCOOctober23 + uNoSchoolZeroBCOOctober23
      // CFO
      // October

      // November
      // Ukhiya
      uTotalStudentNovember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutNovember23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinNovember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentNovember23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCONovember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCONovember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCINovember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCINovember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCONovember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCONovember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCONovember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCONovember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCONovember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'November',
      ).length

      uNoSchoolZeroBCONovember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'November',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentNovember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutNovember23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023' &&
            item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinNovember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentNovember23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023' &&
              item.month === 'November',
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
              item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCONovember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCONovember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCINovember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCINovember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCONovember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCONovember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCONovember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCONovember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCONovember23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'November',
      ).length

      kNoSchoolZeroBCONovember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'November',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentNovember23 =
        parseInt(kTotalStudentNovember23) + parseInt(uTotalStudentNovember23)
      cfoTotalBookCheckoutNovember23 = kTotalBookCheckoutNovember23 + uTotalBookCheckoutNovember23
      cfoTotalBookCheckinNovember23 = kTotalBookCheckinNovember23 + uTotalBookCheckinNovember23
      cfoNoBCOPerStudentNovember23 = (
        cfoTotalBookCheckoutNovember23 / cfoTotalStudentNovember23
      ).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentNovember23) + parseFloat(uNoBCOPerStudentNovember23)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCONovember23 = kNoStudentBCONovember23 + uNoStudentBCONovember23
      cfoPercentStudentBCONovember23 = (
        (parseFloat(kPercentStudentBCONovember23) + parseFloat(uPercentStudentBCONovember23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCINovember23 = kNoStudentBCINovember23 + uNoStudentBCINovember23
      cfoPercentStudentBCINovember23 = (
        (parseFloat(kPercentStudentBCINovember23) + parseFloat(uPercentStudentBCINovember23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCONovember23 = kNoGirlBCONovember23 + uNoGirlBCONovember23
      cfoPercentGirlBCONovember23 = (
        (parseFloat(kPercentGirlBCONovember23) + parseFloat(uPercentGirlBCONovember23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCONovember23 = kNoBoyBCONovember23 + uNoBoyBCONovember23
      cfoPercentBoyBCONovember23 = (
        (parseFloat(kPercentBoyBCONovember23) + parseFloat(uPercentBoyBCONovember23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCONovember23 = kNoSchoolBCONovember23 + uNoSchoolBCONovember23
      cfoNoSchoolZeroBCONovember23 = kNoSchoolZeroBCONovember23 + uNoSchoolZeroBCONovember23
      // CFO
      // November

      // December
      // Ukhiya
      uTotalStudentDecember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutDecember23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2023' &&
            item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinDecember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentDecember23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCODecember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCODecember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIDecember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIDecember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCODecember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCODecember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCODecember23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCODecember23 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2023' &&
              item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCODecember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC != 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'December',
      ).length

      uNoSchoolZeroBCODecember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2023' &&
          item.month === 'December',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentDecember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutDecember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinDecember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentDecember23 = (
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCODecember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCODecember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIDecember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIDecember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCODecember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCODecember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCODecember23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCODecember23 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'December',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCODecember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC != 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'December',
      ).length

      kNoSchoolZeroBCODecember23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2023' &&
          item.month === 'December',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentDecember23 =
        parseInt(kTotalStudentDecember23) + parseInt(uTotalStudentDecember23)
      cfoTotalBookCheckoutDecember23 = kTotalBookCheckoutDecember23 + uTotalBookCheckoutDecember23
      cfoTotalBookCheckinDecember23 = kTotalBookCheckinDecember23 + uTotalBookCheckinDecember23
      cfoNoBCOPerStudentDecember23 = (
        cfoTotalBookCheckoutDecember23 / cfoTotalStudentDecember23
      ).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentDecember23) + parseFloat(uNoBCOPerStudentDecember23)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCODecember23 = kNoStudentBCODecember23 + uNoStudentBCODecember23
      cfoPercentStudentBCODecember23 = (
        (parseFloat(kPercentStudentBCODecember23) + parseFloat(uPercentStudentBCODecember23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIDecember23 = kNoStudentBCIDecember23 + uNoStudentBCIDecember23
      cfoPercentStudentBCIDecember23 = (
        (cfoNoStudentBCIDecember23 * 100) /
        cfoTotalStudentDecember23
      ).toFixed(2)
      //   (
      //   (parseFloat(kPercentStudentBCIDecember23) + parseFloat(uPercentStudentBCIDecember23)) / 2,
      // ).toFixed(2)

      cfoNoGirlBCODecember23 = kNoGirlBCODecember23 + uNoGirlBCODecember23
      cfoPercentGirlBCODecember23 = (
        (parseFloat(kPercentGirlBCODecember23) + parseFloat(uPercentGirlBCODecember23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCODecember23 = kNoBoyBCODecember23 + uNoBoyBCODecember23
      cfoPercentBoyBCODecember23 = (
        (parseFloat(kPercentBoyBCODecember23) + parseFloat(uPercentBoyBCODecember23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCODecember23 = kNoSchoolBCODecember23 + uNoSchoolBCODecember23
      cfoNoSchoolZeroBCODecember23 = kNoSchoolZeroBCODecember23 + uNoSchoolZeroBCODecember23
      // CFO
      // December

      // Annual
      // Annual 2023
      // Ukhiya
      uTotalStudentAnnual23 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutAnnual23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya' && item.year === '2023',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinAnnual23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentAnnual23 = (
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

      uNoStudentBCOAnnual23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOAnnual23 = (
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

      uNoStudentBCIAnnual23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIAnnual23 = (
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

      uNoGirlBCOAnnual23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOAnnual23 = (
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

      uNoBoyBCOAnnual23 = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOAnnual23 = (
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

      uNoSchoolBCOAnnual23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya' && item.year === '2023',
      ).length

      uNoSchoolZeroBCOAnnual23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 && item.upazilla === 'Ukhiya' && item.year === '2023',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentAnnual23 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2023' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutAnnual23 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2023',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinAnnual23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentAnnual23 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2023',
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
              item.year === '2023',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOAnnual23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOAnnual23 = (
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

      kNoStudentBCIAnnual23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIAnnual23 = (
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

      kNoGirlBCOAnnual23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOAnnual23 = (
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

      kNoBoyBCOAnnual23 = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.year === '2023')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOAnnual23 = (
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

      kNoSchoolBCOAnnual23 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2023',
      ).length

      kNoSchoolZeroBCOAnnual23 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 && item.upazilla === 'Kutubdia' && item.year === '2023',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentAnnual23 = parseInt(kTotalStudentAnnual23) + parseInt(uTotalStudentAnnual23)
      cfoTotalBookCheckoutAnnual23 = kTotalBookCheckoutAnnual23 + uTotalBookCheckoutAnnual23
      cfoTotalBookCheckinAnnual23 = kTotalBookCheckinAnnual23 + uTotalBookCheckinAnnual23
      cfoNoBCOPerStudentAnnual23 = (cfoTotalBookCheckoutAnnual23 / cfoTotalStudentAnnual23).toFixed(
        2,
      )

      //   (
      //   (parseFloat(kNoBCOPerStudentAnnual23) + parseFloat(uNoBCOPerStudentAnnual23)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCOAnnual23 = kNoStudentBCOAnnual23 + uNoStudentBCOAnnual23
      cfoPercentStudentBCOAnnual23 = (
        (parseFloat(kPercentStudentBCOAnnual23) + parseFloat(uPercentStudentBCOAnnual23)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIAnnual23 = kNoStudentBCIAnnual23 + uNoStudentBCIAnnual23
      cfoPercentStudentBCIAnnual23 = (
        (parseFloat(kPercentStudentBCIAnnual23) + parseFloat(uPercentStudentBCIAnnual23)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOAnnual23 = kNoGirlBCOAnnual23 + uNoGirlBCOAnnual23
      cfoPercentGirlBCOAnnual23 = (
        (parseFloat(kPercentGirlBCOAnnual23) + parseFloat(uPercentGirlBCOAnnual23)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOAnnual23 = kNoBoyBCOAnnual23 + uNoBoyBCOAnnual23
      cfoPercentBoyBCOAnnual23 = (
        (parseFloat(kPercentBoyBCOAnnual23) + parseFloat(uPercentBoyBCOAnnual23)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOAnnual23 = kNoSchoolBCOAnnual23 + uNoSchoolBCOAnnual23
      cfoNoSchoolZeroBCOAnnual23 = kNoSchoolZeroBCOAnnual23 + uNoSchoolZeroBCOAnnual23
      // CFO
      // Annual 2023
      // 2023

      // 2024
      // January 2024
      // Ukhiya
      uTotalStudentJan24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutJan24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2024' &&
            item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinJan24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentJan24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOJan24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOJan24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIJan24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIJan24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOJan24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOJan24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOJan24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOJan24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOJan24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2024' &&
          item.month === 'January',
      ).length

      uNoSchoolZeroBCOJan24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2024' &&
          item.month === 'January',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentJan24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutJan24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2024' &&
            item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinJan24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentJan24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2024' &&
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
              item.year === '2024' &&
              item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOJan24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOJan24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIJan24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIJan24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOJan24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOJan24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOJan24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOJan24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOJan24 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'January',
      ).length

      kNoSchoolZeroBCOJan24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2024' &&
          item.month === 'January',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentJan24 = parseInt(kTotalStudentJan24) + parseInt(uTotalStudentJan24)
      cfoTotalBookCheckoutJan24 = kTotalBookCheckoutJan24 + uTotalBookCheckoutJan24
      cfoTotalBookCheckinJan24 = kTotalBookCheckinJan24 + uTotalBookCheckinJan24
      cfoNoBCOPerStudentJan24 = (cfoTotalBookCheckoutJan24 / cfoTotalStudentJan24).toFixed(2)

      //   (
      //   (parseFloat(kNoBCOPerStudentJan24) + parseFloat(uNoBCOPerStudentJan24)) /
      //   2
      // ).toFixed(2)
      cfoNoStudentBCOJan24 = kNoStudentBCOJan24 + uNoStudentBCOJan24
      cfoPercentStudentBCOJan24 = (
        (parseFloat(kPercentStudentBCOJan24) + parseFloat(uPercentStudentBCOJan24)) /
        2
      ).toFixed(2)

      cfoNoStudentBCIJan24 = kNoStudentBCIJan24 + uNoStudentBCIJan24
      cfoPercentStudentBCIJan24 = (
        (parseFloat(kPercentStudentBCIJan24) + parseFloat(uPercentStudentBCIJan24)) /
        2
      ).toFixed(2)

      cfoNoGirlBCOJan24 = kNoGirlBCOJan24 + uNoGirlBCOJan24
      cfoPercentGirlBCOJan24 = (
        (parseFloat(kPercentGirlBCOJan24) + parseFloat(uPercentGirlBCOJan24)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOJan24 = kNoBoyBCOJan24 + uNoBoyBCOJan24
      cfoPercentBoyBCOJan24 = (
        (parseFloat(kPercentBoyBCOJan24) + parseFloat(uPercentBoyBCOJan24)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOJan24 = kNoSchoolBCOJan24 + uNoSchoolBCOJan24
      cfoNoSchoolZeroBCOJan24 = kNoSchoolZeroBCOJan24 + uNoSchoolZeroBCOJan24
      // CFO
      // January 2024

      // February 2024
      // Ukhiya
      uTotalStudentFeb24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutFeb24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2024' &&
            item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinFeb24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentFeb24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOFeb24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIFeb24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOFeb24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOFeb24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
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
              item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOFeb24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2024' &&
          item.month === 'February',
      ).length

      uNoSchoolZeroBCOFeb24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2024' &&
          item.month === 'February',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentFeb24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutFeb24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2024' &&
            item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinFeb24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentFeb24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2024' &&
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
              item.year === '2024' &&
              item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOFeb24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIFeb24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOFeb24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOFeb24 = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOFeb24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOFeb24 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'February',
      ).length

      kNoSchoolZeroBCOFeb24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2024' &&
          item.month === 'February',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentFeb24 = parseInt(kTotalStudentFeb24) + parseInt(uTotalStudentFeb24)
      cfoTotalBookCheckoutFeb24 = kTotalBookCheckoutFeb24 + uTotalBookCheckoutFeb24
      cfoTotalBookCheckinFeb24 = kTotalBookCheckinFeb24 + uTotalBookCheckinFeb24
      cfoNoBCOPerStudentFeb24 = (cfoTotalBookCheckoutFeb24 / cfoTotalStudentFeb24).toFixed(2)

      cfoNoStudentBCOFeb24 = kNoStudentBCOFeb24 + uNoStudentBCOFeb24
      cfoPercentStudentBCOFeb24 = ((cfoNoStudentBCOFeb24 * 100) / cfoTotalStudentFeb24).toFixed(2)

      cfoNoStudentBCIFeb24 = kNoStudentBCIFeb24 + uNoStudentBCIFeb24
      cfoPercentStudentBCIFeb24 = ((cfoNoStudentBCIFeb24 * 100) / cfoTotalStudentFeb24).toFixed(2)

      cfoNoGirlBCOFeb24 = kNoGirlBCOFeb24 + uNoGirlBCOFeb24
      cfoPercentGirlBCOFeb24 = (
        (parseFloat(kPercentGirlBCOFeb24) + parseFloat(uPercentGirlBCOFeb24)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOFeb24 = kNoBoyBCOFeb24 + uNoBoyBCOFeb24
      cfoPercentBoyBCOFeb24 = (
        (parseFloat(kPercentBoyBCOFeb24) + parseFloat(uPercentBoyBCOFeb24)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOFeb24 = kNoSchoolBCOFeb24 + uNoSchoolBCOFeb24
      cfoNoSchoolZeroBCOFeb24 = kNoSchoolZeroBCOFeb24 + uNoSchoolZeroBCOFeb24
      // CFO
      // Feb 2024

      // March
      // Ukhiya
      uTotalStudentMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutMar24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Ukhiya' &&
            item.year === '2024' &&
            item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentMar24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOMar24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCIMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCIMar24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOMar24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOMar24 = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              item.year === '2024' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) => item.upazilla === 'Ukhiya' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOMar24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2024' &&
          item.month === 'March',
      ).length

      uNoSchoolZeroBCOMar24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Ukhiya' &&
          item.year === '2024' &&
          item.month === 'March',
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      //console.log('kTotalStudent: ' + kTotalStudent)

      kTotalBookCheckoutMar24 = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC !== 0 &&
            item.upazilla === 'Kutubdia' &&
            item.year === '2024' &&
            item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentMar24 = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              item.year === '2024' &&
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
              item.year === '2024' &&
              item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOMar24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCIMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCIMar24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOMar24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOMar24 = response.data
        .filter(
          (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOMar24 = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOMar24 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2024' && item.month === 'March',
      ).length

      kNoSchoolZeroBCOMar24 = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC === 0 &&
          item.upazilla === 'Kutubdia' &&
          item.year === '2024' &&
          item.month === 'March',
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentMar24 = parseInt(kTotalStudentMar24) + parseInt(uTotalStudentMar24)
      cfoTotalBookCheckoutMar24 = kTotalBookCheckoutMar24 + uTotalBookCheckoutMar24
      cfoTotalBookCheckinMar24 = kTotalBookCheckinMar24 + uTotalBookCheckinMar24
      cfoNoBCOPerStudentMar24 = (cfoTotalBookCheckoutMar24 / cfoTotalStudentMar24).toFixed(2)

      cfoNoStudentBCOMar24 = kNoStudentBCOMar24 + uNoStudentBCOMar24
      cfoPercentStudentBCOMar24 = ((cfoNoStudentBCOMar24 * 100) / cfoTotalStudentMar24).toFixed(2)

      cfoNoStudentBCIMar24 = kNoStudentBCIMar24 + uNoStudentBCIMar24
      cfoPercentStudentBCIMar24 = ((cfoNoStudentBCIMar24 * 100) / cfoTotalStudentMar24).toFixed(2)

      cfoNoGirlBCOMar24 = kNoGirlBCOMar24 + uNoGirlBCOMar24
      cfoPercentGirlBCOMar24 = (
        (parseFloat(kPercentGirlBCOMar24) + parseFloat(uPercentGirlBCOMar24)) /
        2
      ).toFixed(2)

      cfoNoBoyBCOMar24 = kNoBoyBCOMar24 + uNoBoyBCOMar24
      cfoPercentBoyBCOMar24 = (
        (parseFloat(kPercentBoyBCOMar24) + parseFloat(uPercentBoyBCOMar24)) /
        2
      ).toFixed(2)

      cfoNoSchoolBCOMar24 = kNoSchoolBCOMar24 + uNoSchoolBCOMar24
      cfoNoSchoolZeroBCOMar24 = kNoSchoolZeroBCOMar24 + uNoSchoolZeroBCOMar24
      // CFO
      // March
      // 2024

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  // 2023
  // Annual
  const pushReportData23Annual = () => {
    const reportObject23Annual = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentJuly23,
        ukhiya: uTotalStudentJuly23,
        cfo: cfoTotalStudentJuly23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia:
          kTotalBookCheckoutFeb23 +
          kTotalBookCheckoutFeb23 +
          kTotalBookCheckoutMar23 +
          kTotalBookCheckoutApr23 +
          kTotalBookCheckoutMay23 +
          kTotalBookCheckoutJune23 +
          kTotalBookCheckoutJuly23 +
          kTotalBookCheckoutAugust23 +
          kTotalBookCheckoutSeptember23 +
          kTotalBookCheckoutOctober23 +
          kTotalBookCheckoutNovember23 +
          kTotalBookCheckoutDecember23,
        ukhiya:
          uTotalBookCheckoutJan23 +
          uTotalBookCheckoutFeb23 +
          uTotalBookCheckoutMar23 +
          uTotalBookCheckoutApr23 +
          uTotalBookCheckoutMay23 +
          uTotalBookCheckoutJune23 +
          uTotalBookCheckoutJuly23 +
          uTotalBookCheckoutAugust23 +
          uTotalBookCheckoutSeptember23 +
          uTotalBookCheckoutOctober23 +
          uTotalBookCheckoutNovember23 +
          uTotalBookCheckoutDecember23,
        cfo:
          cfoTotalBookCheckoutJan23 +
          cfoTotalBookCheckoutFeb23 +
          cfoTotalBookCheckoutMar23 +
          cfoTotalBookCheckoutApr23 +
          cfoTotalBookCheckoutMay23 +
          cfoTotalBookCheckoutJune23 +
          cfoTotalBookCheckoutJuly23 +
          cfoTotalBookCheckoutAugust23 +
          cfoTotalBookCheckoutSeptember23 +
          cfoTotalBookCheckoutOctober23 +
          cfoTotalBookCheckoutNovember23 +
          cfoTotalBookCheckoutDecember23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia:
          kTotalBookCheckoutJan23 +
          kTotalBookCheckinFeb23 +
          kTotalBookCheckinMar23 +
          kTotalBookCheckinApr23 +
          kTotalBookCheckinMay23 +
          kTotalBookCheckinJune23 +
          kTotalBookCheckinJuly23 +
          kTotalBookCheckinAugust23 +
          kTotalBookCheckinSeptember23 +
          kTotalBookCheckinOctober23 +
          kTotalBookCheckinNovember23 +
          kTotalBookCheckinDecember23,

        ukhiya:
          uTotalBookCheckinJan23 +
          uTotalBookCheckinFeb23 +
          uTotalBookCheckinMar23 +
          uTotalBookCheckinApr23 +
          uTotalBookCheckinMay23 +
          uTotalBookCheckinJune23 +
          uTotalBookCheckinJuly23 +
          uTotalBookCheckinAugust23 +
          uTotalBookCheckinSeptember23 +
          uTotalBookCheckinOctober23 +
          uTotalBookCheckinNovember23 +
          uTotalBookCheckinDecember23,

        cfo:
          cfoTotalBookCheckinJan23 +
          cfoTotalBookCheckinFeb23 +
          cfoTotalBookCheckinMar23 +
          cfoTotalBookCheckinApr23 +
          cfoTotalBookCheckinMay23 +
          cfoTotalBookCheckinJune23 +
          cfoTotalBookCheckinJuly23 +
          cfoTotalBookCheckinAugust23 +
          cfoTotalBookCheckinSeptember23 +
          cfoTotalBookCheckinOctober23 +
          cfoTotalBookCheckinNovember23 +
          cfoTotalBookCheckinDecember23,
      },
      {
        sl: 4,
        area: 'Average Books Checkout Per Child',
        kutubdia: (
          (parseFloat(kNoBCOPerStudentJan23) +
            parseFloat(kNoBCOPerStudentFeb23) +
            parseFloat(kNoBCOPerStudentMar23) +
            parseFloat(kNoBCOPerStudentApr23) +
            parseFloat(kNoBCOPerStudentMay23) +
            parseFloat(kNoBCOPerStudentJune23) +
            parseFloat(kNoBCOPerStudentJuly23) +
            parseFloat(kNoBCOPerStudentAugust23) +
            parseFloat(kNoBCOPerStudentSeptember23) +
            parseFloat(kNoBCOPerStudentOctober23) +
            parseFloat(kNoBCOPerStudentNovember23) +
            parseFloat(kNoBCOPerStudentDecember23)) /
          12
        ).toFixed(2),
        ukhiya: (
          (parseFloat(uNoBCOPerStudentJan23) +
            parseFloat(uNoBCOPerStudentFeb23) +
            parseFloat(uNoBCOPerStudentMar23) +
            parseFloat(uNoBCOPerStudentApr23) +
            parseFloat(uNoBCOPerStudentMay23) +
            parseFloat(uNoBCOPerStudentJune23) +
            parseFloat(uNoBCOPerStudentJuly23) +
            parseFloat(uNoBCOPerStudentAugust23) +
            parseFloat(uNoBCOPerStudentSeptember23) +
            parseFloat(uNoBCOPerStudentOctober23) +
            parseFloat(uNoBCOPerStudentNovember23) +
            parseFloat(uNoBCOPerStudentDecember23)) /
          12
        ).toFixed(2),
        cfo: (
          (parseFloat(cfoNoBCOPerStudentJan23) +
            parseFloat(cfoNoBCOPerStudentFeb23) +
            parseFloat(cfoNoBCOPerStudentMar23) +
            parseFloat(cfoNoBCOPerStudentApr23) +
            parseFloat(cfoNoBCOPerStudentMay23) +
            parseFloat(cfoNoBCOPerStudentJune23) +
            parseFloat(cfoNoBCOPerStudentJuly23) +
            parseFloat(cfoNoBCOPerStudentAugust23) +
            parseFloat(cfoNoBCOPerStudentSeptember23) +
            parseFloat(cfoNoBCOPerStudentOctober23) +
            parseFloat(cfoNoBCOPerStudentNovember23) +
            parseFloat(cfoNoBCOPerStudentDecember23)) /
          12
        ).toFixed(2),
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
        kutubdia: kPercentStudentBCOAnnual23,
        ukhiya: uPercentStudentBCOAnnual23,
        cfo: cfoPercentStudentBCOAnnual23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIAnnual23,
        ukhiya: uNoStudentBCIAnnual23,
        cfo: cfoNoStudentBCIAnnual23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIAnnual23,
        ukhiya: uPercentStudentBCIAnnual23,
        cfo: cfoPercentStudentBCIAnnual23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOAnnual23,
        ukhiya: uNoGirlBCOAnnual23,
        cfo: cfoNoGirlBCOAnnual23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOAnnual23,
        ukhiya: uPercentGirlBCOAnnual23,
        cfo: cfoPercentGirlBCOAnnual23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOAnnual23,
        ukhiya: uNoBoyBCOAnnual23,
        cfo: cfoNoBoyBCOAnnual23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOAnnual23,
        ukhiya: uPercentBoyBCOAnnual23,
        cfo: cfoPercentBoyBCOAnnual23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOAnnual23,
        ukhiya: uNoSchoolBCOAnnual23,
        cfo: cfoNoSchoolBCOAnnual23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOAnnual23,
        ukhiya: uNoSchoolZeroBCOAnnual23,
        cfo: cfoNoSchoolZeroBCOAnnual23,
      },
    ]
    console.log('reportObject', reportObject23Annual)
    setReportData23Annual(reportObject23Annual)
  }

  // January
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

  // February
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

  // March
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

  // April
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

  // May
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

  // June
  const pushReportData23Jun = () => {
    const reportObject23June = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentJune23,
        ukhiya: uTotalStudentJune23,
        cfo: cfoTotalStudentJune23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutJune23,
        ukhiya: uTotalBookCheckoutJune23,
        cfo: cfoTotalBookCheckoutJune23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinJune23,
        ukhiya: uTotalBookCheckinJune23,
        cfo: cfoTotalBookCheckinJune23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentJune23,
        ukhiya: uNoBCOPerStudentJune23,
        cfo: cfoNoBCOPerStudentJune23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOJune23,
        ukhiya: uNoStudentBCOJune23,
        cfo: cfoNoStudentBCOJune23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOJune23,
        ukhiya: uPercentStudentBCOJune23,
        cfo: cfoPercentStudentBCOJune23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIJune23,
        ukhiya: uNoStudentBCIJune23,
        cfo: cfoNoStudentBCIJune23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIJune23,
        ukhiya: uPercentStudentBCIJune23,
        cfo: cfoPercentStudentBCIJune23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOJune23,
        ukhiya: uNoGirlBCOJune23,
        cfo: cfoNoGirlBCOJune23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOJune23,
        ukhiya: uPercentGirlBCOJune23,
        cfo: cfoPercentGirlBCOJune23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOJune23,
        ukhiya: uNoBoyBCOJune23,
        cfo: cfoNoBoyBCOJune23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOJune23,
        ukhiya: uPercentBoyBCOJune23,
        cfo: cfoPercentBoyBCOJune23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOJune23,
        ukhiya: uNoSchoolBCOJune23,
        cfo: cfoNoSchoolBCOJune23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOJune23,
        ukhiya: uNoSchoolZeroBCOJune23,
        cfo: cfoNoSchoolZeroBCOJune23,
      },
    ]
    console.log('reportObject', reportObject23June)
    setReportData23Jun(reportObject23June)
  }

  // July
  const pushReportData23Jul = () => {
    const reportObject23July = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentJuly23,
        ukhiya: uTotalStudentJuly23,
        cfo: cfoTotalStudentJuly23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutJuly23,
        ukhiya: uTotalBookCheckoutJuly23,
        cfo: cfoTotalBookCheckoutJuly23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinJuly23,
        ukhiya: uTotalBookCheckinJuly23,
        cfo: cfoTotalBookCheckinJuly23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentJuly23,
        ukhiya: uNoBCOPerStudentJuly23,
        cfo: cfoNoBCOPerStudentJuly23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOJuly23,
        ukhiya: uNoStudentBCOJuly23,
        cfo: cfoNoStudentBCOJuly23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOJuly23,
        ukhiya: uPercentStudentBCOJuly23,
        cfo: cfoPercentStudentBCOJuly23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIJuly23,
        ukhiya: uNoStudentBCIJuly23,
        cfo: cfoNoStudentBCIJuly23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIJuly23,
        ukhiya: uPercentStudentBCIJuly23,
        cfo: cfoPercentStudentBCIJuly23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOJuly23,
        ukhiya: uNoGirlBCOJuly23,
        cfo: cfoNoGirlBCOJuly23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOJuly23,
        ukhiya: uPercentGirlBCOJuly23,
        cfo: cfoPercentGirlBCOJuly23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOJuly23,
        ukhiya: uNoBoyBCOJuly23,
        cfo: cfoNoBoyBCOJuly23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOJuly23,
        ukhiya: uPercentBoyBCOJuly23,
        cfo: cfoPercentBoyBCOJuly23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOJuly23,
        ukhiya: uNoSchoolBCOJuly23,
        cfo: cfoNoSchoolBCOJuly23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOJuly23,
        ukhiya: uNoSchoolZeroBCOJuly23,
        cfo: cfoNoSchoolZeroBCOJuly23,
      },
    ]
    console.log('reportObject', reportObject23July)
    setReportData23Jul(reportObject23July)
  }

  // August
  const pushReportData23Aug = () => {
    const reportObject23August = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentAugust23,
        ukhiya: uTotalStudentAugust23,
        cfo: cfoTotalStudentAugust23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutAugust23,
        ukhiya: uTotalBookCheckoutAugust23,
        cfo: cfoTotalBookCheckoutAugust23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinAugust23,
        ukhiya: uTotalBookCheckinAugust23,
        cfo: cfoTotalBookCheckinAugust23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentAugust23,
        ukhiya: uNoBCOPerStudentAugust23,
        cfo: cfoNoBCOPerStudentAugust23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOAugust23,
        ukhiya: uNoStudentBCOAugust23,
        cfo: cfoNoStudentBCOAugust23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOAugust23,
        ukhiya: uPercentStudentBCOAugust23,
        cfo: cfoPercentStudentBCOAugust23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIAugust23,
        ukhiya: uNoStudentBCIAugust23,
        cfo: cfoNoStudentBCIAugust23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIAugust23,
        ukhiya: uPercentStudentBCIAugust23,
        cfo: cfoPercentStudentBCIAugust23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOAugust23,
        ukhiya: uNoGirlBCOAugust23,
        cfo: cfoNoGirlBCOAugust23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOAugust23,
        ukhiya: uPercentGirlBCOAugust23,
        cfo: cfoPercentGirlBCOAugust23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOAugust23,
        ukhiya: uNoBoyBCOAugust23,
        cfo: cfoNoBoyBCOAugust23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOAugust23,
        ukhiya: uPercentBoyBCOAugust23,
        cfo: cfoPercentBoyBCOAugust23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOAugust23,
        ukhiya: uNoSchoolBCOAugust23,
        cfo: cfoNoSchoolBCOAugust23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOAugust23,
        ukhiya: uNoSchoolZeroBCOAugust23,
        cfo: cfoNoSchoolZeroBCOAugust23,
      },
    ]
    console.log('reportObject', reportObject23August)
    setReportData23Aug(reportObject23August)
  }

  // September
  const pushReportData23Sep = () => {
    const reportObject23September = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentSeptember23,
        ukhiya: uTotalStudentSeptember23,
        cfo: cfoTotalStudentSeptember23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutSeptember23,
        ukhiya: uTotalBookCheckoutSeptember23,
        cfo: cfoTotalBookCheckoutSeptember23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinSeptember23,
        ukhiya: uTotalBookCheckinSeptember23,
        cfo: cfoTotalBookCheckinSeptember23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentSeptember23,
        ukhiya: uNoBCOPerStudentSeptember23,
        cfo: cfoNoBCOPerStudentSeptember23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOSeptember23,
        ukhiya: uNoStudentBCOSeptember23,
        cfo: cfoNoStudentBCOSeptember23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOSeptember23,
        ukhiya: uPercentStudentBCOSeptember23,
        cfo: cfoPercentStudentBCOSeptember23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCISeptember23,
        ukhiya: uNoStudentBCISeptember23,
        cfo: cfoNoStudentBCISeptember23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCISeptember23,
        ukhiya: uPercentStudentBCISeptember23,
        cfo: cfoPercentStudentBCISeptember23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOSeptember23,
        ukhiya: uNoGirlBCOSeptember23,
        cfo: cfoNoGirlBCOSeptember23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOSeptember23,
        ukhiya: uPercentGirlBCOSeptember23,
        cfo: cfoPercentGirlBCOSeptember23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOSeptember23,
        ukhiya: uNoBoyBCOSeptember23,
        cfo: cfoNoBoyBCOSeptember23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOSeptember23,
        ukhiya: uPercentBoyBCOSeptember23,
        cfo: cfoPercentBoyBCOSeptember23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOSeptember23,
        ukhiya: uNoSchoolBCOSeptember23,
        cfo: cfoNoSchoolBCOSeptember23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOSeptember23,
        ukhiya: uNoSchoolZeroBCOSeptember23,
        cfo: cfoNoSchoolZeroBCOSeptember23,
      },
    ]
    console.log('reportObject', reportObject23September)
    setReportData23Sep(reportObject23September)
  }

  // October
  const pushReportData23Oct = () => {
    const reportObject23October = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentOctober23,
        ukhiya: uTotalStudentOctober23,
        cfo: cfoTotalStudentOctober23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutOctober23,
        ukhiya: uTotalBookCheckoutOctober23,
        cfo: cfoTotalBookCheckoutOctober23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinOctober23,
        ukhiya: uTotalBookCheckinOctober23,
        cfo: cfoTotalBookCheckinOctober23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentOctober23,
        ukhiya: uNoBCOPerStudentOctober23,
        cfo: cfoNoBCOPerStudentOctober23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOOctober23,
        ukhiya: uNoStudentBCOOctober23,
        cfo: cfoNoStudentBCOOctober23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOOctober23,
        ukhiya: uPercentStudentBCOOctober23,
        cfo: cfoPercentStudentBCOOctober23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIOctober23,
        ukhiya: uNoStudentBCIOctober23,
        cfo: cfoNoStudentBCIOctober23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIOctober23,
        ukhiya: uPercentStudentBCIOctober23,
        cfo: cfoPercentStudentBCIOctober23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOOctober23,
        ukhiya: uNoGirlBCOOctober23,
        cfo: cfoNoGirlBCOOctober23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOOctober23,
        ukhiya: uPercentGirlBCOOctober23,
        cfo: cfoPercentGirlBCOOctober23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOOctober23,
        ukhiya: uNoBoyBCOOctober23,
        cfo: cfoNoBoyBCOOctober23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOOctober23,
        ukhiya: uPercentBoyBCOOctober23,
        cfo: cfoPercentBoyBCOOctober23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOOctober23,
        ukhiya: uNoSchoolBCOOctober23,
        cfo: cfoNoSchoolBCOOctober23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOOctober23,
        ukhiya: uNoSchoolZeroBCOOctober23,
        cfo: cfoNoSchoolZeroBCOOctober23,
      },
    ]
    console.log('reportObject', reportObject23October)
    setReportData23Oct(reportObject23October)
  }

  // November
  const pushReportData23Nov = () => {
    const reportObject23November = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentNovember23,
        ukhiya: uTotalStudentNovember23,
        cfo: cfoTotalStudentNovember23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutNovember23,
        ukhiya: uTotalBookCheckoutNovember23,
        cfo: cfoTotalBookCheckoutNovember23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinNovember23,
        ukhiya: uTotalBookCheckinNovember23,
        cfo: cfoTotalBookCheckinNovember23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentNovember23,
        ukhiya: uNoBCOPerStudentNovember23,
        cfo: cfoNoBCOPerStudentNovember23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCONovember23,
        ukhiya: uNoStudentBCONovember23,
        cfo: cfoNoStudentBCONovember23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCONovember23,
        ukhiya: uPercentStudentBCONovember23,
        cfo: cfoPercentStudentBCONovember23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCINovember23,
        ukhiya: uNoStudentBCINovember23,
        cfo: cfoNoStudentBCINovember23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCINovember23,
        ukhiya: uPercentStudentBCINovember23,
        cfo: cfoPercentStudentBCINovember23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCONovember23,
        ukhiya: uNoGirlBCONovember23,
        cfo: cfoNoGirlBCONovember23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCONovember23,
        ukhiya: uPercentGirlBCONovember23,
        cfo: cfoPercentGirlBCONovember23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCONovember23,
        ukhiya: uNoBoyBCONovember23,
        cfo: cfoNoBoyBCONovember23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCONovember23,
        ukhiya: uPercentBoyBCONovember23,
        cfo: cfoPercentBoyBCONovember23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCONovember23,
        ukhiya: uNoSchoolBCONovember23,
        cfo: cfoNoSchoolBCONovember23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCONovember23,
        ukhiya: uNoSchoolZeroBCONovember23,
        cfo: cfoNoSchoolZeroBCONovember23,
      },
    ]
    console.log('reportObject', reportObject23November)
    setReportData23Nov(reportObject23November)
  }

  // December
  const pushReportData23Dec = () => {
    const reportObject23December = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentDecember23,
        ukhiya: uTotalStudentDecember23,
        cfo: cfoTotalStudentDecember23,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutDecember23,
        ukhiya: uTotalBookCheckoutDecember23,
        cfo: cfoTotalBookCheckoutDecember23,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinDecember23,
        ukhiya: uTotalBookCheckinDecember23,
        cfo: cfoTotalBookCheckinDecember23,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentDecember23,
        ukhiya: uNoBCOPerStudentDecember23,
        cfo: cfoNoBCOPerStudentDecember23,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCODecember23,
        ukhiya: uNoStudentBCODecember23,
        cfo: cfoNoStudentBCODecember23,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCODecember23,
        ukhiya: uPercentStudentBCODecember23,
        cfo: cfoPercentStudentBCODecember23,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIDecember23,
        ukhiya: uNoStudentBCIDecember23,
        cfo: cfoNoStudentBCIDecember23,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIDecember23,
        ukhiya: uPercentStudentBCIDecember23,
        cfo: cfoPercentStudentBCIDecember23,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCODecember23,
        ukhiya: uNoGirlBCODecember23,
        cfo: cfoNoGirlBCODecember23,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCODecember23,
        ukhiya: uPercentGirlBCODecember23,
        cfo: cfoPercentGirlBCODecember23,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCODecember23,
        ukhiya: uNoBoyBCODecember23,
        cfo: cfoNoBoyBCODecember23,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCODecember23,
        ukhiya: uPercentBoyBCODecember23,
        cfo: cfoPercentBoyBCODecember23,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCODecember23,
        ukhiya: uNoSchoolBCODecember23,
        cfo: cfoNoSchoolBCODecember23,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCODecember23,
        ukhiya: uNoSchoolZeroBCODecember23,
        cfo: cfoNoSchoolZeroBCODecember23,
      },
    ]
    console.log('reportObject', reportObject23December)
    setReportData23Dec(reportObject23December)
  }
  // 2023

  // 2024
  // January
  const pushReportData24Jan = () => {
    const reportObject24Jan = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentJan24,
        ukhiya: uTotalStudentJan24,
        cfo: cfoTotalStudentJan24,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutJan24,
        ukhiya: uTotalBookCheckoutJan24,
        cfo: cfoTotalBookCheckoutJan24,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinJan24,
        ukhiya: uTotalBookCheckinJan24,
        cfo: cfoTotalBookCheckinJan24,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentJan24,
        ukhiya: uNoBCOPerStudentJan24,
        cfo: cfoNoBCOPerStudentJan24,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOJan24,
        ukhiya: uNoStudentBCOJan24,
        cfo: cfoNoStudentBCOJan24,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOJan24,
        ukhiya: uPercentStudentBCOJan24,
        cfo: cfoPercentStudentBCOJan24,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIJan24,
        ukhiya: uNoStudentBCIJan24,
        cfo: cfoNoStudentBCIJan24,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIJan24,
        ukhiya: uPercentStudentBCIJan24,
        cfo: cfoPercentStudentBCIJan24,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOJan24,
        ukhiya: uNoGirlBCOJan24,
        cfo: cfoNoGirlBCOJan24,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOJan24,
        ukhiya: uPercentGirlBCOJan24,
        cfo: cfoPercentGirlBCOJan24,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOJan24,
        ukhiya: uNoBoyBCOJan24,
        cfo: cfoNoBoyBCOJan24,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOJan24,
        ukhiya: uPercentBoyBCOJan24,
        cfo: cfoPercentBoyBCOJan24,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOJan24,
        ukhiya: uNoSchoolBCOJan24,
        cfo: cfoNoSchoolBCOJan24,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOJan24,
        ukhiya: uNoSchoolZeroBCOJan24,
        cfo: cfoNoSchoolZeroBCOJan24,
      },
    ]
    console.log('reportObject', reportObject24Jan)
    setReportData24Jan(reportObject24Jan)
  }

  // February
  const pushReportData24Feb = () => {
    const reportObject24Feb = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentFeb24,
        ukhiya: uTotalStudentFeb24,
        cfo: cfoTotalStudentFeb24,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutFeb24,
        ukhiya: uTotalBookCheckoutFeb24,
        cfo: cfoTotalBookCheckoutFeb24,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinFeb24,
        ukhiya: uTotalBookCheckinFeb24,
        cfo: cfoTotalBookCheckinFeb24,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentFeb24,
        ukhiya: uNoBCOPerStudentFeb24,
        cfo: cfoNoBCOPerStudentFeb24,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOFeb24,
        ukhiya: uNoStudentBCOFeb24,
        cfo: cfoNoStudentBCOFeb24,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOFeb24,
        ukhiya: uPercentStudentBCOFeb24,
        cfo: cfoPercentStudentBCOFeb24,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIFeb24,
        ukhiya: uNoStudentBCIFeb24,
        cfo: cfoNoStudentBCIFeb24,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIFeb24,
        ukhiya: uPercentStudentBCIFeb24,
        cfo: cfoPercentStudentBCIFeb24,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOFeb24,
        ukhiya: uNoGirlBCOFeb24,
        cfo: cfoNoGirlBCOFeb24,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOFeb24,
        ukhiya: uPercentGirlBCOFeb24,
        cfo: cfoPercentGirlBCOFeb24,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOFeb24,
        ukhiya: uNoBoyBCOFeb24,
        cfo: cfoNoBoyBCOFeb24,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOFeb24,
        ukhiya: uPercentBoyBCOFeb24,
        cfo: cfoPercentBoyBCOFeb24,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOFeb24,
        ukhiya: uNoSchoolBCOFeb24,
        cfo: cfoNoSchoolBCOFeb24,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOFeb24,
        ukhiya: uNoSchoolZeroBCOFeb24,
        cfo: cfoNoSchoolZeroBCOFeb24,
      },
    ]
    console.log('reportObject', reportObject24Feb)
    setReportData24Feb(reportObject24Feb)
  }

  // March
  const pushReportData24Mar = () => {
    const reportObject24Mar = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentMar24,
        ukhiya: uTotalStudentMar24,
        cfo: cfoTotalStudentMar24,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutMar24,
        ukhiya: uTotalBookCheckoutMar24,
        cfo: cfoTotalBookCheckoutMar24,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinMar24,
        ukhiya: uTotalBookCheckinMar24,
        cfo: cfoTotalBookCheckinMar24,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentMar24,
        ukhiya: uNoBCOPerStudentMar24,
        cfo: cfoNoBCOPerStudentMar24,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOMar24,
        ukhiya: uNoStudentBCOMar24,
        cfo: cfoNoStudentBCOMar24,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOMar24,
        ukhiya: uPercentStudentBCOMar24,
        cfo: cfoPercentStudentBCOMar24,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCIMar24,
        ukhiya: uNoStudentBCIMar24,
        cfo: cfoNoStudentBCIMar24,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCIMar24,
        ukhiya: uPercentStudentBCIMar24,
        cfo: cfoPercentStudentBCIMar24,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOMar24,
        ukhiya: uNoGirlBCOMar24,
        cfo: cfoNoGirlBCOMar24,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOMar24,
        ukhiya: uPercentGirlBCOMar24,
        cfo: cfoPercentGirlBCOMar24,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOMar24,
        ukhiya: uNoBoyBCOMar24,
        cfo: cfoNoBoyBCOMar24,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOMar24,
        ukhiya: uPercentBoyBCOMar24,
        cfo: cfoPercentBoyBCOMar24,
      },
      {
        sl: 13,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCOMar24,
        ukhiya: uNoSchoolBCOMar24,
        cfo: cfoNoSchoolBCOMar24,
      },
      {
        sl: 14,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCOMar24,
        ukhiya: uNoSchoolZeroBCOMar24,
        cfo: cfoNoSchoolZeroBCOMar24,
      },
    ]
    console.log('reportObject', reportObject24Mar)
    setReportData24Mar(reportObject24Mar)
  }
  // 2024

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
            <strong>Report-2024</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>January 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'January BCO Report 2024'}
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
                    data={reportData24Jan}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>February 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'February BCO Report 2024'}
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
                    data={reportData24Feb}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>March 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'March BCO Report 2024'}
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
                    data={reportData24Mar}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>April 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'April BCO Report 2024'}
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
                    //data={reportData23Apr}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>May 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'May BCO Report 2024'}
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
                    //data={reportData23May}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>June 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'June BCO Report 2024'}
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
                    //data={reportData23Jun}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>July 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'July BCO Report 2024'}
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
                    //data={reportData23Jul}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>August 2024</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'August BCO Report 2024'}
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
                    //data={reportData23Aug}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={9}>
                <CAccordionHeader>
                  <strong>September 2024</strong>
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
                    //data={reportData23Sep}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={10}>
                <CAccordionHeader>
                  <strong>October 2024</strong>
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
                    //data={reportData23Oct}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={11}>
                <CAccordionHeader>
                  <strong>November 2024</strong>
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
                    //data={reportData23Nov}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={12}>
                <CAccordionHeader>
                  <strong>December 2024</strong>
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
                    //data={reportData23Dec}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={13}>
                <CAccordionHeader>
                  <strong>Annual 2024</strong>
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
                    //data={reportData23Annual}
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
                  <strong>January 2023</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'January BCO Report 2023'}
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
                    title={'February BCO Report 2023'}
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
                    title={'March BCO Report 2023'}
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
                    title={'April BCO Report 2023'}
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
                    title={'May BCO Report 2023'}
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
                    title={'June BCO Report 2023'}
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
                    data={reportData23Jun}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>July 2023</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'July BCO Report 2023'}
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
                    data={reportData23Jul}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>August 2023</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'August BCO Report 2023'}
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
                    data={reportData23Aug}
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
                    data={reportData23Sep}
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
                    data={reportData23Oct}
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
                    data={reportData23Nov}
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
                    data={reportData23Dec}
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
                    //data={reportData23Annual}
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
