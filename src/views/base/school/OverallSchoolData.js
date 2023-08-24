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

  const [allOverallSchool, setAllOverallSchool] = useState([])

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

  // Row update function
  const handleRowUpdateAllOverallSchool = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/overall-school/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allOverallSchool]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllOverallSchool([...dataUpdate])
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
                { title: 'visitorOffice', field: 'visitorOffice', sorting: 'true' },
                {
                  title: 'note',
                  field: 'note',
                },

                { title: 'lastFollowupTopic1', field: 'lastFollowupTopic1', filtering: false },
                { title: 'lastFollowupTopic2', field: 'lastFollowupTopic2', filtering: false },
                { title: 'lastFollowupTopic3', field: 'lastFollowupTopic3', filtering: false },

                {
                  title: 'prePrimaryClassObservation',
                  field: 'prePrimaryClassObservation',
                  filtering: false,
                },
                {
                  title: 'prePrimaryClassTeacherPriority',
                  field: 'prePrimaryClassTeacherPriority',
                  filtering: false,
                },
                {
                  title: 'oneBanglaClassObservation',
                  field: 'oneBanglaClassObservation',
                  filtering: false,
                },
                {
                  title: 'oneBanglaClassTeacherPriority',
                  field: 'oneBanglaClassTeacherPriority',
                  filtering: false,
                },
                {
                  title: 'twoBanglaClassObservation',
                  field: 'twoBanglaClassObservation',
                  filtering: false,
                },
                {
                  title: 'twoBanglaClassTeacherPriority',
                  field: 'twoBanglaClassTeacherPriority',
                  filtering: false,
                },
                {
                  title: 'classObservationComment',
                  field: 'classObservationComment',
                  filtering: false,
                },

                {
                  title: 'prePrimarySRMObservation',
                  field: 'prePrimarySRMObservation',
                  filtering: false,
                },
                {
                  title: 'prePrimarySRMTeacherPriority',
                  field: 'prePrimarySRMTeacherPriority',
                  filtering: false,
                },
                { title: 'oneSRMObservation', field: 'oneSRMObservation', filtering: false },
                {
                  title: 'oneSRMTeacherPriority',
                  field: 'oneSRMTeacherPriority',
                  filtering: false,
                },
                { title: 'twoSRMObservation', field: 'twoSRMObservation', filtering: false },
                {
                  title: 'twoSRMTeacherPriority',
                  field: 'twoSRMTeacherPriority',
                  filtering: false,
                },
                { title: 'srmCommentPPOneTwo', field: 'srmCommentPPOneTwo', filtering: false },

                { title: 'threeSRMObservation', field: 'threeSRMObservation', filtering: false },
                {
                  title: 'threeSRMTeacherPriority',
                  field: 'threeSRMTeacherPriority',
                  filtering: false,
                },
                { title: 'fourSRMObservation', field: 'fourSRMObservation', filtering: false },
                {
                  title: 'fourSRMTeacherPriority',
                  field: 'fourSRMTeacherPriority',
                  filtering: false,
                },
                { title: 'fiveSRMObservation', field: 'fiveSRMObservation', filtering: false },
                {
                  title: 'fiveSRMTeacherPriority',
                  field: 'fiveSRMTeacherPriority',
                  filtering: false,
                },
                {
                  title: 'srmCommentThreeFourFive',
                  field: 'srmCommentThreeFourFive',
                  filtering: false,
                },

                { title: 'other', field: 'other', filtering: false },

                {
                  title: 'ind1AllTeacherTrainedStatus',
                  field: 'ind1AllTeacherTrainedStatus',
                  filtering: false,
                },
                {
                  title: 'ind1AllTeacherTrainedNotes',
                  field: 'ind1AllTeacherTrainedNotes',
                  filtering: false,
                },

                {
                  title: 'ind2FollowedRTRTrainingSixtyStatus',
                  field: 'ind2FollowedRTRTrainingSixtyStatus',
                  filtering: false,
                },
                {
                  title: 'ind2FollowedRTRTrainingSixtyNotes',
                  field: 'ind2FollowedRTRTrainingSixtyNotes',
                  filtering: false,
                },

                {
                  title: 'ind3RTRMaterialStatus',
                  field: 'ind3RTRMaterialStatus',
                  filtering: false,
                },
                {
                  title: 'ind3RTRMaterialNotes',
                  field: 'ind3RTRMaterialNotes',
                  filtering: false,
                },

                {
                  title: 'ind4InfluenceToBCOFiftyStatus',
                  field: 'ind4InfluenceToBCOFiftyStatus',
                  filtering: false,
                },
                {
                  title: 'ind4InfluenceToBCOFiftyNotes',
                  field: 'ind4InfluenceToBCOFiftyNotes',
                  filtering: false,
                },
                {
                  title: 'ind5PrePrimaryBanglaSRMSeventyStatus',
                  field: 'ind5PrePrimaryBanglaSRMSeventyStatus',
                  filtering: false,
                },
                {
                  title: 'ind5PrePrimaryBanglaSRMSeventyNotes',
                  field: 'ind5PrePrimaryBanglaSRMSeventyNotes',
                  filtering: false,
                },
                {
                  title: 'ind6BanglaClassResultFortyStatus',
                  field: 'ind6BanglaClassResultFortyStatus',
                  filtering: false,
                },
                {
                  title: 'ind6BanglaClassResultFortyNotes',
                  field: 'ind6BanglaClassResultFortyNotes',
                  filtering: false,
                },
                { title: 'ind7BanglaSRMStatus', field: 'ind7BanglaSRMStatus', filtering: false },
                { title: 'ind7BanglaSRMNotes', field: 'ind7BanglaSRMNotes', filtering: false },
                { title: 'ind8SMCMeetingStatus', field: 'ind8SMCMeetingStatus', filtering: false },
                { title: 'ind8SMCMeetingNotes', field: 'ind8SMCMeetingNotes', filtering: false },
                {
                  title: 'ind9ReadingMaterialStatus',
                  field: 'ind9ReadingMaterialStatus',
                  filtering: false,
                },
                {
                  title: 'ind9ReadingMaterialNotes',
                  field: 'ind9ReadingMaterialNotes',
                  filtering: false,
                },
                {
                  title: 'ind10FollowedRtRTrainingEightyStatus',
                  field: 'ind10FollowedRtRTrainingEightyStatus',
                  filtering: false,
                },
                {
                  title: 'ind10FollowedRtRTrainingEightyNotes',
                  field: 'ind10FollowedRtRTrainingEightyNotes',
                  filtering: false,
                },
                {
                  title: 'ind11InfluenceToBCOSeventyStatus',
                  field: 'ind11InfluenceToBCOSeventyStatus',
                  filtering: false,
                },
                {
                  title: 'ind11InfluenceToBCOSeventyNotes',
                  field: 'ind11InfluenceToBCOSeventyNotes',
                  filtering: false,
                },
                {
                  title: 'ind12PrePrimaryBanglaSRMEightyStatus',
                  field: 'ind12PrePrimaryBanglaSRMEightyStatus',
                  filtering: false,
                },
                {
                  title: 'ind12PrePrimaryBanglaSRMEightyNotes',
                  field: 'ind12PrePrimaryBanglaSRMEightyNotes',
                  filtering: false,
                },

                {
                  title: 'ind13BanglaClassResultSixtyStatus',
                  field: 'ind13BanglaClassResultSixtyStatus',
                  filtering: false,
                },
                {
                  title: 'ind13BanglaClassResultSixtyNotes',
                  field: 'ind13BanglaClassResultSixtyNotes',
                  filtering: false,
                },
                {
                  title: 'ind14MeetingDiscussionStatus',
                  field: 'ind14MeetingDiscussionStatus',
                  filtering: false,
                },
                {
                  title: 'ind14MeetingDiscussionNotes',
                  field: 'ind14MeetingDiscussionNotes',
                  filtering: false,
                },
                {
                  title: 'ind15LastMonthObservationStatus',
                  field: 'ind15LastMonthObservationStatus',
                  filtering: false,
                },
                {
                  title: 'ind15LastMonthObservationNotes',
                  field: 'ind15LastMonthObservationNotes',
                  filtering: false,
                },
                {
                  title: 'ind16StudentTrackingStatus',
                  field: 'ind16StudentTrackingStatus',
                  filtering: false,
                },
                {
                  title: 'ind16StudentTrackingNotes',
                  field: 'ind16StudentTrackingNotes',
                  filtering: false,
                },
                {
                  title: 'ind17GovtOfficialVisitStatus',
                  field: 'ind17GovtOfficialVisitStatus',
                  filtering: false,
                },
                {
                  title: 'ind17GovtOfficialVisitNotes',
                  field: 'ind17GovtOfficialVisitNotes',
                  filtering: false,
                },
                {
                  title: 'ind18ParentsSMCParticipationStatus',
                  field: 'ind18ParentsSMCParticipationStatus',
                  filtering: false,
                },
                {
                  title: 'ind18ParentsSMCParticipationNotes',
                  field: 'ind18ParentsSMCParticipationNotes',
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
                    handleRowUpdateAllOverallSchool(newData, oldData, resolve)
                  }),
              }}
              options={{
                exportButton: true,
                exportAllData: true,
                grouping: true,
                sorting: true,
                filtering: true,
                search: true,
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
