import express from 'express'
import { authenticate, authorize } from '../../middleware/auth'

import * as leadController from "../../controllers/lead.controller"

const router = express.Router()

router.get('/', authenticate(), leadController.getLeads)
router.post('/', authenticate(), leadController.addLead)

router.get('/:id',  authenticate(), leadController.getLeadById)
router.put('/:id', authenticate(), leadController.updateLead)
router.delete('/:id', authenticate(), leadController.deleteLead)

export default router