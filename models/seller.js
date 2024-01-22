'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    static associate(models) {
      Seller.belongsTo(models.User,{
        foreignKey : 'user'
      })
    }
  }
  Seller.init({
    company_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Company Name can not be Null !"},
        notEmpty : {msg : "Company Name can not be Empty !"}
      }
    },
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
      allowNull : false,
      validate : {
        notNull : {msg : "Address can not be Null !"},
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
    },
    gstno: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "GST No can not be Null !"},
        notEmpty : {msg : "GST No can not be Empty !"}
      }
    },
    regno: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Reg No can not be Null !"},
        notEmpty : {msg : "Reg No can not be Empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Seller',
    tableName: 'sellers'
  });
  return Seller;
};