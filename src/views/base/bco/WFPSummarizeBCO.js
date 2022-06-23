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

const WFPSummarizeBCO = () => {
  const [isLoading, setIsLoading] = useState(false)

  // Report Data
  const [reportData, setReportData] = useState([])
  // data state to store the BCO API data. Its initial value is an empty array
  const [allBCOData, setAllBCOData] = useState([])

  // Report Data Ukhiya
  const [ukhiyaReportData, setUkhiyaReportData] = useState([])
  // Report Data Kutubdia
  const [kutubdiaReportData, setKutubdiaReportData] = useState([])

  // Ukhiya Data
  const [uTotalStudent, setUTotalStudent] = useState(0)
  const [uTotalBookCheckout, setUTotalBookCheckout] = useState(0)
  const [uTotalBookCheckin, setUTotalBookCheckin] = useState(0)
  const [uNoBCOPerStudent, setUNoBCOPerStudent] = useState(0)
  const [uNoStudentBCO, setUNoStudentBCO] = useState(0)
  const [uPercentStudentBCO, setUPercentStudentBCO] = useState(0)
  const [uNoGirlBCO, setUNoGirlBCO] = useState(0)
  const [uPercentGirlBCO, setUPercentGirlBCO] = useState(0)
  const [uNoBoyBCO, setUNoBoyBCO] = useState(0)
  const [uPercentBoyBCO, setUPercentBoyBCO] = useState(0)
  const [uNoSchoolBCO, setUNoSchoolBCO] = useState(0)
  const [uNoSchoolZeroBCO, setUNoSchoolZeroBCO] = useState(0)
  // Ukhiya Data

  // Kutudbia Data
  const [kTotalStudent, setKTotalStudent] = useState(1200)
  const [kTotalBookCheckout, setKTotalBookCheckout] = useState(0)
  const [kTotalBookCheckin, setKTotalBookCheckin] = useState(0)
  const [kNoBCOPerStudent, SetKNoBCOPerStudent] = useState(0)
  const [kNoStudentBCO, setKNoStudentBCO] = useState(0)
  const [kPercentStudentBCO, setKPercentStudentBCO] = useState(0)
  const [kNoGirlBCO, setKNoGirlBCO] = useState(0)
  const [kPercentGirlBCO, setKPercentGirlBCO] = useState(0)
  const [kNoBoyBCO, setKNoBoyBCO] = useState(0)
  const [kPercentBoyBCO, setKPercentBoyBCO] = useState(0)
  const [kNoSchoolBCO, setKNoSchoolBCO] = useState(0)
  const [kNoSchoolZeroBCO, setKNoSchoolZeroBCO] = useState(0)
  // Kutudbia Data

  // CFO Data
  const cfoTotalStudent = kTotalStudent + uTotalStudent
  const cfoTotalBookCheckout = kTotalBookCheckout + uTotalBookCheckout
  const cfoTotalBookCheckin = kTotalBookCheckin + uTotalBookCheckin
  const cfoNoBCOPerStudent = kNoBCOPerStudent + uNoBCOPerStudent
  const cfoNoStudentBCO = kNoStudentBCO + uNoStudentBCO
  const cfoPercentStudentBCO = kPercentStudentBCO + uPercentStudentBCO
  const cfoNoGirlBCO = kNoGirlBCO + uNoGirlBCO
  const cfoPercentGirlBCO = kPercentGirlBCO + uPercentGirlBCO
  const cfoNoBoyBCO = kNoBoyBCO + uNoBoyBCO
  const cfoPercentBoyBCO = kPercentBoyBCO + uPercentBoyBCO
  const cfoNoSchoolBCO = kNoSchoolBCO + uNoSchoolBCO
  const cfoNoSchoolZeroBCO = kNoSchoolZeroBCO + uNoSchoolZeroBCO
  // CFO Data

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
      setUkhiyaReportData(
        response.data.filter(
          (item) =>
            item.upazilla === 'Ukhiya' && new Date(item.date).getMonth() === new Date().getMonth(),
        ),
      )
      setKutubdiaReportData(
        response.data.filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.date).getMonth() === new Date().getMonth(),
        ),
      )
      // console.log('Ukhiya Data Length: ' + ukhiyaReportData.length)
      // console.log('Kutubdia Data Length: ' + kutubdiaReportData.length)

      setUTotalStudent(
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          }),
      )

      setUTotalBookCheckout(
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }),
      )

      setUTotalBookCheckin(
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }),
      )

      setUNoBCOPerStudent(
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
          response.data
            .filter(
              (item) =>
                item.upazilla === 'Ukhiya' &&
                new Date(item.date).getMonth() === new Date().getMonth(),
            )
            .map((ureportdata) => ureportdata.schoolTotalNoStudent)
            .reduce(function (acc, value) {
              return acc + value
            }),
      )

      setUNoStudentBCO(
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }),
      )

      setUPercentStudentBCO(
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
          response.data
            .filter(
              (item) =>
                item.upazilla === 'Ukhiya' &&
                new Date(item.date).getMonth() === new Date().getMonth(),
            )
            .map((ureportdata) => ureportdata.schoolTotalNoStudent)
            .reduce(function (acc, value) {
              return acc + value
            }),
      )

      setUNoGirlBCO(
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.priPrimaryNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }),
      )

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const pushReportData = async () => {
    setReportData([
      {
        sl: 1,
        area: 'Total Students(Grade 1-5)',
        kutubdia: kTotalStudent,
        ukhiya: uTotalStudent,
        cfo: cfoTotalStudent,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckout,
        ukhiya: uTotalBookCheckout,
        cfo: cfoTotalBookCheckout,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin,
        ukhiya: uTotalBookCheckin,
        cfo: cfoTotalBookCheckin,
      },
      {
        sl: 4,
        area: 'Number of BCO happend per student',
        kutubdia: kNoBCOPerStudent,
        ukhiya: uNoBCOPerStudent,
        cfo: cfoNoBCOPerStudent,
      },
      {
        sl: 5,
        area: 'Number of Students checked out books',
        kutubdia: kNoStudentBCO,
        ukhiya: uNoStudentBCO,
        cfo: cfoNoStudentBCO,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCO,
        ukhiya: uPercentStudentBCO,
        cfo: cfoPercentStudentBCO,
      },
      {
        sl: 7,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO,
        ukhiya: uNoGirlBCO,
        cfo: cfoNoGirlBCO,
      },
      {
        sl: 8,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO,
        ukhiya: uPercentGirlBCO,
        cfo: cfoPercentGirlBCO,
      },
      {
        sl: 9,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO,
        ukhiya: uNoBoyBCO,
        cfo: cfoNoBoyBCO,
      },
      {
        sl: 10,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO,
        ukhiya: uPercentBoyBCO,
        cfo: cfoPercentBoyBCO,
      },
      {
        sl: 11,
        area: 'Number of School BCO',
        kutubdia: kNoSchoolBCO,
        ukhiya: uNoSchoolBCO,
        cfo: cfoNoSchoolBCO,
      },
      {
        sl: 12,
        area: 'Number of Zero BCO School ',
        kutubdia: kNoSchoolZeroBCO,
        ukhiya: uNoSchoolZeroBCO,
        cfo: cfoNoSchoolZeroBCO,
      },
    ])
  }

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
    pushReportData(console.log('pushReportData called'))

    //getSummerizeData(console.log('getSummerizeData called'))
  }, [])

  console.log('Ukhiya total student: ' + uTotalStudent)

  const getSummerizeData = async () => {
    getAllBookCheckoutSchool()
    if (allBCOData.length > 0) {
      const ukhiyaReportData = allBCOData.filter(
        (item) =>
          item.upazilla === 'Ukhiya' && new Date(item.date).getMonth() === new Date().getMonth(),
      )

      // Generate current month repoort for Ukhiye
      const kutubdiaReportData = allBCOData.filter(
        (item) =>
          item.upazilla === 'Kutubdia' && new Date(item.date).getMonth() === new Date().getMonth(),
      )

      setUTotalStudent(
        ukhiyaReportData
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          }),
      )

      const abc = ukhiyaReportData
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      // console.log('Ukhiya Data Length: ' + ukhiyaReportData.length)
      // console.log('Kutubdia Data Length: ' + kutubdiaReportData.length)
      // console.log('Ukhiya total student: ' + abc)
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
            <strong>WFP Summarize Report</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title=""
              columns={[
                { title: 'Sl', field: 'sl' },
                { title: 'Particular Area', field: 'area' },
                { title: 'Kutubdia', field: 'kutubdia' },
                { title: 'Ukhiya', field: 'ukhiya' },
                { title: 'CFO', field: 'cfo' },
              ]}
              options={{
                exportButton: true,
                exportAllData: true,
                grouping: false,
                sorting: false,
                search: false,
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WFPSummarizeBCO
