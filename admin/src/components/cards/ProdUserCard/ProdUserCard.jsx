import React, {useRef} from 'react'
import {Link} from 'react-router-dom'
import './ProdUserCard.css'

export const ProdUserCard = (product,colors) => {
let card = useRef()
const color = ()=>{
    card.current.style.backgroundColor=colors
}
const reset = ()=>{
    card.current.style.backgroundColor='#f0f0f0'
}
  return (
    <div>
        <div className="card" onMouseOver={color} onMouseLeave={reset} ref={card} >
            <div className="blob" ></div>
            <span className="img" style={{ backgroundImage: `url('${product.imagenes[0].url ? product.imagenes[0].url : ''}')` }}></span>
            <h2>{product.name}</h2>
            <p>
                <Link to={`/Products/${product.id}`}><i className="fas fa-edit" ></i></Link>
                <i className="fas fa-trash-alt"></i>
            </p>
        </div>
    </div>
  )
}
