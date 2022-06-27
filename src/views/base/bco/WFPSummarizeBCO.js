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
  let uTotalStudent = 0
  let uTotalBookCheckout = 0
  let uTotalBookCheckin = 0
  let uNoBCOPerStudent = 0
  let uNoStudentBCO = 0
  let uPercentStudentBCO = 0
  let uNoStudentBCI = 0
  let uPercentStudentBCI = 0
  let uNoGirlBCO = 0
  let uPercentGirlBCO = 0
  let uNoBoyBCO = 0
  let uPercentBoyBCO = 0
  let uNoSchoolBCO = 0
  let uNoSchoolZeroBCO = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudent = 1
  let kTotalBookCheckout = 0
  let kTotalBookCheckin = 0
  let kNoBCOPerStudent = 0
  let kNoStudentBCO = 0
  let kPercentStudentBCO = 0
  let kNoStudentBCI = 0
  let kPercentStudentBCI = 0
  let kNoGirlBCO = 0
  let kPercentGirlBCO = 0
  let kNoBoyBCO = 0
  let kPercentBoyBCO = 0
  let kNoSchoolBCO = 0
  let kNoSchoolZeroBCO = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudent = 0
  let cfoTotalBookCheckout = 0
  let cfoTotalBookCheckin = 0
  let cfoNoBCOPerStudent = 0
  let cfoNoStudentBCO = 0
  let cfoPercentStudentBCO = 0
  let cfoNoStudentBCI = 0
  let cfoPercentStudentBCI = 0
  let cfoNoGirlBCO = 0
  let cfoPercentGirlBCO = 0
  let cfoNoBoyBCO = 0
  let cfoPercentBoyBCO = 0
  let cfoNoSchoolBCO = 0
  let cfoNoSchoolZeroBCO = 0
  // CFO Data

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      pushReportData(console.log('pushReportData called'))
    }
    call()
    //getSummerizeData(console.log('getSummerizeData called'))
  }, [])

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
            item.upazilla === 'Ukhiya' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        ),
      )
      setKutubdiaReportData(
        response.data.filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        ),
      )
      // console.log('Ukhiya Data Length: ' + ukhiyaReportData.length)
      // console.log('Kutubdia Data Length: ' + kutubdiaReportData.length)

      // Ukhiya
      uTotalStudent = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckout = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC != 0 &&
            item.upazilla === 'Ukhiya' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
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
          })
      ).toFixed(2)

      uNoStudentBCO = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
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
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC != 0 &&
          item.upazilla === 'Ukhiya' &&
          new Date(item.createDate).getMonth() === new Date().getMonth(),
      ).length

      uNoSchoolZeroBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Ukhiya' &&
          new Date(item.createDate).getMonth() === new Date().getMonth() &&
          item.schoolTotalNoStudentBC === 0,
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckout = response.data
        .filter(
          (item) =>
            item.schoolTotalNoStudentBC != 0 &&
            item.upazilla === 'Kutubdia' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCO = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.createDate).getMonth() === new Date().getMonth(),
        )
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          new Date(item.createDate).getMonth() === new Date().getMonth(),
      ).length

      kNoSchoolZeroBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          new Date(item.createDate).getMonth() === new Date().getMonth() &&
          item.schoolTotalNoStudentBC === 0,
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent = kTotalStudent + uTotalStudent
      cfoTotalBookCheckout = kTotalBookCheckout + uTotalBookCheckout
      cfoTotalBookCheckin = kTotalBookCheckin + uTotalBookCheckin
      cfoNoBCOPerStudent = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)
      cfoNoStudentBCO = kNoStudentBCO + uNoStudentBCO
      cfoPercentStudentBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)
      cfoNoGirlBCO = kNoGirlBCO + uNoGirlBCO
      cfoPercentGirlBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)
      cfoNoBoyBCO = kNoBoyBCO + uNoBoyBCO
      cfoPercentBoyBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC != 0 &&
              new Date(item.createDate).getMonth() === new Date().getMonth(),
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)
      cfoNoSchoolBCO = kNoSchoolBCO + uNoSchoolBCO
      cfoNoSchoolZeroBCO = kNoSchoolZeroBCO + uNoSchoolZeroBCO
      // CFO

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const pushReportData = () => {
    const reportObject = [
      {
        sl: 1,
        area: 'Total Students( PriPraimary - 5)',
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
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudent,
        ukhiya: uNoBCOPerStudent,
        cfo: cfoNoBCOPerStudent,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
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
    ]
    console.log('reportObject', reportObject)
    setReportData(reportObject)
  }

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

      // setUTotalStudent(
      //   ukhiyaReportData
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }),
      // )

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
            <strong>WFP Summarize Report For Current Month</strong>
            {/* <strong>{allBCOData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title={''}
              // title={JSON.stringify(reportData)}
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default WFPSummarizeBCO