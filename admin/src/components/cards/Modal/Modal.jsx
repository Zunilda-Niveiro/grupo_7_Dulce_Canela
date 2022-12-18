import React from 'react'
import './Modal.css'


function Modal({closeModal,options,accept}) {
  let {title,explain,imagen} = options
  return (
    <div className='modalBackground'>
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={()=>closeModal(false)}> x </button>
            </div>
            <div className="title"><h2>{title}</h2></div>
            <div className="body">
             {imagen.length === 0 ? <img className='bodyImg' src='http://localhost:3000/images/stop.bmp' alt="" /> : <img className='bodyImg' src={imagen} alt="" />}
            <p className="title">{explain}</p>
            </div>
            <div className="footer">
                <button onClick={()=>accept(true)}>Aceptar</button>
                <button onClick={()=>closeModal(false)}>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default Modal