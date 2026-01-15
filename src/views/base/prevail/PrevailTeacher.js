//  Author: Mohammad Jihad Hossain
//  Create Date: 14/01/2026
//  Modify Date: 14/01/2026
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

const PrevailTeacher = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allTeacherData, setAllTeacherData] = useState([])

  // For error handling row update
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  // For error handling row update

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')
      getAllTeacher(console.log('get all teacher called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Teacher Data
  const getAllTeacher = async () => {
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
  // Get All Teacher Data

  // Row update function
  const handleRowUpdateTeacher = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/p-teacher/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allTeacherData]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllTeacherData([...dataUpdate])
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
  const handleRowAddTeacher = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/p-teacher/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allTeacherData]
          dataToAdd.push(newData)
          setAllTeacherData([...dataToAdd])
          resolve()
          setIserror(false)
          setErrorMessages([])
          // console.log('newData.id: ' + newData.id)
          // console.log(newData)
          // console.log(oldData)
          // console.log('url: ' + 'http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id)
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
  const handleRowDeleteTeacher = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/p-teacher/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allTeacherData]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllTeacherData([...dataDelete])
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>PREVAIL Teacher Data</strong>
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={allTeacherData.length + ' Teacher'}
              columns={[
                { title: 'name', field: 'name', type: 'string', sorting: 'true' },
                { title: 'bnName', field: 'bnName' },
                { title: 'school', field: 'school', sorting: 'true' },
                { title: 'district', field: 'district' },
                { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                { title: 'gender', field: 'gender', sorting: 'true' },
                {
                  title: 'designation',
                  field: 'designation',
                },
                { title: 'phone1', field: 'phone1' },
                { title: 'phone2', field: 'phone2' },
                { title: 'project', field: 'project' },
                { title: 'currentAddress', field: 'currentAddress' },
                { title: 'permanentAddress', field: 'permanentAddress' },
                { title: 'grade', field: 'grade' },
                { title: 'section', field: 'section' },
                { title: 'teacherTraining', field: 'teacherTraining' },
                { title: 'instructionPreprimary', field: 'instructionPreprimary' },
                { title: 'instructionG1', field: 'instructionG1' },
                { title: 'instructionG2', field: 'instructionG2' },
                { title: 'libraryManagementSRM', field: 'libraryManagementSRM' },
                { title: 'headteacherTraining', field: 'headteacherTraining' },
                { title: 'goodGovernanceHeadteacher', field: 'goodGovernanceHeadteacher' },
                {
                  title: 'schoolPerformanceHeadteacher',
                  field: 'schoolPerformanceHeadteacher',
                },
                { title: 'gradePPrimary', field: 'gradePPrimary' },
                { title: 'gradeG1', field: 'gradeG1' },
                { title: 'gradeG2', field: 'gradeG2' },
                { title: 'gradeG3', field: 'gradeG3' },
                { title: 'gradeG4', field: 'gradeG4' },
                { title: 'gradeG5', field: 'gradeG5' },
                { title: 'trainingYear', field: 'trainingYear' },
                { title: 'activity', field: 'activity' },
                // { title: 'isActive', field: 'isActive' },
                // { title: 'isDeleted', field: 'isDeleted' },
              ]}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    handleRowUpdateTeacher(newData, oldData, resolve)
                  }),
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    handleRowAddTeacher(newData, resolve)
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDeleteTeacher(oldData, resolve)
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
                pageSizeOptions: [3, 10, 20],
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
              data={allTeacherData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PrevailTeacher
