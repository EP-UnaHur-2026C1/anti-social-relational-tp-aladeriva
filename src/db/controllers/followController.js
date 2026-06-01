const { User } = require("../models/index.js");

const followUser = async (req, res) => {
  try {
    const { followerNickName, followedNickName } = req.body;

    await req.user.addFollowing(req.targetUser);

    res.status(201).json({
      message: `${followerNickName} ahora sigue a ${followedNickName}`
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { followerNickName, followedNickName } = req.body;

    await req.user.removeFollowing(req.targetUser);

    res.json({
      message: `${followerNickName} dejó de seguir a ${followedNickName}`
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getFollowers = async(req,res)=>{
  try{
    const { nickName } = req.params;
    const user = await User.findOne({ where: { nickName } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const followers = await user.getFollowers({ attributes: ['nickName'] });
    
    return res.json({ count: followers.length, followers });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowers
};