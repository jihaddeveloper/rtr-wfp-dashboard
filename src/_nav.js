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
import { colors } from '@mui/material'

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
    name: 'General Infomation',
  },

  {
    component: CNavGroup,
    name: 'District',

    to: '#',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All District',
        to: '/di/base/district',
      },
      // {
      //   component: CNavItem,
      //   name: 'Moulvibazar',
      //   to: '/di/base/district',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Narail',
      //   to: '/di/base/district',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Coxsbazar',
      //   to: '/di/base/district',
      // },
    ],
  },

  {
    component: CNavGroup,
    name: 'School',
    to: '#',
    icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PREVAIL School Narail',
        to: '/school/p-school',
      },
      // {
      //   component: CNavItem,
      //   name: 'LP School Moulvibazar',
      //   to: '/school/allschool',
      // },
      // {
      //   component: CNavItem,
      //   name: 'LP School Narail',
      //   to: '/school/allschool',
      // },
      // {
      //   component: CNavItem,
      //   name: 'LP School Coxsbazar',
      //   to: '/school/allschool',
      // },
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
        name: 'PREVAIL Teacher Narail',
        to: '/teacher/all-teacher',
      },
      // {
      //   component: CNavItem,
      //   name: 'LP Teacher Moulvibazar',
      //   to: '/teacher/all-teacher',
      // },
      // {
      //   component: CNavItem,
      //   name: 'LP Teacher Narail',
      //   to: '/teacher/all-teacher',
      // },

      // {
      //   component: CNavItem,
      //   name: 'LP Teacher Coxsbazar',
      //   to: '/teacher/all-teacher',
      // },
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
        name: 'PREVAIL-Narail',
        to: '/student/all-student',
      },
      // {
      //   component: CNavItem,
      //   name: 'Coxsbazar',
      //   to: '/student/all-student',
      // },
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
        name: 'Coxsbazar',
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
        name: 'Coxsbazar',
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
        name: 'Coxsbazar',
        to: '/employee/all-employee',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'PREVAIL INFO',
    to: '#',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'School',
        to: '/prevail/p-school',
      },
      {
        component: CNavItem,
        name: 'Teacher',
        to: '/prevail/p-teacher',
      },
      {
        component: CNavItem,
        name: 'Employee',
        to: '/prevail/p-employee',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Observation & Performance',
  },
  {
    component: CNavGroup,
    name: 'PREVAIL Observation',
    to: '*',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Prevail Bangla',
        to: '/bangla/p-bangla-detail',
      },
      {
        component: CNavItem,
        name: 'Prevail Preprimary',
        to: '/prevail/p-preprimary',
      },
      {
        component: CNavItem,
        name: 'Prevail Library',
        to: '/prevail/p-library-observation',
      },
      {
        component: CNavItem,
        name: 'Prevail LF',
        to: '/prevail/p-lf-observation-detail',
      },
      {
        component: CNavItem,
        name: 'Prevail BCO',
        to: '/prevail/p-bco',
      },
      {
        component: CNavItem,
        name: 'Milestone-2025',
        to: '/prevail/p-milestone-25',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Teacher Performance',
    to: '*',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Bangla Observation',
        to: '/bangla/di-bangla-class',
      },
      {
        component: CNavItem,
        name: 'Moulvibazar',
        to: '/bangla/di-bangla-mfo',
      },
      {
        component: CNavItem,
        name: 'Narail',
        to: '/bangla/di-bangla-nrfo',
      },
      {
        component: CNavItem,
        name: 'Report Coxsbazar',
        to: '/bangla/bangla-class-report',
      },

      // {
      //   component: CNavItem,
      //   name: 'SRM Class',
      //   to: '/srm/srm-class',
      // },
      // {
      //   component: CNavItem,
      //   name: 'SRM Report',
      //   to: '/base/construction',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Preprimary Class',
      //   to: '/preprimary/preprimary-class',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Preprimary Report',
      //   to: '/base/construction',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'BCO/I Data',
    to: '#',
    icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'PREVAIL Library',
        to: '/bco/di-mfo',
      },
      {
        component: CNavItem,
        name: 'Moulvibazar',
        to: '/bco/di-mfo',
      },
      {
        component: CNavItem,
        name: 'Narail',
        to: '/bco/di-nrfo',
      },
      {
        component: CNavItem,
        name: 'BCO Analysis',
        to: '/bco/di-bco-analysis',
      },
      // {
      //   component: CNavItem,
      //   name: 'Combined',
      //   to: '/bco/allbco-combined',
      // },
      // {
      //   component: CNavItem,
      //   name: 'School',
      //   to: '/bco/allbco-school',
      // },
      // {
      //   component: CNavItem,
      //   name: 'CRF',
      //   to: '/bco/allbco-crf',
      // },
      // {
      //   component: CNavItem,
      //   name: 'School Summry Monthly',
      //   to: '/bco/bco-school-monthly',
      // },
      // {
      //   component: CNavItem,
      //   name: 'School Summry Quarterly',
      //   to: '/bco/bco-school-quarterly',
      // },

      // {
      //   component: CNavItem,
      //   name: 'Analysis By School',
      //   to: '/bco/analyasis-by-school',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Outcome Indicator',
      //   to: '/bco/outcome-indicator',
      // },

      // {
      //   component: CNavItem,
      //   name: 'Summarize School',
      //   to: '/bco/wfp-summarize',
      // },
      // {
      //   component: CNavItem,
      //   name: 'CFO Analysis School',
      //   to: '/bco/cfo-analysis',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Ukhiya Report School',
      //   to: '/bco/ukhiya-report',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Kutubdia Report School',
      //   to: '/bco/kutubdia-report',
      // },
      // {
      //   component: CNavItem,
      //   name: 'CRF Report',
      //   to: '/bco/bco-crf-quarterly',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Summary Report CRF',
      //   to: '/bco/wfp-summary-crf',
      // },
      // {
      //   component: CNavItem,
      //   name: 'CFO Analysis CRF',
      //   to: '/bco/cfo-analysis-crf',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Ukhiya Report CRF',
      //   to: '/bco/ukhiya-report-crf',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Kutubdia Report CRF',
      //   to: '/bco/kutubdia-crf',
      // },
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
        name: 'All Library Observation',
        to: '/library/di-library-observation',
      },
      {
        component: CNavItem,
        name: 'Moulvibazar',
        to: '/library/di-library-observation-mfo',
      },
      {
        component: CNavItem,
        name: 'Narail',
        to: '/library/di-library-observation-nrfo',
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
        name: 'Moulvibazar',
        to: '/school/school-monitoring',
      },
      {
        component: CNavItem,
        name: 'Narail',
        to: '/school/school-monitoring',
      },
      {
        component: CNavItem,
        name: 'All School Montoring',
        to: '/school/school-monitoring',
      },
      {
        component: CNavItem,
        name: 'School Montoring Report',
        to: '/base/construction',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Custom Project Information',
  },

  {
    component: CNavGroup,
    name: 'All Information',
    to: '#',
    icon: <CIcon icon={cilRoom} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'WFP Project Coxsbazar',
        to: '/dashboard-wfp',
      },
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: 'Collected Data Moulvibazar',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Teacher Performance',
  //   to: '*',
  //   icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Bangla Class',
  //       to: '/bangla/bangla-class',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Bangla Report',
  //       to: '/bangla/bangla-class-report',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'SRM Class',
  //       to: '/srm/srm-class',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'SRM Report',
  //       to: '/base/construction',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Preprimary Class',
  //       to: '/preprimary/preprimary-class',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Preprimary Report',
  //       to: '/base/construction',
  //     },
  //   ],
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Collected Data Narail',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Teacher Performance',
  //   to: '*',
  //   icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Bangla Class',
  //       to: '/bangla/bangla-class',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Bangla Report',
  //       to: '/bangla/bangla-class-report',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'SRM Class',
  //       to: '/srm/srm-class',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'SRM Report',
  //       to: '/base/construction',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Preprimary Class',
  //       to: '/preprimary/preprimary-class',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Preprimary Report',
  //       to: '/base/construction',
  //     },
  //   ],
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Base',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Accordion',
  //       to: '/base/accordion',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Navs & Tabs',
  //       to: '/base/navs',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Placeholders',
  //       to: '/base/placeholders',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Progress',
  //       to: '/base/progress',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Spinners',
  //       to: '/base/spinners',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Buttons',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Dropdowns',
  //       to: '/buttons/dropdowns',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
]

export default _nav
