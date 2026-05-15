import { Comment, Post, User } from '../models/index.js';
import dotenv from 'dotenv';
dotenv.config();
const MONTHS_LIMIT = parseInt(process.env.COMMENT_VISIBILITY_MONTHS) || 6;

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const limitDate = new Date();
  limitDate.setMonth(limitDate.getMonth() - MONTHS_LIMIT);
  const comments = await Comment.findAll({
    where: {
      postId,
      fecha: { [Op.gte]: limitDate },
      visible: false
    },
    include: [User],
    order: [['fecha', 'ASC']]
  });
  res.json(comments);
};

export const createComment = async (req, res) => {
  const { texto, userNickName, postId } = req.body;
  const comment = await Comment.create({ texto, userNickName, postId, fecha: new Date(), visible: true });
  res.status(201).json(comment);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  if (comment) {
    await comment.destroy();
    res.json({ message: 'Comentario eliminado' });
  } else {
    return res.status(404).json({ error: 'Comentario no encontrado' });
  }
};

export const hideComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByPk(id);
  if (comment) {
    comment.visible = false;
    await comment.save();
    res.json({ message: 'Comentario oculto' });
  } else {
    return res.status(404).json({ error: 'Comentario no encontrado' });
  }
};
