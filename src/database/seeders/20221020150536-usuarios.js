'use strict';

/** @type {import('sequelize-cli').Migration} */
const usuarios = require('../../data/usuarios.json')

const users = usuarios.map(usuario => {
  return {
    firstname:usuario.nombre,
    surname:usuario.apellido,
    email:usuario.email,
    password:usuario.contrasena,
    avatar:usuario.imagen,
    rol_id:usuario.rol == 'user' ? 1 : 2,
    address:usuario.direccion,
    createdAt: new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users', users, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
