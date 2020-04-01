import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Typography } from 'antd';
import TypeofNewItem from '../../utils/TypeofNewItem'
import Axios from 'axios'
const { Title } = Typography

const UpdateItem = (props) => {
    const itemId = props.match.params.itemId
    const [fields, setfields] = useState([])
    const [Name, setName] = useState("")
    const [Tag, setTag] = useState("")
    useEffect(() => {
        Axios.get(`/api/collections/itemsid?id=${itemId}`)
            .then(response => {
                if (response.data.success) {
                    setfields(response.data.items[0].fields)
                    setName(response.data.items[0].name)
                    setTag(response.data.items[0].tag)

                } else {
                    alert('Failed to fectch product datas')
                }
            })

    }, [])
    const newFields = (newF) => {
        setfields(newF)
    }
    const types = []
    const names1 = []
    const value = []

    const { form } = Form;

    const getFields = () => {
        for (let i = 0; i < fields.length; i++) {
            names1[i] = fields[i].title
            types[i] = fields[i].type
            value[i] = fields[i].value
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
                        ]}>
                        <TypeofNewItem
                            refreshfunction={newFields}
                            nameOfField={names1[i]}
                            typeOfField={types[i]}
                            valueOfField={value[i]}
                            itemId={itemId}
                            i={i}
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
    const onChange = () => {
        Axios.post(`/api/collections/ItemupdateField?id=${itemId}&name=${Name}&tag=${Tag}`)
        window.location.href = "/collections/get"
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Update item</Title>
            </div>
            <Form form={form} >
                <label>Name</label>
                <Input
                    value={Name}
                    onChange={onName}
                />
                <br />
                <br />
                <label>Tag</label>
                <Input
                    value={Tag}
                    onChange={onTag}
                />
                    <Row gutter={8}>{getFields()}</Row>


            </Form>
            <Button
                onClick={onChange}
            >UpdateItem</Button>

        </div>
    );
};

export default UpdateItem