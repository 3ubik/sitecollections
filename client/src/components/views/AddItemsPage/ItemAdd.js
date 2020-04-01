import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Typography } from 'antd';
import TypeofNewItem from '../../utils/TypeofNewItem'
import Axios from 'axios'
const { Title } = Typography


const ItemAdd = (props) => {

    const collectionId = props.match.params.collectionId
    let [fields, setfields] = useState([])
    const [name, setName] = useState("")
    const [items,setitems] = useState(0)
    const [Tag,setTag] = useState("")
    useEffect(() => {
        Axios.get(`/api/collections/fields_by_id?id=${collectionId}`)
            .then(response => {
                if (response.data.success) {
                    setfields(response.data.fields)
                    
                    
                } else {
                    alert('Failed to fectch product datas')
                }
            })
            Axios.get(`/api/collections/collection_by_id?id=${collectionId}`)
            .then(response => {
                 setitems(response.data[0].items)              
                 
            })
    }, [])
    const newFields = (newF) => {

        setfields(newF)
    }
    const types = []
    const names1 = []

    const { form } = Form;

    const getFields = () => {
        for (let i = 0; i < fields.length; i++) {
            
                names1[i] = fields[i].title
                types[i] = fields[i].type
                
            
        }

        const children = [];

        for (let i = 0; i < fields.length; i++) {
            children.push(
                <Col key={i}>
                    <Form.Item
                        name={`field-${i}`}
                        label={names1[i]}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}

                    >
                        <TypeofNewItem
                            refreshfunction={newFields}
                            nameOfField={names1[i]}
                            typeOfField={types[i]}
                            collectionId={collectionId}

                        />
                    </Form.Item>
                </Col>,
            );
        }

        return children;
    };

    const onName = (event) => {        
        setName(event.currentTarget.value)
    }
    const onTag = (event) => {
        setTag(event.currentTarget.value)
    }
    const onAdd = async (event) => {
        event.preventDefault();
        await Axios.get(`/api/collections/fields_by_id?id=${collectionId}`)
            .then(response => {
                if (response.data.success) {
                    fields=response.data.fields
                    
                } else {
                    alert('Failed to fectch product datas')
                }
            })

        if(!name || !Tag){
            alert("Input name or tag")
        }        
        else{
        const NewItem = {
            name: name,
            tag :Tag,
            comments:"",
            likes:0,
            fields: fields,
            collect: collectionId

        }

        await Axios.post(`/api/collections/Additem?items=${items}`, NewItem)
            .then(response => {
                if (response.data.success) {
                    
                    alert('Item Successfully Created')
                    window.location.href = `/collections/${collectionId}`
                } else {
                    alert('Failed to upload Item')
                }
            })
        }
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Add item</Title>
            </div>
            <Form form={form} >
                <label>Name of item</label>
                <Input
                    onChange={onName}
                    value={name}
                />
                <br/>
                <br/>
                <label>Tag of item</label>
                <Input
                    
                    onChange={onTag}
                    value={Tag}
                />
                <br/>
                <br/>

                <Row gutter={8}>{getFields()}</Row>


            </Form>
            <Button
                onClick={onAdd}
            >Additem</Button>


        </div>
    );
};

export default ItemAdd