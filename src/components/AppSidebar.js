import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'
import { logo } from 'src/assets/brand/logo'
import { rtrlogo } from 'src/assets/brand/rtrlogo'
import { rtrlogosm } from 'src/assets/brand/rtrlogosm'
import rtrwfp from '../assets/images/rtrwfp.png'
import usdawfprtrwhite from '../assets/images/usdawfprtrwhite.png'

import { usdawfprtrlogo } from 'src/assets/brand/usdawfprtrlogo'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon
          className="sidebar-brand-full"
          icon={usdawfprtrlogo}
          height={35}
          width={200}
          alt="Logo"
        />
        {/* <CIcon className="sidebar-brand-full" icon={rtrlogo} height={35} /> */}
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
