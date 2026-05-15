'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userNickName', targetKey: 'nickName' });
      Post.hasMany(models.PostImage, { foreignKey: 'postId' });
      Post.hasMany(models.Comment, { foreignKey: 'postId' });
      Post.belongsToMany(models.Tag, { through: 'PostTag', foreignKey: 'postId', otherKey: 'tagId' });
    }
  }
  Post.init({
    userNickName: {type: DataTypes.STRING, allowNull: false},
    descripcion: DataTypes.STRING,allowNull: false,
    fecha: DataTypes.DATE,allowNull: false,
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Tags', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  
  return Post;
};