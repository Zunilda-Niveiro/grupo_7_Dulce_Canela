import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import { Home } from '../pages/Home'
import { Root } from '../pages/Root'
import {Categorias} from '../pages/Categorias'
import {Products} from '../pages/Products'
import {Users} from '../pages/Users'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/Categorias' element={<Categorias/>}/>
            <Route path='/Products' element={<Products/>}/>
            <Route path='/Users' element={<Users/>}/>
        </Route>
    )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router}/>
  )
}
