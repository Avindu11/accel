import express from 'express'

import { authenticate, authorize } from '../../middleware/auth'
import * as leadNoteController from "../../controllers/leadNote.controller"

const router = express.Router()

router.post('/', authenticate(), leadNoteController.addNote)

router.get('/:id', authenticate(), leadNoteController.getNotesByLeadId)

export default router