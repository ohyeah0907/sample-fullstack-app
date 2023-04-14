import generateSlug from '../helpers/generateSlug.js'
import Repository from '../repositories/post.js'

const Post = {
  getAll: async () => await Repository.getAll(),
  count: async (where) => await Repository.count(where),
  find: async (filter) => await Repository.find(filter),
  findById: async (id) => await Repository.findById(id),
  create: async (data) => {
    data = {...data, handle: generateSlug(data.title)}
    return await Repository.create(data)
  },
  update: async (id, data) => await Repository.update(id, data),
  delete: async (id) => await Repository.delete(id),
}

export default Post
