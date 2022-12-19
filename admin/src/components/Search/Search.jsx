import React, {useState} from 'react'
import './Search.css'

export const Search = ({user,sendUser}) => {
const [search, setSearch] = useState("");


const handleSearch = (e)=>{
  setSearch(e.target.value)
}
const rowClick = (e) =>{
  let pon =e.target.textContent.split(' ')
  sendUser(pon[1])
  setSearch("")
}
const results = !search ? '' : user.lista.filter((dato)=> dato.surname.toLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div className='SearchBody'>
        <div className='groupSearch'>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input value={search} onChange={handleSearch} type="text" name="search" id="" placeholder='Buscar' />
           <tbody className='bodyTable'>
          {
             results &&  results.map((data)=>(
                <tr className='row' key={data.id} >
                  <td onClick={rowClick}>{data.surname} <b>{data.id}</b> </td>
                </tr>
              ))
            }
           </tbody>
        </div>
    </div>
  )
}
