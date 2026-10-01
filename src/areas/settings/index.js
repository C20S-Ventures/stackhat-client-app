import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Content from '../../components/Content'
import { SubNavArea, SubNav } from '../../components/navigation'
import NavLinkItem from '../../components/navigation/NavLinkItem'

import Dashboard from './Dashboard'
import Users from './Users'
import Theme from './Theme'
import ExternalIdentity from './ExternalIdentity'

const Settings = () => (

  <div>
    <SubNavArea>
      <SubNav bsStyle="pills" stacked>
        <NavLinkItem to="/settings/dashboard/" text="Dashboard" icon="tachometer-alt" />
        <NavLinkItem to="/settings/users/" text="Users" icon="users" />
        <NavLinkItem to="/settings/theme/" text="Logo &amp; Colours" icon="swatchbook" />
        <NavLinkItem to="/settings/external-identity/" text="External Identity Provider" icon="passport" />
      </SubNav>
    </SubNavArea>

    <Content>
      <Routes>
        <Route index element={<Navigate to="dashboard/" replace />} />
        <Route path='dashboard/*' element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='users/:id' element={<Users />} />
        <Route path='theme' element={<Theme />} />
        <Route path='external-identity' element={<ExternalIdentity />} />
      </Routes>
    </Content>
  </div>

)

export default Settings
