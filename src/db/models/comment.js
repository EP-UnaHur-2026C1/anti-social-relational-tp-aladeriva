'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    texto: DataTypes.STRING,allowNull: false,
    visible: DataTypes.BOOLEAN,allowNull: false,
    fecha: DataTypes.DATE,allowNull: false
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};