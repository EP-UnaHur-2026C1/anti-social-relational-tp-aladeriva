import express from 'express';
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  getPostsByTag
} from '../controllers/tagControllers.js';

const router = express.Router();

router.get('/', getAllTags);
router.get('/:id', getTagById);
router.post('/', createTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);
router.get('/:id/posts', getPostsByTag);

export default router;