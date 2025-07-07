import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .get(getUserChannelSubscribers)
    .post(toggleSubscription);

router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router
/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Subscription ID
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         subscriber:
 *           type: string
 *           description: User ID who subscribed
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         channel:
 *           type: string
 *           description: Channel/User ID being subscribed to
 *           example: "60f7b3b3b3b3b3b3b3b3b3b4"
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
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         username:
 *           type: string
 *           description: Username
 *           example: "johndoe"
 *         email:
 *           type: string
 *           description: User email
 *           example: "john@example.com"
 *         fullName:
 *           type: string
 *           description: Full name
 *           example: "John Doe"
 *         avatar:
 *           type: string
 *           description: Avatar image URL
 *           example: "https://example.com/avatar.jpg"
 *         coverImage:
 *           type: string
 *           description: Cover image URL
 *           example: "https://example.com/cover.jpg"
 *         subscribersCount:
 *           type: number
 *           description: Number of subscribers
 *           example: 150
 *         subscribedToCount:
 *           type: number
 *           description: Number of subscriptions
 *           example: 25
 *     Channel:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Channel ID
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         username:
 *           type: string
 *           description: Channel username
 *           example: "techchannel"
 *         fullName:
 *           type: string
 *           description: Channel full name
 *           example: "Tech Channel"
 *         avatar:
 *           type: string
 *           description: Channel avatar URL
 *           example: "https://example.com/channel-avatar.jpg"
 *         subscribersCount:
 *           type: number
 *           description: Number of subscribers
 *           example: 1000
 *         isSubscribed:
 *           type: boolean
 *           description: Whether current user is subscribed to this channel
 *           example: true
 */

/**
 * @swagger
 * /api/v1/subscriptions/c/{channelId}:
 *   get:
 *     summary: Get channel subscribers
 *     description: Retrieve all subscribers of a specific channel
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel to get subscribers for
 *         schema:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of subscribers per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *           example: 10
 *     responses:
 *       200:
 *         description: Channel subscribers retrieved successfully
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
 *                     subscribers:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *                     totalSubscribers:
 *                       type: integer
 *                       example: 150
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 15
 *                 message:
 *                   type: string
 *                   example: "Channel subscribers fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid channel ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Channel not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Toggle subscription
 *     description: Subscribe to or unsubscribe from a channel
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: channelId
 *         in: path
 *         required: true
 *         description: ID of the channel to subscribe/unsubscribe
 *         schema:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Subscription toggled successfully
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
 *                     isSubscribed:
 *                       type: boolean
 *                       example: true
 *                     subscribersCount:
 *                       type: integer
 *                       example: 151
 *                 message:
 *                   type: string
 *                   example: "Subscribed to channel successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid channel ID or trying to subscribe to own channel
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Channel not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/subscriptions/u/{subscriberId}:
 *   get:
 *     summary: Get subscribed channels
 *     description: Retrieve all channels that a user is subscribed to
 *     tags: [Subscriptions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: subscriberId
 *         in: path
 *         required: true
 *         description: ID of the user to get subscriptions for
 *         schema:
 *           type: string
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of subscriptions per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *           example: 10
 *     responses:
 *       200:
 *         description: Subscribed channels retrieved successfully
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
 *                     subscribedChannels:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Channel'
 *                     totalSubscriptions:
 *                       type: integer
 *                       example: 25
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                 message:
 *                   type: string
 *                   example: "Subscribed channels fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Invalid subscriber ID
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */