'use strict';

/** @type {import('sequelize-cli').Migration} */
const categorias = require('../../data/categorias.json');
const productos =require('../../data/productos.json')
let marcas=[];
productos.forEach(product => {
  if (!marcas.includes(product.marca)){
    marcas.push(product.marca)
  }
});
const categories = categorias.map(category =>{
  return category.nombre
})
const products = productos.map(producto=>{
  return {
    name:producto.nombre,
    price:producto.precio,
    detail:producto.detalle,
    amount:producto.cantidad,
    discount:0,
    category_id:categories.indexOf(producto.categoria) + 1,
    brand_id:marcas.indexOf(producto.marca) + 1,
    createdAt: new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Products', products, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('Products', null, {});
    
  }
};
