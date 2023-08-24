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

const SRMClass = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allSRMClass, setAllSRMClass] = useState([])

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
      await getAllSRMClass(console.log('get SRM class called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All SRM Data for school
  const getAllSRMClass = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/srm-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllSRMClass(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Row update function
  const handleRowUpdateAllSRMClass = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/srm-class/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allSRMClass]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllSRMClass([...dataUpdate])
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
            <strong>ALL SRM Class Observation</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allSRMClass.length + ' SRM Class Observation'}
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
                  filtering: false,
                },
                {
                  title: 'section',
                  field: 'section',
                  filtering: false,
                },
                {
                  title: 'classStartTime',
                  field: 'classStartTime',
                  filtering: false,
                },
                {
                  title: 'classEndTime',
                  field: 'classEndTime',
                  filtering: false,
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

                { title: 'lastFollowupTopic1', field: 'lastFollowupTopic1', filtering: false },
                { title: 'lastFollowupTopic2', field: 'lastFollowupTopic2', filtering: false },
                { title: 'lastFollowupTopic3', field: 'lastFollowupTopic3', filtering: false },

                { title: 'typeOfReading', field: 'typeOfReading', filtering: false },
                {
                  title: 'ind1FriendlyCommunicationStatus',
                  field: 'ind1FriendlyCommunicationStatus',
                  filtering: false,
                },
                {
                  title: 'ind1FriendlyCommunicationNotes',
                  field: 'ind1FriendlyCommunicationNotes',
                  filtering: false,
                },

                {
                  title: 'ind2SRMInspiringStatus',
                  field: 'ind2SRMInspiringStatus',
                  filtering: false,
                },
                {
                  title: 'ind2SRMInspiringNotes',
                  field: 'ind2SRMInspiringNotes',
                  filtering: false,
                },

                {
                  title: 'ind3SRMInstructionStatus',
                  field: 'ind3SRMInstructionStatus',
                  filtering: false,
                },
                {
                  title: 'ind3SRMInstructionNotes',
                  field: 'ind3SRMInstructionNotes',
                  filtering: false,
                },

                {
                  title: 'ind4BookShowingStatus',
                  field: 'ind4BookShowingStatus',
                  filtering: false,
                },
                {
                  title: 'ind4BookShowingNotes',
                  field: 'ind4BookShowingNotes',
                  filtering: false,
                },

                {
                  title: 'ind5WordTeachingStatus',
                  field: 'ind5WordTeachingStatus',
                  filtering: false,
                },
                {
                  title: 'ind5WordTeachingNotes',
                  field: 'ind5WordTeachingNotes',
                  filtering: false,
                },

                {
                  title: 'ind6StoryReadingStatus',
                  field: 'ind6StoryReadingStatus',
                  filtering: false,
                },
                {
                  title: 'ind6StoryReadingNotes',
                  field: 'ind6StoryReadingNotes',
                  filtering: false,
                },

                {
                  title: 'ind7StorySuitableStatus',
                  field: 'ind7StorySuitableStatus',
                  filtering: false,
                },
                {
                  title: 'ind7StorySuitableNotes',
                  field: 'ind7StorySuitableNotes',
                  filtering: false,
                },

                {
                  title: 'ind8StoryReadingCombinationStatus',
                  field: 'ind8StoryReadingCombinationStatus',
                  filtering: false,
                },

                {
                  title: 'ind8StoryReadingCombinationNotes',
                  field: 'ind8StoryReadingCombinationNotes',
                  filtering: false,
                },

                {
                  title: 'ind9AllStudentEngagementStatus',
                  field: 'ind9AllStudentEngagementStatus',
                  filtering: false,
                },
                {
                  title: 'ind9AllStudentEngagementNotes',
                  field: 'ind9AllStudentEngagementNotes',
                  filtering: false,
                },

                {
                  title: 'ind10InclusiveAssessmentStatus',
                  field: 'ind10InclusiveAssessmentStatus',
                  filtering: false,
                },
                {
                  title: 'ind10InclusiveAssessmentNotes',
                  field: 'ind10InclusiveAssessmentNotes',
                  filtering: false,
                },

                {
                  title: 'ind11AskingForBCOStatus',
                  field: 'ind11AskingForBCOStatus',
                  filtering: false,
                },
                {
                  title: 'ind11AskingForBCONotes',
                  field: 'ind11AskingForBCONotes',
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
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdateAllSRMClass(newData, oldData, resolve)
                  }),
              }}
              options={{
                exportButton: true,
                exportAllData: true,
                filtering: true,
                search: true,
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
              data={allSRMClass}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default SRMClass
