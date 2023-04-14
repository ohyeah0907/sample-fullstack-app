import PropTypes from 'prop-types'
import { Button, LegacyCard, LegacyStack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import ValidateForm from '../../helpers/validateForm'
import FormControl from '../../components/FormControl'
import CustomerApi from '../../apis/customer'

const InitFormData = {
  title: {
    name: 'title',
    type: 'text',
    label: 'Title',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long'],
    },
    focused: true,
  },
  title: {
    name: 'description',
    type: 'text',
    label: 'Description',
    value: '',
    error: '',
    required: true,
    validate: {
      trim: true,
      required: [true, 'Required!'],
      minlength: [2, 'Too short!'],
      maxlength: [200, 'Too long'],
    },
    focused: true,
  },
  publish: {
    name: 'publish',
    type: 'radio',
    label: 'Publish',
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [
      { label: 'True', value: true },
      { label: 'False', value: false },
    ],
  },
  status: {
    name: 'status', 
    type: 'select',
    label: "Status",
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [
        {label: 'ACTIVE', value: 'ACTIVE'},
        {label: 'DRAFT', value: 'DRAFT'},
        {label: 'ARCHIVED', value: 'ARCHIVED'},
      ]
  }
}
