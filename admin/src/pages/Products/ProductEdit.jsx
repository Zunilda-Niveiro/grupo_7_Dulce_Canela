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
const [upImage,setUpImage] = useState([])

const [categories, setCategories] = useState({
    cant:0,
    categ:[]
})
const [error,setError] = useState({
    state:false,
    msg:''
})

const id = useParams().id
/* Inicializacion de categorias */
useEffect(() => {
  getData('/categorias','GET')
    .then(({data,meta})=>{
        setCategories({
            cant:meta.total,
            categ:data
        })
  })
}, []);
/* Inicializacion de producto e imagenes seleccionado */
 useEffect(() => {
    getData(`/productos/detalle/${id}`,'GET')
        .then(({data})=>{
            data={
                id:data.id,
                name :data.name,
                price :data.price,
                detail :data.detail,
                amount :data.amount,
                discount :data.discount,
                imagenes:data.imagenes,
                marca:data.marca.name,
                marcaid:data.marca.id,
                category:data.categoria
            }
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
            if (openModal.accept && openModal.title === 'Demasiadas imágenes') {
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
    console.log('nameeee: ',name,'          value:',value);
    setProduct({original:product.original, modificado:{...product.modificado,
      [name]: value}
    })
}
/* Reiniciar estado de producto modificado */
const backState = () =>{
    setProduct({
        original:product.original,
        modificado:product.original})
    setImagenes({
        cant:product.original.imagenes.length,
        lista:product.original.imagenes,
        borrar:[0,'']
    })
    setUpImage([])
    setError(false)
    window.location.reload()
}
/* Eliminacion de imagenes */
const handleDelete= (isOpen,imagen)=> {
   
    if (imagen.id) {
        setImagenes({
            cant:imagenes.cant,
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
  
   if (e.target.files.length > (3 - (imagenes.cant + upImage.length))) {
        e.target.value=null
        setOpenModal({
            isOpen:true,
            title:'Demasiadas imágenes',
            explain:`Solo puede subir un maximo de ${3 - imagenes.cant}`,
            imagen:[],
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
const guardarCambios =() =>{
    let imagenes =  [...product.modificado.imagenes,upImage]
    imagenes = Array.from( imagenes)
    if (!error.state) {
        console.log('.......-.-.-.-.',product.modificado);
        let productEdit = {
            name:product.modificado.name,
            price:product.modificado.price,
            detail:product.modificado.detail,
            amount:product.modificado.amount,
            discount:product.modificado.discount,
            category:product.modificado.category,
            brand:product.modificado.marca,
            image:imagenes

        }
        getData(`/productos/update/${id}`,'PATCH',productEdit)
        .then(result => {
            console.log('-------resultados path',result); 
            console.log('------------------------------',productEdit);   
        })
        .catch(error => console.log(error))
    }
}
const validation = (e) =>{

   let element = e.target

    switch (element.name) {
        case 'name':
            switch (true) {
                case !element.value.trim():
                    setError({
                        state:true,
                        msg:'Nombre: Este campo es obligatorio'                     
                    })
                    e.target.style.boxShadow = '5px 5px 15px red' 
                    break;
                case element.value.trim().length < 5:
                    setError({
                        state:true,
                        msg:'Nombre: El nombre como mínimino debe tener cinco caracteres'                       
                    })
                    e.target.style.boxShadow = '5px 5px 15px red' 
                    break;
                default:
                    setError(false)
                    e.target.style.boxShadow = '' 
                break    
            }
            break;
        case 'price':
            switch (true) {
                case !element.value.trim():
                    setError({
                        state:true,
                        msg:'Precio: Este campo es obligatorio'                     
                    })
                    e.target.style.boxShadow = '5px 5px 15px red' 
                    break;
                case isNaN(element.value.trim()):
                    setError({
                        state:true,
                        msg:'Precio: Solo se permiten numeros'                       
                    })
                    e.target.style.boxShadow = '5px 5px 15px red' 
                    break;
                default:
                    setError(false)
                    e.target.style.boxShadow = '' 
                break    
            }
            break;
        case 'detail':
            switch (true) {
                case !element.value.trim():
                    setError({
                        state:true,
                        msg:'Detalle: Este campo es obligatorio'                     
                    })
                    e.target.style.boxShadow = '5px 5px 15px red' 
                    break;
                case element.value.trim().length < 20:
                    setError({
                        state:true,
                        msg:'Detalle: El detalle como mínimino debe tener 20 caracteres'                       
                    })
                    e.target.style.boxShadow = '5px 5px 15px red' 
                    break;
                default:
                    setError(false)
                    e.target.style.boxShadow = '' 
                break    
            }
            break;
        case 'marca':
                switch (true) {
                    case !element.value.trim():
                        setError({
                            state:true,
                            msg:'Marca: Este campo es obligatorio'                     
                        })
                        e.target.style.boxShadow = '5px 5px 15px red' 
                        break;
                    default:
                        setError(false)
                        e.target.style.boxShadow = '' 
                    break    
                }
                break;    
        default:
            break;
    }
}

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
                    <input className='inputsSet' type="text" name="price" id="" value={product.modificado.price || ""} onBlur={validation} onChange={handleChange}/>
                </div>
                <div>
                    <label>Detalle:</label>
                    <textarea className='inputsSet'  cols="30" rows="5" name="detail" id="" value={product.modificado.detail || ""} onBlur={validation} onChange={handleChange}></textarea>
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
                    <input className='inputsSet' type="text" name="marca" id="" value={product.modificado.marca} onBlur={validation} onChange={handleChange}/>
                </div>
            
                <div>
                    <label>Categoria:</label>
                    <select className='inputsSet' onChange={handleChange} name='categoria'>
                        {
                            categories.categ.map((category)=>(
                                <option  value={category.name} key={category.name} selected={product.modificado.categoria === category.name ? category.name : null}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </form>
        {error.state ? <label className='error_msg'>{error.msg}</label> : <label> </label>}
        {   (imagenes.lista.length + upImage.length) < 3 ?
            <div className="file-input">
                <input id="file" className='inpProdEdit' multiple type="file" onChange={(e)=>{imageAmount(e)}} />
                <label htmlFor="file">Subir Imagen</label>
            </div> : null
        }
        <div className='image_container'>
            {
                imagenes.lista.map((imagen,index) => 
                    <div key={imagen.id}  className='image_product' style={{ backgroundImage: `url('${imagen.url}')` }}>
                        <i className="fas fa-trash-alt" onClick={()=>handleDelete(true,imagen)}></i>
                    </div>)
            } 
            { upImage.length > 3 ? imageAmount() :  
               Array.from(upImage).map(item =>
                        <div key={item.name} title="Imagenes cargadas" className='image_product' style={{ backgroundImage: `url('${item ? URL.createObjectURL(item): null}')` }}>
                            <i className="fas fa-trash-alt" onClick={()=>handleDelete(true,item)}></i>
                        </div>)
            } 
        </div>
        <div className='formButtons'>
                <button className='btnGuardar' onClick={guardarCambios}>Guardar Cambios</button>
                <button className='btnCancelar' onClick={backState}>Cancelar</button>
        </div>
        
    </div>
  )
}
export default ProductEdit
