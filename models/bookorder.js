'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    BookOrder.belongsTo(models.Customer,{
      foreignKey:'customer', as:'order_customer'
    })
    }
  }
  BookOrder.init({
    order_date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notNull:{msg:"Order Date Cannot be Null!"},
        notEmpty:{msg:"Order Date Cannot be Empty!"}
      }
    },
    customer: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {msg : "Customer can not be Null !"},
        notEmpty : {msg : "Customer can not be Empty !"}
      }
    },
    amount: {
      type:DataTypes.FLOAT,
      allowNull:false,
      validate:{
        notNull:{msg:"Amount Cannot be Null!"},
        notEmpty:{msg:"Amount Date Cannot be Empty!"}
      }
    },
    payment_referenceno: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "REF NUM can not be Null !"},
        notEmpty : {msg : "REF NUM can not be Empty !"}
      }
    },
    delivery_address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "delivery address can not be Null !"},
        notEmpty : {msg : "delivery address not be Empty !"}
      }
    },
    delivery_status: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {msg : "delivery status can not be Null !"},
        notEmpty : {msg : "delivery status can not be Empty !"}
      }
    },
  }, {
    sequelize,
    modelName: 'BookOrder',
    tableName: 'book_orders'
    });
  return BookOrder;
};