import { LegacyStack } from '@shopify/polaris'
import React from 'react'
import Header from '../../components/Header'
import CreateForm from './CreateForm'

function NewPage(props) {
  return (
    <LegacyStack vertical alignment="fill">
      <Header title="Add new category" onBack={() => props.navigate('/categories')} />

      <CreateForm {...props} created={{}} />
    </LegacyStack>
  )
}

export default NewPage
