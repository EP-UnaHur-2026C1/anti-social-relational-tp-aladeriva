import express from 'express';
import { followUser, unfollowUser, getFollowers, getFollowing } from '../controllers/followController.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/users/:followingId/follow', authenticate, followUser);
router.delete('/users/:followingId/follow', authenticate, unfollowUser);
router.get('/users/:userId/followers', getFollowers);
router.get('/users/:userId/following', getFollowing);

export default router;