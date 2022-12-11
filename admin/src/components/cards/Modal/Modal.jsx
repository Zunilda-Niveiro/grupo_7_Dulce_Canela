import React from 'react'
import './Modal.css'
function Modal({closeModal,title,explain,accept,imagen}) {
  function optionClick(opt) {
   
    console.log('-a-a-a-a',opt);
    if (opt) {
      accept(true);
      closeModal(false);
    }else{
      accept(false);
      closeModal(false);
    }
  }

  return (
    <div className='modalBackground'>
        <div className="modalContainer">
            <div className="titleCloseBtn">
                <button onClick={()=>closeModal(false)}> x </button>
            </div>
            <div className="title"><h2>{title}</h2></div>
            <div className="body">
             {imagen &&  <img src={imagen.borrar[1]} alt="" />}
            <p>{explain}</p>
            </div>
            <div className="footer">
                <button onClick={()=>optionClick(true)}>Aceptar</button>
                <button onClick={()=>optionClick(false)}>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default Modal