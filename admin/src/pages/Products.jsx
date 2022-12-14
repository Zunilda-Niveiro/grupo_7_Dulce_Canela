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
const [openModal,setOpenModal] = useState({
  isOpen:false,
  title:'',
  explain:'',
  imagen:[],
  accept:false
})

/* Carga inicial Productos*/
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
    setOpenModal({
      isOpen:true,
      title:'No hay mas productos',
      explain:'Se alcanzo el maximo de productos',
      imagen:[],
      accept:false
    })
  }
}
/* optimizar y crear una unica funcion pendiente */
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
    setOpenModal({
      isOpen:true,
      title:'No hay mas productos',
      explain:'Se alcanzo el maximo de productos',
      imagen:[],
      accept:false
    })
  }
}

/* Actualizacion de estados */
useEffect(()=>{console.log('%cProductos actualizados','color:lightgreen')},[products])

useEffect(()=>{
  if (openModal.accept) {
    setOpenModal({
      isOpen:false,
      title:'No hay mas productos',
      explain:'Se alcanzo el maximo de productos',
      imagen:[],
      accept:false
    })
  }
},[openModal])

/* Html */
  return (
    <div className='productos'>
      
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
