import express from 'express'
import Controller from '../controllers/customer.js'
import MulterUpload from '../connector/multer/index.js'
import Validate from '../validates/customer.js'

const router = express.Router()

router.get('/count', Controller.count)
router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.post('/', MulterUpload.none(), Validate.create, Controller.create)
router.put('/:id', MulterUpload.none(), Validate.update, Controller.update)
router.delete('/:id', Controller.delete)

export default router
