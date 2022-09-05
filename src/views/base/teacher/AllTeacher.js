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

const AllTeacher = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //Selected Date
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [allTeacherData, setAllTeacherData] = useState([])

  // Report Data Ukhiya
  const [ukhiyaReportData, setUkhiyaReportData] = useState([])
  // Report Data Kutubdia
  const [kutubdiaReportData, setKutubdiaReportData] = useState([])

  // Report Data
  const [reportData, setReportData] = useState([])
  // data state to store the BCO API data. Its initial value is an empty array
  const [allBCOData, setAllBCOData] = useState([])

  // Area wise teacher data
  const [kutubdiaTeacher, setKutubdiaTeacher] = useState([])
  const [ukhiyaTeacher, setUkhiyaTeacher] = useState([])
  // Area wise teacher data

  // Gender wise teacher
  let [maleTeacher, setMaleTeacher] = useState([])
  let [femaleTeacher, setFemaleTeacher] = useState([])
  // Gender wise teacher

  // Ukhiya
  let g1UTeacherMale = 0
  let g1UTeacherFemale = 0
  let g1UTeacherTotal = 0
  let g2UTeacherMale = 0
  let g2UTeacherFemale = 0
  let g2UTeacherTotal = 0
  let otherUTeacherMale = 0
  let otherUTeacherFemale = 0
  let otherUTeacherTotal = 0
  // Ukhiya

  // Kutubdia
  let g1KTeacherMale = 0
  let g1KTeacherFemale = 0
  let g1KTeacherTotal = 0
  let g2KTeacherMale = 0
  let g2KTeacherFemale = 0
  let g2KTeacherTotal = 0
  let otherKTeacherMale = 0
  let otherKTeacherFemale = 0
  let otherKTeacherTotal = 0
  // Kutubdia

  // Combined
  let g1TotalTeacher = 0
  let g2TotalTeacher = 0
  let otherTotalTeacher = 0

  let totalMaleTeacherU = 0
  let totalFemaleTeacherU = 0
  let totalTeacherU = 0
  let totalMaleTeacherK = 0
  let totalFemaleTeacherK = 0
  let totalTeacherK = 0
  let grandTotal = 0
  // Combined

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      setIsLoading(true)
      await getAllTeacher(console.log('get all teacher called'))

      pushReportData(console.log('pushReportData called'))
      setIsLoading(false)
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Teacher
  const getAllTeacher = async () => {
    setIsLoading(true)
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

      setKutubdiaTeacher(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaTeacher(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      // Set all calculated data

      // Gender wise teacher
      setMaleTeacher(
        response.data.filter((item) => {
          return item.gender === 'Male'
        }),
      )

      console.log('maleTeacher: ' + maleTeacher)

      setFemaleTeacher(
        response.data.filter((item) => {
          return item.gender === 'Female'
        }),
      )

      console.log('femaleTeacher: ' + femaleTeacher)
      // Gender wise teacher

      // Ukhiya
      g1UTeacherMale = response.data.filter((item) => {
        return item.gender === 'Male' && item.upazilla === 'Ukhiya' && item.instruction_g1 === 'Yes'
      }).length

      g1UTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Ukhiya' && item.instruction_g1 === 'Yes'
        )
      }).length

      g1UTeacherTotal = g1UTeacherMale + g1UTeacherFemale

      g2UTeacherMale = response.data.filter((item) => {
        return item.gender === 'Male' && item.upazilla === 'Ukhiya' && item.instruction_g2 === 'Yes'
      }).length

      g2UTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Ukhiya' && item.instruction_g2 === 'Yes'
        )
      }).length

      g2UTeacherTotal = g2UTeacherMale + g2UTeacherFemale

      otherUTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' &&
          item.upazilla === 'Ukhiya' &&
          item.instruction_g2 === 'No' &&
          item.instruction_g1 === 'No'
        )
      }).length

      otherUTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' &&
          item.upazilla === 'Ukhiya' &&
          item.instruction_g2 === 'No' &&
          item.instruction_g1 === 'No'
        )
      }).length

      otherUTeacherTotal = otherUTeacherMale + otherUTeacherFemale
      // Ukhiya

      // Kutubdia
      g1KTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' && item.upazilla === 'Kutubdia' && item.instruction_g1 === 'Yes'
        )
      }).length

      g1KTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Kutubdia' && item.instruction_g1 === 'Yes'
        )
      }).length

      g1KTeacherTotal = g1KTeacherMale + g1KTeacherFemale

      g2KTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' && item.upazilla === 'Kutubdia' && item.instruction_g2 === 'Yes'
        )
      }).length

      g2KTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Kutubdia' && item.instruction_g2 === 'Yes'
        )
      }).length

      g2KTeacherTotal = g2KTeacherMale + g2KTeacherFemale

      otherKTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' &&
          item.upazilla === 'Kutubdia' &&
          item.instruction_g2 === 'No' &&
          item.instruction_g1 === 'No'
        )
      }).length

      otherKTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' &&
          item.upazilla === 'Kutubdia' &&
          item.instruction_g2 === 'No' &&
          item.instruction_g1 === 'No'
        )
      }).length

      otherKTeacherTotal = otherKTeacherMale + otherKTeacherFemale
      // Kutubdia

      // Combined

      g1TotalTeacher = g1UTeacherTotal + g1KTeacherTotal
      g2TotalTeacher = g2UTeacherTotal + g2KTeacherTotal
      otherTotalTeacher = otherUTeacherTotal + otherKTeacherTotal

      totalMaleTeacherU = g1UTeacherMale + g2UTeacherMale + otherUTeacherMale
      totalFemaleTeacherU = g1UTeacherFemale + g2UTeacherFemale + otherUTeacherFemale
      totalTeacherU = g1UTeacherTotal + g2UTeacherTotal + otherUTeacherTotal
      totalMaleTeacherK = g1KTeacherMale + g2KTeacherMale + otherKTeacherMale
      totalFemaleTeacherK = g1KTeacherFemale + g2KTeacherFemale + otherKTeacherFemale
      totalTeacherK = g1KTeacherTotal + g2KTeacherTotal + otherKTeacherTotal

      grandTotal = g1TotalTeacher + g2TotalTeacher + otherTotalTeacher
      // Combined

      // Set all calculated data

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Teacher

  const pushReportData = () => {
    const reportObject = [
      {
        grade: 'G1',
        maleukhiya: g1UTeacherMale,
        femaleukhiya: g1UTeacherFemale,
        totalTeacherU: g1UTeacherTotal,
        maleKutubdia: g1KTeacherMale,
        femaleKutubdia: g1KTeacherFemale,
        totalTeacherK: g1KTeacherTotal,
        totalTeacher: g1TotalTeacher,
      },
      {
        grade: 'G2',
        maleukhiya: g2UTeacherMale,
        femaleukhiya: g2UTeacherFemale,
        totalTeacherU: g2UTeacherTotal,
        maleKutubdia: g2KTeacherMale,
        femaleKutubdia: g2KTeacherFemale,
        totalTeacherK: g2KTeacherTotal,
        totalTeacher: g2TotalTeacher,
      },
      {
        grade: 'G3-G5',
        maleukhiya: otherUTeacherMale,
        femaleukhiya: otherUTeacherFemale,
        totalTeacherU: otherUTeacherTotal,
        maleKutubdia: otherKTeacherMale,
        femaleKutubdia: otherKTeacherFemale,
        totalTeacherK: otherKTeacherTotal,
        totalTeacher: otherTotalTeacher,
      },
      {
        grade: 'Total',
        maleukhiya: totalMaleTeacherU,
        femaleukhiya: totalFemaleTeacherU,
        totalTeacherU: totalTeacherU,
        maleKutubdia: totalMaleTeacherK,
        femaleKutubdia: totalFemaleTeacherK,
        totalTeacherK: totalTeacherK,
        totalTeacher: grandTotal,
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
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Teacher-({allTeacherData.length}) </strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>
                    Total Teacher-{allTeacherData.length} (Male-{maleTeacher.length}, Female-
                    {femaleTeacher.length})
                  </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Grade', field: 'grade' },
                      { title: 'Male Teacher in Ukhiya ', field: 'maleukhiya' },
                      { title: 'Female Teacher in Ukhiya', field: 'femaleukhiya' },
                      { title: 'Total Teacher in Ukhiya', field: 'totalTeacherU' },
                      { title: 'Male Teacher in Kutubdia', field: 'maleKutubdia' },
                      { title: 'Female Teacher in Kutubdia ', field: 'femaleKutubdia' },
                      { title: 'Total Teacher in Kutubdia', field: 'totalTeacherK' },
                      { title: 'Total Teacher', field: 'totalTeacher' },
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
                    data={reportData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Teacher in Kutubdia-{kutubdiaTeacher.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaTeacher.length + ' Teacher'}
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
                      { title: 'Grade', field: 'grade' },
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
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#ede9df',
                      },
                    }}
                    data={kutubdiaTeacher}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Teacher in Ukhiya-{ukhiyaTeacher.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaTeacher.length + ' Teacher Data'}
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
                      { title: 'Grade', field: 'grade' },
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
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#ede9df',
                      },
                    }}
                    data={ukhiyaTeacher}
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

export default AllTeacher
