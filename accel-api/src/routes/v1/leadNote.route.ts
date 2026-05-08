import express from 'express'

import { authenticate, authorize } from '../../middleware/auth'
import * as leadNoteController from "../../controllers/leadNote.controller"

const router = express.Router()

router.post('/', authenticate(), leadNoteController.addNote)

router.get('/:id', authenticate(), leadNoteController.getNotesByLeadId)
router.get('/id/:id', authenticate(), leadNoteController.getNoteById)

router.put('/:id', authenticate(), leadNoteController.updateNote)
router.delete('/:id', authenticate(), leadNoteController.deleteNote)

export default router