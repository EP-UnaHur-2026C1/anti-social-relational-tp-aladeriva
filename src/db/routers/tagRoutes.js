const express = require("express");
const schemaValidator = require("../middlewares/schemaValidator.js");
const tagSchema = require("../schema/tagSchema.js");
const middleware = require("../middlewares/existe.middleware.js");
const { Tag } = require("../models");
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
router.get(
  '/:id',
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Tag),
  getTagById
);
router.post('/', schemaValidator(tagSchema), createTag);
router.put(
  '/:id',
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Tag),
  schemaValidator(tagSchema),
  updateTag
);
router.delete(
  '/:id',
  middleware.validaPathParameterMiddleware,
  middleware.validaExisteMiddleware(Tag),
  deleteTag
);
router.get('/:id/posts', getPostsByTag);

module.exports = router;