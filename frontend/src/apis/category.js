import apiCaller from '../helpers/apiCaller.js'

const CategoryApi = {
  getAll: async () => await apiCaller('categories/all'),
  count: async () => await apiCaller('categories/count'),
  find: async (query) => await apiCaller(`categories?${query}`),
  findById: async (id) => await apiCaller(`categories/${id}`),
  create: async (data) => await apiCaller(`categories`, 'POST', data),
  update: async (id, data) => await apiCaller(`categories/${id}`, 'PUT', data),
  delete: async (id) => await apiCaller(`categories/${id}`, 'DELETE'),
}

export default CategoryApi
