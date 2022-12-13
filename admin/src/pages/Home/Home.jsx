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

useEffect(() => {
  getData('/totals')
    .then(({data}) =>{
      console.log(data);
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
  
  return (
    <div className="homeMain">
      <div className='cardContainer'>
        <HomeCards {...totales.products}/>
        <HomeCards {...totales.users}/>
        <HomeCards {...totales.categories}/>
      </div>
    </div>
  )
}
