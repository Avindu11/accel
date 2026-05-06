import express from 'express'
import { authenticate, authorize } from '../../middleware/auth'

const router = express.Router()

router.get('/test', authenticate(), authorize('admin'), (req, res) => {
    res.send('Hello admin')
})

export default router