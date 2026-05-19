const express = require("express");
const {
  createUser,
  getUsers,
  getUserByNick,
  updateUser,
  deleteUser
} = require ("../controllers/userController.js");

const router = express.Router();

router.post('/', createUser);          
router.get('/', getUsers);         
router.get('/:nickName', getUserByNick); 
router.put('/:nickName', updateUser);  
router.delete('/:nickName', deleteUser); 

module.exports = router;