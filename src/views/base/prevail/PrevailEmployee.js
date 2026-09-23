//  Author: Mohammad Jihad Hossain
//  Create Date: 14/06/2026
//  Modify Date: 14/07/2026
//  Description: PrevailEmployee  file

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

const BASE_URL = process.env.REACT_APP_API_URL

const API_URL = `${BASE_URL}/p-employee`

const PrevailEmployee = () => {
  // This function runs synchronously before the initial render
  const [user, setUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user || 'no user saved'
  })

  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])
  const [allEmployeeData, setAllEmployeeData] = useState([])

  // For error handling row update
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  // For error handling row update

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')
      getAllEmployee(console.log('get all employee called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Employee Data
  const getAllEmployee = async () => {
    try {
      const response = await axios(`${BASE_URL}/p-employee`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const reversedData = Array.isArray(response.data) ? response.data.reverse() : []

      setAllEmployeeData(reversedData)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Employee Data

  // Row update function
  const handleRowUpdateEmployee = (newData, oldData, resolve, reject) => {
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
        .patch(`${API_URL}/${newData.id}`, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // Fallback to res.data if your API returns the updated item, otherwise use newData
          const updatedRowFromServer = res.data || newData

          // Secure state update using item IDs to prevent bugs caused by .toReversed() layout ordering
          setAllEmployeeData((prevData) =>
            prevData.map((item) => {
              // Compare unique IDs as strings to rule out type discrepancies
              if (String(item.id) === String(newData.id)) {
                return {
                  ...item, // Keep original row structure and historical tableData keys
                  ...updatedRowFromServer, // Layer on top the freshly patched API parameters
                  tableData: oldData.tableData, // Protect material-table's critical internal layout reference tracker
                }
              }
              return item
            }),
          )

          // // Resolve the promise to close the material-table inline edit mode
          resolve()
        })
        .catch((error) => {
          setErrorMessages(['Update failed! Server error'])
          setIserror(true)
          reject()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      reject()
    }
  }
  // Row update function

  // Row add function
  const handleRowAddEmployee = (newData, resolve) => {
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
        .post(`${API_URL}`, newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // Fallback safely to input data if your API response body is wrapped or customized
          const savedRowFromServer = res.data || newData

          // Prepend directly to the front since the state isn't being reversed dynamically anymore
          setAllEmployeeData((prevData) => [savedRowFromServer, ...prevData])

          setIserror(false)
          setErrorMessages([])
          resolve()
        })
        .catch((error) => {
          setErrorMessages(['Add School failed! Server error'])
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
  const handleRowDeleteEmployee = (oldData, resolve) => {
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
        .delete(`${API_URL}/${oldData.id}`, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          // This is safe against sorting, filtering, and array order shifts
          setAllEmployeeData((prevData) =>
            prevData.filter((item) => String(item.id) !== String(oldData.id)),
          )
          // The table updates instantly from the filter state above, saving a network request

          setIserror(false)
          setErrorMessages([])
          resolve() // Smoothly closes the material-table delete modal confirmation overlay
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>PREVAIL Employee Data</strong>
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allEmployeeData.length + ' Employee'}
              columns={[
                { title: 'name', field: 'name', type: 'string' },
                { title: 'employeeRegId', field: 'employeeRegId', type: 'string' },
                { title: 'bnName', field: 'bnName', type: 'string' },
                { title: 'gender', field: 'gender', sorting: 'true' },
                { title: 'office', field: 'office', sorting: 'true' },
                {
                  title: 'designation',
                  field: 'designation',
                  sorting: 'true',
                },

                { title: 'supervisor', field: 'supervisor' },
                { title: 'project', field: 'project', type: 'string' },

                { title: 'email', field: 'email' },
                { title: 'phone1', field: 'phone1' },
                { title: 'phone2', field: 'phone2' },
                { title: 'addressCurrent', field: 'addressCurrent' },
                { title: 'addressPermanent', field: 'addressPermanent' },
              ]}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdateEmployee(newData, oldData, resolve)
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAddEmployee(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDeleteEmployee(oldData, resolve)
                  }),
              }}
              options={{
                exportButton: true,
                exportAllData: true,
                search: true,
                filtering: true,
                grouping: true,
                sorting: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 30],
                maxBodyHeight: '700px',
                headerStyle: {
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#7e93b4ff',
                  fontWeight: 'bold',
                  width: '5px',
                  height: '5px',
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
                  width: '5px',
                  height: '5px',
                  padding: '0 5px',
                },
                cellStyle: {
                  borderRight: '1px solid #0c0b0bff',
                  borderLeft: '1px solid #0e0d0dff',
                  borderBottom: '1px solid #0c0b0bff',
                  borderStyle: 'solid',
                  height: '5px',
                  minHeight: '5px',
                  maxHeight: '5px',
                  padding: '0 5px',
                },
                maintainAspectRatio: false,
              }}
              data={allEmployeeData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PrevailEmployee
