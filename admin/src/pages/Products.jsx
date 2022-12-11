import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import  Modal from '../components/cards/Modal/Modal';
import { getData } from '../hooks/GetData';

export const Products = () => {

/* inicialización de estados */
const [products, setProducts] = useState({ 
  loading:true,
  data:[],
  meta:[]
});
const [page, setPage] = useState(1)
const [openModal,setOpenModal] = useState(false)

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
    setOpenModal(true)
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
    setOpenModal(true)
  }
}

/* Actualizacion de estados */
useEffect(()=>{console.log('%cProductos actualizados','color:lightgreen')},[products])

/* Html */
  return (
    <div className='productos'>
      
      {openModal && <Modal 
        closeModal={setOpenModal} 
        title={'Atención'}
        explain={'No hay mas productos para navegar'}
        />}

      {
        products.data.map((product, index) =>(
          <div className="card" key={product.id}>
            <div className="blob"></div>
            <span className="img" style={{ backgroundImage: `url('${product.imagenes[0].url}')` }}></span>
            <h2>{product.name} <br/> {product.id + 1}</h2>
            <p>
              <Link to={`/Products/${product.id}`}><i className="fas fa-edit" ></i></Link>
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
