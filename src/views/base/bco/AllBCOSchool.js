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

const api = axios.create({
  baseURL: `http://118.179.80.51:8080/`,
})

const AllBCOSchool = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // ALL BCO School
  const [allBCOData, setAllBCOData] = useState([])
  // ALL BCO School

  // Area wise BCO data school
  const [kutubdiaAllBCOSchool, setKutubdiaAllBCOSchool] = useState([])
  const [ukhiyaAllBCOSchool, setUkhiyaAllBCOSchool] = useState([])
  // Area wise BCO data school

  // Area & Month wise BCO data school
  const [kutubdiaAllBCOSchoolCMonth, setKutubdiaAllBCOSchoolCMonth] = useState([])
  const [ukhiyaAllBCOSchoolCMonth, setUkhiyaAllBCOSchoolCMonth] = useState([])

  const [kutubdiaAllBCOSchoolPMonth, setKutubdiaAllBCOSchoolPMonth] = useState([])
  const [ukhiyaAllBCOSchoolPMonth, setUkhiyaAllBCOSchoolPMonth] = useState([])
  // Area & Month wise BCO data school

  // Current date and month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })

  current.setMonth(current.getMonth() - 1)
  const previousMonth = current.toLocaleString('default', { month: 'long' })
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  // Current date and month

  // For error handling row update
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  // For error handling row update

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')

      getAllBookCheckoutSchool(console.log('get bookcheckout called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Book-checkout Data for school
  const getAllBookCheckoutSchool = async () => {
    setIsLoading(true)
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

      setKutubdiaAllBCOSchool(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaAllBCOSchool(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      setKutubdiaAllBCOSchoolCMonth(
        response.data.filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.month === currentMonth && item.year === '2023',
        ),
      )

      setUkhiyaAllBCOSchoolCMonth(
        response.data.filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.month === currentMonth && item.year === '2023',
        ),
      )

      setKutubdiaAllBCOSchoolPMonth(
        response.data.filter(
          (item) =>
            item.upazilla === 'Kutubdia' && item.month === previousMonth && item.year === '2023',
        ),
      )

      setUkhiyaAllBCOSchoolPMonth(
        response.data.filter(
          (item) =>
            item.upazilla === 'Ukhiya' && item.month === previousMonth && item.year === '2023',
        ),
      )

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Row update function
  const handleRowUpdateAllBCO = (newData, oldData, resolve) => {
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
        .patch('http://118.179.80.51:8080/api/v1/book-checkouts/' + newData.id, newData, {
          method: 'PATCH',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataUpdate = [...allBCOData]
          const index = oldData.tableData.id
          dataUpdate[index] = newData
          setAllBCOData([...dataUpdate])
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
  const handleRowAddBCO = (newData, resolve) => {
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
        .post('http://118.179.80.51:8080/api/v1/book-checkouts/', newData, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataToAdd = [...allBCOData]
          dataToAdd.push(newData)
          setAllBCOData([...dataToAdd])
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
  const handleRowDeleteBCO = (oldData, resolve) => {
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
        .delete('http://118.179.80.51:8080/api/v1/book-checkouts/' + oldData.id, {
          method: 'DELETE',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const dataDelete = [...allBCOData]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)
          setAllBCOData([...dataDelete])
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
            <strong>ALL BCO Data School</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Coxbazar(April-2022 Till Now) </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={allBCOData.length + ' BCO Data'}
                    columns={[
                      { title: 'school', field: 'school' },
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'visitor', field: 'visitor' },
                      { title: 'visitorDesignation', field: 'visitorDesignation' },
                      { title: 'visitorOffice', field: 'visitorOffice' },
                      {
                        title: 'headTeacher',
                        field: 'headTeacher',
                      },
                      { title: 'lpo', field: 'lpo', type: 'string' },
                      { title: 'lpoName', field: 'lpoName', type: 'string' },
                      {
                        title: 'lf',
                        field: 'lf',
                        type: 'string',
                      },
                      { title: 'lfName', field: 'lfName', type: 'string' },
                      { title: 'note', field: 'note', type: 'string' },

                      { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl', filtering: false },
                      { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy', filtering: false },
                      {
                        title: 'schoolTotalNoStudent',
                        field: 'schoolTotalNoStudent',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoGirlBC',
                        field: 'schoolTotalNoGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'schoolTotalNoBoyBC',
                        field: 'schoolTotalNoBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'schoolTotalNoStudentBC',
                        field: 'schoolTotalNoStudentBC',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoBookBC',
                        field: 'schoolTotalNoBookBC',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoStudentBCIn',
                        field: 'schoolTotalNoStudentBCIn',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoBookBCIn',
                        field: 'schoolTotalNoBookBCIn',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoSpStudent',
                        field: 'schoolTotalNoSpStudent',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoSpStudentBC',
                        field: 'schoolTotalNoSpStudentBC',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoSpBookBC',
                        field: 'schoolTotalNoSpBookBC',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoSpStudentBCIn',
                        field: 'schoolTotalNoSpStudentBCIn',
                        filtering: false,
                      },

                      {
                        title: 'schoolTotalNoSpBookBCIn',
                        field: 'schoolTotalNoSpBookBCIn',
                        filtering: false,
                      },

                      { title: 'priPrimaryBoy', field: 'priPrimaryBoy', filtering: false },
                      { title: 'priPrimaryGirl', field: 'priPrimaryGirl', filtering: false },
                      { title: 'priPrimaryTotal', field: 'priPrimaryTotal', filtering: false },

                      { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC', filtering: false },
                      {
                        title: 'priPrimaryNoGirlBC',
                        field: 'priPrimaryNoGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoTotalBC',
                        field: 'priPrimaryNoTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'priPrimaryNoBookBoyBC',
                        field: 'priPrimaryNoBookBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookGirlBC',
                        field: 'priPrimaryNoBookGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookTotalBC',
                        field: 'priPrimaryNoBookTotalBC',
                        filtering: false,
                      },

                      { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy', filtering: false },
                      { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl', filtering: false },
                      { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal', filtering: false },

                      {
                        title: 'priPrimaryNoSpBoyBC',
                        field: 'priPrimaryNoSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoSpGirlBC',
                        field: 'priPrimaryNoSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoSpTotalBC',
                        field: 'priPrimaryNoSpTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBC',
                        field: 'priPrimaryNoBookSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBC',
                        field: 'priPrimaryNoBookSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBC',
                        field: 'priPrimaryNoBookSpTotalBC',
                        filtering: false,
                      },

                      { title: 'classOneBoy', field: 'classOneBoy', filtering: false },
                      { title: 'classOneGirl', field: 'classOneGirl', filtering: false },
                      { title: 'classOneTotal', field: 'classOneTotal', filtering: false },

                      { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC', filtering: false },
                      { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC', filtering: false },
                      { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC', filtering: false },

                      {
                        title: 'classOneNoBookBoyBC',
                        field: 'classOneNoBookBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookGirlBC',
                        field: 'classOneNoBookGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookTotalBC',
                        field: 'classOneNoBookTotalBC',
                        filtering: false,
                      },

                      { title: 'classOneSpBoy', field: 'classOneSpBoy', filtering: false },
                      { title: 'classOneSpGirl', field: 'classOneSpGirl', filtering: false },
                      { title: 'classOneSpTotal', field: 'classOneSpTotal', filtering: false },

                      { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC', filtering: false },
                      {
                        title: 'classOneNoSpGirlBC',
                        field: 'classOneNoSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoSpTotalBC',
                        field: 'classOneNoSpTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classOneNoBookSpBoyBC',
                        field: 'classOneNoBookSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookSpGirlBC',
                        field: 'classOneNoBookSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookSpTotalBC',
                        field: 'classOneNoBookSpTotalBC',
                        filtering: false,
                      },

                      { title: 'classTwoBoy', field: 'classTwoBoy', filtering: false },
                      { title: 'classTwoGirl', field: 'classTwoGirl', filtering: false },
                      { title: 'classTwoTotal', field: 'classTwoTotal', filtering: false },

                      { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC', filtering: false },
                      { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC', filtering: false },
                      { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC', filtering: false },

                      {
                        title: 'classTwoNoBookBoyBC',
                        field: 'classTwoNoBookBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookGirlBC',
                        field: 'classTwoNoBookGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookTotalBC',
                        field: 'classTwoNoBookTotalBC',
                        filtering: false,
                      },

                      { title: 'classTwoSpBoy', field: 'classTwoSpBoy', filtering: false },
                      { title: 'classTwoSpGirl', field: 'classTwoSpGirl', filtering: false },
                      { title: 'classTwoSpTotal', field: 'classTwoSpTotal', filtering: false },

                      { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC', filtering: false },
                      {
                        title: 'classTwoNoSpGirlBC',
                        field: 'classTwoNoSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoSpTotalBC',
                        field: 'classTwoNoSpTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classTwoNoBookSpBoyBC',
                        field: 'classTwoNoBookSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookSpGirlBC',
                        field: 'classTwoNoBookSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookSpTotalBC',
                        field: 'classTwoNoBookSpTotalBC',
                        filtering: false,
                      },

                      { title: 'classThreeBoy', field: 'classThreeBoy', filtering: false },
                      { title: 'classThreeGirl', field: 'classThreeGirl', filtering: false },
                      { title: 'classThreeTotal', field: 'classThreeTotal', filtering: false },

                      { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC', filtering: false },
                      {
                        title: 'classThreeNoGirlBC',
                        field: 'classThreeNoGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoTotalBC',
                        field: 'classThreeNoTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classThreeNoBookBoyBC',
                        field: 'classThreeNoBookBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookGirlBC',
                        field: 'classThreeNoBookGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookTotalBC',
                        field: 'classThreeNoBookTotalBC',
                        filtering: false,
                      },

                      { title: 'classThreeSpBoy', field: 'classThreeSpBoy', filtering: false },
                      { title: 'classThreeSpGirl', field: 'classThreeSpGirl', filtering: false },
                      { title: 'classThreeSpTotal', field: 'classThreeSpTotal', filtering: false },

                      {
                        title: 'classThreeNoSpBoyBC',
                        field: 'classThreeNoSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoSpGirlBC',
                        field: 'classThreeNoSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoSpTotalBC',
                        field: 'classThreeNoSpTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classThreeNoBookSpBoyBC',
                        field: 'classThreeNoBookSpBoyBC',

                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookSpGirlBC',
                        field: 'classThreeNoBookSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookSpTotalBC',
                        field: 'classThreeNoBookSpTotalBC',
                        filtering: false,
                      },

                      { title: 'classFourBoy', field: 'classFourBoy', filtering: false },
                      { title: 'classFourGirl', field: 'classFourGirl', filtering: false },
                      { title: 'classFourTotal', field: 'classFourTotal', filtering: false },

                      { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC', filtering: false },
                      { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC', filtering: false },
                      {
                        title: 'classFourNoTotalBC',
                        field: 'classFourNoTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classFourNoBookBoyBC',
                        field: 'classFourNoBookBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookGirlBC',
                        field: 'classFourNoBookGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookTotalBC',
                        field: 'classFourNoBookTotalBC',
                        filtering: false,
                      },

                      { title: 'classFourSpBoy', field: 'classFourSpBoy', filtering: false },
                      { title: 'classFourSpGirl', field: 'classFourSpGirl', filtering: false },
                      { title: 'classFourSpTotal', field: 'classFourSpTotal', filtering: false },

                      {
                        title: 'classFourNoSpBoyBC',
                        field: 'classFourNoSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoSpGirlBC',
                        field: 'classFourNoSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoSpTotalBC',
                        field: 'classFourNoSpTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classFourNoBookSpBoyBC',
                        field: 'classFourNoBookSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookSpGirlBC',
                        field: 'classFourNoBookSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookSpTotalBC',
                        field: 'classFourNoBookSpTotalBC',
                        filtering: false,
                      },

                      { title: 'classFiveBoy', field: 'classFiveBoy', filtering: false },
                      { title: 'classFiveGirl', field: 'classFiveGirl', filtering: false },
                      { title: 'classFiveTotal', field: 'classFiveTotal', filtering: false },

                      { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC', filtering: false },
                      { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC', filtering: false },
                      {
                        title: 'classFiveNoTotalBC',
                        field: 'classFiveNoTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classFiveNoBookBoyBC',
                        field: 'classFiveNoBookBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookGirlBC',
                        field: 'classFiveNoBookGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookTotalBC',
                        field: 'classFiveNoBookTotalBC',
                        filtering: false,
                      },

                      { title: 'classFiveSpBoy', field: 'classFiveSpBoy', filtering: false },
                      { title: 'classFiveSpGirl', field: 'classFiveSpGirl', filtering: false },
                      { title: 'classFiveSpTotal', field: 'classFiveSpTotal', filtering: false },

                      {
                        title: 'classFiveNoSpBoyBC',
                        field: 'classFiveNoSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoSpGirlBC',
                        field: 'classFiveNoSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoSpTotalBC',
                        field: 'classFiveNoSpTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'classFiveNoBookSpBoyBC',
                        field: 'classFiveNoBookSpBoyBC',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookSpGirlBC',
                        field: 'classFiveNoBookSpGirlBC',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookSpTotalBC',
                        field: 'classFiveNoBookSpTotalBC',
                        filtering: false,
                      },

                      {
                        title: 'priPrimaryNoBoyBCIn',
                        field: 'priPrimaryNoBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoGirlBCIn',
                        field: 'priPrimaryNoGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoTotalBCIn',
                        field: 'priPrimaryNoTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'priPrimaryNoBookBoyBCIn',
                        field: 'priPrimaryNoBookBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookGirlBCIn',
                        field: 'priPrimaryNoBookGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookTotalBCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'priPrimaryNoSpBoyBCIn',
                        field: 'priPrimaryNoSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoSpGirlBCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoSpTotalBCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                        filtering: false,
                      },

                      { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn', filtering: false },
                      {
                        title: 'classOneNoGirlBCIn',
                        field: 'classOneNoGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoTotalBCIn',
                        field: 'classOneNoTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classOneNoBookBoyBCIn',
                        field: 'classOneNoBookBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookGirlBCIn',
                        field: 'classOneNoBookGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookTotalBCIn',
                        field: 'classOneNoBookTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classOneNoSpBoyBCIn',
                        field: 'classOneNoSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoSpGirlBCIn',
                        field: 'classOneNoSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoSpTotalBCIn',
                        field: 'classOneNoSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classOneNoBookSpBoyBCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookSpGirlBCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classOneNoBookSpTotalBCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                        filtering: false,
                      },

                      { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn', filtering: false },
                      {
                        title: 'classTwoNoGirlBCIn',
                        field: 'classTwoNoGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoTotalBCIn',
                        field: 'classTwoNoTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classTwoNoBookBoyBCIn',
                        field: 'classTwoNoBookBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookGirlBCIn',
                        field: 'classTwoNoBookGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookTotalBCIn',
                        field: 'classTwoNoBookTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classTwoNoSpBoyBCIn',
                        field: 'classTwoNoSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoSpGirlBCIn',
                        field: 'classTwoNoSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoSpTotalBCIn',
                        field: 'classTwoNoSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classTwoNoBookSpBoyBCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookSpGirlBCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classTwoNoBookSpTotalBCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classThreeNoBoyBCIn',
                        field: 'classThreeNoBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoGirlBCIn',
                        field: 'classThreeNoGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoTotalBCIn',
                        field: 'classThreeNoTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classThreeNoBookBoyBCIn',
                        field: 'classThreeNoBookBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookGirlBCIn',
                        field: 'classThreeNoBookGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookTotalBCIn',
                        field: 'classThreeNoBookTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classThreeNoSpBoyBCIn',
                        field: 'classThreeNoSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoSpGirlBCIn',
                        field: 'classThreeNoSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoSpTotalBCIn',
                        field: 'classThreeNoSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classThreeNoBookSpBoyBCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookSpGirlBCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classThreeNoBookSpTotalBCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFourNoBoyBCIn',
                        field: 'classFourNoBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoGirlBCIn',
                        field: 'classFourNoGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoTotalBCIn',
                        field: 'classFourNoTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFourNoBookBoyBCIn',
                        field: 'classFourNoBookBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookGirlBCIn',
                        field: 'classFourNoBookGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookTotalBCIn',
                        field: 'classFourNoBookTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFourNoSpBoyBCIn',
                        field: 'classFourNoSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoSpGirlBCIn',
                        field: 'classFourNoSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoSpTotalBCIn',
                        field: 'classFourNoSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFourNoBookSpBoyBCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookSpGirlBCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFourNoBookSpTotalBCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFiveNoBoyBCIn',
                        field: 'classFiveNoBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoGirlBCIn',
                        field: 'classFiveNoGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoTotalBCIn',
                        field: 'classFiveNoTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFiveNoBookBoyBCIn',
                        field: 'classFiveNoBookBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookGirlBCIn',
                        field: 'classFiveNoBookGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookTotalBCIn',
                        field: 'classFiveNoBookTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFiveNoSpBoyBCIn',
                        field: 'classFiveNoSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoSpGirlBCIn',
                        field: 'classFiveNoSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoSpTotalBCIn',
                        field: 'classFiveNoSpTotalBCIn',
                        filtering: false,
                      },

                      {
                        title: 'classFiveNoBookSpBoyBCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookSpGirlBCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                        filtering: false,
                      },
                      {
                        title: 'classFiveNoBookSpTotalBCIn',
                        field: 'classFiveNoBookSpTotalBCIn',
                        filtering: false,
                      },
                    ]}
                    editable={{
                      onRowAdd: (newData) =>
                        new Promise((resolve) => {
                          handleRowAddBCO(newData, resolve)
                        }),
                      onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                          handleRowUpdateAllBCO(newData, oldData, resolve)
                        }),
                      onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                          handleRowDeleteBCO(oldData, resolve)
                        }),
                    }}
                    options={{
                      exportButton: true,
                      exportAllData: true,
                      filtering: true,
                      search: true,
                      grouping: true,
                      sorting: true,
                      detailPanelType: 'single',
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
                    data={allBCOData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Ukhiya(April-2022 Till Now) </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaAllBCOSchool.length + ' BCO Data School Ukhiya'}
                    columns={[
                      { title: 'school', field: 'school' },
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'visitor', field: 'visitor' },
                      { title: 'visitorDesignation', field: 'visitorDesignation' },
                      { title: 'visitorOffice', field: 'visitorOffice' },
                      {
                        title: 'headTeacher',
                        field: 'headTeacher',
                      },
                      { title: 'lpo', field: 'lpo', type: 'string' },
                      { title: 'lpoName', field: 'lpoName', type: 'string' },
                      {
                        title: 'lf',
                        field: 'lf',
                        type: 'string',
                      },
                      { title: 'lfName', field: 'lfName', type: 'string' },
                      { title: 'note', field: 'note', type: 'string' },
                      { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                      { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                      { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                      { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                      { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                      { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                      { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                      { title: 'schoolTotalNoStudentBCIn', field: 'schoolTotalNoStudentBCIn' },

                      { title: 'schoolTotalNoBookBCIn', field: 'schoolTotalNoBookBCIn' },

                      { title: 'schoolTotalNoSpStudent', field: 'schoolTotalNoSpStudent' },

                      { title: 'schoolTotalNoSpStudentBC', field: 'schoolTotalNoSpStudentBC' },

                      { title: 'schoolTotalNoSpBookBC', field: 'schoolTotalNoSpBookBC' },

                      { title: 'schoolTotalNoSpStudentBCIn', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: 'schoolTotalNoSpBookBCIn', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                      { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                      { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                      { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                      { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                      { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                      { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy' },
                      { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl' },
                      { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal' },

                      { title: 'priPrimaryNoSpBoyBC', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'priPrimaryNoSpGirlBC', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'priPrimaryNoSpTotalBC', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'priPrimaryNoBookSpBoyBC',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBC',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBC',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'classOneBoy', field: 'classOneBoy' },
                      { title: 'classOneGirl', field: 'classOneGirl' },
                      { title: 'classOneTotal', field: 'classOneTotal' },

                      { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                      { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                      { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                      { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                      { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                      { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                      { title: 'classOneSpBoy', field: 'classOneSpBoy' },
                      { title: 'classOneSpGirl', field: 'classOneSpGirl' },
                      { title: 'classOneSpTotal', field: 'classOneSpTotal' },

                      { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC' },
                      { title: 'classOneNoSpGirlBC', field: 'classOneNoSpGirlBC' },
                      { title: 'classOneNoSpTotalBC', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'classOneNoBookSpBoyBC',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'classOneNoBookSpGirlBC',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'classOneNoBookSpTotalBC',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'classTwoBoy', field: 'classTwoBoy' },
                      { title: 'classTwoGirl', field: 'classTwoGirl' },
                      { title: 'classTwoTotal', field: 'classTwoTotal' },

                      { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                      { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                      { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                      { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                      { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                      { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                      { title: 'classTwoSpBoy', field: 'classTwoSpBoy' },
                      { title: 'classTwoSpGirl', field: 'classTwoSpGirl' },
                      { title: 'classTwoSpTotal', field: 'classTwoSpTotal' },

                      { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC' },
                      { title: 'classTwoNoSpGirlBC', field: 'classTwoNoSpGirlBC' },
                      { title: 'classTwoNoSpTotalBC', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'classTwoNoBookSpBoyBC',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBC',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBC',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'classThreeBoy', field: 'classThreeBoy' },
                      { title: 'classThreeGirl', field: 'classThreeGirl' },
                      { title: 'classThreeTotal', field: 'classThreeTotal' },

                      { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                      { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                      { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                      { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                      { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                      { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                      { title: 'classThreeSpBoy', field: 'classThreeSpBoy' },
                      { title: 'classThreeSpGirl', field: 'classThreeSpGirl' },
                      { title: 'classThreeSpTotal', field: 'classThreeSpTotal' },

                      { title: 'classThreeNoSpBoyBC', field: 'classThreeNoSpBoyBC' },
                      { title: 'classThreeNoSpGirlBC', field: 'classThreeNoSpGirlBC' },
                      { title: 'classThreeNoSpTotalBC', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'classThreeNoBookSpBoyBC',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBC',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBC',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'classFourBoy', field: 'classFourBoy' },
                      { title: 'classFourGirl', field: 'classFourGirl' },
                      { title: 'classFourTotal', field: 'classFourTotal' },

                      { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                      { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                      { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                      { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                      { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                      { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                      { title: 'classFourSpBoy', field: 'classFourSpBoy' },
                      { title: 'classFourSpGirl', field: 'classFourSpGirl' },
                      { title: 'classFourSpTotal', field: 'classFourSpTotal' },

                      { title: 'classFourNoSpBoyBC', field: 'classFourNoSpBoyBC' },
                      { title: 'classFourNoSpGirlBC', field: 'classFourNoSpGirlBC' },
                      { title: 'classFourNoSpTotalBC', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'classFourNoBookSpBoyBC',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'classFourNoBookSpGirlBC',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'classFourNoBookSpTotalBC',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'classFiveBoy', field: 'classFiveBoy' },
                      { title: 'classFiveGirl', field: 'classFiveGirl' },
                      { title: 'classFiveTotal', field: 'classFiveTotal' },

                      { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                      { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                      { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                      { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                      { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                      { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },

                      { title: 'classFiveSpBoy', field: 'classFiveSpBoy' },
                      { title: 'classFiveSpGirl', field: 'classFiveSpGirl' },
                      { title: 'classFiveSpTotal', field: 'classFiveSpTotal' },

                      { title: 'classFiveNoSpBoyBC', field: 'classFiveNoSpBoyBC' },
                      { title: 'classFiveNoSpGirlBC', field: 'classFiveNoSpGirlBC' },
                      { title: 'classFiveNoSpTotalBC', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'classFiveNoBookSpBoyBC',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBC',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBC',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'priPrimaryNoBoyBCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'priPrimaryNoGirlBCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'priPrimaryNoTotalBCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'priPrimaryNoBookBoyBCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'priPrimaryNoBookGirlBCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'priPrimaryNoBookTotalBCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'priPrimaryNoSpBoyBCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'priPrimaryNoSpGirlBCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoSpTotalBCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'classOneNoGirlBCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'classOneNoTotalBCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'classOneNoBookBoyBCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'classOneNoBookGirlBCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'classOneNoBookTotalBCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'classOneNoSpBoyBCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'classOneNoSpGirlBCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoSpTotalBCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'classOneNoBookSpBoyBCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classOneNoBookSpGirlBCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoBookSpTotalBCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'classTwoNoGirlBCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'classTwoNoTotalBCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'classTwoNoBookBoyBCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'classTwoNoBookGirlBCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'classTwoNoBookTotalBCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'classTwoNoSpBoyBCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'classTwoNoSpGirlBCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoSpTotalBCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'classTwoNoBookSpBoyBCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'classThreeNoBoyBCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'classThreeNoGirlBCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'classThreeNoTotalBCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'classThreeNoBookBoyBCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'classThreeNoBookGirlBCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'classThreeNoBookTotalBCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'classThreeNoSpBoyBCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'classThreeNoSpGirlBCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoSpTotalBCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'classThreeNoBookSpBoyBCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'classFourNoBoyBCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'classFourNoGirlBCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'classFourNoTotalBCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'classFourNoBookBoyBCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'classFourNoBookGirlBCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'classFourNoBookTotalBCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'classFourNoSpBoyBCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'classFourNoSpGirlBCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoSpTotalBCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'classFourNoBookSpBoyBCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFourNoBookSpGirlBCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoBookSpTotalBCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'classFiveNoBoyBCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'classFiveNoGirlBCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'classFiveNoTotalBCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'classFiveNoBookBoyBCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'classFiveNoBookGirlBCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'classFiveNoBookTotalBCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'classFiveNoSpBoyBCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'classFiveNoSpGirlBCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoSpTotalBCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'classFiveNoBookSpBoyBCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBCIn',
                        field: 'classFiveNoBookSpTotalBCIn',
                      },
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
                    data={ukhiyaAllBCOSchool}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Kutubdia(April-2022 Till Now)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaAllBCOSchool.length + ' BCO Data School Kutubdia'}
                    columns={[
                      { title: 'school', field: 'school' },
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'visitor', field: 'visitor' },
                      { title: 'visitorDesignation', field: 'visitorDesignation' },
                      { title: 'visitorOffice', field: 'visitorOffice' },
                      {
                        title: 'headTeacher',
                        field: 'headTeacher',
                      },
                      { title: 'lpo', field: 'lpo', type: 'string' },
                      { title: 'lpoName', field: 'lpoName', type: 'string' },
                      {
                        title: 'lf',
                        field: 'lf',
                        type: 'string',
                      },
                      { title: 'lfName', field: 'lfName', type: 'string' },
                      { title: 'note', field: 'note', type: 'string' },
                      { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                      { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                      { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                      { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                      { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                      { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                      { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                      { title: 'schoolTotalNoStudentBCIn', field: 'schoolTotalNoStudentBCIn' },

                      { title: 'schoolTotalNoBookBCIn', field: 'schoolTotalNoBookBCIn' },

                      { title: 'schoolTotalNoSpStudent', field: 'schoolTotalNoSpStudent' },

                      { title: 'schoolTotalNoSpStudentBC', field: 'schoolTotalNoSpStudentBC' },

                      { title: 'schoolTotalNoSpBookBC', field: 'schoolTotalNoSpBookBC' },

                      { title: 'schoolTotalNoSpStudentBCIn', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: 'schoolTotalNoSpBookBCIn', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                      { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                      { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                      { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                      { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                      { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                      { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy' },
                      { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl' },
                      { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal' },

                      { title: 'priPrimaryNoSpBoyBC', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'priPrimaryNoSpGirlBC', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'priPrimaryNoSpTotalBC', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'priPrimaryNoBookSpBoyBC',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBC',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBC',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'classOneBoy', field: 'classOneBoy' },
                      { title: 'classOneGirl', field: 'classOneGirl' },
                      { title: 'classOneTotal', field: 'classOneTotal' },

                      { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                      { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                      { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                      { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                      { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                      { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                      { title: 'classOneSpBoy', field: 'classOneSpBoy' },
                      { title: 'classOneSpGirl', field: 'classOneSpGirl' },
                      { title: 'classOneSpTotal', field: 'classOneSpTotal' },

                      { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC' },
                      { title: 'classOneNoSpGirlBC', field: 'classOneNoSpGirlBC' },
                      { title: 'classOneNoSpTotalBC', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'classOneNoBookSpBoyBC',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'classOneNoBookSpGirlBC',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'classOneNoBookSpTotalBC',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'classTwoBoy', field: 'classTwoBoy' },
                      { title: 'classTwoGirl', field: 'classTwoGirl' },
                      { title: 'classTwoTotal', field: 'classTwoTotal' },

                      { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                      { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                      { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                      { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                      { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                      { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                      { title: 'classTwoSpBoy', field: 'classTwoSpBoy' },
                      { title: 'classTwoSpGirl', field: 'classTwoSpGirl' },
                      { title: 'classTwoSpTotal', field: 'classTwoSpTotal' },

                      { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC' },
                      { title: 'classTwoNoSpGirlBC', field: 'classTwoNoSpGirlBC' },
                      { title: 'classTwoNoSpTotalBC', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'classTwoNoBookSpBoyBC',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBC',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBC',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'classThreeBoy', field: 'classThreeBoy' },
                      { title: 'classThreeGirl', field: 'classThreeGirl' },
                      { title: 'classThreeTotal', field: 'classThreeTotal' },

                      { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                      { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                      { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                      { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                      { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                      { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                      { title: 'classThreeSpBoy', field: 'classThreeSpBoy' },
                      { title: 'classThreeSpGirl', field: 'classThreeSpGirl' },
                      { title: 'classThreeSpTotal', field: 'classThreeSpTotal' },

                      { title: 'classThreeNoSpBoyBC', field: 'classThreeNoSpBoyBC' },
                      { title: 'classThreeNoSpGirlBC', field: 'classThreeNoSpGirlBC' },
                      { title: 'classThreeNoSpTotalBC', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'classThreeNoBookSpBoyBC',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBC',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBC',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'classFourBoy', field: 'classFourBoy' },
                      { title: 'classFourGirl', field: 'classFourGirl' },
                      { title: 'classFourTotal', field: 'classFourTotal' },

                      { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                      { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                      { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                      { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                      { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                      { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                      { title: 'classFourSpBoy', field: 'classFourSpBoy' },
                      { title: 'classFourSpGirl', field: 'classFourSpGirl' },
                      { title: 'classFourSpTotal', field: 'classFourSpTotal' },

                      { title: 'classFourNoSpBoyBC', field: 'classFourNoSpBoyBC' },
                      { title: 'classFourNoSpGirlBC', field: 'classFourNoSpGirlBC' },
                      { title: 'classFourNoSpTotalBC', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'classFourNoBookSpBoyBC',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'classFourNoBookSpGirlBC',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'classFourNoBookSpTotalBC',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'classFiveBoy', field: 'classFiveBoy' },
                      { title: 'classFiveGirl', field: 'classFiveGirl' },
                      { title: 'classFiveTotal', field: 'classFiveTotal' },

                      { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                      { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                      { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                      { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                      { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                      { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },

                      { title: 'classFiveSpBoy', field: 'classFiveSpBoy' },
                      { title: 'classFiveSpGirl', field: 'classFiveSpGirl' },
                      { title: 'classFiveSpTotal', field: 'classFiveSpTotal' },

                      { title: 'classFiveNoSpBoyBC', field: 'classFiveNoSpBoyBC' },
                      { title: 'classFiveNoSpGirlBC', field: 'classFiveNoSpGirlBC' },
                      { title: 'classFiveNoSpTotalBC', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'classFiveNoBookSpBoyBC',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBC',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBC',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'priPrimaryNoBoyBCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'priPrimaryNoGirlBCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'priPrimaryNoTotalBCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'priPrimaryNoBookBoyBCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'priPrimaryNoBookGirlBCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'priPrimaryNoBookTotalBCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'priPrimaryNoSpBoyBCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'priPrimaryNoSpGirlBCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoSpTotalBCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'classOneNoGirlBCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'classOneNoTotalBCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'classOneNoBookBoyBCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'classOneNoBookGirlBCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'classOneNoBookTotalBCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'classOneNoSpBoyBCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'classOneNoSpGirlBCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoSpTotalBCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'classOneNoBookSpBoyBCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classOneNoBookSpGirlBCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoBookSpTotalBCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'classTwoNoGirlBCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'classTwoNoTotalBCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'classTwoNoBookBoyBCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'classTwoNoBookGirlBCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'classTwoNoBookTotalBCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'classTwoNoSpBoyBCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'classTwoNoSpGirlBCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoSpTotalBCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'classTwoNoBookSpBoyBCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'classThreeNoBoyBCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'classThreeNoGirlBCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'classThreeNoTotalBCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'classThreeNoBookBoyBCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'classThreeNoBookGirlBCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'classThreeNoBookTotalBCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'classThreeNoSpBoyBCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'classThreeNoSpGirlBCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoSpTotalBCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'classThreeNoBookSpBoyBCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'classFourNoBoyBCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'classFourNoGirlBCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'classFourNoTotalBCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'classFourNoBookBoyBCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'classFourNoBookGirlBCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'classFourNoBookTotalBCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'classFourNoSpBoyBCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'classFourNoSpGirlBCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoSpTotalBCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'classFourNoBookSpBoyBCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFourNoBookSpGirlBCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoBookSpTotalBCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'classFiveNoBoyBCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'classFiveNoGirlBCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'classFiveNoTotalBCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'classFiveNoBookBoyBCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'classFiveNoBookGirlBCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'classFiveNoBookTotalBCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'classFiveNoSpBoyBCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'classFiveNoSpGirlBCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoSpTotalBCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'classFiveNoBookSpBoyBCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBCIn',
                        field: 'classFiveNoBookSpTotalBCIn',
                      },
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
                    data={kutubdiaAllBCOSchool}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Ukhiya({previousMonthYear}) </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaAllBCOSchoolPMonth.length + ' BCO Data'}
                    columns={[
                      { title: 'school', field: 'school' },
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'visitor', field: 'visitor' },
                      { title: 'visitorDesignation', field: 'visitorDesignation' },
                      { title: 'visitorOffice', field: 'visitorOffice' },
                      {
                        title: 'headTeacher',
                        field: 'headTeacher',
                      },
                      { title: 'lpo', field: 'lpo', type: 'string' },
                      { title: 'lpoName', field: 'lpoName', type: 'string' },
                      {
                        title: 'lf',
                        field: 'lf',
                        type: 'string',
                      },
                      { title: 'lfName', field: 'lfName', type: 'string' },
                      { title: 'note', field: 'note', type: 'string' },
                      { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                      { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                      { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                      { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                      { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                      { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                      { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                      { title: 'schoolTotalNoStudentBCIn', field: 'schoolTotalNoStudentBCIn' },

                      { title: 'schoolTotalNoBookBCIn', field: 'schoolTotalNoBookBCIn' },

                      { title: 'schoolTotalNoSpStudent', field: 'schoolTotalNoSpStudent' },

                      { title: 'schoolTotalNoSpStudentBC', field: 'schoolTotalNoSpStudentBC' },

                      { title: 'schoolTotalNoSpBookBC', field: 'schoolTotalNoSpBookBC' },

                      { title: 'schoolTotalNoSpStudentBCIn', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: 'schoolTotalNoSpBookBCIn', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                      { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                      { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                      { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                      { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                      { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                      { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy' },
                      { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl' },
                      { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal' },

                      { title: 'priPrimaryNoSpBoyBC', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'priPrimaryNoSpGirlBC', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'priPrimaryNoSpTotalBC', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'priPrimaryNoBookSpBoyBC',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBC',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBC',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'classOneBoy', field: 'classOneBoy' },
                      { title: 'classOneGirl', field: 'classOneGirl' },
                      { title: 'classOneTotal', field: 'classOneTotal' },

                      { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                      { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                      { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                      { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                      { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                      { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                      { title: 'classOneSpBoy', field: 'classOneSpBoy' },
                      { title: 'classOneSpGirl', field: 'classOneSpGirl' },
                      { title: 'classOneSpTotal', field: 'classOneSpTotal' },

                      { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC' },
                      { title: 'classOneNoSpGirlBC', field: 'classOneNoSpGirlBC' },
                      { title: 'classOneNoSpTotalBC', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'classOneNoBookSpBoyBC',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'classOneNoBookSpGirlBC',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'classOneNoBookSpTotalBC',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'classTwoBoy', field: 'classTwoBoy' },
                      { title: 'classTwoGirl', field: 'classTwoGirl' },
                      { title: 'classTwoTotal', field: 'classTwoTotal' },

                      { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                      { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                      { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                      { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                      { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                      { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                      { title: 'classTwoSpBoy', field: 'classTwoSpBoy' },
                      { title: 'classTwoSpGirl', field: 'classTwoSpGirl' },
                      { title: 'classTwoSpTotal', field: 'classTwoSpTotal' },

                      { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC' },
                      { title: 'classTwoNoSpGirlBC', field: 'classTwoNoSpGirlBC' },
                      { title: 'classTwoNoSpTotalBC', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'classTwoNoBookSpBoyBC',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBC',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBC',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'classThreeBoy', field: 'classThreeBoy' },
                      { title: 'classThreeGirl', field: 'classThreeGirl' },
                      { title: 'classThreeTotal', field: 'classThreeTotal' },

                      { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                      { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                      { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                      { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                      { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                      { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                      { title: 'classThreeSpBoy', field: 'classThreeSpBoy' },
                      { title: 'classThreeSpGirl', field: 'classThreeSpGirl' },
                      { title: 'classThreeSpTotal', field: 'classThreeSpTotal' },

                      { title: 'classThreeNoSpBoyBC', field: 'classThreeNoSpBoyBC' },
                      { title: 'classThreeNoSpGirlBC', field: 'classThreeNoSpGirlBC' },
                      { title: 'classThreeNoSpTotalBC', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'classThreeNoBookSpBoyBC',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBC',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBC',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'classFourBoy', field: 'classFourBoy' },
                      { title: 'classFourGirl', field: 'classFourGirl' },
                      { title: 'classFourTotal', field: 'classFourTotal' },

                      { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                      { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                      { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                      { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                      { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                      { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                      { title: 'classFourSpBoy', field: 'classFourSpBoy' },
                      { title: 'classFourSpGirl', field: 'classFourSpGirl' },
                      { title: 'classFourSpTotal', field: 'classFourSpTotal' },

                      { title: 'classFourNoSpBoyBC', field: 'classFourNoSpBoyBC' },
                      { title: 'classFourNoSpGirlBC', field: 'classFourNoSpGirlBC' },
                      { title: 'classFourNoSpTotalBC', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'classFourNoBookSpBoyBC',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'classFourNoBookSpGirlBC',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'classFourNoBookSpTotalBC',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'classFiveBoy', field: 'classFiveBoy' },
                      { title: 'classFiveGirl', field: 'classFiveGirl' },
                      { title: 'classFiveTotal', field: 'classFiveTotal' },

                      { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                      { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                      { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                      { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                      { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                      { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },

                      { title: 'classFiveSpBoy', field: 'classFiveSpBoy' },
                      { title: 'classFiveSpGirl', field: 'classFiveSpGirl' },
                      { title: 'classFiveSpTotal', field: 'classFiveSpTotal' },

                      { title: 'classFiveNoSpBoyBC', field: 'classFiveNoSpBoyBC' },
                      { title: 'classFiveNoSpGirlBC', field: 'classFiveNoSpGirlBC' },
                      { title: 'classFiveNoSpTotalBC', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'classFiveNoBookSpBoyBC',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBC',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBC',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'priPrimaryNoBoyBCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'priPrimaryNoGirlBCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'priPrimaryNoTotalBCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'priPrimaryNoBookBoyBCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'priPrimaryNoBookGirlBCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'priPrimaryNoBookTotalBCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'priPrimaryNoSpBoyBCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'priPrimaryNoSpGirlBCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoSpTotalBCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'classOneNoGirlBCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'classOneNoTotalBCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'classOneNoBookBoyBCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'classOneNoBookGirlBCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'classOneNoBookTotalBCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'classOneNoSpBoyBCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'classOneNoSpGirlBCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoSpTotalBCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'classOneNoBookSpBoyBCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classOneNoBookSpGirlBCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoBookSpTotalBCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'classTwoNoGirlBCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'classTwoNoTotalBCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'classTwoNoBookBoyBCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'classTwoNoBookGirlBCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'classTwoNoBookTotalBCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'classTwoNoSpBoyBCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'classTwoNoSpGirlBCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoSpTotalBCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'classTwoNoBookSpBoyBCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'classThreeNoBoyBCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'classThreeNoGirlBCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'classThreeNoTotalBCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'classThreeNoBookBoyBCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'classThreeNoBookGirlBCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'classThreeNoBookTotalBCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'classThreeNoSpBoyBCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'classThreeNoSpGirlBCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoSpTotalBCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'classThreeNoBookSpBoyBCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'classFourNoBoyBCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'classFourNoGirlBCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'classFourNoTotalBCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'classFourNoBookBoyBCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'classFourNoBookGirlBCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'classFourNoBookTotalBCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'classFourNoSpBoyBCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'classFourNoSpGirlBCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoSpTotalBCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'classFourNoBookSpBoyBCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFourNoBookSpGirlBCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoBookSpTotalBCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'classFiveNoBoyBCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'classFiveNoGirlBCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'classFiveNoTotalBCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'classFiveNoBookBoyBCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'classFiveNoBookGirlBCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'classFiveNoBookTotalBCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'classFiveNoSpBoyBCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'classFiveNoSpGirlBCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoSpTotalBCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'classFiveNoBookSpBoyBCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBCIn',
                        field: 'classFiveNoBookSpTotalBCIn',
                      },
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
                    data={ukhiyaAllBCOSchoolPMonth}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Kutubdia({previousMonthYear}) </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaAllBCOSchoolPMonth.length + ' BCO Data'}
                    columns={[
                      { title: 'school', field: 'school' },
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'visitor', field: 'visitor' },
                      { title: 'visitorDesignation', field: 'visitorDesignation' },
                      { title: 'visitorOffice', field: 'visitorOffice' },
                      {
                        title: 'headTeacher',
                        field: 'headTeacher',
                      },
                      { title: 'lpo', field: 'lpo', type: 'string' },
                      { title: 'lpoName', field: 'lpoName', type: 'string' },
                      {
                        title: 'lf',
                        field: 'lf',
                        type: 'string',
                      },
                      { title: 'lfName', field: 'lfName', type: 'string' },
                      { title: 'note', field: 'note', type: 'string' },
                      { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                      { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                      { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                      { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                      { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                      { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                      { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                      { title: 'schoolTotalNoStudentBCIn', field: 'schoolTotalNoStudentBCIn' },

                      { title: 'schoolTotalNoBookBCIn', field: 'schoolTotalNoBookBCIn' },

                      { title: 'schoolTotalNoSpStudent', field: 'schoolTotalNoSpStudent' },

                      { title: 'schoolTotalNoSpStudentBC', field: 'schoolTotalNoSpStudentBC' },

                      { title: 'schoolTotalNoSpBookBC', field: 'schoolTotalNoSpBookBC' },

                      { title: 'schoolTotalNoSpStudentBCIn', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: 'schoolTotalNoSpBookBCIn', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                      { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                      { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                      { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                      { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                      { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                      { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy' },
                      { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl' },
                      { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal' },

                      { title: 'priPrimaryNoSpBoyBC', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'priPrimaryNoSpGirlBC', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'priPrimaryNoSpTotalBC', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'priPrimaryNoBookSpBoyBC',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBC',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBC',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'classOneBoy', field: 'classOneBoy' },
                      { title: 'classOneGirl', field: 'classOneGirl' },
                      { title: 'classOneTotal', field: 'classOneTotal' },

                      { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                      { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                      { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                      { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                      { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                      { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                      { title: 'classOneSpBoy', field: 'classOneSpBoy' },
                      { title: 'classOneSpGirl', field: 'classOneSpGirl' },
                      { title: 'classOneSpTotal', field: 'classOneSpTotal' },

                      { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC' },
                      { title: 'classOneNoSpGirlBC', field: 'classOneNoSpGirlBC' },
                      { title: 'classOneNoSpTotalBC', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'classOneNoBookSpBoyBC',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'classOneNoBookSpGirlBC',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'classOneNoBookSpTotalBC',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'classTwoBoy', field: 'classTwoBoy' },
                      { title: 'classTwoGirl', field: 'classTwoGirl' },
                      { title: 'classTwoTotal', field: 'classTwoTotal' },

                      { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                      { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                      { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                      { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                      { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                      { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                      { title: 'classTwoSpBoy', field: 'classTwoSpBoy' },
                      { title: 'classTwoSpGirl', field: 'classTwoSpGirl' },
                      { title: 'classTwoSpTotal', field: 'classTwoSpTotal' },

                      { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC' },
                      { title: 'classTwoNoSpGirlBC', field: 'classTwoNoSpGirlBC' },
                      { title: 'classTwoNoSpTotalBC', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'classTwoNoBookSpBoyBC',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBC',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBC',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'classThreeBoy', field: 'classThreeBoy' },
                      { title: 'classThreeGirl', field: 'classThreeGirl' },
                      { title: 'classThreeTotal', field: 'classThreeTotal' },

                      { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                      { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                      { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                      { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                      { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                      { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                      { title: 'classThreeSpBoy', field: 'classThreeSpBoy' },
                      { title: 'classThreeSpGirl', field: 'classThreeSpGirl' },
                      { title: 'classThreeSpTotal', field: 'classThreeSpTotal' },

                      { title: 'classThreeNoSpBoyBC', field: 'classThreeNoSpBoyBC' },
                      { title: 'classThreeNoSpGirlBC', field: 'classThreeNoSpGirlBC' },
                      { title: 'classThreeNoSpTotalBC', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'classThreeNoBookSpBoyBC',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBC',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBC',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'classFourBoy', field: 'classFourBoy' },
                      { title: 'classFourGirl', field: 'classFourGirl' },
                      { title: 'classFourTotal', field: 'classFourTotal' },

                      { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                      { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                      { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                      { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                      { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                      { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                      { title: 'classFourSpBoy', field: 'classFourSpBoy' },
                      { title: 'classFourSpGirl', field: 'classFourSpGirl' },
                      { title: 'classFourSpTotal', field: 'classFourSpTotal' },

                      { title: 'classFourNoSpBoyBC', field: 'classFourNoSpBoyBC' },
                      { title: 'classFourNoSpGirlBC', field: 'classFourNoSpGirlBC' },
                      { title: 'classFourNoSpTotalBC', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'classFourNoBookSpBoyBC',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'classFourNoBookSpGirlBC',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'classFourNoBookSpTotalBC',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'classFiveBoy', field: 'classFiveBoy' },
                      { title: 'classFiveGirl', field: 'classFiveGirl' },
                      { title: 'classFiveTotal', field: 'classFiveTotal' },

                      { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                      { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                      { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                      { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                      { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                      { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },

                      { title: 'classFiveSpBoy', field: 'classFiveSpBoy' },
                      { title: 'classFiveSpGirl', field: 'classFiveSpGirl' },
                      { title: 'classFiveSpTotal', field: 'classFiveSpTotal' },

                      { title: 'classFiveNoSpBoyBC', field: 'classFiveNoSpBoyBC' },
                      { title: 'classFiveNoSpGirlBC', field: 'classFiveNoSpGirlBC' },
                      { title: 'classFiveNoSpTotalBC', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'classFiveNoBookSpBoyBC',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBC',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBC',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'priPrimaryNoBoyBCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'priPrimaryNoGirlBCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'priPrimaryNoTotalBCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'priPrimaryNoBookBoyBCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'priPrimaryNoBookGirlBCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'priPrimaryNoBookTotalBCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'priPrimaryNoSpBoyBCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'priPrimaryNoSpGirlBCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoSpTotalBCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'classOneNoGirlBCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'classOneNoTotalBCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'classOneNoBookBoyBCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'classOneNoBookGirlBCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'classOneNoBookTotalBCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'classOneNoSpBoyBCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'classOneNoSpGirlBCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoSpTotalBCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'classOneNoBookSpBoyBCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classOneNoBookSpGirlBCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoBookSpTotalBCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'classTwoNoGirlBCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'classTwoNoTotalBCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'classTwoNoBookBoyBCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'classTwoNoBookGirlBCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'classTwoNoBookTotalBCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'classTwoNoSpBoyBCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'classTwoNoSpGirlBCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoSpTotalBCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'classTwoNoBookSpBoyBCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'classThreeNoBoyBCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'classThreeNoGirlBCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'classThreeNoTotalBCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'classThreeNoBookBoyBCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'classThreeNoBookGirlBCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'classThreeNoBookTotalBCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'classThreeNoSpBoyBCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'classThreeNoSpGirlBCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoSpTotalBCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'classThreeNoBookSpBoyBCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'classFourNoBoyBCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'classFourNoGirlBCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'classFourNoTotalBCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'classFourNoBookBoyBCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'classFourNoBookGirlBCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'classFourNoBookTotalBCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'classFourNoSpBoyBCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'classFourNoSpGirlBCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoSpTotalBCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'classFourNoBookSpBoyBCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFourNoBookSpGirlBCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoBookSpTotalBCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'classFiveNoBoyBCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'classFiveNoGirlBCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'classFiveNoTotalBCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'classFiveNoBookBoyBCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'classFiveNoBookGirlBCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'classFiveNoBookTotalBCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'classFiveNoSpBoyBCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'classFiveNoSpGirlBCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoSpTotalBCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'classFiveNoBookSpBoyBCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBCIn',
                        field: 'classFiveNoBookSpTotalBCIn',
                      },
                    ]}
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
                    data={kutubdiaAllBCOSchoolPMonth}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Ukhiya({currentMonthYear}) </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaAllBCOSchoolCMonth.length + ' BCO Data'}
                    columns={[
                      { title: 'school', field: 'school' },
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'visitor', field: 'visitor' },
                      { title: 'visitorDesignation', field: 'visitorDesignation' },
                      { title: 'visitorOffice', field: 'visitorOffice' },
                      {
                        title: 'headTeacher',
                        field: 'headTeacher',
                      },
                      { title: 'lpo', field: 'lpo', type: 'string' },
                      { title: 'lpoName', field: 'lpoName', type: 'string' },
                      {
                        title: 'lf',
                        field: 'lf',
                        type: 'string',
                      },
                      { title: 'lfName', field: 'lfName', type: 'string' },
                      { title: 'note', field: 'note', type: 'string' },
                      { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                      { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                      { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                      { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                      { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                      { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                      { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                      { title: 'schoolTotalNoStudentBCIn', field: 'schoolTotalNoStudentBCIn' },

                      { title: 'schoolTotalNoBookBCIn', field: 'schoolTotalNoBookBCIn' },

                      { title: 'schoolTotalNoSpStudent', field: 'schoolTotalNoSpStudent' },

                      { title: 'schoolTotalNoSpStudentBC', field: 'schoolTotalNoSpStudentBC' },

                      { title: 'schoolTotalNoSpBookBC', field: 'schoolTotalNoSpBookBC' },

                      { title: 'schoolTotalNoSpStudentBCIn', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: 'schoolTotalNoSpBookBCIn', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                      { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                      { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                      { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                      { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                      { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                      { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy' },
                      { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl' },
                      { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal' },

                      { title: 'priPrimaryNoSpBoyBC', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'priPrimaryNoSpGirlBC', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'priPrimaryNoSpTotalBC', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'priPrimaryNoBookSpBoyBC',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBC',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBC',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'classOneBoy', field: 'classOneBoy' },
                      { title: 'classOneGirl', field: 'classOneGirl' },
                      { title: 'classOneTotal', field: 'classOneTotal' },

                      { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                      { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                      { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                      { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                      { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                      { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                      { title: 'classOneSpBoy', field: 'classOneSpBoy' },
                      { title: 'classOneSpGirl', field: 'classOneSpGirl' },
                      { title: 'classOneSpTotal', field: 'classOneSpTotal' },

                      { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC' },
                      { title: 'classOneNoSpGirlBC', field: 'classOneNoSpGirlBC' },
                      { title: 'classOneNoSpTotalBC', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'classOneNoBookSpBoyBC',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'classOneNoBookSpGirlBC',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'classOneNoBookSpTotalBC',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'classTwoBoy', field: 'classTwoBoy' },
                      { title: 'classTwoGirl', field: 'classTwoGirl' },
                      { title: 'classTwoTotal', field: 'classTwoTotal' },

                      { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                      { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                      { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                      { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                      { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                      { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                      { title: 'classTwoSpBoy', field: 'classTwoSpBoy' },
                      { title: 'classTwoSpGirl', field: 'classTwoSpGirl' },
                      { title: 'classTwoSpTotal', field: 'classTwoSpTotal' },

                      { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC' },
                      { title: 'classTwoNoSpGirlBC', field: 'classTwoNoSpGirlBC' },
                      { title: 'classTwoNoSpTotalBC', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'classTwoNoBookSpBoyBC',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBC',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBC',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'classThreeBoy', field: 'classThreeBoy' },
                      { title: 'classThreeGirl', field: 'classThreeGirl' },
                      { title: 'classThreeTotal', field: 'classThreeTotal' },

                      { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                      { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                      { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                      { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                      { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                      { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                      { title: 'classThreeSpBoy', field: 'classThreeSpBoy' },
                      { title: 'classThreeSpGirl', field: 'classThreeSpGirl' },
                      { title: 'classThreeSpTotal', field: 'classThreeSpTotal' },

                      { title: 'classThreeNoSpBoyBC', field: 'classThreeNoSpBoyBC' },
                      { title: 'classThreeNoSpGirlBC', field: 'classThreeNoSpGirlBC' },
                      { title: 'classThreeNoSpTotalBC', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'classThreeNoBookSpBoyBC',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBC',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBC',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'classFourBoy', field: 'classFourBoy' },
                      { title: 'classFourGirl', field: 'classFourGirl' },
                      { title: 'classFourTotal', field: 'classFourTotal' },

                      { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                      { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                      { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                      { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                      { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                      { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                      { title: 'classFourSpBoy', field: 'classFourSpBoy' },
                      { title: 'classFourSpGirl', field: 'classFourSpGirl' },
                      { title: 'classFourSpTotal', field: 'classFourSpTotal' },

                      { title: 'classFourNoSpBoyBC', field: 'classFourNoSpBoyBC' },
                      { title: 'classFourNoSpGirlBC', field: 'classFourNoSpGirlBC' },
                      { title: 'classFourNoSpTotalBC', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'classFourNoBookSpBoyBC',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'classFourNoBookSpGirlBC',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'classFourNoBookSpTotalBC',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'classFiveBoy', field: 'classFiveBoy' },
                      { title: 'classFiveGirl', field: 'classFiveGirl' },
                      { title: 'classFiveTotal', field: 'classFiveTotal' },

                      { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                      { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                      { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                      { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                      { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                      { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },

                      { title: 'classFiveSpBoy', field: 'classFiveSpBoy' },
                      { title: 'classFiveSpGirl', field: 'classFiveSpGirl' },
                      { title: 'classFiveSpTotal', field: 'classFiveSpTotal' },

                      { title: 'classFiveNoSpBoyBC', field: 'classFiveNoSpBoyBC' },
                      { title: 'classFiveNoSpGirlBC', field: 'classFiveNoSpGirlBC' },
                      { title: 'classFiveNoSpTotalBC', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'classFiveNoBookSpBoyBC',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBC',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBC',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'priPrimaryNoBoyBCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'priPrimaryNoGirlBCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'priPrimaryNoTotalBCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'priPrimaryNoBookBoyBCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'priPrimaryNoBookGirlBCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'priPrimaryNoBookTotalBCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'priPrimaryNoSpBoyBCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'priPrimaryNoSpGirlBCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoSpTotalBCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'classOneNoGirlBCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'classOneNoTotalBCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'classOneNoBookBoyBCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'classOneNoBookGirlBCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'classOneNoBookTotalBCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'classOneNoSpBoyBCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'classOneNoSpGirlBCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoSpTotalBCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'classOneNoBookSpBoyBCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classOneNoBookSpGirlBCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoBookSpTotalBCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'classTwoNoGirlBCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'classTwoNoTotalBCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'classTwoNoBookBoyBCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'classTwoNoBookGirlBCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'classTwoNoBookTotalBCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'classTwoNoSpBoyBCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'classTwoNoSpGirlBCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoSpTotalBCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'classTwoNoBookSpBoyBCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'classThreeNoBoyBCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'classThreeNoGirlBCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'classThreeNoTotalBCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'classThreeNoBookBoyBCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'classThreeNoBookGirlBCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'classThreeNoBookTotalBCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'classThreeNoSpBoyBCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'classThreeNoSpGirlBCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoSpTotalBCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'classThreeNoBookSpBoyBCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'classFourNoBoyBCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'classFourNoGirlBCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'classFourNoTotalBCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'classFourNoBookBoyBCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'classFourNoBookGirlBCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'classFourNoBookTotalBCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'classFourNoSpBoyBCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'classFourNoSpGirlBCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoSpTotalBCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'classFourNoBookSpBoyBCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFourNoBookSpGirlBCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoBookSpTotalBCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'classFiveNoBoyBCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'classFiveNoGirlBCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'classFiveNoTotalBCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'classFiveNoBookBoyBCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'classFiveNoBookGirlBCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'classFiveNoBookTotalBCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'classFiveNoSpBoyBCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'classFiveNoSpGirlBCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoSpTotalBCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'classFiveNoBookSpBoyBCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBCIn',
                        field: 'classFiveNoBookSpTotalBCIn',
                      },
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
                    data={ukhiyaAllBCOSchoolCMonth}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Kutubdia({currentMonthYear}) </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaAllBCOSchoolCMonth.length + ' BCO Data'}
                    columns={[
                      { title: 'school', field: 'school' },
                      {
                        title: 'date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'month', field: 'month', sorting: 'true' },
                      { title: 'year', field: 'year', sorting: 'true' },
                      { title: 'visitNo', field: 'visitNo', sorting: 'true' },

                      { title: 'district', field: 'district' },
                      { title: 'upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'visitor', field: 'visitor' },
                      { title: 'visitorDesignation', field: 'visitorDesignation' },
                      { title: 'visitorOffice', field: 'visitorOffice' },
                      {
                        title: 'headTeacher',
                        field: 'headTeacher',
                      },
                      { title: 'lpo', field: 'lpo', type: 'string' },
                      { title: 'lpoName', field: 'lpoName', type: 'string' },
                      {
                        title: 'lf',
                        field: 'lf',
                        type: 'string',
                      },
                      { title: 'lfName', field: 'lfName', type: 'string' },
                      { title: 'note', field: 'note', type: 'string' },
                      { title: 'schoolTotalNoGirl', field: 'schoolTotalNoGirl' },
                      { title: 'schoolTotalNoBoy', field: 'schoolTotalNoBoy' },
                      { title: 'schoolTotalNoStudent', field: 'schoolTotalNoStudent' },

                      { title: 'schoolTotalNoGirlBC', field: 'schoolTotalNoGirlBC' },
                      { title: 'schoolTotalNoBoyBC', field: 'schoolTotalNoBoyBC' },
                      { title: 'schoolTotalNoStudentBC', field: 'schoolTotalNoStudentBC' },

                      { title: 'schoolTotalNoBookBC', field: 'schoolTotalNoBookBC' },

                      { title: 'schoolTotalNoStudentBCIn', field: 'schoolTotalNoStudentBCIn' },

                      { title: 'schoolTotalNoBookBCIn', field: 'schoolTotalNoBookBCIn' },

                      { title: 'schoolTotalNoSpStudent', field: 'schoolTotalNoSpStudent' },

                      { title: 'schoolTotalNoSpStudentBC', field: 'schoolTotalNoSpStudentBC' },

                      { title: 'schoolTotalNoSpBookBC', field: 'schoolTotalNoSpBookBC' },

                      { title: 'schoolTotalNoSpStudentBCIn', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: 'schoolTotalNoSpBookBCIn', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'priPrimaryBoy', field: 'priPrimaryBoy' },
                      { title: 'priPrimaryGirl', field: 'priPrimaryGirl' },
                      { title: 'priPrimaryTotal', field: 'priPrimaryTotal' },

                      { title: 'priPrimaryNoBoyBC', field: 'priPrimaryNoBoyBC' },
                      { title: 'priPrimaryNoGirlBC', field: 'priPrimaryNoGirlBC' },
                      { title: 'priPrimaryNoTotalBC', field: 'priPrimaryNoTotalBC' },

                      { title: 'priPrimaryNoBookBoyBC', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'priPrimaryNoBookGirlBC', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'priPrimaryNoBookTotalBC', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'priPrimarySpBoy', field: 'priPrimarySpBoy' },
                      { title: 'priPrimarySpGirl', field: 'priPrimarySpGirl' },
                      { title: 'priPrimarySpTotal', field: 'priPrimarySpTotal' },

                      { title: 'priPrimaryNoSpBoyBC', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'priPrimaryNoSpGirlBC', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'priPrimaryNoSpTotalBC', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'priPrimaryNoBookSpBoyBC',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBC',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBC',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'classOneBoy', field: 'classOneBoy' },
                      { title: 'classOneGirl', field: 'classOneGirl' },
                      { title: 'classOneTotal', field: 'classOneTotal' },

                      { title: 'classOneNoBoyBC', field: 'classOneNoBoyBC' },
                      { title: 'classOneNoGirlBC', field: 'classOneNoGirlBC' },
                      { title: 'classOneNoTotalBC', field: 'classOneNoTotalBC' },

                      { title: 'classOneNoBookBoyBC', field: 'classOneNoBookBoyBC' },
                      { title: 'classOneNoBookGirlBC', field: 'classOneNoBookGirlBC' },
                      { title: 'classOneNoBookTotalBC', field: 'classOneNoBookTotalBC' },

                      { title: 'classOneSpBoy', field: 'classOneSpBoy' },
                      { title: 'classOneSpGirl', field: 'classOneSpGirl' },
                      { title: 'classOneSpTotal', field: 'classOneSpTotal' },

                      { title: 'classOneNoSpBoyBC', field: 'classOneNoSpBoyBC' },
                      { title: 'classOneNoSpGirlBC', field: 'classOneNoSpGirlBC' },
                      { title: 'classOneNoSpTotalBC', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'classOneNoBookSpBoyBC',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'classOneNoBookSpGirlBC',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'classOneNoBookSpTotalBC',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'classTwoBoy', field: 'classTwoBoy' },
                      { title: 'classTwoGirl', field: 'classTwoGirl' },
                      { title: 'classTwoTotal', field: 'classTwoTotal' },

                      { title: 'classTwoNoBoyBC', field: 'classTwoNoBoyBC' },
                      { title: 'classTwoNoGirlBC', field: 'classTwoNoGirlBC' },
                      { title: 'classTwoNoTotalBC', field: 'classTwoNoTotalBC' },

                      { title: 'classTwoNoBookBoyBC', field: 'classTwoNoBookBoyBC' },
                      { title: 'classTwoNoBookGirlBC', field: 'classTwoNoBookGirlBC' },
                      { title: 'classTwoNoBookTotalBC', field: 'classTwoNoBookTotalBC' },

                      { title: 'classTwoSpBoy', field: 'classTwoSpBoy' },
                      { title: 'classTwoSpGirl', field: 'classTwoSpGirl' },
                      { title: 'classTwoSpTotal', field: 'classTwoSpTotal' },

                      { title: 'classTwoNoSpBoyBC', field: 'classTwoNoSpBoyBC' },
                      { title: 'classTwoNoSpGirlBC', field: 'classTwoNoSpGirlBC' },
                      { title: 'classTwoNoSpTotalBC', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'classTwoNoBookSpBoyBC',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBC',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBC',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'classThreeBoy', field: 'classThreeBoy' },
                      { title: 'classThreeGirl', field: 'classThreeGirl' },
                      { title: 'classThreeTotal', field: 'classThreeTotal' },

                      { title: 'classThreeNoBoyBC', field: 'classThreeNoBoyBC' },
                      { title: 'classThreeNoGirlBC', field: 'classThreeNoGirlBC' },
                      { title: 'classThreeNoTotalBC', field: 'classThreeNoTotalBC' },

                      { title: 'classThreeNoBookBoyBC', field: 'classThreeNoBookBoyBC' },
                      { title: 'classThreeNoBookGirlBC', field: 'classThreeNoBookGirlBC' },
                      { title: 'classThreeNoBookTotalBC', field: 'classThreeNoBookTotalBC' },

                      { title: 'classThreeSpBoy', field: 'classThreeSpBoy' },
                      { title: 'classThreeSpGirl', field: 'classThreeSpGirl' },
                      { title: 'classThreeSpTotal', field: 'classThreeSpTotal' },

                      { title: 'classThreeNoSpBoyBC', field: 'classThreeNoSpBoyBC' },
                      { title: 'classThreeNoSpGirlBC', field: 'classThreeNoSpGirlBC' },
                      { title: 'classThreeNoSpTotalBC', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'classThreeNoBookSpBoyBC',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBC',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBC',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'classFourBoy', field: 'classFourBoy' },
                      { title: 'classFourGirl', field: 'classFourGirl' },
                      { title: 'classFourTotal', field: 'classFourTotal' },

                      { title: 'classFourNoBoyBC', field: 'classFourNoBoyBC' },
                      { title: 'classFourNoGirlBC', field: 'classFourNoGirlBC' },
                      { title: 'classFourNoTotalBC', field: 'classFourNoTotalBC' },

                      { title: 'classFourNoBookBoyBC', field: 'classFourNoBookBoyBC' },
                      { title: 'classFourNoBookGirlBC', field: 'classFourNoBookGirlBC' },
                      { title: 'classFourNoBookTotalBC', field: 'classFourNoBookTotalBC' },

                      { title: 'classFourSpBoy', field: 'classFourSpBoy' },
                      { title: 'classFourSpGirl', field: 'classFourSpGirl' },
                      { title: 'classFourSpTotal', field: 'classFourSpTotal' },

                      { title: 'classFourNoSpBoyBC', field: 'classFourNoSpBoyBC' },
                      { title: 'classFourNoSpGirlBC', field: 'classFourNoSpGirlBC' },
                      { title: 'classFourNoSpTotalBC', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'classFourNoBookSpBoyBC',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'classFourNoBookSpGirlBC',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'classFourNoBookSpTotalBC',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'classFiveBoy', field: 'classFiveBoy' },
                      { title: 'classFiveGirl', field: 'classFiveGirl' },
                      { title: 'classFiveTotal', field: 'classFiveTotal' },

                      { title: 'classFiveNoBoyBC', field: 'classFiveNoBoyBC' },
                      { title: 'classFiveNoGirlBC', field: 'classFiveNoGirlBC' },
                      { title: 'classFiveNoTotalBC', field: 'classFiveNoTotalBC' },

                      { title: 'classFiveNoBookBoyBC', field: 'classFiveNoBookBoyBC' },
                      { title: 'classFiveNoBookGirlBC', field: 'classFiveNoBookGirlBC' },
                      { title: 'classFiveNoBookTotalBC', field: 'classFiveNoBookTotalBC' },

                      { title: 'classFiveSpBoy', field: 'classFiveSpBoy' },
                      { title: 'classFiveSpGirl', field: 'classFiveSpGirl' },
                      { title: 'classFiveSpTotal', field: 'classFiveSpTotal' },

                      { title: 'classFiveNoSpBoyBC', field: 'classFiveNoSpBoyBC' },
                      { title: 'classFiveNoSpGirlBC', field: 'classFiveNoSpGirlBC' },
                      { title: 'classFiveNoSpTotalBC', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'classFiveNoBookSpBoyBC',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBC',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBC',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'priPrimaryNoBoyBCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'priPrimaryNoGirlBCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'priPrimaryNoTotalBCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'priPrimaryNoBookBoyBCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'priPrimaryNoBookGirlBCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'priPrimaryNoBookTotalBCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'priPrimaryNoSpBoyBCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'priPrimaryNoSpGirlBCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoSpTotalBCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'priPrimaryNoBookSpBoyBCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpGirlBCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'priPrimaryNoBookSpTotalBCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'classOneNoBoyBCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'classOneNoGirlBCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'classOneNoTotalBCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'classOneNoBookBoyBCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'classOneNoBookGirlBCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'classOneNoBookTotalBCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'classOneNoSpBoyBCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'classOneNoSpGirlBCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoSpTotalBCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'classOneNoBookSpBoyBCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classOneNoBookSpGirlBCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classOneNoBookSpTotalBCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'classTwoNoBoyBCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'classTwoNoGirlBCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'classTwoNoTotalBCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'classTwoNoBookBoyBCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'classTwoNoBookGirlBCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'classTwoNoBookTotalBCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'classTwoNoSpBoyBCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'classTwoNoSpGirlBCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoSpTotalBCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'classTwoNoBookSpBoyBCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpGirlBCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classTwoNoBookSpTotalBCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'classThreeNoBoyBCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'classThreeNoGirlBCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'classThreeNoTotalBCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'classThreeNoBookBoyBCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'classThreeNoBookGirlBCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'classThreeNoBookTotalBCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'classThreeNoSpBoyBCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'classThreeNoSpGirlBCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoSpTotalBCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'classThreeNoBookSpBoyBCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpGirlBCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classThreeNoBookSpTotalBCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'classFourNoBoyBCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'classFourNoGirlBCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'classFourNoTotalBCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'classFourNoBookBoyBCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'classFourNoBookGirlBCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'classFourNoBookTotalBCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'classFourNoSpBoyBCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'classFourNoSpGirlBCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoSpTotalBCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'classFourNoBookSpBoyBCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFourNoBookSpGirlBCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFourNoBookSpTotalBCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'classFiveNoBoyBCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'classFiveNoGirlBCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'classFiveNoTotalBCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'classFiveNoBookBoyBCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'classFiveNoBookGirlBCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'classFiveNoBookTotalBCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'classFiveNoSpBoyBCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'classFiveNoSpGirlBCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoSpTotalBCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'classFiveNoBookSpBoyBCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpGirlBCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'classFiveNoBookSpTotalBCIn',
                        field: 'classFiveNoBookSpTotalBCIn',
                      },
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
                    data={kutubdiaAllBCOSchoolCMonth}
                  />
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>WFP Report</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" href="/bco/wfp-summarize">
              WFP Summarize Report
            </CButton>
            <CButton color="secondary" href="/bco/cfo-analysis">
              CFO Analysis Report
            </CButton>
            <CButton color="success" href="/bco/ukhiya-report">
              Ukhiya Report
            </CButton>
            <CButton color="warning" href="/bco/kutubdia-report">
              Kutubdia Report
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllBCOSchool
