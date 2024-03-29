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

const AllBookCaptain = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [allBookCaptain, setAllBookCaptain] = useState([])

  // Area wise BookCaptain
  const [kutubdiaBookCaptain, setKutubdiaBookCaptain] = useState([])
  const [ukhiyaBookCaptain, setUkhiyaBookCaptain] = useState([])
  // Area wise BookCaptain

  // Report Data
  const [reportData, setReportData] = useState([])

  // Ukhiya Kutubdia
  let boyUkhiya2018 = 0
  let girlUkhiya2018 = 0
  let totalUkhiya2018 = 0
  let boyKutubdia2018 = 0
  let girlKutubdia2018 = 0
  let totalKutubdia2018 = 0
  let total2018 = 0

  let boyUkhiya2019 = 0
  let girlUkhiya2019 = 0
  let totalUkhiya2019 = 0
  let boyKutubdia2019 = 0
  let girlKutubdia2019 = 0
  let totalKutubdia2019 = 0
  let total2019 = 0

  let boyUkhiya2020 = 0
  let girlUkhiya2020 = 0
  let totalUkhiya2020 = 0
  let boyKutubdia2020 = 0
  let girlKutubdia2020 = 0
  let totalKutubdia2020 = 0
  let total2020 = 0

  let boyUkhiya2021 = 0
  let girlUkhiya2021 = 0
  let totalUkhiya2021 = 0
  let boyKutubdia2021 = 0
  let girlKutubdia2021 = 0
  let totalKutubdia2021 = 0
  let total2021 = 0

  let boyUkhiya2022 = 0
  let girlUkhiya2022 = 0
  let totalUkhiya2022 = 0
  let boyKutubdia2022 = 0
  let girlKutubdia2022 = 0
  let totalKutubdia2022 = 0
  let total2022 = 0

  let boyUkhiya2023 = 0
  let girlUkhiya2023 = 0
  let totalUkhiya2023 = 0
  let boyKutubdia2023 = 0
  let girlKutubdia2023 = 0
  let totalKutubdia2023 = 0
  let total2023 = 0
  // Ukhiya Kutubdia

  // Total
  let totalBoyUkhiya = 0
  let totalGirlUkhiya = 0
  let totalU = 0
  let totalBoyKutubdia = 0
  let totalGirlKutubdia = 0
  let totalK = 0
  let total = 0

  // Total

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      console.log('use effect called')
      await getAllBookCaptain()
      pushReportData(console.log('pushReportData called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Student Data
  const getAllBookCaptain = async () => {
    setIsLoading(true)
    try {
      var response = await axios('http://118.179.80.51:8080/api/v1/book-captain', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllBookCaptain(response.data)

      setKutubdiaBookCaptain(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaBookCaptain(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      // Data calculation with year and gender
      // 2020
      boyUkhiya2020 = response.data.filter(
        (item) => item.upazilla === 'Ukhiya' && item.year === '2020' && item.gender === 'Boy',
      ).length

      girlUkhiya2020 = response.data.filter(
        (item) => item.upazilla === 'Ukhiya' && item.year === '2020' && item.gender === 'Girl',
      ).length

      totalUkhiya2020 = boyUkhiya2020 + girlUkhiya2020

      boyKutubdia2020 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2020' && item.gender === 'Boy',
      ).length

      girlKutubdia2020 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2020' && item.gender === 'Girl',
      ).length

      totalKutubdia2020 = boyKutubdia2020 + girlKutubdia2020

      total2020 = totalUkhiya2020 + totalKutubdia2020
      // 2020

      // 2022
      boyUkhiya2022 = response.data.filter(
        (item) => item.upazilla === 'Ukhiya' && item.year === '2022' && item.gender === 'Boy',
      ).length

      girlUkhiya2022 = response.data.filter(
        (item) => item.upazilla === 'Ukhiya' && item.year === '2022' && item.gender === 'Girl',
      ).length

      totalUkhiya2022 = boyUkhiya2022 + girlUkhiya2022

      boyKutubdia2022 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2022' && item.gender === 'Boy',
      ).length

      girlKutubdia2022 = response.data.filter(
        (item) => item.upazilla === 'Kutubdia' && item.year === '2022' && item.gender === 'Girl',
      ).length

      totalKutubdia2022 = boyKutubdia2022 + girlKutubdia2022

      total2022 = totalUkhiya2022 + totalKutubdia2022
      // 2022

      // Total
      totalBoyUkhiya =
        boyUkhiya2018 +
        boyUkhiya2019 +
        boyUkhiya2020 +
        boyUkhiya2021 +
        boyUkhiya2022 +
        boyUkhiya2023

      totalGirlUkhiya =
        girlUkhiya2018 +
        girlUkhiya2019 +
        girlUkhiya2020 +
        girlUkhiya2021 +
        girlUkhiya2022 +
        girlUkhiya2023

      totalU =
        totalUkhiya2018 +
        totalUkhiya2019 +
        totalUkhiya2020 +
        totalUkhiya2021 +
        totalUkhiya2022 +
        totalUkhiya2023

      totalBoyKutubdia =
        boyKutubdia2018 +
        boyKutubdia2019 +
        boyKutubdia2020 +
        boyKutubdia2021 +
        boyKutubdia2022 +
        boyKutubdia2023

      totalGirlKutubdia =
        girlKutubdia2018 +
        girlKutubdia2019 +
        girlKutubdia2020 +
        girlKutubdia2021 +
        girlKutubdia2022 +
        girlKutubdia2023

      totalK =
        totalKutubdia2018 +
        totalKutubdia2019 +
        totalKutubdia2020 +
        totalKutubdia2021 +
        totalKutubdia2022 +
        totalKutubdia2023

      total = total2018 + total2019 + total2020 + total2021 + total2022 + total2023
      // Total
      // Data calculation with year and gender

      setIsLoading(false)
      //console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Student Data

  const pushReportData = () => {
    const reportObject = [
      {
        year: '2018',
        boyUkhiya: boyUkhiya2018,
        girlUkhiya: girlUkhiya2018,
        totalUkhiya: totalUkhiya2018,
        boyKutubdia: boyKutubdia2018,
        girlKutubdia: girlKutubdia2018,
        totalKutubdia: totalKutubdia2018,
        total: total2018,
      },
      {
        year: '2019',
        boyUkhiya: boyUkhiya2019,
        girlUkhiya: girlUkhiya2019,
        totalUkhiya: totalUkhiya2019,
        boyKutubdia: boyKutubdia2019,
        girlKutubdia: girlKutubdia2019,
        totalKutubdia: totalKutubdia2019,
        total: total2019,
      },
      {
        year: '2020',
        boyUkhiya: boyUkhiya2020,
        girlUkhiya: girlUkhiya2020,
        totalUkhiya: totalUkhiya2020,
        boyKutubdia: boyKutubdia2020,
        girlKutubdia: girlKutubdia2020,
        totalKutubdia: totalKutubdia2020,
        total: total2020,
      },
      {
        year: '2021',
        boyUkhiya: boyUkhiya2021,
        girlUkhiya: girlUkhiya2021,
        totalUkhiya: totalUkhiya2021,
        boyKutubdia: boyKutubdia2021,
        girlKutubdia: girlKutubdia2021,
        totalKutubdia: totalKutubdia2021,
        total: total2021,
      },
      {
        year: '2022',
        boyUkhiya: boyUkhiya2022,
        girlUkhiya: girlUkhiya2022,
        totalUkhiya: totalUkhiya2022,
        boyKutubdia: boyKutubdia2022,
        girlKutubdia: girlKutubdia2022,
        totalKutubdia: totalKutubdia2022,
        total: total2022,
      },
      {
        year: '2023',
        boyUkhiya: boyUkhiya2023,
        girlUkhiya: girlUkhiya2023,
        totalUkhiya: totalUkhiya2023,
        boyKutubdia: boyKutubdia2023,
        girlKutubdia: girlKutubdia2023,
        totalKutubdia: totalKutubdia2023,
        total: total2023,
      },
      {
        year: 'Total',
        boyUkhiya: totalBoyUkhiya,
        girlUkhiya: totalGirlUkhiya,
        totalUkhiya: totalU,
        boyKutubdia: totalBoyKutubdia,
        girlKutubdia: totalGirlKutubdia,
        totalKutubdia: totalK,
        total: total,
      },
    ]
    console.log('reportObject', reportObject)
    setReportData(reportObject)
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
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Book-Captain</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Total Book-Captain({allBookCaptain.length})</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Year', field: 'year' },
                      { title: '#Boy in Ukhiya', field: 'boyUkhiya' },
                      { title: '#Girl in Ukhiya', field: 'girlUkhiya' },
                      {
                        title: 'Total Book-Captain in Ukhiya',
                        field: 'totalUkhiya',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      { title: '#Boy in Kutubdia', field: 'boyKutubdia' },
                      { title: '#Girl in Kutubdia', field: 'girlKutubdia' },
                      {
                        title: 'Total Book-Captain in Kutubdia',
                        field: 'totalKutubdia',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      {
                        title: 'Total Book-Captain',
                        field: 'total',
                        cellStyle: {
                          backgroundColor: '#b8a49c',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
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
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Book-Captain in Kutubdia({kutubdiaBookCaptain.length})</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <strong>
                    <code>Under Construction</code>
                  </strong>
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Book-Captain in Ukhiya({ukhiyaBookCaptain.length})</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <strong>
                    <code>Under Construction</code>
                  </strong>
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllBookCaptain
