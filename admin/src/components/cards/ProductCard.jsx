import React from 'react'

export const ProductCard = ({name,imagenes}) => {
  return (
    <div className="card">
        <div className="blob"></div>
        <span className="img" style={{ backgroundImage: `url('${imagenes[0].url}')` }}></span>
        <h2>{name}</h2>
        <p>
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt"></i>
        <i className="fas fa-external-link-alt"></i>
        </p>
    </div>
  )
}
