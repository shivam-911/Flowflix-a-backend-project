import { Router } from 'express';
import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../controllers/playlist.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createPlaylist)

router
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);

router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

router.route("/user/:userId").get(getUserPlaylists);

export default router
/**
 * @swagger
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - owner
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the playlist
 *         name:
 *           type: string
 *           description: Playlist name
 *         description:
 *           type: string
 *           description: Playlist description
 *         videos:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of video IDs
 *         owner:
 *           type: string
 *           description: Owner user ID
 *         isPublic:
 *           type: boolean
 *           description: Whether playlist is public
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: "My Favorite Videos"
 *         description: "A collection of my favorite videos"
 *         videos: ["60d0fe4f5311236168a109cb", "60d0fe4f5311236168a109cc"]
 *         owner: "60d0fe4f5311236168a109cd"
 *         isPublic: true
 *         createdAt: "2021-06-21T09:00:00.000Z"
 *         updatedAt: "2021-06-21T09:00:00.000Z"
 */

/**
 * @swagger
 * /api/v1/playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Playlist name
 *               description:
 *                 type: string
 *                 description: Playlist description
 *               isPublic:
 *                 type: boolean
 *                 default: true
 *                 description: Whether playlist is public
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *                 message:
 *                   type: string
 *                   example: Playlist created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/v1/playlists/{playlistId}:
 *   get:
 *     summary: Get playlist by ID
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *                 message:
 *                   type: string
 *                   example: Playlist retrieved successfully
 *       404:
 *         description: Playlist not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/playlists/{playlistId}:
 *   patch:
 *     summary: Update playlist details
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *                 message:
 *                   type: string
 *                   example: Playlist updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not playlist owner
 *       404:
 *         description: Playlist not found
 */

/**
 * @swagger
 * /api/v1/playlists/{playlistId}:
 *   delete:
 *     summary: Delete playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
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
 *                   example: Playlist deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not playlist owner
 *       404:
 *         description: Playlist not found
 */

/**
 * @swagger
 * /api/v1/playlists/add/{videoId}/{playlistId}:
 *   patch:
 *     summary: Add video to playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Video added to playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *                 message:
 *                   type: string
 *                   example: Video added to playlist successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not playlist owner
 *       404:
 *         description: Video or playlist not found
 *       409:
 *         description: Video already in playlist
 */

/**
 * @swagger
 * /api/v1/playlists/remove/{videoId}/{playlistId}:
 *   patch:
 *     summary: Remove video from playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: videoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Video removed from playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *                 message:
 *                   type: string
 *                   example: Video removed from playlist successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not playlist owner
 *       404:
 *         description: Video or playlist not found
 *       409:
 *         description: Video not in playlist
 */

/**
 * @swagger
 * /api/v1/playlists/user/{userId}:
 *   get:
 *     summary: Get user's playlists
 *     tags: [Playlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
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
 *         description: Number of playlists per page
 *     responses:
 *       200:
 *         description: User playlists retrieved successfully
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
 *                     playlists:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Playlist'
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalPlaylists:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: User playlists retrieved successfully
 *       404:
 *         description: User not found
 */