import { LegacyStack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import PostApi from '../../apis/post'
import CreateForm from './CreateForm'

function DetailPage(props) {
  const { actions } = props

  let { id } = useParams()

  const [post, setPost] = useState(null)

  const getPost = async () => {
    try {
      let res = await PostApi.findById(id)
      if (!res.success) throw res.error

      setPost(res.data)
    } catch (error) {
      actions.showNotify({ message: error.message, error: true })
    }
  }
  useEffect(() => {
    getPost()
  }, [])

  return (
    <LegacyStack vertical alignment="fill">
      <Header title={post?.title || 'loading...'} onBack={() => props.navigate('/posts')} />

      {post && <CreateForm {...props} created={post} />}
    </LegacyStack>
  )
}

export default DetailPage
