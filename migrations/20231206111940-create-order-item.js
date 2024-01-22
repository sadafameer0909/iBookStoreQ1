'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:"book_orders",key:"id"}
      },
      book:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:"books",key:"id"}
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};