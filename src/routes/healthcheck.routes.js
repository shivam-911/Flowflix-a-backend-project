import { Router } from "express";

import { healthcheck } from "../controllers/healthcheck.controllers.js";

const router = Router()

router.route("/").get(healthcheck)

export default router
/**
 * @swagger
 * /api/v1/healthcheck:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: Service is healthy
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
 *                     message:
 *                       type: string
 *                       example: OK
 *                     uptime:
 *                       type: number
 *                       description: Server uptime in seconds
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: Current timestamp
 *                 message:
 *                   type: string
 *                   example: Health check successful
 *       500:
 *         description: Service is unhealthy
 */