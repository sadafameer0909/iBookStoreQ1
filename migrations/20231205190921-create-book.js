'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      book_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publisher_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      selling_price: {
        type: Sequelize.INTEGER
      },
      rental_price: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isoldBook: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      trans_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category:{
        type : Sequelize.INTEGER,
        allowNull: false,
        references : { model: "categories" , key : "id" }
      },
      seller:{
        type : Sequelize.INTEGER,
        allowNull: true,
        references : { model: "sellers" , key : "id" }
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
    await queryInterface.dropTable('books');
  }
};