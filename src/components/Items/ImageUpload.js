import React, { useState } from 'react'
import styled from 'styled-components'
import aws from 'aws-sdk'
import ImgCrop from 'antd-img-crop'
import { Carousel, Upload, Modal } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const s3 = new aws.S3({
  endpoint: new aws.Endpoint('fra1.digitaloceanspaces.com'),
  accessKeyId: process.env.NEXT_PUBLIC_DO_SPACE_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_DO_SPACE_SECRET,
})

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
  const [signedUrl, setSignedUrl] = useState('')
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

  // const uploadS3 = data => {
  //   const key = `katalog/${Date.now()}_${data.file.name}`
  //   const params = {
  //     Bucket: 'nt-timeoff',
  //     Key: key,
  //     Body: data.file,
  //     ACL: 'public-read',
  //   }
  //   s3.putObject(params, (err, data) => {
  //     if (err) console.error(err, err.stack)
  //     else {
  //       this.props.handleFileUploadSuccess(
  //         key,
  //         file.name,
  //         `https://nt-timeoff.fra1.digitaloceanspaces.com/${key}`
  //       )
  //       load(`https://nt-timeoff.fra1.digitaloceanspaces.com/${key}`)
  //     }
  //   })
  // }

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

  const beforeUpload = (file, fileList) => {
    const key = `${Date.now()}_${file.name}`
    console.log(file)
    const params = {
      Bucket: 'nt-timeoff',
      Key: key,
      // Body: data.file,
      ContentType: file.type,
      ACL: 'public-read',
    }
    const url = s3.getSignedUrl('putObject', params)
    setSignedUrl(url)
    return true
  }

  return (
    <Wrapper>
      {fileList && fileList.length > 0 && <ViewCarousel files={fileList} />}
      <ImgCrop rotate>
        <Dragger
          name='file'
          multiple
          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          // action='https://nt-timeoff.fra1.digitaloceanspaces.com/katalog'
          beforeUpload={beforeUpload}
          action={signedUrl}
          method='PUT'
          // customRequest={uploadS3}
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
