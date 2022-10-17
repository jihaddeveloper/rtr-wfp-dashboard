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
    console.log('use effect called')

    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
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
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },
                      {
                        title: 'Head Teacher',
                        field: 'headTeacher',
                      },
                      { title: 'LPO', field: 'lpo', type: 'string' },
                      {
                        title: 'LF',
                        field: 'lf',
                        type: 'string',
                      },

                      { title: '#Total Girl', field: 'schoolTotalNoGirl' },
                      { title: '#Total Boy', field: 'schoolTotalNoBoy' },
                      { title: '#Total Student', field: 'schoolTotalNoStudent' },

                      { title: '#No Girl BCO', field: 'schoolTotalNoGirlBC' },
                      { title: '#No Boy BCO', field: 'schoolTotalNoBoyBC' },
                      { title: '#No Student BCO', field: 'schoolTotalNoStudentBC' },

                      { title: '#No Book BCO', field: 'schoolTotalNoBookBC' },

                      { title: '#Student BCI', field: 'schoolTotalNoStudentBCIn' },

                      { title: '#Book BCI', field: 'schoolTotalNoBookBCIn' },

                      { title: '#Total Student Sp', field: 'schoolTotalNoSpStudent' },

                      { title: '#Student BCO Sp', field: 'schoolTotalNoSpStudentBC' },

                      { title: '#Book BCO Sp', field: 'schoolTotalNoSpBookBC' },

                      { title: '#Student BCI SP', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: '#Book BCI Sp', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'Pre Primary Boy', field: 'priPrimaryBoy' },
                      { title: 'Pre Primary Girl', field: 'priPrimaryGirl' },
                      { title: 'Pre Primary Total', field: 'priPrimaryTotal' },

                      { title: 'Pre Primary No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'Pre Primary No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'Pre Primary No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'Pre Primary No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'Pre Primary No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'Pre Primary No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'Pre Primary Special Boy', field: 'priPrimarySpBoy' },
                      { title: 'Pre Primary Special Girl', field: 'priPrimarySpGirl' },
                      { title: 'Pre Primary Special Total', field: 'priPrimarySpTotal' },

                      { title: 'Pre Primary Special No Boy BCO', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'Pre Primary Special No Girl BCO', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'Pre Primary Special No Total BCO', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'Pre Primary Special No Book Boy BCO',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCO',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCO',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'Class 1 Boy', field: 'classOneBoy' },
                      { title: 'Class 1 Girl', field: 'classOneGirl' },
                      { title: 'Class 1 Total', field: 'classOneTotal' },

                      { title: 'Class 1 No Boy BCO', field: 'classOneNoBoyBC' },
                      { title: 'Class 1 No Girl BCO', field: 'classOneNoGirlBC' },
                      { title: 'Class 1 No Total BCO', field: 'classOneNoTotalBC' },

                      { title: 'Class 1 No Book Boy BCO', field: 'classOneNoBookBoyBC' },
                      { title: 'Class 1 No Book Girl BCO', field: 'classOneNoBookGirlBC' },
                      { title: 'Class 1 No Book Total BCO', field: 'classOneNoBookTotalBC' },

                      { title: 'Class 1 Special Boy', field: 'classOneSpBoy' },
                      { title: 'Class 1 Special Girl', field: 'classOneSpGirl' },
                      { title: 'Class 1 Special Total', field: 'classOneSpTotal' },

                      { title: 'Class 1 Special No Boy BCO', field: 'classOneNoSpBoyBC' },
                      { title: 'Class 1 Special No Girl BCO', field: 'classOneNoSpGirlBC' },
                      { title: 'Class 1 Special No Total BCO', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'Class 1 Special No Book Boy BCO',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCO',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCO',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'Class 2 Boy', field: 'classTwoBoy' },
                      { title: 'Class 2 Girl', field: 'classTwoGirl' },
                      { title: 'Class 2 Total', field: 'classTwoTotal' },

                      { title: 'Class 2 No Boy BCO', field: 'classTwoNoBoyBC' },
                      { title: 'Class 2 No Girl BCO', field: 'classTwoNoGirlBC' },
                      { title: 'Class 2 No Total BCO', field: 'classTwoNoTotalBC' },

                      { title: 'Class 2 No Book Boy BCO', field: 'classTwoNoBookBoyBC' },
                      { title: 'Class 2 No Book Girl BCO', field: 'classTwoNoBookGirlBC' },
                      { title: 'Class 2 No Book Total BCO', field: 'classTwoNoBookTotalBC' },

                      { title: 'Class 2 Special Boy', field: 'classTwoSpBoy' },
                      { title: 'Class 2 Special Girl', field: 'classTwoSpGirl' },
                      { title: 'Class 2 Special Total', field: 'classTwoSpTotal' },

                      { title: 'Class 2 Special No Boy BCO', field: 'classTwoNoSpBoyBC' },
                      { title: 'Class 2 Special No Girl BCO', field: 'classTwoNoSpGirlBC' },
                      { title: 'Class 2 Special No Total BCO', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'Class 2 Special No Book Boy BCO',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCO',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCO',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'Class 3 Boy', field: 'classThreeBoy' },
                      { title: 'Class 3 Girl', field: 'classThreeGirl' },
                      { title: 'Class 3 Total', field: 'classThreeTotal' },

                      { title: 'Class 3 No Boy BCO', field: 'classThreeNoBoyBC' },
                      { title: 'Class 3 No Girl BCO', field: 'classThreeNoGirlBC' },
                      { title: 'Class 3 No Total BCO', field: 'classThreeNoTotalBC' },

                      { title: 'Class 3 No Book Boy BCO', field: 'classThreeNoBookBoyBC' },
                      { title: 'Class 3 No Book Girl BCO', field: 'classThreeNoBookGirlBC' },
                      { title: 'Class 3 No Book Total BCO', field: 'classThreeNoBookTotalBC' },

                      { title: 'Class 3 Special Boy', field: 'classThreeSpBoy' },
                      { title: 'Class 3 Special Girl', field: 'classThreeSpGirl' },
                      { title: 'Class 3 Special Total', field: 'classThreeSpTotal' },

                      { title: 'Class 3 Special No Boy BCO', field: 'classThreeNoSpBoyBC' },
                      { title: 'Class 3 Special No Girl BCO', field: 'classThreeNoSpGirlBC' },
                      { title: 'Class 3 Special No Total BCO', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'Class 3 Special No Book Boy BCO',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCO',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCO',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'Class 4 Boy', field: 'classFourBoy' },
                      { title: 'Class 4 Girl', field: 'classFourGirl' },
                      { title: 'Class 4 Total', field: 'classFourTotal' },

                      { title: 'Class 4 No Boy BCO', field: 'classFourNoBoyBC' },
                      { title: 'Class 4 No Girl BCO', field: 'classFourNoGirlBC' },
                      { title: 'Class 4 No Total BCO', field: 'classFourNoTotalBC' },

                      { title: 'Class 4 No Book Boy BCO', field: 'classFourNoBookBoyBC' },
                      { title: 'Class 4 No Book Girl BCO', field: 'classFourNoBookGirlBC' },
                      { title: 'Class 4 No Book Total BCO', field: 'classFourNoBookTotalBC' },

                      { title: 'Class 4 Special Boy', field: 'classFourSpBoy' },
                      { title: 'Class 4 Special Girl', field: 'classFourSpGirl' },
                      { title: 'Class 4 Special Total', field: 'classFourSpTotal' },

                      { title: 'Class 4 Special No Boy BCO', field: 'classFourNoSpBoyBC' },
                      { title: 'Class 4 Special No Girl BCO', field: 'classFourNoSpGirlBC' },
                      { title: 'Class 4 Special No Total BCO', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'Class 4 Special No Book Boy BCO',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCO',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCO',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'Class 5 Boy', field: 'classFiveBoy' },
                      { title: 'Class 5 Girl', field: 'classFiveGirl' },
                      { title: 'Class 5 Total', field: 'classFiveTotal' },

                      { title: 'Class 5 No Boy BCO', field: 'classFiveNoBoyBC' },
                      { title: 'Class 5 No Girl BCO', field: 'classFiveNoGirlBC' },
                      { title: 'Class 5 No Total BCO', field: 'classFiveNoTotalBC' },

                      { title: 'Class 5 No Book Boy BCO', field: 'classFiveNoBookBoyBC' },
                      { title: 'Class 5 No Book Girl BCO', field: 'classFiveNoBookGirlBC' },
                      { title: 'Class 5 No Book Total BCO', field: 'classFiveNoBookTotalBC' },

                      { title: 'Class 5 Special Boy', field: 'classFiveSpBoy' },
                      { title: 'Class 5 Special Girl', field: 'classFiveSpGirl' },
                      { title: 'Class 5 Special Total', field: 'classFiveSpTotal' },

                      { title: 'Class 5 Special No Boy BCO', field: 'classFiveNoSpBoyBC' },
                      { title: 'Class 5 Special No Girl BCO', field: 'classFiveNoSpGirlBC' },
                      { title: 'Class 5 Special No Total BCO', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'Class 5 Special No Book Boy BCO',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCO',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCO',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'Pre Primary Boy BCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'Pre Primary Girl BCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'Pre Primary Total BCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'Pre Primary No Book Boy BCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'Pre Primary No Book Girl BCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'Pre Primary No Book Total BCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'Pre Primary Special No Boy BCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'Pre Primary Special No Girl BCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Total BCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'Pre Primary Special No Book Boy BCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'Class 1 Boy BCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'Class 1 Girl BCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'Class 1 Total BCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'Class 1 No Book Boy BCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'Class 1 No Book Girl BCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'Class 1 No Book Total BCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'Class 1 Special No Boy BCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'Class 1 Special No Girl BCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Total BCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 1 Special No Book Boy BCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'Class 2 Boy BCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'Class 2 Girl BCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'Class 2 Total BCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'Class 2 No Book Boy BCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'Class 2 No Book Girl BCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'Class 2 No Book Total BCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'Class 2 Special No Boy BCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'Class 2 Special No Girl BCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Total BCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 2 Special No Book Boy BCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'Class 3 Boy BCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'Class 3 Girl BCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'Class 3 Total BCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'Class 3 No Book Boy BCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'Class 3 No Book Girl BCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'Class 3 No Book Total BCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'Class 3 Special No Boy BCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'Class 3 Special No Girl BCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Total BCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 3 Special No Book Boy BCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'Class 4 Boy BCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'Class 4 Girl BCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'Class 4 Total BCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'Class 4 No Book Boy BCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'Class 4 No Book Girl BCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'Class 4 No Book Total BCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'Class 4 Special No Boy BCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'Class 4 Special No Girl BCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Total BCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 4 Special No Book Boy BCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'Class 5 Boy BCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'Class 5 Girl BCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'Class 5 Total BCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'Class 5 No Book Boy BCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'Class 5 No Book Girl BCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'Class 5 No Book Total BCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'Class 5 Special No Boy BCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'Class 5 Special No Girl BCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Total BCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 5 Special No Book Boy BCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCIn',
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
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#ede9df',
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
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },
                      {
                        title: 'Head Teacher',
                        field: 'headTeacher',
                      },
                      { title: 'LPO', field: 'lpo', type: 'string' },
                      {
                        title: 'LF',
                        field: 'lf',
                        type: 'string',
                      },

                      { title: '#Total Girl', field: 'schoolTotalNoGirl' },
                      { title: '#Total Boy', field: 'schoolTotalNoBoy' },
                      { title: '#Total Student', field: 'schoolTotalNoStudent' },

                      { title: '#No Girl BCO', field: 'schoolTotalNoGirlBC' },
                      { title: '#No Boy BCO', field: 'schoolTotalNoBoyBC' },
                      { title: '#No Student BCO', field: 'schoolTotalNoStudentBC' },

                      { title: '#No Book BCO', field: 'schoolTotalNoBookBC' },

                      { title: '#Student BCI', field: 'schoolTotalNoStudentBCIn' },

                      { title: '#Book BCI', field: 'schoolTotalNoBookBCIn' },

                      { title: '#Total Student Sp', field: 'schoolTotalNoSpStudent' },

                      { title: '#Student BCO Sp', field: 'schoolTotalNoSpStudentBC' },

                      { title: '#Book BCO Sp', field: 'schoolTotalNoSpBookBC' },

                      { title: '#Student BCI SP', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: '#Book BCI Sp', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'Pre Primary Boy', field: 'priPrimaryBoy' },
                      { title: 'Pre Primary Girl', field: 'priPrimaryGirl' },
                      { title: 'Pre Primary Total', field: 'priPrimaryTotal' },

                      { title: 'Pre Primary No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'Pre Primary No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'Pre Primary No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'Pre Primary No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'Pre Primary No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'Pre Primary No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'Pre Primary Special Boy', field: 'priPrimarySpBoy' },
                      { title: 'Pre Primary Special Girl', field: 'priPrimarySpGirl' },
                      { title: 'Pre Primary Special Total', field: 'priPrimarySpTotal' },

                      { title: 'Pre Primary Special No Boy BCO', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'Pre Primary Special No Girl BCO', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'Pre Primary Special No Total BCO', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'Pre Primary Special No Book Boy BCO',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCO',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCO',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'Class 1 Boy', field: 'classOneBoy' },
                      { title: 'Class 1 Girl', field: 'classOneGirl' },
                      { title: 'Class 1 Total', field: 'classOneTotal' },

                      { title: 'Class 1 No Boy BCO', field: 'classOneNoBoyBC' },
                      { title: 'Class 1 No Girl BCO', field: 'classOneNoGirlBC' },
                      { title: 'Class 1 No Total BCO', field: 'classOneNoTotalBC' },

                      { title: 'Class 1 No Book Boy BCO', field: 'classOneNoBookBoyBC' },
                      { title: 'Class 1 No Book Girl BCO', field: 'classOneNoBookGirlBC' },
                      { title: 'Class 1 No Book Total BCO', field: 'classOneNoBookTotalBC' },

                      { title: 'Class 1 Special Boy', field: 'classOneSpBoy' },
                      { title: 'Class 1 Special Girl', field: 'classOneSpGirl' },
                      { title: 'Class 1 Special Total', field: 'classOneSpTotal' },

                      { title: 'Class 1 Special No Boy BCO', field: 'classOneNoSpBoyBC' },
                      { title: 'Class 1 Special No Girl BCO', field: 'classOneNoSpGirlBC' },
                      { title: 'Class 1 Special No Total BCO', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'Class 1 Special No Book Boy BCO',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCO',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCO',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'Class 2 Boy', field: 'classTwoBoy' },
                      { title: 'Class 2 Girl', field: 'classTwoGirl' },
                      { title: 'Class 2 Total', field: 'classTwoTotal' },

                      { title: 'Class 2 No Boy BCO', field: 'classTwoNoBoyBC' },
                      { title: 'Class 2 No Girl BCO', field: 'classTwoNoGirlBC' },
                      { title: 'Class 2 No Total BCO', field: 'classTwoNoTotalBC' },

                      { title: 'Class 2 No Book Boy BCO', field: 'classTwoNoBookBoyBC' },
                      { title: 'Class 2 No Book Girl BCO', field: 'classTwoNoBookGirlBC' },
                      { title: 'Class 2 No Book Total BCO', field: 'classTwoNoBookTotalBC' },

                      { title: 'Class 2 Special Boy', field: 'classTwoSpBoy' },
                      { title: 'Class 2 Special Girl', field: 'classTwoSpGirl' },
                      { title: 'Class 2 Special Total', field: 'classTwoSpTotal' },

                      { title: 'Class 2 Special No Boy BCO', field: 'classTwoNoSpBoyBC' },
                      { title: 'Class 2 Special No Girl BCO', field: 'classTwoNoSpGirlBC' },
                      { title: 'Class 2 Special No Total BCO', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'Class 2 Special No Book Boy BCO',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCO',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCO',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'Class 3 Boy', field: 'classThreeBoy' },
                      { title: 'Class 3 Girl', field: 'classThreeGirl' },
                      { title: 'Class 3 Total', field: 'classThreeTotal' },

                      { title: 'Class 3 No Boy BCO', field: 'classThreeNoBoyBC' },
                      { title: 'Class 3 No Girl BCO', field: 'classThreeNoGirlBC' },
                      { title: 'Class 3 No Total BCO', field: 'classThreeNoTotalBC' },

                      { title: 'Class 3 No Book Boy BCO', field: 'classThreeNoBookBoyBC' },
                      { title: 'Class 3 No Book Girl BCO', field: 'classThreeNoBookGirlBC' },
                      { title: 'Class 3 No Book Total BCO', field: 'classThreeNoBookTotalBC' },

                      { title: 'Class 3 Special Boy', field: 'classThreeSpBoy' },
                      { title: 'Class 3 Special Girl', field: 'classThreeSpGirl' },
                      { title: 'Class 3 Special Total', field: 'classThreeSpTotal' },

                      { title: 'Class 3 Special No Boy BCO', field: 'classThreeNoSpBoyBC' },
                      { title: 'Class 3 Special No Girl BCO', field: 'classThreeNoSpGirlBC' },
                      { title: 'Class 3 Special No Total BCO', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'Class 3 Special No Book Boy BCO',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCO',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCO',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'Class 4 Boy', field: 'classFourBoy' },
                      { title: 'Class 4 Girl', field: 'classFourGirl' },
                      { title: 'Class 4 Total', field: 'classFourTotal' },

                      { title: 'Class 4 No Boy BCO', field: 'classFourNoBoyBC' },
                      { title: 'Class 4 No Girl BCO', field: 'classFourNoGirlBC' },
                      { title: 'Class 4 No Total BCO', field: 'classFourNoTotalBC' },

                      { title: 'Class 4 No Book Boy BCO', field: 'classFourNoBookBoyBC' },
                      { title: 'Class 4 No Book Girl BCO', field: 'classFourNoBookGirlBC' },
                      { title: 'Class 4 No Book Total BCO', field: 'classFourNoBookTotalBC' },

                      { title: 'Class 4 Special Boy', field: 'classFourSpBoy' },
                      { title: 'Class 4 Special Girl', field: 'classFourSpGirl' },
                      { title: 'Class 4 Special Total', field: 'classFourSpTotal' },

                      { title: 'Class 4 Special No Boy BCO', field: 'classFourNoSpBoyBC' },
                      { title: 'Class 4 Special No Girl BCO', field: 'classFourNoSpGirlBC' },
                      { title: 'Class 4 Special No Total BCO', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'Class 4 Special No Book Boy BCO',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCO',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCO',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'Class 5 Boy', field: 'classFiveBoy' },
                      { title: 'Class 5 Girl', field: 'classFiveGirl' },
                      { title: 'Class 5 Total', field: 'classFiveTotal' },

                      { title: 'Class 5 No Boy BCO', field: 'classFiveNoBoyBC' },
                      { title: 'Class 5 No Girl BCO', field: 'classFiveNoGirlBC' },
                      { title: 'Class 5 No Total BCO', field: 'classFiveNoTotalBC' },

                      { title: 'Class 5 No Book Boy BCO', field: 'classFiveNoBookBoyBC' },
                      { title: 'Class 5 No Book Girl BCO', field: 'classFiveNoBookGirlBC' },
                      { title: 'Class 5 No Book Total BCO', field: 'classFiveNoBookTotalBC' },

                      { title: 'Class 5 Special Boy', field: 'classFiveSpBoy' },
                      { title: 'Class 5 Special Girl', field: 'classFiveSpGirl' },
                      { title: 'Class 5 Special Total', field: 'classFiveSpTotal' },

                      { title: 'Class 5 Special No Boy BCO', field: 'classFiveNoSpBoyBC' },
                      { title: 'Class 5 Special No Girl BCO', field: 'classFiveNoSpGirlBC' },
                      { title: 'Class 5 Special No Total BCO', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'Class 5 Special No Book Boy BCO',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCO',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCO',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'Pre Primary Boy BCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'Pre Primary Girl BCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'Pre Primary Total BCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'Pre Primary No Book Boy BCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'Pre Primary No Book Girl BCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'Pre Primary No Book Total BCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'Pre Primary Special No Boy BCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'Pre Primary Special No Girl BCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Total BCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'Pre Primary Special No Book Boy BCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'Class 1 Boy BCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'Class 1 Girl BCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'Class 1 Total BCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'Class 1 No Book Boy BCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'Class 1 No Book Girl BCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'Class 1 No Book Total BCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'Class 1 Special No Boy BCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'Class 1 Special No Girl BCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Total BCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 1 Special No Book Boy BCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'Class 2 Boy BCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'Class 2 Girl BCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'Class 2 Total BCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'Class 2 No Book Boy BCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'Class 2 No Book Girl BCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'Class 2 No Book Total BCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'Class 2 Special No Boy BCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'Class 2 Special No Girl BCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Total BCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 2 Special No Book Boy BCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'Class 3 Boy BCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'Class 3 Girl BCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'Class 3 Total BCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'Class 3 No Book Boy BCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'Class 3 No Book Girl BCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'Class 3 No Book Total BCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'Class 3 Special No Boy BCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'Class 3 Special No Girl BCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Total BCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 3 Special No Book Boy BCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'Class 4 Boy BCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'Class 4 Girl BCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'Class 4 Total BCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'Class 4 No Book Boy BCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'Class 4 No Book Girl BCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'Class 4 No Book Total BCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'Class 4 Special No Boy BCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'Class 4 Special No Girl BCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Total BCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 4 Special No Book Boy BCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'Class 5 Boy BCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'Class 5 Girl BCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'Class 5 Total BCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'Class 5 No Book Boy BCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'Class 5 No Book Girl BCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'Class 5 No Book Total BCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'Class 5 Special No Boy BCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'Class 5 Special No Girl BCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Total BCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 5 Special No Book Boy BCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCIn',
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
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#ede9df',
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
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },
                      {
                        title: 'Head Teacher',
                        field: 'headTeacher',
                      },
                      { title: 'LPO', field: 'lpo', type: 'string' },
                      {
                        title: 'LF',
                        field: 'lf',
                        type: 'string',
                      },

                      { title: '#Total Girl', field: 'schoolTotalNoGirl' },
                      { title: '#Total Boy', field: 'schoolTotalNoBoy' },
                      { title: '#Total Student', field: 'schoolTotalNoStudent' },

                      { title: '#No Girl BCO', field: 'schoolTotalNoGirlBC' },
                      { title: '#No Boy BCO', field: 'schoolTotalNoBoyBC' },
                      { title: '#No Student BCO', field: 'schoolTotalNoStudentBC' },

                      { title: '#No Book BCO', field: 'schoolTotalNoBookBC' },

                      { title: '#Student BCI', field: 'schoolTotalNoStudentBCIn' },

                      { title: '#Book BCI', field: 'schoolTotalNoBookBCIn' },

                      { title: '#Total Student Sp', field: 'schoolTotalNoSpStudent' },

                      { title: '#Student BCO Sp', field: 'schoolTotalNoSpStudentBC' },

                      { title: '#Book BCO Sp', field: 'schoolTotalNoSpBookBC' },

                      { title: '#Student BCI SP', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: '#Book BCI Sp', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'Pre Primary Boy', field: 'priPrimaryBoy' },
                      { title: 'Pre Primary Girl', field: 'priPrimaryGirl' },
                      { title: 'Pre Primary Total', field: 'priPrimaryTotal' },

                      { title: 'Pre Primary No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'Pre Primary No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'Pre Primary No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'Pre Primary No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'Pre Primary No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'Pre Primary No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'Pre Primary Special Boy', field: 'priPrimarySpBoy' },
                      { title: 'Pre Primary Special Girl', field: 'priPrimarySpGirl' },
                      { title: 'Pre Primary Special Total', field: 'priPrimarySpTotal' },

                      { title: 'Pre Primary Special No Boy BCO', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'Pre Primary Special No Girl BCO', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'Pre Primary Special No Total BCO', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'Pre Primary Special No Book Boy BCO',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCO',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCO',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'Class 1 Boy', field: 'classOneBoy' },
                      { title: 'Class 1 Girl', field: 'classOneGirl' },
                      { title: 'Class 1 Total', field: 'classOneTotal' },

                      { title: 'Class 1 No Boy BCO', field: 'classOneNoBoyBC' },
                      { title: 'Class 1 No Girl BCO', field: 'classOneNoGirlBC' },
                      { title: 'Class 1 No Total BCO', field: 'classOneNoTotalBC' },

                      { title: 'Class 1 No Book Boy BCO', field: 'classOneNoBookBoyBC' },
                      { title: 'Class 1 No Book Girl BCO', field: 'classOneNoBookGirlBC' },
                      { title: 'Class 1 No Book Total BCO', field: 'classOneNoBookTotalBC' },

                      { title: 'Class 1 Special Boy', field: 'classOneSpBoy' },
                      { title: 'Class 1 Special Girl', field: 'classOneSpGirl' },
                      { title: 'Class 1 Special Total', field: 'classOneSpTotal' },

                      { title: 'Class 1 Special No Boy BCO', field: 'classOneNoSpBoyBC' },
                      { title: 'Class 1 Special No Girl BCO', field: 'classOneNoSpGirlBC' },
                      { title: 'Class 1 Special No Total BCO', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'Class 1 Special No Book Boy BCO',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCO',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCO',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'Class 2 Boy', field: 'classTwoBoy' },
                      { title: 'Class 2 Girl', field: 'classTwoGirl' },
                      { title: 'Class 2 Total', field: 'classTwoTotal' },

                      { title: 'Class 2 No Boy BCO', field: 'classTwoNoBoyBC' },
                      { title: 'Class 2 No Girl BCO', field: 'classTwoNoGirlBC' },
                      { title: 'Class 2 No Total BCO', field: 'classTwoNoTotalBC' },

                      { title: 'Class 2 No Book Boy BCO', field: 'classTwoNoBookBoyBC' },
                      { title: 'Class 2 No Book Girl BCO', field: 'classTwoNoBookGirlBC' },
                      { title: 'Class 2 No Book Total BCO', field: 'classTwoNoBookTotalBC' },

                      { title: 'Class 2 Special Boy', field: 'classTwoSpBoy' },
                      { title: 'Class 2 Special Girl', field: 'classTwoSpGirl' },
                      { title: 'Class 2 Special Total', field: 'classTwoSpTotal' },

                      { title: 'Class 2 Special No Boy BCO', field: 'classTwoNoSpBoyBC' },
                      { title: 'Class 2 Special No Girl BCO', field: 'classTwoNoSpGirlBC' },
                      { title: 'Class 2 Special No Total BCO', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'Class 2 Special No Book Boy BCO',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCO',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCO',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'Class 3 Boy', field: 'classThreeBoy' },
                      { title: 'Class 3 Girl', field: 'classThreeGirl' },
                      { title: 'Class 3 Total', field: 'classThreeTotal' },

                      { title: 'Class 3 No Boy BCO', field: 'classThreeNoBoyBC' },
                      { title: 'Class 3 No Girl BCO', field: 'classThreeNoGirlBC' },
                      { title: 'Class 3 No Total BCO', field: 'classThreeNoTotalBC' },

                      { title: 'Class 3 No Book Boy BCO', field: 'classThreeNoBookBoyBC' },
                      { title: 'Class 3 No Book Girl BCO', field: 'classThreeNoBookGirlBC' },
                      { title: 'Class 3 No Book Total BCO', field: 'classThreeNoBookTotalBC' },

                      { title: 'Class 3 Special Boy', field: 'classThreeSpBoy' },
                      { title: 'Class 3 Special Girl', field: 'classThreeSpGirl' },
                      { title: 'Class 3 Special Total', field: 'classThreeSpTotal' },

                      { title: 'Class 3 Special No Boy BCO', field: 'classThreeNoSpBoyBC' },
                      { title: 'Class 3 Special No Girl BCO', field: 'classThreeNoSpGirlBC' },
                      { title: 'Class 3 Special No Total BCO', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'Class 3 Special No Book Boy BCO',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCO',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCO',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'Class 4 Boy', field: 'classFourBoy' },
                      { title: 'Class 4 Girl', field: 'classFourGirl' },
                      { title: 'Class 4 Total', field: 'classFourTotal' },

                      { title: 'Class 4 No Boy BCO', field: 'classFourNoBoyBC' },
                      { title: 'Class 4 No Girl BCO', field: 'classFourNoGirlBC' },
                      { title: 'Class 4 No Total BCO', field: 'classFourNoTotalBC' },

                      { title: 'Class 4 No Book Boy BCO', field: 'classFourNoBookBoyBC' },
                      { title: 'Class 4 No Book Girl BCO', field: 'classFourNoBookGirlBC' },
                      { title: 'Class 4 No Book Total BCO', field: 'classFourNoBookTotalBC' },

                      { title: 'Class 4 Special Boy', field: 'classFourSpBoy' },
                      { title: 'Class 4 Special Girl', field: 'classFourSpGirl' },
                      { title: 'Class 4 Special Total', field: 'classFourSpTotal' },

                      { title: 'Class 4 Special No Boy BCO', field: 'classFourNoSpBoyBC' },
                      { title: 'Class 4 Special No Girl BCO', field: 'classFourNoSpGirlBC' },
                      { title: 'Class 4 Special No Total BCO', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'Class 4 Special No Book Boy BCO',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCO',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCO',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'Class 5 Boy', field: 'classFiveBoy' },
                      { title: 'Class 5 Girl', field: 'classFiveGirl' },
                      { title: 'Class 5 Total', field: 'classFiveTotal' },

                      { title: 'Class 5 No Boy BCO', field: 'classFiveNoBoyBC' },
                      { title: 'Class 5 No Girl BCO', field: 'classFiveNoGirlBC' },
                      { title: 'Class 5 No Total BCO', field: 'classFiveNoTotalBC' },

                      { title: 'Class 5 No Book Boy BCO', field: 'classFiveNoBookBoyBC' },
                      { title: 'Class 5 No Book Girl BCO', field: 'classFiveNoBookGirlBC' },
                      { title: 'Class 5 No Book Total BCO', field: 'classFiveNoBookTotalBC' },

                      { title: 'Class 5 Special Boy', field: 'classFiveSpBoy' },
                      { title: 'Class 5 Special Girl', field: 'classFiveSpGirl' },
                      { title: 'Class 5 Special Total', field: 'classFiveSpTotal' },

                      { title: 'Class 5 Special No Boy BCO', field: 'classFiveNoSpBoyBC' },
                      { title: 'Class 5 Special No Girl BCO', field: 'classFiveNoSpGirlBC' },
                      { title: 'Class 5 Special No Total BCO', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'Class 5 Special No Book Boy BCO',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCO',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCO',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'Pre Primary Boy BCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'Pre Primary Girl BCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'Pre Primary Total BCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'Pre Primary No Book Boy BCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'Pre Primary No Book Girl BCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'Pre Primary No Book Total BCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'Pre Primary Special No Boy BCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'Pre Primary Special No Girl BCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Total BCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'Pre Primary Special No Book Boy BCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'Class 1 Boy BCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'Class 1 Girl BCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'Class 1 Total BCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'Class 1 No Book Boy BCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'Class 1 No Book Girl BCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'Class 1 No Book Total BCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'Class 1 Special No Boy BCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'Class 1 Special No Girl BCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Total BCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 1 Special No Book Boy BCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'Class 2 Boy BCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'Class 2 Girl BCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'Class 2 Total BCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'Class 2 No Book Boy BCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'Class 2 No Book Girl BCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'Class 2 No Book Total BCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'Class 2 Special No Boy BCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'Class 2 Special No Girl BCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Total BCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 2 Special No Book Boy BCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'Class 3 Boy BCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'Class 3 Girl BCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'Class 3 Total BCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'Class 3 No Book Boy BCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'Class 3 No Book Girl BCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'Class 3 No Book Total BCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'Class 3 Special No Boy BCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'Class 3 Special No Girl BCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Total BCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 3 Special No Book Boy BCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'Class 4 Boy BCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'Class 4 Girl BCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'Class 4 Total BCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'Class 4 No Book Boy BCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'Class 4 No Book Girl BCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'Class 4 No Book Total BCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'Class 4 Special No Boy BCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'Class 4 Special No Girl BCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Total BCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 4 Special No Book Boy BCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'Class 5 Boy BCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'Class 5 Girl BCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'Class 5 Total BCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'Class 5 No Book Boy BCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'Class 5 No Book Girl BCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'Class 5 No Book Total BCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'Class 5 Special No Boy BCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'Class 5 Special No Girl BCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Total BCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 5 Special No Book Boy BCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCIn',
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
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#ede9df',
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
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },
                      {
                        title: 'Head Teacher',
                        field: 'headTeacher',
                      },
                      { title: 'LPO', field: 'lpo', type: 'string' },
                      {
                        title: 'LF',
                        field: 'lf',
                        type: 'string',
                      },

                      { title: '#Total Girl', field: 'schoolTotalNoGirl' },
                      { title: '#Total Boy', field: 'schoolTotalNoBoy' },
                      { title: '#Total Student', field: 'schoolTotalNoStudent' },

                      { title: '#No Girl BCO', field: 'schoolTotalNoGirlBC' },
                      { title: '#No Boy BCO', field: 'schoolTotalNoBoyBC' },
                      { title: '#No Student BCO', field: 'schoolTotalNoStudentBC' },

                      { title: '#No Book BCO', field: 'schoolTotalNoBookBC' },

                      { title: '#Student BCI', field: 'schoolTotalNoStudentBCIn' },

                      { title: '#Book BCI', field: 'schoolTotalNoBookBCIn' },

                      { title: '#Total Student Sp', field: 'schoolTotalNoSpStudent' },

                      { title: '#Student BCO Sp', field: 'schoolTotalNoSpStudentBC' },

                      { title: '#Book BCO Sp', field: 'schoolTotalNoSpBookBC' },

                      { title: '#Student BCI SP', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: '#Book BCI Sp', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'Pre Primary Boy', field: 'priPrimaryBoy' },
                      { title: 'Pre Primary Girl', field: 'priPrimaryGirl' },
                      { title: 'Pre Primary Total', field: 'priPrimaryTotal' },

                      { title: 'Pre Primary No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'Pre Primary No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'Pre Primary No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'Pre Primary No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'Pre Primary No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'Pre Primary No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'Pre Primary Special Boy', field: 'priPrimarySpBoy' },
                      { title: 'Pre Primary Special Girl', field: 'priPrimarySpGirl' },
                      { title: 'Pre Primary Special Total', field: 'priPrimarySpTotal' },

                      { title: 'Pre Primary Special No Boy BCO', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'Pre Primary Special No Girl BCO', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'Pre Primary Special No Total BCO', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'Pre Primary Special No Book Boy BCO',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCO',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCO',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'Class 1 Boy', field: 'classOneBoy' },
                      { title: 'Class 1 Girl', field: 'classOneGirl' },
                      { title: 'Class 1 Total', field: 'classOneTotal' },

                      { title: 'Class 1 No Boy BCO', field: 'classOneNoBoyBC' },
                      { title: 'Class 1 No Girl BCO', field: 'classOneNoGirlBC' },
                      { title: 'Class 1 No Total BCO', field: 'classOneNoTotalBC' },

                      { title: 'Class 1 No Book Boy BCO', field: 'classOneNoBookBoyBC' },
                      { title: 'Class 1 No Book Girl BCO', field: 'classOneNoBookGirlBC' },
                      { title: 'Class 1 No Book Total BCO', field: 'classOneNoBookTotalBC' },

                      { title: 'Class 1 Special Boy', field: 'classOneSpBoy' },
                      { title: 'Class 1 Special Girl', field: 'classOneSpGirl' },
                      { title: 'Class 1 Special Total', field: 'classOneSpTotal' },

                      { title: 'Class 1 Special No Boy BCO', field: 'classOneNoSpBoyBC' },
                      { title: 'Class 1 Special No Girl BCO', field: 'classOneNoSpGirlBC' },
                      { title: 'Class 1 Special No Total BCO', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'Class 1 Special No Book Boy BCO',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCO',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCO',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'Class 2 Boy', field: 'classTwoBoy' },
                      { title: 'Class 2 Girl', field: 'classTwoGirl' },
                      { title: 'Class 2 Total', field: 'classTwoTotal' },

                      { title: 'Class 2 No Boy BCO', field: 'classTwoNoBoyBC' },
                      { title: 'Class 2 No Girl BCO', field: 'classTwoNoGirlBC' },
                      { title: 'Class 2 No Total BCO', field: 'classTwoNoTotalBC' },

                      { title: 'Class 2 No Book Boy BCO', field: 'classTwoNoBookBoyBC' },
                      { title: 'Class 2 No Book Girl BCO', field: 'classTwoNoBookGirlBC' },
                      { title: 'Class 2 No Book Total BCO', field: 'classTwoNoBookTotalBC' },

                      { title: 'Class 2 Special Boy', field: 'classTwoSpBoy' },
                      { title: 'Class 2 Special Girl', field: 'classTwoSpGirl' },
                      { title: 'Class 2 Special Total', field: 'classTwoSpTotal' },

                      { title: 'Class 2 Special No Boy BCO', field: 'classTwoNoSpBoyBC' },
                      { title: 'Class 2 Special No Girl BCO', field: 'classTwoNoSpGirlBC' },
                      { title: 'Class 2 Special No Total BCO', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'Class 2 Special No Book Boy BCO',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCO',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCO',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'Class 3 Boy', field: 'classThreeBoy' },
                      { title: 'Class 3 Girl', field: 'classThreeGirl' },
                      { title: 'Class 3 Total', field: 'classThreeTotal' },

                      { title: 'Class 3 No Boy BCO', field: 'classThreeNoBoyBC' },
                      { title: 'Class 3 No Girl BCO', field: 'classThreeNoGirlBC' },
                      { title: 'Class 3 No Total BCO', field: 'classThreeNoTotalBC' },

                      { title: 'Class 3 No Book Boy BCO', field: 'classThreeNoBookBoyBC' },
                      { title: 'Class 3 No Book Girl BCO', field: 'classThreeNoBookGirlBC' },
                      { title: 'Class 3 No Book Total BCO', field: 'classThreeNoBookTotalBC' },

                      { title: 'Class 3 Special Boy', field: 'classThreeSpBoy' },
                      { title: 'Class 3 Special Girl', field: 'classThreeSpGirl' },
                      { title: 'Class 3 Special Total', field: 'classThreeSpTotal' },

                      { title: 'Class 3 Special No Boy BCO', field: 'classThreeNoSpBoyBC' },
                      { title: 'Class 3 Special No Girl BCO', field: 'classThreeNoSpGirlBC' },
                      { title: 'Class 3 Special No Total BCO', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'Class 3 Special No Book Boy BCO',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCO',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCO',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'Class 4 Boy', field: 'classFourBoy' },
                      { title: 'Class 4 Girl', field: 'classFourGirl' },
                      { title: 'Class 4 Total', field: 'classFourTotal' },

                      { title: 'Class 4 No Boy BCO', field: 'classFourNoBoyBC' },
                      { title: 'Class 4 No Girl BCO', field: 'classFourNoGirlBC' },
                      { title: 'Class 4 No Total BCO', field: 'classFourNoTotalBC' },

                      { title: 'Class 4 No Book Boy BCO', field: 'classFourNoBookBoyBC' },
                      { title: 'Class 4 No Book Girl BCO', field: 'classFourNoBookGirlBC' },
                      { title: 'Class 4 No Book Total BCO', field: 'classFourNoBookTotalBC' },

                      { title: 'Class 4 Special Boy', field: 'classFourSpBoy' },
                      { title: 'Class 4 Special Girl', field: 'classFourSpGirl' },
                      { title: 'Class 4 Special Total', field: 'classFourSpTotal' },

                      { title: 'Class 4 Special No Boy BCO', field: 'classFourNoSpBoyBC' },
                      { title: 'Class 4 Special No Girl BCO', field: 'classFourNoSpGirlBC' },
                      { title: 'Class 4 Special No Total BCO', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'Class 4 Special No Book Boy BCO',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCO',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCO',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'Class 5 Boy', field: 'classFiveBoy' },
                      { title: 'Class 5 Girl', field: 'classFiveGirl' },
                      { title: 'Class 5 Total', field: 'classFiveTotal' },

                      { title: 'Class 5 No Boy BCO', field: 'classFiveNoBoyBC' },
                      { title: 'Class 5 No Girl BCO', field: 'classFiveNoGirlBC' },
                      { title: 'Class 5 No Total BCO', field: 'classFiveNoTotalBC' },

                      { title: 'Class 5 No Book Boy BCO', field: 'classFiveNoBookBoyBC' },
                      { title: 'Class 5 No Book Girl BCO', field: 'classFiveNoBookGirlBC' },
                      { title: 'Class 5 No Book Total BCO', field: 'classFiveNoBookTotalBC' },

                      { title: 'Class 5 Special Boy', field: 'classFiveSpBoy' },
                      { title: 'Class 5 Special Girl', field: 'classFiveSpGirl' },
                      { title: 'Class 5 Special Total', field: 'classFiveSpTotal' },

                      { title: 'Class 5 Special No Boy BCO', field: 'classFiveNoSpBoyBC' },
                      { title: 'Class 5 Special No Girl BCO', field: 'classFiveNoSpGirlBC' },
                      { title: 'Class 5 Special No Total BCO', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'Class 5 Special No Book Boy BCO',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCO',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCO',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'Pre Primary Boy BCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'Pre Primary Girl BCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'Pre Primary Total BCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'Pre Primary No Book Boy BCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'Pre Primary No Book Girl BCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'Pre Primary No Book Total BCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'Pre Primary Special No Boy BCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'Pre Primary Special No Girl BCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Total BCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'Pre Primary Special No Book Boy BCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'Class 1 Boy BCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'Class 1 Girl BCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'Class 1 Total BCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'Class 1 No Book Boy BCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'Class 1 No Book Girl BCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'Class 1 No Book Total BCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'Class 1 Special No Boy BCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'Class 1 Special No Girl BCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Total BCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 1 Special No Book Boy BCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'Class 2 Boy BCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'Class 2 Girl BCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'Class 2 Total BCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'Class 2 No Book Boy BCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'Class 2 No Book Girl BCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'Class 2 No Book Total BCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'Class 2 Special No Boy BCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'Class 2 Special No Girl BCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Total BCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 2 Special No Book Boy BCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'Class 3 Boy BCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'Class 3 Girl BCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'Class 3 Total BCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'Class 3 No Book Boy BCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'Class 3 No Book Girl BCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'Class 3 No Book Total BCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'Class 3 Special No Boy BCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'Class 3 Special No Girl BCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Total BCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 3 Special No Book Boy BCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'Class 4 Boy BCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'Class 4 Girl BCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'Class 4 Total BCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'Class 4 No Book Boy BCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'Class 4 No Book Girl BCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'Class 4 No Book Total BCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'Class 4 Special No Boy BCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'Class 4 Special No Girl BCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Total BCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 4 Special No Book Boy BCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'Class 5 Boy BCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'Class 5 Girl BCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'Class 5 Total BCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'Class 5 No Book Boy BCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'Class 5 No Book Girl BCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'Class 5 No Book Total BCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'Class 5 Special No Boy BCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'Class 5 Special No Girl BCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Total BCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 5 Special No Book Boy BCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCIn',
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
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#ede9df',
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
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
                      { title: 'Month', field: 'month', sorting: 'true' },
                      { title: '#Visit', field: 'visitNo', sorting: 'true' },

                      { title: 'District', field: 'district' },
                      { title: 'Upazilla', field: 'upazilla', sorting: 'true' },
                      { title: 'Visitor', field: 'visitor' },
                      {
                        title: 'Head Teacher',
                        field: 'headTeacher',
                      },
                      { title: 'LPO', field: 'lpo', type: 'string' },
                      {
                        title: 'LF',
                        field: 'lf',
                        type: 'string',
                      },

                      { title: '#Total Girl', field: 'schoolTotalNoGirl' },
                      { title: '#Total Boy', field: 'schoolTotalNoBoy' },
                      { title: '#Total Student', field: 'schoolTotalNoStudent' },

                      { title: '#No Girl BCO', field: 'schoolTotalNoGirlBC' },
                      { title: '#No Boy BCO', field: 'schoolTotalNoBoyBC' },
                      { title: '#No Student BCO', field: 'schoolTotalNoStudentBC' },

                      { title: '#No Book BCO', field: 'schoolTotalNoBookBC' },

                      { title: '#Student BCI', field: 'schoolTotalNoStudentBCIn' },

                      { title: '#Book BCI', field: 'schoolTotalNoBookBCIn' },

                      { title: '#Total Student Sp', field: 'schoolTotalNoSpStudent' },

                      { title: '#Student BCO Sp', field: 'schoolTotalNoSpStudentBC' },

                      { title: '#Book BCO Sp', field: 'schoolTotalNoSpBookBC' },

                      { title: '#Student BCI SP', field: 'schoolTotalNoSpStudentBCIn' },

                      { title: '#Book BCI Sp', field: 'schoolTotalNoSpBookBCIn' },

                      { title: 'Pre Primary Boy', field: 'priPrimaryBoy' },
                      { title: 'Pre Primary Girl', field: 'priPrimaryGirl' },
                      { title: 'Pre Primary Total', field: 'priPrimaryTotal' },

                      { title: 'Pre Primary No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'Pre Primary No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'Pre Primary No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'Pre Primary No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'Pre Primary No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'Pre Primary No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },

                      { title: 'Pre Primary Special Boy', field: 'priPrimarySpBoy' },
                      { title: 'Pre Primary Special Girl', field: 'priPrimarySpGirl' },
                      { title: 'Pre Primary Special Total', field: 'priPrimarySpTotal' },

                      { title: 'Pre Primary Special No Boy BCO', field: 'priPrimaryNoSpBoyBC' },
                      { title: 'Pre Primary Special No Girl BCO', field: 'priPrimaryNoSpGirlBC' },
                      { title: 'Pre Primary Special No Total BCO', field: 'priPrimaryNoSpTotalBC' },

                      {
                        title: 'Pre Primary Special No Book Boy BCO',
                        field: 'priPrimaryNoBookSpBoyBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCO',
                        field: 'priPrimaryNoBookSpGirlBC',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCO',
                        field: 'priPrimaryNoBookSpTotalBC',
                      },

                      { title: 'Class 1 Boy', field: 'classOneBoy' },
                      { title: 'Class 1 Girl', field: 'classOneGirl' },
                      { title: 'Class 1 Total', field: 'classOneTotal' },

                      { title: 'Class 1 No Boy BCO', field: 'classOneNoBoyBC' },
                      { title: 'Class 1 No Girl BCO', field: 'classOneNoGirlBC' },
                      { title: 'Class 1 No Total BCO', field: 'classOneNoTotalBC' },

                      { title: 'Class 1 No Book Boy BCO', field: 'classOneNoBookBoyBC' },
                      { title: 'Class 1 No Book Girl BCO', field: 'classOneNoBookGirlBC' },
                      { title: 'Class 1 No Book Total BCO', field: 'classOneNoBookTotalBC' },

                      { title: 'Class 1 Special Boy', field: 'classOneSpBoy' },
                      { title: 'Class 1 Special Girl', field: 'classOneSpGirl' },
                      { title: 'Class 1 Special Total', field: 'classOneSpTotal' },

                      { title: 'Class 1 Special No Boy BCO', field: 'classOneNoSpBoyBC' },
                      { title: 'Class 1 Special No Girl BCO', field: 'classOneNoSpGirlBC' },
                      { title: 'Class 1 Special No Total BCO', field: 'classOneNoSpTotalBC' },

                      {
                        title: 'Class 1 Special No Book Boy BCO',
                        field: 'classOneNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCO',
                        field: 'classOneNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCO',
                        field: 'classOneNoBookSpTotalBC',
                      },

                      { title: 'Class 2 Boy', field: 'classTwoBoy' },
                      { title: 'Class 2 Girl', field: 'classTwoGirl' },
                      { title: 'Class 2 Total', field: 'classTwoTotal' },

                      { title: 'Class 2 No Boy BCO', field: 'classTwoNoBoyBC' },
                      { title: 'Class 2 No Girl BCO', field: 'classTwoNoGirlBC' },
                      { title: 'Class 2 No Total BCO', field: 'classTwoNoTotalBC' },

                      { title: 'Class 2 No Book Boy BCO', field: 'classTwoNoBookBoyBC' },
                      { title: 'Class 2 No Book Girl BCO', field: 'classTwoNoBookGirlBC' },
                      { title: 'Class 2 No Book Total BCO', field: 'classTwoNoBookTotalBC' },

                      { title: 'Class 2 Special Boy', field: 'classTwoSpBoy' },
                      { title: 'Class 2 Special Girl', field: 'classTwoSpGirl' },
                      { title: 'Class 2 Special Total', field: 'classTwoSpTotal' },

                      { title: 'Class 2 Special No Boy BCO', field: 'classTwoNoSpBoyBC' },
                      { title: 'Class 2 Special No Girl BCO', field: 'classTwoNoSpGirlBC' },
                      { title: 'Class 2 Special No Total BCO', field: 'classTwoNoSpTotalBC' },

                      {
                        title: 'Class 2 Special No Book Boy BCO',
                        field: 'classTwoNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCO',
                        field: 'classTwoNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCO',
                        field: 'classTwoNoBookSpTotalBC',
                      },

                      { title: 'Class 3 Boy', field: 'classThreeBoy' },
                      { title: 'Class 3 Girl', field: 'classThreeGirl' },
                      { title: 'Class 3 Total', field: 'classThreeTotal' },

                      { title: 'Class 3 No Boy BCO', field: 'classThreeNoBoyBC' },
                      { title: 'Class 3 No Girl BCO', field: 'classThreeNoGirlBC' },
                      { title: 'Class 3 No Total BCO', field: 'classThreeNoTotalBC' },

                      { title: 'Class 3 No Book Boy BCO', field: 'classThreeNoBookBoyBC' },
                      { title: 'Class 3 No Book Girl BCO', field: 'classThreeNoBookGirlBC' },
                      { title: 'Class 3 No Book Total BCO', field: 'classThreeNoBookTotalBC' },

                      { title: 'Class 3 Special Boy', field: 'classThreeSpBoy' },
                      { title: 'Class 3 Special Girl', field: 'classThreeSpGirl' },
                      { title: 'Class 3 Special Total', field: 'classThreeSpTotal' },

                      { title: 'Class 3 Special No Boy BCO', field: 'classThreeNoSpBoyBC' },
                      { title: 'Class 3 Special No Girl BCO', field: 'classThreeNoSpGirlBC' },
                      { title: 'Class 3 Special No Total BCO', field: 'classThreeNoSpTotalBC' },

                      {
                        title: 'Class 3 Special No Book Boy BCO',
                        field: 'classThreeNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCO',
                        field: 'classThreeNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCO',
                        field: 'classThreeNoBookSpTotalBC',
                      },

                      { title: 'Class 4 Boy', field: 'classFourBoy' },
                      { title: 'Class 4 Girl', field: 'classFourGirl' },
                      { title: 'Class 4 Total', field: 'classFourTotal' },

                      { title: 'Class 4 No Boy BCO', field: 'classFourNoBoyBC' },
                      { title: 'Class 4 No Girl BCO', field: 'classFourNoGirlBC' },
                      { title: 'Class 4 No Total BCO', field: 'classFourNoTotalBC' },

                      { title: 'Class 4 No Book Boy BCO', field: 'classFourNoBookBoyBC' },
                      { title: 'Class 4 No Book Girl BCO', field: 'classFourNoBookGirlBC' },
                      { title: 'Class 4 No Book Total BCO', field: 'classFourNoBookTotalBC' },

                      { title: 'Class 4 Special Boy', field: 'classFourSpBoy' },
                      { title: 'Class 4 Special Girl', field: 'classFourSpGirl' },
                      { title: 'Class 4 Special Total', field: 'classFourSpTotal' },

                      { title: 'Class 4 Special No Boy BCO', field: 'classFourNoSpBoyBC' },
                      { title: 'Class 4 Special No Girl BCO', field: 'classFourNoSpGirlBC' },
                      { title: 'Class 4 Special No Total BCO', field: 'classFourNoSpTotalBC' },

                      {
                        title: 'Class 4 Special No Book Boy BCO',
                        field: 'classFourNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCO',
                        field: 'classFourNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCO',
                        field: 'classFourNoBookSpTotalBC',
                      },

                      { title: 'Class 5 Boy', field: 'classFiveBoy' },
                      { title: 'Class 5 Girl', field: 'classFiveGirl' },
                      { title: 'Class 5 Total', field: 'classFiveTotal' },

                      { title: 'Class 5 No Boy BCO', field: 'classFiveNoBoyBC' },
                      { title: 'Class 5 No Girl BCO', field: 'classFiveNoGirlBC' },
                      { title: 'Class 5 No Total BCO', field: 'classFiveNoTotalBC' },

                      { title: 'Class 5 No Book Boy BCO', field: 'classFiveNoBookBoyBC' },
                      { title: 'Class 5 No Book Girl BCO', field: 'classFiveNoBookGirlBC' },
                      { title: 'Class 5 No Book Total BCO', field: 'classFiveNoBookTotalBC' },

                      { title: 'Class 5 Special Boy', field: 'classFiveSpBoy' },
                      { title: 'Class 5 Special Girl', field: 'classFiveSpGirl' },
                      { title: 'Class 5 Special Total', field: 'classFiveSpTotal' },

                      { title: 'Class 5 Special No Boy BCO', field: 'classFiveNoSpBoyBC' },
                      { title: 'Class 5 Special No Girl BCO', field: 'classFiveNoSpGirlBC' },
                      { title: 'Class 5 Special No Total BCO', field: 'classFiveNoSpTotalBC' },

                      {
                        title: 'Class 5 Special No Book Boy BCO',
                        field: 'classFiveNoBookSpBoyBC',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCO',
                        field: 'classFiveNoBookSpGirlBC',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCO',
                        field: 'classFiveNoBookSpTotalBC',
                      },

                      { title: 'Pre Primary Boy BCIn', field: 'priPrimaryNoBoyBCIn' },
                      { title: 'Pre Primary Girl BCIn', field: 'priPrimaryNoGirlBCIn' },
                      { title: 'Pre Primary Total BCIn', field: 'priPrimaryNoTotalBCIn' },

                      { title: 'Pre Primary No Book Boy BCIn', field: 'priPrimaryNoBookBoyBCIn' },
                      { title: 'Pre Primary No Book Girl BCIn', field: 'priPrimaryNoBookGirlBCIn' },
                      {
                        title: 'Pre Primary No Book Total BCIn',
                        field: 'priPrimaryNoBookTotalBCIn',
                      },

                      { title: 'Pre Primary Special No Boy BCIn', field: 'priPrimaryNoSpBoyBCIn' },
                      {
                        title: 'Pre Primary Special No Girl BCIn',
                        field: 'priPrimaryNoSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Total BCIn',
                        field: 'priPrimaryNoSpTotalBCIn',
                      },

                      {
                        title: 'Pre Primary Special No Book Boy BCIn',
                        field: 'priPrimaryNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Girl BCIn',
                        field: 'priPrimaryNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Pre Primary Special No Book Total BCIn',
                        field: 'priPrimaryNoBookSpTotalBCIn',
                      },

                      { title: 'Class 1 Boy BCIn', field: 'classOneNoBoyBCIn' },
                      { title: 'Class 1 Girl BCIn', field: 'classOneNoGirlBCIn' },
                      { title: 'Class 1 Total BCIn', field: 'classOneNoTotalBCIn' },

                      { title: 'Class 1 No Book Boy BCIn', field: 'classOneNoBookBoyBCIn' },
                      { title: 'Class 1 No Book Girl BCIn', field: 'classOneNoBookGirlBCIn' },
                      {
                        title: 'Class 1 No Book Total BCIn',
                        field: 'classOneNoBookTotalBCIn',
                      },

                      { title: 'Class 1 Special No Boy BCIn', field: 'classOneNoSpBoyBCIn' },
                      {
                        title: 'Class 1 Special No Girl BCIn',
                        field: 'classOneNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Total BCIn',
                        field: 'classOneNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 1 Special No Book Boy BCIn',
                        field: 'classOneNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Girl BCIn',
                        field: 'classOneNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 1 Special No Book Total BCIn',
                        field: 'classOneNoBookSpTotalBCIn',
                      },

                      { title: 'Class 2 Boy BCIn', field: 'classTwoNoBoyBCIn' },
                      { title: 'Class 2 Girl BCIn', field: 'classTwoNoGirlBCIn' },
                      { title: 'Class 2 Total BCIn', field: 'classTwoNoTotalBCIn' },

                      { title: 'Class 2 No Book Boy BCIn', field: 'classTwoNoBookBoyBCIn' },
                      { title: 'Class 2 No Book Girl BCIn', field: 'classTwoNoBookGirlBCIn' },
                      {
                        title: 'Class 2 No Book Total BCIn',
                        field: 'classTwoNoBookTotalBCIn',
                      },

                      { title: 'Class 2 Special No Boy BCIn', field: 'classTwoNoSpBoyBCIn' },
                      {
                        title: 'Class 2 Special No Girl BCIn',
                        field: 'classTwoNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Total BCIn',
                        field: 'classTwoNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 2 Special No Book Boy BCIn',
                        field: 'classTwoNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Girl BCIn',
                        field: 'classTwoNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 2 Special No Book Total BCIn',
                        field: 'classTwoNoBookSpTotalBCIn',
                      },

                      { title: 'Class 3 Boy BCIn', field: 'classThreeNoBoyBCIn' },
                      { title: 'Class 3 Girl BCIn', field: 'classThreeNoGirlBCIn' },
                      { title: 'Class 3 Total BCIn', field: 'classThreeNoTotalBCIn' },

                      { title: 'Class 3 No Book Boy BCIn', field: 'classThreeNoBookBoyBCIn' },
                      { title: 'Class 3 No Book Girl BCIn', field: 'classThreeNoBookGirlBCIn' },
                      {
                        title: 'Class 3 No Book Total BCIn',
                        field: 'classThreeNoBookTotalBCIn',
                      },

                      { title: 'Class 3 Special No Boy BCIn', field: 'classThreeNoSpBoyBCIn' },
                      {
                        title: 'Class 3 Special No Girl BCIn',
                        field: 'classThreeNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Total BCIn',
                        field: 'classThreeNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 3 Special No Book Boy BCIn',
                        field: 'classThreeNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Girl BCIn',
                        field: 'classThreeNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 3 Special No Book Total BCIn',
                        field: 'classThreeNoBookSpTotalBCIn',
                      },

                      { title: 'Class 4 Boy BCIn', field: 'classFourNoBoyBCIn' },
                      { title: 'Class 4 Girl BCIn', field: 'classFourNoGirlBCIn' },
                      { title: 'Class 4 Total BCIn', field: 'classFourNoTotalBCIn' },

                      { title: 'Class 4 No Book Boy BCIn', field: 'classFourNoBookBoyBCIn' },
                      { title: 'Class 4 No Book Girl BCIn', field: 'classFourNoBookGirlBCIn' },
                      {
                        title: 'Class 4 No Book Total BCIn',
                        field: 'classFourNoBookTotalBCIn',
                      },

                      { title: 'Class 4 Special No Boy BCIn', field: 'classFourNoSpBoyBCIn' },
                      {
                        title: 'Class 4 Special No Girl BCIn',
                        field: 'classFourNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Total BCIn',
                        field: 'classFourNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 4 Special No Book Boy BCIn',
                        field: 'classFourNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Girl BCIn',
                        field: 'classFourNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 4 Special No Book Total BCIn',
                        field: 'classFourNoBookSpTotalBCIn',
                      },

                      { title: 'Class 5 Boy BCIn', field: 'classFiveNoBoyBCIn' },
                      { title: 'Class 5 Girl BCIn', field: 'classFiveNoGirlBCIn' },
                      { title: 'Class 5 Total BCIn', field: 'classFiveNoTotalBCIn' },

                      { title: 'Class 5 No Book Boy BCIn', field: 'classFiveNoBookBoyBCIn' },
                      { title: 'Class 5 No Book Girl BCIn', field: 'classFiveNoBookGirlBCIn' },
                      {
                        title: 'Class 5 No Book Total BCIn',
                        field: 'classFiveNoBookTotalBCIn',
                      },

                      { title: 'Class 5 Special No Boy BCIn', field: 'classFiveNoSpBoyBCIn' },
                      {
                        title: 'Class 5 Special No Girl BCIn',
                        field: 'classFiveNoSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Total BCIn',
                        field: 'classFiveNoSpTotalBCIn',
                      },

                      {
                        title: 'Class 5 Special No Book Boy BCIn',
                        field: 'classFiveNoBookSpBoyBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Girl BCIn',
                        field: 'classFiveNoBookSpGirlBCIn',
                      },
                      {
                        title: 'Class 5 Special No Book Total BCIn',
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
                      },
                      rowStyle: {
                        fontSize: 14,
                        backgroundColor: '#ede9df',
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
