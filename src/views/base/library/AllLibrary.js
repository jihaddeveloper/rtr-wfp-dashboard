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

const AllLibrary = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allLibraryData, setAllLibraryData] = useState([])

  // Area wise library data
  const [kutubdiaLibrary, setKutubdiaLibrary] = useState([])
  const [ukhiyaLibrary, setUkhiyaLibrary] = useState([])
  // Area wise library data

  // Report Data
  const [reportData, setReportData] = useState([])

  // Ukhiya Kutubdia
  let g1libraryUkhiya = 0
  let g1llpBookUkhiya = 0
  let g1nllpBookUkhiya = 0
  let g1libraryKutubdia = 0
  let g1llpBookKutubdia = 0
  let g1nllpBookKutubdia = 0

  let g2libraryUkhiya = 0
  let g2llpBookUkhiya = 0
  let g2nllpBookUkhiya = 0
  let g2libraryKutubdia = 0
  let g2llpBookKutubdia = 0
  let g2nllpBookKutubdia = 0

  let g3libraryUkhiya = 0
  let g3llpBookUkhiya = 0
  let g3nllpBookUkhiya = 0
  let g3libraryKutubdia = 0
  let g3llpBookKutubdia = 0
  let g3nllpBookKutubdia = 0

  let g4libraryUkhiya = 0
  let g4llpBookUkhiya = 0
  let g4nllpBookUkhiya = 0
  let g4libraryKutubdia = 0
  let g4llpBookKutubdia = 0
  let g4nllpBookKutubdia = 0

  let g5libraryUkhiya = 0
  let g5llpBookUkhiya = 0
  let g5nllpBookUkhiya = 0
  let g5libraryKutubdia = 0
  let g5llpBookKutubdia = 0
  let g5nllpBookKutubdia = 0
  // Ukhiya Kutubdia

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    const call = async () => {
      await getAllLibrary()

      pushReportData(console.log('pushReportData called'))
    }
    call()
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Get All Library Data
  const getAllLibrary = async () => {
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

      g1libraryUkhiya = response.data.filter((item) => {
        return item.upazilla === 'Ukhiya' && item.className === 'G1'
      }).length

      g1libraryKutubdia = response.data.filter((item) => {
        return item.upazilla === 'Kutubdia' && item.className === 'G1'
      }).length

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
        grade: 'G1',
        libraryUkhiya: g1libraryUkhiya,
        llpBookUkhiya: g1llpBookUkhiya,
        nllpBookUkhiya: g1nllpBookUkhiya,
        libraryKutubdia: g1libraryKutubdia,
        llpBookKutubdia: g1llpBookKutubdia,
        nllpBookKutubdia: g1nllpBookKutubdia,
      },
      {
        grade: 'G2',
        libraryUkhiya: g2libraryUkhiya,
        llpBookUkhiya: g2llpBookUkhiya,
        nllpBookUkhiya: g2nllpBookUkhiya,
        libraryKutubdia: g2libraryKutubdia,
        llpBookKutubdia: g2llpBookKutubdia,
        nllpBookKutubdia: g2nllpBookKutubdia,
      },
      {
        grade: 'G3',
        libraryUkhiya: g3libraryUkhiya,
        llpBookUkhiya: g3llpBookUkhiya,
        nllpBookUkhiya: g3nllpBookUkhiya,
        libraryKutubdia: g3libraryKutubdia,
        llpBookKutubdia: g3llpBookKutubdia,
        nllpBookKutubdia: g3nllpBookKutubdia,
      },
      {
        grade: 'G4',
        libraryUkhiya: g4libraryUkhiya,
        llpBookUkhiya: g4llpBookUkhiya,
        nllpBookUkhiya: g4nllpBookUkhiya,
        libraryKutubdia: g4libraryKutubdia,
        llpBookKutubdia: g4llpBookKutubdia,
        nllpBookKutubdia: g4nllpBookKutubdia,
      },
      {
        grade: 'G5',
        libraryUkhiya: g5libraryUkhiya,
        llpBookUkhiya: g5llpBookUkhiya,
        nllpBookUkhiya: g5nllpBookUkhiya,
        libraryKutubdia: g5libraryKutubdia,
        llpBookKutubdia: g5llpBookKutubdia,
        nllpBookKutubdia: g5nllpBookKutubdia,
      },
    ]
    console.log('reportObject', reportObject)
    setReportData(reportObject)
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
                  <strong>Total Library Ukhiya-{ukhiyaLibrary.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={ukhiyaLibrary.length + ' Library Data'}
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
                      },
                    }}
                    data={ukhiyaLibrary}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={2}>
                <CAccordionHeader>
                  <strong>Total Library Kutubdia-{kutubdiaLibrary.length}</strong>
                </CAccordionHeader>
                <CAccordionBody>
                  <MaterialTable
                    title={kutubdiaLibrary.length + ' Library Data'}
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
                      },
                    }}
                    data={kutubdiaLibrary}
                  />
                </CAccordionBody>
              </CAccordionItem>
              <CAccordionItem itemKey={3}>
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
                      { title: '#Book LLP in Ukhiya', field: 'llpBookUkhiya' },
                      { title: '#Book NLLP in Ukhiya', field: 'nllpBookUkhiya' },
                      { title: '#Library in Kutubdia', field: 'libraryKutubdia' },
                      { title: '#Book LLP in Kutubdia', field: 'llpBookKutubdia' },
                      { title: '#Book NLLP in Kutubdia', field: 'nllpBookKutubdia' },
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
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllLibrary
