const upload = require("../middlewares/upload.middleware.js");
const { Post, PostImage, Tag, User,Comment} = require("../models/index.js");
const uploadMiddleware = upload.single('image');

  const createPost = async (req, res) => {
    try {
      
      const { descripcion, userNickName, imagenesUrls, tags } = req.body;
      
      const post = await Post.create({ descripcion, userNickName, fecha: new Date() });
      if (imagenesUrls && imagenesUrls.length) {
        await PostImage.bulkCreate(imagenesUrls.map(url => ({ url, postId: post.id })));
      }
      if (tags && tags.length) {
        const tagInstances = await Promise.all(tags.map(async (nombre) => {
          const [tag] = await Tag.findOrCreate({ where: { name: nombre }, defaults: { name: nombre } });
          return tag;
        }));
        await post.addTags(tagInstances);
      }
      res.status(201).json(post);
    } catch (error) {
      console.log("ERROR:");
      console.log(error);

      console.log("ERROR ORIGINAL:");
      console.log(error.original);

      console.log("PARENT:");
      console.log(error.parent);
      return res.status(400).json({ error: error.message, details: error.errors});
    }
};

  const getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: [PostImage, Tag, User,Comment] });
  res.json(posts);
};

  const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: [PostImage, Tag, User,Comment]
    });

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(post);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;
    const post = await Post.findByPk(id);
    if (post) {
      post.descripcion = descripcion;
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (post) {
      await post.destroy();
      res.json({ message: 'Post eliminado' });
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

 const addImageToPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { imagenesUrls } = req.body;

    const post = await Post.findByPk(id);
    if (post) {
      const images = await PostImage.bulkCreate(
        imagenesUrls.map(url => ({
          url,
          postId: post.id
        }))
      );
      res.status(201).json(images);

    } else {
      res.status(404).json({
        error: 'Post no encontrado'
      });
    }
    
  } catch (error) {
    return res.status(400).json({
      error: error.message
    });

  }
};

  const removeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await PostImage.findByPk(id);
    if (image) {
      await image.destroy();
      res.json({ message: 'Imagen eliminada' });
    } else {
      res.status(404).json({ error: 'Imagen no encontrada' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const addTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const post = await Post.findByPk(id);
    if (post) {
      const [tag] = await Tag.findOrCreate({ where: { name: name }, defaults: { name: name } });
      await post.addTag(tag);
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

  const removeTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const post = await Post.findByPk(id);
    if (post) {
      const tag = await Tag.findOne({ where: { name: name } });
      if (tag) {
        await post.removeTag(tag);
        res.json({ message: 'Tag eliminada' });
      } else {
        res.status(404).json({ error: 'Tag no encontrada' });
      }
    } else {
      res.status(404).json({ error: 'Post no encontrado' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addImageToPost,
  removeImage,
  uploadMiddleware
};

