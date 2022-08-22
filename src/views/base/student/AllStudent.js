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

const AllStudent = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allStudentData, setAllStudentData] = useState([])

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
      await getAllStudent()
      pushReportData(console.log('pushReportData called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Student Data
  const getAllStudent = async () => {
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

      //ppBoyUkhiya = response.data.filter((item) => item.gradeId === 'PP')

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
        boyKutubdia: ppBoyKutubdia,
        girlKutubdia: ppGirlKutubdia,
      },
      {
        grade: 'G1',
        boyUkhiya: g1BoyUkhiya,
        girlUkhiya: g1GirlUkhiya,
        boyKutubdia: g1BoyKutubdia,
        girlKutubdia: g1GirlKutubdia,
      },
      {
        grade: 'G2',
        boyUkhiya: g2BoyUkhiya,
        girlUkhiya: g2GirlUkhiya,
        boyKutubdia: g2BoyKutubdia,
        girlKutubdia: g2GirlKutubdia,
      },
      {
        grade: 'G3',
        boyUkhiya: g3BoyUkhiya,
        girlUkhiya: g3GirlUkhiya,
        boyKutubdia: g3BoyKutubdia,
        girlKutubdia: g3GirlKutubdia,
      },
      {
        grade: 'G4',
        boyUkhiya: g4BoyUkhiya,
        girlUkhiya: g4GirlUkhiya,
        boyKutubdia: g4BoyKutubdia,
        girlKutubdia: g4GirlKutubdia,
      },
      {
        grade: 'G5',
        boyUkhiya: g5BoyUkhiya,
        girlUkhiya: g5GirlUkhiya,
        boyKutubdia: g5BoyKutubdia,
        girlKutubdia: g5GirlKutubdia,
      },
    ]
    console.log('reportObject', reportObject)
    setReportData(reportObject)
  }

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
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
            <strong>Student-{allStudentData.length}</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Student in Ukhiya-{ukhiyaStudent.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaStudent.length + ' School'}
                    columns={[
                      { title: 'Name', field: 'name' },
                      { title: 'Upazilla', field: 'upazilla' },
                      { title: 'Gender', field: 'gender', type: 'string' },
                      { title: 'Grade', field: 'gradeId' },
                      {
                        title: 'School',
                        field: 'schoolName',
                      },
                      {
                        title: 'Mother',
                        field: 'mother',
                      },
                      {
                        title: 'Father',
                        field: 'father',
                      },
                      {
                        title: 'LF',
                        field: 'lf',
                      },
                      {
                        title: 'LPO',
                        field: 'lpo',
                      },
                    ]}
                    // actions={[
                    //   {
                    //     icon: DeleteOutline,
                    //     tooltip: 'Delete School',
                    //     onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
                    //   },
                    //   {
                    //     icon: ViewColumn,
                    //     tooltip: 'View School',
                    //     onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
                    //   },
                    //   {
                    //     icon: AddBox,
                    //     tooltip: 'Add User',
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
                    data={ukhiyaStudent}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Student in Kutubdia-{kutubdiaStudent.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaStudent.length + ' School'}
                    columns={[
                      { title: 'Name', field: 'name' },
                      { title: 'Upazilla', field: 'upazilla' },
                      { title: 'Gender', field: 'gender', type: 'string' },
                      { title: 'Grade', field: 'gradeId' },
                      {
                        title: 'School',
                        field: 'schoolName',
                      },
                      {
                        title: 'Mother',
                        field: 'mother',
                      },
                      {
                        title: 'Father',
                        field: 'father',
                      },
                      {
                        title: 'LF',
                        field: 'lf',
                      },
                      {
                        title: 'LPO',
                        field: 'lpo',
                      },
                    ]}
                    // actions={[
                    //   {
                    //     icon: DeleteOutline,
                    //     tooltip: 'Delete School',
                    //     onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
                    //   },
                    //   {
                    //     icon: ViewColumn,
                    //     tooltip: 'View School',
                    //     onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
                    //   },
                    //   {
                    //     icon: AddBox,
                    //     tooltip: 'Add User',
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
                    data={kutubdiaStudent}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>
                    Total Student-{allStudentData.length} (Boy-{maleStudent.length}, Girl-
                    {femaleStudent.length})
                  </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Grade', field: 'grade' },
                      { title: '#Boy in Ukhiya', field: 'boyUkhiya' },
                      { title: '#Girl in Ukhiya', field: 'girlUkhiya' },
                      { title: '#Boy in Kutubdia', field: 'boyKutubdia' },
                      { title: '#Girl in Kutubdia', field: 'girlKutubdia' },
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
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllStudent
