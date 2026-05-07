import express from "express"

import authRoutes from "./v1/auth.route"
import leadRoutes from "./v1/lead.route"

const apiRouter = express.Router()

apiRouter.use("/v1/auth", authRoutes)
apiRouter.use('/v1/leads', leadRoutes)

export default apiRouter;