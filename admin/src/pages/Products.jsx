import React, {useEffect,useState,useRef} from 'react'
import {Link} from 'react-router-dom'
import { getData } from '../hooks/GetData';

export const Products = () => {

/* inicialización de estados */
const [products, setProducts] = useState({ 
  loading:true,
  data:[],
  meta:[]
});
const [page, setPage] = useState(1)

/* capturar elementos */
const elModal = useRef(null) 

/* Carga inicial */
useEffect(() => {
  getData(`/productos?limit=16&page=${page}`)
 
    .then(({data,meta}) => {
        setProducts({
          ...products,
          loading:false,
          data:data,
          meta:meta
        })
    })
    
    .catch((error) => console.log(error))
}, []);

/*Funciones pagina siguiente y anterior  */
const paginaNext = async() => {

  let maxPage = Math.round(products.meta.total / 16)

  if (page < maxPage){
    let newPage= page + 1
    await setPage(newPage);
   
    getData(`/productos?limit=16&page=${newPage}`)
        .then((response) => {
          setProducts({
          ...products,
          loading:false,
          data:response.data
        })
    })
  }else{
    elModal.current.style.display='block';
  }
}
const paginaBack = async() => {

  if (page > 1){
    let newPage= page - 1
    await setPage(newPage);
   
    getData(`/productos?limit=16&page=${newPage}`)
        .then((response) => {
          setProducts({
          ...products,
          loading:false,
          data:response.data
        })
    })
  }else{
    elModal.current.style.display='block';
  }
}

/* Cierra modal */
function cerrar() {
  return elModal.current.style.display = 'none'
  
}
/* Actualizacion de estados */
useEffect(()=>{console.log('%cProductos actualizados','color:lightgreen')},[products])

/* Html */
  return (
    <div className='productos'>
       <div className="modal" ref={elModal}>
        <div className="modal-content">
            <span className="close" onClick={cerrar}>&times;</span>
            <p>No existen mas productos</p>
        </div>
      </div>

      {
        products.data.map((product, index) =>(
          <div className="card" key={index}>
            <div className="blob"></div>
            <span className="img" style={{ backgroundImage: `url('${product.imagenes[0].url}')` }}></span>
            <h2>{product.name}</h2>
            <p>
              <Link to={`/Products/${index+1}`}><i className="fas fa-edit" ></i></Link>
              <i className="fas fa-trash-alt"></i>
            </p>
          </div>
        ))
      }

      <div className='controls'>
        <button className='button'onClick={paginaBack}>Anterior</button>
          <ul>
            <li>{page}</li>
          </ul>
          <button className='button'onClick={paginaNext}>Siguiente</button>
      </div>
    </div>
  )
}
