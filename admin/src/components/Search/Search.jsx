import React from 'react'
import './Search.css'

export const Search = ({searcher}) => {

    
  return (
    <div className='SearchBody'>
        <div className='groupSearch'>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input onChange={(e)=>searcher(e)} type="text" name="search" id="" placeholder='Buscar' />
        </div>
    </div>
  )
}
