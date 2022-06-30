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

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    console.log('use effect called')
    getAllBookCheckoutSchool(console.log('get bookcheckout called'))
    getAllSchool(console.log('get all school called'))
    getAllTeacher(console.log('get all teacher called'))
    getAllEmployee(console.log('get all employee called'))
  }, [])
  // Using useEffect to call the API once mounted and set the data
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
      <WidgetsDropdown />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Demo Basic Information
              </h4>
              <div className="small text-medium-emphasis">January - July 2022</div>
            </CCol>
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
          <CChartLine
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
          />
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
              School {' & '} Visit
              <br />
              <strong>Total School: {allSchoolData.length}</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={4}>
                      <CLink href="/bco/allbco">
                        <div className="border-start border-start-4 border-start-info py-1 px-3">
                          <div className="fs-5 fw-semibold">Library Observation</div>
                          <div className="text-medium-emphasis small">Total Visited: 0</div>
                        </div>
                      </CLink>
                    </CCol>
                    <CCol sm={4}>
                      <CLink href="/bco/allbco">
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="fs-5 fw-semibold">BCO/I School</div>
                          <div className="text-medium-emphasis small">
                            Total Visited: {allSchoolData.length}
                          </div>
                        </div>
                      </CLink>
                    </CCol>
                    <CCol sm={4}>
                      <CLink href="/bco/allbco">
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="fs-5 fw-semibold">BCO/I Community</div>
                          <div className="text-medium-emphasis small">Total Visited: 0</div>
                        </div>
                      </CLink>
                    </CCol>
                  </CRow>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={4}>
                      <CLink href="/bco/allbco">
                        <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                          <div className="fs-5 fw-semibold">Bangla Class</div>
                          <div className="text-medium-emphasis small">Total Visited: 0</div>
                        </div>
                      </CLink>
                    </CCol>
                    <CCol sm={4}>
                      <CLink href="/bco/allbco">
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="fs-5 fw-semibold">Library SRM</div>
                          <div className="text-medium-emphasis small">Total Visited: 0</div>
                        </div>
                      </CLink>
                    </CCol>
                    <CCol sm={4}>
                      <CLink href="/bco/allbco">
                        <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                          <div className="fs-5 fw-semibold">Overall School</div>
                          <div className="text-medium-emphasis small">Total Visited: 0</div>
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
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Teacher {' & '} Traning
              <br />
              <strong>Total Teacher: 833</strong>
            </CCardHeader>

            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="fs-5 fw-semibold">Headteacher Traning</div>
                        <div className="text-medium-emphasis small">#Teacher: 200</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Bangla G1 Traning</div>
                        <div className="text-medium-emphasis small">#Teacher: 400</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Bangla G2 Traning</div>
                        <div className="text-medium-emphasis small">#Teacher: 300</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Library Traning</div>
                        <div className="text-medium-emphasis small">#Teacher: 300</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Governence Traning</div>
                        <div className="text-medium-emphasis small">#Teacher: 600</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">SRM Traning</div>
                        <div className="text-medium-emphasis small">#Teacher: 200</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
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
      </CRow>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Status
              <br />
              <strong>Total School: 137</strong>
              <br />
              <strong>Total Library: 833</strong>
              <br />
              <strong>Total Teacher: 1083</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={24} md={12} xl={12}>
                  <CRow>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="fs-5 fw-semibold">School</div>
                        <div className="text-medium-emphasis small">#Developing: 100</div>
                        <div className="text-medium-emphasis small">#Functioning: 150</div>
                        <div className="text-medium-emphasis small">#Highly Functioning: 200</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Library</div>
                        <div className="text-medium-emphasis small">#Developing: 700</div>
                        <div className="text-medium-emphasis small">#Functioning: 150</div>
                        <div className="text-medium-emphasis small">#Highly Functioning: 300</div>
                      </div>
                    </CCol>
                    <CCol sm={4}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="fs-5 fw-semibold">Teacher</div>
                        <div className="text-medium-emphasis small">#Developing: 400</div>
                        <div className="text-medium-emphasis small">#Functioning: 250</div>
                        <div className="text-medium-emphasis small">#Highly Functioning: 100</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>

              {/* <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Employee</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Area</CTableHeaderCell>
                    <CTableHeaderCell>Visit Rate</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">EMP ID</CTableHeaderCell>
                    <CTableHeaderCell>View</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable> */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
