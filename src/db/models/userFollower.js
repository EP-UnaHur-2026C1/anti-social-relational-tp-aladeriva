'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserFollower extends Model {
    static associate(models) {
      UserFollower.belongsTo(models.User, {
        foreignKey: 'followerNickName',
        targetKey: 'nickName'
      });

      UserFollower.belongsTo(models.User, {
        foreignKey: 'followedNickName',
        targetKey: 'nickName'
      });
    }
  }

  UserFollower.init({
    followerNickName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'nickName'
      }
    },
    followedNickName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'nickName'
      }
    }
  }, {
    sequelize,
    modelName: 'UserFollower',
    tableName: 'UserFollowers',
    timestamps: false,
  });

  return UserFollower;
};