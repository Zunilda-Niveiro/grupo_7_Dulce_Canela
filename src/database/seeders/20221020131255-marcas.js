'use strict';

/** @type {import('sequelize-cli').Migration} */
const productos = require('../../data/productos.json');
let marcas=[];
productos.forEach(product => {
  if (!marcas.includes(product.marca)){
    marcas.push(product.marca)
  }
});
const brands = marcas.map(marca =>{
  return {
    name:marca,
    createdAt:new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Brands', brands, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('Brands', null, {});
    
  }
};
