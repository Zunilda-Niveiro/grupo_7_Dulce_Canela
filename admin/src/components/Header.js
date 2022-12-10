import React, { useEffect, useState } from 'react'
import {Fetch} from '../hooks/Fetch'
export const Header = () => {

    const [state, setstate] = useState({
        loading:true,
        userImage:'/images/userDefault.png'
    });

    const getData = async (endpoint) =>{
        try {
            let response = await Fetch(endpoint)
            return response;
        } catch (error) {
            console.log(error)
        }
    }

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
        <div className='Header'>
            <div className='HeaderAvatar' style={{ backgroundImage: `url('${state.userImage}')` }}></div>        
            <p>Usuario</p>
        </div>
    )
}
