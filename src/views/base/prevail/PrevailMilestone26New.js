//  Author: Mohammad Jihad Hossain
//  Create Date: 12/03/2026
//  Modify Date: 11/05/2026
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
      return { m1: 0, mSchoolNumber: 0, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0, m7: 0, m8: 0 }

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
        monthlyBangla.filter(
          (i) =>
            i.ind12FollowedIDoWeDoYouDoStatus === 'Yes' ||
            i.ind12FollowedIDoWeDoYouDoStatus === 'N/A',
        ).length,
        monthlyBangla.length,
      ),
      m6: getPct(
        monthlyBangla.filter(
          (i) =>
            i.ind14ImplementedAllTaskInTimeStatus === 'Yes' ||
            i.ind14ImplementedAllTaskInTimeStatus === 'N/A',
        ).length,
        monthlyBangla.length,
      ),
      m7: getPct(
        monthlyBangla.filter(
          (i) =>
            i.ind13FollowedContinuityOfLessonStatus === 'Yes' ||
            i.ind13FollowedContinuityOfLessonStatus === 'N/A',
        ).length,
        monthlyBangla.length,
      ),
      m8: getPct(teacherPriorityCount, monthlyBangla.length),
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

                {/* <CAccordionItem itemKey={2}>
                    <CAccordionHeader>
                      <strong>Custom Report 2026(All Indicator Perfromance)</strong>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong></strong> <small></small>
                        </CCardHeader>
                        <CCardBody>
                          <CTable>
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell scope="col">Leading Indicator</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Target</CTableHeaderCell>
                                <CTableHeaderCell scope="col">January</CTableHeaderCell>
                                <CTableHeaderCell scope="col">February</CTableHeaderCell>
                                <CTableHeaderCell scope="col">March</CTableHeaderCell>
                                <CTableHeaderCell scope="col">April</CTableHeaderCell>
                                <CTableHeaderCell scope="col">May</CTableHeaderCell>
                                <CTableHeaderCell scope="col">June</CTableHeaderCell>
                                <CTableHeaderCell scope="col">July</CTableHeaderCell>
                                <CTableHeaderCell scope="col">August</CTableHeaderCell>
                                <CTableHeaderCell scope="col">September</CTableHeaderCell>
                                <CTableHeaderCell scope="col">October</CTableHeaderCell>
                                <CTableHeaderCell scope="col">November</CTableHeaderCell>
                                <CTableHeaderCell scope="col">December</CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              <CTableRow color="warning">
                                <CTableHeaderCell scope="row">
                                  Number of classrooms observed
                                </CTableHeaderCell>
                                <CTableDataCell>?#</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">
                                  {totalClassObservationOctober}
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col">
                                  {totalClassObservationNovember}
                                </CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="danger">
                                <CTableHeaderCell scope="row">
                                  1a. The teacher conducted the class activities following the
                                  guidelines for use of the workbook and observed as necessary.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1aOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1aNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="primary">
                                <CTableHeaderCell scope="row">
                                  1b. Teachers follow the I do-we do-you do method in the classroom.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1bOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1bNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="danger">
                                <CTableHeaderCell scope="row">
                                  1c. The past observation form of students workbook work, books,
                                  notebooks and LF showed that the teacher followed the lesson
                                  consistently after the last visit.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1cOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1cNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="secondary">
                                <CTableHeaderCell scope="row">
                                  1d. The teacher has consistently implemented all the tasks of the
                                  lesson within the stipulated time.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1dOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1dNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="success">
                                <CTableHeaderCell scope="row">
                                  1e. Teachers guide students to work in the workbook.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1eOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1eNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="danger">
                                <CTableHeaderCell scope="row">
                                  1f. The teacher gave students the opportunity to read independently
                                  during the class.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1fOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind1fNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="primary">
                                <CTableHeaderCell scope="row">
                                  2a. The teacher has correctly pronounced the sounds of all the
                                  letters and words used in the phonics activity.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2aOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2aNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="secondary">
                                <CTableHeaderCell scope="row">
                                  2b. The teacher taught correct letter/hybrid reading or
                                  letter/hyphen and syllable reading and gave the students an
                                  opportunity to practice.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2bOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2bNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="success">
                                <CTableHeaderCell scope="row">
                                  2c. The teacher demonstrates fluent reading (reading with correct
                                  pace, correct pronunciation and expression) to the students.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2cOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2cNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="danger">
                                <CTableHeaderCell scope="row">
                                  2d. The teacher gave students the opportunity to read several times
                                  individually or in pairs or groups.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2dOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2dNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="success">
                                <CTableHeaderCell scope="row">
                                  2e. The teacher has done the work of writing
                                  letters/hyphens/words/sentences as per instructions.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2eOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind2eNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="secondary">
                                <CTableHeaderCell scope="row">
                                  3a. For correct answers, the teacher asked students helpful
                                  questions or taught them strategies for finding answers.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3aOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3aNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="success">
                                <CTableHeaderCell scope="row">
                                  3b. The teacher taught the vocabulary words with meaning and gave
                                  students opportunities to form new sentences using the words.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3bOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3bNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="primary">
                                <CTableHeaderCell scope="row">
                                  3c. The teacher checked the student writing to ensure correct
                                  spelling and punctuation.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3cOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3cNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                              <CTableRow color="secondary">
                                <CTableHeaderCell scope="row">
                                  3d. During the we do-you do task, the teacher checks whether the
                                  students have participated properly.
                                </CTableHeaderCell>
                                <CTableDataCell>?%</CTableDataCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3dOctober}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">{ind3dNovember}%</CTableHeaderCell>
                                <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              </CTableRow>
                            </CTableBody>
                          </CTable>
                          <CButton onClick={exportToExcel}>Export to Excel</CButton>
                        </CCardBody>
                      </CCard>
                    </CAccordionBody>
                  </CAccordionItem> */}
                {/* <CAccordionItem itemKey={2}>
                    <CAccordionHeader>
                      <strong>Custom Report 2025</strong>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Teacher Priority vs LF Priority</strong> <small></small>
                        </CCardHeader>
                        <CCardBody>
                          <CChartBar
                            data={{
                              labels: [
                                'T-Priority-0 vs LF-Priority-1',
                                'T-Priority-0 vs LF-Priority-2',
                                'T-Priority-0 vs LF-Priority-3',
                                'T-Priority-1 vs LF-Priority-1',
                                'T-Priority-1 vs LF-Priority-2',
                                'T-Priority-1 vs LF-Priority-3',
                                'T-Priority-2 vs LF-Priority-1',
                                'T-Priority-2 vs LF-Priority-2',
                                'T-Priority-2 vs LF-Priority-3',
                                'T-Priority-3 vs LF-Priority-1',
                                'T-Priority-3 vs LF-Priority-2',
                                'T-Priority-3 vs LF-Priority-3',
                              ],
                              datasets: [
                                {
                                  label: ['Teacher'],
                                  backgroundColor: [
                                    '#5F564A',
                                    '#5F564A',
                                    '#5F564A',
                                    '#994263',
                                    '#994263',
                                    '#994263',
                                    '#00546B',
                                    '#00546B',
                                    '#00546B',
                                    '#A3C754',
                                    '#A3C754',
                                    '#A3C754',
                                  ],
                                  data: [14, 12, 21, 16, 24, 34, 16, 11, 27, 5, 23, 12],
                                },
                              ],
                            }}
                            labels="Grade wise Support Provided"
                            style={{ height: '400px', width: '1250px' }} // Inline style for height width
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  display: false,
                                  position: 'bottom',
                                },
                                title: {
                                  display: true,
                                  text: '',
                                },
                              },
                              scales: {
                                y: {
                                  beginAtZero: true,
                                  ticks: {
                                    color: '#333', // Custom tick color
                                  },
                                },
                                x: {
                                  ticks: {
                                    color: '#333',
                                  },
                                },
                              },
                            }}
                          />
                        </CCardBody>
                      </CCard>
                    </CAccordionBody>
                  </CAccordionItem> */}
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CRow>
          <CCol xs={12}>
            <CCard style={{ width: '1310px', height: '1000px' }}>
              <CCardHeader>
                <strong>All PREVAIL Bangla Observation Data</strong>
                <small>Total School-{allBanglaObsData.length}</small>
              </CCardHeader>
              <CCardBody>
                <CCardTitle></CCardTitle>
                <MaterialTable
                  title={'For filtering drag and drop the headers bellow'}
                  columns={[
                    {
                      title: 'Date',
                      field: 'date',
                      type: 'date',
                      sorting: 'true',
                    },
                    { title: 'School', field: 'school' },
                    {
                      title: 'Teacher',
                      field: 'classTeacher',
                    },
                    { title: 'Teacher Priority', field: 'teacherStatus', sorting: 'true' },
                    { title: 'LPO ID', field: 'lpo', type: 'string' },
                    { title: 'LPO Name', field: 'lpoName', type: 'string' },
                    {
                      title: 'LF ID',
                      field: 'lf',
                      type: 'string',
                    },
                    {
                      title: 'LF Name',
                      field: 'lfName',
                      type: 'string',
                    },
                    { title: 'Year', field: 'year', sorting: 'true' },
                    { title: 'Month', field: 'month', sorting: 'true' },
                    { title: 'District', field: 'district' },
                    { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                    { title: 'Office', field: 'fieldOffice', sorting: 'true' },
                    { title: 'Project', field: 'project', sorting: 'true' },

                    {
                      title: 'Grade',
                      field: 'grade',
                    },
                    {
                      title: 'Section',
                      field: 'section',
                    },
                    {
                      title: 'ClassStartTime',
                      field: 'classStartTime',
                    },
                    {
                      title: 'ClassEndTime',
                      field: 'classEndTime',
                    },

                    {
                      title: 'ContentName',
                      field: 'contentName',
                    },
                    {
                      title: 'PeriodDay',
                      field: 'periodDay',
                    },
                    {
                      title: 'TotalAdmittedStudent',
                      field: 'totalAdmittedStudent',
                      filtering: false,
                    },

                    {
                      title: 'TotalPresentStudent',
                      field: 'totalPresentStudent',
                      filtering: false,
                    },

                    {
                      title: 'Note',
                      field: 'note',
                    },

                    {
                      title: 'lastFollowupTopic1',
                      field: 'lastFollowupTopic1',
                      filtering: false,
                    },
                    {
                      title: 'lastFollowupTopic2',
                      field: 'lastFollowupTopic2',
                      filtering: false,
                    },
                    {
                      title: 'lastFollowupTopic3',
                      field: 'lastFollowupTopic3',
                      filtering: false,
                    },

                    {
                      title: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                      field: 'ind11TeacherFollowedTeacherGuideInClassStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind11TeacherFollowedTeacherGuideInClassNote',
                      field: 'ind11TeacherFollowedTeacherGuideInClassNote',
                      filtering: false,
                    },

                    {
                      title: 'ind12FollowedIDoWeDoYouDoStatus',
                      field: 'ind12FollowedIDoWeDoYouDoStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind12FollowedIDoWeDoYouDoNote',
                      field: 'ind12FollowedIDoWeDoYouDoNote',
                      filtering: false,
                    },

                    {
                      title: 'ind13FollowedContinuityOfLessonStatus',
                      field: 'ind13FollowedContinuityOfLessonStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind13FollowedContinuityOfLessonNote',
                      field: 'ind13FollowedContinuityOfLessonNote',
                      filtering: false,
                    },

                    {
                      title: 'ind14ImplementedAllTaskInTimeStatus',
                      field: 'ind14ImplementedAllTaskInTimeStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind14ImplementedAllTaskInTimeNote',
                      field: 'ind14ImplementedAllTaskInTimeNote',
                      filtering: false,
                    },

                    {
                      title: 'ind15InstructedToUseWorkbookStatus',
                      field: 'ind15InstructedToUseWorkbookStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind15InstructedToUseWorkbookNote',
                      field: 'ind15InstructedToUseWorkbookNote',
                      filtering: false,
                    },

                    {
                      title: 'ind16IndependentReadingOpportunityStatus',
                      field: 'ind16IndependentReadingOpportunityStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind16IndependentReadingOpportunityNote',
                      field: 'ind16IndependentReadingOpportunityNote',
                      filtering: false,
                    },

                    {
                      title: 'ind21CorrectlyPronouncedStatus',
                      field: 'ind21CorrectlyPronouncedStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind21CorrectlyPronouncedNote',
                      field: 'ind21CorrectlyPronouncedNote',
                      filtering: false,
                    },

                    {
                      title: 'ind22TaughtCorrectlyAllowPracticeStatus',
                      field: 'ind22TaughtCorrectlyAllowPracticeStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind22TaughtCorrectlyAllowPracticeNote',
                      field: 'ind22TaughtCorrectlyAllowPracticeNote',
                      filtering: false,
                    },

                    {
                      title: 'ind23DemonstratesFluentReadingStatus',
                      field: 'ind23DemonstratesFluentReadingStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind23DemonstratesFluentReadingNote',
                      field: 'ind23DemonstratesFluentReadingNote',
                      filtering: false,
                    },

                    {
                      title: 'ind24AllowReadIndividuallyPairGroupsStatus',
                      field: 'ind24AllowReadIndividuallyPairGroupsStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind24AllowReadIndividuallyPairGroupsNote',
                      field: 'ind24AllowReadIndividuallyPairGroupsNote',
                      filtering: false,
                    },

                    {
                      title: 'ind25FollowsInstructionsInWritingStatus',
                      field: 'ind25FollowsInstructionsInWritingStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind25FollowsInstructionsInWritingNote',
                      field: 'ind25FollowsInstructionsInWritingNote',
                      filtering: false,
                    },

                    {
                      title: 'ind31AskedHelpfulQuestionsStatus',
                      field: 'ind31AskedHelpfulQuestionsStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind31AskedHelpfulQuestionsNote',
                      field: 'ind31AskedHelpfulQuestionsNote',
                      filtering: false,
                    },

                    {
                      title: 'ind32TaughtVocabularyNewSentenceStatus',
                      field: 'ind32TaughtVocabularyNewSentenceStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind32TaughtVocabularyNewSentenceNote',
                      field: 'ind32TaughtVocabularyNewSentenceNote',
                      filtering: false,
                    },
                    {
                      title: 'ind33CheckWritingSpellingPunctuationStatus',
                      field: 'ind33CheckWritingSpellingPunctuationStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind33CheckWritingSpellingPunctuationNote',
                      field: 'ind33CheckWritingSpellingPunctuationNote',
                      filtering: false,
                    },

                    {
                      title: 'ind34CheckedWeDoYouDoStatus',
                      field: 'ind34CheckedWeDoYouDoStatus',
                      filtering: false,
                    },
                    {
                      title: 'ind34CheckedWeDoYouDoNote',
                      field: 'ind34CheckedWeDoYouDoNote',
                      filtering: false,
                    },

                    { title: 'bestPracticeInd1', field: 'bestPracticeInd1', filtering: false },
                    { title: 'bestPracticeInd2', field: 'bestPracticeInd2', filtering: false },

                    {
                      title: 'coachingSupportInd1',
                      field: 'coachingSupportInd1',
                      filtering: false,
                    },
                    {
                      title: 'coachingSupportInd2',
                      field: 'coachingSupportInd2',
                      filtering: false,
                    },

                    { title: 'agreedStatement1', field: 'agreedStatement1', filtering: false },
                    { title: 'agreedStatement2', field: 'agreedStatement2', filtering: false },

                    { title: 'question1', field: 'question1', filtering: false },

                    { title: 'student1', field: 'student1', filtering: false },
                    { title: 'student2', field: 'student2', filtering: false },
                    { title: 'student3', field: 'student3', filtering: false },

                    { title: 'noRightFor1', field: 'noRightFor1', filtering: false },
                    { title: 'noWrongFor1', field: 'noWrongFor1', filtering: false },
                    { title: 'totalFor1', field: 'totalFor1', filtering: false },
                    { title: 'noRightFor2', field: 'noRightFor2', filtering: false },
                    { title: 'noWrongFor2', field: 'noWrongFor2', filtering: false },
                    { title: 'totalFor2', field: 'totalFor2', filtering: false },
                    { title: 'noRightFor3', field: 'noRightFor3', filtering: false },
                    { title: 'noWrongFor3', field: 'noWrongFor3', filtering: false },
                    { title: 'totalFor3', field: 'totalFor3', filtering: false },
                  ]}
                  editable={{
                    onRowAdd: (newData) =>
                      new Promise((resolve) => {
                        handleRowAddBanglaClass(newData, resolve)
                      }),
                    // onRowDelete: (oldData) =>
                    //   new Promise((resolve) => {
                    //     handleRowDeleteBanglaClass(oldData, resolve)
                    //   }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve) => {
                        handleRowUpdateAllBanglaClass(newData, oldData, resolve)
                      }),
                  }}
                  options={{
                    exportButton: true,
                    exportAllData: true,
                    search: true,
                    filtering: true,
                    grouping: true,
                    sorting: true,
                    pageSize: 3,
                    pageSizeOptions: [5, 10, 20],
                    maxBodyHeight: '700px',
                    headerStyle: {
                      position: 'sticky',
                      top: 0,
                      backgroundColor: '#7e93b4ff',
                      fontWeight: 'bold',
                      width: 15,
                      textAlign: 'center',
                      color: '#0d0d0eff',
                      borderRight: '1px solid #0e0d0dff',
                      borderLeft: '1px solid #0e0d0dff',
                      borderStyle: 'solid',
                    },
                    rowStyle: {
                      fontSize: 14,
                      backgroundColor: '#E5DED4',
                      borderRight: '1px solid #131111ff',
                      borderLeft: '1px solid #0e0d0dff',
                      borderStyle: 'solid',
                    },
                    cellStyle: {
                      borderRight: '1px solid #0c0b0bff',
                      borderLeft: '1px solid #0e0d0dff',
                      borderBottom: '1px solid #0c0b0bff',
                      borderStyle: 'solid',
                    },
                    maintainAspectRatio: false,
                  }}
                  style={{ height: '300px', width: '1300px' }}
                  data={allBanglaObsData}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow> */}
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
