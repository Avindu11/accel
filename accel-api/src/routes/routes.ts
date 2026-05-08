import express from "express"

import authRoutes from "./v1/auth.route"
import leadRoutes from "./v1/lead.route"
import leadNoteRoutes from "./v1/leadNote.route"

const apiRouter = express.Router()

apiRouter.use("/v1/auth", authRoutes)
apiRouter.use('/v1/leads', leadRoutes)
apiRouter.use('/v1/lead-notes', leadNoteRoutes)

export default apiRouter;