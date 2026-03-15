//  Author: Mohammad Jihad Hossain
//  Create Date: 12/03/2026
//  Modify Date: 12/03/2026
//  Description: P Milestone 26  file

import React, { useState, useEffect } from 'react'
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
import { BorderBottom } from '@material-ui/icons'

// File save as XLSX
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
// File save as XLSX

//Icon
//Icon

const PrevailMilestone26 = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allLFObservationData, setAllLFObservationData] = useState([])

  const [allBanglaObsData, setAllBanglaObsData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])

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
      await getAllBanglaClass(console.log('get bangla class called'))
      await getAllLFObservation(console.log('get LF observation called'))
      await getAllTeacher(console.log('get teacher class called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All LFObservation Data
  const getAllLFObservation = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-lf-observation', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLFObservationData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All LFObservation Data

  // Get All Teacher
  const getAllTeacher = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-teacher', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllTeacherData(response.data)

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Teacher

  // Get All Book-checkout Data for school
  const getAllBanglaClass = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/p-bangla-class', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBanglaObsData(response.data)
      setIsLoading(false)
      console.log('Data:' + response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Book-checkout Data for school

  // Teacher filter data
  const g1Teacher = allTeacherData.filter((item) => {
    return item.instructionG1 === '1'
  }).length

  const g2Teacher = allTeacherData.filter((item) => {
    return item.instructionG2 === '1'
  }).length
  // Teacher filter data

  // Bangla Observation Data by filter

  // Total number monthly
  const totalClassObservationSeptember = allBanglaObsData.filter((item) => {
    return item.month === 'September' && item.year === '2025' && item.teacherStatus
  }).length

  const totalClassObservationOctober = allBanglaObsData.filter((item) => {
    return item.month === 'October' && item.year === '2025' && item.teacherStatus
  }).length

  const totalClassObservationNovember = allBanglaObsData.filter((item) => {
    return item.month === 'November' && item.year === '2025' && item.teacherStatus
  }).length

  const totalClassObservationDecember = allBanglaObsData.filter((item) => {
    return item.month === 'December' && item.year === '2025' && item.teacherStatus
  }).length
  // Total number monthly

  // PREVAIL Milestone 26
  const milestone1February26 = allBanglaObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus
  }).length

  const feb26SchoolObs = allBanglaObsData.filter((item) => {
    return item.month === 'February' && item.year === '2026' && item.teacherStatus
  })

  const feb26SchoolObsUniqSchool = feb26SchoolObs.map((item) => item.school)

  const milestone2February26 = ((new Set(feb26SchoolObsUniqSchool).size / 495) * 100).toFixed(0)

  const milestone3February26 = (
    (new Set(
      allBanglaObsData
        .filter((item) => {
          return item.month === 'February' && item.year === '2026' && item.teacherStatus
        })
        .map((item) => item.school),
    ).size /
      495) *
    100
  ).toFixed(0)

  const milestone4February26 = 0

  const milestone5February26 = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'February' &&
        item.year === '2026' &&
        item.teacherStatus &&
        (item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' ||
          item.ind12FollowedIDoWeDoYouDoStatus === 'N/A')
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'February' && item.year === '2026' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone6February26 = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'February' &&
        item.year === '2026' &&
        item.teacherStatus &&
        (item.ind14ImplementedAllTaskInTimeStatus === 'Yes' ||
          item.ind14ImplementedAllTaskInTimeStatus === 'N/A')
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'February' && item.year === '2026' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone7February26 = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'February' &&
        item.year === '2026' &&
        item.teacherStatus &&
        (item.ind13FollowedContinuityOfLessonStatus === 'Yes' ||
          item.ind13FollowedContinuityOfLessonStatus === 'N/A')
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'February' && item.year === '2026' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone8February26 = (
    ((allBanglaObsData.filter((item) => {
      return (
        item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 1'
      )
    }).length +
      allBanglaObsData.filter((item) => {
        return (
          item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 2'
        )
      }).length +
      allBanglaObsData.filter((item) => {
        return (
          item.month === 'February' && item.year === '2026' && item.teacherStatus === 'Priority 3'
        )
      }).length) /
      allBanglaObsData.filter((item) => {
        return item.month === 'February' && item.teacherStatus && item.year === '2026'
      }).length) *
    100
  ).toFixed(0)
  // PREVAIL Milestone 26

  // All Percent Value
  // Milestone1 monthly
  const milestone1September = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'September' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(0)

  const milestone1October = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'October' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(0)

  const milestone1November = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'November' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(0)

  const milestone1December = (
    ((allLFObservationData.filter((item) => {
      return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 1'
    }).length +
      allLFObservationData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.lfStatus === 'Priority 2'
      }).length) /
      allLFObservationData.filter((item) => {
        return item.month === 'December' && item.lfStatus && item.year === '2025'
      }).length) *
    100
  ).toFixed(0)
  // Milestone1 monthly

  // Milestone2 monthly
  const milestone2September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone2October = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone2November = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone2December = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'December' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)
  // Milestone2 monthly

  // Milestone3 monthly
  const milestone3September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone3October = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone3November = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone3December = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'December' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)
  // Milestone3 monthly

  // Milestone4 monthly
  const milestone4September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone4October = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone4November = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone4December = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'December' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)
  // Milestone4 monthly

  // Milestone5 monthly
  const milestone5September = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'September' && item.year === '2025' && item.teacherStatus != 'Priority 0'
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'September' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone5October = (
    (allBanglaObsData.filter((item) => {
      return item.month === 'October' && item.year === '2025' && item.teacherStatus != 'Priority 0'
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone5November = (
    (allBanglaObsData.filter((item) => {
      return item.month === 'November' && item.year === '2025' && item.teacherStatus != 'Priority 0'
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const milestone5December = (
    (allBanglaObsData.filter((item) => {
      return item.month === 'December' && item.year === '2025' && item.teacherStatus != 'Priority 0'
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'December' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)
  // Milestone5 monthly

  // Custom report All indicator
  // October
  const ind1aOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1bOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1cOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1dOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind14ImplementedAllTaskInTimeStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1eOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind15InstructedToUseWorkbookStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1fOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind16IndependentReadingOpportunityStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2aOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind21CorrectlyPronouncedStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2bOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind22TaughtCorrectlyAllowPracticeStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2cOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind23DemonstratesFluentReadingStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2dOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind24AllowReadIndividuallyPairGroupsStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2eOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind25FollowsInstructionsInWritingStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3aOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind31AskedHelpfulQuestionsStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3bOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind32TaughtVocabularyNewSentenceStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3cOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind33CheckWritingSpellingPunctuationStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3dOctober = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'October' &&
        item.year === '2025' &&
        item.ind34CheckedWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'October' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)
  // October

  // November
  const ind1aNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind11TeacherFollowedTeacherGuideInClassStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1bNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind12FollowedIDoWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1cNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind13FollowedContinuityOfLessonStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1dNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind14ImplementedAllTaskInTimeStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1eNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind15InstructedToUseWorkbookStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind1fNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind16IndependentReadingOpportunityStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2aNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind21CorrectlyPronouncedStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2bNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind22TaughtCorrectlyAllowPracticeStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2cNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind23DemonstratesFluentReadingStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2dNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind24AllowReadIndividuallyPairGroupsStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind2eNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind25FollowsInstructionsInWritingStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3aNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind31AskedHelpfulQuestionsStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3bNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind32TaughtVocabularyNewSentenceStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3cNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind33CheckWritingSpellingPunctuationStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)

  const ind3dNovember = (
    (allBanglaObsData.filter((item) => {
      return (
        item.month === 'November' &&
        item.year === '2025' &&
        item.ind34CheckedWeDoYouDoStatus === 'Yes' &&
        item.teacherStatus
      )
    }).length /
      allBanglaObsData.filter((item) => {
        return item.month === 'November' && item.year === '2025' && item.teacherStatus
      }).length) *
    100
  ).toFixed(0)
  // November
  // Custom report All indicator

  // Bangla Observation Data by filter
  // All Percent Value

  // File save as XLSX
  // const exportToExcel = (data, fileName) => {
  //   const worksheet = XLSX.utils.json_to_sheet(data)
  //   const workbook = XLSX.utils.book_new()
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
  //   const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  //   saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`)
  // }

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToExcel = (apiData, fileName) => {
    // Create a worksheet from the JSON data
    const ws = XLSX.utils.json_to_sheet(apiData)

    // Create a new workbook and append the worksheet
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] }

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })

    // Create a Blob and save the file
    const data = new Blob([excelBuffer], { type: fileType })
    saveAs(data, fileName + fileExtension)
  }
  // File save as XLSX

  // Row update function
  const handleRowUpdateAllBanglaClass = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/p-bangla-class/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allBanglaObsData]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllBanglaObsData([...dataUpdate])
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
  // Row add function
  const handleRowAddBanglaClass = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/p-bangla-class/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allBanglaObsData]
          dataToAdd.push(newData)
          setAllBanglaObsData([...dataToAdd])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Add BanglaClass failed! Server error'])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }
  // Row add function

  // Row delete function
  const handleRowDeleteBanglaClass = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/p-bangla-class/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allBanglaObsData]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllBanglaObsData([...dataDelete])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
        })
        .catch((error) => {
          setErrorMessages(['Delete failed! Server error'])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }
  // Row delete function

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
                              <CTableDataCell>?</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone1February26}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">
                                % of schools visited atleast once
                              </CTableHeaderCell>
                              <CTableDataCell>?</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone2February26}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="warning">
                              <CTableHeaderCell scope="row">
                                Number of working days
                              </CTableHeaderCell>
                              <CTableDataCell>?</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">
                                % of the Literacy Facilitators at Basic and above levels of coaching
                                skills at the end of year 1
                              </CTableHeaderCell>
                              <CTableDataCell>80%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone4February26}
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="danger">
                              <CTableHeaderCell scope="row">
                                % Bangla teachers have adopted key instructional practices (I do-We
                                do-You do, engaging students in individual and group work,
                                assessments)
                              </CTableHeaderCell>
                              <CTableDataCell>70%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone5February26}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                % of teachers able to complete all planned activities in sequence
                                and on time (1d).
                              </CTableHeaderCell>
                              <CTableDataCell>50%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone6February26}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="primary">
                              <CTableHeaderCell scope="row">
                                % of observed Bangla teachers that are following use of workbooks
                                during the Bangla language classes
                              </CTableHeaderCell>
                              <CTableDataCell>90%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone7February26}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                            <CTableRow color="success">
                              <CTableHeaderCell scope="row">
                                % of Bangla teachers achieved ‘Mastered Instructional Routine’ level
                                or above as observed by the Literacy Facilitators during the Bangla
                                class observation
                              </CTableHeaderCell>
                              <CTableDataCell>60%</CTableDataCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">
                                {milestone8February26}%
                              </CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                              <CTableHeaderCell scope="col">0</CTableHeaderCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
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
}

export default PrevailMilestone26
