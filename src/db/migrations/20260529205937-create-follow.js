'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserFollowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      followerNickName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Users', key: 'nickName' },
        onDelete: 'CASCADE'
      },
      followedNickName: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Users', key: 'nickName' },
        onDelete: 'CASCADE'
      }
    });
    await queryInterface.addIndex('UserFollowers', ['followerNickName', 'followedNickName'], { unique: true });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('UserFollowers');
  }
};