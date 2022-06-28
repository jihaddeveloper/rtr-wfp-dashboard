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

const CFOAnalysisBCO = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Report Data
  const [reportData, setReportData] = useState([])

  const [allBCOData, setAllBCOData] = useState([])

  const [checkbox1, setCheckbox1] = React.useState('')

  let [currentData, setCurrentData] = useState([])

  // Get previous month
  const current = new Date()
  current.setMonth(current.getMonth() - 1)
  const previousMonth = current.toLocaleString('default', { month: 'long', year: 'numeric' })

  const showLogs2 = (e) => {
    setCheckbox1(e)
  }

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

      let allData = response.data.filter(
        (item) => new Date(item.createDate).getMonth() === new Date().getMonth(),
      )

      // Set some cumulated value
      allData.forEach((item) => {
        item.avarageBCO = (item.schoolTotalNoStudentBC / item.schoolTotalNoStudent).toFixed(2)
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

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
    //pushReportData(console.log('pushReportData called'))
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
            <strong>
              CFO Analysis Data For_
              {previousMonth}
            </strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title=""
              columns={[
                //{ title: 'Sl', field: 'id' },
                { title: 'Name of School', field: 'school' },
                { title: 'Total Student', field: 'schoolTotalNoStudent' },
                { title: 'Total Girls', field: 'schoolTotalNoGirl' },
                { title: 'Total Boys', field: 'schoolTotalNoBoy' },
                { title: 'Total BCO', field: 'schoolTotalNoStudentBC' },
                { title: 'Total BCI', field: 'schoolTotalNoStudentBCIn' },
                { title: 'Avarage BCO per Child', field: 'avarageBCO' },
                { title: '# of Students checked out Books', field: 'schoolTotalNoStudentBC' },
                { title: '% of Students checked out Books', field: 'percentStudentBCO' },
                { title: '# of Students checked in Books', field: 'schoolTotalNoStudentBCIn' },
                { title: '% of Students checked in Books', field: 'percentStudentBCI' },
                { title: '# of Girls checkedbout books', field: 'schoolTotalNoGirlBC' },
                { title: '% of Girls checked out books', field: 'percentGirlsBCO' },
                { title: '# of Boys checkedbout books', field: 'schoolTotalNoBoyBC' },
                { title: '% of Boys checked out books', field: 'percentBoysBCO' },
                { title: '# of  Total Special Child', field: 'schoolTotalNoSpStudent' },
                { title: '# of BCO by Special Child', field: 'schoolTotalNoSpStudentBC' },
                { title: 'Respective LF', field: 'lf' },
                { title: 'Respective LF', field: 'lpo' },
              ]}
              options={{
                exportButton: true,
                exportAllData: true,
                grouping: false,
                sorting: false,
                search: false,
                paging: false,
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
              data={currentData}
              footerData={[{ school: '', schoolTotalNoStudent: 1000 }]}
              renderSummaryRow={({ column, data }) =>
                column.field === 'schoolTotalNoStudent'
                  ? {
                      value: data.reduce((agg, row) => agg + row.schoolTotalNoStudent, 0),
                      style: { background: 'red' },
                    }
                  : undefined
              }
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CFOAnalysisBCO
