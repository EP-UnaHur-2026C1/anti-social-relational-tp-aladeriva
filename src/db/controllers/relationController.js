import { Post, PostImage, Tag, PostTag } from '../models/index.js';

export const addImageToPost = async (req, res) => {
  const { postId } = req.params;
  const { url } = req.body; // se espera url en el body: http:.....//
  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    const newImage = await PostImage.create({ url, postId });
    res.status(201).json(newImage);
  } catch (error) {
     return res.status(400).json({ error: error.message });
  }
};

export const removeImageFromPost = async (req, res) => {
  const { postId, imageId } = req.params;

  try {
    const image = await PostImage.findOne({ where: { id: imageId, postId } });
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada en este post' });

    await image.destroy();
    res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


// TAGS - ETIQUETAS//

export const addTagToPost = async (req, res) => {
  const { postId } = req.params;
  const { tagName } = req.body;
  try {
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    let tag = await Tag.findOne({ where: { name: tagName } });
    if (!tag) {
      tag = await Tag.create({ name: tagName });
    }

    // Verifica si la relaciòn ya existe
    const existing = await PostTag.findOne({ where: { postId, tagId: tag.id } });
    if (existing) return res.status(400).json({ error: 'La etiqueta ya está asociada al post' });

    await post.addTag(tag); 

    res.status(201).json({ message: 'Etiqueta asociada correctamente', tag });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const removeTagFromPost = async (req, res) => {
  const { postId, tagId } = req.params;

  try {
    const relation = await PostTag.findOne({ where: { postId, tagId } });
    if (!relation) return res.status(404).json({ error: 'Relación no encontrada' });

    await relation.destroy();
    res.status(204).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Obtener todas las etiquetas de un post

export const getPostTags = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId, { include: Tag });
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post.Tags);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
  
