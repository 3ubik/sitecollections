import React, { useState } from 'react'
import { Typography, Button, Form,Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UploadPage(props) {
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [TopicValue, setTopicValue] = useState("")
    const [Url, setUrl] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }
    const onTopicChange = (event) => {
        setTopicValue(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setUrl(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (!TitleValue || !DescriptionValue || !TopicValue ||!Url) {
            return alert('fill all the fields first!')
        }
        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            topic: TopicValue,
            description: DescriptionValue,
            images: Url,
        }
        Axios.post('/api/collections/uploadCollection', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Collection Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Collection</Title>
            </div>
            <Form onSubmit={onSubmit} >
                
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}              
                />
                <br />
                <br />
                <label>Topic</label>
                <Input
                    onChange={onTopicChange}
               

                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadPage