'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category,{
        as : 'categoria',
        foreignKey : 'category_id'
      });
      Product.belongsTo(models.Brand,{
        as : 'marca',
        foreignKey : 'brand_id'
      });
      Product.hasMany(models.Image, {
        as : 'imagenes',
        foreignKey : 'product_id',
        onDelete:'cascade'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};