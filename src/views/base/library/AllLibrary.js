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

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')
    getAllLibrary()
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

      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Library Data

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>ALL Library Data({allLibraryData.length})</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen>
              <CAccordionItem itemKey={1}>
                <CAccordionHeader>
                  <strong>Library Data Ukhiya({ukhiyaLibrary.length})</strong>
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
                  <strong>Library Data Kutubdia({kutubdiaLibrary.length})</strong>
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
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllLibrary
