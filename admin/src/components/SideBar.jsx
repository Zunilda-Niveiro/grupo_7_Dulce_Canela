import React from 'react'
import {Link} from 'react-router-dom'


export const SideBar = () => {
  return (
    <div className='SideBar'>
        <Link to="/"><img src="./images/logo2.png" alt="" /></Link>
        <ul>
            <li><Link to="/Users"><i className="fas fa-user-friends"></i>Usuarios</Link></li>
            <li><Link to="/Products"><i className="fas fa-shopping-bag"></i>Productos</Link></li>
            <li><Link to="/Categorias"><i className="fas fa-copy"></i>Categorias</Link></li>
            <li><Link to="/Temas"><i className="fas fa-palette"></i>Temas</Link></li>
        </ul>
      
    </div>
  )
}
