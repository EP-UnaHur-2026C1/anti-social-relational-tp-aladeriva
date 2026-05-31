const express = require("express");
const { followUser, unfollowUser, getFollowers, getFollowing } = require("../controllers/followController.js");
const { authenticate } = require("../middlewares/auth.middleware.js") ;

const router = express.Router();

router.post('/users/:followingId/follow', authenticate, followUser);
router.delete('/users/:followingId/follow', authenticate, unfollowUser);
router.get('/users/:userId/followers', getFollowers);
router.get('/users/:userId/following', getFollowing);

module.exports = router;