//  Author: Mohammad Jihad Hossain
//  Create Date: 09/09/2025
//  Modify Date: 04/11/2025
//  Description: PLFObservation  file

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

const PLFObservationDetail = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  //const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allLFObservationData, setAllLFObservationData] = useState([])

  const [allLibraryObservation, setAllLibraryObservation] = useState([])

  const [allDILibraryObservation, setAllDILibraryObservation] = useState([])

  // Area wise library data
  const [kutubdiaLibraryObservation, setKutubdiaLibraryObservation] = useState([])
  const [ukhiyaLibraryObservation, setUkhiyaLibraryObservation] = useState([])
  // Area wise library data

  // Month wise library data
  const [libraryObservationByMonth, setLibraryObservationByMonth] = useState([])
  // Month wise library data

  // Ovserall result
  // By Phase
  let ratingD = 'Developing'
  let phase1NumberD = 0
  let phase1PercentD = 0
  let phase2NumberD = 0
  let phase2PercentD = 0
  let phase3NumberD = 0
  let phase3PercentD = 0
  let phase4NumberD = 0
  let phase4PercentD = 0
  let overallNumberD = 0
  var overallPercentD = 0

  let ratingF = 'Functioning'
  let phase1NumberF = 0
  let phase1PercentF = 0
  let phase2NumberF = 0
  let phase2PercentF = 0
  let phase3NumberF = 0
  let phase3PercentF = 0
  let phase4NumberF = 0
  let phase4PercentF = 0
  let overallNumberF = 0
  let overallPercentF = 0

  let ratingHF = 'Highly Functioning'
  let phase1NumberHF = 0
  let phase1PercentHF = 0
  let phase2NumberHF = 0
  let phase2PercentHF = 0
  let phase3NumberHF = 0
  let phase3PercentHF = 0
  let phase4NumberHF = 0
  let phase4PercentHF = 0
  let overallNumberHF = 0
  let overallPercentHF = 0

  let ratingT = 'Total'
  let phase1NumberT = 0
  let phase1PercentT = 0
  let phase2NumberT = 0
  let phase2PercentT = 0
  let phase3NumberT = 0
  let phase3PercentT = 0
  let phase4NumberT = 0
  let phase4PercentT = 0
  let overallNumberT = 0
  let overallPercentT = 0
  // By Phase

  // By Province
  let provinceRatingD = 'Developing'
  let ukhiyaNumberD = 0
  let ukhiyaPercentD = 0
  let kutubdiaNumberD = 0
  let kutubdiaPercentD = 0

  let provinceRatingF = 'Functioning'
  let ukhiyaNumberF = 0
  let ukhiyaPercentF = 0
  let kutubdiaNumberF = 0
  let kutubdiaPercentF = 0

  let provinceRatingHF = 'Highly Functioning'
  let ukhiyaNumberHF = 0
  let ukhiyaPercentHF = 0
  let kutubdiaNumberHF = 0
  let kutubdiaPercentHF = 0

  let provinceRatingT = 'Total'
  let ukhiyaNumberT = 0
  let ukhiyaPercentT = 0
  let kutubdiaNumberT = 0
  let kutubdiaPercentT = 0
  // By Province
  // Ovserall result

  // Indicator Freq by Phase

  let ind1Phase2 = 0
  let ind1Phase4 = 0
  let ind1Overall = 0

  let ind2Phase2 = 0
  let ind2Phase4 = 0
  let ind2Overall = 0

  let ind3Phase2 = 0
  let ind3Phase4 = 0
  let ind3Overall = 0

  let ind4Phase2 = 0
  let ind4Phase4 = 0
  let ind4Overall = 0

  let ind5Phase2 = 0
  let ind5Phase4 = 0
  let ind5Overall = 0

  let ind6Phase2 = 0
  let ind6Phase4 = 0
  let ind6Overall = 0

  let ind7Phase2 = 0
  let ind7Phase4 = 0
  let ind7Overall = 0

  let ind8Phase2 = 0
  let ind8Phase4 = 0
  let ind8Overall = 0

  let ind9Phase2 = 0
  let ind9Phase4 = 0
  let ind9Overall = 0

  let ind10Phase2 = 0
  let ind10Phase4 = 0
  let ind10Overall = 0

  let ind11Phase2 = 0
  let ind11Phase4 = 0
  let ind11Overall = 0

  let ind12Phase2 = 0
  let ind12Phase4 = 0
  let ind12Overall = 0
  // Indicator Freq by Phase

  // Indicator Freq by Province
  let ind1UkhiyaPro = 0
  let ind1KutubdiaPro = 0
  let ind1OverallPro = 0

  let ind2UkhiyaPro = 0
  let ind2KutubdiaPro = 0
  let ind2OverallPro = 0

  let ind3UkhiyaPro = 0
  let ind3KutubdiaPro = 0
  let ind3OverallPro = 0

  let ind4UkhiyaPro = 0
  let ind4KutubdiaPro = 0
  let ind4OverallPro = 0

  let ind5UkhiyaPro = 0
  let ind5KutubdiaPro = 0
  let ind5OverallPro = 0

  let ind6UkhiyaPro = 0
  let ind6KutubdiaPro = 0
  let ind6OverallPro = 0

  let ind7UkhiyaPro = 0
  let ind7KutubdiaPro = 0
  let ind7OverallPro = 0

  let ind8UkhiyaPro = 0
  let ind8KutubdiaPro = 0
  let ind8OverallPro = 0

  let ind9UkhiyaPro = 0
  let ind9KutubdiaPro = 0
  let ind9OverallPro = 0

  let ind10UkhiyaPro = 0
  let ind10KutubdiaPro = 0
  let ind10OverallPro = 0

  let ind11UkhiyaPro = 0
  let ind11KutubdiaPro = 0
  let ind11OverallPro = 0

  let ind12UkhiyaPro = 0
  let ind12KutubdiaPro = 0
  let ind12OverallPro = 0
  // Indicator Freq by Province

  // Results overtime
  let phase1Q1NumD = 0
  let phase1Q1PercD = 0
  let phase1Q3NumD = 0
  let phase1Q3PercD = 0
  let phase2Q1NumD = 0
  let phase2Q1PercD = 0
  let phase2Q3NumD = 0
  let phase2Q3PercD = 0
  let phase3Q1NumD = 0
  let phase3Q1PercD = 0
  let phase3Q3NumD = 0
  let phase3Q3PercD = 0
  let phase4Q1NumD = 0
  let phase4Q1PercD = 0
  let overallQ1NumD = 0
  let overallQ1PercD = 0
  let overallQ3NumD = 0
  let overallQ3PercD = 0

  let phase1Q1NumF = 0
  let phase1Q1PercF = 0
  let phase1Q3NumF = 0
  let phase1Q3PercF = 0
  let phase2Q1NumF = 0
  let phase2Q1PercF = 0
  let phase2Q3NumF = 0
  let phase2Q3PercF = 0
  let phase3Q1NumF = 0
  let phase3Q1PercF = 0
  let phase3Q3NumF = 0
  let phase3Q3PercF = 0
  let phase4Q1NumF = 0
  let phase4Q1PercF = 0
  let overallQ1NumF = 0
  let overallQ1PercF = 0
  let overallQ3NumF = 0
  let overallQ3PercF = 0

  let phase1Q1NumHF = 0
  let phase1Q1PercHF = 0
  let phase1Q3NumHF = 0
  let phase1Q3PercHF = 0
  let phase2Q1NumHF = 0
  let phase2Q1PercHF = 0
  let phase2Q3NumHF = 0
  let phase2Q3PercHF = 0
  let phase3Q1NumHF = 0
  let phase3Q1PercHF = 0
  let phase3Q3NumHF = 0
  let phase3Q3PercHF = 0
  let phase4Q1NumHF = 0
  let phase4Q1PercHF = 0
  let overallQ1NumHF = 0
  let overallQ1PercHF = 0
  let overallQ3NumHF = 0
  let overallQ3PercHF = 0

  let phase1Q1NumT = 0
  let phase1Q1PercT = 0
  let phase1Q3NumT = 0
  let phase1Q3PercT = 0
  let phase2Q1NumT = 0
  let phase2Q1PercT = 0
  let phase2Q3NumT = 0
  let phase2Q3PercT = 0
  let phase3Q1NumT = 0
  let phase3Q1PercT = 0
  let phase3Q3NumT = 0
  let phase3Q3PercT = 0
  let phase4Q1NumT = 0
  let phase4Q1PercT = 0
  let overallQ1NumT = 0
  let overallQ1PercT = 0
  let overallQ3NumT = 0
  let overallQ3PercT = 0

  // Results overtime

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

  // Report data
  const [reportOvserallByPhase, setReportOvserallByPhase] = useState([])
  const [reportOvserallByProvince, setReportOvserallByProvince] = useState([])
  const [reportFreqByPhase, setReportFreqByPhase] = useState([])
  const [reportFreqByProvince, setReportFreqByProvince] = useState([])
  const [reportResultOverTime, setReportResultOverTime] = useState([])

  // Chart Data
  const [rsrAllLibrariesChartData, setrsrAllLibrariesChartData] = useState({})
  const [rsrByPhaseChartData, setrsrByPhaseChartData] = useState({})
  const [rsrByProvinceChartData, setrsrByProvinceChartData] = useState({})
  const [changeRatingPIIChartData, setchangeRatingPIIChartData] = useState({})
  const [changeRatingAllChartData, setchangeRatingAllChartData] = useState({})

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  // Chart Data

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')

      await getAllLFObservation()
      await getAllLibraryObservation(console.log('Get All Library observation called'))
      await getAllDILibraryObservation(console.log('Get All DI Library observation called'))

      pushOverallResultByPhase()
      pushOverallResultByProvince()
      pushIndicatorFreqByPhase()
      pushIndicatorFreqByProvince()
      pushResultOverTime()

      // Chart
      pushRSRAllLibrariesChartData()
      pushRSRByPhaseChartData()
      pushRSRByProvinceChartData()
      pushChangeRatingPIIChartData()
      pushChangeRatingAllChartData()
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // LF Observation Data by filter
  const allLFObsDataCurrent = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025'
  }).length

  const allLFObsDataPreviousMonth = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025'
  }).length

  // Current Month
  const allLFObsCurrentMonth = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025'
  }).length

  const allLFObsCurrentMonthP1 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsCurrentMonthP2 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsCurrentMonthP3 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length
  // Current Month

  // Previous Month
  const allLFObsPreviousMonth = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025'
  }).length

  const allLFObsPreviousMonthP1 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsPreviousMonthP2 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsPreviousMonthP3 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length
  // Previous Month

  // Trending
  // Priority 1
  const allLFObservationDataP1January = allLFObservationData.filter((item) => {
    return item.month === 'January' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1February = allLFObservationData.filter((item) => {
    return item.month === 'February' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1March = allLFObservationData.filter((item) => {
    return item.month === 'March' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1April = allLFObservationData.filter((item) => {
    return item.month === 'April' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1May = allLFObservationData.filter((item) => {
    return item.month === 'May' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1June = allLFObservationData.filter((item) => {
    return item.month === 'June' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1July = allLFObservationData.filter((item) => {
    return item.month === 'July' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1August = allLFObservationData.filter((item) => {
    return item.month === 'August' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1September = allLFObservationData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1October = allLFObservationData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1November = allLFObservationData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1December = allLFObservationData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 1'
  }).length
  // Priority 1

  // Priority 2
  const allLFObservationDataP2January = allLFObservationData.filter((item) => {
    return item.month === 'January' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2February = allLFObservationData.filter((item) => {
    return item.month === 'February' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2March = allLFObservationData.filter((item) => {
    return item.month === 'March' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2April = allLFObservationData.filter((item) => {
    return item.month === 'April' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2May = allLFObservationData.filter((item) => {
    return item.month === 'May' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2June = allLFObservationData.filter((item) => {
    return item.month === 'June' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2July = allLFObservationData.filter((item) => {
    return item.month === 'July' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2August = allLFObservationData.filter((item) => {
    return item.month === 'August' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2September = allLFObservationData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2October = allLFObservationData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2November = allLFObservationData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2December = allLFObservationData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 2'
  }).length
  // Priority 2

  // Priority 3
  const allLFObservationDataP3January = allLFObservationData.filter((item) => {
    return item.month === 'January' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3February = allLFObservationData.filter((item) => {
    return item.month === 'February' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3March = allLFObservationData.filter((item) => {
    return item.month === 'March' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3April = allLFObservationData.filter((item) => {
    return item.month === 'April' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3May = allLFObservationData.filter((item) => {
    return item.month === 'May' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3June = allLFObservationData.filter((item) => {
    return item.month === 'June' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3July = allLFObservationData.filter((item) => {
    return item.month === 'July' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3August = allLFObservationData.filter((item) => {
    return item.month === 'August' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3September = allLFObservationData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3October = allLFObservationData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3November = allLFObservationData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3December = allLFObservationData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 3'
  }).length
  // Priority 3
  // Trending
  // LF Observation Data by filter

  // Get All LFObservation Data
  const getAllLFObservation = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-lf-observation', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLFObservationData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All LFObservation Data

  // Get All Library observation
  const getAllLibraryObservation = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/library-observations', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLibraryObservation(response.data)

      setKutubdiaLibraryObservation(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaLibraryObservation(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      // Ovserall result
      // By Phase
      phase3NumberD = parseInt(
        response.data.filter((item) => {
          return item.year === '2022' && item.libraryStatus === 'Developing'
        }).length,
      )
      phase3PercentD = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.libraryStatus === 'Developing'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      phase4NumberD = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.libraryStatus === 'Developing'
        }).length,
      )
      phase4PercentD = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.libraryStatus === 'Developing'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      overallNumberD = 0 + 0 + phase3NumberD + phase4NumberD
      overallPercentD = ((0 + 0 + phase3PercentD + phase4PercentD) / 2).toFixed(2)

      phase3NumberF = parseInt(
        response.data.filter((item) => {
          return item.year === '2022' && item.libraryStatus === 'Functioning'
        }).length,
      )
      phase3PercentF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.libraryStatus === 'Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      phase4NumberF = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.libraryStatus === 'Functioning'
        }).length,
      )
      phase4PercentF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.libraryStatus === 'Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      overallNumberF = 0 + 0 + phase3NumberF + phase4NumberF
      overallPercentF = ((0 + 0 + phase3PercentF + phase4PercentF) / 2).toFixed(2)

      phase3NumberHF = parseInt(
        response.data.filter((item) => {
          return item.year === '2022' && item.libraryStatus === 'Highly Functioning'
        }).length,
      )

      phase3PercentHF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.libraryStatus === 'Highly Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      phase4NumberHF = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.libraryStatus === 'Highly Functioning'
        }).length,
      )

      phase4PercentHF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.libraryStatus === 'Highly Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      overallNumberHF = 0 + 0 + phase3NumberHF + phase4NumberHF
      overallPercentHF = ((0 + 0 + phase3PercentHF + phase4PercentHF) / 2).toFixed(2)

      phase3NumberT = phase3NumberD + phase3NumberF + phase3NumberHF

      phase3PercentT = phase3PercentD + phase3PercentF + phase3PercentHF

      phase4NumberT = phase4NumberD + phase4NumberF + phase4NumberHF

      phase4PercentT = phase4PercentD + phase4PercentF + phase4PercentHF

      overallNumberT = overallNumberD + overallNumberF + overallNumberHF

      overallPercentT = (
        parseFloat(overallPercentD) +
        parseFloat(overallPercentF) +
        parseFloat(overallPercentHF)
      ).toFixed(2)

      // By Phase

      // By Province
      ukhiyaNumberD = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.libraryStatus === 'Developing' &&
            item.upazilla === 'Ukhiya'
          )
        }).length,
      )
      ukhiyaPercentD = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Developing' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      kutubdiaNumberD = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.libraryStatus === 'Developing' &&
            item.upazilla === 'Kutubdia'
          )
        }).length,
      )
      kutubdiaPercentD = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Developing' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ukhiyaNumberF = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.libraryStatus === 'Functioning' &&
            item.upazilla === 'Ukhiya'
          )
        }).length,
      )
      ukhiyaPercentF = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Functioning' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )

      kutubdiaNumberF = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.libraryStatus === 'Functioning' &&
            item.upazilla === 'Kutubdia'
          )
        }).length,
      )
      kutubdiaPercentF = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Functioning' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )

      ukhiyaNumberHF = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.libraryStatus === 'Highly Functioning' &&
            item.upazilla === 'Ukhiya'
          )
        }).length,
      )
      ukhiyaPercentHF = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Highly Functioning' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      kutubdiaNumberHF = parseInt(
        response.data.filter((item) => {
          return (
            item.year === '2023' &&
            item.libraryStatus === 'Highly Functioning' &&
            item.upazilla === 'Kutubdia'
          )
        }).length,
      )
      kutubdiaPercentHF = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Highly Functioning' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )

      ukhiyaNumberT =
        parseInt(
          response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Developing' &&
              item.upazilla === 'Ukhiya'
            )
          }).length,
        ) +
        parseInt(
          response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Functioning' &&
              item.upazilla === 'Ukhiya'
            )
          }).length,
        ) +
        parseInt(
          response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Highly Functioning' &&
              item.upazilla === 'Ukhiya'
            )
          }).length,
        )
      ukhiyaPercentT = (
        parseFloat(
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Developing' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length,
        ) +
        parseFloat(
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Functioning' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length,
        ) +
        parseFloat(
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Highly Functioning' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length,
        )
      ).toFixed(2)
      kutubdiaNumberT =
        parseInt(
          response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Developing' &&
              item.upazilla === 'Kutubdia'
            )
          }).length,
        ) +
        parseInt(
          response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Functioning' &&
              item.upazilla === 'Kutubdia'
            )
          }).length,
        ) +
        parseInt(
          response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Highly Functioning' &&
              item.upazilla === 'Kutubdia'
            )
          }).length,
        )
      kutubdiaPercentT = (
        parseFloat(
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Developing' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Kutubdia'
            }).length,
        ) +
        parseFloat(
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Functioning' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Kutubdia'
            }).length,
        ) +
        parseFloat(
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.libraryStatus === 'Highly Functioning' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Kutubdia'
            }).length,
        )
      ).toFixed(2)

      // By Province
      // Ovserall result

      // Indicator Freq by Phase
      ind1Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind1IsTrainedAllTeacher === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      ind1Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind1IsTrainedAllTeacher === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      ind1Overall = ((ind1Phase2 + ind1Phase4) / 2).toFixed(2)

      ind2Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind2ClassroomSuitableSRM === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      ind2Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind2ClassroomSuitableSRM === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      ind2Overall = ((ind2Phase2 + ind2Phase4) / 2).toFixed(2)

      ind3Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind3BookselfUseable === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      ind3Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind3BookselfUseable === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      ind3Overall = ((ind3Phase2 + ind3Phase4) / 2).toFixed(2)

      ind4Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind4BookRegisterUpdated === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      ind4Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind4BookRegisterUpdated === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      ind4Overall = ((ind4Phase2 + ind4Phase4) / 2).toFixed(2)

      ind5Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind5BookselfOrganized === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      ind5Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind5BookselfOrganized === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind5Overall = ((ind5Phase2 + ind5Phase4) / 2).toFixed(2)

      ind6Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind6PrintRichDisplayed === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      ind6Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind6PrintRichDisplayed === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind6Overall = ((ind6Phase2 + ind6Phase4) / 2).toFixed(2)

      ind7Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind7BookCheckoutFunctional === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      ind7Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind7BookCheckoutFunctional === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind7Overall = ((ind7Phase2 + ind7Phase4) / 2).toFixed(2)

      ind8Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind8SRMClassRoutine === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      ind8Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind8SRMClassRoutine === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind8Overall = ((ind8Phase2 + ind8Phase4) / 2).toFixed(2)

      ind9Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind9SRMRegisterUpdated === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      ind9Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind9SRMRegisterUpdated === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind9Overall = ((ind9Phase2 + ind9Phase4) / 2).toFixed(2)

      ind10Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind10ParentsMeeting === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      ind10Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind10ParentsMeeting === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind10Overall = ((ind10Phase2 + ind10Phase4) / 2).toFixed(2)

      ind11Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind11ReadFestival === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      ind11Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind11ReadFestival === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind11Overall = ((ind11Phase2 + ind11Phase4) / 2).toFixed(2)

      ind12Phase2 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.ind12SustainabilityPlan === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      ind12Phase4 = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.ind12SustainabilityPlan === 'Yes'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      ind12Overall = ((ind12Phase2 + ind12Phase4) / 2).toFixed(2)

      // Indicator Freq by Phase

      // Indicator Freq by Province
      ind1UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind1IsTrainedAllTeacher === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind1KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind1IsTrainedAllTeacher === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind1OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind1IsTrainedAllTeacher === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind1IsTrainedAllTeacher === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind2UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind2ClassroomSuitableSRM === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )

      ind2KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind2ClassroomSuitableSRM === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )

      ind2OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind2ClassroomSuitableSRM === 'Yes' &&
                item.upazilla === 'Kutubdia'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind2ClassroomSuitableSRM === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind3UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind3BookselfUseable === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind3KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind3BookselfUseable === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind3OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind3BookselfUseable === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind3BookselfUseable === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind4UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind4BookRegisterUpdated === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind4KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind4BookRegisterUpdated === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind4OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind4BookRegisterUpdated === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind4BookRegisterUpdated === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind5UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind5BookselfOrganized === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind5KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind5BookselfOrganized === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind5OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind5BookselfOrganized === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind5BookselfOrganized === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind6UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind6PrintRichDisplayed === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind6KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind6PrintRichDisplayed === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind6OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind6PrintRichDisplayed === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind6PrintRichDisplayed === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind7UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind7BookCheckoutFunctional === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind7KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind7BookCheckoutFunctional === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind7OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind7BookCheckoutFunctional === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind7BookCheckoutFunctional === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind8UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind8SRMClassRoutine === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind8KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind8SRMClassRoutine === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind8OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind8SRMClassRoutine === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind8SRMClassRoutine === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind9UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind9SRMRegisterUpdated === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind9KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind9SRMRegisterUpdated === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind9OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind9SRMRegisterUpdated === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind9SRMRegisterUpdated === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind10UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind10ParentsMeeting === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind10KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind10ParentsMeeting === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind10OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind10ParentsMeeting === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind10ParentsMeeting === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind11UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' && item.ind11ReadFestival === 'Yes' && item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind11KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind11ReadFestival === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind11OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind11ReadFestival === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind11ReadFestival === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)

      ind12UkhiyaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind12SustainabilityPlan === 'Yes' &&
              item.upazilla === 'Ukhiya'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Ukhiya'
          }).length
        ).toFixed(2),
      )
      ind12KutubdiaPro = parseFloat(
        (
          (response.data.filter((item) => {
            return (
              item.year === '2023' &&
              item.ind12SustainabilityPlan === 'Yes' &&
              item.upazilla === 'Kutubdia'
            )
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023' && item.upazilla === 'Kutubdia'
          }).length
        ).toFixed(2),
      )
      ind12OverallPro = (
        (parseFloat(
          (
            (response.data.filter((item) => {
              return (
                item.year === '2023' &&
                item.ind12SustainabilityPlan === 'Yes' &&
                item.upazilla === 'Ukhiya'
              )
            }).length *
              100) /
            response.data.filter((item) => {
              return item.year === '2023' && item.upazilla === 'Ukhiya'
            }).length
          ).toFixed(2),
        ) +
          parseFloat(
            (
              (response.data.filter((item) => {
                return (
                  item.year === '2023' &&
                  item.ind12SustainabilityPlan === 'Yes' &&
                  item.upazilla === 'Kutubdia'
                )
              }).length *
                100) /
              response.data.filter((item) => {
                return item.year === '2023' && item.upazilla === 'Kutubdia'
              }).length
            ).toFixed(2),
          )) /
        2
      ).toFixed(2)
      // Indicator Freq by Province

      // Results overtime

      phase3Q3NumD = parseInt(
        response.data.filter((item) => {
          return item.year === '2022' && item.libraryStatus === 'Developing'
        }).length,
      )
      phase3Q3PercD = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.libraryStatus === 'Developing'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )

      overallQ3NumD = phase3Q3NumD
      overallQ3PercD = phase3Q3PercD

      phase4Q1NumD = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.libraryStatus === 'Developing'
        }).length,
      )
      phase4Q1PercD = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.libraryStatus === 'Developing'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )

      overallQ1NumD = phase4Q1NumD
      overallQ1PercD = phase4Q1PercD

      phase3Q3NumF = parseInt(
        response.data.filter((item) => {
          return item.year === '2022' && item.libraryStatus === 'Functioning'
        }).length,
      )
      phase3Q3PercF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.libraryStatus === 'Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      overallQ3NumF = phase3Q3NumF
      overallQ3PercF = phase3Q3PercF

      phase4Q1NumF = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.libraryStatus === 'Functioning'
        }).length,
      )
      phase4Q1PercF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.libraryStatus === 'Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      overallQ1NumF = phase4Q1NumF
      overallQ1PercF = phase4Q1PercF

      phase3Q3NumHF = parseInt(
        response.data.filter((item) => {
          return item.year === '2022' && item.libraryStatus === 'Highly Functioning'
        }).length,
      )
      phase3Q3PercHF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2022' && item.libraryStatus === 'Highly Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2022'
          }).length
        ).toFixed(2),
      )
      overallQ3NumHF = phase3Q3NumHF
      overallQ3PercHF = phase3Q3PercHF

      phase4Q1NumHF = parseInt(
        response.data.filter((item) => {
          return item.year === '2023' && item.libraryStatus === 'Highly Functioning'
        }).length,
      )
      phase4Q1PercHF = parseFloat(
        (
          (response.data.filter((item) => {
            return item.year === '2023' && item.libraryStatus === 'Highly Functioning'
          }).length *
            100) /
          response.data.filter((item) => {
            return item.year === '2023'
          }).length
        ).toFixed(2),
      )
      overallQ1NumHF = phase4Q1NumHF
      overallQ1PercHF = phase4Q1PercHF

      phase3Q3NumT = phase3Q3NumD + phase3Q3NumF + phase3Q3NumHF
      phase3Q3PercT = phase3Q3PercD + phase3Q3PercF + phase3Q3PercHF

      overallQ3NumT = phase3Q3NumD + phase3Q3NumF + phase3Q3NumHF
      overallQ3PercT = phase3Q3PercD + phase3Q3PercF + phase3Q3PercHF

      phase4Q1NumT = phase4Q1NumD + phase4Q1NumF + phase4Q1NumHF
      phase4Q1PercT = phase4Q1PercD + phase4Q1PercF + phase4Q1PercHF
      overallQ1NumT = phase4Q1NumD + phase4Q1NumF + phase4Q1NumHF
      overallQ1PercT = phase4Q1PercD + phase4Q1PercF + phase4Q1PercHF

      // Results overtime

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Library observation

  // Get All Library observation
  const getAllDILibraryObservation = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/di-library-observation', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllDILibraryObservation(response.data)

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Library observation

  // Row update function
  const handleRowUpdateAllLFObservation = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/p-lf-observation/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allLFObservationData]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllLFObservationData([...dataUpdate])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/library-observations/' + newData.id)
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
  const handleRowAddLFObservation = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/p-lf-observation/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allLFObservationData]
          dataToAdd.push(newData)
          setAllLFObservationData([...dataToAdd])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Add LibraryObservation failed! Server error'])
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
  const handleRowDeleteLFObservation = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/p-lf-observation/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allLFObservationData]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllLFObservationData([...dataDelete])
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

  // Ovserall result
  // By Phase
  const pushOverallResultByPhase = () => {
    console.log('allLibraryObservation: ', allLibraryObservation.length)
    const reportObjectOverallResultByPhase = [
      {
        rating: ratingD,
        phase1Number: phase1NumberD,
        phase1Percent: phase1PercentD,
        phase2Number: phase2NumberD,
        phase2Percent: phase2PercentD,
        phase3Number: phase3NumberD,
        phase3Percent: phase3PercentD,
        phase4Number: phase4NumberD,
        phase4Percent: phase4PercentD,
        overallNumber: overallNumberD,
        overallPercent: overallPercentD,
      },
      {
        rating: ratingF,
        phase1Number: phase1NumberF,
        phase1Percent: phase1PercentF,
        phase2Number: phase2NumberF,
        phase2Percent: phase2PercentF,
        phase3Number: phase3NumberF,
        phase3Percent: phase3PercentF,
        phase4Number: phase4NumberF,
        phase4Percent: phase4PercentF,
        overallNumber: overallNumberF,
        overallPercent: overallPercentF,
      },
      {
        rating: ratingHF,
        phase1Number: phase1NumberHF,
        phase1Percent: phase1PercentHF,
        phase2Number: phase2NumberHF,
        phase2Percent: phase2PercentHF,
        phase3Number: phase3NumberHF,
        phase3Percent: phase3PercentHF,
        phase4Number: phase4NumberHF,
        phase4Percent: phase4PercentHF,
        overallNumber: overallNumberHF,
        overallPercent: overallPercentHF,
      },
      {
        rating: ratingT,
        phase1Number: phase1NumberT,
        phase1Percent: phase1PercentT,
        phase2Number: phase2NumberT,
        phase2Percent: phase2PercentT,
        phase3Number: phase3NumberT,
        phase3Percent: phase3PercentT,
        phase4Number: phase4NumberT,
        phase4Percent: phase4PercentT,
        overallNumber: overallNumberT,
        overallPercent: overallPercentT,
      },
    ]
    console.log('reportObjectOverallResultByPhase :', reportObjectOverallResultByPhase)
    setReportOvserallByPhase(reportObjectOverallResultByPhase)
  }
  // By Phase

  // By Province
  const pushOverallResultByProvince = () => {
    const reportObjectOverallResultByProvince = [
      {
        rating: provinceRatingD,
        ukhiyaNumber: ukhiyaNumberD,
        ukhiyaPercent: ukhiyaPercentD,
        kutubdiaNumber: kutubdiaNumberD,
        kutubdiaPercent: kutubdiaPercentD,
      },
      {
        rating: provinceRatingF,
        ukhiyaNumber: ukhiyaNumberF,
        ukhiyaPercent: ukhiyaPercentF,
        kutubdiaNumber: kutubdiaNumberF,
        kutubdiaPercent: kutubdiaPercentF,
      },
      {
        rating: provinceRatingHF,
        ukhiyaNumber: ukhiyaNumberHF,
        ukhiyaPercent: ukhiyaPercentHF,
        kutubdiaNumber: kutubdiaNumberHF,
        kutubdiaPercent: kutubdiaPercentHF,
      },
      {
        rating: provinceRatingT,
        ukhiyaNumber: ukhiyaNumberT,
        ukhiyaPercent: ukhiyaPercentT,
        kutubdiaNumber: kutubdiaNumberT,
        kutubdiaPercent: kutubdiaPercentT,
      },
    ]
    console.log('reportObjectOverallResultByProvince :', reportObjectOverallResultByProvince)
    setReportOvserallByProvince(reportObjectOverallResultByProvince)
  }
  // By Province
  // Ovserall result

  // Indicator Freq by Phase
  const pushIndicatorFreqByPhase = () => {
    const reportIndicatorFreqByPhase = [
      {
        indicator:
          '১। বিদ্যালয়ের সংশ্লিষ্ট শিক্ষক পাঠাগার ব্যবস্থাপনা বিষয়ে প্রশিক্ষণে অংশগ্রহণ করেছেন',
        phase2: ind1Phase2,
        phase4: ind1Phase4,
        overall: ind1Overall,
      },
      {
        indicator: '২। পাঠাগার কার্যক্রম পরিচালনার জন্য শ্রেণিকক্ষগুলো উপযোগী',
        phase2: ind2Phase2,
        phase4: ind2Phase4,
        overall: ind2Overall,
      },
      {
        indicator:
          '৩। পাঠাগারগুলোর বুক শেলফ ও টেবিলগুলো ঠিকমতো স্থাপন করা হয়েছে এবং ভালো অবস্থায় আছে',
        phase2: ind3Phase2,
        phase4: ind3Phase4,
        overall: ind3Overall,
      },
      {
        indicator: '৪। বুক রেজিস্টার আছে এবং নতুন বই পাওয়ার সাথে সাথে নিয়মিত হালনাগাদ করা হয়',
        phase2: ind4Phase2,
        phase4: ind4Phase4,
        overall: ind4Overall,
      },
      {
        indicator: '৫। বুক শেলফে নির্দেশনা অনুযায়ী বই সাজানো হয়েছে',
        phase2: ind5Phase2,
        phase4: ind5Phase4,
        overall: ind5Overall,
      },
      {
        indicator:
          '৬। ছাপাসমৃদ্ধ উপকরণ যেমন চার্ট, পোস্টার অথবা শিক্ষার্থীদের সৃজনশীল কাজ (আঁকা এবং লেখা) প্রদর্শিত আছে',
        phase2: ind6Phase2,
        phase4: ind6Phase4,
        overall: ind6Overall,
      },
      {
        indicator: '৭। কার্যকরী বই চেক-আউট ব্যবস্থা বিদ্যমান আছে',
        phase2: ind7Phase2,
        phase4: ind7Phase4,
        overall: ind7Overall,
      },
      {
        indicator: '৮। নির্দিষ্ট পড়ার ঘণ্টা বিদ্যমান রয়েছে',
        phase2: ind8Phase2,
        phase4: ind8Phase4,
        overall: ind8Overall,
      },
      {
        indicator:
          '৯। পড়াভিত্তিক কার্যক্রমের তথ্য লিপিবদ্ধ করার জন্য একটি রেজিস্টার রয়েছে এবং শিক্ষকগন প্রতি সপ্তাহে পড়ার ঘণ্টায় কী কী কার্যক্রম করেছেন তা লিপিবদ্ধ করেন',
        phase2: ind9Phase2,
        phase4: ind9Phase4,
        overall: ind9Overall,
      },
      {
        indicator:
          '১০। গত ছয় মাসে কমপক্ষে একটি অভিভাবক সভা হয়েছে যেখানে শিক্ষার্থীদের পঠন অথবা পাঠাগার বিষয়ে আলোচনা হয়েছে',
        phase2: ind10Phase2,
        phase4: ind10Phase4,
        overall: ind10Overall,
      },
      {
        indicator:
          '১১। বিদ্যালয়ে বিগত বছরে অভিভাবক ও স্থানীয় জনগণের অংশগ্রহণে অন্তত একটি পড়া বিষয়ক অনুষ্ঠান হয়েছে',
        phase2: ind11Phase2,
        phase4: ind11Phase4,
        overall: ind11Overall,
      },
      {
        indicator:
          '১২। পাঠাগার কর্মসূচি দীর্ঘমেয়াদে পরিচালনার জন্য ব্যবস্থাপনা কমিটি পরিকল্পনা গ্রহণ করেছে',
        phase2: ind12Phase2,
        phase4: ind12Phase4,
        overall: ind12Overall,
      },
    ]
    console.log(
      'reportObjectOverallreportIndicatorFreqByPhaseResultByProvince :',
      reportIndicatorFreqByPhase,
    )
    setReportFreqByPhase(reportIndicatorFreqByPhase)
  }
  // Indicator Freq by Phase

  // Indicator Freq by Province
  const pushIndicatorFreqByProvince = () => {
    const reportIndicatorFreqByProvince = [
      {
        indicator:
          '১। বিদ্যালয়ের সংশ্লিষ্ট শিক্ষক পাঠাগার ব্যবস্থাপনা বিষয়ে প্রশিক্ষণে অংশগ্রহণ করেছেন',
        ukhiya: ind1UkhiyaPro,
        kutubdia: ind1KutubdiaPro,
        overall: ind1OverallPro,
      },
      {
        indicator: '২। পাঠাগার কার্যক্রম পরিচালনার জন্য শ্রেণিকক্ষগুলো উপযোগী',
        ukhiya: ind2UkhiyaPro,
        kutubdia: ind2KutubdiaPro,
        overall: ind2OverallPro,
      },
      {
        indicator:
          '৩। পাঠাগারগুলোর বুক শেলফ ও টেবিলগুলো ঠিকমতো স্থাপন করা হয়েছে এবং ভালো অবস্থায় আছে',
        ukhiya: ind3UkhiyaPro,
        kutubdia: ind3KutubdiaPro,
        overall: ind3OverallPro,
      },
      {
        indicator: '৪। বুক রেজিস্টার আছে এবং নতুন বই পাওয়ার সাথে সাথে নিয়মিত হালনাগাদ করা হয়',
        ukhiya: ind4UkhiyaPro,
        kutubdia: ind4KutubdiaPro,
        overall: ind4OverallPro,
      },
      {
        indicator: '৫। বুক শেলফে নির্দেশনা অনুযায়ী বই সাজানো হয়েছে',
        ukhiya: ind5UkhiyaPro,
        kutubdia: ind5KutubdiaPro,
        overall: ind5OverallPro,
      },
      {
        indicator:
          '৬। ছাপাসমৃদ্ধ উপকরণ যেমন চার্ট, পোস্টার অথবা শিক্ষার্থীদের সৃজনশীল কাজ (আঁকা এবং লেখা) প্রদর্শিত আছে',
        ukhiya: ind6UkhiyaPro,
        kutubdia: ind6KutubdiaPro,
        overall: ind6OverallPro,
      },
      {
        indicator: '৭। কার্যকরী বই চেক-আউট ব্যবস্থা বিদ্যমান আছে',
        ukhiya: ind7UkhiyaPro,
        kutubdia: ind7KutubdiaPro,
        overall: ind7OverallPro,
      },
      {
        indicator: '৮। নির্দিষ্ট পড়ার ঘণ্টা বিদ্যমান রয়েছে',
        ukhiya: ind8UkhiyaPro,
        kutubdia: ind8KutubdiaPro,
        overall: ind8OverallPro,
      },
      {
        indicator:
          '৯। পড়াভিত্তিক কার্যক্রমের তথ্য লিপিবদ্ধ করার জন্য একটি রেজিস্টার রয়েছে এবং শিক্ষকগন প্রতি সপ্তাহে পড়ার ঘণ্টায় কী কী কার্যক্রম করেছেন তা লিপিবদ্ধ করেন',
        ukhiya: ind9UkhiyaPro,
        kutubdia: ind9KutubdiaPro,
        overall: ind9OverallPro,
      },
      {
        indicator:
          '১০। গত ছয় মাসে কমপক্ষে একটি অভিভাবক সভা হয়েছে যেখানে শিক্ষার্থীদের পঠন অথবা পাঠাগার বিষয়ে আলোচনা হয়েছে',
        ukhiya: ind10UkhiyaPro,
        kutubdia: ind10KutubdiaPro,
        overall: ind10OverallPro,
      },
      {
        indicator:
          '১১। বিদ্যালয়ে বিগত বছরে অভিভাবক ও স্থানীয় জনগণের অংশগ্রহণে অন্তত একটি পড়া বিষয়ক অনুষ্ঠান হয়েছে',
        ukhiya: ind11UkhiyaPro,
        kutubdia: ind11KutubdiaPro,
        overall: ind11OverallPro,
      },
      {
        indicator:
          '১২। পাঠাগার কর্মসূচি দীর্ঘমেয়াদে পরিচালনার জন্য ব্যবস্থাপনা কমিটি পরিকল্পনা গ্রহণ করেছে',
        ukhiya: ind12UkhiyaPro,
        kutubdia: ind12KutubdiaPro,
        overall: ind12OverallPro,
      },
    ]
    console.log('reportIndicatorFreqByProvince :', reportIndicatorFreqByProvince)
    setReportFreqByProvince(reportIndicatorFreqByProvince)
  }
  // Indicator Freq by Province

  // Results overtime
  // Indicator Freq by Province
  const pushResultOverTime = () => {
    const reportResultOverTime = [
      {
        rating: 'Developing',
        phase1Q1Number: phase1Q1NumD,
        phase1Q1Percent: phase1Q1PercD,
        phase1Q3Number: phase1Q3NumD,
        phase1Q3Percent: phase1Q3PercD,
        phase2Q1Number: phase2Q1NumD,
        phase2Q1Percent: phase2Q1PercD,
        phase2Q3Number: phase2Q3NumD,
        phase2Q3Percent: phase2Q3PercD,
        phase3Q1Number: phase3Q1NumD,
        phase3Q1Percent: phase3Q1PercD,
        phase3Q3Number: phase3Q3NumD,
        phase3Q3Percent: phase3Q3PercD,
        phase4Q1Number: phase4Q1NumD,
        phase4Q1Percent: phase4Q1PercD,
        overallQ1Number: overallQ1NumD,
        overallQ1Percent: overallQ1PercD,
        overallQ3Number: overallQ3NumD,
        overallQ3Percent: overallQ3PercD,
      },
      {
        rating: 'Functioning',
        phase1Q1Number: phase1Q1NumF,
        phase1Q1Percent: phase1Q1PercF,
        phase1Q3Number: phase1Q3NumF,
        phase1Q3Percent: phase1Q3PercF,
        phase2Q1Number: phase2Q1NumF,
        phase2Q1Percent: phase2Q1PercF,
        phase2Q3Number: phase2Q3NumF,
        phase2Q3Percent: phase2Q3PercF,
        phase3Q1Number: phase3Q1NumF,
        phase3Q1Percent: phase3Q1PercF,
        phase3Q3Number: phase3Q3NumF,
        phase3Q3Percent: phase3Q3PercF,
        phase4Q1Number: phase4Q1NumF,
        phase4Q1Percent: phase4Q1PercF,
        overallQ1Number: overallQ1NumF,
        overallQ1Percent: overallQ1PercF,
        overallQ3Number: overallQ3NumF,
        overallQ3Percent: overallQ3PercF,
      },
      {
        rating: 'Highly Functioning',
        phase1Q1Number: phase1Q1NumHF,
        phase1Q1Percent: phase1Q1PercHF,
        phase1Q3Number: phase1Q3NumHF,
        phase1Q3Percent: phase1Q3PercHF,
        phase2Q1Number: phase2Q1NumHF,
        phase2Q1Percent: phase2Q1PercHF,
        phase2Q3Number: phase2Q3NumHF,
        phase2Q3Percent: phase2Q3PercHF,
        phase3Q1Number: phase3Q1NumHF,
        phase3Q1Percent: phase3Q1PercHF,
        phase3Q3Number: phase3Q3NumHF,
        phase3Q3Percent: phase3Q3PercHF,
        phase4Q1Number: phase4Q1NumHF,
        phase4Q1Percent: phase4Q1PercHF,
        overallQ1Number: overallQ1NumHF,
        overallQ1Percent: overallQ1PercHF,
        overallQ3Number: overallQ3NumHF,
        overallQ3Percent: overallQ3PercHF,
      },
      {
        rating: 'Total',
        phase1Q1Number: phase1Q1NumT,
        phase1Q1Percent: phase1Q1PercT,
        phase1Q3Number: phase1Q3NumT,
        phase1Q3Percent: phase1Q3PercT,
        phase2Q1Number: phase2Q1NumT,
        phase2Q1Percent: phase2Q1PercT,
        phase2Q3Number: phase2Q3NumT,
        phase2Q3Percent: phase2Q3PercT,
        phase3Q1Number: phase3Q1NumT,
        phase3Q1Percent: phase3Q1PercT,
        phase3Q3Number: phase3Q3NumT,
        phase3Q3Percent: phase3Q3PercT,
        phase4Q1Number: phase4Q1NumT,
        phase4Q1Percent: phase4Q1PercT,
        overallQ1Number: overallQ1NumT,
        overallQ1Percent: overallQ1PercT,
        overallQ3Number: overallQ3NumT,
        overallQ3Percent: overallQ3PercT,
      },
    ]
    console.log('reportResultOverTime :', reportResultOverTime)
    setReportResultOverTime(reportResultOverTime)
  }
  // Results overtime

  // Rating System Results - All Libraries
  const pushRSRAllLibrariesChartData = () => {
    setrsrAllLibrariesChartData({
      labels: ['Developing', 'Functioning', 'Highly Functioning'],
      datasets: [
        {
          label: 'Rating System Results - All Libraries',
          backgroundColor: ['#ff3333', '#e6d067', '#78c498'],
          data: [overallPercentD, overallPercentF, overallPercentHF],
        },
      ],
    })
  }
  // Rating System Results - All Libraries

  // Rating System Results by Phase
  const pushRSRByPhaseChartData = () => {
    setrsrByPhaseChartData({
      labels: [
        'Phase I Developing',
        'Phase I Functioning',
        'Phase I Highly Functioning',
        'Phase II Developing',
        'Phase II Functioning',
        'Phase II Highly Functioning',
        'Phase III Developing',
        'Phase III Functioning',
        'Phase III Highly Functioning',
        'Phase IV Developing',
        'Phase IV Functioning',
        'Phase IV Highly Functioning',
      ],
      datasets: [
        {
          label: 'Rating System Results by Phase',
          backgroundColor: [
            '#ff3333',
            '#e6d067',
            '#78c498',
            '#ff3333',
            '#e6d067',
            '#78c498',
            '#ff3333',
            '#e6d067',
            '#78c498',
          ],
          data: [
            0,
            0,
            0,
            0,
            0,
            0,
            phase3PercentD,
            phase3PercentF,
            phase3PercentHF,
            phase4PercentD,
            phase4PercentF,
            phase4PercentHF,
          ],
        },
      ],
    })
  }
  //Rating System Results by Phase

  // Rating System Results by Province
  const pushRSRByProvinceChartData = () => {
    setrsrByProvinceChartData({
      labels: [
        'Developing in Ukhiya',
        'Functioning in Ukhiya',
        'Highly Functioning in Ukhiya',
        'Developing in Kutubdia',
        'Functioning in Kutubdia',
        'Highly Functioning in Kutubdia',
      ],
      datasets: [
        {
          label: 'Rating System Results by Province',
          backgroundColor: ['#ff3333', '#e6d067', '#78c498', '#ff3333', '#e6d067', '#78c498'],
          data: [
            ukhiyaPercentD,
            ukhiyaPercentF,
            ukhiyaPercentHF,
            kutubdiaPercentD,
            kutubdiaPercentF,
            kutubdiaPercentHF,
          ],
        },
      ],
    })
  }
  // Rating System Results by Province

  // Change in Rating(Phase II Libraries)
  const pushChangeRatingPIIChartData = () => {
    setchangeRatingPIIChartData({
      labels: [
        'Q1 Developing',
        'Q3 Developing',
        'Q1 Functioning',
        'Q3 Functioning',
        'Q1 Highly Functioning',
        'Q3 Highly Functioning',
      ],
      datasets: [
        {
          label: 'Change in Rating(Phase II Libraries)',
          backgroundColor: ['#ff3333', '#ff3333', '#e6d067', '#e6d067', '#78c498', '#78c498'],
          data: [0, phase3Q3PercD, 0, phase3Q3PercF, 0, phase3Q3PercHF],
        },
      ],
    })
  }

  // Change in Rating(Phase II Libraries)
  // Change in Rating(All Libraries)
  const pushChangeRatingAllChartData = () => {
    setchangeRatingAllChartData({
      labels: [
        'Q1 Developing',
        'Q3 Developing',
        'Q1 Functioning',
        'Q3 Functioning',
        'Q1 Highly Functioning',
        'Q3 Highly Functioning',
      ],
      datasets: [
        {
          label: 'Change in Rating(All Libraries)',
          backgroundColor: ['#ff3333', '#ff3333', '#e6d067', '#e6d067', '#78c498', '#78c498'],
          data: [0, overallQ3PercD, 0, overallQ3PercF, 0, overallQ3PercHF],
        },
      ],
    })
  }

  // Change in Rating(All Libraries)
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
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>LF Observation</strong>
              {/* <strong>{allBCOData.length}</strong> */}
            </CCardHeader>
            <CCardBody>
              <CAccordion alwaysOpen>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>
                    <strong>LF Observation Status</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow>
                      <CCol sm={6}>
                        <strong>All LF Observation Priority {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total LF</CTableHeaderCell>
                              <CTableDataCell>22</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">No of LF Observed</CTableHeaderCell>
                              <CTableDataCell>{allLFObsPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol sm={6}>
                        <strong>All LF Observation Status {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                              <CTableDataCell>2</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>1</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>1</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>4</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                    </CRow>
                  </CAccordionBody>
                  <CAccordionBody>
                    <CRow></CRow>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>
                    <strong>Monthly Trending LF Observation </strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Library Trending Chart</strong> <small>(2025)</small>
                        </CCardHeader>
                        <CCardBody style={{ width: '850px', height: '400px' }}>
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
                                  backgroundColor: '#79d6bcff',
                                  borderColor: '#79d6bcff',
                                  pointBackgroundColor: '#79d6bcff',
                                  pointBorderColor: '#79d6bcff',
                                  data: [
                                    allLFObservationDataP1January,
                                    allLFObservationDataP1February,
                                    allLFObservationDataP1March,
                                    allLFObservationDataP1April,
                                    allLFObservationDataP1May,
                                    allLFObservationDataP1June,
                                    allLFObservationDataP1July,
                                    allLFObservationDataP1August,
                                    allLFObservationDataP1September,
                                    allLFObservationDataP1October,
                                    allLFObservationDataP1November,
                                    allLFObservationDataP1December,
                                  ],
                                },
                                {
                                  label: 'Priority 2',
                                  backgroundColor: '#3baa8bff',
                                  borderColor: '#3baa8bff',
                                  pointBackgroundColor: '#3baa8bff',
                                  pointBorderColor: '#3baa8bff',
                                  data: [
                                    allLFObservationDataP2January,
                                    allLFObservationDataP2February,
                                    allLFObservationDataP2March,
                                    allLFObservationDataP2April,
                                    allLFObservationDataP2May,
                                    allLFObservationDataP2June,
                                    allLFObservationDataP2July,
                                    allLFObservationDataP2August,
                                    allLFObservationDataP2September,
                                    allLFObservationDataP2October,
                                    allLFObservationDataP2November,
                                    allLFObservationDataP2December,
                                  ],
                                },
                                {
                                  label: 'Priority 3',
                                  backgroundColor: '#006B4D',
                                  borderColor: '#006B4D',
                                  pointBackgroundColor: '#006B4D',
                                  pointBorderColor: '#006B4D',
                                  data: [
                                    allLFObservationDataP3January,
                                    allLFObservationDataP3February,
                                    allLFObservationDataP3March,
                                    allLFObservationDataP3April,
                                    allLFObservationDataP3May,
                                    allLFObservationDataP3June,
                                    allLFObservationDataP3July,
                                    allLFObservationDataP3August,
                                    allLFObservationDataP3September,
                                    allLFObservationDataP3October,
                                    allLFObservationDataP3November,
                                    allLFObservationDataP3December,
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
                                datalabels: {
                                  display: true, // This enables the display of labels for all data points
                                  color: 'black', // Set the color of the labels
                                  anchor: 'end', // Position the labels (e.g., 'start', 'center', 'end')
                                  align: 'top', // Alignment relative to the anchor
                                  formatter: (value, context) => {
                                    return value // Display the actual value
                                  },
                                },
                              },
                              tooltips: {
                                enabled: true,
                                visible: true,
                              },
                              hover: {
                                mode: null, // Disable hover interactions if needed
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
                            style={{ height: '400px', width: '1250px' }} // Inline style for height width
                          />
                        </CCardBody>
                      </CCard>
                    </CRow>
                  </CAccordionBody>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Trending LF Status</strong> <small>(2025)</small>
                      </CCardHeader>
                      <CCardBody>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
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
                              <CTableDataCell>{allLFObservationDataP1January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1March}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1April}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1May}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1June}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1July}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allLFObservationDataP2January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2March}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2April}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2May}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2June}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2July}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP2December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allLFObservationDataP3January}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3March}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3April}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3May}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3June}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3July}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP3December}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allLFObservationDataP1January +
                                  allLFObservationDataP2January +
                                  allLFObservationDataP3January}
                              </CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1February +
                                  allLFObservationDataP2February +
                                  allLFObservationDataP3February}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1March +
                                  allLFObservationDataP2March +
                                  allLFObservationDataP3March}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1April +
                                  allLFObservationDataP2April +
                                  allLFObservationDataP3April}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1May +
                                  allLFObservationDataP2May +
                                  allLFObservationDataP3May}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1June +
                                  allLFObservationDataP2June +
                                  allLFObservationDataP3June}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1July +
                                  allLFObservationDataP2July +
                                  allLFObservationDataP3July}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1August +
                                  allLFObservationDataP2August +
                                  allLFObservationDataP3August}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1September +
                                  allLFObservationDataP2September +
                                  allLFObservationDataP3September}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1October +
                                  allLFObservationDataP2October +
                                  allLFObservationDataP3October}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1November +
                                  allLFObservationDataP2November +
                                  allLFObservationDataP3November}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLFObservationDataP1December +
                                  allLFObservationDataP2December +
                                  allLFObservationDataP3December}
                              </CTableHeaderCell>
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
          <CCard style={{ width: '1310px', height: '700px' }}>
            <CCardHeader>
              <strong>All PREVAIL LF Observation Data </strong>
              <small>Total LF Observation -{allLFObservationData.length}</small>
            </CCardHeader>
            <CCardBody>
              <CCardTitle></CCardTitle>
              <MaterialTable
                title=""
                columns={[
                  {
                    title: 'date',
                    field: 'date',
                    type: 'date',
                    sorting: 'true',
                  },
                  {
                    title: 'lfName',
                    field: 'lfName',
                    type: 'string',
                  },
                  {
                    title: 'lf',
                    field: 'lf',
                    type: 'string',
                  },
                  { title: 'school', field: 'school' },

                  {
                    title: 'LF Status',
                    field: 'lfStatus',
                  },
                  { title: 'lpoName', field: 'lpoName', type: 'string' },
                  { title: 'lpo', field: 'lpo', type: 'string' },
                  { title: 'month', field: 'month', sorting: 'true' },
                  { title: 'year', field: 'year', sorting: 'true' },

                  { title: 'grade', field: 'grade' },
                  { title: 'section', field: 'section' },

                  { title: 'district', field: 'district' },
                  { title: 'upazilla', field: 'upazilla', sorting: 'true' },

                  { title: 'project', field: 'project', sorting: 'true' },
                  { title: 'office', field: 'office', sorting: 'true' },

                  { title: 'lpoName', field: 'lpoName', type: 'string' },

                  {
                    title: 'lastFollowupIndicator1',
                    field: 'lastFollowupIndicator1',
                  },
                  {
                    title: 'lastFollowupIndicator2',
                    field: 'lastFollowupIndicator2',
                  },
                  {
                    title: 'ind11IsCarriedAllMaterialStatus',
                    field: 'ind11IsCarriedAllMaterialStatus',
                  },
                  {
                    title: 'ind11IsCarriedAllMaterialNote',
                    field: 'ind11IsCarriedAllMaterialNote',
                  },
                  {
                    title: 'ind12IsCheckedInRightTimeStatus',
                    field: 'ind12IsCheckedInRightTimeStatus',
                  },
                  {
                    title: 'ind12IsCheckedInRightTimeNote',
                    field: 'ind12IsCheckedInRightTimeNote',
                  },

                  {
                    title: 'ind13IsObservedBanglaLibraryStatus',
                    field: 'ind13IsObservedBanglaLibraryStatus',
                  },
                  {
                    title: 'ind13IsObservedBanglaLibraryNote',
                    field: 'ind13IsObservedBanglaLibraryNote',
                  },
                  {
                    title: 'ind14FeedbackSessionWithTeacherStatus',
                    field: 'ind14FeedbackSessionWithTeacherStatus',
                  },
                  {
                    title: 'ind14FeedbackSessionWithTeacherNote',
                    field: 'ind14FeedbackSessionWithTeacherNote',
                  },
                  {
                    title: 'ind15MeetingWithHeadTeacherStatus',
                    field: 'ind15MeetingWithHeadTeacherStatus',
                  },
                  {
                    title: 'ind15MeetingWithHeadTeacherNote',
                    field: 'ind15MeetingWithHeadTeacherNote',
                  },
                  {
                    title: 'ind16FilledAllFormProperlyStatus',
                    field: 'ind16FilledAllFormProperlyStatus',
                  },
                  {
                    title: 'ind16FilledAllFormProperlyNote',
                    field: 'ind16FilledAllFormProperlyNote',
                  },
                  {
                    title: 'ind17ObservedClassSilentlyStatus',
                    field: 'ind17ObservedClassSilentlyStatus',
                  },

                  {
                    title: 'ind17ObservedClassSilentlyNote',
                    field: 'ind17ObservedClassSilentlyNote',
                  },
                  {
                    title: 'ind21LFTeacherMaintainGoodRelationshipStatus',
                    field: 'ind21LFTeacherMaintainGoodRelationshipStatus',
                  },
                  {
                    title: 'ind21LFTeacherMaintainGoodRelationshipNote',
                    field: 'ind21LFTeacherMaintainGoodRelationshipNote',
                  },
                  {
                    title: 'ind22LFDiscussGoodPracticeIndicatorStatus',
                    field: 'ind22LFDiscussGoodPracticeIndicatorStatus',
                  },
                  {
                    title: 'ind22LFDiscussGoodPracticeIndicatorNote',
                    field: 'ind22LFDiscussGoodPracticeIndicatorNote',
                  },
                  {
                    title: 'ind23LFDiscussCoachingSupportIndicatorStatus',
                    field: 'ind23LFDiscussCoachingSupportIndicatorStatus',
                  },
                  {
                    title: 'ind23LFDiscussCoachingSupportIndicatorNote',
                    field: 'ind23LFDiscussCoachingSupportIndicatorNote',
                  },
                  {
                    title: 'ind24LFDiscussLastFollowupIndicatorStatus',
                    field: 'ind24LFDiscussLastFollowupIndicatorStatus',
                  },
                  {
                    title: 'ind24LFDiscussLastFollowupIndicatorNote',
                    field: 'ind24LFDiscussLastFollowupIndicatorNote',
                  },
                  {
                    title: 'ind25LFInstructIdealLessonStatus',
                    field: 'ind25LFInstructIdealLessonStatus',
                  },
                  {
                    title: 'ind25LFInstructIdealLessonNote',
                    field: 'ind25LFInstructIdealLessonNote',
                  },
                  {
                    title: 'ind26LFObserveStudentOrGroupStatus',
                    field: 'ind26LFObserveStudentOrGroupStatus',
                  },
                  {
                    title: 'ind26LFObserveStudentOrGroupNote',
                    field: 'ind26LFObserveStudentOrGroupNote',
                  },
                  {
                    title: 'ind27LFVerifyWorkbookStatus',
                    field: 'ind27LFVerifyWorkbookStatus',
                  },
                  {
                    title: 'ind27LFVerifyWorkbookNote',
                    field: 'ind27LFVerifyWorkbookNote',
                  },

                  {
                    title: 'ind28LFTrack3StudentStatus',
                    field: 'ind28LFTrack3StudentStatus',
                  },
                  {
                    title: 'ind28LFTrack3StudentNote',
                    field: 'ind28LFTrack3StudentNote',
                  },
                  {
                    title: 'ind29LFTeacherAgreedNextPlanStatus',
                    field: 'ind29LFTeacherAgreedNextPlanStatus',
                  },
                  {
                    title: 'ind29LFTeacherAgreedNextPlanNote',
                    field: 'ind29LFTeacherAgreedNextPlanNote',
                  },
                  {
                    title: 'ind31LFIdentifyGoodImprovablePointStatus',
                    field: 'ind31LFIdentifyGoodImprovablePointStatus',
                  },
                  {
                    title: 'ind31LFIdentifyGoodImprovablePointNote',
                    field: 'ind31LFIdentifyGoodImprovablePointNote',
                  },
                  {
                    title: 'ind32LFInstructDevelopmentPlanStatus',
                    field: 'ind32LFInstructDevelopmentPlanStatus',
                  },
                  {
                    title: 'ind32LFInstructDevelopmentPlanNote',
                    field: 'ind32LFInstructDevelopmentPlanNote',
                  },
                  {
                    title: 'ind33LFDiscussAboutDevelopmentPlanStatus',
                    field: 'ind33LFDiscussAboutDevelopmentPlanStatus',
                  },
                  {
                    title: 'ind33LFDiscussAboutDevelopmentPlanNote',
                    field: 'ind33LFDiscussAboutDevelopmentPlanNote',
                  },
                  {
                    title: 'ind34LFAllowToChangeTeachingPatternStatus',
                    field: 'ind34LFAllowToChangeTeachingPatternStatus',
                  },
                  {
                    title: 'ind34LFAllowToChangeTeachingPatternNote',
                    field: 'ind34LFAllowToChangeTeachingPatternNote',
                  },
                  {
                    title: 'ind35LFAllowTeacherForDiscussionStatus',
                    field: 'ind35LFAllowTeacherForDiscussionStatus',
                  },
                  {
                    title: 'ind35LFAllowTeacherForDiscussionNote',
                    field: 'ind35LFAllowTeacherForDiscussionNote',
                  },
                  {
                    title: 'bestPracticeIndicator1',
                    field: 'bestPracticeIndicator1',
                  },
                  {
                    title: 'bestPracticeIndicator1Details',
                    field: 'bestPracticeIndicator1Details',
                  },
                  {
                    title: 'bestPracticeIndicator2',
                    field: 'bestPracticeIndicator2',
                  },
                  {
                    title: 'bestPracticeIndicator2Details',
                    field: 'bestPracticeIndicator2Details',
                  },
                  {
                    title: 'bestPracticeIndicator3',
                    field: 'bestPracticeIndicator3',
                  },
                  {
                    title: 'bestPracticeIndicator3Details',
                    field: 'bestPracticeIndicator3Details',
                  },
                  {
                    title: 'coachingSupportIndicator1',
                    field: 'coachingSupportIndicator1',
                  },
                  {
                    title: 'coachingSupportIndicator1Details',
                    field: 'coachingSupportIndicator1Details',
                  },
                  {
                    title: 'coachingSupportIndicator2',
                    field: 'coachingSupportIndicator2',
                  },
                  {
                    title: 'coachingSupportIndicator2Details',
                    field: 'coachingSupportIndicator2Details',
                  },
                  {
                    title: 'agreedStatement1',
                    field: 'agreedStatement1',
                  },
                  {
                    title: 'agreedStatement2',
                    field: 'agreedStatement2',
                  },
                ]}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdateAllLFObservation(newData, oldData, resolve)
                    }),
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      handleRowAddLFObservation(newData, resolve)
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      handleRowDeleteLFObservation(oldData, resolve)
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
                  pageSizeOptions: [5, 10, 20],
                  maxBodyHeight: '700px',
                  headerStyle: {
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#7e93b4ff',
                    fontWeight: 'bold',
                    width: 15,
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
                  },
                  cellStyle: {
                    borderRight: '1px solid #0c0b0bff',
                    borderLeft: '1px solid #0e0d0dff',
                    borderBottom: '1px solid #0c0b0bff',
                    borderStyle: 'solid',
                  },
                  maintainAspectRatio: false,
                }}
                style={{ height: '300px', width: '1300px' }}
                data={allLFObservationData}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default PLFObservationDetail
