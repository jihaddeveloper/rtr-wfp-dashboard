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

const AnalysisBySchool = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  // Report Data
  const [reportData, setReportData] = useState([])

  const [allBCOData, setAllBCOData] = useState([])

  const [checkbox1, setCheckbox1] = React.useState('')

  let [currentData, setCurrentData] = useState([])

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonth = current.toLocaleString('default', { month: 'long' })
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      //pushReportData(console.log('pushReportData called'))
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

      let allData = response.data

      // let allData = response.data.filter(
      //   (item) => item.month === previousMonth && item.year === '2023',
      // )

      // Set some cumulated value
      allData.forEach((item) => {
        item.avarageBCO = (item.schoolTotalNoBookBC / item.schoolTotalNoStudent).toFixed(2)
        item.percentStudentBCO = (
          (item.schoolTotalNoStudentBC * 100) /
          item.schoolTotalNoStudent
        ).toFixed(2)
        item.percentStudentBCI = (
          (item.schoolTotalNoStudentBCIn * 100) /
          item.schoolTotalNoStudent
        ).toFixed(2)
        item.percentGirlsBCO = ((item.schoolTotalNoGirlBC * 100) / item.schoolTotalNoGirl).toFixed(
          2,
        )
        item.percentBoysBCO = ((item.schoolTotalNoBoyBC * 100) / item.schoolTotalNoBoy).toFixed(2)
      })

      setCurrentData(allData)

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // const pushReportData = async () => {
  //   currentData = allBCOData.filter(
  //     (item) => new Date(item.createDate).getMonth() === new Date().getMonth(),
  //   )

  //   setReportData(currentData)
  // }

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
        {/* <CCard className="mb-4">
          <CCardHeader>
            <strong>Report</strong>
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
        </CCard> */}
        <CCard className="mb-4">
          <CCardHeader>
            <strong>
              Analysis By School
              {/* {previousMonthYear} */}
            </strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title=""
              columns={[
                //{ title: 'Sl', field: 'id' },
                { title: 'District', field: 'district' },
                { title: 'Upazilla', field: 'upazilla' },
                { title: 'Year', field: 'year' },
                { title: 'Month', field: 'month' },
                { title: 'School', field: 'school' },
                {
                  title: 'Total Student',
                  field: 'schoolTotalNoStudent',
                  filtering: false,
                  // cellStyle: {
                  //   backgroundColor: '#e0d0ca',
                  //   color: '#000',
                  // },
                  // headerStyle: {
                  //   backgroundColor: '#bcceeb',
                  // },
                },
                { title: 'Total BCO', field: 'schoolTotalNoBookBC', filtering: false },
                { title: 'Total BCI', field: 'schoolTotalNoBookBCIn', filtering: false },
                { title: 'Avarage BCO per Child', field: 'avarageBCO', filtering: false },
                {
                  title: '# of Students checked out Books',
                  field: 'schoolTotalNoStudentBC',
                  filtering: false,
                },
                {
                  title: '% of Students checked out Books',
                  field: 'percentStudentBCO',
                  filtering: false,
                },
                {
                  title: '# of Students checked in Books',
                  field: 'schoolTotalNoStudentBCIn',
                  filtering: false,
                },
                {
                  title: '% of Students checked in Books',
                  field: 'percentStudentBCI',
                  filtering: false,
                },

                { title: 'Respective LF', field: 'lfName' },
                { title: 'Respective LPO', field: 'lpoName' },
                { title: 'Visitor', field: 'visitor' },
              ]}
              options={{
                exportButton: true,
                exportAllData: true,
                grouping: true,
                sorting: true,
                search: true,
                paging: true,
                filtering: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 30],
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
              footerData={[{ school: '', schoolTotalNoStudent: 1000 }]}
              renderSummaryRow={({ column, data }) =>
                column.field === 'schoolTotalNoStudent'
                  ? {
                      value: data.reduce((agg, row) => agg + row.schoolTotalNoStudent, 0),
                      style: { background: 'red' },
                    }
                  : undefined
              }
              data={currentData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AnalysisBySchool
