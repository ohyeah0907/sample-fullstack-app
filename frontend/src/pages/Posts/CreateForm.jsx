import PropTypes from 'prop-types'
import { Button, LegacyCard, LegacyStack } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import ValidateForm from '../../helpers/validateForm'
import FormControl from '../../components/FormControl'

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
  description: {
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
    label: 'Status',
    value: '',
    error: '',
    required: false,
    validate: {},
    options: [
      { label: 'ACTIVE', value: 'ACTIVE' },
      { label: 'DRAFT', value: 'DRAFT' },
      { label: 'ARCHIVED', value: 'ARCHIVED' },
    ],
  },
  thumbnail: {
    name: 'thumbnail',
    type: 'file',
    label: 'Thumbnail',
    value: {
      name: '',
      type: '',
    },
    error: '',
    required: false,
    validate: {},
  },
  images: {
    name: 'images',
    type: 'file',
    label: 'Images',
    value: [],
    error: '',
    required: false,
    validate: {},
    allowMultiple: true,
  },
  categoryId: {
    name: 'categoryId',
    type: 'text',
    label: 'CategoryId',
    value: [],
    error: '',
    required: false,
    validate: {},
    allowMultiple: true,
  },
}

function CreateForm(props) {
  const { actions, created, countries } = props
  const [formData, setFormData] = useState(null)
  const [test, setTest] = useState(null)

  useEffect(() => {
    console.log('formData :>> ', formData)
  }, [formData])

  useEffect(() => {
    const fillData = async () => {
      let _formData = JSON.parse(JSON.stringify(InitFormData))

      if (created.id) {
        Array.from(['title', 'description', 'status', 'categoryId']).forEach(
          (field) => (_formData[field] = { ..._formData[field], value: created[field] || '' })
        )
        Array.from(['publish']).forEach(
          (field) => (_formData[field] = { ..._formData[field], value: Boolean(created[field]) })
        )
        // Thumbnail
        let filename = created['thumbnail']
          ? created['thumbnail'].substring(
              created['thumbnail'].lastIndexOf('/') + 1,
              created['thumbnail'].lastIndexOf('.')
            )
          : ''
        let file =
          !created['thumbnail'] == ''
            ? await (await fetch(created['thumbnail']))
                .blob()
                .then((blob) => new File([blob.arrayBuffer()], filename, { type: blob.type }))
            : null
        _formData['thumbnail'].value = file
        console.log(_formData['thumbnail'])

        // Images
        let filenames =
          created['images'] != []
            ? created['images'].map((filePath) =>
                filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
              )
            : []
        let files =
          created['images'] != []
            ? await Promise.all(
                created['images'].map(async (filePath, index) => {
                  return (await fetch(filePath))
                    .blob()
                    .then(
                      (blob) =>
                        new File([blob.arrayBuffer()], filenames[index], { type: blob.type })
                    )
                })
              )
            : []
        _formData['images'].value = files

        console.log(_formData)
      } else {
        // example data
      }
      let test = await fetch(created['thumbnail'])
      let image = await test.blob()
      console.log(image)
      console.log(URL.createObjectURL(image))
      setTest(test)
      setFormData(_formData)
    }
    fillData()
  }, [])

  const handleChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData))
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }
  const handleDiscard = () => props.navigate('customers')

  const handleSubmit = async () => {}

  if (!formData) return null

  return (
    <LegacyStack vertical alignment="fill">
      <img src={test} />
      <LegacyCard sectioned>
        <LegacyStack vertical alignment="fill" spacing="extraLoose">
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['title']}
                onChange={(value) => handleChange('title', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['description']}
                onChange={(value) => handleChange('description', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['status']}
                onChange={(value) => handleChange('status', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill>
              <FormControl
                {...formData['publish']}
                onChange={(value) => handleChange('publish', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['thumbnail']}
                onChange={(value) => handleChange('thumbnail', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill></LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['images']}
                onChange={(value) => handleChange('images', value)}
              />
            </LegacyStack.Item>
          </LegacyStack>
          <LegacyStack distribution="fillEvenly">
            <LegacyStack.Item fill>
              <FormControl
                {...formData['categoryId']}
                onChange={(value) => handleChange('categoryId', value)}
              />
            </LegacyStack.Item>
            <LegacyStack.Item fill></LegacyStack.Item>
          </LegacyStack>
        </LegacyStack>
      </LegacyCard>

      <LegacyStack distribution="trailing">
        <Button onClick={handleDiscard}>Discard</Button>
        <Button primary onClick={handleSubmit}>
          {created.id ? 'Save' : 'Add'}
        </Button>
      </LegacyStack>
    </LegacyStack>
  )
}
export default CreateForm
