'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Email can not be Null !"},
        notEmpty : {msg : "Email can not be Empty !"},
        isEmail : {msg : "Wrong Email Format !"}
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Password can not be Null !"},
        notEmpty : {msg : "Password can not be Empty !"}
      }
    },
    type: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Type can not be Null !"},
        notEmpty : {msg : "Type can not be Empty !"}
      }
    },
    active_status: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {msg : "Status can not be Null !"},
        notEmpty : {msg : "Status can not be Empty !"}
      }
    },
    otp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};