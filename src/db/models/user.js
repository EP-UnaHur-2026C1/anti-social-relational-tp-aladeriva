'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userNickName', sourceKey: 'nickName' });
      User.hasMany(models.Comment, { foreignKey: 'userNickName', sourceKey: 'nickName' });
    }
  }
  User.init({
    nickName: {type: DataTypes.STRING,primaryKey: true,allowNull: false},
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};

// Usuarios que me siguen a mi
User.belongsToMany(models.User, {
    as: 'followers',
    through: models.Follow,
    foreignKey: 'followingId',
    otherKey: 'followerId'
  });


  // A quienes sigo yo
  User.belongsToMany(models.User, {
    as: 'following',
    through: models.Follow,
    foreignKey: 'followerId',
    otherKey: 'followingId'
  });



