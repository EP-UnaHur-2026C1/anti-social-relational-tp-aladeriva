const express = require("express");
const schemaValidator = require("../middlewares/schemaValidator.js");
const commentSchema = require("../schema/commentSchema.js");
const middleware = require("../middlewares/existe.middleware.js");
const { Comment } = require("../models");
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
router.post('/', schemaValidator(commentSchema), createComment);

//Actualiza un comentario
router.put(
  '/:id',
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Comment),
  updateComment
);

//Elimina un comentario
router.delete(
  '/:id',
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Comment),
  deleteComment
);

module.exports = router;