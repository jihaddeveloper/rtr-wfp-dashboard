//  Author: Mohammad Jihad Hossain
//  Create Date: 24/11/2025
//  Modify Date: 24/11/2025
//  Description: P Milestone  file

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
import { BorderBottom } from '@material-ui/icons'

//Icon
//Icon

const PrevailMilestone25 = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allLFObservationData, setAllLFObservationData] = useState([])

  const [allBanglaObsData, setAllBanglaObsData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

  // For error handling row update
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  // For error handling row update

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')
      await getAllBanglaClass(console.log('get bangla class called'))
      await getAllLFObservation(console.log('get LF observation called'))
      await getAllTeacher(console.log('get teacher class called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

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

  // Get All Teacher
  const getAllTeacher = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-teacher', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllTeacherData(response.data)

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Teacher

  // Teacher filter data
  const g1Teacher = allTeacherData.filter((item) => {
    return item.instructionG1 === '1'
  }).length

  const g2Teacher = allTeacherData.filter((item) => {
    return item.instructionG2 === '1'
  }).length
  // Teacher filter data

  // Bangla Observation Data by filter

  // Total number monthly
  const totalClassObservationSeptember = allBanglaObsData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.teacherStatus
  }).length

  const totalClassObservationOctober = allBanglaObsData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.teacherStatus
  }).length

  const totalClassObservationNovember = allBanglaObsData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.teacherStatus
  }).length

  const totalClassObservationDecember = allBanglaObsData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.teacherStatus
  }).length
  // Total number monthly

  // All Percent Value
  // Milestone1 monthly
  const milestone1September = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'September' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(2)

  const milestone1October = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'October' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(2)

  const milestone1November = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'November' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(2)

  const milestone1December = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'December' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(2)
  // Milestone1 monthly

  // Milestone2 monthly
  const milestone2September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone2October = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone2November = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone2December = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'December' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)
  // Milestone2 monthly

  // Milestone3 monthly
  const milestone3September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone3October = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone3November = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone3December = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'December' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)
  // Milestone3 monthly

  // Milestone4 monthly
  const milestone4September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone4October = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone4November = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone4December = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'December' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)
  // Milestone4 monthly

  // Milestone5 monthly
  const milestone5September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' && item.year === '2025' && item.teacherStatus != 'Priority 0'
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone5October = (
    (allBanglaObsData.filter((item) => {
      return item.month === 'October' && item.year === '2025' && item.teacherStatus != 'Priority 0'
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone5November = (
    (allBanglaObsData.filter((item) => {
      return item.month === 'November' && item.year === '2025' && item.teacherStatus != 'Priority 0'
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)

  const milestone5December = (
    (allBanglaObsData.filter((item) => {
      return item.month === 'December' && item.year === '2025' && item.teacherStatus != 'Priority 0'
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(2)
  // Milestone5 monthly
  // Bangla Observation Data by filter
  // All Percent Value

  // Get All Book-checkout Data for school
  const getAllBanglaClass = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-bangla-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBanglaObsData(response.data)
      setIsLoading(false)
      console.log('Data:' + response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Book-checkout Data for school

  // Row update function
  const handleRowUpdateAllBanglaClass = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/p-bangla-class/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allBanglaObsData]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllBanglaObsData([...dataUpdate])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
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
  const handleRowAddBanglaClass = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/p-bangla-class/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allBanglaObsData]
          dataToAdd.push(newData)
          setAllBanglaObsData([...dataToAdd])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Add BanglaClass failed! Server error'])
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
  const handleRowDeleteBanglaClass = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/p-bangla-class/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allBanglaObsData]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllBanglaObsData([...dataDelete])
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
              <strong>PREVAIL Milestone</strong>
              {/* <strong>{allBCOData.length}</strong> */}
            </CCardHeader>
            <CCardBody>
              <CAccordion alwaysOpen>
                <CAccordionItem itemKey={1}>
                  <CAccordionHeader>
                    <strong>Milestone 2025</strong>
                  </CAccordionHeader>
                  {/* <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>G1 Teacher Priority Chart</strong> <small>(2025)</small>
                      </CCardHeader>
                      <CCardBody>
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
                                label: 'Priority 0',
                                backgroundColor: '#addcecff',
                                borderColor: '#addcecff',
                                pointBackgroundColor: '#addcecff',
                                pointBorderColor: '#addcecff',
                                data: [
                                  allG1TeacherP0January,
                                  allG1TeacherP0February,
                                  allG1TeacherP0March,
                                  allG1TeacherP0April,
                                  allG1TeacherP0May,
                                  allG1TeacherP0June,
                                  allG1TeacherP0July,
                                  allG1TeacherP0August,
                                  allG1TeacherP0September,
                                  allG1TeacherP0October,
                                  allG1TeacherP0November,
                                  allG1TeacherP0December,
                                ],
                              },
                              {
                                label: 'Priority 1',
                                backgroundColor: '#8ddaf3ff',
                                borderColor: '#8ddaf3ff',
                                pointBackgroundColor: '#8ddaf3ff',
                                pointBorderColor: '#8ddaf3ff',
                                data: [
                                  allG1TeacherP1January,
                                  allG1TeacherP1February,
                                  allG1TeacherP1March,
                                  allG1TeacherP1April,
                                  allG1TeacherP1May,
                                  allG1TeacherP1June,
                                  allG1TeacherP1July,
                                  allG1TeacherP1August,
                                  allG1TeacherP1September,
                                  allG1TeacherP1October,
                                  allG1TeacherP1November,
                                  allG1TeacherP1December,
                                ],
                              },
                              {
                                label: 'Priority 2',
                                backgroundColor: '#35a8ceff',
                                borderColor: '#35a8ceff',
                                pointBackgroundColor: '#35a8ceff',
                                pointBorderColor: '#35a8ceff',
                                data: [
                                  allG1TeacherP2January,
                                  allG1TeacherP2February,
                                  allG1TeacherP2March,
                                  allG1TeacherP2April,
                                  allG1TeacherP2May,
                                  allG1TeacherP2June,
                                  allG1TeacherP2July,
                                  allG1TeacherP2August,
                                  allG1TeacherP2September,
                                  allG1TeacherP2October,
                                  allG1TeacherP2November,
                                  allG1TeacherP2December,
                                ],
                              },
                              {
                                label: 'Priority 3',
                                backgroundColor: '#007AA4',
                                borderColor: '#007AA4',
                                pointBackgroundColor: '#007AA4',
                                pointBorderColor: '#007AA4',
                                data: [
                                  allG1TeacherP3January,
                                  allG1TeacherP3February,
                                  allG1TeacherP3March,
                                  allG1TeacherP3April,
                                  allG1TeacherP3May,
                                  allG1TeacherP3June,
                                  allG1TeacherP3July,
                                  allG1TeacherP3August,
                                  allG1TeacherP3September,
                                  allG1TeacherP3October,
                                  allG1TeacherP3November,
                                  allG1TeacherP3December,
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
                  </CAccordionBody> */}
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong></strong> <small></small>
                      </CCardHeader>
                      <CCardBody>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Leading Indicator</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Target</CTableHeaderCell>
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
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">
                                Number of classrooms observed
                              </CTableHeaderCell>
                              <CTableDataCell>?</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationSeptember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationOctober}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationNovember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationDecember}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">
                                % of the Literacy Facilitators at Basic and above levels of coaching
                                skills at the end of year 1
                              </CTableHeaderCell>
                              <CTableDataCell>75%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone1September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone1October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone1November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone1December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                % of Bangla teachers following the teacher’s guide in Bangla
                                language classes
                              </CTableHeaderCell>
                              <CTableDataCell>70%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone2September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone2October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone2November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone2December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">
                                % Bangla teachers have adopted key instructional practices (I do-We
                                do-You do, engaging students in individual and group work,
                                assessments)
                              </CTableHeaderCell>
                              <CTableDataCell>60%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone3September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone3October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone3November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone3December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">
                                % Bangla teachers following use of workbooks during the Bangla
                                language classes
                              </CTableHeaderCell>
                              <CTableDataCell>80%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone4September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone4October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone4November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone4December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">
                                % of Bangla teachers achieved ‘Mastered Instructional Routine’ level
                                or above as observed by the Literacy Facilitators during the Bangla
                                class observation
                              </CTableHeaderCell>
                              <CTableDataCell>40%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone5September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone5October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone5November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone5December}%</CTableHeaderCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                </CAccordionItem>
                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>
                    <strong>Custom Report 2025</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong>Teacher Priority vs LF Priority</strong> <small></small>
                      </CCardHeader>
                      <CCardBody>
                        <CChartBar
                          data={{
                            labels: [
                              'T-Priority-0 vs LF-Priority-1',
                              'T-Priority-0 vs LF-Priority-2',
                              'T-Priority-0 vs LF-Priority-3',
                              'T-Priority-1 vs LF-Priority-1',
                              'T-Priority-1 vs LF-Priority-2',
                              'T-Priority-1 vs LF-Priority-3',
                              'T-Priority-2 vs LF-Priority-1',
                              'T-Priority-2 vs LF-Priority-2',
                              'T-Priority-2 vs LF-Priority-3',
                              'T-Priority-3 vs LF-Priority-1',
                              'T-Priority-3 vs LF-Priority-2',
                              'T-Priority-3 vs LF-Priority-3',
                            ],
                            datasets: [
                              {
                                label: ['Teacher'],
                                backgroundColor: [
                                  '#5F564A',
                                  '#5F564A',
                                  '#5F564A',
                                  '#994263',
                                  '#994263',
                                  '#994263',
                                  '#00546B',
                                  '#00546B',
                                  '#00546B',
                                  '#A3C754',
                                  '#A3C754',
                                  '#A3C754',
                                ],
                                data: [14, 12, 21, 16, 24, 34, 16, 11, 27, 5, 23, 12],
                              },
                            ],
                          }}
                          labels="Grade wise Support Provided"
                          style={{ height: '400px', width: '1250px' }} // Inline style for height width
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                display: false,
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
                              },
                              x: {
                                ticks: {
                                  color: '#333',
                                },
                              },
                            },
                          }}
                        />
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                  {/* <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong></strong> <small></small>
                      </CCardHeader>
                      <CCardBody>
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col">Leading Indicator</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Target</CTableHeaderCell>
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
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">
                                Number of classrooms observed
                              </CTableHeaderCell>
                              <CTableDataCell>?</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationSeptember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationOctober}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationNovember}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {totalClassObservationDecember}
                              </CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">
                                % of the Literacy Facilitators at Basic and above levels of coaching
                                skills at the end of year 1
                              </CTableHeaderCell>
                              <CTableDataCell>75%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone1September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone1October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone1November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone1December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                % of Bangla teachers following the teacher’s guide in Bangla
                                language classes
                              </CTableHeaderCell>
                              <CTableDataCell>70%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone2September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone2October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone2November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone2December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">
                                % Bangla teachers have adopted key instructional practices (I do-We
                                do-You do, engaging students in individual and group work,
                                assessments)
                              </CTableHeaderCell>
                              <CTableDataCell>60%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone3September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone3October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone3November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone3December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="secondary">
                              <CTableHeaderCell scope="row">
                                % Bangla teachers following use of workbooks during the Bangla
                                language classes
                              </CTableHeaderCell>
                              <CTableDataCell>80%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone4September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone4October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone4November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone4December}%</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">
                                % of Bangla teachers achieved ‘Mastered Instructional Routine’ level
                                or above as observed by the Literacy Facilitators during the Bangla
                                class observation
                              </CTableHeaderCell>
                              <CTableDataCell>40%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone5September}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone5October}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone5November}%</CTableHeaderCell>
                              <CTableHeaderCell scope="col">{milestone5December}%</CTableHeaderCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CAccordionBody> */}
                </CAccordionItem>
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CRow>
        <CCol xs={12}>
          <CCard style={{ width: '1310px', height: '1000px' }}>
            <CCardHeader>
              <strong>All PREVAIL Bangla Observation Data</strong>
              <small>Total School-{allBanglaObsData.length}</small>
            </CCardHeader>
            <CCardBody>
              <CCardTitle></CCardTitle>
              <MaterialTable
                title={'For filtering drag and drop the headers bellow'}
                columns={[
                  {
                    title: 'Date',
                    field: 'date',
                    type: 'date',
                    sorting: 'true',
                  },
                  { title: 'School', field: 'school' },
                  {
                    title: 'Teacher',
                    field: 'classTeacher',
                  },
                  { title: 'Teacher Priority', field: 'teacherStatus', sorting: 'true' },
                  { title: 'LPO ID', field: 'lpo', type: 'string' },
                  { title: 'LPO Name', field: 'lpoName', type: 'string' },
                  {
                    title: 'LF ID',
                    field: 'lf',
                    type: 'string',
                  },
                  {
                    title: 'LF Name',
                    field: 'lfName',
                    type: 'string',
                  },
                  { title: 'Year', field: 'year', sorting: 'true' },
                  { title: 'Month', field: 'month', sorting: 'true' },
                  { title: 'District', field: 'district' },
                  { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                  { title: 'Office', field: 'fieldOffice', sorting: 'true' },
                  { title: 'Project', field: 'project', sorting: 'true' },

                  {
                    title: 'Grade',
                    field: 'grade',
                  },
                  {
                    title: 'Section',
                    field: 'section',
                  },
                  {
                    title: 'ClassStartTime',
                    field: 'classStartTime',
                  },
                  {
                    title: 'ClassEndTime',
                    field: 'classEndTime',
                  },

                  {
                    title: 'ContentName',
                    field: 'contentName',
                  },
                  {
                    title: 'PeriodDay',
                    field: 'periodDay',
                  },
                  {
                    title: 'TotalAdmittedStudent',
                    field: 'totalAdmittedStudent',
                    filtering: false,
                  },

                  {
                    title: 'TotalPresentStudent',
                    field: 'totalPresentStudent',
                    filtering: false,
                  },

                  {
                    title: 'Note',
                    field: 'note',
                  },

                  {
                    title: 'lastFollowupTopic1',
                    field: 'lastFollowupTopic1',
                    filtering: false,
                  },
                  {
                    title: 'lastFollowupTopic2',
                    field: 'lastFollowupTopic2',
                    filtering: false,
                  },
                  {
                    title: 'lastFollowupTopic3',
                    field: 'lastFollowupTopic3',
                    filtering: false,
                  },

                  {
                    title: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                    field: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind11TeacherFollowedTeacherGuideInClassNote',
                    field: 'ind11TeacherFollowedTeacherGuideInClassNote',
                    filtering: false,
                  },

                  {
                    title: 'ind12FollowedIDoWeDoYouDoStatus',
                    field: 'ind12FollowedIDoWeDoYouDoStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind12FollowedIDoWeDoYouDoNote',
                    field: 'ind12FollowedIDoWeDoYouDoNote',
                    filtering: false,
                  },

                  {
                    title: 'ind13FollowedContinuityOfLessonStatus',
                    field: 'ind13FollowedContinuityOfLessonStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind13FollowedContinuityOfLessonNote',
                    field: 'ind13FollowedContinuityOfLessonNote',
                    filtering: false,
                  },

                  {
                    title: 'ind14ImplementedAllTaskInTimeStatus',
                    field: 'ind14ImplementedAllTaskInTimeStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind14ImplementedAllTaskInTimeNote',
                    field: 'ind14ImplementedAllTaskInTimeNote',
                    filtering: false,
                  },

                  {
                    title: 'ind15InstructedToUseWorkbookStatus',
                    field: 'ind15InstructedToUseWorkbookStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind15InstructedToUseWorkbookNote',
                    field: 'ind15InstructedToUseWorkbookNote',
                    filtering: false,
                  },

                  {
                    title: 'ind16IndependentReadingOpportunityStatus',
                    field: 'ind16IndependentReadingOpportunityStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind16IndependentReadingOpportunityNote',
                    field: 'ind16IndependentReadingOpportunityNote',
                    filtering: false,
                  },

                  {
                    title: 'ind21CorrectlyPronouncedStatus',
                    field: 'ind21CorrectlyPronouncedStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind21CorrectlyPronouncedNote',
                    field: 'ind21CorrectlyPronouncedNote',
                    filtering: false,
                  },

                  {
                    title: 'ind22TaughtCorrectlyAllowPracticeStatus',
                    field: 'ind22TaughtCorrectlyAllowPracticeStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind22TaughtCorrectlyAllowPracticeNote',
                    field: 'ind22TaughtCorrectlyAllowPracticeNote',
                    filtering: false,
                  },

                  {
                    title: 'ind23DemonstratesFluentReadingStatus',
                    field: 'ind23DemonstratesFluentReadingStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind23DemonstratesFluentReadingNote',
                    field: 'ind23DemonstratesFluentReadingNote',
                    filtering: false,
                  },

                  {
                    title: 'ind24AllowReadIndividuallyPairGroupsStatus',
                    field: 'ind24AllowReadIndividuallyPairGroupsStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind24AllowReadIndividuallyPairGroupsNote',
                    field: 'ind24AllowReadIndividuallyPairGroupsNote',
                    filtering: false,
                  },

                  {
                    title: 'ind25FollowsInstructionsInWritingStatus',
                    field: 'ind25FollowsInstructionsInWritingStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind25FollowsInstructionsInWritingNote',
                    field: 'ind25FollowsInstructionsInWritingNote',
                    filtering: false,
                  },

                  {
                    title: 'ind31AskedHelpfulQuestionsStatus',
                    field: 'ind31AskedHelpfulQuestionsStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind31AskedHelpfulQuestionsNote',
                    field: 'ind31AskedHelpfulQuestionsNote',
                    filtering: false,
                  },

                  {
                    title: 'ind32TaughtVocabularyNewSentenceStatus',
                    field: 'ind32TaughtVocabularyNewSentenceStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind32TaughtVocabularyNewSentenceNote',
                    field: 'ind32TaughtVocabularyNewSentenceNote',
                    filtering: false,
                  },
                  {
                    title: 'ind33CheckWritingSpellingPunctuationStatus',
                    field: 'ind33CheckWritingSpellingPunctuationStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind33CheckWritingSpellingPunctuationNote',
                    field: 'ind33CheckWritingSpellingPunctuationNote',
                    filtering: false,
                  },

                  {
                    title: 'ind34CheckedWeDoYouDoStatus',
                    field: 'ind34CheckedWeDoYouDoStatus',
                    filtering: false,
                  },
                  {
                    title: 'ind34CheckedWeDoYouDoNote',
                    field: 'ind34CheckedWeDoYouDoNote',
                    filtering: false,
                  },

                  { title: 'bestPracticeInd1', field: 'bestPracticeInd1', filtering: false },
                  { title: 'bestPracticeInd2', field: 'bestPracticeInd2', filtering: false },

                  {
                    title: 'coachingSupportInd1',
                    field: 'coachingSupportInd1',
                    filtering: false,
                  },
                  {
                    title: 'coachingSupportInd2',
                    field: 'coachingSupportInd2',
                    filtering: false,
                  },

                  { title: 'agreedStatement1', field: 'agreedStatement1', filtering: false },
                  { title: 'agreedStatement2', field: 'agreedStatement2', filtering: false },

                  { title: 'question1', field: 'question1', filtering: false },

                  { title: 'student1', field: 'student1', filtering: false },
                  { title: 'student2', field: 'student2', filtering: false },
                  { title: 'student3', field: 'student3', filtering: false },

                  { title: 'noRightFor1', field: 'noRightFor1', filtering: false },
                  { title: 'noWrongFor1', field: 'noWrongFor1', filtering: false },
                  { title: 'totalFor1', field: 'totalFor1', filtering: false },
                  { title: 'noRightFor2', field: 'noRightFor2', filtering: false },
                  { title: 'noWrongFor2', field: 'noWrongFor2', filtering: false },
                  { title: 'totalFor2', field: 'totalFor2', filtering: false },
                  { title: 'noRightFor3', field: 'noRightFor3', filtering: false },
                  { title: 'noWrongFor3', field: 'noWrongFor3', filtering: false },
                  { title: 'totalFor3', field: 'totalFor3', filtering: false },
                ]}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      handleRowAddBanglaClass(newData, resolve)
                    }),
                  // onRowDelete: (oldData) =>
                  //   new Promise((resolve) => {
                  //     handleRowDeleteBanglaClass(oldData, resolve)
                  //   }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      handleRowUpdateAllBanglaClass(newData, oldData, resolve)
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
                data={allBanglaObsData}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </CRow>
  )
}

export default PrevailMilestone25
