import { element } from 'prop-types'
import React from 'react'

import DIBanglaClassDataDetail from './views/base/bangla/DIBanglaClassDataDetail'

const DashboardWFP = React.lazy(() => import('./views/dashboard/DashboardWFP'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const UnderConstruction = React.lazy(() => import('./views/base/accordion/UnderConstruction'))

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))

// Base
const AllStudent = React.lazy(() => import('./views/base/student/AllStudent'))
const AllLibrary = React.lazy(() => import('./views/base/library/AllLibrary'))
const AllSchool = React.lazy(() => import('./views/base/school/AllSchool'))
const AllTeacher = React.lazy(() => import('./views/base/teacher/AllTeacher'))
const AllEmployee = React.lazy(() => import('./views/base/employee/AllEmployee'))
const AllTraining = React.lazy(() => import('./views/base/training/AllTraining'))
// Base

// Overall School
const OverallSchoolData = React.lazy(() => import('./views/base/school/OverallSchoolData'))
const OverallSchoolReport = React.lazy(() => import('./views/base/school/OverallSchoolReport'))
// Overall School

// School Monitoring
const SchoolMonitoringData = React.lazy(() => import('./views/base/school/DISchoolMonitoringData'))
const SchoolMonitoringMFO = React.lazy(() => import('./views/base/school/DISchoolMonitoringMFO'))
const SchoolMonitoringNrFO = React.lazy(() =>
  import('./views/base/school/DISchoolMonitoringDataNrFO'),
)
// School Monitoring

// BCO/I
const AllBCOSchool = React.lazy(() => import('./views/base/bco/AllBCOSchool'))
const AllBCOCRF = React.lazy(() => import('./views/base/bco/AllBCOCRF'))
const AllBCOCombined = React.lazy(() => import('./views/base/bco/AllBCOCombined'))

const AnalysisBCODI = React.lazy(() => import('./views/base/bco/AnalysisBCODI'))
// BCO/I

// Library
const LibraryDataCombined = React.lazy(() => import('./views/base/library/LibraryDataCombined'))
const LibraryObservation = React.lazy(() => import('./views/base/library/LibraryObservation'))
const LibrarySRM = React.lazy(() => import('./views/base/library/LibrarySRM'))
const AllBookCaptain = React.lazy(() => import('./views/base/library/AllBookCaptain'))

const DILibraryObservation = React.lazy(() => import('./views/base/library/DILibraryObservation'))
const DILibraryObservationMFO = React.lazy(() =>
  import('./views/base/library/DILibraryObservationMFO'),
)
const DILibraryObservationNrFO = React.lazy(() =>
  import('./views/base/library/DILibraryObservationNrFO'),
)
// Library

// Bangla
const BanglaClassData = React.lazy(() => import('./views/base/bangla/BanglaClassData'))
const BanglaClassReport = React.lazy(() => import('./views/base/bangla/BanglaClassReport'))
const DIBanglaClassData = React.lazy(() => import('./views/base/bangla/DIBanglaClassDataDetail'))
const DIBanglaMFO = React.lazy(() => import('./views/base/bangla/DIBanglaMFO'))
const DIBanglaNrFO = React.lazy(() => import('./views/base/bangla/DIBanglaNrFO'))
// Bangla

// SRM
const SRMCalss = React.lazy(() => import('./views/base/srm/SRMClass'))
// SRM

// Preprimary
const PreprimaryClassData = React.lazy(() => import('./views/base/preprimary/PreprimaryClassData'))
const PreprimaryClassReport = React.lazy(() =>
  import('./views/base/preprimary/PreprimaryClassReport'),
)
// Preprimary

// Report

// BCO
const BCOMFO = React.lazy(() => import('./views/base/bco/BCOMFO'))
const BCONrFO = React.lazy(() => import('./views/base/bco/BCONrFO'))

const BCOSchoolQuarterly = React.lazy(() => import('./views/base/bco/BCOSchoolQuarterly'))
const BCOSchoolMonthly = React.lazy(() => import('./views/base/bco/BCOSchoolMonthly'))
const BCOCRFQuarterly = React.lazy(() => import('./views/base/bco/BCOCRFQuarterly'))
const WFPSummarizeBCO = React.lazy(() => import('./views/base/bco/WFPSummarizeBCO'))
const CFOAnalysisBCO = React.lazy(() => import('./views/base/bco/CFOAnalysisBCO'))
const UkhiyaReport = React.lazy(() => import('./views/base/bco/UkhiyaReport'))
const KutubdiaReport = React.lazy(() => import('./views/base/bco/KutubdiaReport'))
const AnalysisBCO = React.lazy(() => import('./views/base/bco/AnalysisBCO'))
const AnalysisBySchool = React.lazy(() => import('./views/base/bco/AnalysisBySchool'))
const OutcomeIndicatorBCO = React.lazy(() => import('./views/base/bco/OutcomeIndicator'))

