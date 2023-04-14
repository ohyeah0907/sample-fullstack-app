import ResponseHandler from '../helpers/responseHandler.js'
import Joi from 'joi'

const schemaDefine = {
  title: Joi.string().trim().required().min(1).max(50),
  description: Joi.string().trim().required().min(1).max(50),
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
        'publish',
        'status',
        'thumbnail',
        'images',
        'categoryId',
      ]).forEach((key) => (schema[key] = schemaDefine[key]))

      // Thumbnail
      req.body.thumbnail =
        req.body?.thumbnail ||
        `${process.env.HOST}/api/uploads/${req?.files['thumbnail'][0].filename}`

      // Images
      req.body.images =
        req.body?.images ||
        req?.files['images'].map((file) => `${process.env.HOST}/api/uploads/${file.filename}`)

      schema = Joi.object(schema)

      await schema.validateAsync(req.body)

      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },

  update: async (req, res, next) => {
    try {
      console.log(req.files)
      let schema = {}
      Object.keys(req.body).forEach((key) => (schema[key] = schemaDefine[key]))
      Object.keys(req.files).forEach((key) => (schema[key] = schemaDefine[key]))

      // Thumbnail
      req.body = schema?.thumbnail
        ? {
            ...req.body,
            thumbnail:
              req.body?.thumbnail ||
              `${process.env.HOST}/api/uploads/${req?.files['thumbnail'][0].filename}`,
          }
        : req.body

      // Images
      req.body = schema?.images
        ? {
            ...req.body,
            images:
              req.body?.images ||
              req?.files['images'].map(
                (file) => `${process.env.HOST}/api/uploads/${file.filename}`
              ),
          }
        : req.body

      schema = Joi.object(schema)

      await schema.validateAsync(req.body)
      next()
    } catch (error) {
      return ResponseHandler.error(res, error)
    }
  },
}
