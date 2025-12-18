import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import { logo } from 'src/assets/brand/logo'
import { rtrlogo } from 'src/assets/brand/rtrwfpnewlogo'
import { rtrlogosm } from 'src/assets/brand/rtrlogosm'
import rtrwfp from '../assets/images/rtrwfp.png'
import usdawfprtrwhite from '../assets/images/usdawfprtrwhite.png'

import { usdawfprtrlogo } from 'src/assets/brand/usdawfprtrlogo'

import { rtr } from 'src/assets/brand/rtr'
import { rtr24 } from 'src/assets/brand/rtr24'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { rtr25 } from 'src/assets/brand/rtr25'

const customVars = {
  '--cui-sidebar-bg': '#333333', // Your desired background color
  '--cui-sidebar-color': '#131212ff', // Your desired text color
  '--cui-sidebar-nav-title-color': '#fff',
  '--cui-sidebar-toggler-color': '#fff',
  '--cui-sidebar-nav-link-hover-color': '#fff',
}

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      style={customVars}
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={rtr25} height={60} width={300} alt="Logo" />
        {/* <CIcon className="sidebar-brand-full" icon={rtrnew} height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" icon={rtrlogosm} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
