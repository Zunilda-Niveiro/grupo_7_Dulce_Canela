import React, {useState,useEffect} from 'react'
import {getData} from '../../hooks/GetData'
import {UserCard} from './UserCard/UserCard'
import './Users.css'
export const Users = () => {

const [users, setUsers] = useState({});
const [edit , setEdit] = useState()
useEffect( () => {
  getData('/users','GET')
    .then(({data}) => {
      
        setUsers({
          total:data.Total_User,
          lista:data.Users.map(function(user){
            return {
            ...user,
            url:user.avatar ? `http://localhost:4000/api/users/images/${user.avatar}` : 'http://localhost:4000/api/users/images/userDefault.png',
            createdAt:user.createdAt.substr(0,10)
          }})
        })
        setEdit(data.Users[0])
    })
    .catch(err=>console.log(err))
}, []);

const idUser = (ids) =>{
  let use = users.lista.filter((user)=>user.id === ids)
  setEdit(use[0])
}
  return (
    <div className='users'>

      <div className="userDetail">
        <div className="detail">
            <h2>{edit ? edit.firstname : ''}, {edit ? edit.surname : ''}</h2>
            <div className='editImg' style={{ backgroundImage: `url('${ edit && edit.url ? edit.url : 'http://localhost:4000/api/users/images/userDefault.png'}')` }}><p></p></div>
            <p>Email: {edit ? edit.email : ''}</p>
            <p>Dirección: {edit ? edit.address : ''}</p>
            <p>{edit ? edit.createdAt : ''}</p>
            <div className='checkUser'>
              <select className='tipoUser' name="tipoUser" id="">
                <option  value="1" key="" selected={edit && (edit.rol_id === 1) ? true : null} >Usuario</option>
                <option  value="2" key="" selected={edit && (edit.rol_id === 2) ? true : null} >Administrador</option>
              </select>
              <i class="fa-regular fa-circle-check"></i>
              <i class="fa-solid fa-ban"></i>
            </div>
        </div>
      </div>
      <div className='userCardHome'>
        {
          users.lista && users.lista.map(user =>(
            <UserCard user={user} idUser={idUser}  key={user.id}  />
          ))
        }
        
      </div>
    </div>
  )
}
