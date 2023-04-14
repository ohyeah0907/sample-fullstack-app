import apiCaller from '../helpers/apiCaller.js'

const PostApi = {
  getAll: async () => await apiCaller('posts/all'),
  count: async () => await apiCaller('posts/count'),
  find: async (query) => await apiCaller(`posts?${query}`),
  findById: async (id) => await apiCaller(`posts/${id}`),
  create: async (data) => await apiCaller(`posts`, 'POST', data),
  update: async (id, data) => await apiCaller(`posts/${id}`, 'PUT', data),
  delete: async (id) => await apiCaller(`posts/${id}`, 'DELETE'),
}

export default PostApi
