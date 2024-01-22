'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
     static associate(models) {
        Customer.belongsTo(models.User,{
          foreignKey : 'user'
        })
    }
  }
  Customer.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Name can not be Null !"},
        notEmpty : {msg : "Name can not be Empty !"}
      }
    },
    address: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {msg : "Address can not be Empty !"}
      }
    },
    phone: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Phone can not be Null !"},
        notEmpty : {msg : "Phone can not be Empty !"},
        len: { args : [10,10] , msg: "Wrong Phone Length !"}
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Email can not be Null !"},
        notEmpty : {msg : "Email can not be Empty !"},
        isEmail : {msg : "Wrong Email Format !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
    tableName : 'customers'
  });
  return Customer;
};