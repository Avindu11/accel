import express from "express"
import authRoutes from "./v1/auth.route"

const apiRouter = express.Router()

apiRouter.use("/v1/auth", authRoutes)

export default apiRouter;