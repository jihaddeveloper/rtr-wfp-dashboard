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
                  title: 'Date',
                  field: 'date',
                  type: 'date',
                  sorting: 'true',
                },
                { title: 'School', field: 'school' },
                {
                  title: 'Class Teacher',
                  field: 'classTeacher',
                },
                {
                  title: 'Gender',
                  field: 'teacherGender',
                },
                {
                  title: 'Trainined',
                  field: 'isTrained',
                },
                { title: 'Teacher Rating', field: 'teacherStatus', sorting: 'true' },
                { title: 'Month', field: 'month', sorting: 'true' },
                { title: 'Year', field: 'year', sorting: 'true' },

                { title: 'District', field: 'district' },
                { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                { title: 'Field Office', field: 'fieldOffice', sorting: 'true' },
                { title: 'Project', field: 'project', sorting: 'true' },
                { title: '#Visit', field: 'visitNo', sorting: 'true' },
                { title: 'LPO', field: 'lpoName', type: 'string' },
                {
                  title: 'LF',
                  field: 'lfName',
                  type: 'string',
                },
                { title: 'Visitor', field: 'visitor' },
                { title: 'Visitor Designation', field: 'visitorDesignation', sorting: 'true' },

                {
                  title: 'Grade',
                  field: 'grade',
                },
                {
                  title: 'Section',
                  field: 'section',
                },
                {
                  title: 'Class Start Time',
                  field: 'classStartTime',
                },
                {
                  title: 'Class End Time',
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

                { title: 'Last Followup Topic 1', field: 'lastFollowupTopic1' },
                { title: 'Last Followup Topic 2', field: 'lastFollowupTopic2' },
                { title: 'Last Followup Topic 3', field: 'lastFollowupTopic3' },

                {
                  title: 'Ind1 Status',
                  field: 'ind1FriendlyCommunicationStatus',
                },
                { title: 'Ind1 Notes', field: 'ind1FriendlyCommunicationNotes' },

                {
                  title: 'Ind2 Status',
                  field: 'ind2SRMInspiringStatus',
                },
                {
                  title: 'Ind2 Notes',
                  field: 'ind2SRMInspiringNotes',
                },

                {
                  title: 'Ind3 Status',
                  field: 'ind3SRMInstructionStatus',
                },
                {
                  title: 'Ind3 Notes',
                  field: 'ind3SRMInstructionNotes',
                },

                {
                  title: 'Ind4 Status',
                  field: 'ind4BookShowingStatus',
                },
                {
                  title: 'Ind4 Notes',
                  field: 'ind4BookShowingNotes',
                },

                { title: 'Ind5 Status', field: 'ind5WordTeachingStatus' },
                { title: 'Ind5 Notes', field: 'ind5WordTeachingNotes' },

                { title: 'Ind6 Status', field: 'ind6StoryReadingStatus' },
                { title: 'Ind6 Notes', field: 'ind6StoryReadingNotes' },

                { title: 'Ind7 Status', field: 'ind7IDoWeDoYouDoStatus' },
                { title: 'Ind7 Notes', field: 'ind7StorySuitableNotes' },

                { title: 'Ind8 Status', field: 'ind7StorySuitableStatus' },
                { title: 'Ind8 Notes', field: 'ind8StoryReadingCombinationNotes' },

                { title: 'Ind9 Status', field: 'ind9AllStudentEngagementStatus' },
                { title: 'Ind9 Notes', field: 'ind9AllStudentEngagementNotes' },

                { title: 'Ind10 Status', field: 'ind10InclusiveAssessmentStatus' },
                { title: 'Ind10 Notes', field: 'ind10InclusiveAssessmentNotes' },

                {
                  title: 'Ind11 Status',
                  field: 'ind11AskingForBCOStatus',
                },
                {
                  title: 'Ind11 Notes',
                  field: 'ind11AskingForBCONotes',
                },

                { title: 'Best Practice Ind1', field: 'bestPracticeInd1' },
                { title: 'Best Practice Ind2', field: 'bestPracticeInd2' },
                { title: 'Best Practice Ind3', field: 'bestPracticeInd3' },

                { title: 'Coaching Support Ind1', field: 'coachingSupportInd1' },
                { title: 'Coaching Support Ind2', field: 'coachingSupportInd2' },

                { title: 'Coaching Support Details Ind1', field: 'coachingSupportDetailsInd1' },
                { title: 'Coaching Support Details Ind2', field: 'coachingSupportDetailsInd2' },

                { title: 'Agreed Statement1', field: 'agreedStatement1' },
                { title: 'Agreed Statement2', field: 'agreedStatement2' },
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
