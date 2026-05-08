import express from 'express'

import * as salesPersonController from "../../controllers/salesPerson.controller"
import { authenticate, authorize } from '../../middleware/auth'

const router = express.Router()

router.get('/', authenticate(), authorize('admin'), salesPersonController.getAllSalesPersons)

export default router