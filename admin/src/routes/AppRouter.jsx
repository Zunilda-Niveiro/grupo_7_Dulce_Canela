import React from 'react'
import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import { Home } from '../pages/Home/Home'
import { Root } from '../pages/Root'
import {Categorias} from '../pages/Categorias/Categorias'
import {Products} from '../pages/Products/Products'
import {Users} from '../pages/Users/Users'
import ProductEdit from '../pages/Products/ProductEdit'

const router = createBrowserRouter(
    createRoutesFromElements(
          <Route path='/' element={<Root/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/Categorias' element={<Categorias/>}/>
            <Route path='/Products' element={<Products/>}/>
            <Route path='/Users' element={<Users/>}/>
            <Route path='/Products/:id' element={<ProductEdit/>}/>
       </Route>
    )
)

export const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  )
}
