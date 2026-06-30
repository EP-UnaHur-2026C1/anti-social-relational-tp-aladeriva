const { uploadImageToPost, uploadMiddleware } = require("../controllers/postController.js");

const express = require("express");
const { Post, Postimage } = require("../models");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addImageToPost,
  removeImage
} = require("../controllers/postController.js");

const middleware = require("../middlewares/existe.middleware.js");
const schemaValidator = require("../middlewares/schemaValidator.js");
const postSchema = require("../schema/postSchema.js");
const postImageSchema = require("../schema/postImageSchema.js");

const router = express.Router();

// ✔ CREAR POST
router.post(
  "/",
  schemaValidator(postSchema),
  createPost
);

// ✔ OBTENER UN POST
router.get(
  "/:id",
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Post),
  getPostById
);

// ✔ OBTENER POSTS
router.get("/", getPosts);

// ✔ EDITAR POST
router.put(
  "/:id",
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Post),
  schemaValidator(postSchema),
  updatePost
);

// ✔ ELIMINAR POST
router.delete(
  "/:id",
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Post),
  deletePost
);

// ✔ AGREGAR IMAGEN A POST
router.put(
  "/:id/images",
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Post),
  schemaValidator(postImageSchema),
  addImageToPost
);

// ✔ ELIMINAR IMAGEN
router.delete(
  "/:id/images/:imageId",
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Postimage),
  removeImage
);

module.exports = router;