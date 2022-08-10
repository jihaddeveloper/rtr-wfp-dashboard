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

const AllBCOCRF = () => {
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
  const currentMonth = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  // Current date and month

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')

    getAllBookCheckoutCRF(console.log('get bookcheckout called'))
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Book-checkout Data for school
  const getAllBookCheckoutCRF = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/book-checkout-community', {
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
            item.upazilla === 'Kutubdia' &&
            new Date(item.date).getMonth() === new Date().getMonth(),
        ),
      )

      setUkhiyaAllBCOSchoolCMonth(
        response.data.filter(
          (item) =>
            item.upazilla === 'Ukhiya' && new Date(item.date).getMonth() === new Date().getMonth(),
        ),
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
            <strong>ALL BCO Data CRF</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>BCO/I Detail CRF Data Ukhiya(June-2022 Till Now) </strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaAllBCOSchool.length + ' BCO Data CRF Ukhiya'}
                    columns={[
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
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

                      { title: 'PP Girl', field: 'priPrimaryGirl' },
                      { title: 'PP Boy', field: 'priPrimaryBoy' },
                      { title: 'PP Total', field: 'priPrimaryTotal' },

                      { title: 'PP No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'PP No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'PP No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'PP No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'PP No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'PP No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },
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
                  <strong>BCO/I Detail CRF Data Kutubdia(June-2022 Till Now)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaAllBCOSchool.length + ' BCO Data CRF Kutubdia'}
                    columns={[
                      { title: 'School', field: 'school' },
                      {
                        title: 'Date',
                        field: 'date',
                        type: 'date',
                        sorting: 'true',
                      },
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

                      { title: 'PP Girl', field: 'priPrimaryGirl' },
                      { title: 'PP Boy', field: 'priPrimaryBoy' },
                      { title: 'PP Total', field: 'priPrimaryTotal' },

                      { title: 'PP No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'PP No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'PP No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'PP No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'PP No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'PP No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },
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
                  <strong>BCO/I Detail CRF Data Combined(June-2022 Till Now) </strong>
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

                      { title: 'PP Girl', field: 'priPrimaryGirl' },
                      { title: 'PP Boy', field: 'priPrimaryBoy' },
                      { title: 'PP Total', field: 'priPrimaryTotal' },

                      { title: 'PP No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'PP No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'PP No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'PP No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'PP No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'PP No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },
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
                  <strong>BCO/I Detail CRF Data Ukhiya({currentMonth}) </strong>
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

                      { title: 'PP Girl', field: 'priPrimaryGirl' },
                      { title: 'PP Boy', field: 'priPrimaryBoy' },
                      { title: 'PP Total', field: 'priPrimaryTotal' },

                      { title: 'PP No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'PP No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'PP No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'PP No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'PP No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'PP No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },
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
                  <strong>BCO/I Detail CRF Data Kutubdia({currentMonth}) </strong>
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

                      { title: 'PP Girl', field: 'priPrimaryGirl' },
                      { title: 'PP Boy', field: 'priPrimaryBoy' },
                      { title: 'PP Total', field: 'priPrimaryTotal' },

                      { title: 'PP No Girl BCO', field: 'priPrimaryNoGirlBC' },
                      { title: 'PP No Boy BCO', field: 'priPrimaryNoBoyBC' },
                      { title: 'PP No Total BCO', field: 'priPrimaryNoTotalBC' },

                      { title: 'PP No Book Girl BCO', field: 'priPrimaryNoBookGirlBC' },
                      { title: 'PP No Book Boy BCO', field: 'priPrimaryNoBookBoyBC' },
                      { title: 'PP No Book Total BCO', field: 'priPrimaryNoBookTotalBC' },
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

export default AllBCOCRF
