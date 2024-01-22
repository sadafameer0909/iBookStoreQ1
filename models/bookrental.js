'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookRental extends Model {
    static associate(models) {
      BookRental.belongsTo(models.Customer,{
        foreignKey : 'customer' , as : 'rental_customer'
      })
      BookRental.belongsTo(models.Book,{
        foreignKey : 'book' , as : 'rental_book'
      })
    }
  }
  BookRental.init({
    customer: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {msg : "Customer can not be Null !"},
        notEmpty : {msg : "Customer can not be Empty !"}
      }
    },
    book: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {msg : "Book can not be Null !"},
        notEmpty : {msg : "Book can not be Empty !"}
      }
    },
    start_date: {
      type : DataTypes.DATE,
      allowNull:false,
      validate : {
        notNull : {msg : "Start Date can not be Null !"},
        notEmpty : {msg : "Start Date can not be Empty !"}
      }
    },
    end_date: {
      type : DataTypes.DATE,
      allowNull:false,
      validate : {
        notNull : {msg : "End Date can not be Null !"},
        notEmpty : {msg : "End Date can not be Empty !"}
      }
    },
    amount: {
      type : DataTypes.INTEGER,
      allowNull:false,
      validate : {
        notNull : {msg : "Amount can not be Null !"},
        notEmpty : {msg : "Amount can not be Empty !"},
        isNumeric : {msg: "Amount Only Number !"}
      }

    },
    issubmitted: {
      type : DataTypes.BOOLEAN,
      allowNull:false,
      validate : {
        notNull : {msg : "Submit Status can not be Null !"},
        notEmpty : {msg : "Submit Status can not be Empty !"}
      }
    },
    submit_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'BookRental',
    tableName : 'book_rentals'
  });
  return BookRental;
};