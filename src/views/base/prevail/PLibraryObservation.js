//  Author: Mohammad Jihad Hossain
//  Create Date: 14/01/2026
//  Modify Date: 19/05/2026
//  Description: PLibraryObservation  file

import React, { useState, useEffect, useMemo } from 'react'
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
  CCardTitle,
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

const BASE_URL = 'http://118.179.80.51:8080/api/v1'

const API_URL = `${BASE_URL}/p-library-observation`

const YEAR = '2026'

const MONTHS = [
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
]

const LIBRARY_STATUS = {
  DEVELOPING: 'Developing',
  FUNCTIONING: 'Functioning',
  HIGHLY_FUNCTIONING: 'Highly Functioning',
}

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

const getPreviousMonth = () => {
  const date = new Date()

  date.setMonth(date.getMonth() - 1)

  return date.toLocaleString('default', {
    month: 'long',
  })
}

const PLibraryObservation = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  //const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allPLibraryObservation, setAllPLibraryObservation] = useState([])

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })

  //for error handling
  const [isError, setIsError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const [observations, setObservations] = useState([])

  /* ---------------------------------------------------------------------- */
  /*                             DERIVED VALUES                             */
  /* ---------------------------------------------------------------------- */

  const previousMonth = useMemo(() => getPreviousMonth(), [])

  /* ---------------------------------------------------------------------- */
  /*                              FETCH DATA                                */
  /* ---------------------------------------------------------------------- */

  const fetchLibraryObservations = async () => {
    try {
      setIsLoading(true)
      setIsError(null)

      const response = await axios.get(API_URL)

      setObservations(response.data || [])
    } catch (err) {
      console.error(err)

      setIsError(err.message || 'Failed to fetch observations')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLibraryObservations()
  }, [])

  /* ---------------------------------------------------------------------- */
  /*                           OPTIMIZED STATISTICS                         */
  /* ---------------------------------------------------------------------- */

  const statistics = useMemo(() => {
    const trends = {}

    MONTHS.forEach((month) => {
      trends[month] = {
        [LIBRARY_STATUS.DEVELOPING]: 0,
        [LIBRARY_STATUS.FUNCTIONING]: 0,
        [LIBRARY_STATUS.HIGHLY_FUNCTIONING]: 0,
      }
    })

    const previousMonthStats = {
      total: 0,
      developing: 0,
      functioning: 0,
      highlyFunctioning: 0,
    }

    observations.forEach((item) => {
      const { month, year, libraryStatus } = item

      if (year !== YEAR || !libraryStatus) {
        return
      }

      /* ------------------------ PREVIOUS MONTH ------------------------ */

      if (month === previousMonth) {
        previousMonthStats.total += 1

        if (libraryStatus === LIBRARY_STATUS.DEVELOPING) {
          previousMonthStats.developing += 1
        }

        if (libraryStatus === LIBRARY_STATUS.FUNCTIONING) {
          previousMonthStats.functioning += 1
        }

        if (libraryStatus === LIBRARY_STATUS.HIGHLY_FUNCTIONING) {
          previousMonthStats.highlyFunctioning += 1
        }
      }

      /* ---------------------------- TRENDS ---------------------------- */

      if (trends[month]?.[libraryStatus] !== undefined) {
        trends[month][libraryStatus] += 1
      }
    })

    return {
      previousMonthStats,
      trends,
    }
  }, [observations, previousMonth])

  /* ---------------------------------------------------------------------- */
  /*                               CHART DATA                               */
  /* ---------------------------------------------------------------------- */

  const developingTrend = MONTHS.map((month) => statistics.trends[month][LIBRARY_STATUS.DEVELOPING])

  const functioningTrend = MONTHS.map(
    (month) => statistics.trends[month][LIBRARY_STATUS.FUNCTIONING],
  )

  const highlyFunctioningTrend = MONTHS.map(
    (month) => statistics.trends[month][LIBRARY_STATUS.HIGHLY_FUNCTIONING],
  )

  // Fetching Data from API
  const getAllPLibraryObservation = async () => {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await axios.get(`${BASE_URL}/p-library-observation`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllPLibraryObservation(response.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      setIsError(true)
      setErrorMessages([error.message || 'Something went wrong'])
    } finally {
      setIsLoading(false)
    }
  }

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')

      await getAllPLibraryObservation(console.log('Get PREVAIL Library observation called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // // Library Observation Data by filter
  // const allLibraryObsDataPreviousMonth = allPLibraryObservation.filter((item) => {
  //   return item.month === previousMonth && item.year === '2026' && item.libraryStatus
  // }).length

  // const allLibraryObsDevPreviousMonth = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === previousMonth && item.year === '2026' && item.libraryStatus === 'Developing'
  //   )
  // }).length

  // const allLibraryObsFunPreviousMonth = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === previousMonth && item.year === '2026' && item.libraryStatus === 'Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunPreviousMonth = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === previousMonth &&
  //     item.year === '2026' &&
  //     item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // // Trending
  // // Developing
  // const allLibraryObsDevJanuary = allPLibraryObservation.filter((item) => {
  //   return item.month === 'January' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevFebruary = allPLibraryObservation.filter((item) => {
  //   return item.month === 'February' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevMarch = allPLibraryObservation.filter((item) => {
  //   return item.month === 'March' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevApril = allPLibraryObservation.filter((item) => {
  //   return item.month === 'April' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevMay = allPLibraryObservation.filter((item) => {
  //   return item.month === 'May' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevJune = allPLibraryObservation.filter((item) => {
  //   return item.month === 'June' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevJuly = allPLibraryObservation.filter((item) => {
  //   return item.month === 'July' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevAugust = allPLibraryObservation.filter((item) => {
  //   return item.month === 'August' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevSeptember = allPLibraryObservation.filter((item) => {
  //   return item.month === 'September' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevOctober = allPLibraryObservation.filter((item) => {
  //   return item.month === 'October' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevNovember = allPLibraryObservation.filter((item) => {
  //   return item.month === 'November' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length

  // const allLibraryObsDevDecember = allPLibraryObservation.filter((item) => {
  //   return item.month === 'December' && item.year === '2026' && item.libraryStatus === 'Developing'
  // }).length
  // // Developing

  // // Functioning
  // const allLibraryObsFunJanuary = allPLibraryObservation.filter((item) => {
  //   return item.month === 'January' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunFebruary = allPLibraryObservation.filter((item) => {
  //   return item.month === 'February' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunMarch = allPLibraryObservation.filter((item) => {
  //   return item.month === 'March' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunApril = allPLibraryObservation.filter((item) => {
  //   return item.month === 'April' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunMay = allPLibraryObservation.filter((item) => {
  //   return item.month === 'May' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunJune = allPLibraryObservation.filter((item) => {
  //   return item.month === 'June' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunJuly = allPLibraryObservation.filter((item) => {
  //   return item.month === 'July' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunAugust = allPLibraryObservation.filter((item) => {
  //   return item.month === 'August' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunSeptember = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'September' && item.year === '2026' && item.libraryStatus === 'Functioning'
  //   )
  // }).length

  // const allLibraryObsFunOctober = allPLibraryObservation.filter((item) => {
  //   return item.month === 'October' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunNovember = allPLibraryObservation.filter((item) => {
  //   return item.month === 'November' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length

  // const allLibraryObsFunDecember = allPLibraryObservation.filter((item) => {
  //   return item.month === 'December' && item.year === '2026' && item.libraryStatus === 'Functioning'
  // }).length
  // // Functioning

  // // Highly Functioning
  // const allLibraryObsHighFunJanuary = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'January' &&
  //     item.year === '2026' &&
  //     item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunFebruary = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'February' &&
  //     item.year === '2026' &&
  //     item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunMarch = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'March' && item.year === '2026' && item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunApril = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'April' && item.year === '2026' && item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunMay = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'May' && item.year === '2026' && item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunJune = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'June' && item.year === '2026' && item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunJuly = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'July' && item.year === '2026' && item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunAugust = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'August' && item.year === '2026' && item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunSeptember = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'September' &&
  //     item.year === '2026' &&
  //     item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunOctober = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'October' &&
  //     item.year === '2026' &&
  //     item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunNovember = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'November' &&
  //     item.year === '2026' &&
  //     item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length

  // const allLibraryObsHighFunDecember = allPLibraryObservation.filter((item) => {
  //   return (
  //     item.month === 'December' &&
  //     item.year === '2026' &&
  //     item.libraryStatus === 'Highly Functioning'
  //   )
  // }).length
  // // Highly Functioning
  // // Trending
  // // Library Observation Data by filter

  // Get All Library observation
  // const getAllPLibraryObservation = async () => {
  //   setIsLoading(true)
  //   try {
  //     const response = await axios('http://118.179.80.51:8080/api/v1/p-library-observation', {
  //       method: 'GET',
  //       mode: 'no-cors',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     setAllPLibraryObservation(response.data)

  //     setIsLoading(false)
  //     console.log('Data:' + response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // Get All Library observation

  // Row update function
  const handleRowUpdatePLibraryObservation = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/p-library-observation/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allPLibraryObservation]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllPLibraryObservation([...dataUpdate])
          resolve()
          setIsError(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/library-observations/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Update failed! Server error'])
          setIsError(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIsError(true)
      resolve()
    }
  }
  // Row update function

  // Row add function
  const handleRowAddPLibraryObservation = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/p-library-observation/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allPLibraryObservation]
          dataToAdd.push(newData)
          setAllPLibraryObservation([...dataToAdd])
          resolve()
          setIsError(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Add LibraryObservation failed! Server error'])
          setIsError(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIsError(true)
      resolve()
    }
  }
  // Row add function

  // Row delete function
  const handleRowDeletePLibraryObservation = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/p-library-observation/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allPLibraryObservation]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllPLibraryObservation([...dataDelete])
          resolve()
          setIsError(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Delete failed! Server error'])
          setIsError(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIsError(true)
      resolve()
    }
  }
  // Row delete function

  // Change in Rating(All Libraries)
  // Chart

  if (isError) {
    return <div className="text-danger">{isError}</div>
  }

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
              <strong>PREVAIL Library Observation</strong>
            </CCardHeader>
            <CCardBody>
              <CAccordion alwaysOpen>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>
                    <strong>All Library Observation </strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow>
                      <CCol sm={6}>
                        <strong>All Library Observation Rating {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">
                                Total Classroom Library
                              </CTableHeaderCell>
                              <CTableDataCell>494</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                No of Visited Libarary
                              </CTableHeaderCell>
                              <CTableDataCell>{statistics.previousMonthStats.total}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol sm={6}>
                        <strong>All Library Observation Status {previousMonthYear}</strong>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">Developing</CTableHeaderCell>
                              <CTableDataCell>
                                {statistics.previousMonthStats.developing}
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Functioning</CTableHeaderCell>
                              <CTableDataCell>
                                {statistics.previousMonthStats.functioning}
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Highly Functioning</CTableHeaderCell>
                              <CTableDataCell>
                                {statistics.previousMonthStats.highlyFunctioning}
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>{statistics.previousMonthStats.total}</CTableDataCell>
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
                    <strong>Monthly Trending Library Observation </strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CRow>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Library Status Chart</strong> <small>(2026)</small>
                        </CCardHeader>
                        <CCardBody style={{ width: '850px', height: '400px' }}>
                          <CChartLine
                            data={{
                              labels: MONTHS,
                              datasets: [
                                {
                                  label: 'Developing',
                                  backgroundColor: '#617c83ff',
                                  borderColor: '#617c83ff',
                                  pointBackgroundColor: '#617c83ff',
                                  pointBorderColor: '#fff',
                                  data: developingTrend,
                                },
                                {
                                  label: 'Functioning',
                                  backgroundColor: '#457785ff',
                                  borderColor: '#457785ff',
                                  pointBackgroundColor: '#457785ff',
                                  pointBorderColor: '#fff',
                                  data: functioningTrend,
                                },
                                {
                                  label: 'Highly Functioning',
                                  backgroundColor: '#00546B',
                                  borderColor: '#00546B',
                                  pointBackgroundColor: '#00546B',
                                  pointBorderColor: '#fff',
                                  data: highlyFunctioningTrend,
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
                            style={{ height: '300px', width: '1250px' }} // Inline style for height width
                          />
                        </CCardBody>
                      </CCard>
                    </CRow>
                  </CAccordionBody>
                  <CAccordionBody>
                    <CCard className="mt-4">
                      <CCardHeader>Monthly Library Observation Trends</CCardHeader>

                      <CCardBody>
                        <CTable bordered hover responsive striped align="middle">
                          <CTableHead color="dark">
                            <CTableRow>
                              <CTableHeaderCell>Month</CTableHeaderCell>

                              <CTableHeaderCell>Developing</CTableHeaderCell>

                              <CTableHeaderCell>Functioning</CTableHeaderCell>

                              <CTableHeaderCell>Highly Functioning</CTableHeaderCell>

                              <CTableHeaderCell>Total</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>

                          <CTableBody>
                            {MONTHS.map((month) => {
                              const developing = statistics.trends[month][LIBRARY_STATUS.DEVELOPING]

                              const functioning =
                                statistics.trends[month][LIBRARY_STATUS.FUNCTIONING]

                              const highlyFunctioning =
                                statistics.trends[month][LIBRARY_STATUS.HIGHLY_FUNCTIONING]

                              const total = developing + functioning + highlyFunctioning

                              return (
                                <CTableRow key={month}>
                                  <CTableDataCell>
                                    <strong>{month}</strong>
                                  </CTableDataCell>

                                  <CTableDataCell>{developing}</CTableDataCell>

                                  <CTableDataCell>{functioning}</CTableDataCell>

                                  <CTableDataCell>{highlyFunctioning}</CTableDataCell>

                                  <CTableDataCell>
                                    <strong>{total}</strong>
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            })}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>

                    {/* <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Trending Library Status</strong> <small>(2026)</small>
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
                              <CTableHeaderCell scope="row">Developing</CTableHeaderCell>
                              <CTableDataCell>{allLibraryObsDevJanuary}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevFebruary}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevMarch}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevApril}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allLibraryObsDevMay}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevJune}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevJuly}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevAugust}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevSeptember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevOctober}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevNovember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevDecember}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Functioning</CTableHeaderCell>
                              <CTableDataCell>{allLibraryObsFunJanuary}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunFebruary}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunMarch}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunApril}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{allLibraryObsFunMay}</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunJune}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunJuly}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunAugust}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunSeptember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunOctober}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunNovember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsFunDecember}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Highly Functioning</CTableHeaderCell>
                              <CTableDataCell>{allLibraryObsHighFunJanuary}</CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunFebruary}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunMarch}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunApril}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunMay}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunJune}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunJuly}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunAugust}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunSeptember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunOctober}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunNovember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsHighFunDecember}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allLibraryObsDevJanuary +
                                  allLibraryObsFunJanuary +
                                  allLibraryObsHighFunJanuary}
                              </CTableDataCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevFebruary +
                                  allLibraryObsFunFebruary +
                                  allLibraryObsHighFunFebruary}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevMarch +
                                  allLibraryObsFunMarch +
                                  allLibraryObsHighFunMarch}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevApril +
                                  allLibraryObsFunApril +
                                  allLibraryObsHighFunApril}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevMay +
                                  allLibraryObsFunMay +
                                  allLibraryObsHighFunMay}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevJune +
                                  allLibraryObsFunJune +
                                  allLibraryObsHighFunJune}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevJuly +
                                  allLibraryObsFunJuly +
                                  allLibraryObsHighFunJuly}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevAugust +
                                  allLibraryObsFunAugust +
                                  allLibraryObsHighFunAugust}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevSeptember +
                                  allLibraryObsFunSeptember +
                                  allLibraryObsHighFunSeptember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevOctober +
                                  allLibraryObsFunOctober +
                                  allLibraryObsHighFunOctober}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevNovember +
                                  allLibraryObsFunNovember +
                                  allLibraryObsHighFunNovember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {allLibraryObsDevDecember +
                                  allLibraryObsFunDecember +
                                  allLibraryObsHighFunDecember}
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard> */}
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard style={{ width: '1310px', height: '900px' }}>
            <CCardHeader>
              <strong>All PREVAIL Libarary Observation Data </strong>
              <small>Total Libarary Observation -{allPLibraryObservation.length}</small>
            </CCardHeader>
            <CCardBody>
              <CCardTitle></CCardTitle>
              <MaterialTable
                title={observations.length + ' Library Observation '}
                columns={[
                  {
                    title: 'date',
                    field: 'date',
                    type: 'date',
                    sorting: 'true',
                  },
                  { title: 'school', field: 'school' },

                  {
                    title: 'libraryStatus',
                    field: 'libraryStatus',
                    cellStyle: {
                      backgroundColor: '#e0d0ca',
                      color: '#000',
                      textDecorationColor: 'red',
                    },
                  },

                  { title: 'month', field: 'month', sorting: 'true' },
                  { title: 'year', field: 'year', sorting: 'true' },
                  { title: 'district', field: 'district' },
                  { title: 'upazilla', field: 'upazilla', sorting: 'true' },

                  { title: 'project', field: 'project', sorting: 'true' },
                  { title: 'office', field: 'office', sorting: 'true' },

                  { title: 'lpo', field: 'lpo', type: 'string' },
                  { title: 'lpoName', field: 'lpoName', type: 'string' },
                  {
                    title: 'lf',
                    field: 'lf',
                    type: 'string',
                  },
                  {
                    title: 'lfName',
                    field: 'lfName',
                    type: 'string',
                  },
                  { title: 'visitor', field: 'visitor' },
                  {
                    title: 'visitorDesignation',
                    field: 'visitorDesignation',
                  },
                  {
                    title: 'lastFollowupIndicator1',
                    field: 'lastFollowupIndicator1',
                  },
                  {
                    title: 'lastFollowupIndicator2',
                    field: 'lastFollowupIndicator2',
                  },
                  {
                    title: 'lastFollowupIndicator3',
                    field: 'lastFollowupIndicator3',
                  },
                  {
                    title: 'ind1IsTrainedOneTeacher',
                    field: 'ind1IsTrainedOneTeacher',
                  },
                  {
                    title: 'ind11IsPointTeacherIncharge',
                    field: 'ind11IsPointTeacherIncharge',
                  },
                  {
                    title: 'ind12IsTrainedLibraryManagementReadingHour',
                    field: 'ind12IsTrainedLibraryManagementReadingHour',
                  },
                  {
                    title: 'ind2HeadTeacherTrainedLibraryManagementReadingHour',
                    field: 'ind2HeadTeacherTrainedLibraryManagementReadingHour',
                  },

                  {
                    title: 'ind3ClassroomSuitableLibraryActivity',
                    field: 'ind3ClassroomSuitableLibraryActivity',
                  },
                  {
                    title: 'ind31ClassroomDoorWindowOkay',
                    field: 'ind31ClassroomDoorWindowOkay',
                  },
                  {
                    title: 'ind32ClassroomDoorWindowLock',
                    field: 'ind32ClassroomDoorWindowLock',
                  },
                  {
                    title: 'ind33ClassroomSafeFromRainWater',
                    field: 'ind33ClassroomSafeFromRainWater',
                  },
                  {
                    title: 'ind34ClassroomSafeClean',
                    field: 'ind34ClassroomSafeClean',
                  },
                  {
                    title: 'ind4LibraryFurnitureOkay',
                    field: 'ind4LibraryFurnitureOkay',
                  },
                  {
                    title: 'ind41BookshelfUsable',
                    field: 'ind41BookshelfUsable',
                  },
                  {
                    title: 'ind42BookshelfProtectedSunRain',
                    field: 'ind42BookshelfProtectedSunRain',
                  },
                  {
                    title: 'ind43BookshelfPortableSafeForStudent',
                    field: 'ind43BookshelfPortableSafeForStudent',
                  },

                  {
                    title: 'ind44BookshelfReadingSpace',
                    field: 'ind44BookshelfReadingSpace',
                  },
                  {
                    title: 'ind45BookshelfFurnitureGoodCondition',
                    field: 'ind45BookshelfFurnitureGoodCondition',
                  },
                  {
                    title: 'ind5BookRegisterUpdated',
                    field: 'ind5BookRegisterUpdated',
                  },
                  {
                    title: 'ind6BookshelfOrganized',
                    field: 'ind6BookshelfOrganized',
                  },
                  {
                    title: 'ind61BookshelfBookOrganizedByGrade',
                    field: 'ind61BookshelfBookOrganizedByGrade',
                  },
                  {
                    title: 'ind62BookshelfRtRBookLabelViewable',
                    field: 'ind62BookshelfRtRBookLabelViewable',
                  },
                  {
                    title: 'ind63BookshelfNonRtRBookLabelViewable',
                    field: 'ind63BookshelfNonRtRBookLabelViewable',
                  },
                  {
                    title: 'ind64BookOrganizedByLabel',
                    field: 'ind64BookOrganizedByLabel',
                  },
                  {
                    title: 'ind65BookAccessible',
                    field: 'ind65BookAccessible',
                  },
                  {
                    title: 'ind66BookCoverViewable',
                    field: 'ind66BookCoverViewable',
                  },
                  {
                    title: 'ind7PrintRichItemDisplayed',
                    field: 'ind7PrintRichItemDisplayed',
                  },
                  {
                    title: 'ind71ChartPosterDisplayed',
                    field: 'ind71ChartPosterDisplayed',
                  },
                  {
                    title: 'ind72ChartPosterCompatible',
                    field: 'ind72ChartPosterCompatible',
                  },
                  {
                    title: 'ind8BookCheckoutFunctional',
                    field: 'ind8BookCheckoutFunctional',
                  },
                  {
                    title: 'ind81BookCheckoutProcedureDisplayed',
                    field: 'ind81BookCheckoutProcedureDisplayed',
                  },
                  {
                    title: 'ind82BookCheckoutRegisterUsable',
                    field: 'ind82BookCheckoutRegisterUsable',
                  },
                  {
                    title: 'ind83BookCheckoutRegisterUpdated',
                    field: 'ind83BookCheckoutRegisterUpdated',
                  },
                  {
                    title: 'ind84BookCheckoutPendingBookList',
                    field: 'ind84BookCheckoutPendingBookList',
                  },
                  {
                    title: 'ind85BookCheckoutDataCollection',
                    field: 'ind85BookCheckoutDataCollection',
                  },
                  {
                    title: 'ind86BookCheckoutByLeast5Student',
                    field: 'ind86BookCheckoutByLeast5Student',
                  },
                  {
                    title: 'ind9ReadingHourActivityFunctional',
                    field: 'ind9ReadingHourActivityFunctional',
                  },
                  {
                    title: 'ind91ReadingHourActivityWeekly',
                    field: 'ind91ReadingHourActivityWeekly',
                  },
                  {
                    title: 'ind92ReadingHourActivityRoutineHanged',
                    field: 'ind92ReadingHourActivityRoutineHanged',
                  },
                  {
                    title: 'ind93BookCheckoutOpportunity',
                    field: 'ind93BookCheckoutOpportunity',
                  },
                  {
                    title: 'ind94BookCheckoutNoticeHanged',
                    field: 'ind94BookCheckoutNoticeHanged',
                  },
                  {
                    title: 'ind10TeacherPerformReadingHourActivity',
                    field: 'ind10TeacherPerformReadingHourActivity',
                  },
                  {
                    title: 'ind101ReadingHourRegisterUpdated',
                    field: 'ind101ReadingHourRegisterUpdated',
                  },
                  {
                    title: 'ind102ReadingActivityListedRegister',
                    field: 'ind102ReadingActivityListedRegister',
                  },
                  {
                    title: 'ind11TrainedLibraryObservationReadingHour',
                    field: 'ind11TrainedLibraryObservationReadingHour',
                  },
                  {
                    title: 'ind12SchoolCommitteeDecisionAboutLibrary',
                    field: 'ind12SchoolCommitteeDecisionAboutLibrary',
                  },
                  {
                    title: 'ind121SchoolHasCommitteeAboutLibrary',
                    field: 'ind121SchoolHasCommitteeAboutLibrary',
                  },
                  {
                    title: 'ind122SchoolCommitteeMeetingAboutLibrary',
                    field: 'ind122SchoolCommitteeMeetingAboutLibrary',
                  },
                  {
                    title: 'ind13ParentMeetingAboutLibrary',
                    field: 'ind13ParentMeetingAboutLibrary',
                  },
                  {
                    title: 'ind14ReadPlayFestival',
                    field: 'ind14ReadPlayFestival',
                  },
                  {
                    title: 'ind141SchoolArrangeReadFestival',
                    field: 'ind141SchoolArrangeReadFestival',
                  },
                  {
                    title: 'ind142ParentPublicEngageReadFestival',
                    field: 'ind142ParentPublicEngageReadFestival',
                  },
                  {
                    title: 'ind15SustainabilityPlanByCommittee',
                    field: 'ind15SustainabilityPlanByCommittee',
                  },
                  {
                    title: 'ind151ParentPublicHeadTeacherCombinedPlan',
                    field: 'ind151ParentPublicHeadTeacherCombinedPlan',
                  },
                  {
                    title: 'ind152ParentPublicResponsibility',
                    field: 'ind152ParentPublicResponsibility',
                  },
                  {
                    title: 'bestPracticeIndicator1',
                    field: 'bestPracticeIndicator1',
                  },
                  {
                    title: 'bestPracticeIndicator2',
                    field: 'bestPracticeIndicator2',
                  },
                  {
                    title: 'bestPracticeIndicator3',
                    field: 'bestPracticeIndicator3',
                  },
                  {
                    title: 'coachingSupportIndicator1',
                    field: 'coachingSupportIndicator1',
                  },
                  {
                    title: 'coachingSupportIndicator2',
                    field: 'coachingSupportIndicator2',
                  },
                  {
                    title: 'coachingSupportIndicator3',
                    field: 'coachingSupportIndicator3',
                  },
                  {
                    title: 'agreedSuggestion',
                    field: 'agreedSuggestion',
                  },
                  {
                    title: 'agreedStatement',
                    field: 'agreedStatement',
                  },

                  { title: 'isChecked', field: 'isChecked' },
                ]}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdatePLibraryObservation(newData, oldData, resolve)
                    }),
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      handleRowAddPLibraryObservation(newData, resolve)
                    }),
                  // onRowDelete: (oldData) =>
                  //   new Promise((resolve) => {
                  //     handleRowDeletePLibraryObservation(oldData, resolve)
                  //   }),
                }}
                options={{
                  exportButton: true,
                  exportAllData: true,
                  search: true,
                  filtering: true,
                  grouping: true,
                  sorting: true,
                  pageSize: 5,
                  pageSizeOptions: [10, 20, 30],
                  maxBodyHeight: '700px',
                  headerStyle: {
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#7e93b4ff',
                    fontWeight: 'bold',
                    width: '5px',
                    height: '5px',
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
                    width: '5px',
                    height: '5px',
                    padding: '0 5px',
                  },
                  cellStyle: {
                    borderRight: '1px solid #0c0b0bff',
                    borderLeft: '1px solid #0e0d0dff',
                    borderBottom: '1px solid #0c0b0bff',
                    borderStyle: 'solid',
                    height: '5px',
                    minHeight: '5px',
                    maxHeight: '5px',
                    padding: '0 5px',
                  },
                  maintainAspectRatio: false,
                }}
                style={{ height: '700px', width: '1300px' }}
                data={observations.toReversed()}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default PLibraryObservation
