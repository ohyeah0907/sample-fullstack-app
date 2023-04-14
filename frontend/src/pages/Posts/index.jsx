import { useEffect, useState } from 'react'
import PostApi from '../../apis/post'
import qs from 'query-string'
import { useSearchParams } from 'react-router-dom'
import { LegacyStack } from '@shopify/polaris'
import Header from '../../components/Header'
import Table from './Table'

function IndexPage(props) {
  const { actions } = props
  const [posts, setPosts] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()

  const { page, limit, search } = qs.parse(props.location.search)

  const getPosts = async ({page = 1, limit = 10, search = ''}) => {
    try {
      let query = qs.stringify({ page, limit, search })
      let res = await PostApi.find(query)
      if (!res.success) throw res.error
      console.log(res.data)
      setPosts(res.data)
      setSearchParams({ page, limit, search })
    } catch (error) {
      console.log(error)
      actions
    }
  }
  const handleDelete = async (deleted) => {
    try {
      actions.showAppLoading()

      let res = await PostApi.delete(deleted.id)
      if (!res.success) throw res.error

      actions.showNotify({ message: 'Deleted' })

      getPosts({page, limit, search})
    } catch (error) {
      console.log(error)
      actions.showNotify({ message: error.message, error: true })
    } finally {
      actions.hideAppLoading()
    }
  }
  useEffect(() => {
    console.log(posts)
    getPosts({page, limit, search})
  }, [])

  return (
    <LegacyStack vertical alignment="fill">
      <Header
        title="Posts"
        actions={[
          {
            label: 'Add new post',
            onClick: () => props.navigate('/posts/new'),
            primary: true,
          },
        ]}
      />
    <Table
        {...props}
        data={posts}
        onChangePage={(page) => getPosts({ page, limit, search })}
        onChangeLimit={(limit) => getPosts({ page: 1, limit, search })}
        onSearch={(search) => getPosts({ page: 1, limit, search })}
        onEdit={(item) => props.navigate(`posts/${item.id}`)}
        onDelete={handleDelete}
      />

    </LegacyStack>
  )
}

export default IndexPage
