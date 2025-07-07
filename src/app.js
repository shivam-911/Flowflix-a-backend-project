import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import logger from "./utils/logger.js";
import morgan from "morgan";
import {swaggerUi,specs} from "./config/swagger.js"
const morganFormat = ":method :url :status :response-time ms";
const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
}))
//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
//advanced loggers
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
// common middleware
app.use(express.json({limit: "16kb"}))
app.use((express.urlencoded({ extended: true,limit: "16kb"})))
app.use(express.static("public"))
app.use(cookieParser())
// import routes
import healthcheckRouter from "./routes/healthcheck.routes.js"
import  userRouter  from "./routes/user.routes.js"
import { errorHandler } from "./middlewares/error.middleware.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import  tweetRouter  from "./routes/tweet.routes.js";
// routes declaration

app.use("/api/v1/healthcheck",healthcheckRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// app.use(errorHandler)
export { app }
