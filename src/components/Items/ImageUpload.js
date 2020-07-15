import React, { useState } from 'react'
import { Upload, message } from 'antd'
import ImgCrop from 'antd-img-crop'
import { FileImageOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const props = {}

const ImageUpload = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'dell_vostro.jpg',
      status: 'done',
      url:
        'https://i.dell.com/sites/csimages/Video_Imagery/all/vostro-1471.jpg',
    },
  ])

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const onPreview = async file => {
    let src = file.url
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }

  return (
    <ImgCrop rotate>
      <Dragger
        name='file'
        multiple
        listType='picture-card'
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        onChange={onChange}
        onPreview={onPreview}
      >
        <p className='ant-upload-drag-icon'>
          <FileImageOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag image to this area to upload
        </p>
        <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
      </Dragger>
    </ImgCrop>
  )
}

export default ImageUpload
