'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    static associate(models) {
      PostImage.belongsTo(models.Post, { foreignKey: 'postId' });
    }
  }
  PostImage.init({
    url: DataTypes.STRING,allowNull: false
  }, {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    sequelize,
    modelName: 'PostImage',
  });

  return PostImage;
};