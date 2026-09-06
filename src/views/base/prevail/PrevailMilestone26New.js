//  Author: Mohammad Jihad Hossain
//  Create Date: 12/03/2026
//  Modify Date: 17/08/2026
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
    ppObs: [],
  })

  const [milestoneData26, setMilestoneData26] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Execute all requests in parallel for speed
        const [banglaRes, lfRes, teacherRes, ppRes] = await Promise.all([
          axios.get(`${BASE_URL}/p-bangla-class`),
          axios.get(`${BASE_URL}/p-lf-observation`),
          axios.get(`${BASE_URL}/p-teacher`),
          axios.get(`${BASE_URL}/p-preprimary`),
        ])

        setAllData({
          bangla: banglaRes.data,
          lfObs: lfRes.data,
          teachers: teacherRes.data,
          ppObs: ppRes.data,
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
    const { bangla, lfObs, teachers, ppObs } = data

    // 1. Pre-filter common datasets to save performance

    // M7: Number of classroom observed
    const monthlyBangla = bangla.filter(
      (item) => item.month === month && item.year === year && item.teacherStatus,
    )

    // M71: Number of classroom observed G1
    const monthlyBanglaG1 = bangla.filter(
      (item) =>
        item.month === month && item.year === year && item.grade === 'G1' && item.teacherStatus,
    )

    // M72: Number of classroom observed G1
    const monthlyBanglaG2 = bangla.filter(
      (item) =>
        item.month === month && item.year === year && item.grade === 'G2' && item.teacherStatus,
    )

    // M73: Number of classroom observed G1
    const monthlyBanglaG3 = bangla.filter(
      (item) =>
        item.month === month && item.year === year && item.grade === 'G3' && item.teacherStatus,
    )

    // M8: Number of PP classroom observed
    const monthlyPP = ppObs.filter(
      (item) => item.month === month && item.year === year && item.teacherStatus,
    )

    const monthlyLF = lfObs.filter(
      (item) => item.month === month && item.year === year && item.lfStatus,
    )

    if (monthlyBangla.length === 0)
      return {
        m1: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        m5: 0,
        m6: 0,
        m7: 0,
        m71: 0,
        m72: 0,
        m73: 0,
        m8: 0,
        m9: 0,
        m91: 0,
        m92: 0,
        m93: 0,
        m10: 0,
        m101: 0,
        m102: 0,
        m103: 0,
        m11: 0,
        m111: 0,
        m112: 0,
        m113: 0,
        m12: 0,
        m121: 0,
        m122: 0,
        m123: 0,

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

    // M3: LFs visited monthly by LPOs
    const monthlyLFUniqNum = lfObs
      .filter((item) => item.month === month && item.year === year && item.lfStatus)
      .filter((value, index, self) => index === self.findIndex((t) => t.lf === value.lf))

    // M4: LF Priority 2 & 3
    const lfPriorityCount = monthlyLF.filter(
      (item) => item.lfStatus === 'Priority 2' || item.lfStatus === 'Priority 3',
    ).length

    // M5:  Number of School observed
    const numberSchool26 = new Set(monthlyBangla.map((item) => item.rtrSchoolId)).size

    // M5: Unique Schools
    const uniqueSchools = new Set(monthlyBangla.map((item) => item.rtrSchoolId)).size

    // M12: Teacher Priority 1, 2, & 3
    const teacherPriorityCount = monthlyBangla.filter((item) =>
      ['Priority 1', 'Priority 2', 'Priority 3'].includes(item.teacherStatus),
    ).length

    const teacherPriorityCountG1 = monthlyBangla.filter(
      (item) =>
        ['Priority 1', 'Priority 2', 'Priority 3'].includes(item.teacherStatus) &&
        item.grade === 'G1',
    ).length

    const teacherPriorityCountG2 = monthlyBangla.filter(
      (item) =>
        ['Priority 1', 'Priority 2', 'Priority 3'].includes(item.teacherStatus) &&
        item.grade === 'G2',
    ).length

    const teacherPriorityCountG3 = monthlyBangla.filter(
      (item) =>
        ['Priority 1', 'Priority 2', 'Priority 3'].includes(item.teacherStatus) &&
        item.grade === 'G3',
    ).length

    // Milestone logic
    return {
      // M3
      m3: monthlyLFUniqNum.length,
      // M4
      m4: getPct(lfPriorityCount, monthlyLF.length),
      // M5
      m5: numberSchool26,
      // M6
      m6: getPct(uniqueSchools, 494),
      // M7
      m7: monthlyBangla.length,
      // M7.1
      m71: monthlyBanglaG1.length,
      // M7.2
      m72: monthlyBanglaG2.length,
      // M7.3
      m73: monthlyBanglaG3.length,

      // M8
      m8: monthlyPP.length,

      // M9
      m9: getPct(
        monthlyBangla.filter((i) => i.ind12FollowedIDoWeDoYouDoStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      // M91
      m91: getPct(
        monthlyBangla.filter((i) => i.ind12FollowedIDoWeDoYouDoStatus === 'Yes' && i.grade === 'G1')
          .length,
        monthlyBangla.filter((i) => i.grade === 'G1').length,
      ),
      // M92
      m92: getPct(
        monthlyBangla.filter((i) => i.ind12FollowedIDoWeDoYouDoStatus === 'Yes' && i.grade === 'G2')
          .length,
        monthlyBangla.filter((i) => i.grade === 'G2').length,
      ),
      // M93
      m93: getPct(
        monthlyBangla.filter((i) => i.ind12FollowedIDoWeDoYouDoStatus === 'Yes' && i.grade === 'G3')
          .length,
        monthlyBangla.filter((i) => i.grade === 'G3').length,
      ),

      // M10
      m10: getPct(
        monthlyBangla.filter((i) => i.ind14ImplementedAllTaskInTimeStatus === 'Yes').length,
        monthlyBangla.length,
      ),
      // M101
      m101: getPct(
        monthlyBangla.filter(
          (i) => i.ind14ImplementedAllTaskInTimeStatus === 'Yes' && i.grade === 'G1',
        ).length,
        monthlyBangla.filter((i) => i.grade === 'G1').length,
      ),
      // M102
      m102: getPct(
        monthlyBangla.filter(
          (i) => i.ind14ImplementedAllTaskInTimeStatus === 'Yes' && i.grade === 'G2',
        ).length,
        monthlyBangla.filter((i) => i.grade === 'G2').length,
      ),
      // M103
      m103: getPct(
        monthlyBangla.filter(
          (i) => i.ind14ImplementedAllTaskInTimeStatus === 'Yes' && i.grade === 'G3',
        ).length,
        monthlyBangla.filter((i) => i.grade === 'G3').length,
      ),

      // M11
      m11: getPct(
        monthlyBangla.filter((i) => i.ind13FollowedContinuityOfLessonStatus === 'Yes').length,
        monthlyBangla.length,
      ),

      // M111
      m111: getPct(
        monthlyBangla.filter(
          (i) => i.ind13FollowedContinuityOfLessonStatus === 'Yes' && i.grade === 'G1',
        ).length,
        monthlyBangla.filter((i) => i.grade === 'G1').length,
      ),

      // M112
      m112: getPct(
        monthlyBangla.filter(
          (i) => i.ind13FollowedContinuityOfLessonStatus === 'Yes' && i.grade === 'G2',
        ).length,
        monthlyBangla.filter((i) => i.grade === 'G2').length,
      ),

      // M113
      m113: getPct(
        monthlyBangla.filter(
          (i) => i.ind13FollowedContinuityOfLessonStatus === 'Yes' && i.grade === 'G3',
        ).length,
        monthlyBangla.filter((i) => i.grade === 'G3').length,
      ),

      // M12
      m12: getPct(teacherPriorityCount, monthlyBangla.length),

      // M121
      m121: getPct(
        teacherPriorityCountG1,
        monthlyBangla.filter((i) => i.grade === 'G1' && i.teacherStatus).length,
      ),

      // M122
      m122: getPct(
        teacherPriorityCountG2,
        monthlyBangla.filter((i) => i.grade === 'G2' && i.teacherStatus).length,
      ),

      // M123
      m123: getPct(
        teacherPriorityCountG3,
        monthlyBangla.filter((i) => i.grade === 'G3' && i.teacherStatus).length,
      ),

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
                              area: 'Number of School in PREVAIL project Narail',
                              target: '?',
                              january: '494',
                              february: '494',
                              march: '494',
                              april: '494',
                              may: '494',
                              june: '494',
                              july: '494',
                              august: '494',
                              september: '494',
                              october: '494',
                              november: '494',
                              december: '494',
                            },
                            {
                              sl: 2,
                              area: 'Number of working days',
                              target: '?',
                              january: '21',
                              february: '11',
                              march: '3',
                              april: '11',
                              may: '18',
                              june: '21',
                              july: '22',
                              august: '19',
                              september: '20',
                              october: '14',
                              november: '21',
                              december: '14',
                            },
                            {
                              sl: 3,
                              area: 'Number of LFs observed by LPO',
                              target: '?',
                              january: january26.m3,
                              february: februay26.m3,
                              march: march26.m3,
                              april: april26.m3,
                              may: may26.m3,
                              june: june26.m3,
                              july: july26.m3,
                              august: august26.m3,
                              september: september26.m3,
                              october: october26.m3,
                              november: november26.m3,
                              december: december26.m3,
                            },
                            {
                              sl: 4,
                              area: '% of the Literacy Facilitators at Basic and above levels of coaching  skills at the end of year 1(P2&P3)',
                              target: '90%',
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
                              sl: 5,
                              area: 'Number of School Visited',
                              target: '?',
                              january: january26.m5,
                              february: februay26.m5,
                              march: march26.m5,
                              april: april26.m5,
                              may: may26.m5,
                              june: june26.m5,
                              july: july26.m5,
                              august: august26.m5,
                              september: september26.m5,
                              october: october26.m5,
                              november: november26.m5,
                              december: december26.m5,
                            },
                            {
                              sl: 6,
                              area: '% of schools visited atleast once',
                              target: '?',
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
                              sl: 7,
                              area: 'Number of classrooms observed Bangla',
                              target: '?',
                              january: january26.m7,
                              february: februay26.m7,
                              march: march26.m7,
                              april: april26.m7,
                              may: may26.m7,
                              june: june26.m7,
                              july: july26.m7,
                              august: august26.m7,
                              september: september26.m7,
                              october: october26.m7,
                              november: november26.m7,
                              december: december26.m7,
                            },
                            {
                              sl: 7.1,
                              area: 'G1',
                              target: '?',
                              january: january26.m71,
                              february: februay26.m71,
                              march: march26.m71,
                              april: april26.m71,
                              may: may26.m71,
                              june: june26.m71,
                              july: july26.m71,
                              august: august26.m71,
                              september: september26.m71,
                              october: october26.m71,
                              november: november26.m71,
                              december: december26.m71,
                            },
                            {
                              sl: 7.2,
                              area: 'G2',
                              target: '?',
                              january: january26.m72,
                              february: februay26.m72,
                              march: march26.m72,
                              april: april26.m72,
                              may: may26.m72,
                              june: june26.m72,
                              july: july26.m72,
                              august: august26.m72,
                              september: september26.m72,
                              october: october26.m72,
                              november: november26.m72,
                              december: december26.m72,
                            },
                            {
                              sl: 7.3,
                              area: 'G3',
                              target: '?',
                              january: january26.m73,
                              february: februay26.m73,
                              march: march26.m73,
                              april: april26.m73,
                              may: may26.m73,
                              june: june26.m73,
                              july: july26.m73,
                              august: august26.m73,
                              september: september26.m73,
                              october: october26.m73,
                              november: november26.m73,
                              december: december26.m73,
                            },
                            {
                              sl: 8,
                              area: 'Number of classrooms observed PPE',
                              target: '?',
                              january: january26.m8,
                              february: februay26.m8,
                              march: march26.m8,
                              april: april26.m8,
                              may: may26.m8,
                              june: june26.m8,
                              july: july26.m8,
                              august: august26.m8,
                              september: september26.m8,
                              october: october26.m8,
                              november: november26.m8,
                              december: december26.m8,
                            },
                            {
                              sl: 9,
                              area: '% Bangla teachers have adopted key instructional practices (I do-We do-You do, engaging students in individual and group work, assessments)(1b)',
                              target: '80%',
                              january: january26.m9 + '%',
                              february: februay26.m9 + '%',
                              march: march26.m9 + '%',
                              april: april26.m9 + '%',
                              may: may26.m9 + '%',
                              june: june26.m9 + '%',
                              july: july26.m9 + '%',
                              august: august26.m9 + '%',
                              september: september26.m9 + '%',
                              october: october26.m9 + '%',
                              november: november26.m9 + '%',
                              december: december26.m9 + '%',
                            },
                            {
                              sl: 9.1,
                              area: 'G1: (1b)',
                              target: '80%',
                              january: january26.m91 + '%',
                              february: februay26.m91 + '%',
                              march: march26.m91 + '%',
                              april: april26.m91 + '%',
                              may: may26.m91 + '%',
                              june: june26.m91 + '%',
                              july: july26.m91 + '%',
                              august: august26.m91 + '%',
                              september: september26.m91 + '%',
                              october: october26.m91 + '%',
                              november: november26.m91 + '%',
                              december: december26.m91 + '%',
                            },
                            {
                              sl: 9.2,
                              area: 'G2: (1b)',
                              target: '80%',
                              january: january26.m92 + '%',
                              february: februay26.m92 + '%',
                              march: march26.m92 + '%',
                              april: april26.m92 + '%',
                              may: may26.m92 + '%',
                              june: june26.m92 + '%',
                              july: july26.m92 + '%',
                              august: august26.m92 + '%',
                              september: september26.m92 + '%',
                              october: october26.m92 + '%',
                              november: november26.m92 + '%',
                              december: december26.m92 + '%',
                            },
                            {
                              sl: 9.3,
                              area: 'G3: (1b)',
                              target: '70%',
                              january: january26.m93 + '%',
                              february: februay26.m93 + '%',
                              march: march26.m93 + '%',
                              april: april26.m93 + '%',
                              may: may26.m93 + '%',
                              june: june26.m93 + '%',
                              july: july26.m93 + '%',
                              august: august26.m93 + '%',
                              september: september26.m93 + '%',
                              october: october26.m93 + '%',
                              november: november26.m93 + '%',
                              december: december26.m93 + '%',
                            },
                            {
                              sl: 10,
                              area: '% of teachers able to complete all planned activities in sequence and on time (1d).',
                              target: '70%',
                              january: january26.m10 + '%',
                              february: februay26.m10 + '%',
                              march: march26.m10 + '%',
                              april: april26.m10 + '%',
                              may: may26.m10 + '%',
                              june: june26.m10 + '%',
                              july: july26.m10 + '%',
                              august: august26.m10 + '%',
                              september: september26.m10 + '%',
                              october: october26.m10 + '%',
                              november: november26.m10 + '%',
                              december: december26.m10 + '%',
                            },
                            {
                              sl: 10.1,
                              area: 'G1: (1d)',
                              target: '70%',
                              january: january26.m101 + '%',
                              february: februay26.m101 + '%',
                              march: march26.m101 + '%',
                              april: april26.m101 + '%',
                              may: may26.m101 + '%',
                              june: june26.m101 + '%',
                              july: july26.m101 + '%',
                              august: august26.m101 + '%',
                              september: september26.m101 + '%',
                              october: october26.m101 + '%',
                              november: november26.m101 + '%',
                              december: december26.m101 + '%',
                            },
                            {
                              sl: 10.2,
                              area: 'G2: (1d)',
                              target: '70%',
                              january: january26.m102 + '%',
                              february: februay26.m102 + '%',
                              march: march26.m102 + '%',
                              april: april26.m102 + '%',
                              may: may26.m102 + '%',
                              june: june26.m102 + '%',
                              july: july26.m102 + '%',
                              august: august26.m102 + '%',
                              september: september26.m102 + '%',
                              october: october26.m102 + '%',
                              november: november26.m102 + '%',
                              december: december26.m102 + '%',
                            },
                            {
                              sl: 10.3,
                              area: 'G3: (1d)',
                              target: '50%',
                              january: january26.m103 + '%',
                              february: februay26.m103 + '%',
                              march: march26.m103 + '%',
                              april: april26.m103 + '%',
                              may: may26.m103 + '%',
                              june: june26.m103 + '%',
                              july: july26.m103 + '%',
                              august: august26.m103 + '%',
                              september: september26.m103 + '%',
                              october: october26.m103 + '%',
                              november: november26.m103 + '%',
                              december: december26.m103 + '%',
                            },
                            {
                              sl: 11,
                              area: '% of observed Bangla teachers that are following use of workbooks during the Bangla language classes(1c)',
                              target: '90%',
                              january: january26.m11 + '%',
                              february: februay26.m11 + '%',
                              march: march26.m11 + '%',
                              april: april26.m11 + '%',
                              may: may26.m11 + '%',
                              june: june26.m11 + '%',
                              july: july26.m11 + '%',
                              august: august26.m11 + '%',
                              september: september26.m11 + '%',
                              october: october26.m11 + '%',
                              november: november26.m11 + '%',
                              december: december26.m11 + '%',
                            },
                            {
                              sl: 11.1,
                              area: 'G1: (1c)',
                              target: '90%',
                              january: january26.m111 + '%',
                              february: februay26.m111 + '%',
                              march: march26.m111 + '%',
                              april: april26.m111 + '%',
                              may: may26.m111 + '%',
                              june: june26.m111 + '%',
                              july: july26.m111 + '%',
                              august: august26.m111 + '%',
                              september: september26.m111 + '%',
                              october: october26.m111 + '%',
                              november: november26.m111 + '%',
                              december: december26.m111 + '%',
                            },
                            {
                              sl: 11.2,
                              area: 'G2: (1c)',
                              target: '90%',
                              january: january26.m112 + '%',
                              february: februay26.m112 + '%',
                              march: march26.m112 + '%',
                              april: april26.m112 + '%',
                              may: may26.m112 + '%',
                              june: june26.m112 + '%',
                              july: july26.m112 + '%',
                              august: august26.m112 + '%',
                              september: september26.m112 + '%',
                              october: october26.m112 + '%',
                              november: november26.m112 + '%',
                              december: december26.m112 + '%',
                            },
                            {
                              sl: 11.3,
                              area: 'G3: (1c)',
                              target: '70%',
                              january: january26.m113 + '%',
                              february: februay26.m113 + '%',
                              march: march26.m113 + '%',
                              april: april26.m113 + '%',
                              may: may26.m113 + '%',
                              june: june26.m113 + '%',
                              july: july26.m113 + '%',
                              august: august26.m113 + '%',
                              september: september26.m113 + '%',
                              october: october26.m113 + '%',
                              november: november26.m113 + '%',
                              december: december26.m113 + '%',
                            },
                            {
                              sl: 12,
                              area: '% of Bangla teachers achieved ‘Mastered Instructional Routine’ level or above as observed by the Literacy Facilitators during the Bangla class observation(P1,P2,P3)',
                              target: '75%',
                              january: january26.m12 + '%',
                              february: februay26.m12 + '%',
                              march: march26.m12 + '%',
                              april: april26.m12 + '%',
                              may: may26.m12 + '%',
                              june: june26.m12 + '%',
                              july: july26.m12 + '%',
                              august: august26.m12 + '%',
                              september: september26.m12 + '%',
                              october: october26.m12 + '%',
                              november: november26.m12 + '%',
                              december: december26.m12 + '%',
                            },
                            {
                              sl: 12.1,
                              area: 'G1: ‘(P1,P2,P3)’',
                              target: '75%',
                              january: january26.m121 + '%',
                              february: februay26.m121 + '%',
                              march: march26.m121 + '%',
                              april: april26.m121 + '%',
                              may: may26.m121 + '%',
                              june: june26.m121 + '%',
                              july: july26.m121 + '%',
                              august: august26.m121 + '%',
                              september: september26.m121 + '%',
                              october: october26.m121 + '%',
                              november: november26.m121 + '%',
                              december: december26.m121 + '%',
                            },
                            {
                              sl: 12.2,
                              area: 'G2: ‘(P1,P2,P3)’',
                              target: '75%',
                              january: january26.m122 + '%',
                              february: februay26.m122 + '%',
                              march: march26.m122 + '%',
                              april: april26.m122 + '%',
                              may: may26.m122 + '%',
                              june: june26.m122 + '%',
                              july: july26.m122 + '%',
                              august: august26.m122 + '%',
                              september: september26.m122 + '%',
                              october: october26.m122 + '%',
                              november: november26.m122 + '%',
                              december: december26.m122 + '%',
                            },
                            {
                              sl: 12.3,
                              area: 'G3: ‘(P1,P2,P3)’',
                              target: '60%',
                              january: january26.m123 + '%',
                              february: februay26.m123 + '%',
                              march: march26.m123 + '%',
                              april: april26.m123 + '%',
                              may: may26.m123 + '%',
                              june: june26.m123 + '%',
                              july: july26.m123 + '%',
                              august: august26.m123 + '%',
                              september: september26.m123 + '%',
                              october: october26.m123 + '%',
                              november: november26.m123 + '%',
                              december: december26.m123 + '%',
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
                              january: january26.ind1a + '%',
                              february: februay26.ind1a + '%',
                              march: march26.ind1a + '%',
                              april: april26.ind1a + '%',
                              may: may26.ind1a + '%',
                              june: june26.ind1a + '%',
                              july: july26.ind1a + '%',
                              august: august26.ind1a + '%',
                              september: september26.ind1a + '%',
                              october: october26.ind1a + '%',
                              november: november26.ind1a + '%',
                              december: december26.ind1a + '%',
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
