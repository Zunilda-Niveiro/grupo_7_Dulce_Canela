import React from 'react'
import {Link} from 'react-router-dom'

export const SideBar = () => {
  return (
    <div className='SideBar'>
        <Link to="/"><img src="./images/logo2.png" alt="" /></Link>
        <ul>
            <li><Link to="/Users"><i class="fas fa-user-friends"></i>Usuarios</Link></li>
            <li><Link to="/Products"><i class="fas fa-shopping-bag"></i>Productos</Link></li>
            <li><Link to="/Categorias"><i class="fas fa-copy"></i>Categorias</Link></li>
            <li><Link to="/Temas"><i class="fas fa-palette"></i>Temas</Link></li>
        </ul>
    
    </div>
  )
}
