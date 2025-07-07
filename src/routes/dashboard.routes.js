import { Router } from 'express';
import {
    getChannelStats,
    getChannelVideos,
} from "../controllers/dashboard.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/stats").get(getChannelStats);
router.route("/videos").get(getChannelVideos);

export default router
/**
 * @swagger
 * /api/v1/dashboard/stats:
 *   get:
 *     summary: Get channel statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Channel statistics retrieved successfully
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
 *                     totalVideos:
 *                       type: integer
 *                       description: Total number of videos
 *                     totalViews:
 *                       type: integer
 *                       description: Total views across all videos
 *                     totalSubscribers:
 *                       type: integer
 *                       description: Total subscribers
 *                     totalLikes:
 *                       type: integer
 *                       description: Total likes across all videos
 *                 message:
 *                   type: string
 *                   example: Channel statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/dashboard/videos:
 *   get:
 *     summary: Get channel's videos
 *     tags: [Dashboard]
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
 *         description: Channel videos retrieved successfully
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
 *                   example: Channel videos retrieved successfully
 *       401:
 *         description: Unauthorized
 */