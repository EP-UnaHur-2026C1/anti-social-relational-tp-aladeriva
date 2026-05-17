import express from 'express';
import {
  createUser,
  getUsers,
  getUserByNick,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);          
router.get('/', getUsers);         
router.get('/:nickName', getUserByNick); 
router.put('/:nickName', updateUser);  
router.delete('/:nickName', deleteUser); 

export default router;