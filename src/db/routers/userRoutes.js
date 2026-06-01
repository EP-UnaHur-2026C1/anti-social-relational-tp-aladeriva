const express = require("express");
const schemaValidator = require("../middlewares/schemaValidator.js");
const userSchema = require("../schema/userSchema.js");
const {followUser, unfollowUser,getFollowers} = require("../controllers/followController.js");
const {validaFollowMiddleware, validaUnfollowMiddleware} = require("../middlewares/follow.middleware.js");
const followSchema = require("../schema/followSchema.js");


const {
  createUser,
  getUsers,
  getUserByNick,
  updateUser,
  deleteUser
} = require ("../controllers/userController.js");

const router = express.Router();

router.post('/', schemaValidator(userSchema), createUser);         
router.get('/', getUsers);         
router.get('/:nickName', getUserByNick); 
router.put('/:nickName', schemaValidator(userSchema), updateUser); 
router.delete('/:nickName', deleteUser); 

router.post('/follow', schemaValidator(followSchema), validaFollowMiddleware, followUser);
router.post('/unfollow', schemaValidator(followSchema), validaUnfollowMiddleware, unfollowUser);
router.get('/followers/:nickName', getFollowers);
module.exports = router;


