import React, {useEffect,useState} from 'react'
import { ProductCard } from '../components/cards/ProductCard'
import { getData } from '../hooks/GetData';

export const Products = () => {

const [products, setProducts] = useState({ 
  loading:true,
  data:[],
  meta:[]
});
const [page, setPage] = useState(1)

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
    alert('no hay mas productos')
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
    alert('no hay mas productos')
  }
}

useEffect(()=>{console.log('Productos actualizados')},[products])


  return (
    <div className='productos'>
      {
        products.data.map((product,index) =>(<ProductCard {...product} key={product.name + index}/>))
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
