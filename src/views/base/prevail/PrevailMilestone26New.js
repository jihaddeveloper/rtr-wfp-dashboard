//  Author: Mohammad Jihad Hossain
//  Create Date: 12/03/2026
//  Modify Date: 14/05/2026
//  Description: P Milestone 26  file

import React, { useState, useEffect, useMemo } from 'react'
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
  CButton,
} from '@coreui/react'

import { CChart, CChartBar, CChartLine } from '@coreui/react-chartjs'
import { DocsCallout, DocsExample } from 'src/components'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import MaterialTable from 'material-table'
import { BorderBottom, BorderTop } from '@material-ui/icons'

// File save as XLSX
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
// File save as XLSX

//Icon
//Icon

const BASE_URL = 'http://118.179.80.51:8080/api/v1'

const PrevailMilestone26New = () => {
  const [allData, setAllData] = useState({
    bangla: [],
    lfObs: [],
    teachers: [],
  })

  const [milestoneData26, setMilestoneData26] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Execute all requests in parallel for speed
        const [banglaRes, lfRes, teacherRes] = await Promise.all([
          axios.get(`${BASE_URL}/p-bangla-class`),
          axios.get(`${BASE_URL}/p-lf-observation`),
          axios.get(`${BASE_URL}/p-teacher`),
        ])

        setAllData({
          bangla: banglaRes.data,
          lfObs: lfRes.data,
          teachers: teacherRes.data,
        })
      } catch (error) {
        console.error('Data fetch failed', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
    pushMilestoneData26()
  }, [])

  // New Code
  // Helper: Reusable calculation logic for any Month/Year
  const calculateMilestones = (data, month, year) => {
    const { bangla, lfObs } = data

    // 1. Pre-filter common datasets to save performance
    const monthlyBangla = bangla.filter(
      (item) => item.month === month && item.year === year && item.teacherStatus,
    )
    const monthlyLF = lfObs.filter(
      (item) => item.month === month && item.year === year && item.lfStatus,
    )

    if (monthlyBangla.length === 0)
      return {
        m1: 0,
        mSchoolNumber: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        m5: 0,
        m6: 0,
        m7: 0,
        m8: 0,

        // All Bangla Indicator
        ind1a: 0,
        ind1b: 0,
        ind1c: 0,
        ind1d: 0,
        ind1e: 0,
        ind1f: 0,
        ind2a: 0,
        ind2b: 0,
        ind2c: 0,
        ind2d: 0,
        ind2e: 0,
        ind3a: 0,
        ind3b: 0,
        ind3c: 0,
        ind3d: 0,
        // All Bangla Indicator
      }

    // Helper for percentage
    const getPct = (numerator, denominator) =>
      denominator > 0 ? ((numerator / denominator) * 100).toFixed(0) : '0'

    // Number of School observed
    const numberSchool26 = new Set(monthlyBangla.map((item) => item.rtrSchoolId)).size

    // M2: Unique Schools
    const uniqueSchools = new Set(monthlyBangla.map((item) => item.rtrSchoolId)).size

    // M4: LF Priority 2 & 3
    const lfPriorityCount = monthlyLF.filter(
      (item) => item.lfStatus === 'Priority 2' || item.lfStatus === 'Priority 3',
    ).length

    // M8: Teacher Priority 1, 2, & 3
    const teacherPriorityCount = monthlyBangla.filter((item) =>
      ['Priority 1', 'Priority 2', 'Priority 3'].includes(item.teacherStatus),
    ).length

    // Milestone logic
    return {
      m1: monthlyBangla.length,
      mSchoolNumber: numberSchool26,
      m2: getPct(uniqueSchools, 494),
      m3: 0,
      m4: getPct(lfPriorityCount, monthlyLF.length),
      m5: getPct(
        monthlyBangla.filter((i) => i.ind12FollowedIDoWeDoYouDoStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      m6: getPct(
        monthlyBangla.filter((i) => i.ind14ImplementedAllTaskInTimeStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      m7: getPct(
        monthlyBangla.filter((i) => i.ind13FollowedContinuityOfLessonStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      m8: getPct(teacherPriorityCount, monthlyBangla.length),

      //All Bangla Indicator
      ind1a: getPct(
        monthlyBangla.filter((i) => i.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes')
          .length,
        monthlyBangla.length,
      ),
      ind1b: getPct(
        monthlyBangla.filter((i) => i.ind12FollowedIDoWeDoYouDoStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind1c: getPct(
        monthlyBangla.filter((i) => i.ind13FollowedContinuityOfLessonStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind1d: getPct(
        monthlyBangla.filter((i) => i.ind14ImplementedAllTaskInTimeStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind1e: getPct(
        monthlyBangla.filter((i) => i.ind15InstructedToUseWorkbookStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind1f: getPct(
        monthlyBangla.filter((i) => i.ind16IndependentReadingOpportunityStatus === 'Yes').length,
        monthlyBangla.length,
      ),

      ind2a: getPct(
        monthlyBangla.filter((i) => i.ind21CorrectlyPronouncedStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind2b: getPct(
        monthlyBangla.filter((i) => i.ind22TaughtCorrectlyAllowPracticeStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind2c: getPct(
        monthlyBangla.filter((i) => i.ind23DemonstratesFluentReadingStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind2d: getPct(
        monthlyBangla.filter((i) => i.ind24AllowReadIndividuallyPairGroupsStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind2e: getPct(
        monthlyBangla.filter((i) => i.ind25FollowsInstructionsInWritingStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind3a: getPct(
        monthlyBangla.filter((i) => i.ind31AskedHelpfulQuestionsStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind3b: getPct(
        monthlyBangla.filter((i) => i.ind32TaughtVocabularyNewSentenceStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind3c: getPct(
        monthlyBangla.filter((i) => i.ind33CheckWritingSpellingPunctuationStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      ind3d: getPct(
        monthlyBangla.filter((i) => i.ind34CheckedWeDoYouDoStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      //All Bangla Indicator
    }
  }

  // Reporting option
  // const months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ]

  // const report2026 = months.reduce((acc, month) => {
  //   acc[month] = calculateMilestones(allBanglaObsData, allLFObservationData, month, '2026')
  //   return acc
  // }, {})
  // // Access like this:
  // // report2026.February.m1
  // Reporting option

  // Montly report 2026
  const january26 = calculateMilestones(allData, 'January', '2026')
  const februay26 = calculateMilestones(allData, 'February', '2026')
  const march26 = calculateMilestones(allData, 'March', '2026')
  const april26 = calculateMilestones(allData, 'April', '2026')
  const may26 = calculateMilestones(allData, 'May', '2026')
  const june26 = calculateMilestones(allData, 'June', '2026')
  const july26 = calculateMilestones(allData, 'July', '2026')
  const august26 = calculateMilestones(allData, 'August', '2026')
  const september26 = calculateMilestones(allData, 'September', '2026')
  const october26 = calculateMilestones(allData, 'October', '2026')
  const november26 = calculateMilestones(allData, 'November', '2026')
  const december26 = calculateMilestones(allData, 'December', '2026')
  // Montly report 2026

  console.log(februay26.m1)
  console.log(march26.m5)
  // New Code

  // Milestone data push
  const pushMilestoneData26 = () => {
    const milestoneObject26 = [
      {
        sl: 1,
        area: 'Number of classrooms observed',
        target: '?',
        january: january26.m1,
        february: februay26.m1,
        march: march26.m1,
        april: april26.m1,
        may: may26.m1,
        june: june26.m1,
        july: july26.m1,
        august: august26.m1,
        september: september26.m1,
        october: october26.m1,
        november: november26.m1,
        december: december26.m1,
      },
      {
        sl: 2,
        area: 'Number of School observed',
        target: '?',
        january: january26.mSchoolNumber,
        february: februay26.mSchoolNumber,
        march: march26.mSchoolNumber,
        april: april26.mSchoolNumber,
        may: may26.mSchoolNumber,
        june: june26.mSchoolNumber,
        july: july26.mSchoolNumber,
        august: august26.mSchoolNumber,
        september: september26.mSchoolNumber,
        october: october26.mSchoolNumber,
        november: november26.mSchoolNumber,
        december: december26.mSchoolNumber,
      },
      {
        sl: 3,
        area: '% of schools visited atleast once',
        target: '?',
        january: january26.m2 + '%',
        february: februay26.m2 + '%',
        march: march26.m2 + '%',
        april: april26.m2 + '%',
        may: may26.m2 + '%',
        june: june26.m2 + '%',
        july: july26.m2 + '%',
        august: august26.m2 + '%',
        september: september26.m2 + '%',
        october: october26.m2 + '%',
        november: november26.m2 + '%',
        december: december26.m2 + '%',
      },
      {
        sl: 4,
        area: 'Number of working days',
        target: '?',
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
      },
      {
        sl: 5,
        area: '% of the Literacy Facilitators at Basic and above levels of coaching  skills at the end of year 1(P2&P3)',
        target: '80%',
        january: january26.m4 + '%',
        february: februay26.m4 + '%',
        march: march26.m4 + '%',
        april: april26.m4 + '%',
        may: may26.m4 + '%',
        june: june26.m4 + '%',
        july: july26.m4 + '%',
        august: august26.m4 + '%',
        september: september26.m4 + '%',
        october: october26.m4 + '%',
        november: november26.m4 + '%',
        december: december26.m4 + '%',
      },
      {
        sl: 6,
        area: '% Bangla teachers have adopted key instructional practices (I do-We do-You do, engaging students in individual and group work, assessments)(1b)',
        target: '70%',
        january: january26.m5 + '%',
        february: februay26.m5 + '%',
        march: march26.m5 + '%',
        april: april26.m5 + '%',
        may: may26.m5 + '%',
        june: june26.m5 + '%',
        july: july26.m5 + '%',
        august: august26.m5 + '%',
        september: september26.m5 + '%',
        october: october26.m5 + '%',
        november: november26.m5 + '%',
        december: december26.m5 + '%',
      },
      {
        sl: 7,
        area: '% of teachers able to complete all planned activities in sequence and on time (1d).',
        target: '50%',
        january: january26.m6 + '%',
        february: februay26.m6 + '%',
        march: march26.m6 + '%',
        april: april26.m6 + '%',
        may: may26.m6 + '%',
        june: june26.m6 + '%',
        july: july26.m6 + '%',
        august: august26.m6 + '%',
        september: september26.m6 + '%',
        october: october26.m6 + '%',
        november: november26.m6 + '%',
        december: december26.m6 + '%',
      },
      {
        sl: 8,
        area: '% of observed Bangla teachers that are following use of workbooks during the Bangla language classes(1c)',
        target: '90%',
        january: january26.m7 + '%',
        february: februay26.m7 + '%',
        march: march26.m7 + '%',
        april: april26.m7 + '%',
        may: may26.m7 + '%',
        june: june26.m7 + '%',
        july: july26.m7 + '%',
        august: august26.m7 + '%',
        september: september26.m7 + '%',
        october: october26.m7 + '%',
        november: november26.m7 + '%',
        december: december26.m7 + '%',
      },
      {
        sl: 9,
        area: '% of Bangla teachers achieved ‘Mastered Instructional Routine’ level or above as observed by the Literacy Facilitators during the Bangla class observation(P1,P2,P3)',
        target: '60%',
        january: january26.m8 + '%',
        february: februay26.m8 + '%',
        march: march26.m8 + '%',
        april: april26.m8 + '%',
        may: may26.m8 + '%',
        june: june26.m8 + '%',
        july: july26.m8 + '%',
        august: august26.m8 + '%',
        september: september26.m8 + '%',
        october: october26.m8 + '%',
        november: november26.m8 + '%',
        december: december26.m8 + '%',
      },
    ]
    console.log('milestoneObject26', milestoneObject26)
    setMilestoneData26(milestoneObject26)
  }
  // Milestone data push

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
                    <strong>Milestone 2026</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong></strong> <small></small>
                      </CCardHeader>
                      <CCardBody>
                        <MaterialTable
                          title={''}
                          columns={[
                            { title: 'Sl', field: 'sl' },
                            { title: 'Leading Indicator', field: 'area' },
                            { title: 'Target', field: 'target' },
                            { title: 'January', field: 'january' },
                            { title: 'February', field: 'february' },
                            { title: 'March', field: 'march' },
                            { title: 'April', field: 'april' },
                            { title: 'May', field: 'may' },
                            { title: 'June', field: 'june' },
                            { title: 'July', field: 'july' },
                            { title: 'August', field: 'august' },
                            { title: 'September', field: 'september' },
                            { title: 'October', field: 'october' },
                            { title: 'November', field: 'november' },
                            { title: 'December', field: 'december' },
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
                            maxBodyHeight: '1200px',
                            headerStyle: {
                              position: 'sticky',
                              top: 0,
                              backgroundColor: '#bcceeb',
                              fontWeight: 'bold',
                              width: '5px',
                              height: '5px',
                              textAlign: 'center',
                              text: 'bold',
                              color: '#884fc9',
                              borderRight: '1px solid #eee',
                              borderStyle: 'solid',
                            },
                            rowStyle: {
                              fontSize: 16,
                              backgroundColor: '#f5f3f2',
                              borderRight: '1px solid #fff',
                              borderStyle: 'solid',
                              textAlign: 'center',
                            },
                            cellStyle: {
                              borderRight: '1px solid #0c0b0bff',
                              borderLeft: '1px solid #0e0d0dff',
                              borderBottom: '1px solid #0c0b0bff',
                              BorderTop: '1px solid #0c0b0bff',
                              borderStyle: 'solid',
                              height: '5px',
                              minHeight: '5px',
                              maxHeight: '5px',
                              padding: '0 5px',
                              textAlign: 'center',
                            },
                            maintainAspectRatio: false,
                          }}
                          style={{ height: '', width: '' }}
                          data={[
                            {
                              sl: 1,
                              area: 'Number of classrooms observed',
                              target: '?',
                              january: january26.m1,
                              february: februay26.m1,
                              march: march26.m1,
                              april: april26.m1,
                              may: may26.m1,
                              june: june26.m1,
                              july: july26.m1,
                              august: august26.m1,
                              september: september26.m1,
                              october: october26.m1,
                              november: november26.m1,
                              december: december26.m1,
                            },
                            {
                              sl: 2,
                              area: 'Number of School observed',
                              target: '?',
                              january: january26.mSchoolNumber,
                              february: februay26.mSchoolNumber,
                              march: march26.mSchoolNumber,
                              april: april26.mSchoolNumber,
                              may: may26.mSchoolNumber,
                              june: june26.mSchoolNumber,
                              july: july26.mSchoolNumber,
                              august: august26.mSchoolNumber,
                              september: september26.mSchoolNumber,
                              october: october26.mSchoolNumber,
                              november: november26.mSchoolNumber,
                              december: december26.mSchoolNumber,
                            },
                            {
                              sl: 3,
                              area: '% of schools visited atleast once',
                              target: '?',
                              january: january26.m2 + '%',
                              february: februay26.m2 + '%',
                              march: march26.m2 + '%',
                              april: april26.m2 + '%',
                              may: may26.m2 + '%',
                              june: june26.m2 + '%',
                              july: july26.m2 + '%',
                              august: august26.m2 + '%',
                              september: september26.m2 + '%',
                              october: october26.m2 + '%',
                              november: november26.m2 + '%',
                              december: december26.m2 + '%',
                            },
                            {
                              sl: 4,
                              area: 'Number of working days',
                              target: '?',
                              january: 0,
                              february: 0,
                              march: 0,
                              april: 0,
                              may: 0,
                              june: 0,
                              july: 0,
                              august: 0,
                              september: 0,
                              october: 0,
                              november: 0,
                              december: 0,
                            },
                            {
                              sl: 5,
                              area: '% of the Literacy Facilitators at Basic and above levels of coaching  skills at the end of year 1(P2&P3)',
                              target: '80%',
                              january: january26.m4 + '%',
                              february: februay26.m4 + '%',
                              march: march26.m4 + '%',
                              april: april26.m4 + '%',
                              may: may26.m4 + '%',
                              june: june26.m4 + '%',
                              july: july26.m4 + '%',
                              august: august26.m4 + '%',
                              september: september26.m4 + '%',
                              october: october26.m4 + '%',
                              november: november26.m4 + '%',
                              december: december26.m4 + '%',
                            },
                            {
                              sl: 6,
                              area: '% Bangla teachers have adopted key instructional practices (I do-We do-You do, engaging students in individual and group work, assessments)(1b)',
                              target: '70%',
                              january: january26.m5 + '%',
                              february: februay26.m5 + '%',
                              march: march26.m5 + '%',
                              april: april26.m5 + '%',
                              may: may26.m5 + '%',
                              june: june26.m5 + '%',
                              july: july26.m5 + '%',
                              august: august26.m5 + '%',
                              september: september26.m5 + '%',
                              october: october26.m5 + '%',
                              november: november26.m5 + '%',
                              december: december26.m5 + '%',
                            },
                            {
                              sl: 7,
                              area: '% of teachers able to complete all planned activities in sequence and on time (1d).',
                              target: '50%',
                              january: january26.m6 + '%',
                              february: februay26.m6 + '%',
                              march: march26.m6 + '%',
                              april: april26.m6 + '%',
                              may: may26.m6 + '%',
                              june: june26.m6 + '%',
                              july: july26.m6 + '%',
                              august: august26.m6 + '%',
                              september: september26.m6 + '%',
                              october: october26.m6 + '%',
                              november: november26.m6 + '%',
                              december: december26.m6 + '%',
                            },
                            {
                              sl: 8,
                              area: '% of observed Bangla teachers that are following use of workbooks during the Bangla language classes(1c)',
                              target: '90%',
                              january: january26.m7 + '%',
                              february: februay26.m7 + '%',
                              march: march26.m7 + '%',
                              april: april26.m7 + '%',
                              may: may26.m7 + '%',
                              june: june26.m7 + '%',
                              july: july26.m7 + '%',
                              august: august26.m7 + '%',
                              september: september26.m7 + '%',
                              october: october26.m7 + '%',
                              november: november26.m7 + '%',
                              december: december26.m7 + '%',
                            },
                            {
                              sl: 9,
                              area: '% of Bangla teachers achieved ‘Mastered Instructional Routine’ level or above as observed by the Literacy Facilitators during the Bangla class observation(P1,P2,P3)',
                              target: '60%',
                              january: january26.m8 + '%',
                              february: februay26.m8 + '%',
                              march: march26.m8 + '%',
                              april: april26.m8 + '%',
                              may: may26.m8 + '%',
                              june: june26.m8 + '%',
                              july: july26.m8 + '%',
                              august: august26.m8 + '%',
                              september: september26.m8 + '%',
                              october: october26.m8 + '%',
                              november: november26.m8 + '%',
                              december: december26.m8 + '%',
                            },
                          ]}
                        />
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                </CAccordionItem>

                <CAccordionItem itemKey={2}>
                  <CAccordionHeader>
                    <strong>Bangla All Indicator Performance 2026</strong>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CCard className="mb-4">
                      <CCardHeader>
                        <strong></strong> <small></small>
                      </CCardHeader>
                      <CCardBody>
                        <MaterialTable
                          title={''}
                          columns={[
                            { title: 'Sl', field: 'sl' },
                            { title: 'Leading Indicator', field: 'area' },
                            { title: 'Target', field: 'target' },
                            { title: 'January', field: 'january' },
                            { title: 'February', field: 'february' },
                            { title: 'March', field: 'march' },
                            { title: 'April', field: 'april' },
                            { title: 'May', field: 'may' },
                            { title: 'June', field: 'june' },
                            { title: 'July', field: 'july' },
                            { title: 'August', field: 'august' },
                            { title: 'September', field: 'september' },
                            { title: 'October', field: 'october' },
                            { title: 'November', field: 'november' },
                            { title: 'December', field: 'december' },
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
                            maxBodyHeight: '1200px',
                            headerStyle: {
                              position: 'sticky',
                              top: 0,
                              backgroundColor: '#bcceeb',
                              fontWeight: 'bold',
                              width: '5px',
                              height: '5px',
                              textAlign: 'center',
                              text: 'bold',
                              color: '#884fc9',
                              borderRight: '1px solid #eee',
                              borderStyle: 'solid',
                            },
                            rowStyle: {
                              fontSize: 16,
                              backgroundColor: '#f5f3f2',
                              borderRight: '1px solid #fff',
                              borderStyle: 'solid',
                              textAlign: 'center',
                            },
                            cellStyle: {
                              borderRight: '1px solid #0c0b0bff',
                              borderLeft: '1px solid #0e0d0dff',
                              borderBottom: '1px solid #0c0b0bff',
                              BorderTop: '1px solid #0c0b0bff',
                              borderStyle: 'solid',
                              height: '5px',
                              minHeight: '5px',
                              maxHeight: '5px',
                              padding: '0 5px',
                              textAlign: 'center',
                            },
                            maintainAspectRatio: false,
                          }}
                          style={{ height: '', width: '' }}
                          data={[
                            {
                              sl: 1,
                              area: 'Number of Observation',
                              target: '?',
                              january: january26.m1,
                              february: februay26.m1,
                              march: march26.m1,
                              april: april26.m1,
                              may: may26.m1,
                              june: june26.m1,
                              july: july26.m1,
                              august: august26.m1,
                              september: september26.m1,
                              october: october26.m1,
                              november: november26.m1,
                              december: december26.m1,
                            },
                            {
                              sl: 2,
                              area: '1a. The teacher conducted the class activities following the  guidelines for use of the workbook and observed as necessary.',
                              target: '?',
                              january: january26.ind1a,
                              february: februay26.ind1a,
                              march: march26.ind1a,
                              april: april26.ind1a,
                              may: may26.ind1a,
                              june: june26.ind1a,
                              july: july26.ind1a,
                              august: august26.ind1a,
                              september: september26.ind1a,
                              october: october26.ind1a,
                              november: november26.ind1a,
                              december: december26.ind1a,
                            },
                            {
                              sl: 3,
                              area: '1b. Teachers follow the I do-we do-you do method in the classroom.',
                              target: '?',
                              january: january26.ind1b + '%',
                              february: februay26.ind1b + '%',
                              march: march26.ind1b + '%',
                              april: april26.ind1b + '%',
                              may: may26.ind1b + '%',
                              june: june26.ind1b + '%',
                              july: july26.ind1b + '%',
                              august: august26.ind1b + '%',
                              september: september26.ind1b + '%',
                              october: october26.ind1b + '%',
                              november: november26.ind1b + '%',
                              december: december26.ind1b + '%',
                            },
                            {
                              sl: 4,
                              area: '1c. The past observation form of students workbook work, books, notebooks and LF showed that the teacher followed the lesson consistently after the last visit.',
                              target: '?',
                              january: january26.ind1c + '%',
                              february: februay26.ind1c + '%',
                              march: march26.ind1c + '%',
                              april: april26.ind1c + '%',
                              may: may26.ind1c + '%',
                              june: june26.ind1c + '%',
                              july: july26.ind1c + '%',
                              august: august26.ind1c + '%',
                              september: september26.ind1c + '%',
                              october: october26.ind1c + '%',
                              november: november26.ind1c + '%',
                              december: december26.ind1c + '%',
                            },
                            {
                              sl: 5,
                              area: '1d. The teacher has consistently implemented all the tasks of the lesson within the stipulated time.',
                              target: '?%',
                              january: january26.ind1d + '%',
                              february: februay26.ind1d + '%',
                              march: march26.ind1d + '%',
                              april: april26.ind1d + '%',
                              may: may26.ind1d + '%',
                              june: june26.ind1d + '%',
                              july: july26.ind1d + '%',
                              august: august26.ind1d + '%',
                              september: september26.ind1d + '%',
                              october: october26.ind1d + '%',
                              november: november26.ind1d + '%',
                              december: december26.ind1d + '%',
                            },
                            {
                              sl: 6,
                              area: '1e. Teachers guide students to work in the workbook.',
                              target: '?%',
                              january: january26.ind1e + '%',
                              february: februay26.ind1e + '%',
                              march: march26.ind1e + '%',
                              april: april26.ind1e + '%',
                              may: may26.ind1e + '%',
                              june: june26.ind1e + '%',
                              july: july26.ind1e + '%',
                              august: august26.ind1e + '%',
                              september: september26.ind1e + '%',
                              october: october26.ind1e + '%',
                              november: november26.ind1e + '%',
                              december: december26.ind1e + '%',
                            },
                            {
                              sl: 7,
                              area: '1f. The teacher gave students the opportunity to read independently during the class.',
                              target: '?%',
                              january: january26.ind1f + '%',
                              february: februay26.ind1f + '%',
                              march: march26.ind1f + '%',
                              april: april26.ind1f + '%',
                              may: may26.ind1f + '%',
                              june: june26.ind1f + '%',
                              july: july26.ind1f + '%',
                              august: august26.ind1f + '%',
                              september: september26.ind1f + '%',
                              october: october26.ind1f + '%',
                              november: november26.ind1f + '%',
                              december: december26.ind1f + '%',
                            },
                            {
                              sl: 8,
                              area: '2a. The teacher has correctly pronounced the sounds of all the letters and words used in the phonics activity.',
                              target: '?%',
                              january: january26.ind2a + '%',
                              february: februay26.ind2a + '%',
                              march: march26.ind2a + '%',
                              april: april26.ind2a + '%',
                              may: may26.ind2a + '%',
                              june: june26.ind2a + '%',
                              july: july26.ind2a + '%',
                              august: august26.ind2a + '%',
                              september: september26.ind2a + '%',
                              october: october26.ind2a + '%',
                              november: november26.ind2a + '%',
                              december: december26.ind2a + '%',
                            },
                            {
                              sl: 9,
                              area: '2b. The teacher taught correct letter/hybrid reading or letter/hyphen and syllable reading and gave the students an opportunity to practice.',
                              target: '?%',
                              january: january26.ind2b + '%',
                              february: februay26.ind2b + '%',
                              march: march26.ind2b + '%',
                              april: april26.ind2b + '%',
                              may: may26.ind2b + '%',
                              june: june26.ind2b + '%',
                              july: july26.ind2b + '%',
                              august: august26.ind2b + '%',
                              september: september26.ind2b + '%',
                              october: october26.ind2b + '%',
                              november: november26.ind2b + '%',
                              december: december26.ind2b + '%',
                            },
                            {
                              sl: 10,
                              area: '2c. The teacher demonstrates fluent reading (reading with correct pace, correct pronunciation and expression) to the students.',
                              target: '?%',
                              january: january26.ind2c + '%',
                              february: februay26.ind2c + '%',
                              march: march26.ind2c + '%',
                              april: april26.ind2c + '%',
                              may: may26.ind2c + '%',
                              june: june26.ind2c + '%',
                              july: july26.ind2c + '%',
                              august: august26.ind2c + '%',
                              september: september26.ind2c + '%',
                              october: october26.ind2c + '%',
                              november: november26.ind2c + '%',
                              december: december26.ind2c + '%',
                            },
                            {
                              sl: 11,
                              area: '2d. The teacher gave students the opportunity to read several times individually or in pairs or groups.',
                              target: '?%',
                              january: january26.ind2d + '%',
                              february: februay26.ind2d + '%',
                              march: march26.ind2d + '%',
                              april: april26.ind2d + '%',
                              may: may26.ind2d + '%',
                              june: june26.ind2d + '%',
                              july: july26.ind2d + '%',
                              august: august26.ind2d + '%',
                              september: september26.ind2d + '%',
                              october: october26.ind2d + '%',
                              november: november26.ind2d + '%',
                              december: december26.ind2d + '%',
                            },

                            {
                              sl: 12,
                              area: '2e. The teacher has done the work of writing letters/hyphens/words/sentences as per instructions.',
                              target: '?%',
                              january: january26.ind2e + '%',
                              february: februay26.ind2e + '%',
                              march: march26.ind2e + '%',
                              april: april26.ind2e + '%',
                              may: may26.ind2e + '%',
                              june: june26.ind2e + '%',
                              july: july26.ind2e + '%',
                              august: august26.ind2e + '%',
                              september: september26.ind2e + '%',
                              october: october26.ind2e + '%',
                              november: november26.ind2e + '%',
                              december: december26.ind2e + '%',
                            },
                            {
                              sl: 13,
                              area: '3a. For correct answers, the teacher asked students helpful questions or taught them strategies for finding answers.',
                              target: '?%',
                              january: january26.ind3a + '%',
                              february: februay26.ind3a + '%',
                              march: march26.ind3a + '%',
                              april: april26.ind3a + '%',
                              may: may26.ind3a + '%',
                              june: june26.ind3a + '%',
                              july: july26.ind3a + '%',
                              august: august26.ind3a + '%',
                              september: september26.ind3a + '%',
                              october: october26.ind3a + '%',
                              november: november26.ind3a + '%',
                              december: december26.ind3a + '%',
                            },
                            {
                              sl: 14,
                              area: '3b. The teacher taught the vocabulary words with meaning and gave students opportunities to form new sentences using the words.',
                              target: '?%',
                              january: january26.ind3b + '%',
                              february: februay26.ind3b + '%',
                              march: march26.ind3b + '%',
                              april: april26.ind3b + '%',
                              may: may26.ind3b + '%',
                              june: june26.ind3b + '%',
                              july: july26.ind3b + '%',
                              august: august26.ind3b + '%',
                              september: september26.ind3b + '%',
                              october: october26.ind3b + '%',
                              november: november26.ind3b + '%',
                              december: december26.ind3b + '%',
                            },
                            {
                              sl: 15,
                              area: '3c. The teacher checked the student writing to ensure correct spelling and punctuation.',
                              target: '?%',
                              january: january26.ind3c + '%',
                              february: februay26.ind3c + '%',
                              march: march26.ind3c + '%',
                              april: april26.ind3c + '%',
                              may: may26.ind3c + '%',
                              june: june26.ind3c + '%',
                              july: july26.ind3c + '%',
                              august: august26.ind3c + '%',
                              september: september26.ind3c + '%',
                              october: october26.ind3c + '%',
                              november: november26.ind3c + '%',
                              december: december26.ind3c + '%',
                            },
                            {
                              sl: 16,
                              area: '3d. During the we do-you do task, the teacher checks whether the students have participated properly.',
                              target: '?%',
                              january: january26.ind3d + '%',
                              february: februay26.ind3d + '%',
                              march: march26.ind3d + '%',
                              april: april26.ind3d + '%',
                              may: may26.ind3d + '%',
                              june: june26.ind3d + '%',
                              july: july26.ind3d + '%',
                              august: august26.ind3d + '%',
                              september: september26.ind3d + '%',
                              october: october26.ind3d + '%',
                              november: november26.ind3d + '%',
                              december: december26.ind3d + '%',
                            },
                          ]}
                        />
                      </CCardBody>
                    </CCard>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )

  // return (
  //   <div>
  //     {/* Example of how to access the clean data */}
  //     <h3>February Milestone 2: {februay26.m2}%</h3>
  //     <h3>March Milestone 5: {march26.m5}%</h3>
  //   </div>
  // )
}

export default PrevailMilestone26New
