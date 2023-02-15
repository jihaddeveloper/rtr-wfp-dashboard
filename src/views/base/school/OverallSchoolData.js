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

const OverallSchoolData = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

  const [allOverallSchool, setAllOverallSchool] = useState([])

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

      await getAllOverallSchool(console.log('get overall school called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Book-checkout Data for school
  const getAllOverallSchool = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/overall-school', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllOverallSchool(response.data)
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
            <strong>Report Overall School</strong>
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
            <strong>ALL Overall School </strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allOverallSchool.length + ' Overall School'}
              columns={[
                {
                  title: 'date',
                  field: 'date',
                  type: 'date',
                  sorting: 'true',
                },
                { title: 'school', field: 'school' },
                { title: 'schoolStatus', field: 'schoolStatus', sorting: 'true' },
                {
                  title: 'headTeacher',
                  field: 'headTeacher',
                },
                {
                  title: 'teacherGender',
                  field: 'teacherGender',
                },
                { title: 'schoolStatus', field: 'schoolStatus', sorting: 'true' },
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
                {
                  title: 'visitorDesignation',
                  field: 'visitorDesignation',
                  sorting: 'true',
                },

                {
                  title: 'note',
                  field: 'note',
                },

                { title: 'lastFollowupTopic1', field: 'lastFollowupTopic1' },
                { title: 'lastFollowupTopic2', field: 'lastFollowupTopic2' },
                { title: 'lastFollowupTopic3', field: 'lastFollowupTopic3' },

                { title: 'prePrimaryClassObservation', field: 'prePrimaryClassObservation' },
                {
                  title: 'prePrimaryClassTeacherPriority',
                  field: 'prePrimaryClassTeacherPriority',
                },
                {
                  title: 'oneBanglaClassObservation',
                  field: 'oneBanglaClassObservation',
                },
                {
                  title: 'oneBanglaClassTeacherPriority',
                  field: 'oneBanglaClassTeacherPriority',
                },
                {
                  title: 'twoBanglaClassObservation',
                  field: 'twoBanglaClassObservation',
                },
                { title: 'twoBanglaClassTeacherPriority', field: 'twoBanglaClassTeacherPriority' },
                { title: 'classObservationComment', field: 'classObservationComment' },

                { title: 'prePrimarySRMObservation', field: 'prePrimarySRMObservation' },
                { title: 'prePrimarySRMTeacherPriority', field: 'prePrimarySRMTeacherPriority' },
                { title: 'oneSRMObservation', field: 'oneSRMObservation' },
                { title: 'oneSRMTeacherPriority', field: 'oneSRMTeacherPriority' },
                { title: 'twoSRMObservation', field: 'twoSRMObservation' },
                { title: 'twoSRMTeacherPriority', field: 'twoSRMTeacherPriority' },
                { title: 'srmCommentPPOneTwo', field: 'srmCommentPPOneTwo' },

                { title: 'threeSRMObservation', field: 'threeSRMObservation' },
                { title: 'threeSRMTeacherPriority', field: 'threeSRMTeacherPriority' },
                { title: 'fourSRMObservation', field: 'fourSRMObservation' },
                { title: 'fourSRMTeacherPriority', field: 'fourSRMTeacherPriority' },
                { title: 'fiveSRMObservation', field: 'fiveSRMObservation' },
                { title: 'fiveSRMTeacherPriority', field: 'fiveSRMTeacherPriority' },
                { title: 'srmCommentThreeFourFive', field: 'srmCommentThreeFourFive' },

                { title: 'other', field: 'other' },

                { title: 'ind1AllTeacherTrainedStatus', field: 'ind1AllTeacherTrainedStatus' },
                { title: 'ind1AllTeacherTrainedNotes', field: 'ind1AllTeacherTrainedNotes' },

                {
                  title: 'ind2FollowedRTRTrainingSixtyStatus',
                  field: 'ind2FollowedRTRTrainingSixtyStatus',
                },
                {
                  title: 'ind2FollowedRTRTrainingSixtyNotes',
                  field: 'ind2FollowedRTRTrainingSixtyNotes',
                },

                {
                  title: 'ind3RTRMaterialStatus',
                  field: 'ind3RTRMaterialStatus',
                },
                {
                  title: 'ind3RTRMaterialNotes',
                  field: 'ind3RTRMaterialNotes',
                },

                {
                  title: 'ind4InfluenceToBCOFiftyStatus',
                  field: 'ind4InfluenceToBCOFiftyStatus',
                },
                {
                  title: 'ind4InfluenceToBCOFiftyNotes',
                  field: 'ind4InfluenceToBCOFiftyNotes',
                },
                {
                  title: 'ind5PrePrimaryBanglaSRMSeventyStatus',
                  field: 'ind5PrePrimaryBanglaSRMSeventyStatus',
                },
                {
                  title: 'ind5PrePrimaryBanglaSRMSeventyNotes',
                  field: 'ind5PrePrimaryBanglaSRMSeventyNotes',
                },
                {
                  title: 'ind6BanglaClassResultFortyStatus',
                  field: 'ind6BanglaClassResultFortyStatus',
                },
                {
                  title: 'ind6BanglaClassResultFortyNotes',
                  field: 'ind6BanglaClassResultFortyNotes',
                },
                { title: 'ind7BanglaSRMStatus', field: 'ind7BanglaSRMStatus' },
                { title: 'ind7BanglaSRMNotes', field: 'ind7BanglaSRMNotes' },
                { title: 'ind8SMCMeetingStatus', field: 'ind8SMCMeetingStatus' },
                { title: 'ind8SMCMeetingNotes', field: 'ind8SMCMeetingNotes' },
                { title: 'ind9ReadingMaterialStatus', field: 'ind9ReadingMaterialStatus' },
                { title: 'ind9ReadingMaterialNotes', field: 'ind9ReadingMaterialNotes' },
                {
                  title: 'ind10FollowedRtRTrainingEightyStatus',
                  field: 'ind10FollowedRtRTrainingEightyStatus',
                },
                {
                  title: 'ind10FollowedRtRTrainingEightyNotes',
                  field: 'ind10FollowedRtRTrainingEightyNotes',
                },
                {
                  title: 'ind11InfluenceToBCOSeventyStatus',
                  field: 'ind11InfluenceToBCOSeventyStatus',
                },
                {
                  title: 'ind11InfluenceToBCOSeventyNotes',
                  field: 'ind11InfluenceToBCOSeventyNotes',
                },
                {
                  title: 'ind12PrePrimaryBanglaSRMEightyStatus',
                  field: 'ind12PrePrimaryBanglaSRMEightyStatus',
                },
                {
                  title: 'ind12PrePrimaryBanglaSRMEightyNotes',
                  field: 'ind12PrePrimaryBanglaSRMEightyNotes',
                },

                {
                  title: 'ind13BanglaClassResultSixtyStatus',
                  field: 'ind13BanglaClassResultSixtyStatus',
                },
                {
                  title: 'ind13BanglaClassResultSixtyNotes',
                  field: 'ind13BanglaClassResultSixtyNotes',
                },
                {
                  title: 'ind14MeetingDiscussionStatus',
                  field: 'ind14MeetingDiscussionStatus',
                },
                {
                  title: 'ind14MeetingDiscussionNotes',
                  field: 'ind14MeetingDiscussionNotes',
                },
                {
                  title: 'ind15LastMonthObservationStatus',
                  field: 'ind15LastMonthObservationStatus',
                },
                {
                  title: 'ind15LastMonthObservationNotes',
                  field: 'ind15LastMonthObservationNotes',
                },
                {
                  title: 'ind16StudentTrackingStatus',
                  field: 'ind16StudentTrackingStatus',
                },
                {
                  title: 'ind16StudentTrackingNotes',
                  field: 'ind16StudentTrackingNotes',
                },
                {
                  title: 'ind17GovtOfficialVisitStatus',
                  field: 'ind17GovtOfficialVisitStatus',
                },
                {
                  title: 'ind17GovtOfficialVisitNotes',
                  field: 'ind17GovtOfficialVisitNotes',
                },
                {
                  title: 'ind18ParentsSMCParticipationStatus',
                  field: 'ind18ParentsSMCParticipationStatus',
                },
                {
                  title: 'ind18ParentsSMCParticipationNotes',
                  field: 'ind18ParentsSMCParticipationNotes',
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
              data={allOverallSchool}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OverallSchoolData
