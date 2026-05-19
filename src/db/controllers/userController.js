const { User } = require("../models/index.js");

 const createUser = async (req, res) => {
  try {
    const { nickName } = req.body;
    const user = await User.create({ nickName });
    res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};


  const getUsersByNickName = async (req, res) => {
  try {
    const { nickName } = req.params;
    const user = await User.findOne({ where: { nickName } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado'});
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const updateUser = async (req, res) => {
  try {
    const { nickName } = req.params;
    const { newNickName } = req.body;
    const user = await User.findOne({ where: { nickName } });
    if (user) {
      user.nickName = newNickName;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


  const deleteUser = async (req, res) => {
  try {
    const { nickName } = req.params;
    const user = await User.findOne({ where: { nickName } });
    if (user) {
      await user.destroy();
      res.json({ message: 'Usuario eliminado'});
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUsersByNickName,
  getUserByNick: getUsersByNickName,
  updateUser,
  deleteUser
};
