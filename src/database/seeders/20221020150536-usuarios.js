'use strict';

/** @type {import('sequelize-cli').Migration} */
const usuarios = require('../../data/usuarios.json')

const users = usuarios.map((usuario,index) => {
  return {
    firstname:usuario.firstname,
    surname:usuario.surname,
    email:usuario.email,
    password:usuario.password,
    avatar:`${index}.jpg`,
    rol_id:usuario.rol_id,
    address:usuario.address,
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
