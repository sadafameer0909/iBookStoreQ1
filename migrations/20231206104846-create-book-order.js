'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      customer:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:"customers",key:"id"}
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      payment_referenceno: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery_status: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('book_orders');
  }
};