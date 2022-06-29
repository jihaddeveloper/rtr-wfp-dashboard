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

const UkhiyaReport = () => {
  // data state to store the BCO API data. Its initial value is an empty array
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [allBCOData, setAllBCOData] = useState([])

  const [checkbox1, setCheckbox1] = React.useState('')

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

  // Generate current month repoort for Ukhiye
  const ukhiyaReportData = allBCOData.filter(
    (item) =>
      item.upazilla == 'Ukhiya' && new Date(item.createDate).getMonth() == new Date().getMonth(),
  )

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
            <strong>
              Ukhiya Report (Total {ukhiyaReportData.length}) {previousMonth}
            </strong>
            {/* <strong>{ukhiyaReportData.length}</strong> */}
          </CCardHeader>
          <CCardBody>
            <MaterialTable
              title=""
              columns={[
                // { title: 'Sl', field: 'id' },
                { title: 'Name of the School', field: 'school' },
                // Enrolled Student
                { title: 'C-PP #Boys', field: 'priPrimaryBoy' },
                { title: 'C-PP #Girls', field: 'priPrimaryGirl' },
                { title: 'C-PP #Total ', field: 'priPrimaryTotal' },

                { title: 'C-1 #Boys', field: 'classOneBoy' },
                { title: 'C-1 #Girls', field: 'classOneGirl' },
                { title: 'C-1 #Total ', field: 'classOneTotal' },

                { title: 'C-2 #Boys', field: 'classTwoBoy' },
                { title: 'C-2 #Girls', field: 'classTwoGirl' },
                { title: 'C-2 #Total ', field: 'classTwoTotal' },

                { title: 'C-3 #Boys', field: 'classThreeBoy' },
                { title: 'C-3 #Girls', field: 'classThreeGirl' },
                { title: 'C-3 #Total ', field: 'classThreeTotal' },

                { title: 'C-4 #Boys', field: 'classFourBoy' },
                { title: 'C-4 #Girls', field: 'classFourGirl' },
                { title: 'C-4 #Total ', field: 'classFourTotal' },

                { title: 'C-5 #Boys', field: 'classFiveBoy' },
                { title: 'C-5 #Girls', field: 'classFiveGirl' },
                { title: 'C-5 #Total ', field: 'classFiveTotal' },

                // Number of Students checked out Book
                { title: 'C-PP #Boys Checkout', field: 'priPrimaryNoBoyBC' },
                { title: 'C-PP #Girls Checkout', field: 'priPrimaryNoGirlBC' },
                { title: 'C-PP #Total Checkout', field: 'priPrimaryNoTotalBC' },

                { title: 'C-1 #Boys Checkout', field: 'classOneNoBoyBC' },
                { title: 'C-1 #Girls Checkout', field: 'classOneNoGirlBC' },
                { title: 'C-1 #Total Checkout', field: 'classOneNoTotalBC' },

                { title: 'C-2 #Boys Checkout', field: 'classTwoNoBoyBC' },
                { title: 'C-2 #Girls Checkout', field: 'classTwoNoGirlBC' },
                { title: 'C-2 #Total Checkout', field: 'classTwoNoTotalBC' },

                { title: 'C-3 #Boys Checkout', field: 'classThreeNoBoyBC' },
                { title: 'C-3 #Girls Checkout', field: 'classThreeNoGirlBC' },
                { title: 'C-3 #Total Checkout', field: 'classThreeNoTotalBC' },

                { title: 'C-4 #Boys Checkout', field: 'classFourNoBoyBC' },
                { title: 'C-4 #Girls Checkout', field: 'classFourNoGirlBC' },
                { title: 'C-4 #Total Checkout', field: 'classFourNoTotalBC' },

                { title: 'C-5 #Boys Checkout', field: 'classFiveNoBoyBC' },
                { title: 'C-5 #Girls Checkout', field: 'classFiveNoGirlBC' },
                { title: 'C-5 #Total Checkout', field: 'classFiveNoTotalBC' },

                //No of Book checkout information
                { title: 'C-PP #Book Boys Checkout', field: 'priPrimaryNoBookBoyBC' },
                { title: 'C-PP #Book Girls Checkout', field: 'priPrimaryNoBookGirlBC' },
                { title: 'C-PP #Book Total Checkout', field: 'priPrimaryNoBookTotalBC' },

                { title: 'C-1 #Book Boys Checkout', field: 'classOneNoBookBoyBC' },
                { title: 'C-1 #Book Girls Checkout', field: 'classOneNoBookGirlBC' },
                { title: 'C-1 #Book Total Checkout', field: 'classOneNoBookTotalBC' },

                { title: 'C-2 #Book Boys Checkout', field: 'classTwoNoBookBoyBC' },
                { title: 'C-2 #Book Girls Checkout', field: 'classTwoNoBookGirlBC' },
                { title: 'C-2 #Book Total Checkout', field: 'classTwoNoBookTotalBC' },

                { title: 'C-3 #Book Boys Checkout', field: 'classThreeNoBookBoyBC' },
                { title: 'C-3 #Book Girls Checkout', field: 'classThreeNoBookGirlBC' },
                { title: 'C-3 #Book Total Checkout', field: 'classThreeNoBookTotalBC' },

                { title: 'C-4 #Book Boys Checkout', field: 'classFourNoBookBoyBC' },
                { title: 'C-4 #Book Girls Checkout', field: 'classFourNoBookGirlBC' },
                { title: 'C-4 #Book Total Checkout', field: 'classFourNoBookTotalBC' },

                { title: 'C-5 #Book Boys Checkout', field: 'classFiveNoBookBoyBC' },
                { title: 'C-5 #Book Girls Checkout', field: 'classFiveNoBookGirlBC' },
                { title: 'C-5 #Book Total Checkout', field: 'classFiveNoBookTotalBC' },

                // Book checkin information
                { title: 'C-PP #Book Boys Checkin', field: 'priPrimaryNoBookBoyBCIn' },
                { title: 'C-PP #Book Girls Checkin', field: 'priPrimaryNoBookGirlBCIn' },
                { title: 'C-PP #Book Total Checkin', field: 'priPrimaryNoBookTotalBCIn' },

                { title: 'C-1 #Book Boys Checkin', field: 'classOneNoBookBoyBCIn' },
                { title: 'C-1 #Book Girls Checkin', field: 'classOneNoBookGirlBCIn' },
                { title: 'C-1 #Book Total Checkin', field: 'classOneNoBookTotalBCIn' },

                { title: 'C-2 #Book Boys Checkin', field: 'classTwoNoBookBoyBCIn' },
                { title: 'C-2 #Book Girls Checkin', field: 'classTwoNoBookGirlBCIn' },
                { title: 'C-2 #Book Total Checkin', field: 'classTwoNoBookTotalBCIn' },

                { title: 'C-3 #Book Boys Checkin', field: 'classThreeNoBookBoyBCIn' },
                { title: 'C-3 #Book Girls Checkin', field: 'classThreeNoBookGirlBCIn' },
                { title: 'C-3 #Book Total Checkin', field: 'classThreeNoBookTotalBCIn' },

                { title: 'C-4 #Book Boys Checkin', field: 'classFourNoBookBoyBCIn' },
                { title: 'C-4 #Book Girls Checkin', field: 'classFourNoBookGirlBCIn' },
                { title: 'C-4 #Book Total Checkin', field: 'classFourNoBookTotalBCIn' },

                { title: 'C-5 #Book Boys Checkin', field: 'classFiveNoBookBoyBCIn' },
                { title: 'C-5 #Book Girls Checkin', field: 'classFiveNoBookGirlBCIn' },
                { title: 'C-5 #Book Total Checkin', field: 'classFiveNoBookTotalBCIn' },

                // Special Need Student enrollment information
                { title: 'C-PP SP #Boys ', field: 'priPrimarySpBoy' },
                { title: 'C-PP SP #Girls', field: 'priPrimarySpGirl' },
                { title: 'C-PP SP #Total ', field: 'priPrimarySpTotal' },

                { title: 'C-1 SP #Boys', field: 'classOneSpBoy' },
                { title: 'C-1 SP #Girls', field: 'classOneSpGirl' },
                { title: 'C-1 SP #Total ', field: 'classOneSpTotal' },

                { title: 'C-2 SP #Boys', field: 'classTwoSpBoy' },
                { title: 'C-2 SP #Girls', field: 'classTwoSpGirl' },
                { title: 'C-2 SP #Total ', field: 'classTwoSpTotal' },

                { title: 'C-3 SP #Boys', field: 'classThreeSpBoy' },
                { title: 'C-3 SP #Girls', field: 'classThreeSpGirl' },
                { title: 'C-3 SP #Total ', field: 'classThreeSpTotal' },

                { title: 'C-4 SP #Boys', field: 'classFourSpBoy' },
                { title: 'C-4 SP #Girls', field: 'classFourSpGirl' },
                { title: 'C-4 SP #Total ', field: 'classFourSpTotal' },

                { title: 'C-5 SP #Boys', field: 'classFiveSpBoy' },
                { title: 'C-5 SP #Girls', field: 'classFiveSpGirl' },
                { title: 'C-5 SP #Total ', field: 'classFiveSpTotal' },

                // Special Need Student book checkout information
                { title: 'C-PP SP #Boys Checkout', field: 'priPrimaryNoSpBoyBC' },
                { title: 'C-PP SP #Girls Checkout', field: 'priPrimaryNoSpGirlBC' },
                { title: 'C-PP SP #Total Checkout', field: 'priPrimaryNoSpTotalBC' },

                { title: 'C-1 SP #Boys Checkout', field: 'classOneNoSpBoyBC' },
                { title: 'C-1 SP #Girls Checkout', field: 'classOneNoSpGirlBC' },
                { title: 'C-1 SP #Total Checkout', field: 'classOneNoSpTotalBC' },

                { title: 'C-2 SP #Boys Checkout', field: 'classTwoNoSpBoyBC' },
                { title: 'C-2 SP #Girls Checkout', field: 'classTwoNoSpGirlBC' },
                { title: 'C-2 SP #Total Checkout', field: 'classTwoNoSpTotalBC' },

                { title: 'C-3 SP #Boys Checkout', field: 'classThreeNoSpBoyBC' },
                { title: 'C-3 SP #Girls Checkout', field: 'classThreeNoSpGirlBC' },
                { title: 'C-3 SP #Total Checkout', field: 'classThreeNoSpTotalBC' },

                { title: 'C-4 SP #Boys Checkout', field: 'classFourNoSpBoyBC' },
                { title: 'C-4 SP #Girls Checkout', field: 'classFourNoSpGirlBC' },
                { title: 'C-4 SP #Total Checkout', field: 'classFourNoSpTotalBC' },

                { title: 'C-5 SP #Boys Checkout', field: 'classFiveNoSpBoyBC' },
                { title: 'C-5 SP #Girls Checkout', field: 'classFiveNoSpGirlBC' },
                { title: 'C-5 SP #Total Checkout', field: 'classFiveNoSpTotalBC' },

                { title: 'LPO Emlpoyee ID', field: 'lpo', type: 'string' },
                {
                  title: 'LF Employee ID',
                  field: 'lf',
                  type: 'string',
                },
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
              data={ukhiyaReportData}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UkhiyaReport
