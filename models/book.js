'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.Category,{
        foreignKey : 'category', as : 'book_cate'
      })
      Book.belongsTo(models.Seller,{
        foreignKey : 'seller' , as : 'book_seller'
      })
    }
  }
  Book.init({
    book_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Book Name can not be Null !"},
        notEmpty : {msg : "Book Name can not be Empty !"}
      }
    },
    publisher_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Publisher Name can not be Null !"},
        notEmpty : {msg : "Publisher Name can not be Empty !"}
      }
    },
    author_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Author Name can not be Null !"},
        notEmpty : {msg : "Author Name can not be Empty !"}
      }
    },
    selling_price: {
      type : DataTypes.INTEGER,
      validate : {
          notEmpty : {msg : "Selling Price can not be Empty !"},
          isNumeric : {msg : "Only Numbers Allowed !"}
      }
    },
    rental_price: {
      type : DataTypes.INTEGER,
      validate : {
          notEmpty : {msg : "Rental Price can not be Empty !"},
          isNumeric : {msg : "Only Numbers Allowed !"}
      }
    },
    image: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Book Image can not be Null !"},
        notEmpty : {msg : "Book Image can not be Empty !"}
      }
    },
    status: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {msg : "Status can not be Null !"},
        notEmpty : {msg : "Status can not be Empty !"}
      }
    },
    isoldBook: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {msg : "OldBook Status can not be Null !"},
        notEmpty : {msg : "OldBook Status can not be Empty !"}
      }
    },
    trans_type: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Transaction Type can not be Null !"},
        notEmpty : {msg : "Transaction Type can not be Empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
    tableName: 'books'
  });
  return Book;
};