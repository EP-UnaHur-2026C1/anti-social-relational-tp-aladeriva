const express = require("express");
const schemaValidator = require("../middlewares/schemaValidator.js");
const userSchema = require("../schema/userSchema.js");
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

module.exports = router;