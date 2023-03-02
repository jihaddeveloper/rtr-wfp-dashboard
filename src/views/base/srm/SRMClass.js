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

  const [allBCOData, setAllBCOData] = useState([])

  const [allSRMClass, setAllSRMClass] = useState([])

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

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
            <strong>Report SRM Class</strong>
          </CCardHeader>
          <CCardBody>
            <strong>Under Construction</strong>
            {/* <CButton color="primary" href="/base/construction">
              Summarize Report
            </CButton>
            <CButton color="secondary" href="/base/construction">
              CFO Analysis Report
            </CButton>
            <CButton color="success" href="/base/construction">
              Ukhiya Report
            </CButton>
            <CButton color="warning" href="/base/construction">
              Kutubdia Report
            </CButton> */}
          </CCardBody>
        </CCard>
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
                  title: 'totalAdmittedStudent',
                  field: 'totalAdmittedStudent',
                },
                {
                  title: 'totalAdmittedGirl',
                  field: 'totalAdmittedGirl',
                },

                {
                  title: 'totalAdmittedBoy',
                  field: 'totalAdmittedBoy',
                },

                {
                  title: 'totalPresentStudent',
                  field: 'totalPresentStudent',
                },
                {
                  title: 'totalPresentGirl',
                  field: 'totalPresentGirl',
                },

                {
                  title: 'totalPresentBoy',
                  field: 'totalPresentBoy',
                },
                {
                  title: 'note',
                  field: 'note',
                },

                { title: 'lastFollowupTopic1', field: 'lastFollowupTopic1' },
                { title: 'lastFollowupTopic2', field: 'lastFollowupTopic2' },
                { title: 'lastFollowupTopic3', field: 'lastFollowupTopic3' },

                { title: 'typeOfReading', field: 'typeOfReading' },
                {
                  title: 'ind1FriendlyCommunicationStatus',
                  field: 'ind1FriendlyCommunicationStatus',
                },
                {
                  title: 'ind1FriendlyCommunicationNotes',
                  field: 'ind1FriendlyCommunicationNotes',
                },

                {
                  title: 'ind2SRMInspiringStatus',
                  field: 'ind2SRMInspiringStatus',
                },
                {
                  title: 'ind2SRMInspiringNotes',
                  field: 'ind2SRMInspiringNotes',
                },

                {
                  title: 'ind3SRMInstructionStatus',
                  field: 'ind3SRMInstructionStatus',
                },
                {
                  title: 'ind3SRMInstructionNotes',
                  field: 'ind3SRMInstructionNotes',
                },

                {
                  title: 'ind4BookShowingStatus',
                  field: 'ind4BookShowingStatus',
                },
                {
                  title: 'ind4BookShowingNotes',
                  field: 'ind4BookShowingNotes',
                },

                { title: 'ind5WordTeachingStatus', field: 'ind5WordTeachingStatus' },
                { title: 'ind5WordTeachingNotes', field: 'ind5WordTeachingNotes' },

                { title: 'ind6StoryReadingStatus', field: 'ind6StoryReadingStatus' },
                { title: 'ind6StoryReadingNotes', field: 'ind6StoryReadingNotes' },

                { title: 'ind7IDoWeDoYouDoStatus', field: 'ind7IDoWeDoYouDoStatus' },
                { title: 'ind7StorySuitableNotes', field: 'ind7StorySuitableNotes' },

                { title: 'ind7StorySuitableStatus', field: 'ind7StorySuitableStatus' },
                {
                  title: 'ind8StoryReadingCombinationNotes',
                  field: 'ind8StoryReadingCombinationNotes',
                },

                {
                  title: 'ind9AllStudentEngagementStatus',
                  field: 'ind9AllStudentEngagementStatus',
                },
                { title: 'ind9AllStudentEngagementNotes', field: 'ind9AllStudentEngagementNotes' },

                {
                  title: 'ind10InclusiveAssessmentStatus',
                  field: 'ind10InclusiveAssessmentStatus',
                },
                { title: 'ind10InclusiveAssessmentNotes', field: 'ind10InclusiveAssessmentNotes' },

                {
                  title: 'ind11AskingForBCOStatus',
                  field: 'ind11AskingForBCOStatus',
                },
                {
                  title: 'ind11AskingForBCONotes',
                  field: 'ind11AskingForBCONotes',
                },

                { title: 'bestPracticeInd1', field: 'bestPracticeInd1' },
                { title: 'bestPracticeInd2', field: 'bestPracticeInd2' },
                { title: 'bestPracticeInd3', field: 'bestPracticeInd3' },

                { title: 'coachingSupportInd1', field: 'coachingSupportInd1' },
                { title: 'coachingSupportInd2', field: 'coachingSupportInd2' },

                { title: 'coachingSupportDetailsInd1', field: 'coachingSupportDetailsInd1' },
                { title: 'coachingSupportDetailsInd2', field: 'coachingSupportDetailsInd2' },

                { title: 'agreedStatement1', field: 'agreedStatement1' },
                { title: 'agreedStatement2', field: 'agreedStatement2' },
              ]}
              // actions={[
              //   {
              //     icon: DeleteOutline,
              //     tooltip: 'Delete BCO',
              //     onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
              //   },
              //   {
              //     icon: ViewColumn,
              //     tooltip: 'View BCO',
              //     onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
              //   },
              //   {
              //     icon: AddBox,
              //     tooltip: 'Add BCO',
              //     isFreeAction: true,
              //     onClick: (event) => alert('You want to add a new row'),
              //   },
              // ]}
              options={{
                exportButton: true,
                exportAllData: true,
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
