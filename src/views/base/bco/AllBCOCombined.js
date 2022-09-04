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
  CFormSelect,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import MaterialTable from 'material-table'

const AllBCOCombined = () => {
  const options = [
    { value: '', text: 'Choose a month first' },
    { value: 'January', text: 'January' },
    { value: 'February', text: 'February' },
    { value: 'March', text: 'March' },
    { value: 'April', text: 'April' },
    { value: 'May', text: 'May' },
    { value: 'June', text: 'June' },
    { value: 'July', text: 'July' },
    { value: 'August', text: 'August' },
    { value: 'September', text: 'September' },
    { value: 'October', text: 'October' },
    { value: 'November', text: 'November' },
    { value: 'December', text: 'December' },
    { value: 'apple', text: 'Apple 🍏' },
    { value: 'banana', text: 'Banana 🍌' },
    { value: 'kiwi', text: 'Kiwi 🥝' },
  ]

  const [selectedMonth, setSelectedMonth] = useState(options[0].value)

  const handleChange = (event) => {
    console.log(event.target.value)
    setSelectedMonth(event.target.value)
  }

  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // ALL BCO School
  const [allBCOData, setAllBCOData] = useState([])
  // ALL BCO School

  const [allBCODataSchoolByMonth, setAllBCODataSchoolByMonth] = useState([])

  const [allBCODataCRFByMonth, setAllBCODataCRFByMonth] = useState([])

  // ALL BCO CRF
  const [allBCODataCRF, setAllBCODataCRF] = useState([])
  // ALL BCO CRF

  // Area wise BCO data school
  const [kutubdiaAllBCOSchool, setKutubdiaAllBCOSchool] = useState([])
  const [ukhiyaAllBCOSchool, setUkhiyaAllBCOSchool] = useState([])
  // Area wise BCO data school

  // Area wise BCO data crf
  const [kutubdiaAllBCOCRF, setKutubdiaAllBCOCRF] = useState([])
  const [ukhiyaAllBCOCRF, setUkhiyaAllBCOCRF] = useState([])
  // Area wise BCO data crf

  // Get previous month
  const current = new Date()
  const currentMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const currentMonth = current.toLocaleString('default', { month: 'long' })
  current.setMonth(current.getMonth() - 1)
  const previousMonthYear = current.toLocaleString('default', { month: 'long', year: 'numeric' })
  const previousMonth = current.toLocaleString('default', { month: 'long' })

  // Cumulative Summary All BCO/I Data(School+CRF)
  // Report Data
  const [reportDataCombined, setReportDataCombined] = useState([])
  const [reportDataSchool, setReportDataSchool] = useState([])
  const [reportDataCRF, setReportDataCRF] = useState([])

  //School Data
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
  //School Data

  // CRF Data
  // Ukhiya Data
  let uTotalStudentCRF = 0
  let uTotalBookCheckoutCRF = 0
  let uTotalBookCheckinCRF = 0
  let uNoBCOPerStudentCRF = 0
  let uNoStudentBCOCRF = 0
  let uPercentStudentBCOCRF = 0
  let uNoStudentBCICRF = 0
  let uPercentStudentBCICRF = 0
  let uNoGirlBCOCRF = 0
  let uPercentGirlBCOCRF = 0
  let uNoBoyBCOCRF = 0
  let uPercentBoyBCOCRF = 0
  let uNoSchoolBCOCRF = 0
  let uNoSchoolZeroBCOCRF = 0
  // Ukhiya Data

  // Kutudbia Data
  let kTotalStudentCRF = 0
  let kTotalBookCheckoutCRF = 0
  let kTotalBookCheckinCRF = 0
  let kNoBCOPerStudentCRF = 0
  let kNoStudentBCOCRF = 0
  let kPercentStudentBCOCRF = 0
  let kNoStudentBCICRF = 0
  let kPercentStudentBCICRF = 0
  let kNoGirlBCOCRF = 0
  let kPercentGirlBCOCRF = 0
  let kNoBoyBCOCRF = 0
  let kPercentBoyBCOCRF = 0
  let kNoSchoolBCOCRF = 0
  let kNoSchoolZeroBCOCRF = 0
  // Kutudbia Data

  // CFO Data
  let cfoTotalStudentCRF = 0
  let cfoTotalBookCheckoutCRF = 0
  let cfoTotalBookCheckinCRF = 0
  let cfoNoBCOPerStudentCRF = 0
  let cfoNoStudentBCOCRF = 0
  let cfoPercentStudentBCOCRF = 0
  let cfoNoStudentBCICRF = 0
  let cfoPercentStudentBCICRF = 0
  let cfoNoGirlBCOCRF = 0
  let cfoPercentGirlBCOCRF = 0
  let cfoNoBoyBCOCRF = 0
  let cfoPercentBoyBCOCRF = 0
  let cfoNoSchoolBCOCRF = 0
  let cfoNoSchoolZeroBCOCRF = 0
  // CFO Data
  // CRF Data

  // Cumulative Summary All BCO/I Data(School+CRF)

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      setIsLoading(true)
      await getAllBookCheckoutSchool(console.log('get bookcheckout School called'))
      await getAllBookCheckoutCRF(console.log('get bookcheckout School called'))
      pushReportDataCombined(console.log('pushReportData called'))
      pushReportDataSchool()
      pushReportDataCRF()
      setIsLoading(false)
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Book-checkout Data for CRF
  const getAllBookCheckoutCRF = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/book-checkout-community', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBCODataCRF(response.data)

      setAllBCODataCRFByMonth(response.data.filter((item) => item.month === previousMonth))

      setKutubdiaAllBCOCRF(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaAllBCOCRF(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      // Ukhiya
      uTotalStudentCRF = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckoutCRF = response.data
        .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uTotalBookCheckinCRF = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uNoBCOPerStudentCRF = (
        response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCOCRF = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCOCRF = (
        (response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoStudentBCICRF = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentStudentBCICRF = (
        (response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoGirlBCOCRF = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentGirlBCOCRF = (
        (response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoBoyBCOCRF = response.data
        .filter((item) => item.upazilla === 'Ukhiya')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      uPercentBoyBCOCRF = (
        (response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      uNoSchoolBCOCRF = response.data.filter(
        (item) =>
          item.schoolTotalNoStudentBC !== 0 &&
          item.upazilla === 'Ukhiya' &&
          new Date(item.date).getMonth() === new Date().getMonth() - 1,
      ).length

      uNoSchoolZeroBCOCRF = response.data.filter(
        (item) =>
          item.upazilla === 'Ukhiya' &&
          new Date(item.date).getMonth() === new Date().getMonth() - 1 &&
          item.schoolTotalNoStudentBC === 0,
      ).length
      // Ukhiya

      //Kutubdia
      kTotalStudentCRF = response.data
        .filter((item) => item.upazilla === 'Kutubdia' && item.month === 'June')
        .map((ureportdata) => ureportdata.schoolTotalNoStudent)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckoutCRF = response.data
        .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kTotalBookCheckinCRF = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoBookBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kNoBCOPerStudentCRF = (
        response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCOCRF = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCOCRF = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoStudentBCICRF = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentStudentBCICRF = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoStudent)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoGirlBCOCRF = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentGirlBCOCRF = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoGirl)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoBoyBCOCRF = response.data
        .filter((item) => item.upazilla === 'Kutubdia')
        .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
        .reduce(function (acc, value) {
          return acc + value
        })

      kPercentBoyBCOCRF = (
        (response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCOCRF = response.data.filter((item) => item.upazilla === 'Kutubdia').length

      kNoSchoolZeroBCOCRF = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.schoolTotalNoStudentBC === 0,
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudentCRF = kTotalStudentCRF + uTotalStudentCRF
      cfoTotalBookCheckoutCRF = kTotalBookCheckoutCRF + uTotalBookCheckoutCRF
      cfoTotalBookCheckinCRF = kTotalBookCheckinCRF + uTotalBookCheckinCRF
      cfoNoBCOPerStudentCRF = (
        (parseFloat(uNoBCOPerStudentCRF) + parseFloat(kNoBCOPerStudentCRF)) /
        2
      ).toFixed(2)
      //   (
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
      cfoNoStudentBCOCRF = kNoStudentBCOCRF + uNoStudentBCOCRF
      cfoPercentStudentBCOCRF = (
        (parseFloat(uPercentStudentBCOCRF) + parseFloat(kPercentStudentBCOCRF)) /
        2
      ).toFixed(2)
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      cfoNoStudentBCICRF = kNoStudentBCICRF + uNoStudentBCICRF
      cfoPercentStudentBCICRF = (
        (parseFloat(uPercentStudentBCICRF) + parseFloat(kPercentStudentBCICRF)) /
        2
      ).toFixed(2)
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
      cfoNoGirlBCOCRF = kNoGirlBCOCRF + uNoGirlBCOCRF
      cfoPercentGirlBCOCRF = (
        (parseFloat(uPercentGirlBCOCRF) + parseFloat(kPercentGirlBCOCRF)) /
        2
      ).toFixed(2)
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirl)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
      cfoNoBoyBCOCRF = kNoBoyBCOCRF + uNoBoyBCOCRF
      cfoPercentBoyBCOCRF = (
        (parseFloat(uPercentBoyBCOCRF) + parseFloat(kPercentBoyBCOCRF)) /
        2
      ).toFixed(2)
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoy)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
      cfoNoSchoolBCOCRF = kNoSchoolBCOCRF + uNoSchoolBCOCRF
      cfoNoSchoolZeroBCOCRF = kNoSchoolZeroBCOCRF + uNoSchoolZeroBCOCRF

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Book-checkout Data for CRF

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

      setAllBCODataSchoolByMonth(response.data.filter((item) => item.month === selectedMonth))

      setKutubdiaAllBCOSchool(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaAllBCOSchool(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      // Cumulative Summary All BCO/I Data(School+CRF)
      // Ukhiya
      uTotalStudent = response.data
        .filter((item) => item.upazilla === 'Ukhiya' && item.month === 'April')
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
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
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
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
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
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
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
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
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
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Ukhiya')
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Ukhiya')
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
        .filter((item) => item.upazilla === 'Kutubdia' && item.month === 'April')
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
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
          .reduce(function (acc, value) {
            return acc + value
          }) /
        response.data
          .filter((item) => item.schoolTotalNoStudentBC !== 0 && item.upazilla === 'Kutubdia')
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
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
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
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
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
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
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
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
          .reduce(function (acc, value) {
            return acc + value
          }) *
          100) /
        response.data
          .filter((item) => item.upazilla === 'Kutubdia')
          .map((ureportdata) => ureportdata.schoolTotalNoBoy)
          .reduce(function (acc, value) {
            return acc + value
          })
      ).toFixed(2)

      kNoSchoolBCO = response.data.filter((item) => item.upazilla === 'Kutubdia').length

      kNoSchoolZeroBCO = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.schoolTotalNoStudentBC === 0,
      ).length
      //Kutubdia

      // CFO
      cfoTotalStudent = kTotalStudent + uTotalStudent
      cfoTotalBookCheckout = kTotalBookCheckout + uTotalBookCheckout
      cfoTotalBookCheckin = kTotalBookCheckin + uTotalBookCheckin
      cfoNoBCOPerStudent = (
        (parseFloat(uNoBCOPerStudent) + parseFloat(kNoBCOPerStudent)) /
        2
      ).toFixed(2)
      //   (
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoBookBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
      cfoNoStudentBCO = kNoStudentBCO + uNoStudentBCO
      cfoPercentStudentBCO = (
        (parseFloat(uPercentStudentBCO) + parseFloat(kPercentStudentBCO)) /
        2
      ).toFixed(2)
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)

      cfoNoStudentBCI = kNoStudentBCI + uNoStudentBCI
      cfoPercentStudentBCI = (
        (parseFloat(uPercentStudentBCI) + parseFloat(kPercentStudentBCI)) /
        2
      ).toFixed(2)
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudentBCIn)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoStudent)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
      cfoNoGirlBCO = kNoGirlBCO + uNoGirlBCO
      cfoPercentGirlBCO = ((parseFloat(uPercentGirlBCO) + parseFloat(kPercentGirlBCO)) / 2).toFixed(
        2,
      )
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirlBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoGirl)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
      cfoNoBoyBCO = kNoBoyBCO + uNoBoyBCO
      cfoPercentBoyBCO = ((parseFloat(uPercentBoyBCO) + parseFloat(kPercentBoyBCO)) / 2).toFixed(2)
      //   (
      //   (response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoyBC)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     }) *
      //     100) /
      //   response.data
      //     .filter((item) => item.schoolTotalNoStudentBC !== 0)
      //     .map((ureportdata) => ureportdata.schoolTotalNoBoy)
      //     .reduce(function (acc, value) {
      //       return acc + value
      //     })
      // ).toFixed(2)
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
        kutubdia: kTotalBookCheckout + kTotalBookCheckoutCRF,
        ukhiya: uTotalBookCheckout + uTotalBookCheckoutCRF,
        cfo: cfoTotalBookCheckout + cfoTotalBookCheckoutCRF,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckin + kTotalBookCheckinCRF,
        ukhiya: uTotalBookCheckin + uTotalBookCheckinCRF,
        cfo: cfoTotalBookCheckin + cfoTotalBookCheckinCRF,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: ((parseFloat(kNoBCOPerStudent) + parseFloat(kNoBCOPerStudentCRF)) / 2).toFixed(2),
        ukhiya: ((parseFloat(uNoBCOPerStudent) + parseFloat(uNoBCOPerStudentCRF)) / 2).toFixed(2),
        cfo: (
          (parseFloat(
            ((parseFloat(kNoBCOPerStudent) + parseFloat(kNoBCOPerStudentCRF)) / 2).toFixed(2),
          ) +
            parseFloat(
              ((parseFloat(uNoBCOPerStudent) + parseFloat(uNoBCOPerStudentCRF)) / 2).toFixed(2),
            )) /
          2
        ).toFixed(2),
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCO + kNoStudentBCOCRF,
        ukhiya: uNoStudentBCO + uNoStudentBCOCRF,
        cfo: cfoNoStudentBCO + cfoNoStudentBCOCRF,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: (
          (parseFloat(kPercentStudentBCO) + parseFloat(kPercentStudentBCOCRF)) /
          2
        ).toFixed(2),
        ukhiya: ((parseFloat(uPercentStudentBCO) + parseFloat(uPercentStudentBCOCRF)) / 2).toFixed(
          2,
        ),
        cfo: (
          (parseFloat(
            ((parseFloat(kPercentStudentBCO) + parseFloat(kPercentStudentBCOCRF)) / 2).toFixed(2),
          ) +
            parseFloat(
              ((parseFloat(uPercentStudentBCO) + parseFloat(uPercentStudentBCOCRF)) / 2).toFixed(2),
            )) /
          2
        ).toFixed(2),
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCI + kNoStudentBCICRF,
        ukhiya: uNoStudentBCI + uNoStudentBCICRF,
        cfo: cfoNoStudentBCI + cfoNoStudentBCICRF,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: (
          (parseFloat(kPercentStudentBCI) + parseFloat(kPercentStudentBCICRF)) /
          2
        ).toFixed(2),
        ukhiya: ((parseFloat(uPercentStudentBCI) + parseFloat(uPercentStudentBCICRF)) / 2).toFixed(
          2,
        ),
        cfo: (
          (parseFloat(
            ((parseFloat(kPercentStudentBCI) + parseFloat(kPercentStudentBCICRF)) / 2).toFixed(2),
          ) +
            parseFloat(
              ((parseFloat(uPercentStudentBCI) + parseFloat(uPercentStudentBCICRF)) / 2).toFixed(2),
            )) /
          2
        ).toFixed(2),
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCO + kNoGirlBCOCRF,
        ukhiya: uNoGirlBCO + uNoGirlBCOCRF,
        cfo: cfoNoGirlBCO + cfoNoGirlBCOCRF,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: ((parseFloat(kPercentGirlBCO) + parseFloat(kPercentGirlBCOCRF)) / 2).toFixed(2),
        ukhiya: ((parseFloat(uPercentGirlBCO) + parseFloat(uPercentGirlBCOCRF)) / 2).toFixed(2),
        cfo: (
          (parseFloat(
            ((parseFloat(kPercentGirlBCO) + parseFloat(kPercentGirlBCOCRF)) / 2).toFixed(2),
          ) +
            parseFloat(
              ((parseFloat(uPercentGirlBCO) + parseFloat(uPercentGirlBCOCRF)) / 2).toFixed(2),
            )) /
          2
        ).toFixed(2),
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCO + kNoBoyBCOCRF,
        ukhiya: uNoBoyBCO + uNoBoyBCOCRF,
        cfo: cfoNoBoyBCO + cfoNoBoyBCOCRF,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: ((parseFloat(kPercentBoyBCO) + parseFloat(kPercentBoyBCOCRF)) / 2).toFixed(2),
        ukhiya: ((parseFloat(uPercentBoyBCO) + parseFloat(uPercentBoyBCOCRF)) / 2).toFixed(2),
        cfo: (
          (parseFloat(
            ((parseFloat(kPercentBoyBCO) + parseFloat(kPercentBoyBCOCRF)) / 2).toFixed(2),
          ) +
            parseFloat(
              ((parseFloat(uPercentBoyBCO) + parseFloat(uPercentBoyBCOCRF)) / 2).toFixed(2),
            )) /
          2
        ).toFixed(2),
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

  // Summary Data School
  const pushReportDataSchool = () => {
    const reportObjectSchool = [
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
    console.log('reportObjectSchool', reportObjectSchool)
    setReportDataSchool(reportObjectSchool)
  }
  // Summary Data School

  // Summary Data CRF
  const pushReportDataCRF = () => {
    const reportObjectCRF = [
      {
        sl: 1,
        area: 'Total Students( 1 - 5)',
        kutubdia: kTotalStudentCRF,
        ukhiya: uTotalStudentCRF,
        cfo: cfoTotalStudentCRF,
      },
      {
        sl: 2,
        area: 'Total Book Check Out',
        kutubdia: kTotalBookCheckoutCRF,
        ukhiya: uTotalBookCheckoutCRF,
        cfo: cfoTotalBookCheckoutCRF,
      },
      {
        sl: 3,
        area: 'Total Book Check In',
        kutubdia: kTotalBookCheckinCRF,
        ukhiya: uTotalBookCheckinCRF,
        cfo: cfoTotalBookCheckinCRF,
      },
      {
        sl: 4,
        area: 'Average Books Read by Per Child',
        kutubdia: kNoBCOPerStudentCRF,
        ukhiya: uNoBCOPerStudentCRF,
        cfo: cfoNoBCOPerStudentCRF,
      },
      {
        sl: 5,
        area: '# of Students checked out books',
        kutubdia: kNoStudentBCOCRF,
        ukhiya: uNoStudentBCOCRF,
        cfo: cfoNoStudentBCOCRF,
      },
      {
        sl: 6,
        area: '% of Students checked out books',
        kutubdia: kPercentStudentBCOCRF,
        ukhiya: uPercentStudentBCOCRF,
        cfo: cfoPercentStudentBCOCRF,
      },
      {
        sl: 7,
        area: '# of Students checked in books',
        kutubdia: kNoStudentBCICRF,
        ukhiya: uNoStudentBCICRF,
        cfo: cfoNoStudentBCICRF,
      },
      {
        sl: 8,
        area: '% of Students checked in books',
        kutubdia: kPercentStudentBCICRF,
        ukhiya: uPercentStudentBCICRF,
        cfo: cfoPercentStudentBCICRF,
      },
      {
        sl: 9,
        area: 'Number of Girls checkout book',
        kutubdia: kNoGirlBCOCRF,
        ukhiya: uNoGirlBCOCRF,
        cfo: cfoNoGirlBCOCRF,
      },
      {
        sl: 10,
        area: '% of Girls checked out books',
        kutubdia: kPercentGirlBCOCRF,
        ukhiya: uPercentGirlBCOCRF,
        cfo: cfoPercentGirlBCOCRF,
      },
      {
        sl: 11,
        area: 'Number of Boys checkout book',
        kutubdia: kNoBoyBCOCRF,
        ukhiya: uNoBoyBCOCRF,
        cfo: cfoNoBoyBCOCRF,
      },
      {
        sl: 12,
        area: '% of Boys checked out books',
        kutubdia: kPercentBoyBCOCRF,
        ukhiya: uPercentBoyBCOCRF,
        cfo: cfoPercentBoyBCOCRF,
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
    console.log('reportObjectCRF', reportObjectCRF)
    setReportDataCRF(reportObjectCRF)
  }
  // Summary Data CRF

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
                  <strong>Combined Summary Data School+CRF((April-2022 Till Now))</strong>
                </CAccordionHeader>
                <CAccordionBody>
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
                  <strong>Summary BCO/I School Data(April-2022 Till Now)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
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
                    data={reportDataSchool}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Summary BCO/I CRF Data(June-2022 Till Now)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
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
                    data={reportDataCRF}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={4}>
                <CAccordionHeader>
                  <strong>BCO/I School Data by Month</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <CCardHeader>
                    <CFormSelect aria-label="Default select example" onChange={handleChange}>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCardHeader>
                  <MaterialTable
                    title={
                      allBCODataSchoolByMonth.length + ' BCO Data for School of ' + previousMonth
                    }
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
                    data={allBCODataSchoolByMonth}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={5}>
                <CAccordionHeader>
                  <strong>BCO/I CRF Data by Month</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={allBCODataCRFByMonth.length + ' BCO Data for School of ' + previousMonth}
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
                    data={allBCODataCRFByMonth}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={6}>
                <CAccordionHeader>
                  <strong>BCO/I Detail School Data Ukhiya(April-2022 Till Now)</strong>
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
              <CAccordionItem itemKey={7}>
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
              <CAccordionItem itemKey={8}>
                <CAccordionHeader>
                  <strong>BCO/I Detail CRF Data Ukhiya(June-2022 Till Now)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaAllBCOCRF.length + ' BCO Data CRF Ukhiya'}
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
                    data={ukhiyaAllBCOCRF}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={9}>
                <CAccordionHeader>
                  <strong>BCO/I Detail CRF Data Kutubdia(June-2022 Till Now)</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaAllBCOCRF.length + ' BCO Data CRF Kutubdia'}
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
                    data={kutubdiaAllBCOCRF}
                  />
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
            <CButton color="primary" href="/bco/wfp-summary-crf">
              Summarize Report(CRF)
            </CButton>
            <CButton color="secondary" href="/bco/cfo-analysis-crf">
              CFO Analysis Report(CRF)
            </CButton>
            <CButton color="success" href="/bco/ukhiya-report-crf">
              Ukhiya Report(CRF)
            </CButton>
            <CButton color="warning" href="/bco/kutubdia-report-crf">
              Kutubdia Report(CRF)
            </CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllBCOCombined
