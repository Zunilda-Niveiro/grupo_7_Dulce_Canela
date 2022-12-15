import React from 'react'
import  './HomeCards.css'
export const HomeCards = ({title,color,icon,data}) => {
  return (
    <div className='card_main'>
        <div className="cardBorde" style={{backgroundColor:color}}></div>
        <div className="cardBody">
          <span><i className={`fas fa-${icon}`}></i></span>
          <p>{title}</p >
          <span>{data}</span>
        </div>
    </div>
  )
}
