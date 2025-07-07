import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/index.js";



dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8001

connectDB()
.then(()=>{
    app.listen((PORT),()=>{
    console.log(`Server is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb connection error",err)
})
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                 type: integer
 *                 example: 401
 *               message:
 *                 type: string
 *                 example: Unauthorized
 *     NotFoundError:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                 type: integer
 *                 example: 404
 *               message:
 *                 type: string
 *                 example: Resource not found
 *     ValidationError:
 *       description: Validation error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                 type: integer
 *                 example: 400
 *               message:
 *                 type: string
 *                 example: Validation error
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     message:
 *                       type: string
 *     ServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusCode:
 *                 type: integer
 *                 example: 500
 *               message:
 *                 type: string
 *                 example: Internal server error
 */