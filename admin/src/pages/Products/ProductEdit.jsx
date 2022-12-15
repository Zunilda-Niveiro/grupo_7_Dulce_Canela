import React, {useState,useEffect} from 'react'
import { useParams} from 'react-router-dom'
import Modal from '../../components/cards/Modal/Modal'
import { getData } from '../../hooks/GetData'
import './ProductEdit.css'

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
const[classState,setClassState] = useState('')

const [upImage,setUpImage] = useState([])

const [categories, setCategories] = useState({
    cant:0,
    categ:[]
})

const id = useParams().id
/* Inicializacion de categorias */
useEffect(() => {
  getData('/categorias')
    .then(({data,meta})=>{
        setCategories({
            cant:meta.total,
            categ:data
        })
  })
}, []);
/* Inicializacion de producto seleccionado */
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
 /* Seguimiento de Modal */
useEffect(() => {
  
    if (openModal.accept && (imagenes.borrar[0]) > 0) {
        setImagenes({
            cant:imagenes.cant - 1,
            lista:imagenes.lista.filter(img => img.id !== imagenes.borrar[0]),
            borrar:[0,'']})
        setOpenModal({isOpen:false,
                title:openModal.title,
                explain:openModal.explain,
                imagen:[],
                accept:false})   
    }else{
        if (openModal.accept && imagenes.borrar[0]) {

           setUpImage(upImage.filter(imag=>imagenes.borrar[1] !== imag))
       
           setOpenModal({isOpen:false,
                title:openModal.title,
                explain:openModal.explain,
                imagen:[],
                accept:false})
            setImagenes({
                cant:imagenes.cant,
                lista:imagenes.lista,
                borrar:[0,'']})
        }
        else{ 
            if (openModal.accept && openModal.title === 'Tipo de archivo incorrecto') {
                setOpenModal({isOpen:false,
                    title:openModal.title,
                    explain:openModal.explain,
                    imagen:[],
                    accept:false}) 
            }

        }
    }
}, [openModal]);
/* Evento de modificacion de datos */
const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setProduct({original:product.original, modificado:{...product.modificado,
      [name]: value}
    })
}
/* Reiniciar estado de producto modificado */
const backState = () =>{
  setProduct({modificado:product.original})
}
/* Eliminacion de imagenes */
const handleDelete= (isOpen,imagen)=> {
  
    if (imagen.id) {
        setImagenes({
            cant:imagenes.cant - 1,
            lista:imagenes.lista,
            borrar:[imagen.id,imagen]
        })
    }else{
        setImagenes({
            cant:imagenes.cant,
            lista:imagenes.lista,
            borrar:[imagen.name,imagen]
        })
    }
    setOpenModal({
            isOpen:isOpen,
            title:'Esta seguro de eliminar?',
            explain:'Esta imagen se perdera',
            imagen:imagen.url ? imagen.url : URL.createObjectURL(imagen),
            accept:false
        })     
}
/* Validacion de cantidad de imagenes */
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
    for (let i = 0; i < e.target.files.length; i++) {

        let exten = e.target.files[i].type.split('/').pop()

        if (!extValid.exec(exten)) {
            setOpenModal({
                isOpen:true,
                title:'Tipo de archivo incorrecto',
                explain:`El archivo ${e.target.files[i].name} es de formato invalido por favor ingrese otro`,
                imagen:null,
                accept:false
            }) 
            e.target.value=null
    }
    setUpImage(Array.from(e.target.files))
   }
}}

const validation = (e) =>{

   let element = e.target
    switch (element.name) {
        case 'name':
            switch (true) {
                case !element.value.trim():
                    alert("El nombre es obligatorio");
                    break;
                case element.value.trim().length < 5:
                    alert("El nombre como mínimino debe tener cinco caracteres" );
                    break;
                default:
                    //limpiar input
                break;
            }
            break;
        case 'price':
            console.log('daihdvbagsdaus')
            break;
        case 'detalle':
            console.log('daihdvbagsdaus')
            break;
        case 'cantidad':
            console.log('daihdvbagsdaus')
            break;    
        default:
            break;
    }
}
console.log(product);
  return (
    <div className='bodyProdEdit'>
        <h2 className='tituloProdEdit'>Edición de producto:</h2>
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
            <div className='formSection'>
                <div>
                    <label>Nombre:</label>
                    <input className='inputsSet' type="text" name="name" id="" value={product.modificado.name || ""} onBlur={validation} onChange={handleChange} />
                </div>
                <div>
                    <label>Precio:</label>
                    <input className='inputsSet' type="text" name="price" id="" value={product.modificado.price || ""} onChange={handleChange}/>
                </div>
                <div>
                    <label>Detalle:</label>
                    <textarea className='inputsSet'  cols="30" rows="5" name="detail" id="" value={product.modificado.detail || ""} onChange={handleChange}></textarea>
                </div>
            </div>
            <div className='formSection'>
                <div>
                    <label>Cantidad:</label>
                    <input className='inputsSet' type="text" name="amount" id="" value={product.modificado.amount || ""} onChange={handleChange}/>
                </div>
                <div>
                    <label>Descuento:</label>
                    <input className='inputsSet' type="text" name="discount" id="" value={product.modificado.discount || ""} onChange={handleChange}/>
                </div>
                <div>
                    <label>Marca:</label>
                    <input className='inputsSet' type="text" name="marca" id="" value={product.modificado.marca || ""} onChange={handleChange}/>
                </div>
            
                <div>
                    <label>Categoria:</label>
                    <select className='inputsSet' >
                        {
                            categories.categ.map((category)=>(
                                <option value={category.name} key={category.name} selected={product.modificado.categoria == category.name ? category.name : null}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
             <small className={`error_msg ${classState}`}>Formato de archivo incorrecto</small>  
        </form>
        <div className="file-input">
            <input id="file" className='inpProdEdit' multiple type="file" onChange={(e)=>{
                imageAmount(e)
                    }} />
            <label htmlFor="file">Subir Imagen</label>
        </div>   
        <div className='image_container'>
            {
                imagenes.lista.map((imagen,index) => 
                    <div key={imagen.id}  className='image_product' style={{ backgroundImage: `url('${imagen.url}')` }}>
                        <i className="fas fa-trash-alt" onClick={()=>handleDelete(true,imagen)}></i>
                    </div>)
            } 
            {  upImage.length > 3 ? imageAmount() :  
               Array.from(upImage).map(item =>
                        <div key={item.name} title="Imagenes cargadas" className='image_product' style={{ backgroundImage: `url('${item ? URL.createObjectURL(item): null}')` }}>
                            <i className="fas fa-trash-alt" onClick={()=>handleDelete(true,item)}></i>
                        </div>)
            } 
        </div>
        <div className='formButtons'>
                <button className='btnGuardar'>Guardar Cambios</button>
                <button className='btnCancelar' onClick={backState}>Cancelar</button>
        </div>
        
    </div>
  )
}
export default ProductEdit
