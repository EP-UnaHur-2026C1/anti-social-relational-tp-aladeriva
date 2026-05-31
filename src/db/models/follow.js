'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      Follow.belongsTo(models.User, { as: 'follower', foreignKey: 'followerId' });
      Follow.belongsTo(models.User, { as: 'following', foreignKey: 'followingId' });
    }
  }
  Follow.init({
    followerId: { type: DataTypes.INTEGER, allowNull: false },
    followingId: { type: DataTypes.INTEGER, allowNull: false }
  }, { sequelize, modelName: 'Follow', indexes: [{ unique: true, fields: ['followerId', 'followingId'] }] });
  return Follow;
  
};