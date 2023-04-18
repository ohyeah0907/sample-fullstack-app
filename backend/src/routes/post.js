import express from 'express'
import Controller from '../controllers/post.js'
import MulterUpload from '../connector/multer/index.js'
import Validate from '../validates/post.js'

const router = express.Router()

router.get('/all', Controller.getAll)
router.get('/count', Controller.count)
router.get('/', Controller.find)
router.get('/:id', Controller.findById)
router.post(
  '/',
  Validate.create,
  Controller.create
)
router.put(
  '/:id',
  Validate.update,
  Controller.update
)
router.delete('/:id', Controller.delete)

export default router
