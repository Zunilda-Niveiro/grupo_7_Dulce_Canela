import React, {useRef,useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getData } from '../../../hooks/GetData'
import Modal from '../Modal/Modal'
import './ProdUserCard.css'


export const ProdUserCard = (product,colors) => {
    let history = useNavigate()
    const [openModal,setOpenModal] = useState({
        isOpen:false,
        title:'',
        explain:'',
        imagen:[],
        accept:false
    })
let card = useRef()

const eliminar = () =>{
    setOpenModal({
        isOpen:true,
        title:'Advertencia:',
        explain:'Esto eliminara el producto permanentemente',
        imagen:[],
        accept:false
    })
}
useEffect(() => {
    if (openModal.accept) {
        product.imagenes.forEach(img => {
            getData(`/deleteImage`,'DELETE',{id:img.id,url:img.url})
            .then(result => console.log(result))
            .catch(err => console.log(err))
        });
        
        getData(`/productos/remove/${product.id}`,'DELETE')
            .then(result => console.log(result))
            .catch(err => console.log(err))
        setOpenModal({  isOpen:false,
            title:'Advertencia:',
            explain:'Esto eliminara el producto permanentemente',
            imagen:[],
            accept:false})
          
            history('/')
    }
 
}, [openModal]);
  return (
    <div>
        {openModal.isOpen && <Modal 
            closeModal={(auxi)=>setOpenModal({ isOpen:auxi,
                title:openModal.title,
                explain:openModal.explain,
                imagen:openModal.imagen,
                accept:openModal.accept})} 
            options={openModal}
            accept={(aux)=>setOpenModal({ isOpen:openModal.isOpen,
                title:openModal.title,
                explain:openModal.explain,
                imagen:openModal.imagen,
                accept:aux})} 
            />}
        <div className="cardX"  ref={card} >
            <div className="blob" ></div>
            <span className="img" style={{ backgroundImage: `url('${product.imagenes && product.imagenes[0] ? product.imagenes[0].url : ''}')` }}></span>
            <h2>{product.name}</h2>
            <p>
                <Link to={`/Products/${product.id}`}><i className="fas fa-edit" ></i></Link>
                <i className="fas fa-trash-alt" onClick={eliminar}></i>
            </p>
        </div>
    </div>
  )
}
