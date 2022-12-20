import React, {useEffect, useState } from 'react'
import {getData} from '../hooks/GetData'

export const Header = () => {

    const [state, setstate] = useState({
        loading:true,
        userImage:'http://localhost:4000/api/users/images/user-1671541029298.png'
    });

useEffect(() => {
    getData('/productos/detalle/5')
    .then(({data}) =>{
        setstate({
            loading:false,
            userImage:data.imagenes[0].url,
            userName:''
        })
    })
    .catch(()=>console.error)
}, []);

    return (
        <div className='Header' id='id_header'>
            <div className='HeaderAvatar' style={{ backgroundImage: `url('${state.userImage}')` }}></div>        
            <p>Administrador</p>
           
        </div>
    )
}
