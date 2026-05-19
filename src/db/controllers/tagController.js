const { Tag, Post } =require ( "../models/index.js");

  const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      order: [['name', 'ASC']]
    });
    res.json(tags);
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};


  const getTagById = async (req, res) => {
    const { id } = req.params;
    try {
      const tag = await Tag.findByPk(id);
      if (!tag) return res.status(404).json({ error: 'Etiqueta no encontrada' });
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


  const createTag = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'El nombre de la etiqueta es obligatorio' });
  try {
    const [tag, created] = await Tag.findOrCreate({
      where: { name },
      defaults: { name }
    });
    if (!created) {
      return res.status(409).json({ error: 'La etiqueta ya existe', tag });
    }
    res.status(201).json(tag);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Actualizar el nombre de una etiqueta

  const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'El nuevo nombre es requerido' });
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    tag.name = name;
    await tag.save();
    res.json(tag);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Eliminar una etiqueta 
  const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    await tag.destroy();
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los posts asociados a una etiqueta
  const getPostsByTag = async (req, res) => {
  const { id } = req.params;
    try {
    const tag = await Tag.findByPk(id, { include: Post });
    if (!tag) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json(tag.Posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  getPostsByTag
};