//  Author: Mohammad Jihad Hossain
//  Create Date: 10/06/2026
//  Modify Date: 06/09/2026
//  Description: PLFObservationLPO  file

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

const BASE_URL = 'http://118.179.80.51:8080/api/v1'

const API_URL = `${BASE_URL}/p-lf-observation`

const PLFObservationDetailLPO = () => {
  // This function runs synchronously before the initial render
  const [user, setUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user || 'no user saved'
  })

  // data state to store the BCO API data. Its initial value is an empty array
  //const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allLFObservationData, setAllLFObservationData] = useState([])
  const [allEmployeeData, setAllEmployeeData] = useState([])
  const [allSchoolData, setAllSchoolData] = useState([])

  const LF = 'E-03848'

  const LPO = user?.username || 'E-04629'

  const SchoolNo = allSchoolData.filter((item) => {
    return item.lpo === LPO
  }).length

  const LFNo = allEmployeeData.filter((item) => {
    return item.supervisor === LPO
  }).length

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  // Chart Data

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')

      await getAllSchool(console.log('get School class called'))
      await getAllEmployee()
      await getAllLFObservation()
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All LFObservation Data
  const getAllLFObservation = async () => {
    try {
      const response = await axios(API_URL, {
        headers: {
          Accept: 'application/json',
        },
      })

      const arrayData = Array.isArray(response.data) ? response.data : response.data?.data

      if (!Array.isArray(arrayData)) {
        setAllLFObservationData([])
        return
      }

      // Sort descending so the latest item comes first
      const sortedData = [...arrayData].sort((a, b) => {
        // 1. If you have a date/timestamp field (e.g., createdAt, date, timestamp)
        return new Date(b.createDate) - new Date(a.createDate)

        // 2. OR if you use an auto-incrementing numeric ID (e.g., id, _id):
        // return b.id - a.id;
      })

      //const reversedData = Array.isArray(response.data) ? response.data.reverse() : []

      setAllLFObservationData(
        sortedData.filter((item) => {
          return item.lpo === LPO
        }),
      )
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All LFObservation Data

  // Get All School
  const getAllSchool = async () => {
    setIsLoading(true)
    try {
      const response = await axios(`${BASE_URL}/p-school`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllSchoolData(response.data)

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All School

  // Get All School
  const getAllEmployee = async () => {
    setIsLoading(true)
    try {
      const response = await axios(`${BASE_URL}/p-employee`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllEmployeeData(response.data)

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All School

  // LF Observation Data by filter
  const allLFObsDataCurrent = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2025'
  }).length

  const allLFObsDataPreviousMonth = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2025'
  }).length

  // Current Month
  const allLFObsCurrentMonth = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2026'
  }).length

  const allLFObsCurrentMonthP1 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsCurrentMonthP2 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsCurrentMonthP3 = allLFObservationData.filter((item) => {
    return item.month === currentMonth && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length
  // Current Month

  // Previous Month
  const allLFObsPreviousMonth = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2026'
  }).length

  const allLFObsPreviousMonthP1 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObsPreviousMonthP2 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObsPreviousMonthP3 = allLFObservationData.filter((item) => {
    return item.month === previousMonth && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length
  // Previous Month

  // Trending
  // Priority 1
  const allLFObservationDataP1January = allLFObservationData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1February = allLFObservationData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1March = allLFObservationData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1April = allLFObservationData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1May = allLFObservationData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1June = allLFObservationData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1July = allLFObservationData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1August = allLFObservationData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1September = allLFObservationData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1October = allLFObservationData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1November = allLFObservationData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length

  const allLFObservationDataP1December = allLFObservationData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.lfStatus === 'Priority 1'
  }).length
  // Priority 1

  // Priority 2
  const allLFObservationDataP2January = allLFObservationData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2February = allLFObservationData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2March = allLFObservationData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2April = allLFObservationData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2May = allLFObservationData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2June = allLFObservationData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2July = allLFObservationData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2August = allLFObservationData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2September = allLFObservationData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2October = allLFObservationData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2November = allLFObservationData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length

  const allLFObservationDataP2December = allLFObservationData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.lfStatus === 'Priority 2'
  }).length
  // Priority 2

  // Priority 3
  const allLFObservationDataP3January = allLFObservationData.filter((item) => {
    return item.month === 'January' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3February = allLFObservationData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3March = allLFObservationData.filter((item) => {
    return item.month === 'March' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3April = allLFObservationData.filter((item) => {
    return item.month === 'April' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3May = allLFObservationData.filter((item) => {
    return item.month === 'May' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3June = allLFObservationData.filter((item) => {
    return item.month === 'June' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3July = allLFObservationData.filter((item) => {
    return item.month === 'July' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3August = allLFObservationData.filter((item) => {
    return item.month === 'August' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3September = allLFObservationData.filter((item) => {
    return item.month === 'September' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3October = allLFObservationData.filter((item) => {
    return item.month === 'October' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3November = allLFObservationData.filter((item) => {
    return item.month === 'November' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length

  const allLFObservationDataP3December = allLFObservationData.filter((item) => {
    return item.month === 'December' && item.year === '2026' && item.lfStatus === 'Priority 3'
  }).length
  // Priority 3
  // Trending
  // LF Observation Data by filter

  // Row update function
  const handleRowUpdateAllLFObservation = (newData, oldData, resolve, reject) => {
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
        .patch(`${API_URL}/${newData.id}`, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // Fallback to res.data if your API returns the updated item, otherwise use newData
          const updatedRowFromServer = res.data || newData

          // Secure state update using item IDs to prevent bugs caused by .toReversed() layout ordering
          setAllLFObservationData((prevData) =>
            prevData.map((item) => {
              // Compare unique IDs as strings to rule out type discrepancies
              if (String(item.id) === String(newData.id)) {
                return {
                  ...item, // Keep original row structure and historical tableData keys
                  ...updatedRowFromServer, // Layer on top the freshly patched API parameters
                  tableData: oldData.tableData, // Protect material-table's critical internal layout reference tracker
                }
              }
              return item
            }),
          )

          // // Resolve the promise to close the material-table inline edit mode
          resolve()
        })
        .catch((error) => {
          setErrorMessages(['Update failed! Server error'])
          setIserror(true)
          reject()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      reject()
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
        .post(`${API_URL}`, newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // Fallback safely to input data if your API response body is wrapped or customized
          const savedRowFromServer = res.data || newData

          // Prepend directly to the front since the state isn't being reversed dynamically anymore
          setAllLFObservationData((prevData) => [savedRowFromServer, ...prevData])

          setIserror(false)
          setErrorMessages([])
          resolve()
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
        .delete(`${API_URL}/${oldData.id}`, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // This is safe against sorting, filtering, and array order shifts
          setAllLFObservationData((prevData) =>
            prevData.filter((item) => String(item.id) !== String(oldData.id)),
          )
          // The table updates instantly from the filter state above, saving a network request

          setIserror(false)
          setErrorMessages([])
          resolve() // Smoothly closes the material-table delete modal confirmation overlay
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
              <strong>PREVAIL LF Observation</strong>
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
                      <CCol xs={12} md={6} className="mb-4 mb-md-0">
                        <strong>All LF Observation Priority {previousMonthYear}</strong>
                        <CTable bordered hover responsive striped>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total LF</CTableHeaderCell>
                              <CTableDataCell>{LFNo}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">No of School</CTableHeaderCell>
                              <CTableDataCell>{SchoolNo}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">No of LF Observation</CTableHeaderCell>
                              <CTableDataCell>{allLFObsPreviousMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol xs={12} md={6} className="mb-4 mb-md-0">
                        <strong>All LF Observation Status {previousMonthYear}</strong>
                        <CTable bordered hover responsive striped>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                              <CTableDataCell>{allLFObsPreviousMonthP1}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allLFObsPreviousMonthP2}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allLFObsPreviousMonthP3}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allLFObsPreviousMonthP1 +
                                  allLFObsPreviousMonthP2 +
                                  allLFObsPreviousMonthP3}
                              </CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={12} md={6} className="mb-4 mb-md-0">
                        <strong>All LF Observation Priority {currentMonthYear}</strong>
                        <CTable bordered hover responsive striped>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total LF</CTableHeaderCell>
                              <CTableDataCell>{LFNo}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">No of School</CTableHeaderCell>
                              <CTableDataCell>{SchoolNo}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">No of LF Observation</CTableHeaderCell>
                              <CTableDataCell>{allLFObsCurrentMonth}</CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCol>
                      <CCol xs={12} md={6} className="mb-4 mb-md-0">
                        <strong>All LF Observation Status {currentMonthYear}</strong>
                        <CTable bordered hover responsive striped>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Rating</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                              <CTableDataCell>{allLFObsCurrentMonthP1}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                              <CTableDataCell>{allLFObsCurrentMonthP2}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                              <CTableDataCell>{allLFObsCurrentMonthP3}</CTableDataCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                              <CTableDataCell>
                                {allLFObsCurrentMonthP1 +
                                  allLFObsCurrentMonthP2 +
                                  allLFObsCurrentMonthP3}
                              </CTableDataCell>
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
                          <strong>Library Trending Chart</strong> <small>(2026)</small>
                        </CCardHeader>
                        <CCardBody style={{ position: 'relative', height: '400px', width: '100%' }}>
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
                            style={{ position: 'relative', height: '300px', width: '100%' }} // Inline style for height width
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
                        <CTable bordered hover responsive striped>
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
          <CCard className="w-100 mb-4">
            <CCardHeader>
              <strong>All PREVAIL LF Observation Data </strong>
              <small className="text-muted block-xs-only">
                Total LF Observation -{allLFObservationData.length}
              </small>
            </CCardHeader>
            <CCardBody style={{ width: '100%', overflowX: 'auto' }}>
              <CCardTitle></CCardTitle>
              <MaterialTable
                title=""
                columns={[
                  { title: 'Obs Date', field: 'date', type: 'date', sorting: 'true' },

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

                  { title: 'rtrSchoolId', field: 'rtrSchoolId', type: 'string' },
                  { title: 'yearOfSupport', field: 'yearOfSupport', type: 'string' },
                  { title: 'schoolEntryTime', field: 'schoolEntryTime', type: 'string' },
                  { title: 'schoolExitTime', field: 'schoolExitTime', type: 'string' },
                  { title: 'visitor', field: 'visitor', type: 'string' },
                  { title: 'visitorDesignation', field: 'visitorDesignation', type: 'string' },

                  { title: 'note', field: 'note', type: 'string' },

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
                    title: 'coachingSupportLF',
                    field: 'coachingSupportLF',
                  },
                  {
                    title: 'coachingSupportLPO',
                    field: 'coachingSupportLPO',
                  },
                  {
                    title: 'agreedStatement1',
                    field: 'agreedStatement1',
                  },
                  {
                    title: 'agreedStatement2',
                    field: 'agreedStatement2',
                  },
                  { title: 'Subm Date', field: 'createDate', type: 'date', sorting: 'true' },
                  {
                    title: 'isChecked',
                    field: 'isChecked',
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
                  // onRowDelete: (oldData) =>
                  //   new Promise((resolve) => {
                  //     handleRowDeleteLFObservation(oldData, resolve)
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
                  pageSizeOptions: [5, 10, 20, 30],
                  maxBodyHeight: '600px',
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
                style={{ width: '100%' }}
                data={allLFObservationData}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

export default PLFObservationDetailLPO
