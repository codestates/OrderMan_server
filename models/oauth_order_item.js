'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oauth_order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.oauth_order_item.belongsTo(models.oauth_order);
      models.oauth_order_item.belongsTo(models.item);
    }
  };
  oauth_order_item.init({
    order_id : DataTypes.INTEGER,
    item_id : DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'oauth_order_item',
  });
  return oauth_order_item;
};