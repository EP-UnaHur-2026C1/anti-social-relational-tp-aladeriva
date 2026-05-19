const express = require("express");
const {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
  hideComment
} = require("../controllers/commentController.js");

const router = express.Router();

//Obtiene comentarios de un post
router.get('/post/:postId', getCommentsByPost);

//Crea un nuevo comentario
router.post('/', createComment);

//Actualiza un comentario
router.put('/:id', updateComment);

//Elimina un comentario
router.delete('/:id', deleteComment);

module.exports = router;