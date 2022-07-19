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

const AllBCO = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

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
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')

    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
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
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>ALL BCO Data</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
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

                { title: 'Pre Primary Girl', field: 'priPrimaryGirl' },
                { title: 'Pre Primary Boy', field: 'priPrimaryBoy' },
                { title: 'Pre Primary Total', field: 'priPrimaryTotal' },

                { title: 'PP No Girl BCO', field: 'priPrimaryNoGirlBC' },
                { title: 'PP No Boy BCO', field: 'priPrimaryNoBoyBC' },
                { title: 'PP No Total BCO', field: 'priPrimaryNoTotalBC' },
              ]}
              actions={[
                {
                  icon: DeleteOutline,
                  tooltip: 'Delete BCO',
                  onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
                },
                {
                  icon: ViewColumn,
                  tooltip: 'View BCO',
                  onClick: (event, rowData) => alert('You want to delete ' + rowData.id),
                },
                {
                  icon: AddBox,
                  tooltip: 'Add BCO',
                  isFreeAction: true,
                  onClick: (event) => alert('You want to add a new row'),
                },
              ]}
              options={{
                exportButton: true,
                exportAllData: true,
                grouping: true,
                sorting: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 30],
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
            {/* <MDBDataTableV5
              autoWidth
              striped
              hover
              entriesOptions={[10, 15, 25]}
              entries={10}
              pagesAmount={4}
              data={{
                columns: [
                  {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc',
                    width: 15,
                  },

                  {
                    label: 'School',
                    field: 'school',
                    width: 100,
                  },
                  {
                    label: 'Visitor',
                    field: 'visitor',
                    width: 30,
                  },
                  {
                    label: 'Upazilla',
                    field: 'upazilla',
                    width: 20,
                  },
                  {
                    label: '#Visit',
                    field: 'visitNo',
                    sort: 'disabled',
                    width: 5,
                  },
                  {
                    label: 'LPO',
                    field: 'lpo',
                    sort: 'disabled',
                    width: 30,
                  },
                  {
                    label: 'LF',
                    field: 'lf',
                    sort: 'disabled',
                    width: 30,
                  },
                  {
                    label: '#Students',
                    field: 'schoolTotalNoStudent',
                    sort: 'disabled',
                    width: 10,
                  },
                  {
                    label: '#Students BCO',
                    field: 'schoolTotalNoStudentBC',
                    sort: 'disabled',
                    width: 10,
                  },
                  {
                    label: '#Book BCO',
                    field: 'schoolTotalNoBookBC',
                    sort: 'disabled',
                    width: 10,
                  },
                  {
                    label: 'Action',
                    field: '',
                    sort: '',
                    width: 10,
                  },
                  {
                    label: 'Action',
                    field: '',
                    sort: '',
                    width: 10,
                  },
                  {
                    label: 'Action',
                    field: '',
                    sort: '',
                    width: 10,
                  },
                  {
                    label: 'Action',
                    field: '',
                    sort: '',
                    width: 10,
                  },
                ],
                rows: allBCOData,
              }}
            /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllBCO
