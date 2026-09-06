//  Author: Mohammad Jihad Hossain
//  Create Date: 09/07/2026
//  Modify Date: 27/07/2026
//  Description: TeacherPREVAIL  file

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

  // Report Data
  const [reportData, setReportData] = useState([])

  // Area wise teacher data
  const [narailSadarTeacher, setNarailSadarTeacher] = useState([])
  const [lohagoraTeacher, setLohagoraTeacher] = useState([])
  const [kaliaTeacher, setKaliaTeacher] = useState([])
  // Area wise teacher data

  // Gender wise teacher
  let [maleTeacher, setMaleTeacher] = useState([])
  let [femaleTeacher, setFemaleTeacher] = useState([])
  // Gender wise teacher

  // Narail Sadar
  let ppNSTeacherMale = 0
  let ppNSTeacherFemale = 0
  let ppNSTeacherTotal = 0
  let g1NSTeacherMale = 0
  let g1NSTeacherFemale = 0
  let g1NSTeacherTotal = 0
  let g2NSTeacherMale = 0
  let g2NSTeacherFemale = 0
  let g2NSTeacherTotal = 0
  let g3NSTeacherMale = 0
  let g3NSTeacherFemale = 0
  let g3NSTeacherTotal = 0
  // Narail Sadar

  // Lohagora
  let ppLTeacherMale = 0
  let ppLTeacherFemale = 0
  let ppLTeacherTotal = 0
  let g1LTeacherMale = 0
  let g1LTeacherFemale = 0
  let g1LTeacherTotal = 0
  let g2LTeacherMale = 0
  let g2LTeacherFemale = 0
  let g2LTeacherTotal = 0
  let g3LTeacherMale = 0
  let g3LTeacherFemale = 0
  let g3LTeacherTotal = 0
  // Lohagora

  // Kalia
  let ppKTeacherMale = 0
  let ppKTeacherFemale = 0
  let ppKTeacherTotal = 0
  let g1KTeacherMale = 0
  let g1KTeacherFemale = 0
  let g1KTeacherTotal = 0
  let g2KTeacherMale = 0
  let g2KTeacherFemale = 0
  let g2KTeacherTotal = 0
  let g3KTeacherMale = 0
  let g3KTeacherFemale = 0
  let g3KTeacherTotal = 0
  // Kalia

  // Combined
  let ppTotalTeacher = 0
  let g1TotalTeacher = 0
  let g2TotalTeacher = 0
  let g3TotalTeacher = 0

  let totalMaleTeacherNS = 0
  let totalFemaleTeacherNS = 0
  let totalTeacherNS = 0
  let totalMaleTeacherL = 0
  let totalFemaleTeacherL = 0
  let totalTeacherL = 0
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

      setLohagoraTeacher(response.data.filter((item) => item.upazilla === 'Lohagara'))

      setKaliaTeacher(response.data.filter((item) => item.upazilla === 'Kalia'))

      // Set all calculated data

      // Gender wise teacher
      setMaleTeacher(
        response.data.filter((item) => {
          return item.gender === 'M'
        }),
      )

      //console.log('maleTeacher: ' + maleTeacher)

      setFemaleTeacher(
        response.data.filter((item) => {
          return item.gender === 'F'
        }),
      )

      //console.log('femaleTeacher: ' + femaleTeacher)
      // Gender wise teacher

      // Narail Sadar
      ppNSTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Narail Sadar' && item.gradePPrimary === '1'
      }).length

      ppNSTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Narail Sadar' && item.gradePPrimary === '1'
      }).length

      ppNSTeacherTotal = ppNSTeacherMale + ppNSTeacherFemale

      g1NSTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Narail Sadar' && item.gradeG1 === '1'
      }).length

      g1NSTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Narail Sadar' && item.gradeG1 === '1'
      }).length

      g1NSTeacherTotal = g1NSTeacherMale + g1NSTeacherFemale

      g2NSTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Narail Sadar' && item.gradeG2 === '1'
      }).length

      g2NSTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Narail Sadar' && item.gradeG2 === '1'
      }).length

      g2NSTeacherTotal = g2NSTeacherMale + g2NSTeacherFemale

      g3NSTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Narail Sadar' && item.gradeG3 === '1'
      }).length

      g3NSTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Narail Sadar' && item.gradeG3 === '1'
      }).length

      g3NSTeacherTotal = g3NSTeacherMale + g3NSTeacherFemale

      // Narail Sadar

      // Lohagara
      ppLTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Lohagara' && item.gradePPrimary === '1'
      }).length

      ppLTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Lohagara' && item.gradePPrimary === '1'
      }).length

      ppLTeacherTotal = ppLTeacherMale + ppLTeacherFemale

      g1LTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Lohagara' && item.gradeG1 === '1'
      }).length

      g1LTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Lohagara' && item.gradeG1 === '1'
      }).length

      g1LTeacherTotal = g1LTeacherMale + g1LTeacherFemale

      g2LTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Lohagara' && item.gradeG2 === '1'
      }).length

      g2LTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Lohagara' && item.gradeG2 === '1'
      }).length

      g2LTeacherTotal = g2LTeacherMale + g2LTeacherFemale

      g3LTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Lohagara' && item.gradeG3 === '1'
      }).length

      g3LTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Lohagara' && item.gradeG3 === '1'
      }).length

      g3LTeacherTotal = g3LTeacherMale + g3LTeacherFemale
      // Lohagara

      // Kalia
      ppKTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Kalia' && item.gradePPrimary === '1'
      }).length

      ppKTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Kalia' && item.gradePPrimary === '1'
      }).length

      ppKTeacherTotal = ppNSTeacherMale + ppNSTeacherFemale

      g1KTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Kalia' && item.gradeG1 === '1'
      }).length

      g1KTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Kalia' && item.gradeG1 === '1'
      }).length

      g1KTeacherTotal = g1KTeacherMale + g1KTeacherFemale

      g2KTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Kalia' && item.gradeG2 === '1'
      }).length

      g2KTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Kalia' && item.gradeG2 === '1'
      }).length

      g2KTeacherTotal = g2KTeacherMale + g2KTeacherFemale

      g3KTeacherMale = response.data.filter((item) => {
        return item.gender === 'M' && item.upazilla === 'Kalia' && item.gradeG3 === '1'
      }).length

      g3KTeacherFemale = response.data.filter((item) => {
        return item.gender === 'F' && item.upazilla === 'Kalia' && item.gradeG3 === '1'
      }).length

      g3KTeacherTotal = g3KTeacherMale + g3KTeacherFemale
      // Kalia

      // Combined

      ppTotalTeacher = ppNSTeacherTotal + ppLTeacherTotal + ppKTeacherTotal
      g1TotalTeacher = g1NSTeacherTotal + g1LTeacherTotal + g1KTeacherTotal
      g2TotalTeacher = g2NSTeacherTotal + g2LTeacherTotal + g2KTeacherTotal
      g3TotalTeacher = g3NSTeacherTotal + g3LTeacherTotal + g3KTeacherTotal

      totalMaleTeacherNS = ppNSTeacherMale + g1NSTeacherMale + g2NSTeacherMale + g3NSTeacherMale
      totalFemaleTeacherNS =
        ppNSTeacherFemale + g1NSTeacherFemale + g2NSTeacherFemale + g3NSTeacherFemale
      totalTeacherNS = ppNSTeacherTotal + g1NSTeacherTotal + g2NSTeacherTotal + g3NSTeacherTotal
      totalMaleTeacherL = ppLTeacherMale + g1LTeacherMale + g2LTeacherMale + g3LTeacherMale
      totalFemaleTeacherL =
        ppLTeacherFemale + g1LTeacherFemale + g2LTeacherFemale + g3LTeacherFemale
      totalTeacherL = ppLTeacherTotal + g1LTeacherTotal + g2LTeacherTotal + g3LTeacherTotal
      totalMaleTeacherK = ppKTeacherMale + g1KTeacherMale + g2KTeacherMale + g3KTeacherMale
      totalFemaleTeacherK =
        ppKTeacherFemale + g1KTeacherFemale + g2KTeacherFemale + g3KTeacherFemale
      totalTeacherK = ppKTeacherTotal + g1KTeacherTotal + g2KTeacherTotal + g3KTeacherTotal

      grandTotal = ppTotalTeacher + g1TotalTeacher + g2TotalTeacher + g3TotalTeacher
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
        grade: 'PP',
        maleNS: ppNSTeacherMale,
        femaleNS: ppNSTeacherFemale,
        totalTeacherNS: ppNSTeacherTotal,
        maleL: ppLTeacherMale,
        femaleL: ppLTeacherFemale,
        totalTeacherL: ppLTeacherTotal,
        maleK: ppKTeacherMale,
        femaleK: ppKTeacherFemale,
        totalTeacherK: ppKTeacherTotal,
        totalTeacher: ppTotalTeacher,
      },
      {
        grade: 'G1',
        maleNS: g1NSTeacherMale,
        femaleNS: g1NSTeacherFemale,
        totalTeacherNS: g1NSTeacherTotal,
        maleL: g1LTeacherMale,
        femaleL: g1LTeacherFemale,
        totalTeacherL: g1LTeacherTotal,
        maleK: g1KTeacherMale,
        femaleK: g1KTeacherFemale,
        totalTeacherK: g1KTeacherTotal,
        totalTeacher: g1TotalTeacher,
      },
      {
        grade: 'G2',
        maleNS: g2NSTeacherMale,
        femaleNS: g2NSTeacherFemale,
        totalTeacherNS: g2NSTeacherTotal,
        maleL: g2LTeacherMale,
        femaleL: g2LTeacherFemale,
        totalTeacherL: g2LTeacherTotal,
        maleK: g2KTeacherMale,
        femaleK: g2KTeacherFemale,
        totalTeacherK: g2KTeacherTotal,
        totalTeacher: g2TotalTeacher,
      },
      {
        grade: 'G3',
        maleNS: g3NSTeacherMale,
        femaleNS: g3NSTeacherFemale,
        totalTeacherNS: g3NSTeacherTotal,
        maleL: g3LTeacherMale,
        femaleL: g3LTeacherFemale,
        totalTeacherL: g3LTeacherTotal,
        maleK: g3KTeacherMale,
        femaleK: g3KTeacherFemale,
        totalTeacherK: g3KTeacherTotal,
        totalTeacher: g3TotalTeacher,
      },
      {
        grade: 'Total',
        maleNS: totalMaleTeacherNS,
        femaleNS: totalFemaleTeacherNS,
        totalTeacherNS: totalTeacherNS,
        maleL: totalMaleTeacherL,
        femaleL: totalFemaleTeacherL,
        totalTeacherL: totalTeacherL,
        maleK: totalMaleTeacherK,
        femaleK: totalFemaleTeacherK,
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
                      { title: 'Male Teacher in Narail Sadar ', field: 'maleNS' },
                      { title: 'Female Teacher in Narail Sadar', field: 'femaleNS' },
                      {
                        title: 'Total Teacher in Narail Sadar',
                        field: 'totalTeacherNS',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      { title: 'Male Teacher in Lohagara', field: 'maleL' },
                      { title: 'Female Teacher in Lohagara ', field: 'femaleL' },
                      {
                        title: 'Total Teacher in Lohagara',
                        field: 'totalTeacherL',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      { title: 'Male Teacher in Kalia', field: 'maleK' },
                      { title: 'Female Teacher in Kalia ', field: 'femaleK' },
                      {
                        title: 'Total Teacher in Kalia',
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
                        title: 'Total Teacher in Narail',
                        field: 'totalTeacher',
                        cellStyle: {
                          backgroundColor: '#a86046',
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
                      { title: 'School', field: 'schoolName', sorting: 'true' },
                      { title: 'School ID', field: 'schoolId', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      { title: 'Training Year', field: 'trainingYear' },
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
                      { title: 'School', field: 'schoolName', sorting: 'true' },
                      { title: 'School ID', field: 'schoolId', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      { title: 'Training Year', field: 'trainingYear' },
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
                    title={kaliaTeacher.length + ' Teacher Data'}
                    columns={[
                      { title: 'Name', field: 'name', type: 'string', sorting: 'true' },
                      { title: 'School', field: 'schoolName', sorting: 'true' },
                      { title: 'School ID', field: 'schoolId', sorting: 'true' },
                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'Designation',
                        field: 'designation',
                      },
                      { title: 'Training Year', field: 'trainingYear' },
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
                      { title: 'School', field: 'schoolName', sorting: 'true' },
                      { title: 'School ID', field: 'schoolId', sorting: 'true' },
                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'gender', field: 'gender', sorting: 'true' },
                      {
                        title: 'designation',
                        field: 'designation',
                      },
                      { title: 'phone1', field: 'phone1' },
                      { title: 'project', field: 'project' },
                      { title: 'currentAddress', field: 'currentAddress' },
                      { title: 'Grade PPrimary', field: 'gradePPrimary' },
                      { title: 'Grade G1', field: 'gradeG1' },
                      { title: 'Grade G2', field: 'gradeG2' },
                      { title: 'Grade G3', field: 'gradeG3' },
                      { title: 'Grade G4', field: 'gradeG4' },
                      { title: 'Grade G5', field: 'gradeG5' },
                      { title: 'section', field: 'section' },
                      { title: 'Point Teacher', field: 'pointTeacher' },

                      { title: 'trainingYear', field: 'trainingYear' },

                      { title: 'instructionPreprimary', field: 'instructionPreprimary' },
                      { title: 'instructionG1', field: 'instructionG1' },
                      {
                        title: 'instructionG2',
                        field: 'instructionG2',
                      },
                      {
                        title: 'libraryManagementSRM',
                        field: 'libraryManagementSRM',
                      },
                      {
                        title: 'headteacherTraining',
                        field: 'headteacherTraining',
                      },
                      {
                        title: 'goodGovernanceHeadteacher',
                        field: 'goodGovernanceHeadteacher',
                      },
                      {
                        title: 'schoolPerformanceHeadteacher',
                        field: 'schoolPerformanceHeadteacher',
                      },
                      { title: 'activity', field: 'activity' },
                      // { title: 'isActive', field: 'isActive' },
                      // { title: 'isDeleted', field: 'isDeleted' },
                    ]}
                    editable={
                      {
                        // onRowUpdate: (newData, oldData) =>
                        //   new Promise((resolve) => {
                        //     handleRowUpdateTeacher(newData, oldData, resolve)
                        //   }),
                        // onRowAdd: (newData) =>
                        //   new Promise((resolve) => {
                        //     handleRowAddTeacher(newData, resolve)
                        //   }),
                        // onRowDelete: (oldData) =>
                        //   new Promise((resolve) => {
                        //     handleRowDeleteTeacher(oldData, resolve)
                        //   }),
                      }
                    }
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
