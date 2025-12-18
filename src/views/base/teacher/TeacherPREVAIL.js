//  Author: Mohammad Jihad Hossain
//  Create Date: 09/09/2025
//  Modify Date: 02/11/2025
//  Description: PLFObservation  file

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

const TeacherPREVAIL = () => {
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
  const [narailSadarTeacher, setNarailSadarTeacher] = useState([])
  const [lohagoraTeacher, setLohagoraTeacher] = useState([])
  const [kaliaTeacher, setKaliaTeacher] = useState([])
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

  // For error handling row update
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  // For error handling row update

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllTeacher(console.log('get all teacher called'))

      pushReportData(console.log('pushReportData called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

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

      setNarailSadarTeacher(response.data.filter((item) => item.upazilla === 'Narail Sadar'))

      setLohagoraTeacher(response.data.filter((item) => item.upazilla === 'Lohagora'))

      setKaliaTeacher(response.data.filter((item) => item.upazilla === 'Kalia'))

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
        return item.gender === 'Male' && item.upazilla === 'Ukhiya' && item.instructionG1 === 'Yes'
      }).length

      g1UTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Ukhiya' && item.instructionG1 === 'Yes'
        )
      }).length

      g1UTeacherTotal = g1UTeacherMale + g1UTeacherFemale

      g2UTeacherMale = response.data.filter((item) => {
        return item.gender === 'Male' && item.upazilla === 'Ukhiya' && item.instructionG2 === 'Yes'
      }).length

      g2UTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Ukhiya' && item.instructionG2 === 'Yes'
        )
      }).length

      g2UTeacherTotal = g2UTeacherMale + g2UTeacherFemale

      otherUTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' &&
          item.upazilla === 'Ukhiya' &&
          item.instructionG2 === 'No' &&
          item.instructionG1 === 'No'
        )
      }).length

      otherUTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' &&
          item.upazilla === 'Ukhiya' &&
          item.instructionG2 === 'No' &&
          item.instructionG1 === 'No'
        )
      }).length

      otherUTeacherTotal = otherUTeacherMale + otherUTeacherFemale
      // Ukhiya

      // Kutubdia
      g1KTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' && item.upazilla === 'Kutubdia' && item.instructionG1 === 'Yes'
        )
      }).length

      g1KTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Kutubdia' && item.instructionG1 === 'Yes'
        )
      }).length

      g1KTeacherTotal = g1KTeacherMale + g1KTeacherFemale

      g2KTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' && item.upazilla === 'Kutubdia' && item.instructionG2 === 'Yes'
        )
      }).length

      g2KTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' && item.upazilla === 'Kutubdia' && item.instructionG2 === 'Yes'
        )
      }).length

      g2KTeacherTotal = g2KTeacherMale + g2KTeacherFemale

      otherKTeacherMale = response.data.filter((item) => {
        return (
          item.gender === 'Male' &&
          item.upazilla === 'Kutubdia' &&
          item.instructionG2 === 'No' &&
          item.instructionG1 === 'No'
        )
      }).length

      otherKTeacherFemale = response.data.filter((item) => {
        return (
          item.gender === 'Female' &&
          item.upazilla === 'Kutubdia' &&
          item.instructionG2 === 'No' &&
          item.instructionG1 === 'No'
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
          setErrorMessages(['Add Teacher failed! Server error'])
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
                      {
                        title: 'Total Teacher in Ukhiya',
                        field: 'totalTeacherU',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      { title: 'Male Teacher in Kutubdia', field: 'maleKutubdia' },
                      { title: 'Female Teacher in Kutubdia ', field: 'femaleKutubdia' },
                      {
                        title: 'Total Teacher in Kutubdia',
                        field: 'totalTeacherK',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      {
                        title: 'Total Trained Teacher',
                        field: 'totalTeacher',
                        cellStyle: {
                          backgroundColor: '#b8a49c',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
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
                  <strong>Teacher in Narail Sadar-{narailSadarTeacher.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={narailSadarTeacher.length + ' Teacher'}
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
                    data={narailSadarTeacher}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Teacher in Lohagora-{lohagoraTeacher.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={lohagoraTeacher.length + ' Teacher Data'}
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
                    data={lohagoraTeacher}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>Teacher in Kalia-{kaliaTeacher.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={lohagoraTeacher.length + ' Teacher Data'}
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
                    data={kaliaTeacher}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>All Teacher-{allTeacherData.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={allTeacherData.length + ' Teacher Data'}
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
                    data={allTeacherData}
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

export default TeacherPREVAIL
