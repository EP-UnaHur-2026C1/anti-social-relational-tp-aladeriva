const { User } = require("../models");

const validaFollowMiddleware = async (req, res, next) => {
  const { followerNickName, followedNickName } = req.body;

  const user = await User.findByPk(followerNickName);
  const targetUser = await User.findByPk(followedNickName);

  if (!user || !targetUser) {
    return res.status(404).json({
      error: "Usuario no encontrado"
    });
  }

  if (followerNickName === followedNickName) {
    return res.status(400).json({
      error: "Un usuario no puede seguirse a sí mismo"
    });
  }

  const alreadyFollowing = await user.hasFollowing(targetUser);

  if (alreadyFollowing) {
    return res.status(400).json({
      error: "El usuario ya sigue a este usuario"
    });
  }

  req.user = user;
  req.targetUser = targetUser;

  next();
};

const validaUnfollowMiddleware = async (req, res, next) => {
  const { followerNickName, followedNickName } = req.body;

  const user = await User.findByPk(followerNickName);
  const targetUser = await User.findByPk(followedNickName);

  if (!user || !targetUser) {
    return res.status(404).json({
      error: "Usuario no encontrado"
    });
  }

  if (followerNickName === followedNickName) {
    return res.status(400).json({
      error: "Un usuario no puede dejar de seguirse a sí mismo"
    });
  }

  const alreadyFollowing = await user.hasFollowing(targetUser);

  if (!alreadyFollowing) {
    return res.status(400).json({
      error: "El usuario no sigue a este usuario"
    });
  }

  req.user = user;
  req.targetUser = targetUser;

  next();
};

module.exports = {
  validaFollowMiddleware,
  validaUnfollowMiddleware
};