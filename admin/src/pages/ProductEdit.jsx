import React, {useState,useEffect} from 'react'
import { useParams} from 'react-router-dom'
import { getData } from '../hooks/GetData'


const ProductEdit = () => {

const [product, setProduct] = useState({})
const [imagenes, setImagenes] = useState([])

const id = useParams().id


 useEffect(() => {
    getData(`/productos/detalle/${id}`)
        .then(({data})=>{
            setProduct(data);
            setImagenes(data.imagenes)
        })
 }, []);

const handleChange = event => {
    
    const name = event.target.name;
    const value = event.target.value;

    setProduct({
        ...product,
      [name]: value
    })
}

const onChangePicture = e => {
    console.log(e.target.files[0])
    }
 
  return (
    <div>
        <form action="">
            <div>
                <label>Nombre:<input type="text" name="name" id="" value={product.name || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Precio:<input type="text" name="price" id="" value={product.price || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Detalle:<textarea cols="30" rows="5" name="detail" id="" value={product.detail || ""} onChange={handleChange}></textarea></label>
            </div>
            <div>
                <label>Cantidad:<input type="text" name="amount" id="" value={product.amount || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Descuento:<input type="text" name="discount" id="" value={product.discount || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Marca:<input type="text" name="marca" id="" value={product.marca || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Categoria:<input type="text" name="categoria" id="" value={product.categoria || ""} onChange={handleChange}/></label>
            </div>
           <div className='image_container'>
            {
                imagenes.map((imagen,index) => <div key={index} className='image_product' style={{ backgroundImage: `url('${imagen.url}')` }}></div>)
            }         
            </div>
        </form>
        <div>
            <input type="file" name="" id="" onChange={onChangePicture} />
        </div>
    </div>
  )
}
export default ProductEdit
