'use strict';

/** @type {import('sequelize-cli').Migration} */
const metodos = ['Dinero en efectivo','Tarjetas de débito','Tarjetas de crédito','Transferencia bancaria','Código QR','Mercado Pago'];
const method = metodos.map(metodo=>{
  return {
    method:metodo,
    createdAt: new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('PaymentMethods', method, {});
  
  },

  async down (queryInterface, Sequelize) {
        
    await queryInterface.bulkDelete('PaymentMethods', null, {});
    
  }
};
