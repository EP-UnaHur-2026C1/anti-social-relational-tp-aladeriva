'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
       User.hasMany(models.Post, { foreignKey: 'userNickName', sourceKey: 'nickName' });
       User.hasMany(models.Comment, { foreignKey: 'userNickName', sourceKey: 'nickName' });

       User.belongsToMany(models.User, {
          as: 'Following',
          through: 'UserFollowers',
          foreignKey: 'followerNickName',
          otherKey: 'followedNickName'
        });

        User.belongsToMany(models.User, {
          as: 'Followers',
          through: 'UserFollowers',
          foreignKey: 'followedNickName',
          otherKey: 'followerNickName'
        });
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


