import React, { useState, useEffect, forwardRef } from 'react'
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

const AllSchool = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])
  const [allSchoolData, setAllSchoolData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])
  const [allEmployeeData, setAllEmployeeData] = useState([])

  // Get All School Data
  const getAllSchool = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/schools', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllSchoolData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All School Data

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
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')

    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
    getAllSchool(console.log('get all school called'))
    getAllTeacher(console.log('get all teacher called'))
    getAllEmployee(console.log('get all employee called'))
  }, [])
  // Using useEffect to call the API once mounted and set the data

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All School Data</strong>
            {/* <strong>{allSchoolData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allSchoolData.length + ' School Data'}
              columns={[
                { title: 'District', field: 'district' },
                { title: 'Upazilla', field: 'upazilla' },
                { title: 'Name', field: 'name' },
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
              data={allSchoolData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllSchool
