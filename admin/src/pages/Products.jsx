import React, {useEffect,useState} from 'react'
import { ProductCard } from '../components/cards/ProductCard'
import { getData } from '../hooks/GetData';

export const Products = () => {
const [products, setproducts] = useState({
  loading:true,
  data:[]
});

useEffect(() => {
  getData('/productos?limit=16')
    .then(({data}) => {
      setproducts({
        loading:false,
        data:data
      })
    })
    .catch((error) => console.log(error))
}, []);

  return (
    <div className='productos' id='id_products'>
      {
        products.data.map((product,index) =>(
          <ProductCard {...product} key={product.name + index}/>
          
        ))}
    </div>
  )
}
