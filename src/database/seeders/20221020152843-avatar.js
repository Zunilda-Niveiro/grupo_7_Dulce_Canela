'use strict';

/** @type {import('sequelize-cli').Migration} */
const usuarios = require('../../data/usuarios.json')

const avatars = usuarios.map(usuario => {
  return {
    file:usuario.imagen,
    user_id:usuario.id,
    createdAt: new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Avatars', avatars, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('Avatars', null, {});
    
  }
};
