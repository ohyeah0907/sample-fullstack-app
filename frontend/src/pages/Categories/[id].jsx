import { LegacyStack } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useParams } from 'react-router-dom'
import CategoryApi from '../../apis/category'
import CreateForm from './CreateForm'

function DetailPage(props) {
  const { actions } = props

  let { id } = useParams()

  const [category, setCategory] = useState(null)

  const getCategory = async () => {
    try {
      let res = await CategoryApi.findById(id)
      if(!res.success)  throw res.error

      setCategory(res.data)
    } catch (error) {
      actions.showNotify({message: error.message, error: true})
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return(
    <LegacyStack vertical alignment="fill">
    <Header title={category?.name || 'loading...'} onBack={() => props.navigate('/categories')} />

    {category && <CreateForm {...props} created={category} />}
  </LegacyStack>
  )
}

export default DetailPage
