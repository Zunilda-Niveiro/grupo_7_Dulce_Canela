import React,{useState,useEffect} from 'react'
import  {HomeCards}  from '../../components/cards/HomeCards/HomeCards'
import './Home.css'
import {getData} from '../../hooks/GetData'
export const Home = () => {

const [totales,setTotales] = useState({
  loading: true,
  products: {
    title: "Total productos",
    color: "#20BF55",
    icon: "fa-boxes",
    data: 0,
  },
  users: {
    title: "Usuarios registrados",
    color: "#0B4F6C",
    icon: "fa-users",
    data: 0,
  },
  categories: {
    title: "Categorias activas",
    color: "#01BAEF",
    icon: "fa-folder",
    data: 0,
  },
});
const [ultimoProd, setUltimoProd] = useState({})
const [categories,setCategories] = useState({
  totales:0,
  data:[]
})

/* CARGA DE ULTIMO PRODUCTO */
useEffect(()=>{
  getData('/productos?sortBy=newest&limit=1')
    .then(({data}) =>{
      setUltimoProd({
        name:data[0].name,
        imagenes:data[0].imagenes.map((image)=> image.url),
        amount:data[0].amount,
        brand:data[0].marca,
        category:data[0].categoria,
        price:data[0].price

      })
    })
},[])
/* TOTALES DE SECCIONES */
useEffect(() => {
  getData('/totals')
    .then(({data}) =>{
      setTotales({
        loading: false,
        products: {
          title: "Total productos",
          color: "#20BF55",
          icon: "shopping-bag",
          data: data.productsTotal,
        },
        users: {
          title: "Usuarios registrados",
          color: "#0B4F6C",
          icon: "user-friends",
          data: data.usersTotal,
        },
        categories: {
          title: "Categorias activas",
          color: "#01BAEF",
          icon: "copy",
          data: data.categoriesTotal,
        },
      })
    })
}, []);
/* CARGA DE CATEGORIAS */
useEffect(() => {
  getData('/categorias')
    .then(({data,meta})=>{
      setCategories({
        totales:meta.total,
        data:data
      })
    })
}, [])

  return (
    <div className="homeMain">
      <div className='cardContainer'>
        <HomeCards {...totales.products}/>
        <HomeCards {...totales.users}/>
        <HomeCards {...totales.categories}/>
      </div>
      <div className="endContainer">
        <div className="sectionContainer">
          <div className="imgProd " style={{ backgroundImage: `url('${ultimoProd.imagenes}')` }}><p className='textLastProd'>Último producto</p></div>
          <div className="dataProd">
            <p className='textLastProd'>{ultimoProd.name}</p>
            <p className='textLastProd'>Marca: {ultimoProd.brand}</p>
            <p className='textLastProd'>Cantidad: {ultimoProd.amount}</p>
            <p className='textLastProd'>Categoria: {ultimoProd.category}</p>
            <p className='textLastProd'>Precio: ${ultimoProd.price}</p>
          </div>
        </div>
        <div className="sectionContainer column">
           {
            categories.data.map(category=>(
              <div className="categCard">
                <p>{category.name}</p>
              </div>
            ))
           }
        </div>
      </div>
    </div>
  )
}
