import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
} from "../controllers/like.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getLikedVideos);

export default router
/**
 * @swagger
 * /api/v1/likes/toggle/v/{videoId}:
 *   post:
 *     summary: Toggle like on a video
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *     responses:
 *       200:
 *         description: Like toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       description: Whether the video is now liked
 *                     likesCount:
 *                       type: integer
 *                       description: Total likes count
 *                 message:
 *                   type: string
 *                   example: Like toggled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Video not found
 */

/**
 * @swagger
 * /api/v1/likes/toggle/c/{commentId}:
 *   post:
 *     summary: Toggle like on a comment
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Like toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     isLiked:
 *                       type: boolean
 *                       description: Whether the comment is now liked
 *                     likesCount:
 *                       type: integer
 *                       description: Total likes count
 *                 message:
 *                   type: string
 *                   example: Like toggled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */
/**
 * @swagger
 * /api/v1/likes/toggle/t/{tweetId}:
 *   post:
 *     summary: Toggle like on a tweet
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tweetId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the tweet to like or unlike
 *     responses:
 *       200:
 *         description: Successfully toggled like status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tweet liked
 *       401:
 *         description: Unauthorized – JWT token missing or invalid
 *       404:
 *         description: Tweet not found
 */

/**
 * @swagger
 * /api/v1/likes/videos:
 *   get:
 *     summary: Get user's liked videos
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of videos per page
 *     responses:
 *       200:
 *         description: Liked videos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     videos:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Video'
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalVideos:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: Liked videos retrieved successfully
 *       401:
 *         description: Unauthorized
 */