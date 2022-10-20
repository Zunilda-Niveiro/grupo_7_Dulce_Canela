'use strict';

/** @type {import('sequelize-cli').Migration} */
const productos = require('../../data/productos.json')

const images = productos.map(function(producto,index){
  return {
    file:producto.imagen,
    product_id:index+1,
    createdAt: new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Images', images, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('Images', null, {});
    
  }
};
