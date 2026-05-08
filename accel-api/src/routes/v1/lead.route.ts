import express from 'express'

import { authenticate, authorize } from '../../middleware/auth'
import * as leadController from "../../controllers/lead.controller"

const router = express.Router()

router.post('/', authenticate(), leadController.addLead)

router.get('/sales-person', authenticate(), leadController.getLeadsOfSalesPerson)
router.get('/sales-person/summary', authenticate(), leadController.getLeadsSummaryOfSalesPerson)

router.get('/', authenticate(), authorize('admin'), leadController.getLeads)
router.get('/admin/summary', authenticate(), authorize('admin'), leadController.getLeadsSummary)

router.get('/:id', authenticate(), leadController.getLeadById)
router.put('/:id', authenticate(), leadController.updateLead)
router.delete('/:id', authenticate(), leadController.deleteLead)

export default router