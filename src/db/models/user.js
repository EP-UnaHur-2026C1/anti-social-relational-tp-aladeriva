'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
       User.belongsToMany(models.Post, { through: 'PostTag', foreignKey: 'tagId', otherKey: 'postId' });
    }
  }
  User.init({
    nickName: {type: DataTypes.STRING,primaryKey: true,unique: true,allowNull: false},
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false,
  });
  return User;
};


