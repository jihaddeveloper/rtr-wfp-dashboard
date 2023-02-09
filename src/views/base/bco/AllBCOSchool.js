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
  // Area & Month wise BCO data school

  // Current date and month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })

  current.setMonth(current.getMonth() - 1)
  const previousMonth = current.toLocaleString('default', { month: 'long' })
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  // Current date and month

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
          (item) => item.upazilla === 'Kutubdia' && item.month === previousMonth,
        ),
      )

      setUkhiyaAllBCOSchoolCMonth(
        response.data.filter((item) => item.upazilla === 'Ukhiya' && item.month === previousMonth),
      )

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
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
            <strong>ALL BCO Data School</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
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
              <CAccordionItem itemKey={2}>
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
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Combined(April-2022 Till Now) </strong>
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
                    data={allBCOData}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Ukhiya({previousMonthYear}) </strong>
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
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Kutubdia({previousMonthYear}) </strong>
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
