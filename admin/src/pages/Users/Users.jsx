import React, {useState,useEffect,useRef} from 'react'
import { Search } from '../../components/Search/Search'
import {getData} from '../../hooks/GetData'
import {UserCard} from './UserCard/UserCard'
import './Users.css'
export const Users = () => {

const [users, setUsers] = useState({});
const [edit , setEdit] = useState()

let save = useRef()
let cancel = useRef()
let user =useRef()
let admin = useRef()


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
useEffect(() => {
 console.log('productos actualizado')
}, [users]);

const idUser = (ids) =>{
  let use = users.lista.filter((user)=>user.id === ids)
  setEdit(use[0])
}
const handleSelect =() =>{
  save.current.style.display='block'
  cancel.current.style.display='block'
}
const changeDisplay =() =>{
  save.current.style.display='none'
  cancel.current.style.display='none'
  if (edit.rol_id === 1) {
    user.current.selected=true
  }else{
    admin.current.selected=true
  }
}
const saveUser = async () =>{
  await getData(`/users/change/${edit.id}`,'PATCH')
    .then(result =>{
      console.log('resultado:',result);
    })
    .catch(err => console.log(err))
  window.location.reload()
}
const sendUser = (a) =>{
  let usuari = users.lista.filter((item)=>item.id === +a)
  setEdit(usuari[0])
}
  return (
    <div className='users'>  
      <div className="userDetail">
        <Search user={users} sendUser={sendUser}/>
        <div className="detail" onMouseLeave={changeDisplay}>
            <h2>{edit ? edit.firstname : ''}, {edit ? edit.surname : ''}</h2>
            <div className='editImg' style={{ backgroundImage: `url('${ edit && edit.url ? edit.url : 'http://localhost:4000/api/users/images/userDefault.png'}')` }}><p></p></div>
            <p>Email: {edit ? edit.email : ''}</p>
            <p>Dirección: {edit ? edit.address : ''}</p>
            <p>{edit ? edit.createdAt : ''}</p>
            <div className='checkUser'>
              <select className='tipoUser' name="tipoUser" id="" onChange={handleSelect}>
                <option ref={user} value="1" key="user" selected={edit && (edit.rol_id === 1) ? true : null} >Usuario</option>
                <option ref={admin} value="2" key="admin" selected={edit && (edit.rol_id === 2) ? true : null} >Administrador</option>
              </select>
              <div className='buttonsUser'>
                <i className="fa-regular fa-circle-check etaoNo" onClick={saveUser} ref={save} ></i>
                <i className="fa-solid fa-ban etaoNo" onClick={changeDisplay} ref={cancel}></i>
              </div>
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
