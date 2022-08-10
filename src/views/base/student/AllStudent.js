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

  // Area wise student data
  const [kutubdiaStudent, setKutubdiaStudent] = useState([])
  const [ukhiyaStudent, setUkhiyaStudent] = useState([])
  // Area wise student data

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')
    getAllStudent()
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

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Student Data

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
            <strong>ALL Student Data({allStudentData.length})</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Student Data Ukhiya({allStudentData.length})</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaStudent.length + ' School'}
                    columns={[
                      { title: 'Name', field: 'name' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla' },

                      { title: 'LPO', field: 'lpo', type: 'string' },
                      {
                        title: 'LF',
                        field: 'lf',
                      },
                      {
                        title: 'Head Teacher',
                        field: 'headTeacher',
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
                  <strong>Student Data Kutubdia({allStudentData.length})</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaStudent.length + ' School'}
                    columns={[
                      { title: 'Name', field: 'name' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla' },

                      { title: 'LPO', field: 'lpo', type: 'string' },
                      {
                        title: 'LF',
                        field: 'lf',
                      },
                      {
                        title: 'Head Teacher',
                        field: 'headTeacher',
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
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllStudent
