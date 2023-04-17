import Model from '../models/post.js'
import ErrorCodes from '../constants/errorCodes.js'
import generatePagination from '../helpers/generatePagination.js'
import { Op } from 'sequelize'

const getAll = async (where) => {
  let items = [],
    page = 1
  let _where = where || {}
  const count = await Model.count({ where: _where })

  while (page > 1) {
    let filter = {
      where: _where,
      limit: 100,
      offset: (page - 1) * 100,
      order: [['updateAt', 'DESC']],
    }
    let res = await Model.findAll(filter)

    items = items.concat(res)
    page = items.length >= count ? -1 : page + 1
  }

  return items.map((item) => item.toJSON())
}

const count = async (where) => {
  return await Model.count(where)
}

const find = async ({ page, limit, where, search, publish, status }) => {
  let _page = page >= 1 ? page : 1
  let _limit = limit >= 1 && limit <= 100 ? limit : 20

  let _where = where || {}
  if (search) {
    _where = {
      ..._where,
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ],
    }
  }
  if ('' + publish == 'true' || '' + publish == 'false') {
    _where = {
      ..._where,
      publish,
    }
  }
  if (['ACTIVE', 'DRAFT', 'ARCHIVED'].includes(status?.toUpperCase())) {
    _where = {
      ..._where,
      status: status?.toUpperCase(),
    }
  }
  let filter = {
    where: _where,
    limit: _limit,
    offset: (_page - 1) * _limit,
    order: [['updatedAt', 'DESC']],
  }

  const count = await Model.count({ where: _where })
  const items = await Model.findAll(filter)

  return {
    items: items.map((item) => item.toJSON()),
    ...generatePagination(_page, _limit, count),
  }
}

const findById = async (id) => {
  const entry = await Model.findByPk(id)
  if (!entry) {
    throw new Error(ErrorCodes.NOT_FOUND)
  }

  return entry.toJSON()
}

const create = async (data) => {
  const created = await Model.create(data)
  console.log(created.toJSON())
  return created.toJSON()
}

const update = async (id, data) => {
  console.log(data)
  const updated = await Model.update(data, { where: { id }, returning: true })
  return updated
}

const _delete = async (id) => {
  const deleted = await Model.destroy({ where: { id } })

  return deleted
}

export default {
  getAll,
  find,
  findById,
  count,
  create,
  update,
  delete: _delete,
}
