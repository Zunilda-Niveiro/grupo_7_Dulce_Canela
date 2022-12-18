import React from 'react'

import './UserCard.css'


export const UserCard = ({user ,idUser}) => {

const styles = {
    border: '5px solid gold', 
};

  return (
    <div>
        <div className="card" style={user.rol_id === 2 ? styles : null}>
            <div className="blob" ></div>
            <span className="img" style={{ backgroundImage: `url('${user.url}')` }}></span>
            <h2>{`${user.firstname} ${user.surname}`}</h2>
            <p>
                <i className="fas fa-edit" onClick={()=>idUser(user.id)}></i>
                <i className="fas fa-trash-alt"></i>
            </p>
        </div>
    </div>
  )
}
