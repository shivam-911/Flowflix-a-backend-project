import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router
/**
 * @swagger
 * components:
 *   schemas:
 *     Tweet:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Tweet ID
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         content:
 *           type: string
 *           description: Tweet content
 *           maxLength: 280
 *           example: "This is my first tweet!"
 *         owner:
 *           type: string
 *           description: User ID of tweet owner
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-07-20T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-07-20T10:30:00Z"
 *         __v:
 *           type: number
 *           description: Version key
 *           example: 0
 *     TweetInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *           description: Tweet content
 *           maxLength: 280
 *           minLength: 1
 *           example: "This is my new tweet!"
 *     ApiResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: 200
 *         data:
 *           type: object
 *         message:
 *           type: string
 *           example: "Operation successful"
 *         success:
 *           type: boolean
 *           example: true
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token for authentication
 */

/**
 * @swagger
 * /api/v1/tweets:
 *   post:
 *     summary: Create a new tweet
 *     description: Create a new tweet with the provided content
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TweetInput'
 *           example:
 *             content: "This is my new tweet!"
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Tweet'
 *                 message:
 *                   type: string
 *                   example: "Tweet created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Tweet content is required"
 *                 success:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tweets/user/{userId}:
 *   get:
 *     summary: Get tweets by user
 *     description: Retrieve all tweets created by a specific user
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user whose tweets to retrieve
 *         schema:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: User tweets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tweet'
 *                 message:
 *                   type: string
 *                   example: "User tweets fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid user ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/tweets/{tweetId}:
 *   patch:
 *     summary: Update a tweet
 *     description: Update the content of an existing tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tweetId
 *         in: path
 *         required: true
 *         description: ID of the tweet to update
 *         schema:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated tweet content
 *                 maxLength: 280
 *                 minLength: 1
 *                 example: "This is my updated tweet!"
 *     responses:
 *       200:
 *         description: Tweet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Tweet'
 *                 message:
 *                   type: string
 *                   example: "Tweet updated successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid input or tweet ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User not authorized to update this tweet
 *       404:
 *         description: Tweet not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a tweet
 *     description: Delete an existing tweet
 *     tags: [Tweets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tweetId
 *         in: path
 *         required: true
 *         description: ID of the tweet to delete
 *         schema:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Tweet deleted successfully
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
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: "Tweet deleted successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid tweet ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User not authorized to delete this tweet
 *       404:
 *         description: Tweet not found
 *       500:
 *         description: Internal server error
 */