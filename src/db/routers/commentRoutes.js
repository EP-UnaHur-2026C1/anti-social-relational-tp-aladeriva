import express from 'express';
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';

const router = express.Router();

//Obtiene comentarios de un post
router.get('/post/:postId', getCommentsByPost);

//Crea un nuevo comentario
router.post('/', createComment);

//Actualiza un comentario
router.put('/:id', updateComment);

//Elimina un comentario
router.delete('/:id', deleteComment);

export default router;