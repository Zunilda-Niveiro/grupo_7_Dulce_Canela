import React, {useState,useEffect} from 'react'
import { useParams} from 'react-router-dom'
import Modal from '../components/cards/Modal/Modal'
import { getData } from '../hooks/GetData'


const ProductEdit = () => {
const extValid = /(jpg|jpeg|png|gif)$/i;
const [product, setProduct] = useState({
    original:{},
    modificado:{}
})
const [imagenes, setImagenes] = useState({
    cant:0,
    lista:[],
    borrar:[0,'']
})
const [openModal,setOpenModal] = useState({
    isOpen:false,
    title:'',
    explain:'',
    imagen:[],
    accept:false
})
const [deleteImag,setDeleteImag] = useState(false)
const[classState,setClassState] = useState('')
const [upImage,setUpImage] = useState([])

const id = useParams().id

 useEffect(() => {
    getData(`/productos/detalle/${id}`)
        .then(({data})=>{
            setProduct({
                original:data, 
                modificado:data})
            setImagenes({
                cant:data.imagenes.length,
                lista:data.imagenes,
                borrar:[0,'']
            })
        })
 }, []);
/* useEffect(() => {
    console.log('%c-----------Control Modal:','color:blue',openModal);
    if (openModal.imagen.id) {
        setImagenes({
            cant:imagenes.cant - 1,
            lista:imagenes.lista.filter((img)=>img.id !== openModal.imagen.id),
            borrar:[0,'']
        })
        setOpenModal({
            isOpen:false,
            title:'',
            explain:'',
            imagen:[],
            accept:false
        })
    }
}, [openModal]); */

const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setProduct({original:product.original, modificado:{...product.modificado,
      [name]: value}
    })
}

const onChangePicture = e => {
    let exten = e.target.files[0].type.split('/').pop()
    if (!extValid.exec(exten)) {
        setClassState('input_error')
        e.target.value=null
    }else{
            setImagenes({
                cant:imagenes.cant + 1,
                lista:[...imagenes.lista],
                borrar:[imagenes.borrar.id,imagenes.borrar.url]
            })      
    }
}
const backState = () =>{
  setProduct({modificado:product.original})
}
const handleDelete= (isOpen,image)=> {

        setOpenModal({
            isOpen:isOpen,
            title:'Esta seguro de eliminar?',
            explain:'Esta imagen se perdera',
            imagen:image.url ? image.url : image,
            accept:false
        })
        console.log('%c-----------asdasdadsasdasdas','color:green',openModal)
        if(openModal.accept){
            console.log('%c-----------asdasdadsasdasdas','color:red');
        }
        /* no ingresa, useeffect?? */
        setImagenes({
            cant:imagenes.cant,
            lista:imagenes.lista,
            borrar:[image.id,image.url]
        })
}

const imageAmount = (e) =>{
    
   if (e.target.files.length > (3 - imagenes.cant)) {
        e.target.value=null
        setOpenModal({
            isOpen:true,
            title:'Demasiadas imágenes',
            explain:`Solo puede subir un maximo de ${3 - imagenes.cant}`,
            imagen:null,
            accept:false
        })
   }else{
    setUpImage(e.target.files)
   }
}
  return (
    <div>
        <h2>Edición de producto:</h2>
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
             <small className={`error_msg ${classState}`}>Formato de archivo incorrecto</small>
            <div>
                <button>Guardar Cambios</button>
                <button onClick={backState}>Cancelar</button>
            </div>
        </form>
        <div className='image_container'>
            {
                imagenes.lista.map((imagen,index) => 
                    <div key={imagen.id}  className='image_product' style={{ backgroundImage: `url('${imagen.url}')` }}>
                        <i className="fas fa-trash-alt" onClick={()=>handleDelete(true,imagen)}></i>
                    </div>)
            } 
            {
                upImage.length > 3 ? imageAmount() :  
                Array.from(upImage).map(item =>{
                    return (
                        <div title="Imagenes cargadas" className='image_product' style={{ backgroundImage: `url('${item ? URL.createObjectURL(item): null}')` }}>
                            <i className="fas fa-trash-alt" onClick={()=>handleDelete(true,item)}></i>
                        </div>
                    )
                })
            } 
        </div>
       <input multiple type="file" onChange={(e)=>{
         imageAmount(e)
       }} />
    </div>
  )
}
export default ProductEdit
