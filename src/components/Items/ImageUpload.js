import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Carousel, Upload, Modal } from 'antd'
import ImgCrop from 'antd-img-crop'
import { FileImageOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const ViewCarousel = ({ files }) => {
  return (
    <Carousel effect='fade'>
      {files &&
        files.map(file => (
          <div key={file.id}>
            <img
              src={file.url || file.thumbUrl}
              alt={file.name}
              style={{ maxHeight: '250px', margin: '0 auto' }}
            />
          </div>
        ))}
    </Carousel>
  )
}

const ImageUpload = () => {
  const [preview, setPreview] = useState({
    image: '',
    visible: false,
    title: '',
  })
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

    setPreview({
      image: image.src,
      visible: true,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }

  const handleCancel = () => setPreview({ ...preview, visible: false })

  return (
    <Wrapper>
      {fileList && fileList.length > 0 && <ViewCarousel files={fileList} />}
      <ImgCrop rotate>
        <Dragger
          name='file'
          multiple
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList && fileList.length > 0 ? (
            <p className='ant-upload-text'>
              Click or drag image here to upload
            </p>
          ) : (
            <>
              <p className='ant-upload-drag-icon'>
                <FileImageOutlined />
              </p>
              <p className='ant-upload-text'>
                Click or drag image here to upload
              </p>
            </>
          )}
        </Dragger>
      </ImgCrop>
      <Modal
        visible={preview.visible}
        title={preview.title}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt='example' style={{ width: '100%' }} src={preview.image} />
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & .slick-dots .slick-dots-bottom button {
    background: #1890ff;
  }
  & .slick-dots .slick-dots-bottom .slice-active button {
    background: #002140;
  }
`

export default ImageUpload
