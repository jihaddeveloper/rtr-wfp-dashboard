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
//Icon

const DIBanglaClassDataDetail = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBanglaClass, setAllBanglaClass] = useState([])

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
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Bangla data by filter
  const AllDIBanglaG1Data = allBanglaClass.filter((item) => {
    return item.grade.includes('G1')
  })
  const AllDIBanglaG2Data = allBanglaClass.filter((item) => {
    return item.grade.includes('G2')
  })

  const AllDIBanglaDataMFO = allBanglaClass.filter((item) => {
    return item.fieldOffice.includes('MFO')
  })

  const AllDIBanglaDataCurrentMonthMFO = allBanglaClass.filter((item) => {
    return (
      item.fieldOffice.includes('MFO') && item.month.includes(currentMonth) && item.year === '2024'
    )
  })

  const AllDIBanglaDataPreviousMonthMFO = allBanglaClass.filter((item) => {
    return (
      item.fieldOffice.includes('MFO') && item.month.includes(previousMonth) && item.year === '2024'
    )
  })

  const AllDIBanglaDataMFOG1 = allBanglaClass.filter((item) => {
    return item.fieldOffice.includes('MFO') && item.grade.includes('G1')
  })

  const AllDIBanglaDataMFOG2 = allBanglaClass.filter((item) => {
    return item.fieldOffice.includes('MFO') && item.grade.includes('G2')
  })

  const AllDIBanglaDataNrFO = allBanglaClass.filter((item) => {
    return item.fieldOffice.includes('NrFO')
  })

  const AllDIBanglaDataCurrentMonthNrFO = allBanglaClass.filter((item) => {
    return (
      item.fieldOffice.includes('NrFO') && item.month.includes(currentMonth) && item.year === '2024'
    )
  })

  const AllDIBanglaDataPreviousMonthNrFO = allBanglaClass.filter((item) => {
    return (
      item.fieldOffice.includes('NrFO') &&
      item.month.includes(previousMonth) &&
      item.year === '2024'
    )
  })

  const AllDIBanglaDataNrFOG1 = allBanglaClass.filter((item) => {
    return item.fieldOffice.includes('NrFO') && item.grade.includes('G1')
  })

  const AllDIBanglaDataNrFOG2 = allBanglaClass.filter((item) => {
    return item.fieldOffice.includes('NrFO') && item.grade.includes('G2')
  })

  // Bangla Observation Data by filter
  const allG1TeacherCurrentMonth = allBanglaClass.filter((item) => {
    return item.month === currentMonth && item.year === '2024' && item.grade === 'G1'
  }).length

  const allG1TeacherP1PreviousMonth = allBanglaClass
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 1'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP2PreviousMonth = allBanglaClass
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 2'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG1TeacherP3PreviousMonth = allBanglaClass
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G1' &&
        item.teacherStatus === 'Priority 3'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherCurrentMonth = allBanglaClass.filter((item) => {
    return item.month === currentMonth && item.year === '2024' && item.grade === 'G2'
  }).length

  const allG2TeacherP1PreviousMonth = allBanglaClass
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 1'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP2PreviousMonth = allBanglaClass
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 2'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length

  const allG2TeacherP3PreviousMonth = allBanglaClass
    .filter((item) => {
      return (
        item.month === previousMonth &&
        item.year === '2024' &&
        item.grade === 'G2' &&
        item.teacherStatus === 'Priority 3'
        // && item.fieldOffice === 'NrFO'
      )
    })
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.classTeacher === value.classTeacher),
    ).length
  // Bangla Observation Data by filter

  // Bangla data by filter

  // Get All Book-checkout Data for school
  const getAllBanglaClass = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/di-bangla-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBanglaClass(response.data)
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
        .patch('http://118.179.80.51:8080/api/v1/di-bangla-class/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allBanglaClass]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllBanglaClass([...dataUpdate])
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
        .post('http://118.179.80.51:8080/api/v1/di-bangla-class/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allBanglaClass]
          dataToAdd.push(newData)
          setAllBanglaClass([...dataToAdd])
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
        .delete('http://118.179.80.51:8080/api/v1/di-bangla-class/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allBanglaClass]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllBanglaClass([...dataDelete])
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
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Bangla Class Observation 2024</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>DI Bangla Observation Data</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G1 Teacher Visited {previousMonthYear}</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total G1 Teacher</CTableHeaderCell>
                            <CTableDataCell>600</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of Visited G1 Teracher
                            </CTableHeaderCell>
                            <CTableDataCell>450</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G1 Teacher Priority {previousMonthYear}</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G2 Teacher Visited {previousMonthYear}</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Level</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total G2 Teacher</CTableHeaderCell>
                            <CTableDataCell>500</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">
                              No of Visited G1 Teracher
                            </CTableHeaderCell>
                            <CTableDataCell>400</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G2 Teacher Priority {previousMonthYear}</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>40</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>70</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={allBanglaClass.length + ' Data'}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={allBanglaClass}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Monthly Teacher Performance Overall</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>G1 Teacher Priority</strong> <small>(2024)</small>
                    </CCardHeader>
                    <CCardBody>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
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
                            <CTableDataCell>{allG1TeacherP1PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP2PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP3PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>
                              {allG1TeacherP1PreviousMonth +
                                allG1TeacherP2PreviousMonth +
                                allG1TeacherP3PreviousMonth}
                            </CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CAccordionBody>
                <CAccordionBody>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>G2 Teacher Priority</strong> <small>(2024)</small>
                    </CCardHeader>
                    <CCardBody>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
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
                            <CTableDataCell>{allG1TeacherP1PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP2PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP3PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>
                              {allG1TeacherP1PreviousMonth +
                                allG1TeacherP2PreviousMonth +
                                allG1TeacherP3PreviousMonth}
                            </CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Moulvibazar-MFO</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G1 Teacher Priority</strong>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G2 Teacher Priority</strong>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G1 Teacher Priority {previousMonthYear} of Mst. Habiba Khatun</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G2 Teacher Priority {previousMonthYear} 0f Mst. Habiba Khatun</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G1 Teacher Priority {previousMonthYear} of Md. Abdul Kadir</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G2 Teacher Priority {previousMonthYear} 0f Md. Abdul Kadir</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G1 Teacher Priority {previousMonthYear} of Shahinur Islam</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G2 Teacher Priority {previousMonthYear} 0f Shahinur Islam</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G1 Teacher Priority {previousMonthYear} of Masum Ahmed</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G2 Teacher Priority {previousMonthYear} 0f Masum Ahmed</strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={AllDIBanglaDataMFO.length + ' Data'}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },
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
                      { title: 'visitorDesignation', field: 'visitorDesignation', sorting: 'true' },
                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'Content',
                        field: 'contentName',
                      },
                      {
                        title: 'Period Day',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                        title: 'ind1PhonemicAwarenessStatus',
                        field: 'ind1PhonemicAwarenessStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind1PhonemicAwarenessNotes',
                        field: 'ind1PhonemicAwarenessNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind2LetterIdentificationStatus',
                        field: 'ind2LetterIdentificationStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind2LetterIdentificationNotes',
                        field: 'ind2LetterIdentificationNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind3VocabularyIdentificationStatus',
                        field: 'ind3VocabularyIdentificationStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind3VocabularyIdentificationNotes',
                        field: 'ind3VocabularyIdentificationNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind4FluencyIdentificationStatus',
                        field: 'ind4FluencyIdentificationStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind4FluencyIdentificationNotes',
                        field: 'ind4FluencyIdentificationNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind5ComprehensionStatus',
                        field: 'ind5ComprehensionStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind5ComprehensionNotes',
                        field: 'ind5ComprehensionNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind6WritingActivitiesStatus',
                        field: 'ind6WritingActivitiesStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind6WritingActivitiesNotes',
                        field: 'ind6WritingActivitiesNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind7IDoWeDoYouDoStatus',
                        field: 'ind7IDoWeDoYouDoStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind7IDoWeDoYouDoNotes',
                        field: 'ind7IDoWeDoYouDoNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind8GroupWorkStatus',
                        field: 'ind8GroupWorkStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind8GroupWorkNotes',
                        field: 'ind8GroupWorkNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind9TimeOnTaskStatus',
                        field: 'ind9TimeOnTaskStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind9TimeOnTaskNotes',
                        field: 'ind9TimeOnTaskNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind10UseTeachingAidStatus',
                        field: 'ind10UseTeachingAidStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind10UseTeachingAidNotes',
                        field: 'ind10UseTeachingAidNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind11ContinuityOfLessonsStatus',
                        field: 'ind11ContinuityOfLessonsStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind11ContinuityOfLessonsNotes',
                        field: 'ind11ContinuityOfLessonsNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind12AssessmentStatus',
                        field: 'ind12AssessmentStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind12AssessmentNotes',
                        field: 'ind12AssessmentNotes',
                        filtering: false,
                      },

                      { title: 'bestPracticeInd1', field: 'bestPracticeInd1', filtering: false },
                      { title: 'bestPracticeInd2', field: 'bestPracticeInd2', filtering: false },
                      { title: 'bestPracticeInd3', field: 'bestPracticeInd3', filtering: false },

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

                      {
                        title: 'coachingSupportDetailsInd1',
                        field: 'coachingSupportDetailsInd1',
                        filtering: false,
                      },
                      {
                        title: 'coachingSupportDetailsInd2',
                        field: 'coachingSupportDetailsInd2',
                        filtering: false,
                      },

                      { title: 'agreedStatement1', field: 'agreedStatement1', filtering: false },
                      { title: 'agreedStatement2', field: 'agreedStatement2', filtering: false },

                      { title: 'question1', field: 'question1', filtering: false },

                      { title: 'student1', field: 'student1', filtering: false },
                      { title: 'student2', field: 'student2', filtering: false },
                      { title: 'student3', field: 'student3', filtering: false },
                      { title: 'student4', field: 'student4', filtering: false },
                      { title: 'student5', field: 'student5', filtering: false },

                      { title: 'noRightFor1', field: 'noRightFor1', filtering: false },
                      { title: 'noWrongFor1', field: 'noWrongFor1', filtering: false },
                      { title: 'totalFor1', field: 'totalFor1', filtering: false },
                      { title: 'noRightFor2', field: 'noRightFor2', filtering: false },
                      { title: 'noWrongFor2', field: 'noWrongFor2', filtering: false },
                      { title: 'totalFor2', field: 'totalFor2', filtering: false },
                      { title: 'noRightFor3', field: 'noRightFor3', filtering: false },
                      { title: 'noWrongFor3', field: 'noWrongFor3', filtering: false },
                      { title: 'totalFor3', field: 'totalFor3', filtering: false },
                      { title: 'noRightFor4', field: 'noRightFor4', filtering: false },
                      { title: 'noWrongFor4', field: 'noWrongFor4', filtering: false },
                      { title: 'totalFor4', field: 'totalFor4', filtering: false },
                      { title: 'noRightFor5', field: 'noRightFor5', filtering: false },
                      { title: 'noWrongFor5', field: 'noWrongFor5', filtering: false },
                      { title: 'totalFor5', field: 'totalFor5', filtering: false },
                    ]}
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataMFO}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>Narail-NrFO</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>G1 Teacher Priority</strong>
                    </CCol>
                    <CCol sm={6}>
                      <strong>G2 Teacher Priority</strong>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <CRow>
                    <CCol sm={6}>
                      <strong>
                        G1 Teacher Priority {previousMonthYear} of Md. Manowar Hossain
                      </strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                    <CCol sm={6}>
                      <strong>
                        G2 Teacher Priority {previousMonthYear} 0f Md. Manowar Hossain
                      </strong>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Number</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          <CTableRow color="danger">
                            <CTableHeaderCell scope="row">Priority 1</CTableHeaderCell>
                            <CTableDataCell>20</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>10</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>30</CTableDataCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>80</CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCol>
                  </CRow>
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={AllDIBanglaDataNrFO.length + ' Data'}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },
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
                      { title: 'visitorDesignation', field: 'visitorDesignation', sorting: 'true' },
                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'Content',
                        field: 'contentName',
                      },
                      {
                        title: 'Period Day',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                        title: 'ind1PhonemicAwarenessStatus',
                        field: 'ind1PhonemicAwarenessStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind1PhonemicAwarenessNotes',
                        field: 'ind1PhonemicAwarenessNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind2LetterIdentificationStatus',
                        field: 'ind2LetterIdentificationStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind2LetterIdentificationNotes',
                        field: 'ind2LetterIdentificationNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind3VocabularyIdentificationStatus',
                        field: 'ind3VocabularyIdentificationStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind3VocabularyIdentificationNotes',
                        field: 'ind3VocabularyIdentificationNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind4FluencyIdentificationStatus',
                        field: 'ind4FluencyIdentificationStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind4FluencyIdentificationNotes',
                        field: 'ind4FluencyIdentificationNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind5ComprehensionStatus',
                        field: 'ind5ComprehensionStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind5ComprehensionNotes',
                        field: 'ind5ComprehensionNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind6WritingActivitiesStatus',
                        field: 'ind6WritingActivitiesStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind6WritingActivitiesNotes',
                        field: 'ind6WritingActivitiesNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind7IDoWeDoYouDoStatus',
                        field: 'ind7IDoWeDoYouDoStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind7IDoWeDoYouDoNotes',
                        field: 'ind7IDoWeDoYouDoNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind8GroupWorkStatus',
                        field: 'ind8GroupWorkStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind8GroupWorkNotes',
                        field: 'ind8GroupWorkNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind9TimeOnTaskStatus',
                        field: 'ind9TimeOnTaskStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind9TimeOnTaskNotes',
                        field: 'ind9TimeOnTaskNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind10UseTeachingAidStatus',
                        field: 'ind10UseTeachingAidStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind10UseTeachingAidNotes',
                        field: 'ind10UseTeachingAidNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind11ContinuityOfLessonsStatus',
                        field: 'ind11ContinuityOfLessonsStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind11ContinuityOfLessonsNotes',
                        field: 'ind11ContinuityOfLessonsNotes',
                        filtering: false,
                      },

                      {
                        title: 'ind12AssessmentStatus',
                        field: 'ind12AssessmentStatus',
                        filtering: false,
                      },
                      {
                        title: 'ind12AssessmentNotes',
                        field: 'ind12AssessmentNotes',
                        filtering: false,
                      },

                      { title: 'bestPracticeInd1', field: 'bestPracticeInd1', filtering: false },
                      { title: 'bestPracticeInd2', field: 'bestPracticeInd2', filtering: false },
                      { title: 'bestPracticeInd3', field: 'bestPracticeInd3', filtering: false },

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

                      {
                        title: 'coachingSupportDetailsInd1',
                        field: 'coachingSupportDetailsInd1',
                        filtering: false,
                      },
                      {
                        title: 'coachingSupportDetailsInd2',
                        field: 'coachingSupportDetailsInd2',
                        filtering: false,
                      },

                      { title: 'agreedStatement1', field: 'agreedStatement1', filtering: false },
                      { title: 'agreedStatement2', field: 'agreedStatement2', filtering: false },

                      { title: 'question1', field: 'question1', filtering: false },

                      { title: 'student1', field: 'student1', filtering: false },
                      { title: 'student2', field: 'student2', filtering: false },
                      { title: 'student3', field: 'student3', filtering: false },
                      { title: 'student4', field: 'student4', filtering: false },
                      { title: 'student5', field: 'student5', filtering: false },

                      { title: 'noRightFor1', field: 'noRightFor1', filtering: false },
                      { title: 'noWrongFor1', field: 'noWrongFor1', filtering: false },
                      { title: 'totalFor1', field: 'totalFor1', filtering: false },
                      { title: 'noRightFor2', field: 'noRightFor2', filtering: false },
                      { title: 'noWrongFor2', field: 'noWrongFor2', filtering: false },
                      { title: 'totalFor2', field: 'totalFor2', filtering: false },
                      { title: 'noRightFor3', field: 'noRightFor3', filtering: false },
                      { title: 'noWrongFor3', field: 'noWrongFor3', filtering: false },
                      { title: 'totalFor3', field: 'totalFor3', filtering: false },
                      { title: 'noRightFor4', field: 'noRightFor4', filtering: false },
                      { title: 'noWrongFor4', field: 'noWrongFor4', filtering: false },
                      { title: 'totalFor4', field: 'totalFor4', filtering: false },
                      { title: 'noRightFor5', field: 'noRightFor5', filtering: false },
                      { title: 'noWrongFor5', field: 'noWrongFor5', filtering: false },
                      { title: 'totalFor5', field: 'totalFor5', filtering: false },
                    ]}
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataNrFO}
                  />
                </CAccordionBody>
              </CAccordionItem>

              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>DI Bangla Observation G1</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'MFO G1 ' + AllDIBanglaDataMFOG1.length + ' Data'}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataMFOG1}
                  />
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={'NrFO G1 ' + AllDIBanglaDataNrFOG1.length + ' Data'}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataNrFOG1}
                  />
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={'Total ' + AllDIBanglaG1Data.length + ' Data'}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaG1Data}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>DI Bangla Observation G2</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={AllDIBanglaG2Data.length + ' Data'}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaG2Data}
                  />
                </CAccordionBody>
              </CAccordionItem>

              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>DI Bangla Observation MFO Monthly</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>G1 Teacher Priority</strong> <small>(2024)</small>
                    </CCardHeader>
                    <CCardBody>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
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
                            <CTableDataCell>{allG1TeacherP1PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP2PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP3PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>
                              {allG1TeacherP1PreviousMonth +
                                allG1TeacherP2PreviousMonth +
                                allG1TeacherP3PreviousMonth}
                            </CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CAccordionBody>
                <CAccordionBody>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>G2 Teacher Priority</strong> <small>(2024)</small>
                    </CCardHeader>
                    <CCardBody>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
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
                            <CTableDataCell>{allG1TeacherP1PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP2PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP3PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>
                              {allG1TeacherP1PreviousMonth +
                                allG1TeacherP2PreviousMonth +
                                allG1TeacherP3PreviousMonth}
                            </CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={AllDIBanglaDataCurrentMonthMFO.length + ' Data for ' + currentMonth}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataCurrentMonthMFO}
                  />
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={AllDIBanglaDataPreviousMonthMFO.length + ' Data for ' + previousMonth}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataPreviousMonthMFO}
                  />
                </CAccordionBody>
              </CAccordionItem>

              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>DI Bangla Observation NrFO Monthly</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>G1 Teacher Priority</strong> <small>(2024)</small>
                    </CCardHeader>
                    <CCardBody>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
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
                            <CTableDataCell>{allG1TeacherP1PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP2PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP3PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>
                              {allG1TeacherP1PreviousMonth +
                                allG1TeacherP2PreviousMonth +
                                allG1TeacherP3PreviousMonth}
                            </CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CAccordionBody>
                <CAccordionBody>
                  <CCard className="mb-4">
                    <CCardHeader>
                      <strong>G2 Teacher Priority</strong> <small>(2024)</small>
                    </CCardHeader>
                    <CCardBody>
                      <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
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
                            <CTableDataCell>{allG1TeacherP1PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="primary">
                            <CTableHeaderCell scope="row">Priority 2</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP2PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="secondary">
                            <CTableHeaderCell scope="row">Priority 3</CTableHeaderCell>
                            <CTableDataCell>{allG1TeacherP3PreviousMonth}</CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                          <CTableRow color="success">
                            <CTableHeaderCell scope="row">Total</CTableHeaderCell>
                            <CTableDataCell>
                              {allG1TeacherP1PreviousMonth +
                                allG1TeacherP2PreviousMonth +
                                allG1TeacherP3PreviousMonth}
                            </CTableDataCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            <CTableHeaderCell scope="col">0</CTableHeaderCell>
                          </CTableRow>
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={AllDIBanglaDataCurrentMonthNrFO.length + ' Data for ' + currentMonth}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataCurrentMonthNrFO}
                  />
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={AllDIBanglaDataPreviousMonthNrFO.length + ' Data for ' + previousMonth}
                    columns={[
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'school', field: 'school' },
                      {
                        title: 'classTeacher',
                        field: 'classTeacher',
                      },
                      {
                        title: 'teacherGender',
                        field: 'teacherGender',
                      },
                      {
                        title: 'isTrained',
                        field: 'isTrained',
                      },
                      { title: 'teacherStatus', field: 'teacherStatus', sorting: 'true' },
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
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'fieldOffice', field: 'fieldOffice', sorting: 'true' },
                      { title: 'project', field: 'project', sorting: 'true' },

                      { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },

                      {
                        title: 'grade',
                        field: 'grade',
                      },
                      {
                        title: 'section',
                        field: 'section',
                      },
                      {
                        title: 'classStartTime',
                        field: 'classStartTime',
                      },
                      {
                        title: 'classEndTime',
                        field: 'classEndTime',
                      },

                      {
                        title: 'contentName',
                        field: 'contentName',
                      },
                      {
                        title: 'periodDay',
                        field: 'periodDay',
                      },
                      {
                        title: 'totalAdmittedStudent',
                        field: 'totalAdmittedStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalAdmittedGirl',
                        field: 'totalAdmittedGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalAdmittedBoy',
                        field: 'totalAdmittedBoy',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentStudent',
                        field: 'totalPresentStudent',
                        filtering: false,
                      },
                      {
                        title: 'totalPresentGirl',
                        field: 'totalPresentGirl',
                        filtering: false,
                      },

                      {
                        title: 'totalPresentBoy',
                        field: 'totalPresentBoy',
                        filtering: false,
                      },
                      {
                        title: 'note',
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
                    editable={{}}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      search: true,
                      filtering: true,
                      grouping: true,
                      sorting: true,
                      pageSize: 5,
                      pageSizeOptions: [5, 10, 20],
                      maxBodyHeight: '250px',
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
                    data={AllDIBanglaDataPreviousMonthNrFO}
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

export default DIBanglaClassDataDetail
