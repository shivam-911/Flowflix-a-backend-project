import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
} from "../controllers/video.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router
/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - videoFile
 *         - thumbnail
 *         - owner
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the video
 *         title:
 *           type: string
 *           description: Video title
 *         description:
 *           type: string
 *           description: Video description
 *         videoFile:
 *           type: string
 *           description: Video file URL
 *         thumbnail:
 *           type: string
 *           description: Video thumbnail URL
 *         duration:
 *           type: number
 *           description: Video duration in seconds
 *         views:
 *           type: integer
 *           description: Number of views
 *         isPublished:
 *           type: boolean
 *           description: Whether video is published
 *         owner:
 *           type: string
 *           description: Owner user ID
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         title: "Sample Video"
 *         description: "This is a sample video description"
 *         videoFile: "https://example.com/video.mp4"
 *         thumbnail: "https://example.com/thumbnail.jpg"
 *         duration: 300
 *         views: 1500
 *         isPublished: true
 *         owner: "60d0fe4f5311236168a109cb"
 *         createdAt: "2021-06-21T09:00:00.000Z"
 *         updatedAt: "2021-06-21T09:00:00.000Z"
 */

/**
 * @swagger
 * /api/v1/videos:
 *   get:
 *     summary: Get all videos
 *     tags: [Videos]
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
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, views, duration]
 *           default: createdAt
 *         description: Sort videos by field
 *       - in: query
 *         name: sortType
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Videos retrieved successfully
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
 *                   example: Videos retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/videos:
 *   post:
 *     summary: Upload a new video
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - videoFile
 *               - thumbnail
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               videoFile:
 *                 type: string
 *                 format: binary
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Video uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *                 message:
 *                   type: string
 *                   example: Video uploaded successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   get:
 *     summary: Get video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *     responses:
 *       200:
 *         description: Video retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *                 message:
 *                   type: string
 *                   example: Video retrieved successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   patch:
 *     summary: Update video details
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Video updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *                 message:
 *                   type: string
 *                   example: Video updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not video owner
 *       404:
 *         description: Video not found
 */

/**
 * @swagger
 * /api/v1/videos/{videoId}:
 *   delete:
 *     summary: Delete video
 *     tags: [Videos]
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
 *         description: Video deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Video deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not video owner
 *       404:
 *         description: Video not found
 */

/**
 * @swagger
 * /api/v1/videos/{videoId}/toggle-publish:
 *   patch:
 *     summary: Toggle video publish status
 *     tags: [Videos]
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
 *         description: Video publish status toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Video'
 *                 message:
 *                   type: string
 *                   example: Video publish status toggled successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not video owner
 *       404:
 *         description: Video not found
 */