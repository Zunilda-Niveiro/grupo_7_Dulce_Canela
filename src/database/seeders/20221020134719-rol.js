'use strict';

/** @type {import('sequelize-cli').Migration} */
const usuarios = ['user','admin'];
const users = usuarios.map(usuario=>{
  return {
    name:usuario,
    createdAt: new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Rols', users, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('Rols', null, {});
    
  }
};
