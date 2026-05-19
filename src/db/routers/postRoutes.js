const express = require("express");
const { createPost, getPosts, updatePost, deletePost, addImage, removeImage } = require("../controllers/postController.js");
const  validarPost  = require ("../middlewares/validarPost.js");

const router = express.Router();

router.post('/', validarPost, createPost);
router.get('/', getPosts);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/images', addImage);
router.delete('/:id/images/:imageId', removeImage);

module.exports = router;