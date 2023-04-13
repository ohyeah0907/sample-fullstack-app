import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schemaDefine = {
  title: Joi.string().trim().required().min(1).max(50),
  description: Joi.string().trim().required().min(1).max(50),
  handle: Joi.string().trim().required().min(1).max(58),
  publish: Joi.boolean().required(),
  status: Joi.string().required(),
  thumbnail: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  categoryId: Joi.number().required(),
}

export default {
  create: async (req, res, next) => {
    try {
      let schema = {}
      Array.from([
        'title',
        'description',
        'handle',
        'publish',
        'status',
        'thumbnail',
        'images',
        'categoryId',
      ]).forEach((key) => (schema[key] = schemaDefine[key]))
      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res, next) => {
    try {
      let schema = {}
      Object.keys(req.body).forEach((key) => (schema[key] = schemaDefine[key]))
      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
