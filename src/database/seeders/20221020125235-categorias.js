'use strict';

/** @type {import('sequelize-cli').Migration} */
const categorias = require('../../data/categorias.json');
const categories = categorias.map(category =>{
  return {
    name:category.nombre,
    image:category.imagen,
    createdAt:new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Categories', categories, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
