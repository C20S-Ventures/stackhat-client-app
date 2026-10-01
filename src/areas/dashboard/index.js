import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Content from '../../components/Content'
import { SubNav } from '../../components/navigation'
import NavLinkItem from '../../components/navigation/NavLinkItem'

import Home from './Home'

const Dashboard = () => {

  return (
    <div className={"activity"}>
      <SubNav mode="horizontal">
        <NavLinkItem to="/dashboard/home/" text="My Dashboard" icon="tachometer-alt" />
      </SubNav>
      <Content full={true}>
        <Routes>
          <Route index element={<Navigate to="home/" replace />} />
          <Route path='home/*' element={<Home />} />
        </Routes>
      </Content>
    </div>
  )
}

export default Dashboard
