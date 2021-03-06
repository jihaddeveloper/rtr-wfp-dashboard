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

const AllEmployee = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])
  const [allEmployeeData, setAllEmployeeData] = useState([])
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')
    getAllTeacher(console.log('get all teacheAllTeacherr called'))
    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
    getAllEmployee(console.log('get all employee called'))
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

  // Get All Employee Data
  const getAllEmployee = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/employees', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllEmployeeData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Employee Data

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Report</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" href="/bco/wfp-summarize">
              Demo Report
            </CButton>
            <CButton color="secondary" href="/bco/cfo-analysis">
              Demo Report
            </CButton>
            <CButton color="success" href="/bco/ukhiya-report">
              Demo Report
            </CButton>
            <CButton color="warning" href="/bco/kutubdia-report">
              Demo Report
            </CButton>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>ALL Employee Data</strong>
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allEmployeeData.length + ' Employee Data'}
              columns={[
                { title: 'EMP ID', field: 'employeeRegId', type: 'string' },
                { title: 'Name', field: 'name', type: 'string' },
                { title: 'Gender', field: 'gender', sorting: 'true' },
                { title: 'Office', field: 'office', sorting: 'true' },
                {
                  title: 'Designation',
                  field: 'designation',
                  sorting: 'true',
                },

                { title: 'Supervisor', field: 'supervisor' },
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
                pageSize: 10,
                pageSizeOptions: [10, 20, 30],
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
                },
              }}
              data={allEmployeeData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllEmployee
