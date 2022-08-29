import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CLink,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import WidgetsDropdown2 from '../widgets/WidgetsDropDown2'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allBCOdata, setAllBCOdata] = useState([])
  const [allSchoolData, setAllSchoolData] = useState([])
  const [allTeacherData, setAllTeacherData] = useState([])
  const [allEmployeeData, setAllEmployeeData] = useState([])

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' })

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')
    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
    getAllSchool(console.log('get all school called'))
    getAllTeacher(console.log('get all teacher called'))
    getAllEmployee(console.log('get all employee called'))
  }, [])
  // Using useEffect to call the API once mounted and set the data

  // Filter Teacher data
  const headTeacherTrained = allTeacherData.filter((item) => item.headteacher_training === 'Yes')
  const instructG1Trained = allTeacherData.filter((item) => item.instruction_g1 === 'Yes')
  const instructG2Trained = allTeacherData.filter((item) => item.instruction_g2 === 'Yes')
  const srmPrimaryTrained = allTeacherData.filter(
    (item) => item.instruction_srm_preprimary === 'Yes',
  )
  const libraryTrained = allTeacherData.filter((item) => item.library_management_training === 'Yes')
  const goodGovornanceTrained = allTeacherData.filter(
    (item) => item.good_governance_headteacher === 'Yes',
  )
  const schoolPerformanceTrained = allTeacherData.filter(
    (item) => item.school_performance_headteacher === 'Yes',
  )

  // Filter Teacher data

  // Get All School Data
  const getAllSchool = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/schools', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllSchoolData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All School Data

  // Get All Employee Data
  const getAllEmployee = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/employees', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllEmployeeData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Employee Data

  // Get All Teacher
  const getAllTeacher = async () => {
    try {
      const response = await axios('http://118.179.80.51:8080/api/v1/teachers', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      setAllTeacherData(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Teacher

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
      setAllBCOdata(response.data)
      setIsLoading(false)
      console.log('Data:' + response)
    } catch (error) {
      console.log(error)
    }
  }
  // Get All Book-checkout Data for school

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'BCO/I School', value: '137', percent: 100, color: 'success' },
    { title: 'BCO/I Community', value: '24', percent: 20, color: 'info' },
    { title: 'Bangla Class', value: '78', percent: 60, color: 'warning' },
    { title: 'Library Observation', value: '22', percent: 80, color: 'danger' },
    { title: 'Library SRM', value: '13', percent: 40, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>
            <br></br>
            <div className="fs-5 fw-semibold">
              <p align="center">General Information</p>
            </div>
          </strong>
        </CCardHeader>
        <CCardBody>
          <WidgetsDropdown />
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {/* <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Demo Basic Information
              </h4>
              <div className="small text-medium-emphasis">January - July 2022</div>
            </CCol> */}
            {/* <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol> */}
          </CRow>
          {/* <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My First dataset',
                  backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                  borderColor: getStyle('--cui-info'),
                  pointHoverBackgroundColor: getStyle('--cui-info'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                  fill: true,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-danger'),
                  pointHoverBackgroundColor: getStyle('--cui-danger'),
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: [65, 65, 65, 65, 65, 65, 65],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          /> */}
        </CCardBody>
        {/* <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter> */}
      </CCard>

      {/* <WidgetsBrand withCharts /> */}

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>
                <br></br>
                <div className="fs-5 fw-semibold">
                  <p align="center">Performance</p>
                </div>
              </strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={24} md={12} xl={12}>
                  <CRow>
                    <CCol sm={3}>
                      <CLink href="/school/overall-school">
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <CButton>
                            <div className="fs-5 fw-semibold">School Performance(Overall)</div>
                          </CButton>

                          {/* <div className="text-medium-emphasis small">
                            Total Visited in {currentMonth}: 0
                          </div> */}
                        </div>
                      </CLink>
                    </CCol>
                    <CCol sm={3}>
                      <CLink href="/bangla/bangla-class">
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <CButton>
                            <div className="fs-5 fw-semibold">Teacher Performance(Bangla)</div>
                          </CButton>

                          {/* <div className="text-medium-emphasis small">
                            Total Visited in {currentMonth}: 0
                          </div> */}
                        </div>
                      </CLink>
                    </CCol>
                    <CCol sm={3}>
                      <CLink href="/library/library-combined">
                        <div className="border-start border-start-4 border-start-info py-1 px-3">
                          <CButton>
                            <div className="fs-5 fw-semibold">
                              Library Performance(Observation & SRM)
                            </div>
                          </CButton>

                          {/* <div className="text-medium-emphasis small">
                            Total Visited in {currentMonth}: 0
                          </div> */}
                        </div>
                      </CLink>
                    </CCol>
                    <CCol sm={3}>
                      <CLink href="/bco/allbco-combined">
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <CButton>
                            <div className="fs-5 fw-semibold">BCO/I (School & CRF)</div>
                          </CButton>

                          {/* <div className="text-medium-emphasis small">
                            Total Visited in {currentMonth}: 0
                          </div> */}
                        </div>
                      </CLink>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardBody>
          <CRow></CRow>
        </CCardBody>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <br></br>
              <div className="fs-5 fw-semibold">
                <p align="center">Traning</p>
              </div>
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="fs-5 fw-semibold">Headteacher Traning</div>
                        <div className="text-medium-emphasis small">
                          #Teacher: {headTeacherTrained.length}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Bangla G1 Traning</div>
                        <div className="text-medium-emphasis small">
                          #Teacher: {instructG1Trained.length}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Bangla G2 Traning</div>
                        <div className="text-medium-emphasis small">
                          #Teacher: {instructG2Trained.length}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Library Traning</div>
                        <div className="text-medium-emphasis small">
                          #Teacher: {libraryTrained.length}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Governence Traning</div>
                        <div className="text-medium-emphasis small">
                          #Teacher: {goodGovornanceTrained.length}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">School Performance Traning</div>
                        <div className="text-medium-emphasis small">
                          #Teacher: {schoolPerformanceTrained.length}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Student {' & '} Visit
              <br />
              <strong>Total Student: 11833</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={24} md={12} xl={12}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="fs-5 fw-semibold">Sr .LPO</div>
                        <div className="text-medium-emphasis small">#Visited: 5123</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">LPO</div>
                        <div className="text-medium-emphasis small">#Visited: 7135</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">LF</div>
                        <div className="text-medium-emphasis small">#Visited: 10135</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
      <CCard className="mb-4">
        <CCardBody>
          <CRow></CRow>
        </CCardBody>
      </CCard>

      {/* <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Status
              <br />
              <strong>Total School: {allSchoolData.length}</strong>
              <br />
              <strong>Total Library: 817</strong>
              <br />
              <strong>Total Teacher: {allTeacherData.length}</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={24} md={12} xl={12}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Teacher Status</div>
                        <div className="text-medium-emphasis small">#Developing: 0</div>
                        <div className="text-medium-emphasis small">#Functioning: 0</div>
                        <div className="text-medium-emphasis small">#Highly Functioning: 0</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Library Status</div>
                        <div className="text-medium-emphasis small">#Developing: 0</div>
                        <div className="text-medium-emphasis small">#Functioning: 0</div>
                        <div className="text-medium-emphasis small">#Highly Functioning: 0</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="fs-5 fw-semibold">School Status</div>
                        <div className="text-medium-emphasis small">#Developing: 0</div>
                        <div className="text-medium-emphasis small">#Functioning: 0</div>
                        <div className="text-medium-emphasis small">#Highly Functioning: 0</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
