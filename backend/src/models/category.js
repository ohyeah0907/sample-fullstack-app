import { DataTypes } from 'sequelize'
import PostgresSequelize from '../connector/postgres/index.js'

const Model = PostgresSequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
})

Model.prototype.toJSON = function () {
  let values = Object.assign({}, this.get())
  return values
}

Model.sync({force: true})

export default Model
