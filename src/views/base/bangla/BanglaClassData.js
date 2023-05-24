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

const BanglaClassData = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

  const [allBanglaClass, setAllBanglaClass] = useState([])

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
      await getAllBanglaClass(console.log('get bangla class called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Book-checkout Data for school
  const getAllBanglaClass = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/bangla-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBanglaClass(response.data)
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
            <strong>ALL Bangla Class Observation</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allBanglaClass.length + ' Bangla Class Observation'}
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

                { title: 'lastFollowupTopic1', field: 'lastFollowupTopic1', filtering: false },
                { title: 'lastFollowupTopic2', field: 'lastFollowupTopic2', filtering: false },
                { title: 'lastFollowupTopic3', field: 'lastFollowupTopic3', filtering: false },

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

                { title: 'ind8GroupWorkStatus', field: 'ind8GroupWorkStatus', filtering: false },
                { title: 'ind8GroupWorkNotes', field: 'ind8GroupWorkNotes', filtering: false },

                { title: 'ind9TimeOnTaskStatus', field: 'ind9TimeOnTaskStatus', filtering: false },
                { title: 'ind9TimeOnTaskNotes', field: 'ind9TimeOnTaskNotes', filtering: false },

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
                { title: 'ind12AssessmentNotes', field: 'ind12AssessmentNotes', filtering: false },

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
              data={allBanglaClass}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BanglaClassData
