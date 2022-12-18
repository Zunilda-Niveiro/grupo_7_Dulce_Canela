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
          lista:data.Users.map(function(user){return {...user,url:`http://localhost:4000/api/users/images/${user.avatar}`}})
        })
        setEdit(data.Users[0])
    })
    .catch(err=>console.log(err))
}, []);

const idUser = (ids) =>{
  setEdit(users.lista[ids])
  console.log('ajsdakjsdakjsdhk',users.lista[ids]);
}
  return (
    <div className='users'>

      <div className="userDetail">
        <div className="detail">
            <h2>{edit ? edit.firstname : ''}</h2>
            <div className='editImg' style={{ backgroundImage: `url('${edit ? edit.url: 'http://localhost:4000/api/users/images/userDefault.png'}')` }}></div>
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
