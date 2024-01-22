'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.BookOrder,{
        foreignKey: 'order' , as : 'item_order'
      })
      OrderItem.belongsTo(models.Book,{
        foreignKey: 'book' , as : 'item_book'
      })
    }
  }
  OrderItem.init({
    order: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {msg : "Order can not be Null !"},
        notEmpty : {msg : "Order can not be Empty !"}
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
    amount: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {msg : "Amount can not be Null !"},
        notEmpty : {msg : "Amount can not be Empty !"},
        isNumeric : {msg : "Only Numeric Value Allowed !"}
      }
    },
    quantity: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {msg : "Quantity can not be Null !"},
        notEmpty : {msg : "Quantity can not be Empty !"},
        isNumeric : {msg : "Only Numeric Value Allowed !"}
      }
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName : 'order_items'
  });
  return OrderItem;
};