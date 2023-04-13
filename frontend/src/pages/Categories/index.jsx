import qs from 'query-string'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CategoryApi from '../../apis/category.js'
import { LegacyStack } from '@shopify/polaris'
import Header from '../../components/Header'
import Table from './Table.jsx'

function IndexPage(props) {
  const [categories, setCategories] = useState(null)

  const { actions, location } = props

  const [searchParam, setSearchParam] = useSearchParams()

  const { page, limit, search } = qs.parse(location.search)

  const getCategories = async ({ page = 1, limit = 10, search = '' }) => {
    try {
      const query = qs.stringify({ page, limit, search })
      const res = await CategoryApi.find(query)
      if (!res.success) throw res.error
      setCategories(res.data)
      setSearchParam({ page, limit, search })
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    }
  }

  useEffect(() => {
    getCategories({page, limit, search})
  }, [])

  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await CategoryApi.delete(deleted.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })

      getCategories({ page, limit, search })
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }

  return (
    <LegacyStack vertical alignment="fill">
      <Header
        title="Categories"
        actions={[
          {
            label: 'Add new category',
            onClick: () => props.navigate('/categories/new'),
            primary: true,
          },
        ]}
      />
      <Table
        {...props}
        data={categories}
        onChangePage={(page) => getCategories({ page, limit, search })}
        onChangeLimit={(oldPage, oldLimit, newLimit) => {
          const oldIndex = (oldPage - 1) * oldLimit
          const newIndex = Math.floor(oldIndex / newLimit) + 1
          getCategories({ page: newIndex, limnit: newLimit, search })
        }}
        search={search}
        onSearch={(search) => getCategories({ page: 1, limit, search })}
        onEdit={(item) => props.navigate(`categories/${item.id}`)}
        onDelete={handleDelete}
      />
    </LegacyStack>
  )
}

export default IndexPage
