'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('users',[{
    email:'admin@itstack.in',
    password:"admin@9876",
    type:"admin",
    active_status:true,
    otp:"0",
    createdAt: new Date(),
    updatedAt: new Date()

   }]);
  },

  async down (queryInterface, Sequelize) {
 
  }
};