const WFPSummaryBCOCRF = React.lazy(() => import('./views/base/bco/WFPSummaryBCOCRF'))
const CFOAnalysisBCOCRF = React.lazy(() => import('./views/base/bco/CFOAnalysisBCOCRF'))
const UkhiyaReportCRF = React.lazy(() => import('./views/base/bco/UkhiyaReportCRF'))
const KutubdiaReportCRF = React.lazy(() => import('./views/base/bco/KutubdiaReportCRF'))
// BCO

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))
// Base

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const District = React.lazy(() => import('./views/base/district/District'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', element: Login },
  { path: '/register', name: 'Register', element: Register },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard-wfp', name: 'DashboardWFP', element: DashboardWFP },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  { path: '/school/allschool', name: 'AllSchool', element: AllSchool },
  { path: '/school/overall-school', name: 'OverallSchoolData', element: OverallSchoolData },
  {
    path: '/school/overall-school-report',
    name: 'OverallSchoolReport',
    element: OverallSchoolReport,
  },

  {
    path: '/school/school-monitoring',
    name: 'SchoolMonitoringData',
    element: SchoolMonitoringData,
  },
  {
    path: '/school/school-monitoring-mfo',
    name: 'SchoolMonitoringMFO',
    element: SchoolMonitoringMFO,
  },
  {
    path: '/school/school-monitoring-nrfo',
    name: 'SchoolMonitoringNrFO',
    element: SchoolMonitoringNrFO,
  },

  { path: '/bco/di-mfo', name: 'BCOMFO', element: BCOMFO },
  { path: '/bco/di-nrfo', name: 'BCONrFO', element: BCONrFO },
  { path: '/bco/di-bco-analysis', name: 'AnalysisBCODI', element: AnalysisBCODI },

  { path: '/bco/allbco-combined', name: 'AllBCOCombined', element: AllBCOCombined },
  { path: '/bco/allbco-school', name: 'AllBCOSchool', element: AllBCOSchool },
  { path: '/bco/allbco-crf', name: 'AllBCOCRF', element: AllBCOCRF },

  { path: '/bco/bco-school-quarterly', name: 'BCOSchoolQuarterly', element: BCOSchoolQuarterly },
  { path: '/bco/bco-school-monthly', name: 'BCOSchoolMonthly', element: BCOSchoolMonthly },
  { path: '/bco/bco-crf-quarterly', name: 'BCOCRFQuarterly', element: BCOCRFQuarterly },

  { path: '/bco/wfp-summarize', name: 'WFPSummarize', element: WFPSummarizeBCO },
  { path: '/bco/cfo-analysis', name: 'CFOAnalysisBCO', element: CFOAnalysisBCO },
  { path: '/bco/kutubdia-report', name: 'KutubdiaReport', element: KutubdiaReport },
  { path: '/bco/ukhiya-report', name: 'UkhiyaReport', element: UkhiyaReport },
  { path: '/bco/analyasis-bco-school', name: 'AnalysisBCO', element: AnalysisBCO },
  { path: '/bco/analyasis-by-school', name: 'AnalysisBySchool', element: AnalysisBySchool },
  { path: '/bco/outcome-indicator', name: 'OutcomeIndicatorBCO', element: OutcomeIndicatorBCO },

  { path: '/bco/wfp-summary-crf', name: 'WFPSummaryBCOCRF', element: WFPSummaryBCOCRF },
  { path: '/bco/cfo-analysis-crf', name: 'CFOAnalysisBCOCRF', element: CFOAnalysisBCOCRF },
  { path: '/bco/ukhiya-report-crf', name: 'UkhiyaReportCRF', element: UkhiyaReportCRF },
  { path: '/bco/kutubdia-report-crf', name: 'KutubdiaReportCRF', element: KutubdiaReportCRF },

  { path: '/student/all-student', name: 'AllStudent', element: AllStudent },
  { path: '/teacher/all-teacher', name: 'AllTeacher', element: AllTeacher },
  { path: '/employee/all-employee', name: 'AllEmployee', element: AllEmployee },
  { path: '/training/all-training', name: 'AllTraining', element: AllTraining },
  { path: '/library/all-library', name: 'AllLibrary', element: AllLibrary },

  { path: '/library/library-combined', name: 'LibraryCombined', element: LibraryDataCombined },
  { path: '/library/library-observation', name: 'LibraryObservation', element: LibraryObservation },
  { path: '/library/library-srm', name: 'LibrarySRM', element: LibrarySRM },

  {
    path: '/library/di-library-observation',
    name: 'DILibraryObservation',
    element: DILibraryObservation,
  },

  {
    path: '/library/di-library-observation-mfo',
    name: 'DILibraryObservationMFO',
    element: DILibraryObservationMFO,
  },

  {
    path: '/library/di-library-observation-nrfo',
    name: 'DILibraryObservationNrFO',
    element: DILibraryObservationNrFO,
  },

  { path: '/library/all-bookcaptain', name: 'AllBookCaptain', element: AllBookCaptain },

  { path: '/base/construction', name: 'UnderConstruction', element: UnderConstruction },

  { path: '/bangla/bangla-class', name: 'BanglaClassData', element: BanglaClassData },
  { path: '/bangla/bangla-class-report', name: 'BanglaClassReport', element: BanglaClassReport },

  { path: '/bangla/di-bangla-class', name: 'DIBanglaClassData', element: DIBanglaClassData },
  { path: '/bangla/di-bangla-mfo', name: 'DIBanglaMFO', element: DIBanglaMFO },
  { path: '/bangla/di-bangla-nrfo', name: 'DIBanglaNrFO', element: DIBanglaNrFO },

  {
    path: '/preprimary/preprimary-class',
    name: 'PreprimaryClassData',
    element: PreprimaryClassData,
  },
  {
    path: '/preprimary/preprimary-class-report',
    name: 'PreprimaryClassReport',
    element: PreprimaryClassReport,
  },

  { path: '/srm/srm-class', name: 'SRMClass', element: SRMCalss },

  { path: '/di/base/district', name: 'District', element: District },
]

export default routes
