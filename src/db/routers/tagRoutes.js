const express = require("express");
const {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  getPostsByTag
} = require("../controllers/tagController.js");

const router = express.Router();

router.get('/', getAllTags);
router.get('/:id', getTagById);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);
router.get('/:id/posts', getPostsByTag);

module.exports = router;