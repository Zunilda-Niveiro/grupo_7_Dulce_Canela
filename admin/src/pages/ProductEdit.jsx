import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { getData } from '../hooks/GetData'


const ProductEdit = () => {

const [product, setProduct] = useState({})
const id = useParams().id

 useEffect(() => {
    getData(`/productos/detalle/${id}`)
        .then(({data})=>{
            setProduct(data)
        })
 }, []);
 console.log(product);
const handleChange = event => {
    
    const name = event.target.name;
    const value = event.target.value;

    setProduct({
        ...product,
      [name]: value
    })
}

  return (
    <div>
        <form action="">
            <div>
                <label>Nombre:<input type="text" name="name" id="" value={product.name || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Marca:<input type="text" name="marca" id="" value={product.marca || ""} onChange={handleChange}/></label>
            </div>
             <div>
                <label>Precio:<input type="text" name="price" id="" value={product.price || "price"} onChange={handleChange}/></label>
            </div>
        </form>
    </div>
  )
}
export default ProductEdit
