import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Content from '../../components/Content'
import { SubNavArea, SubNav, NavLinkItem } from '../../components/navigation'

import Details from './Details'
import Password from './Password'
import Preferences from './Preferences'

const Account = () => {

  return (
    <div className="account">
      <SubNavArea>
        <SubNav>
          <NavLinkItem to="/account/details/" text="Personal Details" icon="user" />
          <NavLinkItem to="/account/password/" text="Change Password" icon="key" />
          <NavLinkItem to="/account/preferences/" text="Preferences" icon="user-check" />
        </SubNav>
      </SubNavArea>
      <Content>
        <Routes>
          <Route index element={<Navigate to="details/" replace />} />
          <Route path='details' element={<Details />} />
          <Route path='password' element={<Password />} />
          <Route path='preferences' element={<Preferences />} />
        </Routes>
      </Content>
    </div>
  )
}

export default Account
