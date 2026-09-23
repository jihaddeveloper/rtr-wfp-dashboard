//  Author: Mohammad Jihad Hossain
//  Create Date: 14/05/2026
//  Modify Date: 06/09/2026
//  Description: PAnalysisBCOLPO  file

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

const BASE_URL = process.env.REACT_APP_API_URL

const API_URL = `${BASE_URL}/p-book-checkout`

const PAnalysisBCOLPO = () => {
  // This function runs synchronously before the initial render
  const [user, setUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user || 'no user saved'
  })

  const LF = 'E-03848'
  const LPO = user?.username || 'E-04629'

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const [allBCOPData, setAllBCOPData] = useState([])

  // For error handling row update
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  // For error handling row update

  // 2. Fetch API Data on Mount
  useEffect(() => {
    const fetchBookCheckoutData = async () => {
      setIsLoading(true)
      setIsError(false)
      try {
        // NOTE: 'no-cors' will prevent you from reading response.data.
        // Ensure your backend allows CORS natively instead.
        const response = await axios.get(`${API_URL}`, {
          headers: {
            Accept: 'application/json',
          },
        })

        const arrayData = Array.isArray(response.data) ? response.data : response.data?.data

        if (!Array.isArray(arrayData)) {
          setAllBCOPData([])
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

        setAllBCOPData(
          sortedData.filter((item) => {
            return item.lpo === LPO && item.office === 'NrFO'
          }) || [],
        )
      } catch (error) {
        setIsError(true)
        setErrorMessages((prev) => [...prev, error.message])
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookCheckoutData()
  }, [])

  // 3. Dynamic Date Configurations (Cached using useMemo)
  const dateInfo = useMemo(() => {
    const current = new Date()
    const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
    const currentMonth = current.toLocaleString('default', { month: 'long' })

    current.setMonth(current.getMonth() - 1)
    const previousMonth = current.toLocaleString('default', { month: 'long' })
    const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })

    return { currentMonthYear, currentMonth, previousMonth, previousMonthYear }
  }, [])

  // 4. Optimized Calculations (Prevents O(N) multi-filtering loops)
  const monthlyMetrics = useMemo(() => {
    const months = [
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

    // Initialize accumulators for 2026
    const totals = months.reduce((acc, month) => {
      acc[month] = { students: 0, checkouts: 0 }
      return acc
    }, {})

    // Single-pass processing: O(N) total runtime
    allBCOPData.forEach((item) => {
      if (item.year === '2026' && totals[item.month]) {
        totals[item.month].students += item.schoolTotalNoStudent || 0

        if (item.schoolTotalNoStudentBC !== 0) {
          totals[item.month].checkouts += item.schoolTotalNoBookBC || 0
        }
      }
    })

    // Calculate rates per student for the chart dataset
    return months.map((month) => {
      const { students, checkouts } = totals[month]
      return students > 0 ? parseFloat((checkouts / students).toFixed(2)) : 0
    })
  }, [allBCOPData])

  // 5. Derived Chart Data Structure
  const schoolBCOPerChildChartData = useMemo(
    () => ({
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
          label: 'Book checkout per Student',
          borderColor: '#264a2f',
          backgroundColor: ['#264a2f'],
          pointBackgroundColor: '#264a2f',
          pointBorderColor: '#fff',
          data: monthlyMetrics,
        },
      ],
    }),
    [monthlyMetrics],
  )

  // It runs instantly and automatically whenever API data updates.
  const reportData26 = useMemo(() => {
    const months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ]

    // 1. Initialize a data table structure for rapid key-value collection
    const rawMetrics = months.reduce((acc, month) => {
      acc[month] = { totalStudents: 0, totalBooks: 0, studentsCheckedOut: 0 }
      return acc
    }, {})

    // 2. Single-pass data sweep: O(N) execution time total
    allBCOPData.forEach((item) => {
      if (item.year === '2026') {
        const targetMonth = item.month?.toLowerCase()

        if (rawMetrics[targetMonth]) {
          // Accumulate row 1 metric
          rawMetrics[targetMonth].totalStudents += item.schoolTotalNoStudent || 0

          // Accumulate row 2 metric
          if (item.schoolTotalNoStudentBC !== 0) {
            rawMetrics[targetMonth].totalBooks += item.schoolTotalNoBookBC || 0
          }

          // Accumulate row 4 metric (Extrapolated from your template logic)
          rawMetrics[targetMonth].studentsCheckedOut += item.schoolTotalNoStudentBC || 0
        }
      }
    })

    // 3. Build dynamic metrics rows programmatically
    const row1 = { sl: 1, area: 'Total Students( 1 - 5)' }
    const row2 = { sl: 2, area: 'Total Book Check Out' }
    const row3 = { sl: 3, area: 'Average Book Checkout Per Child' }
    const row4 = { sl: 4, area: '# of Students checked out books' }
    const row5 = { sl: 5, area: '% of Students checked out books' }

    months.forEach((month) => {
      const data = rawMetrics[month]

      // Map calculated state properties to month columns
      row1[month] = data.totalStudents
      row2[month] = data.totalBooks
      row4[month] = data.studentsCheckedOut

      // Derived metric for Row 3: Avg checkouts
      row3[month] =
        data.totalStudents > 0 ? parseFloat((data.totalBooks / data.totalStudents).toFixed(2)) : 0

      // Derived metric for Row 5: Active checkout percentage
      row5[month] =
        data.totalStudents > 0
          ? parseFloat(((data.studentsCheckedOut / data.totalStudents) * 100).toFixed(2))
          : 0
    })

    const completeReportTable = [row1, row2, row3, row4, row5]

    console.log('reportObject26 Optimized:', completeReportTable)
    return completeReportTable
  }, [allBCOPData])

  // Row update function
  const handleRowUpdatePBCO = (newData, oldData, resolve, reject) => {
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
          setAllBCOPData((prevData) =>
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
  const handleRowAddPBCO = (newData, resolve) => {
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
          setAllBCOPData((prevData) => [savedRowFromServer, ...prevData])

          setIserror(false)
          setErrorMessages([])
          resolve()
        })
        .catch((error) => {
          setErrorMessages(['Add BCO Data failed! Server error'])
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
  const handleRowDeletePBCO = (oldData, resolve) => {
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
          setAllBCOPData((prevData) =>
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>BCO Analysis-2026</strong>
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
                maxBodyHeight: '500px',
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
              data={reportData26}
            />
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Average Book Checkout Per Student-2026</strong>
          </CCardHeader>
          <CCardBody>
            <CChart
              type="line"
              data={schoolBCOPerChildChartData}
              labels="months"
              width="100%"
              height="400px"
              options={{
                exportButton: true,
                exportAllData: true,
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
            />
          </CCardBody>
        </CCard>

        <CCard className="w-100 mb-4">
          <CCardHeader>
            <strong>PREVAIL BCO Data-2026</strong>
          </CCardHeader>
          <CCardBody style={{ overflowX: 'auto', width: '100%' }}>
            <MaterialTable
              title={allBCOPData.length + ' BCO Data'}
              columns={[
                { title: 'Obs Date', field: 'date', type: 'date', sorting: 'true' },

                { title: 'school', field: 'school' },
                {
                  title: 'pointTeacher',
                  field: 'pointTeacher',
                },
                { title: 'month', field: 'month', sorting: 'true' },
                { title: 'year', field: 'year', sorting: 'true' },

                { title: 'district', field: 'district' },
                { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                { title: 'note', field: 'note', type: 'string' },
                { title: 'visitor', field: 'visitor' },
                { title: 'visitorDesignation', field: 'visitorDesignation' },

                { title: 'lpo', field: 'lpo', type: 'string' },
                { title: 'lpoName', field: 'lpoName', type: 'string' },
                {
                  title: 'lf',
                  field: 'lf',
                  type: 'string',
                },
                { title: 'lfName', field: 'lfName', type: 'string' },

                { title: 'rtrSchoolId', field: 'rtrSchoolId' },
                { title: 'yearOfSupport', field: 'yearOfSupport' },
                { title: 'yearOfEstablished', field: 'yearOfEstablished' },

                { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                { title: 'schoolTotalNoBookGirlBC', field: 'schoolTotalNoBookGirlBC' },
                { title: 'schoolTotalNoBookBoyBC', field: 'schoolTotalNoBookBoyBC' },
                { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                { title: 'classOneBoy', field: 'classOneBoy' },
                { title: 'classOneGirl', field: 'classOneGirl' },
                { title: 'classOneTotal', field: 'classOneTotal' },

                { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                { title: 'classTwoBoy', field: 'classTwoBoy' },
                { title: 'classTwoGirl', field: 'classTwoGirl' },
                { title: 'classTwoTotal', field: 'classTwoTotal' },

                { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                { title: 'classThreeBoy', field: 'classThreeBoy' },
                { title: 'classThreeGirl', field: 'classThreeGirl' },
                { title: 'classThreeTotal', field: 'classThreeTotal' },

                { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                { title: 'classFourBoy', field: 'classFourBoy' },
                { title: 'classFourGirl', field: 'classFourGirl' },
                { title: 'classFourTotal', field: 'classFourTotal' },

                { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                { title: 'classFiveBoy', field: 'classFiveBoy' },
                { title: 'classFiveGirl', field: 'classFiveGirl' },
                { title: 'classFiveTotal', field: 'classFiveTotal' },

                { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },
                { title: 'Subm Date', field: 'createDate', type: 'date', sorting: 'true' },
                { title: 'isChecked', field: 'isChecked' },
              ]}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAddPBCO(newData, resolve)
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdatePBCO(newData, oldData, resolve)
                  }),
                // onRowDelete: (oldData) =>
                //   new Promise((resolve) => {
                //     handleRowDeletePBCO(oldData, resolve)
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
              data={allBCOPData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PAnalysisBCOLPO
