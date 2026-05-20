const express = require("express");
const {Post, Postimage} = require("../db/models");
const { createPost, getPosts, updatePost, deletePost, addImage, removeImage } = require("../controllers/postController.js");
const middleware = require("../middlewares/existe.middleware.js");
const schemaValidator = require("../middlewares/schemaValidator.js");
const postSchema = require("../schema/postSchema.js");

const router = express.Router();

router.post('/', schemaValidator(postSchema),createPost);
router.get('/', getPosts);
router.put('/:id',middleware.validaPathParameterMiddleware, middleware.validaExisteMiddleware(Post), updatePost);
router.delete('/:id',middleware.validaPathParameterMiddleware, middleware.validaExisteMiddleware(Post), deletePost);
router.post('/:id/images',middleware.validaPathParameterMiddleware, middleware.validaExisteMiddleware(Postimage), addImage);
router.delete('/:id/images/:imageId',middleware.validaPathParameterMiddleware, middleware.validaExisteMiddleware(Postimage), removeImage);

module.exports = router;



