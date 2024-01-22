'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    cate_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {msg : "Category Name can not be Null !"},
        notEmpty : {msg : "Category Name can not be Empty !"}
      }
    },
    desc: DataTypes.STRING,
    status: {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      validate : {
        notNull : {msg : "Category Status can not be Null !"},
        notEmpty : {msg : "Category Status can not be Empty !"}
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName : 'categories'
  });
  return Category;
};