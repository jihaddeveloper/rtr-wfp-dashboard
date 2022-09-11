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

const AllLibrary = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [allLibraryData, setAllLibraryData] = useState([])

  // Area wise library data
  const [kutubdiaLibrary, setKutubdiaLibrary] = useState([])
  const [ukhiyaLibrary, setUkhiyaLibrary] = useState([])
  // Area wise library data

  // Report Data
  const [reportData, setReportData] = useState([])

  // Ukhiya Kutubdia
  let pplibraryUkhiya = 0
  let pplibraryKutubdia = 0
  let ppTotalLibrary = 0
  let ppllpBookUkhiya = 0
  let ppnllpBookUkhiya = 0
  let ppTotalBookUkhiya = 0
  let ppllpBookKutubdia = 0
  let ppnllpBookKutubdia = 0
  let ppTotalBookKutubdia = 0
  let ppTotalBook = 0

  let g1libraryUkhiya = 0
  let g1libraryKutubdia = 0
  let g1TotalLibrary = 0
  let g1llpBookUkhiya = 0
  let g1nllpBookUkhiya = 0
  let g1TotalBookUkhiya = 0
  let g1llpBookKutubdia = 0
  let g1nllpBookKutubdia = 0
  let g1TotalBookKutubdia = 0
  let g1TotalBook = 0

  let g2libraryUkhiya = 0
  let g2libraryKutubdia = 0
  let g2TotalLibrary = 0
  let g2llpBookUkhiya = 0
  let g2nllpBookUkhiya = 0
  let g2TotalBookUkhiya = 0
  let g2llpBookKutubdia = 0
  let g2nllpBookKutubdia = 0
  let g2TotalBookKutubdia = 0
  let g2TotalBook = 0

  let g3libraryUkhiya = 0
  let g3libraryKutubdia = 0
  let g3TotalLibrary = 0
  let g3llpBookUkhiya = 0
  let g3nllpBookUkhiya = 0
  let g3TotalBookUkhiya = 0
  let g3llpBookKutubdia = 0
  let g3nllpBookKutubdia = 0
  let g3TotalBookKutubdia = 0
  let g3TotalBook = 0

  let g4libraryUkhiya = 0
  let g4libraryKutubdia = 0
  let g4TotalLibrary = 0
  let g4llpBookUkhiya = 0
  let g4nllpBookUkhiya = 0
  let g4TotalBookUkhiya = 0
  let g4llpBookKutubdia = 0
  let g4nllpBookKutubdia = 0
  let g4TotalBookKutubdia = 0
  let g4TotalBook = 0

  let g5libraryUkhiya = 0
  let g5libraryKutubdia = 0
  let g5TotalLibrary = 0
  let g5llpBookUkhiya = 0
  let g5nllpBookUkhiya = 0
  let g5TotalBookUkhiya = 0
  let g5llpBookKutubdia = 0
  let g5nllpBookKutubdia = 0
  let g5TotalBookKutubdia = 0
  let g5TotalBook = 0

  let totalLibraryU = 0
  let totalLibraryK = 0
  let totalLibrary = 0
  let totalLLPBookU = 0
  let totalNLLPBookU = 0
  let totalBookU = 0
  let totalLLPBookK = 0
  let totalNLLPBookK = 0
  let totalBookK = 0
  let totalBook = 0

  // Ukhiya Kutubdia

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      setIsLoading(true)
      await getAllLibrary()

      pushReportData(console.log('pushReportData called'))
      setIsLoading(false)
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Library Data
  const getAllLibrary = async () => {
    setIsLoading(true)
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/library', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllLibraryData(response.data)

      setKutubdiaLibrary(response.data.filter((item) => item.upazilla === 'Kutubdia'))

      setUkhiyaLibrary(response.data.filter((item) => item.upazilla === 'Ukhiya'))

      // Preprimary
      pplibraryUkhiya = response.data.filter((item) => {
        return item.upazilla === 'Ukhiya' && item.className === 'PP'
      }).length

      pplibraryKutubdia = response.data.filter((item) => {
        return item.upazilla === 'Kutubdia' && item.className === 'PP'
      }).length

      ppTotalLibrary = pplibraryUkhiya + pplibraryKutubdia
      // Preprimary

      // Class1
      g1libraryUkhiya = response.data.filter((item) => {
        return item.upazilla === 'Ukhiya' && item.className === 'G1'
      }).length
      console.log('g1libraryKutubdia: ' + g1libraryKutubdia)
      g1libraryKutubdia = response.data.filter((item) => {
        return item.upazilla === 'Kutubdia' && item.className === 'G1'
      }).length

      console.log('g1libraryUkhiya: ' + g1libraryUkhiya)

      console.log('g1libraryKutubdia: ' + g1libraryKutubdia)

      g1TotalLibrary = g1libraryUkhiya + g1libraryKutubdia
      console.log('g1TotalLibrary: ' + g1TotalLibrary)
      // Class1

      // Class2
      g2libraryUkhiya = response.data.filter((item) => {
        return item.upazilla === 'Ukhiya' && item.className === 'G2'
      }).length

      g2libraryKutubdia = response.data.filter((item) => {
        return item.upazilla === 'Kutubdia' && item.className === 'G2'
      }).length

      g2TotalLibrary = g2libraryUkhiya + g2libraryKutubdia
      // Class2

      // Class3
      g3libraryUkhiya = response.data.filter((item) => {
        return item.upazilla === 'Ukhiya' && item.className === 'G3'
      }).length

      g3libraryKutubdia = response.data.filter((item) => {
        return item.upazilla === 'Kutubdia' && item.className === 'G3'
      }).length

      g3TotalLibrary = g3libraryUkhiya + g3libraryKutubdia
      // Class3

      // Class4
      g4libraryUkhiya = response.data.filter((item) => {
        return item.upazilla === 'Ukhiya' && item.className === 'G4'
      }).length

      g4libraryKutubdia = response.data.filter((item) => {
        return item.upazilla === 'Kutubdia' && item.className === 'G4'
      }).length

      g4TotalLibrary = g4libraryUkhiya + g4libraryKutubdia
      // Class4

      // Class5
      g5libraryUkhiya = response.data.filter((item) => {
        return item.upazilla === 'Ukhiya' && item.className === 'G5'
      }).length

      g5libraryKutubdia = response.data.filter((item) => {
        return item.upazilla === 'Kutubdia' && item.className === 'G5'
      }).length

      g5TotalLibrary = g5libraryUkhiya + g5libraryKutubdia
      // Class5

      //Total
      totalLibraryU =
        pplibraryUkhiya +
        g1libraryUkhiya +
        g2libraryUkhiya +
        g3libraryUkhiya +
        g4libraryUkhiya +
        g5libraryUkhiya

      totalLibraryK =
        pplibraryKutubdia +
        g1libraryKutubdia +
        g2libraryKutubdia +
        g3libraryKutubdia +
        g4libraryKutubdia +
        g5libraryKutubdia

      totalLibrary =
        ppTotalLibrary +
        g1TotalLibrary +
        g2TotalLibrary +
        g3TotalLibrary +
        g4TotalLibrary +
        g5TotalLibrary
      //Total

      setIsLoading(false)

      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Library Data

  const pushReportData = () => {
    const reportObject = [
      {
        grade: 'PP',
        libraryUkhiya: pplibraryUkhiya,
        libraryKutubdia: pplibraryKutubdia,
        totalLibrary: ppTotalLibrary,
        llpBookUkhiya: ppllpBookUkhiya,
        nllpBookUkhiya: ppnllpBookUkhiya,
        totalBookUkhiya: ppTotalBookUkhiya,
        llpBookKutubdia: ppllpBookKutubdia,
        nllpBookKutubdia: ppnllpBookKutubdia,
        totalBookKutubdia: ppTotalBookKutubdia,
        grandTotalBook: ppTotalBook,
      },
      {
        grade: 'G1',
        libraryUkhiya: g1libraryUkhiya,
        libraryKutubdia: g1libraryKutubdia,
        totalLibrary: g1TotalLibrary,
        llpBookUkhiya: g1llpBookUkhiya,
        nllpBookUkhiya: g1nllpBookUkhiya,
        totalBookUkhiya: g1TotalBookUkhiya,
        llpBookKutubdia: g1llpBookKutubdia,
        nllpBookKutubdia: g1nllpBookKutubdia,
        totalBookKutubdia: g1TotalBookKutubdia,
        grandTotalBook: g1TotalBook,
      },
      {
        grade: 'G2',
        libraryUkhiya: g2libraryUkhiya,
        libraryKutubdia: g2libraryKutubdia,
        totalLibrary: g2TotalLibrary,
        llpBookUkhiya: g2llpBookUkhiya,
        nllpBookUkhiya: g2nllpBookUkhiya,
        totalBookUkhiya: g2TotalBookUkhiya,
        llpBookKutubdia: g2llpBookKutubdia,
        nllpBookKutubdia: g2nllpBookKutubdia,
        totalBookKutubdia: g2TotalBookKutubdia,
        grandTotalBook: g2TotalBook,
      },
      {
        grade: 'G3',
        libraryUkhiya: g3libraryUkhiya,
        libraryKutubdia: g3libraryKutubdia,
        totalLibrary: g3TotalLibrary,
        llpBookUkhiya: g3llpBookUkhiya,
        nllpBookUkhiya: g3nllpBookUkhiya,
        totalBookUkhiya: g3TotalBookUkhiya,
        llpBookKutubdia: g3llpBookKutubdia,
        nllpBookKutubdia: g3nllpBookKutubdia,
        totalBookKutubdia: g3TotalBookKutubdia,
        grandTotalBook: g3TotalBook,
      },
      {
        grade: 'G4',
        libraryUkhiya: g4libraryUkhiya,
        libraryKutubdia: g4libraryKutubdia,
        totalLibrary: g4TotalLibrary,
        llpBookUkhiya: g4llpBookUkhiya,
        nllpBookUkhiya: g4nllpBookUkhiya,
        totalBookUkhiya: g4TotalBookUkhiya,
        llpBookKutubdia: g4llpBookKutubdia,
        nllpBookKutubdia: g4nllpBookKutubdia,
        totalBookKutubdia: g4TotalBookKutubdia,
        grandTotalBook: g4TotalBook,
      },
      {
        grade: 'G5',
        libraryUkhiya: g5libraryUkhiya,
        libraryKutubdia: g5libraryKutubdia,
        totalLibrary: g5TotalLibrary,
        llpBookUkhiya: g5llpBookUkhiya,
        nllpBookUkhiya: g5nllpBookUkhiya,
        totalBookUkhiya: g5TotalBookUkhiya,
        llpBookKutubdia: g5llpBookKutubdia,
        nllpBookKutubdia: g5nllpBookKutubdia,
        totalBookKutubdia: g5TotalBookKutubdia,
        grandTotalBook: g5TotalBook,
      },
      {
        grade: 'Total',
        libraryUkhiya: totalLibraryU,
        libraryKutubdia: totalLibraryK,
        totalLibrary: totalLibrary,
        llpBookUkhiya: totalLLPBookU,
        nllpBookUkhiya: totalNLLPBookU,
        totalBookUkhiya: totalBookU,
        llpBookKutubdia: totalLLPBookK,
        nllpBookKutubdia: totalNLLPBookK,
        totalBookKutubdia: totalBookK,
        grandTotalBook: totalBook,
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
            <strong>Library-{allLibraryData.length}</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Total Library-{allLibraryData.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={''}
                    // title={JSON.stringify(reportData)}
                    columns={[
                      { title: 'Grade', field: 'grade' },
                      { title: '#Library in Ukhiya', field: 'libraryUkhiya' },
                      { title: '#Library in Kutubdia', field: 'libraryKutubdia' },
                      {
                        title: 'Total Library',
                        field: 'totalLibrary',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },

                      { title: '#LLP Book Distributed in Ukhiya', field: 'llpBookUkhiya' },
                      { title: '#NLLP Book Distributed in Ukhiya', field: 'nllpBookUkhiya' },
                      {
                        title: 'Total Book Distributed in Ukhiya',
                        field: 'totalBookUkhiya',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },

                      { title: '#LLP Book Distributed in Kutubdia', field: 'llpBookKutubdia' },
                      { title: '#NLLP Book Distributed in Kutubdia', field: 'nllpBookKutubdia' },
                      {
                        title: 'Total Book Distributed in Kutubdia',
                        field: 'totalBookKutubdia',
                        cellStyle: {
                          backgroundColor: '#e0d0ca',
                          color: '#000',
                        },
                        headerStyle: {
                          backgroundColor: '#bcceeb',
                        },
                      },
                      {
                        title: 'Grand Total Book Distributed',
                        field: 'grandTotalBook',
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
                  <strong>Library in Kutubdia-{kutubdiaLibrary.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaLibrary.length + ' Library'}
                    columns={[
                      { title: 'School', field: 'school', type: 'string' },
                      { title: 'Upazila', field: 'upazilla', type: 'string', sorting: 'true' },
                      { title: 'Book Self Number', field: 'number_book_self' },
                      { title: 'Book Self Active', field: 'number_self_active', sorting: 'true' },
                      {
                        title: 'Total Title',
                        field: 'titleTotal',
                      },
                      { title: 'Total Book', field: 'bookTotal' },
                      { title: 'Total Book Available', field: 'bookTotal_now' },

                      { title: 'Green Title', field: 'titleNoGreen' },
                      { title: 'Green Book', field: 'bookNoGreen' },

                      { title: 'Red Title', field: 'titleNoRed' },
                      { title: 'Red Book', field: 'bookNoRed' },

                      { title: 'White Title', field: 'titleNoWhite' },
                      { title: 'White Book', field: 'bookNoWhite' },

                      { title: 'Blue Title', field: 'titleNoBlue' },
                      { title: 'Blue Book', field: 'bookNoBlue' },

                      { title: 'Yellow Title', field: 'titleNoYellow' },
                      { title: 'Yellow Book', field: 'bookNoYellow' },
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
                        backgroundColor: '#f5f3f2',
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                      cellStyle: {
                        borderRight: '1px solid #fff',
                        borderStyle: 'solid',
                      },
                    }}
                    data={kutubdiaLibrary}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
                <CAccordionHeader>
                  <strong>Library in Ukhiya-{ukhiyaLibrary.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaLibrary.length + ' Library'}
                    columns={[
                      { title: 'School', field: 'school', type: 'string' },
                      { title: 'Upazila', field: 'upazilla', type: 'string', sorting: 'true' },
                      { title: 'Book Self Number', field: 'number_book_self' },
                      { title: 'Book Self Active', field: 'number_self_active', sorting: 'true' },
                      {
                        title: 'Total Title',
                        field: 'titleTotal',
                      },
                      { title: 'Total Book', field: 'bookTotal' },
                      {
                        title: 'Total Title',
                        field: 'titleTotal',
                      },
                      { title: 'Total Book Available', field: 'bookTotal_now' },

                      { title: 'Green Title', field: 'titleNoGreen' },
                      { title: 'Green Book', field: 'bookNoGreen' },

                      { title: 'Red Title', field: 'titleNoRed' },
                      { title: 'Red Book', field: 'bookNoRed' },

                      { title: 'White Title', field: 'titleNoWhite' },
                      { title: 'White Book', field: 'bookNoWhite' },

                      { title: 'Blue Title', field: 'titleNoBlue' },
                      { title: 'Blue Book', field: 'bookNoBlue' },

                      { title: 'Yellow Title', field: 'titleNoYellow' },
                      { title: 'Yellow Book', field: 'bookNoYellow' },
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
                        borderRight: '1px solid #fff',
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
                    data={ukhiyaLibrary}
                  />
                </CAccordionBody>
              </CAccordionItem>
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllLibrary
