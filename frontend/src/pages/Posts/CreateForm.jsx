import PropTypes from 'prop-types'
import { Button, Checkbox, LegacyCard, LegacyStack, Scrollable, Thumbnail } from '@shopify/polaris'
import { useEffect, useState } from 'react'
import ValidateForm from '../../helpers/validateForm'
import FormControl from '../../components/FormControl'
import PostApi from '../../apis/post'
import UploadApi from '../../apis/upload'
import { NoteMinor } from '@shopify/polaris-icons'
import ImageView from './ImageView'

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
  },
  publish: {
    name: 'publish',
    type: 'radio',
    label: 'Publish',
    value: true,
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
    value: null,
    originalValue: '',
    droppedValue: '',
    error: '',
    required: false,
    validate: {},
  },
  images: {
    name: 'images',
    type: 'file',
    label: 'Images',
    value: [],
    originalValue: [],
    droppedValue: '',
    error: '',
    required: false,
    validate: {},
    allowMultiple: true,
  },
  categoryId: {
    name: 'categoryId',
    type: 'text',
    label: 'CategoryId',
    value: '',
    error: '',
    required: false,
    validate: {},
    allowMultiple: true,
  },
}

function CreateForm(props) {
  const { actions, created } = props
  const [formData, setFormData] = useState(null)
  const [droppedThumbnail, setDroppedThumnail] = useState(false)
  const [droppedImages, setDroppedImages] = useState([])

  useEffect(() => {
    console.log('formData :>> ', formData)
  }, [formData])

  useEffect(() => {
    console.log('droppedImages :>> ', droppedImages)
  }, [droppedImages])

  useEffect(() => {
    const fillFileData = async () => {
      let _formData = { ...InitFormData }

      if (created.id) {
        Array.from(['title', 'description', 'status', 'categoryId']).forEach(
          (field) => (_formData[field] = { ..._formData[field], value: created[field] || '' })
        )
        Array.from(['publish']).forEach(
          (field) => (_formData[field] = { ..._formData[field], value: Boolean(created[field]) })
        )
        Array.from(['images']).forEach(
          (field) =>
            (_formData[field] = { ..._formData[field], originalValue: created[field] || [] })
        )
        Array.from(['thumbnail']).forEach(
          (field) =>
            (_formData[field] = { ..._formData[field], originalValue: created[field || ''] })
        )
      } else {
        // example data
        _formData['title'].value = 'Title'
        _formData['description'].value = 'Description'
        _formData['status'].value = 'DRAFT'
        _formData['publish'].value = false
        _formData['thumbnail'].value = {}
        _formData['images'].value = []
      }
      setFormData(_formData)
    }
    fillFileData()
  }, [])

  const handleChange = (name, value) => {
    let _formData = { ...formData }
    _formData[name] = { ..._formData[name], value, error: '' }
    setFormData(_formData)
  }
  const handleDiscard = () => props.navigate('customers')

  const handleSubmitFile = async (name, value) => {
    try {
      if (value == {} || value == []) return

      let _formData = { ...formData }
      const res = await UploadApi.upload(value?.length ? value : [value])

      if (!res.success) throw res.error

      if (name == 'thumbnail') {
        _formData[name] = { ..._formData[name], originalValue: res.data[0]?.url }
      } else {
        _formData[name] = {
          ..._formData[name],
          value: [],
          originalValue: _formData[name].originalValue.concat(res.data.map((item) => item?.url)),
        }
      }

      setFormData(_formData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    try {
      const { formValid, validFormData } = ValidateForm.validateForm(formData)
      if (!formValid) {
        setFormData(validFormData)
        throw new Error('Invalid form data')
      }

      actions.showAppLoading()
      let data = {
        title: validFormData.title.value,
        description: validFormData.description.value,
        publish: validFormData.publish.value,
        status: validFormData.status.value,
        thumbnail: droppedThumbnail ? '' : validFormData.thumbnail.originalValue,
        images: validFormData.images.originalValue.filter(
          (image, index) => !droppedImages.includes('' + index)
        ),
        categoryId: validFormData.categoryId.value,
      }
      let res = null
      if (created.id) {
        // update
        res = await PostApi.update(created.id, data)
      } else {
        // create
        res = await PostApi.create(data)
      }
      if (!res.success) throw res.error

      actions.showNotify({ message: created.id ? 'Saved' : 'Created' })

      props.navigate(`posts`)
    } catch (error) {
      console.log(error)
      actions.showNotify({ error: true, message: error.message })
    } finally {
      actions.hideAppLoading()
    }
  }

  if (!formData) return null

  return (
    <LegacyStack vertical alignment="fill">
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

          <LegacyStack>
            <div>
              <p>{formData['thumbnail'].label}</p>
              <LegacyStack>
                {formData['thumbnail'].originalValue && (
                  <ImageView
                    src={formData['thumbnail'].originalValue}
                    checked={droppedThumbnail}
                    onChange={(e) => setDroppedThumnail((prev) => !prev)}
                  />
                )}
                <FormControl
                  {...formData['thumbnail']}
                  label=""
                  onChange={(value) => handleSubmitFile('thumbnail', value)}
                />
              </LegacyStack>
            </div>
          </LegacyStack>

          <LegacyStack>
            <div>
              <p>{formData['images'].label}</p>
              <LegacyStack wrap={true}>
                {formData['images'].originalValue.length &&
                  formData['images'].originalValue.map((image, index) => (
                    <ImageView
                      key={index}
                      src={image}
                      checked={droppedImages.includes(index)}
                      onChange={(event) => {
                        let _droppedImages = [...droppedImages]
                        if (_droppedImages.includes(index)) {
                          _droppedImages = _droppedImages.filter((_item) => _item != index)
                        } else {
                          _droppedImages.push(index)
                        }
                        setDroppedImages(_droppedImages)
                      }}
                    />
                  ))}
                <FormControl
                  {...formData['images']}
                  label=""
                  onChange={(value) => handleSubmitFile('images', value)}
                />
              </LegacyStack>
            </div>
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
