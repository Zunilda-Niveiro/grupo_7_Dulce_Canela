import React from 'react'
import  {Header} from '../components/Header'
import  {SideBar} from '../components/SideBar'
import  {Footer} from '../components/Footer'
import { Home } from './Home'
import {Outlet} from 'react-router-dom'

export const Root = () => {
  return (
    <div className='BodyHome'>
        <Header/>
        <SideBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
