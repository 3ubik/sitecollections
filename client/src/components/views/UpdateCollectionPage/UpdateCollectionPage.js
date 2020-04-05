import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, Input,} from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UpdateCollectionPage(props) {
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [TopicValue, setTopicValue] = useState("")
    const [Images, setImages] = useState([])
    const collectionId = props.match.params.collectionId

    useEffect(() => {
        Axios.get(`/api/collections/collection_by_id?&id=${collectionId}&type=single`)
            .then(response => {
                setTitleValue(response.data.collection[0].title)
                setDescriptionValue(response.data.collection[0].description)
                setTopicValue(response.data.collection[0].topic)
                setImages(response.data.collection[0].images)
            })

    }, [])


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
        setImages(newImages)
    }


    const updateCollection = (event) => {
        event.preventDefault();


        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            topic: TopicValue,
            description: DescriptionValue,
            images: Images,

        }

        if (!TitleValue || !DescriptionValue || !TopicValue || !Images) {
            return alert('fill all the fields first!')
        }

        Axios.put(`/api/collections/collection_by_id?&id=${collectionId}`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('Collection Successfully Updated')
                    window.location.href = `/collections/${collectionId}`

                } else {
                    alert('Failed to update collection')
                }
            })

    }









    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Update Collection</Title>
            </div>


            <Form onSubmit={updateCollection} >
                <FileUpload refreshFunction={updateImages} images={Images} />
                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Topic</label>
                <Input
                    onChange={onTopicChange}
                    value={TopicValue}

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


                <Button onClick={updateCollection}>
                    Update
                </Button>

            </Form>

        </div>
    )
}


export default UpdateCollectionPage