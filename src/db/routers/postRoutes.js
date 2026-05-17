import express from 'express';
import { createPost, getPosts, updatePost, deletePost, addImage, removeImage } from '../controllers/postController.js';
import { validatePost } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', validatePost, createPost);
router.get('/', getPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/images', addImage);
router.delete('/:id/images/:imageId', removeImage);

export default router;