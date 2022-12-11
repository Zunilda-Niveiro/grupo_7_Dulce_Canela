import React, {useState,useEffect} from 'react'
import { useParams} from 'react-router-dom'
import Modal from '../components/cards/Modal/Modal'
import { getData } from '../hooks/GetData'


const ProductEdit = () => {

const [product, setProduct] = useState({
    original:{},
    modificado:{}
})
const [imagenes, setImagenes] = useState({
    cant:0,
    lista:[],
    borrar:[0,'']
})
const [openModal,setOpenModal] = useState(false)
const [deleteProd,setDeleteProd] = useState(false)

const id = useParams().id

 useEffect(() => {
    getData(`/productos/detalle/${id}`)
        .then(({data})=>{
            setProduct({
                original:data, 
                modificado:data})
            setImagenes({cant:data.imagenes.length,lista:data.imagenes,borrar:[0,'']})
        })
 }, []);
 useEffect(() => {
    if (deleteProd) {
        console.log('%c----asdasdasdasd-----','color:red',imagenes);
        setDeleteProd(false)
    }
 }, [deleteProd]);

const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setProduct({original:product.original, modificado:{...product.modificado,
      [name]: value}
    })
}

const onChangePicture = e => {
    console.log(e.target.files[0])
    
    }
const backState = () =>{
  setProduct({modificado:product.original})
}
const handleDelete= (isOpen,image)=> {
    setOpenModal(true)
    setImagenes({
        cant:imagenes.cant,
        lista:imagenes.lista,
        borrar:[image.id,image.url]
    })
}

  return (
    <div>
        <h2>Edición de producto:</h2>
        {openModal && <Modal 
            closeModal={setOpenModal} 
            title={'Eliminar Imagen'} 
            explain={'Si continua se borrara permanentemente la imagen'}
            accept={setDeleteProd()}
            imagen={imagenes}
            />}
        <form action="">
            <div>
                <label>Nombre:<input type="text" name="name" id="" value={product.modificado.name || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Precio:<input type="text" name="price" id="" value={product.modificado.price || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Detalle:<textarea cols="30" rows="5" name="detail" id="" value={product.modificado.detail || ""} onChange={handleChange}></textarea></label>
            </div>
            <div>
                <label>Cantidad:<input type="text" name="amount" id="" value={product.modificado.amount || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Descuento:<input type="text" name="discount" id="" value={product.modificado.discount || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Marca:<input type="text" name="marca" id="" value={product.modificado.marca || ""} onChange={handleChange}/></label>
            </div>
            <div>
                <label>Categoria:<input type="text" name="categoria" id="" value={product.modificado.categoria || ""} onChange={handleChange}/></label>
            </div>
           <div className='image_container'>
                {
                    imagenes.lista.map((imagen,index) => <div key={imagen.id}  className='image_product' style={{ backgroundImage: `url('${imagen.url}')` }}><i className="fas fa-trash-alt" onClick={()=>handleDelete(true,imagen)}></i></div>)
                }         
            </div>
            <div>
            {
                imagenes.cant < 3 ? <input type="file" name="" id="" onChange={onChangePicture}/> : null
               
            }
        </div>
        <button>Guardar Cambios</button>
        <button onClick={backState}>Cancelar</button>
        </form>
       
    </div>
  )
}
export default ProductEdit
