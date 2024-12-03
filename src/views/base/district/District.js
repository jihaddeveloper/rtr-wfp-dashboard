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

const District = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  //const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

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

  // Library obsv data by filter
  const allDILibraryObsvDataMFO = allDILibraryObservation.filter((item) => {
    return item.office.includes('MFO')
  })
  const allDILibraryObsvDataNrFO = allDILibraryObservation.filter((item) => {
    return item.office.includes('NrFO')
  })
  // Library obsv data by filter

  // Library Observation Data by filter
  const allLibraryObsDataPreviousMonth = allDILibraryObservation.filter((item) => {
    return item.month === previousMonth && item.year === '2024' && item.libraryStatus
  }).length

  const allLibraryObsDevPreviousMonth = allDILibraryObservation.filter((item) => {
    return (
      item.month === previousMonth && item.year === '2024' && item.libraryStatus === 'Developing'
    )
  }).length

  const allLibraryObsFunPreviousMonth = allDILibraryObservation.filter((item) => {
    return (
      item.month === previousMonth && item.year === '2024' && item.libraryStatus === 'Functioning'
    )
  }).length

  const allLibraryObsHighFunPreviousMonth = allDILibraryObservation.filter((item) => {
    return (
      item.month === previousMonth &&
      item.year === '2024' &&
      item.libraryStatus === 'Highly Functioning'
    )
  }).length
  // Library Observation Data by filter

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
  const handleRowUpdateAllLibraryObservation = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/library-observations/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allLibraryObservation]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllLibraryObservation([...dataUpdate])
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
  const handleRowAddLibraryObservation = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/library-observations/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allLibraryObservation]
          dataToAdd.push(newData)
          setAllLibraryObservation([...dataToAdd])
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
  const handleRowDeleteLibraryObservation = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/library-observations/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allLibraryObservation]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllLibraryObservation([...dataDelete])
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
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Information of District Coverd</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>1. Sirajgoanj </strong>
                </CAccordionHeader>

                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>2. Brahmanbaria</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>3. Natore</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>4. Dhaka </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>5. Coxs Bazar </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>6. Moulvibazar</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>7. Narail </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>8. Jhalakathi </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>9. Habiganj</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <strong>Total Upazila(s) Coverd ##### </strong>
                    <CCol sm={6}>
                      <strong>Inforamtion of Literacy Program(LP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Student(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Teacher(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">
                              No of Library(s) Established
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">No of Book(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Book-Captain(s)</CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>#####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>Inforamtion of Girls Education Program(GEP)</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">No of Upazila(s) Coverd</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">No of School(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">No of Girl(s)</CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">
                              No of School(s) Constructed
                            </CTableHeaderCell>
                            <CTableDataCell>####</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default District
