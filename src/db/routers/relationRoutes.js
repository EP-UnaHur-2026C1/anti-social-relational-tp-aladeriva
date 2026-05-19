const express = require("express");
const {
  addImageToPost,
  removeImageFromPost,
  addTagToPost,
  removeTagFromPost,
  getPostTags
} = require("../controllers/relationController.js");

const router = express.Router();

// Para las imágenes de los posts
router.post('/posts/:postId/images', addImageToPost);
router.delete('/posts/:postId/images/:imageId', removeImageFromPost);

// Para las etiquetas
router.post('/posts/:postId/tags', addTagToPost);
router.delete('/posts/:postId/tags/:tagId', removeTagFromPost);
router.get('/posts/:postId/tags', getPostTags);

module.exports = router;