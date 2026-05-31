const db = require("../models/index.js");

  const followUser = async (req, res) => {
  const followerId = req.user.id;       // viene del middleware auth
  const { followingId } = req.params;   // ID del usuario a seguir
  if (followerId == followingId) return res.status(400).json({ error: 'No puedes seguirte a ti mismo' });
  try {
    const follow = await db.Follow.findOrCreate({ where: { followerId, followingId } });
    res.status(201).json({ message: 'Ahora sigues a este usuario', follow: follow[0] });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const unfollowUser = async (req, res) => {
  const followerId = req.user.id;
  const { followingId } = req.params;
  try {
    const deleted = await db.Follow.destroy({ where: { followerId, followingId } });
    if (deleted) res.status(204).send();
    else res.status(404).json({ error: 'No seguías a este usuario' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

  const getFollowers = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await db.User.findByPk(userId, {
      include: [{ model: db.User, as: 'followers', attributes: ['id', 'nickName'] }]
    });
    res.json(user.followers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

  const getFollowing = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await db.User.findByPk(userId, {
      include: [{ model: db.User, as: 'following', attributes: ['id', 'nickName'] }]
    });
    res.json(user.following);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
 getFollowing,
 getFollowers,
 unfollowUser,
 followUser
};