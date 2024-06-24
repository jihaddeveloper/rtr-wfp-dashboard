import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
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

const PreprimaryClassData = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

  const [allPreprimaryClass, setAllPreprimaryClass] = useState([])

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
      await getAllPreprimaryClass(console.log('get PreprimaryClass called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Preprimary Class Data for school
  const getAllPreprimaryClass = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/preprimary', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllPreprimaryClass(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Preprimary Class Data for school

  // Row update function
  const handleRowUpdateAllPPClass = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/preprimary/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allPreprimaryClass]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllPreprimaryClass([...dataUpdate])
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
  const handleRowAddPPClass = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/preprimary/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allPreprimaryClass]
          dataToAdd.push(newData)
          setAllPreprimaryClass([...dataToAdd])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Add PreprimaryClass failed! Server error'])
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
  const handleRowDeletePPClass = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/preprimary/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allPreprimaryClass]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllPreprimaryClass([...dataDelete])
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
            <strong>ALL Preprimary Class Observation</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allPreprimaryClass.length + ' Preprimary Class Observation'}
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
                  title: 'Content 1',
                  field: 'contentName1',
                },
                {
                  title: 'Content 2',
                  field: 'contentName2',
                },
                {
                  title: 'Content 3',
                  field: 'contentName3',
                },
                {
                  title: 'Period Month',
                  field: 'periodMonth',
                },
                {
                  title: 'Period Week',
                  field: 'periodWeek',
                },
                {
                  title: 'Period Day',
                  field: 'periodDay',
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
                  title: 'totalPresentSpecial',
                  field: 'totalPresentSpecial',
                  filtering: false,
                },
                {
                  title: 'note',
                  field: 'note',
                },

                { title: 'lastFollowupTopic1', field: 'lastFollowupTopic1', filtering: false },
                { title: 'lastFollowupTopic2', field: 'lastFollowupTopic2', filtering: false },
                { title: 'lastFollowupTopic3', field: 'lastFollowupTopic3', filtering: false },

                {
                  title: 'ind11UsingBigbookStatus',
                  field: 'ind11UsingBigbookStatus',
                  filtering: false,
                },
                {
                  title: 'ind11UsingBigbookNotes',
                  field: 'ind11UsingBigbookNotes',
                  filtering: false,
                },

                {
                  title: 'ind12PictureDiscussionStatus',
                  field: 'ind12PictureDiscussionStatus',
                  filtering: false,
                },
                {
                  title: 'ind12PictureDiscussionNotes',
                  field: 'ind12PictureDiscussionNotes',
                  filtering: false,
                },

                {
                  title: 'ind13FollowedInstructionStatus',
                  field: 'ind13FollowedInstructionStatus',
                  filtering: false,
                },
                {
                  title: 'ind13FollowedInstructionNotes',
                  field: 'ind13FollowedInstructionNotes',
                  filtering: false,
                },

                {
                  title: 'ind21UsingTalkingChartStatus',
                  field: 'ind21UsingTalkingChartStatus',
                  filtering: false,
                },
                {
                  title: 'ind21UsingTalkingChartNotes',
                  field: 'ind21UsingTalkingChartNotes',
                  filtering: false,
                },

                {
                  title: 'ind22UsingPictureElementStatus',
                  field: 'ind22UsingPictureElementStatus',
                  filtering: false,
                },
                {
                  title: 'ind22UsingPictureElementNotes',
                  field: 'ind22UsingPictureElementNotes',
                  filtering: false,
                },

                {
                  title: 'ind23FollowedInstructionStepStatus',
                  field: 'ind23FollowedInstructionStepStatus',
                  filtering: false,
                },
                {
                  title: 'ind23FollowedInstructionStepNotes',
                  field: 'ind23FollowedInstructionStepNotes',
                  filtering: false,
                },

                {
                  title: 'ind31LanguageGameStatus',
                  field: 'ind31LanguageGameStatus',
                  filtering: false,
                },
                {
                  title: 'ind31LanguageGameNotes',
                  field: 'ind31LanguageGameNotes',
                  filtering: false,
                },

                {
                  title: 'ind32LanguageGameIWeYouStatus',
                  field: 'ind32LanguageGameIWeYouStatus',
                  filtering: false,
                },
                {
                  title: 'ind32LanguageGameIWeYouNotes',
                  field: 'ind32LanguageGameIWeYouNotes',
                  filtering: false,
                },

                {
                  title: 'ind33LanguageGameExtraStatus',
                  field: 'ind33LanguageGameExtraStatus',
                  filtering: false,
                },
                {
                  title: 'ind33LanguageGameExtraNotes',
                  field: 'ind33LanguageGameExtraNotes',
                  filtering: false,
                },

                { title: 'bestPracticeInd1', field: 'bestPracticeInd1', filtering: false },
                { title: 'bestPracticeInd2', field: 'bestPracticeInd2', filtering: false },
                { title: 'bestPracticeInd3', field: 'bestPracticeInd3', filtering: false },

                { title: 'coachingSupportInd1', field: 'coachingSupportInd1', filtering: false },
                { title: 'coachingSupportInd2', field: 'coachingSupportInd2', filtering: false },

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
              ]}
              editable={{
                // onRowUpdate: (newData, oldData) =>
                //   new Promise((resolve) => {
                //     handleRowUpdateAllPPClass(newData, oldData, resolve)
                //   }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAddPPClass(newData, resolve)
                  }),
                // onRowDelete: (oldData) =>
                //   new Promise((resolve) => {
                //     handleRowDeletePPClass(oldData, resolve)
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
                pageSizeOptions: [5, 10, 20],
                maxBodyHeight: '600px',
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
              data={allPreprimaryClass}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PreprimaryClassData
