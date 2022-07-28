import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const AllBCOCombined = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

  // Get previous month
  const current = new Date()
  current.setMonth(current.getMonth() - 2)
  const previousMonth = current.toLocaleString('default', { month: 'long', year: 'numeric' })

  // Cumulative Summary All BCO/I Data(School+CRF)
  // Report Data
  const [reportDataCombined, setReportDataCombined] = useState([])
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
  let kTotalStudent = 0
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
  // Cumulative Summary All BCO/I Data(School+CRF)

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllBookCheckoutSchool(console.log('get bookcheckout called'))
      pushReportDataCombined(console.log('pushReportData called'))
    }
    call()
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

      // Cumulative Summary All BCO/I Data(School+CRF)
      // Ukhiya
      uTotalStudent = response.data
        .filter(
          (item) =>
            item.upazilla === 'Ukhiya' &&
            new Date(item.date).getMonth() === new Date().getMonth() - 1,
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckout = response.data
        .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckin = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudent = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCO = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCI = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCI = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCO = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCO = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCO = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Ukhiya' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCO = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          new Date(item.date).getMonth() === new Date().getMonth() - 1,
      ).length

      uNoSchoolZeroBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Ukhiya' &&
          new Date(item.date).getMonth() === new Date().getMonth() - 1 &&
          item.schoolTotalNoStudentBC === 0,
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudent = response.data
        .filter(
          (item) =>
            item.upazilla === 'Kutubdia' &&
            new Date(item.date).getMonth() === new Date().getMonth() - 1,
        )
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckout = response.data
        .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckin = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudent = (
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              item.upazilla === 'Kutubdia' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCO = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCO = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCI = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCI = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCO = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCO = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCO = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCO = (
        (response.data
          .filter(
            (item) =>
              item.upazilla === 'Kutubdia' &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          new Date(item.date).getMonth() === new Date().getMonth() - 1,
      ).length

      kNoSchoolZeroBCO = response.data.filter(
        (item) =>
          item.upazilla === 'Kutubdia' &&
          new Date(item.date).getMonth() === new Date().getMonth() - 1 &&
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
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      cfoNoStudentBCI = kNoStudentBCI + uNoStudentBCI
      cfoPercentStudentBCI = (
        (response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
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
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter(
            (item) =>
              item.schoolTotalNoStudentBC !== 0 &&
              new Date(item.date).getMonth() === new Date().getMonth() - 1,
          )
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)
      cfoNoSchoolBCO = kNoSchoolBCO + uNoSchoolBCO
      cfoNoSchoolZeroBCO = kNoSchoolZeroBCO + uNoSchoolZeroBCO
      // CFO
      // Cumulative Summary All BCO/I Data(School+CRF)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }

  // Cumulative Summary All BCO/I Data(School+CRF)
  const pushReportDataCombined = () => {
    const reportObject = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
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
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI,
        ukhiya: uNoStudentBCI,
        cfo: cfoNoStudentBCI,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCI,
        ukhiya: uPercentStudentBCI,
        cfo: cfoPercentStudentBCI,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO,
        ukhiya: uNoGirlBCO,
        cfo: cfoNoGirlBCO,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCO,
        ukhiya: uPercentGirlBCO,
        cfo: cfoPercentGirlBCO,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO,
        ukhiya: uNoBoyBCO,
        cfo: cfoNoBoyBCO,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCO,
        ukhiya: uPercentBoyBCO,
        cfo: cfoPercentBoyBCO,
      },
      // {
      //   sl: 13,
      //   area: 'Number of School BCO',
      //   kutubdia: kNoSchoolBCO,
      //   ukhiya: uNoSchoolBCO,
      //   cfo: cfoNoSchoolBCO,
      // },
      // {
      //   sl: 14,
      //   area: 'Number of Zero BCO School ',
      //   kutubdia: kNoSchoolZeroBCO,
      //   ukhiya: uNoSchoolZeroBCO,
      //   cfo: cfoNoSchoolZeroBCO,
      // },
    ]
    console.log('reportObject', reportObject)
    setReportDataCombined(reportObject)
  }
  // Cumulative Summary All BCO/I Data(School+CRF)

  return (
    <CRow>
      {/* <CCol xs={12}>
        <DocsCallout name="Accordion" href="components/accordion" />
      </CCol> */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cumulative & Detail BCO/In</strong> <small>(Inforamtion)</small>
          </CCardHeader>
          <CCardBody>
            {/* <p className="text-medium-emphasis small">
              Add <code>alwaysOpen</code> property to make accordion items stay open when another
              item is opened.
            </p> */}

            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Cumulative Summary All BCO/I Combined Data(School+CRF)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  {/* <strong>This is the first item</strong> */}
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
                    data={reportDataCombined}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Summary BCO/I Data(School)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <strong>
                    <code>This is under construction</code>
                  </strong>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Summary BCO/I Data(CRF)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <strong>
                    <code>This is under construction</code>
                  </strong>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>Summary BCO/I Data(School) by Month</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <strong>
                    <code>This is under construction</code>
                  </strong>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>Summary BCO/I Data(CRF) by Month</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <strong>
                    <code>This is under construction</code>
                  </strong>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>BCO/I Detail Data(School)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  {/* <strong>This is the first item</strong> */}
                  <MaterialTable
                    title={allBCOData.length + ' BCO Data of School'}
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
              <CAccordionItem itemKey={7}>
                <CAccordionHeader>
                  <strong>BCO/I Detail Data(CRF)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <strong>
                    <code>This is under construction</code>
                  </strong>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Report(WFP)</strong>
          </CCardHeader>
          <CCardBody>
            <CButton color="primary" href="/bco/wfp-summarize">
              Summarize Report(School)
            </CButton>
            <CButton color="secondary" href="/bco/cfo-analysis">
              CFO Analysis Report(School)
            </CButton>
            <CButton color="success" href="/bco/ukhiya-report">
              Ukhiya Report(School)
            </CButton>
            <CButton color="warning" href="/bco/kutubdia-report">
              Kutubdia Report(School)
            </CButton>
          </CCardBody>
          <CCardBody>
            <CButton color="primary" href="#">
              Summarize Report(CRF)
            </CButton>
            <CButton color="secondary" href="#">
              CFO Analysis Report(CRF)
            </CButton>
            <CButton color="success" href="#">
              Ukhiya Report(CRF)
            </CButton>
            <CButton color="warning" href="#">
              Kutubdia Report(CRF)
            </CButton>
          </CCardBody>
        </CCard>

        {/* <CCard className="mb-4">
          <CCardHeader>
            <strong>ALL BCO Data</strong>
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
          </CCardBody>
        </CCard> */}
      </CCol>
    </CRow>
  )
}

export default AllBCOCombined
