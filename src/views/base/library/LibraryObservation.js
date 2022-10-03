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

const LibraryObservation = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

  const [allLibraryObservation, setAllLibraryObservation] = useState([])

  // Area wise library data
  const [kutubdiaLibraryObservation, setKutubdiaLibraryObservation] = useState([])
  const [ukhiyaLibraryObservation, setUkhiyaLibraryObservation] = useState([])
  // Area wise library data

  // Month wise library data
  const [libraryObservationByMonth, setLibraryObservationByMonth] = useState([])
  // Month wise library data

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

      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      await getAllLibraryObservation(console.log('Get All Library observation called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Book-checkout Data for school
  const getAllBookCheckoutSchool = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/book-checkouts', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBCOData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Get All Library observation
  const getAllLibraryObservation = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/library-observations', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLibraryObservation(response.data)

      setKutubdiaLibraryObservation(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaLibraryObservation(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Library observation

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
        {/* <CCard className="mb-4">
          <CCardHeader>
            <strong>Report Library Observation</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" href="/base/construction">
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
            </CButton>
          </CCardBody>
        </CCard> */}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Library Observation</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Sortable Ratings </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={allLibraryObservation.length + ' Library Observation '}
                    columns={[
                      { title: 'School', field: 'school' },
                      { title: 'Project', field: 'project' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },
                      {
                        title: 'Date of Visit',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: 'Year', field: 'year', sorting: 'true' },
                      //{ title: '#Visit', field: 'visitNo', sorting: 'true' },

                      // { title: 'LPO', field: 'lpo', type: 'string' },
                      // {
                      //   title: 'LF',
                      //   field: 'lf',
                      //   type: 'string',
                      // },
                      {
                        title: 'Rating',
                        field: 'libraryStatus',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      // {
                      //   title: 'Last followup indicator 1',
                      //   field: 'lastFollowupIndicator1',
                      // },
                      // {
                      //   title: 'Last followup indicator 2',
                      //   field: 'lastFollowupIndicator2',
                      // },
                      {
                        title: 'Ind 1: All teacher trained',
                        field: 'ind1IsTrainedAllTeacher',
                      },
                      // {
                      //   title: 'Ind 1.1: Trained SRM Teacher Incharge',
                      //   field: 'ind11IsTrainedSRMTeacherIncharge',
                      // },
                      // {
                      //   title: 'Ind 1.2: Trained Headteacher',
                      //   field: 'ind12IsTrainedHeadTeacher',
                      // },
                      {
                        title: 'Ind 2: Classroom Suitable SRM',
                        field: 'ind2ClassroomSuitableSRM',
                      },

                      // {
                      //   title: 'Ind 2.1: Classroom Door Window Lock',
                      //   field: 'ind21ClassroomDoorWindowLock',
                      // },
                      // {
                      //   title: 'Ind 2.2: Classroom Safe Clean',
                      //   field: 'ind22ClassroomSafeClean',
                      // },
                      {
                        title: 'Ind 3: Bookself Useable',
                        field: 'ind3BookselfUseable',
                      },
                      // {
                      //   title: 'Ind 3.1: Bookself Accessible',
                      //   field: 'ind31BookselfAccessible',
                      // },
                      // {
                      //   title: 'Ind 3.2: Bookself Environment Protected',
                      //   field: 'ind32BookselfEnvironmentProtected',
                      // },
                      // {
                      //   title: 'Ind 3.3: Bookself Table Condition',
                      //   field: 'ind33BookselfTableCondition',
                      // },
                      {
                        title: 'Ind: 4 BookRegister Updated',
                        field: 'ind4BookRegisterUpdated',
                      },
                      {
                        title: 'Ind 5: Bookself Organized',
                        field: 'ind5BookselfOrganized',
                      },
                      // {
                      //   title: 'Ind 5.1: Bookself Book Organized Open',
                      //   field: 'ind51BookselfBookOrganizedOpen',
                      // },
                      // {
                      //   title: 'Ind 5.2: Bookself BookLevel Viewable',
                      //   field: 'ind52BookselfBookLevelViewable',
                      // },
                      // {
                      //   title: 'Ind 5.2: Bookself BookLevel Viewable',
                      //   field: 'ind52BookselfBookLevelViewable',
                      // },
                      // {
                      //   title: 'Ind 5.3: Bookself Book Accessible',
                      //   field: 'ind53BookselfBookAccessible',
                      // },
                      {
                        title: 'Ind 6: PrintRich Displayed',
                        field: 'ind6PrintRichDisplayed',
                      },
                      {
                        title: 'Ind 7: BookCheckout Functional',
                        field: 'ind7BookCheckoutFunctional',
                      },
                      // {
                      //   title: 'Ind 7.1: BookCheckout Procedure Displayed',
                      //   field: 'ind71BookCheckoutProcedureDisplayed',
                      // },
                      // {
                      //   title: 'Ind 7.2: BookCheckout Register Usable',
                      //   field: 'ind72BookCheckoutRegisterUsable',
                      // },
                      // {
                      //   title: 'Ind 7.3: BookCheckout Register Updated',
                      //   field: 'ind73BookCheckoutRegisterUpdated',
                      // },
                      // {
                      //   title: 'Ind 7.4: BookCheckout PendingBooklist',
                      //   field: 'ind74BookCheckoutPendingBooklist',
                      // },
                      {
                        title: 'Ind 8: SRM Class Routine',
                        field: 'ind8SRMClassRoutine',
                      },
                      // {
                      //   title: 'Ind 8.1: SRM Class Weekly',
                      //   field: 'ind81SRMClassWeekly',
                      // },
                      // {
                      //   title: 'Ind 8.2: Daily BookCheckout Opportunity',
                      //   field: 'ind82DailyBookCheckoutOpportunity',
                      // },
                      {
                        title: 'Ind 9: SRM Register Updated',
                        field: 'ind9SRMRegisterUpdated',
                      },
                      {
                        title: 'Ind 10: Parents Meeting',
                        field: 'ind10ParentsMeeting',
                      },
                      {
                        title: 'Ind 11: Read Festival',
                        field: 'ind11ReadFestival',
                      },
                      {
                        title: 'Ind 12: Sustainability Plan',
                        field: 'ind12SustainabilityPlan',
                      },
                      // {
                      //   title: 'Ind 12.1: Collective Plan',
                      //   field: 'ind121CollectivePlan',
                      // },
                      // {
                      //   title: 'Ind 12.1: Collective Plan',
                      //   field: 'ind121CollectivePlan',
                      // },
                      // {
                      //   title: 'Ind 12.2: Responsibility Plan',
                      //   field: 'ind122ResponsibilityPlan',
                      // },
                      // {
                      //   title: 'Best Practice Indicator 1',
                      //   field: 'bestPracticeIndicator1',
                      // },
                      // {
                      //   title: 'Best Practice Indicator 1 Details',
                      //   field: 'bestPracticeIndicator1Details',
                      // },
                      // {
                      //   title: 'Best Practice Indicator 2',
                      //   field: 'bestPracticeIndicator2',
                      // },
                      // {
                      //   title: 'Best Practice Indicator 2 Details',
                      //   field: 'bestPracticeIndicator2Details',
                      // },
                      // {
                      //   title: 'Best Practice Indicator 3',
                      //   field: 'bestPracticeIndicator3',
                      // },
                      // {
                      //   title: 'Best Practice Indicator 3 Details',
                      //   field: 'bestPracticeIndicator3Details',
                      // },
                      // {
                      //   title: 'Coaching Support Indicator 1',
                      //   field: 'coachingSupportIndicator1',
                      // },
                      // {
                      //   title: 'Coaching Support Indicator 1 Details',
                      //   field: 'coachingSupportIndicator1Details',
                      // },
                      // {
                      //   title: 'Coaching Support Indicator 2',
                      //   field: 'coachingSupportIndicator2',
                      // },
                      // {
                      //   title: 'Coaching Support Indicator 2 Details',
                      //   field: 'coachingSupportIndicator2Details',
                      // },
                      // {
                      //   title: 'Agreed Statement 1',
                      //   field: 'agreedStatement1',
                      // },
                      // {
                      //   title: 'Agreed Statement 2',
                      //   field: 'agreedStatement2',
                      // },
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
                      pageSizeOptions: [5, 10, 15],
                      maxBodyHeight: '550px',
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
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={allLibraryObservation}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Overall Results </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Overall results by phase'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Rating', field: '' },
                      { title: 'Phase I(2020) Number', field: '' },
                      { title: 'Phase I(2020) Libraries %', field: '' },
                      { title: 'Phase II(2021) Number', field: '' },
                      { title: 'Phase II(2021) Libraries %', field: '' },
                      { title: 'Phase III(2022) Number', field: '' },
                      { title: 'Phase III(2022) Libraries %', field: '' },
                      { title: 'Overall Number', field: '' },
                      { title: 'Overall Libraries %', field: '' },
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
                      maxBodyHeight: '550px',
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
                    //data={''}
                  />
                </CAccordionBody>
                <CAccordionBody>
                  <MaterialTable
                    title={'Overall results by province'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Rating', field: '' },
                      { title: 'Ukhiya Number', field: '' },
                      { title: 'Ukhiya Libraries %', field: '' },
                      { title: 'Kutubdia Number', field: '' },
                      { title: 'Kutubdia Libraries %', field: '' },
                      { title: 'Overall Number', field: '' },
                      { title: 'Overall Libraries %', field: '' },
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
                      maxBodyHeight: '550px',
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
                    //data={''}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Indicator Freq by Phase </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Frequency at which indicators were present by phase'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Indicator', field: '' },
                      { title: 'Phase II(2022)', field: '' },
                      { title: 'Overall', field: '' },
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
                      maxBodyHeight: '550px',
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
                    //data={''}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>Indicator Freq by Province</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Frequency at which indicators were present by province'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Indicator', field: '' },
                      { title: 'Ukhiya()', field: '' },
                      { title: 'Kutubdia()', field: '' },
                      { title: 'Overall', field: '' },
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
                      maxBodyHeight: '550px',
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
                    //data={''}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>Results over Time </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={'Overall results by phase'}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Rating', field: '' },
                      { title: 'Q1 Phase I(2020) Number', field: '' },
                      { title: 'Q1 Phase I(2020) Libraries %', field: '' },
                      { title: 'Q3 Phase I(2020) Number', field: '' },
                      { title: 'Q3 Phase I(2020) Libraries %', field: '' },
                      { title: 'Q1 Phase II(2021) Number', field: '' },
                      { title: 'Q1 Phase II(2021) Libraries %', field: '' },
                      { title: 'Q3 Phase II(2021) Number', field: '' },
                      { title: 'Q3 Phase II(2021) Libraries %', field: '' },
                      { title: 'Q1 Phase III(2022) Number', field: '' },
                      { title: 'Q1 Phase III(2022) Libraries %', field: '' },
                      { title: 'Q3 Phase III(2022) Number', field: '' },
                      { title: 'Q3 Phase III(2022) Libraries %', field: '' },
                      { title: 'Q1 Overall Number', field: '' },
                      { title: 'Q1 Overall Libraries %', field: '' },
                      { title: 'Q3 Overall Number', field: '' },
                      { title: 'Q3 Overall Libraries %', field: '' },
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
                      maxBodyHeight: '550px',
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
                    //data={''}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>All Library Observation </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={allLibraryObservation.length + ' Library Observation '}
                    columns={[
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: 'Year', field: 'year', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },

                      // { title: 'LPO', field: 'lpo', type: 'string' },
                      // {
                      //   title: 'LF',
                      //   field: 'lf',
                      //   type: 'string',
                      // },
                      {
                        title: 'Library Status',
                        field: 'libraryStatus',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      {
                        title: 'Last followup indicator 1',
                        field: 'lastFollowupIndicator1',
                      },
                      {
                        title: 'Last followup indicator 2',
                        field: 'lastFollowupIndicator2',
                      },
                      {
                        title: 'Ind 1: All teacher trained',
                        field: 'ind1IsTrainedAllTeacher',
                      },
                      {
                        title: 'Ind 1.1: Trained SRM Teacher Incharge',
                        field: 'ind11IsTrainedSRMTeacherIncharge',
                      },
                      {
                        title: 'Ind 1.2: Trained Headteacher',
                        field: 'ind12IsTrainedHeadTeacher',
                      },
                      {
                        title: 'Ind 2: Classroom Suitable SRM',
                        field: 'ind2ClassroomSuitableSRM',
                      },

                      {
                        title: 'Ind 2.1: Classroom Door Window Lock',
                        field: 'ind21ClassroomDoorWindowLock',
                      },
                      {
                        title: 'Ind 2.2: Classroom Safe Clean',
                        field: 'ind22ClassroomSafeClean',
                      },
                      {
                        title: 'Ind 3: Bookself Useable',
                        field: 'ind3BookselfUseable',
                      },
                      {
                        title: 'Ind 3.1: Bookself Accessible',
                        field: 'ind31BookselfAccessible',
                      },
                      {
                        title: 'Ind 3.2: Bookself Environment Protected',
                        field: 'ind32BookselfEnvironmentProtected',
                      },
                      {
                        title: 'Ind 3.3: Bookself Table Condition',
                        field: 'ind33BookselfTableCondition',
                      },
                      {
                        title: 'Ind: 4 BookRegister Updated',
                        field: 'ind4BookRegisterUpdated',
                      },
                      {
                        title: 'Ind 5: Bookself Organized',
                        field: 'ind5BookselfOrganized',
                      },
                      {
                        title: 'Ind 5.1: Bookself Book Organized Open',
                        field: 'ind51BookselfBookOrganizedOpen',
                      },
                      {
                        title: 'Ind 5.2: Bookself BookLevel Viewable',
                        field: 'ind52BookselfBookLevelViewable',
                      },
                      {
                        title: 'Ind 5.2: Bookself BookLevel Viewable',
                        field: 'ind52BookselfBookLevelViewable',
                      },
                      {
                        title: 'Ind 5.3: Bookself Book Accessible',
                        field: 'ind53BookselfBookAccessible',
                      },
                      {
                        title: 'Ind 6: PrintRich Displayed',
                        field: 'ind6PrintRichDisplayed',
                      },
                      {
                        title: 'Ind 7: BookCheckout Functional',
                        field: 'ind7BookCheckoutFunctional',
                      },
                      {
                        title: 'Ind 7.1: BookCheckout Procedure Displayed',
                        field: 'ind71BookCheckoutProcedureDisplayed',
                      },
                      {
                        title: 'Ind 7.2: BookCheckout Register Usable',
                        field: 'ind72BookCheckoutRegisterUsable',
                      },
                      {
                        title: 'Ind 7.3: BookCheckout Register Updated',
                        field: 'ind73BookCheckoutRegisterUpdated',
                      },
                      {
                        title: 'Ind 7.4: BookCheckout PendingBooklist',
                        field: 'ind74BookCheckoutPendingBooklist',
                      },
                      {
                        title: 'Ind 8: SRM Class Routine',
                        field: 'ind8SRMClassRoutine',
                      },
                      {
                        title: 'Ind 8.1: SRM Class Weekly',
                        field: 'ind81SRMClassWeekly',
                      },
                      {
                        title: 'Ind 8.2: Daily BookCheckout Opportunity',
                        field: 'ind82DailyBookCheckoutOpportunity',
                      },
                      {
                        title: 'Ind 9: SRM Register Updated',
                        field: 'ind9SRMRegisterUpdated',
                      },
                      {
                        title: 'Ind 10: Parents Meeting',
                        field: 'ind10ParentsMeeting',
                      },
                      {
                        title: 'Ind 11: Read Festival',
                        field: 'ind11ReadFestival',
                      },
                      {
                        title: 'Ind 12: Sustainability Plan',
                        field: 'ind12SustainabilityPlan',
                      },
                      {
                        title: 'Ind 12.1: Collective Plan',
                        field: 'ind121CollectivePlan',
                      },
                      {
                        title: 'Ind 12.1: Collective Plan',
                        field: 'ind121CollectivePlan',
                      },
                      {
                        title: 'Ind 12.2: Responsibility Plan',
                        field: 'ind122ResponsibilityPlan',
                      },
                      {
                        title: 'Best Practice Indicator 1',
                        field: 'bestPracticeIndicator1',
                      },
                      {
                        title: 'Best Practice Indicator 1 Details',
                        field: 'bestPracticeIndicator1Details',
                      },
                      {
                        title: 'Best Practice Indicator 2',
                        field: 'bestPracticeIndicator2',
                      },
                      {
                        title: 'Best Practice Indicator 2 Details',
                        field: 'bestPracticeIndicator2Details',
                      },
                      {
                        title: 'Best Practice Indicator 3',
                        field: 'bestPracticeIndicator3',
                      },
                      {
                        title: 'Best Practice Indicator 3 Details',
                        field: 'bestPracticeIndicator3Details',
                      },
                      {
                        title: 'Coaching Support Indicator 1',
                        field: 'coachingSupportIndicator1',
                      },
                      {
                        title: 'Coaching Support Indicator 1 Details',
                        field: 'coachingSupportIndicator1Details',
                      },
                      {
                        title: 'Coaching Support Indicator 2',
                        field: 'coachingSupportIndicator2',
                      },
                      {
                        title: 'Coaching Support Indicator 2 Details',
                        field: 'coachingSupportIndicator2Details',
                      },
                      {
                        title: 'Agreed Statement 1',
                        field: 'agreedStatement1',
                      },
                      {
                        title: 'Agreed Statement 2',
                        field: 'agreedStatement2',
                      },
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
                      pageSize: 2,
                      pageSizeOptions: [2, 4, 6],
                      maxBodyHeight: '550px',
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
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={allLibraryObservation}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>Library Observation Kutubdia</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaLibraryObservation.length + ' Library Observation '}
                    columns={[
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: 'Year', field: 'year', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },

                      // { title: 'LPO', field: 'lpo', type: 'string' },
                      // {
                      //   title: 'LF',
                      //   field: 'lf',
                      //   type: 'string',
                      // },
                      { title: 'Library Status', field: 'libraryStatus' },
                      {
                        title: 'Last followup indicator 1',
                        field: 'lastFollowupIndicator1',
                      },
                      {
                        title: 'Last followup indicator 2',
                        field: 'lastFollowupIndicator2',
                      },
                      {
                        title: 'Ind 1: All teacher trained',
                        field: 'ind1IsTrainedAllTeacher',
                      },
                      {
                        title: 'Ind 1.1: Trained SRM Teacher Incharge',
                        field: 'ind11IsTrainedSRMTeacherIncharge',
                      },
                      {
                        title: 'Ind 1.2: Trained Headteacher',
                        field: 'ind12IsTrainedHeadTeacher',
                      },
                      {
                        title: 'Ind 2: Classroom Suitable SRM',
                        field: 'ind2ClassroomSuitableSRM',
                      },

                      {
                        title: 'Ind 2.1: Classroom Door Window Lock',
                        field: 'ind21ClassroomDoorWindowLock',
                      },
                      {
                        title: 'Ind 2.2: Classroom Safe Clean',
                        field: 'ind22ClassroomSafeClean',
                      },
                      {
                        title: 'Ind 3: Bookself Useable',
                        field: 'ind3BookselfUseable',
                      },
                      {
                        title: 'Ind 3.1: Bookself Accessible',
                        field: 'ind31BookselfAccessible',
                      },
                      {
                        title: 'Ind 3.2: Bookself Environment Protected',
                        field: 'ind32BookselfEnvironmentProtected',
                      },
                      {
                        title: 'Ind 3.3: Bookself Table Condition',
                        field: 'ind33BookselfTableCondition',
                      },
                      {
                        title: 'Ind: 4 BookRegister Updated',
                        field: 'ind4BookRegisterUpdated',
                      },
                      {
                        title: 'Ind 5: Bookself Organized',
                        field: 'ind5BookselfOrganized',
                      },
                      {
                        title: 'Ind 5.1: Bookself Book Organized Open',
                        field: 'ind51BookselfBookOrganizedOpen',
                      },
                      {
                        title: 'Ind 5.2: Bookself BookLevel Viewable',
                        field: 'ind52BookselfBookLevelViewable',
                      },
                      {
                        title: 'Ind 5.2: Bookself BookLevel Viewable',
                        field: 'ind52BookselfBookLevelViewable',
                      },
                      {
                        title: 'Ind 5.3: Bookself Book Accessible',
                        field: 'ind53BookselfBookAccessible',
                      },
                      {
                        title: 'Ind 6: PrintRich Displayed',
                        field: 'ind6PrintRichDisplayed',
                      },
                      {
                        title: 'Ind 7: BookCheckout Functional',
                        field: 'ind7BookCheckoutFunctional',
                      },
                      {
                        title: 'Ind 7.1: BookCheckout Procedure Displayed',
                        field: 'ind71BookCheckoutProcedureDisplayed',
                      },
                      {
                        title: 'Ind 7.2: BookCheckout Register Usable',
                        field: 'ind72BookCheckoutRegisterUsable',
                      },
                      {
                        title: 'Ind 7.3: BookCheckout Register Updated',
                        field: 'ind73BookCheckoutRegisterUpdated',
                      },
                      {
                        title: 'Ind 7.4: BookCheckout PendingBooklist',
                        field: 'ind74BookCheckoutPendingBooklist',
                      },
                      {
                        title: 'Ind 8: SRM Class Routine',
                        field: 'ind8SRMClassRoutine',
                      },
                      {
                        title: 'Ind 8.1: SRM Class Weekly',
                        field: 'ind81SRMClassWeekly',
                      },
                      {
                        title: 'Ind 8.2: Daily BookCheckout Opportunity',
                        field: 'ind82DailyBookCheckoutOpportunity',
                      },
                      {
                        title: 'Ind 9: SRM Register Updated',
                        field: 'ind9SRMRegisterUpdated',
                      },
                      {
                        title: 'Ind 10: Parents Meeting',
                        field: 'ind10ParentsMeeting',
                      },
                      {
                        title: 'Ind 11: Read Festival',
                        field: 'ind11ReadFestival',
                      },
                      {
                        title: 'Ind 12: Sustainability Plan',
                        field: 'ind12SustainabilityPlan',
                      },
                      {
                        title: 'Ind 12.1: Collective Plan',
                        field: 'ind121CollectivePlan',
                      },
                      {
                        title: 'Ind 12.1: Collective Plan',
                        field: 'ind121CollectivePlan',
                      },
                      {
                        title: 'Ind 12.2: Responsibility Plan',
                        field: 'ind122ResponsibilityPlan',
                      },
                      {
                        title: 'Best Practice Indicator 1',
                        field: 'bestPracticeIndicator1',
                      },
                      {
                        title: 'Best Practice Indicator 1 Details',
                        field: 'bestPracticeIndicator1Details',
                      },
                      {
                        title: 'Best Practice Indicator 2',
                        field: 'bestPracticeIndicator2',
                      },
                      {
                        title: 'Best Practice Indicator 2 Details',
                        field: 'bestPracticeIndicator2Details',
                      },
                      {
                        title: 'Best Practice Indicator 3',
                        field: 'bestPracticeIndicator3',
                      },
                      {
                        title: 'Best Practice Indicator 3 Details',
                        field: 'bestPracticeIndicator3Details',
                      },
                      {
                        title: 'Coaching Support Indicator 1',
                        field: 'coachingSupportIndicator1',
                      },
                      {
                        title: 'Coaching Support Indicator 1 Details',
                        field: 'coachingSupportIndicator1Details',
                      },
                      {
                        title: 'Coaching Support Indicator 2',
                        field: 'coachingSupportIndicator2',
                      },
                      {
                        title: 'Coaching Support Indicator 2 Details',
                        field: 'coachingSupportIndicator2Details',
                      },
                      {
                        title: 'Agreed Statement 1',
                        field: 'agreedStatement1',
                      },
                      {
                        title: 'Agreed Statement 2',
                        field: 'agreedStatement2',
                      },
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
                      pageSize: 2,
                      pageSizeOptions: [2, 4, 6],
                      maxBodyHeight: '550px',
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
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={kutubdiaLibraryObservation}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>Library Observation Ukhiya</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaLibraryObservation.length + ' Library Observation '}
                    columns={[
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: 'Year', field: 'year', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },

                      // { title: 'LPO', field: 'lpo', type: 'string' },
                      // {
                      //   title: 'LF',
                      //   field: 'lf',
                      //   type: 'string',
                      // },
                      { title: 'Library Status', field: 'libraryStatus' },
                      {
                        title: 'Last followup indicator 1',
                        field: 'lastFollowupIndicator1',
                      },
                      {
                        title: 'Last followup indicator 2',
                        field: 'lastFollowupIndicator2',
                      },
                      {
                        title: 'Ind 1: All teacher trained',
                        field: 'ind1IsTrainedAllTeacher',
                      },
                      {
                        title: 'Ind 1.1: Trained SRM Teacher Incharge',
                        field: 'ind11IsTrainedSRMTeacherIncharge',
                      },
                      {
                        title: 'Ind 1.2: Trained Headteacher',
                        field: 'ind12IsTrainedHeadTeacher',
                      },
                      {
                        title: 'Ind 2: Classroom Suitable SRM',
                        field: 'ind2ClassroomSuitableSRM',
                      },

                      {
                        title: 'Ind 2.1: Classroom Door Window Lock',
                        field: 'ind21ClassroomDoorWindowLock',
                      },
                      {
                        title: 'Ind 2.2: Classroom Safe Clean',
                        field: 'ind22ClassroomSafeClean',
                      },
                      {
                        title: 'Ind 3: Bookself Useable',
                        field: 'ind3BookselfUseable',
                      },
                      {
                        title: 'Ind 3.1: Bookself Accessible',
                        field: 'ind31BookselfAccessible',
                      },
                      {
                        title: 'Ind 3.2: Bookself Environment Protected',
                        field: 'ind32BookselfEnvironmentProtected',
                      },
                      {
                        title: 'Ind 3.3: Bookself Table Condition',
                        field: 'ind33BookselfTableCondition',
                      },
                      {
                        title: 'Ind: 4 BookRegister Updated',
                        field: 'ind4BookRegisterUpdated',
                      },
                      {
                        title: 'Ind 5: Bookself Organized',
                        field: 'ind5BookselfOrganized',
                      },
                      {
                        title: 'Ind 5.1: Bookself Book Organized Open',
                        field: 'ind51BookselfBookOrganizedOpen',
                      },
                      {
                        title: 'Ind 5.2: Bookself BookLevel Viewable',
                        field: 'ind52BookselfBookLevelViewable',
                      },
                      {
                        title: 'Ind 5.2: Bookself BookLevel Viewable',
                        field: 'ind52BookselfBookLevelViewable',
                      },
                      {
                        title: 'Ind 5.3: Bookself Book Accessible',
                        field: 'ind53BookselfBookAccessible',
                      },
                      {
                        title: 'Ind 6: PrintRich Displayed',
                        field: 'ind6PrintRichDisplayed',
                      },
                      {
                        title: 'Ind 7: BookCheckout Functional',
                        field: 'ind7BookCheckoutFunctional',
                      },
                      {
                        title: 'Ind 7.1: BookCheckout Procedure Displayed',
                        field: 'ind71BookCheckoutProcedureDisplayed',
                      },
                      {
                        title: 'Ind 7.2: BookCheckout Register Usable',
                        field: 'ind72BookCheckoutRegisterUsable',
                      },
                      {
                        title: 'Ind 7.3: BookCheckout Register Updated',
                        field: 'ind73BookCheckoutRegisterUpdated',
                      },
                      {
                        title: 'Ind 7.4: BookCheckout PendingBooklist',
                        field: 'ind74BookCheckoutPendingBooklist',
                      },
                      {
                        title: 'Ind 8: SRM Class Routine',
                        field: 'ind8SRMClassRoutine',
                      },
                      {
                        title: 'Ind 8.1: SRM Class Weekly',
                        field: 'ind81SRMClassWeekly',
                      },
                      {
                        title: 'Ind 8.2: Daily BookCheckout Opportunity',
                        field: 'ind82DailyBookCheckoutOpportunity',
                      },
                      {
                        title: 'Ind 9: SRM Register Updated',
                        field: 'ind9SRMRegisterUpdated',
                      },
                      {
                        title: 'Ind 10: Parents Meeting',
                        field: 'ind10ParentsMeeting',
                      },
                      {
                        title: 'Ind 11: Read Festival',
                        field: 'ind11ReadFestival',
                      },
                      {
                        title: 'Ind 12: Sustainability Plan',
                        field: 'ind12SustainabilityPlan',
                      },
                      {
                        title: 'Ind 12.1: Collective Plan',
                        field: 'ind121CollectivePlan',
                      },
                      {
                        title: 'Ind 12.1: Collective Plan',
                        field: 'ind121CollectivePlan',
                      },
                      {
                        title: 'Ind 12.2: Responsibility Plan',
                        field: 'ind122ResponsibilityPlan',
                      },
                      {
                        title: 'Best Practice Indicator 1',
                        field: 'bestPracticeIndicator1',
                      },
                      {
                        title: 'Best Practice Indicator 1 Details',
                        field: 'bestPracticeIndicator1Details',
                      },
                      {
                        title: 'Best Practice Indicator 2',
                        field: 'bestPracticeIndicator2',
                      },
                      {
                        title: 'Best Practice Indicator 2 Details',
                        field: 'bestPracticeIndicator2Details',
                      },
                      {
                        title: 'Best Practice Indicator 3',
                        field: 'bestPracticeIndicator3',
                      },
                      {
                        title: 'Best Practice Indicator 3 Details',
                        field: 'bestPracticeIndicator3Details',
                      },
                      {
                        title: 'Coaching Support Indicator 1',
                        field: 'coachingSupportIndicator1',
                      },
                      {
                        title: 'Coaching Support Indicator 1 Details',
                        field: 'coachingSupportIndicator1Details',
                      },
                      {
                        title: 'Coaching Support Indicator 2',
                        field: 'coachingSupportIndicator2',
                      },
                      {
                        title: 'Coaching Support Indicator 2 Details',
                        field: 'coachingSupportIndicator2Details',
                      },
                      {
                        title: 'Agreed Statement 1',
                        field: 'agreedStatement1',
                      },
                      {
                        title: 'Agreed Statement 2',
                        field: 'agreedStatement2',
                      },
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
                      pageSize: 2,
                      pageSizeOptions: [2, 4, 6],
                      maxBodyHeight: '550px',
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
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={ukhiyaLibraryObservation}
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

export default LibraryObservation
