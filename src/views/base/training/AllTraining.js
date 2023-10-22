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

const AllTraining = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [allStudentData, setAllStudentData] = useState([])

  const [allTeacherData, setAllTeacherData] = useState([])

  // Area wise student
  const [kutubdiaStudent, setKutubdiaStudent] = useState([])
  const [ukhiyaStudent, setUkhiyaStudent] = useState([])
  // Area wise student

  // Gender wise student
  const [maleStudent, setMaleStudent] = useState([])
  const [femaleStudent, setFemaleStudent] = useState([])
  // Gender wise student

  // Report Data
  const [reportData, setReportData] = useState([])

  // Ukhiya Kutubdia
  let ppBoyUkhiya = 0
  let ppGirlUkhiya = 0
  let ppBoyKutubdia = 0
  let ppGirlKutubdia = 0

  let g1BoyUkhiya = 0
  let g1GirlUkhiya = 0
  let g1BoyKutubdia = 0
  let g1GirlKutubdia = 0

  let g2BoyUkhiya = 0
  let g2GirlUkhiya = 0
  let g2BoyKutubdia = 0
  let g2GirlKutubdia = 0

  let g3BoyUkhiya = 0
  let g3GirlUkhiya = 0
  let g3BoyKutubdia = 0
  let g3GirlKutubdia = 0

  let g4BoyUkhiya = 0
  let g4GirlUkhiya = 0
  let g4BoyKutubdia = 0
  let g4GirlKutubdia = 0

  let g5BoyUkhiya = 0
  let g5GirlUkhiya = 0
  let g5BoyKutubdia = 0
  let g5GirlKutubdia = 0
  // Ukhiya Kutubdia

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')
      await getAllStudent(console.log('getAllStudent called'))
      await getAllTeacher(console.log('get all teacher called'))
      pushReportData(console.log('pushReportData called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Filter Teacher data
  const headTeacherTrained = allTeacherData.filter((item) => item.headteacherTraining === 'Yes')
  const instructG1Trained = allTeacherData.filter((item) => item.instructionG1 === 'Yes')
  const instructG2Trained = allTeacherData.filter((item) => item.instructionG2 === 'Yes')
  const srmPrimaryTrained = allTeacherData.filter((item) => item.instructionPreprimary === 'Yes')
  const libraryTrained = allTeacherData.filter((item) => item.libraryManagementSRM === 'Yes')
  const goodGovornanceTrained = allTeacherData.filter(
    (item) => item.goodGovernanceHeadteacher === 'Yes',
  )
  const schoolPerformanceTrained = allTeacherData.filter(
    (item) => item.schoolPerformanceHeadteacher === 'Yes',
  )
  // Filter Teacher data

  // Total trained teacher
  const allTrainedTeacher =
    instructG1Trained.length +
    instructG2Trained.length +
    headTeacherTrained.length +
    libraryTrained.length +
    goodGovornanceTrained.length +
    schoolPerformanceTrained.length
  // Total trained teacher

  // Get All Teacher
  const getAllTeacher = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/teachers', {
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

  // Get All Student Data
  const getAllStudent = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/student', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllStudentData(response.data)

      setKutubdiaStudent(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaStudent(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      setMaleStudent(response.data.filter((item) => item.gender === 'Boy'))

      setFemaleStudent(response.data.filter((item) => item.gender === 'Girl'))

      console.log('response.data:' + response.data)

      console.log('ukhiyaStudent:' + ukhiyaStudent)

      ppBoyUkhiya = response.data.filter(
        (item) => item.gradeId === 'PP' && item.gender === 'Boy' && item.upazilla === 'Ukhiya',
      ).length

      ppGirlUkhiya = response.data.filter(
        (item) => item.gradeId === 'PP' && item.gender === 'Girl' && item.upazilla === 'Ukhiya',
      ).length

      ppBoyKutubdia = response.data.filter(
        (item) => item.gradeId === 'PP' && item.gender === 'Boy' && item.upazilla === 'Kutubdia',
      ).length

      ppGirlKutubdia = response.data.filter(
        (item) => item.gradeId === 'PP' && item.gender === 'Girl' && item.upazilla === 'Kutubdia',
      ).length

      g1BoyUkhiya = response.data.filter(
        (item) => item.gradeId === '1' && item.gender === 'Boy' && item.upazilla === 'Ukhiya',
      ).length

      g1GirlUkhiya = response.data.filter(
        (item) => item.gradeId === '1' && item.gender === 'Girl' && item.upazilla === 'Ukhiya',
      ).length

      g1BoyKutubdia = response.data.filter(
        (item) => item.gradeId === '1' && item.gender === 'Boy' && item.upazilla === 'Kutubdia',
      ).length

      g1GirlKutubdia = response.data.filter(
        (item) => item.gradeId === '1' && item.gender === 'Girl' && item.upazilla === 'Kutubdia',
      ).length

      g2BoyUkhiya = response.data.filter(
        (item) => item.gradeId === '2' && item.gender === 'Boy' && item.upazilla === 'Ukhiya',
      ).length

      g2GirlUkhiya = response.data.filter(
        (item) => item.gradeId === '2' && item.gender === 'Girl' && item.upazilla === 'Ukhiya',
      ).length

      g2BoyKutubdia = response.data.filter(
        (item) => item.gradeId === '2' && item.gender === 'Boy' && item.upazilla === 'Kutubdia',
      ).length

      g2GirlKutubdia = response.data.filter(
        (item) => item.gradeId === '2' && item.gender === 'Girl' && item.upazilla === 'Kutubdia',
      ).length

      g3BoyUkhiya = response.data.filter(
        (item) => item.gradeId === '3' && item.gender === 'Boy' && item.upazilla === 'Ukhiya',
      ).length

      g3GirlUkhiya = response.data.filter(
        (item) => item.gradeId === '3' && item.gender === 'Girl' && item.upazilla === 'Ukhiya',
      ).length

      g3BoyKutubdia = response.data.filter(
        (item) => item.gradeId === '3' && item.gender === 'Boy' && item.upazilla === 'Kutubdia',
      ).length

      g3GirlKutubdia = response.data.filter(
        (item) => item.gradeId === '3' && item.gender === 'Girl' && item.upazilla === 'Kutubdia',
      ).length

      g4BoyUkhiya = response.data.filter(
        (item) => item.gradeId === '4' && item.gender === 'Boy' && item.upazilla === 'Ukhiya',
      ).length

      g4GirlUkhiya = response.data.filter(
        (item) => item.gradeId === '4' && item.gender === 'Girl' && item.upazilla === 'Ukhiya',
      ).length

      g4BoyKutubdia = response.data.filter(
        (item) => item.gradeId === '4' && item.gender === 'Boy' && item.upazilla === 'Kutubdia',
      ).length

      g4GirlKutubdia = response.data.filter(
        (item) => item.gradeId === '4' && item.gender === 'Girl' && item.upazilla === 'Kutubdia',
      ).length

      g5BoyUkhiya = response.data.filter(
        (item) => item.gradeId === '5' && item.gender === 'Boy' && item.upazilla === 'Ukhiya',
      ).length

      g5GirlUkhiya = response.data.filter(
        (item) => item.gradeId === '5' && item.gender === 'Girl' && item.upazilla === 'Ukhiya',
      ).length

      g5BoyKutubdia = response.data.filter(
        (item) => item.gradeId === '5' && item.gender === 'Boy' && item.upazilla === 'Kutubdia',
      ).length

      g5GirlKutubdia = response.data.filter(
        (item) => item.gradeId === '5' && item.gender === 'Girl' && item.upazilla === 'Kutubdia',
      ).length

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Student Data

  const pushReportData = () => {
    const reportObject = [
      {
        grade: 'PP',
        boyUkhiya: ppBoyUkhiya,
        girlUkhiya: ppGirlUkhiya,
        totalUkhiya: ppBoyUkhiya + ppGirlUkhiya,
        boyKutubdia: ppBoyKutubdia,
        girlKutubdia: ppGirlKutubdia,
        totalKutubdia: ppBoyKutubdia + ppGirlKutubdia,
        total: ppBoyUkhiya + ppGirlUkhiya + ppBoyKutubdia + ppGirlKutubdia,
      },
      {
        grade: 'G1',
        boyUkhiya: g1BoyUkhiya,
        girlUkhiya: g1GirlUkhiya,
        totalUkhiya: g1BoyUkhiya + g1GirlUkhiya,
        boyKutubdia: g1BoyKutubdia,
        girlKutubdia: g1GirlKutubdia,
        totalKutubdia: g1BoyKutubdia + g1GirlKutubdia,
        total: g1BoyUkhiya + g1GirlUkhiya + g1BoyKutubdia + g1GirlKutubdia,
      },
      {
        grade: 'G2',
        boyUkhiya: g2BoyUkhiya,
        girlUkhiya: g2GirlUkhiya,
        totalUkhiya: g2BoyUkhiya + g2GirlUkhiya,
        boyKutubdia: g2BoyKutubdia,
        girlKutubdia: g2GirlKutubdia,
        totalKutubdia: g2BoyKutubdia + g2GirlKutubdia,
        total: g2BoyUkhiya + g2GirlUkhiya + g2BoyKutubdia + g2GirlKutubdia,
      },
      {
        grade: 'G3',
        boyUkhiya: g3BoyUkhiya,
        girlUkhiya: g3GirlUkhiya,
        totalUkhiya: g3BoyUkhiya + g3GirlUkhiya,
        boyKutubdia: g3BoyKutubdia,
        girlKutubdia: g3GirlKutubdia,
        totalKutubdia: g3BoyKutubdia + g3GirlKutubdia,
        total: g3BoyUkhiya + g3GirlUkhiya + g3BoyKutubdia + g3GirlKutubdia,
      },
      {
        grade: 'G4',
        boyUkhiya: g4BoyUkhiya,
        girlUkhiya: g4GirlUkhiya,
        totalUkhiya: g4BoyUkhiya + g4GirlUkhiya,
        boyKutubdia: g4BoyKutubdia,
        girlKutubdia: g4GirlKutubdia,
        totalKutubdia: g4BoyKutubdia + g4GirlKutubdia,
        total: g4BoyUkhiya + g4GirlUkhiya + g4BoyKutubdia + g4GirlKutubdia,
      },
      {
        grade: 'G5',
        boyUkhiya: g5BoyUkhiya,
        girlUkhiya: g5GirlUkhiya,
        totalUkhiya: g5BoyUkhiya + g5GirlUkhiya,
        boyKutubdia: g5BoyKutubdia,
        girlKutubdia: g5GirlKutubdia,
        totalKutubdia: g5BoyKutubdia + g5GirlKutubdia,
        total: g5BoyUkhiya + g5GirlUkhiya + g5BoyKutubdia + g5GirlKutubdia,
      },
      {
        grade: 'Total',
        boyUkhiya:
          ppBoyUkhiya + g1BoyUkhiya + g2BoyUkhiya + g3BoyUkhiya + g4BoyUkhiya + g5BoyUkhiya,
        girlUkhiya:
          ppGirlUkhiya + g1GirlUkhiya + g2GirlUkhiya + g3GirlUkhiya + g4GirlUkhiya + g5GirlUkhiya,
        totalUkhiya:
          ppBoyUkhiya +
          ppGirlUkhiya +
          g1BoyUkhiya +
          g1GirlUkhiya +
          g2BoyUkhiya +
          g2GirlUkhiya +
          g3BoyUkhiya +
          g3GirlUkhiya +
          g4BoyUkhiya +
          g4GirlUkhiya +
          g5BoyUkhiya +
          g5GirlUkhiya,
        boyKutubdia:
          ppBoyKutubdia +
          g1BoyKutubdia +
          g2BoyKutubdia +
          g3BoyKutubdia +
          g4BoyKutubdia +
          g5BoyKutubdia,
        girlKutubdia:
          ppGirlKutubdia +
          g1GirlKutubdia +
          g2GirlKutubdia +
          g3GirlKutubdia +
          g4GirlKutubdia +
          g5GirlKutubdia,
        totalKutubdia:
          ppBoyKutubdia +
          ppGirlKutubdia +
          g1BoyKutubdia +
          g1GirlKutubdia +
          g2BoyKutubdia +
          g2GirlKutubdia +
          g3BoyKutubdia +
          g3GirlKutubdia +
          g4BoyKutubdia +
          g4GirlKutubdia +
          g5BoyKutubdia +
          g5GirlKutubdia,
        total:
          ppBoyUkhiya +
          ppGirlUkhiya +
          ppBoyKutubdia +
          ppGirlKutubdia +
          g1BoyUkhiya +
          g1GirlUkhiya +
          g1BoyKutubdia +
          g1GirlKutubdia +
          g2BoyUkhiya +
          g2GirlUkhiya +
          g2BoyKutubdia +
          g2GirlKutubdia +
          g3BoyUkhiya +
          g3GirlUkhiya +
          g3BoyKutubdia +
          g3GirlKutubdia +
          g4BoyUkhiya +
          g4GirlUkhiya +
          g4BoyKutubdia +
          g4GirlKutubdia +
          g5BoyUkhiya +
          g5GirlUkhiya +
          g5BoyKutubdia +
          g5GirlKutubdia,
      },
    ]
    console.log('reportObject', reportObject)
    setReportData(reportObject)
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
      <CCol xs={12}>
        {/* <CCard className="mb-4">
          <CCardHeader>
            <strong>Report</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" href="/base/construction">
              Demo Report
            </CButton>
            <CButton color="secondary" href="/base/construction">
              Demo Report
            </CButton>
            <CButton color="success" href="/base/construction">
              Demo Report
            </CButton>
            <CButton color="warning" href="/base/construction">
              Demo Report
            </CButton>
          </CCardBody>
        </CCard> */}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Total Trained Teacher-{allTrainedTeacher}</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Bangla G1-{instructG1Trained.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={instructG1Trained.length + ' Teacher'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'school', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      // { title: 'Grade', field: 'grade' },
                      { title: 'Training', field: 'teacherTraining' },
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
                        borderRight: '1px solid #fff',
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
                    data={instructG1Trained}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Bangla G2-{instructG2Trained.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={instructG2Trained.length + ' Teacher'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'school', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      // { title: 'Grade', field: 'grade' },
                      { title: 'Training', field: 'teacherTraining' },
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
                        borderRight: '1px solid #fff',
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
                    data={instructG2Trained}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Library Training-{libraryTrained.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={libraryTrained.length + ' Teacher'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'school', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      // { title: 'Grade', field: 'grade' },
                      { title: 'Training', field: 'teacherTraining' },
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
                        borderRight: '1px solid #fff',
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
                    data={libraryTrained}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>Headteacher Training-{headTeacherTrained.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={headTeacherTrained.length + ' Teacher'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'school', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      // { title: 'Grade', field: 'grade' },
                      { title: 'Training', field: 'teacherTraining' },
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
                        borderRight: '1px solid #fff',
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
                    data={headTeacherTrained}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>Preprimary Training-{srmPrimaryTrained.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={srmPrimaryTrained.length + ' Teacher'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'school', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      // { title: 'Grade', field: 'grade' },
                      { title: 'Training', field: 'teacherTraining' },
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
                        borderRight: '1px solid #fff',
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
                    data={headTeacherTrained}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>School Performance-{schoolPerformanceTrained.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={schoolPerformanceTrained.length + ' Teacher'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'school', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      // { title: 'Grade', field: 'grade' },
                      { title: 'Training', field: 'teacherTraining' },
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
                        borderRight: '1px solid #fff',
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
                    data={schoolPerformanceTrained}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>Governence Training-{goodGovornanceTrained.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={goodGovornanceTrained.length + ' Teacher'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'school', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      // { title: 'Grade', field: 'grade' },
                      { title: 'Training', field: 'teacherTraining' },
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
                        borderRight: '1px solid #fff',
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
                    data={goodGovornanceTrained}
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

export default AllTraining
