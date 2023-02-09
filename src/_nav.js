import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPeople,
  cilStorage,
  cilSchool,
  cilUser,
  cilFile,
  cilRoom,
  cilLibrary,
  cilBook,
  cilColumns,
  cilColorBorder,
  cilInstitution,
  cilWc,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  {
    component: CNavTitle,
    name: 'Main Infomation',
  },

  {
    component: CNavGroup,
    name: 'School',
    to: '#',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All School',
        to: '/school/allschool',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Teacher',
    to: '#',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Teacher',
        to: '/teacher/all-teacher',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Student',
    to: '*',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Student',
        to: '/student/all-student',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Library',
    to: '#',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Library',
        to: '/library/all-library',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Book Captain',
    to: '#',
    icon: <CIcon icon={cilWc} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Book-Captain',
        to: '/library/all-bookcaptain',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Employee',
    to: '#',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Employee',
        to: '/employee/all-employee',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Collected Data',
  },
  {
    component: CNavGroup,
    name: 'BCO/I Data',
    to: '#',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'BCO/I Combined',
        to: '/bco/allbco-combined',
      },
      {
        component: CNavItem,
        name: 'BCO/I School',
        to: '/bco/allbco-school',
      },
      {
        component: CNavItem,
        name: 'BCO/I CRF',
        to: '/bco/allbco-crf',
      },
      {
        component: CNavItem,
        name: 'BCO/I School Report',
        to: '/bco/bco-school-quarterly',
      },
      {
        component: CNavItem,
        name: 'BCO/I CRF Report',
        to: '/bco/bco-crf-quarterly',
      },
      {
        component: CNavItem,
        name: 'Summarize Report School',
        to: '/bco/wfp-summarize',
      },
      {
        component: CNavItem,
        name: 'CFO Analysis School',
        to: '/bco/cfo-analysis',
      },
      {
        component: CNavItem,
        name: 'Ukhiya Report School',
        to: '/bco/ukhiya-report',
      },
      {
        component: CNavItem,
        name: 'Kutubdia Report School',
        to: '/bco/kutubdia-report',
      },
      {
        component: CNavItem,
        name: 'Summary Report CRF',
        to: '/bco/wfp-summary-crf',
      },
      {
        component: CNavItem,
        name: 'CFO Analysis CRF',
        to: '/bco/cfo-analysis-crf',
      },
      {
        component: CNavItem,
        name: 'Ukhiya Report CRF',
        to: '/bco/ukhiya-report-crf',
      },
      {
        component: CNavItem,
        name: 'Kutubdia Report CRF',
        to: '/bco/kutubdia-crf',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'BCO/I Community',
  //   to: '/',
  //   icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'All BCO/I data',
  //       to: '/base/accordion',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'Library Performance',
    to: '*',
    icon: <CIcon icon={cilColumns} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Library Observation',
        to: '/library/library-observation',
      },

      {
        component: CNavItem,
        name: 'Observation Report',
        to: '/base/construction',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Teacher Performance',
    to: '*',
    icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Bangla Class',
        to: '/bangla/bangla-class',
      },
      {
        component: CNavItem,
        name: 'SRM Class',
        to: '/srm/srm-class',
      },
      {
        component: CNavItem,
        name: 'Bangla Report',
        to: '/library/library-srm',
      },
      {
        component: CNavItem,
        name: 'SRM Report',
        to: '/base/construction',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'SRM Class',
  //   to: '/',
  //   icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'All SRM data',
  //       to: '/base/accordion',
  //     },
  //   ],
  // },
  {
    component: CNavGroup,
    name: 'School Performance',
    to: '*',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Overall School',
        to: '/school/overall-school',
      },
      {
        component: CNavItem,
        name: 'Overall School Report',
        to: '/base/construction',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
