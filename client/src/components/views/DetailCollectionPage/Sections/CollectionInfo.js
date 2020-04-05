import React, { useEffect, useState } from 'react';
import { Button, Descriptions, Input } from 'antd';
import Axios from 'axios';

function CollectionInfo(props) {

    const TypesOfFields = [
        { key: 1, value: "Input" },
        { key: 2, value: "TextArea" },
        { key: 3, value: "Check-box" },
        { key: 4, value: "Date" },
        { key: 5, value: "Number" },

    ]

    const [Collection, setCollection] = useState({})
    const [Fields, setFieldsValue] = useState(1)
    const [NameFields, setNameFields] = useState("")

    const onTypeFieldsChange = (event) => {
        setFieldsValue(event.currentTarget.value)
    }

    const onNameFieldsChange = (event) => {
        setNameFields(event.currentTarget.value)
    }
    useEffect(() => {

        setCollection(props.detail)

    }, [props.detail])

    const DeLeteCollection = () => {

        Axios.delete(`/api/collections/collection_by_id?&id=${Collection._id}`)
            .then(response => {
                if (response.data.success) {
                    alert('Collection Successfully Deleted')
                    window.location.href = '/'

                } else {
                    alert('Failed to delete collection')
                }
            })
    }


    const update = () => {

        window.location.href = `/collections/update/${Collection._id}`
    }

    const additem = () => {

        window.location.href = `/collections/itemadd/${Collection._id}`
    }
    const collectionItems = () => {

        window.location.href = `/collections/itemsOfCollection/${Collection._id}`
    }




    const onAdd = (event) => {
        event.preventDefault();
        if (!NameFields) {
            return alert("Write name of your field!")
        }

        const Newfield = {
            col: Collection._id,
            title: NameFields,
            type: Fields,
            value: ''
        }
        Axios.post(`/api/collections/collection_by_id?id=${Collection._id}`, Newfield)
            .then(response => {
                if (response.data.success) {
                    alert('Field Successfully Created')
                    window.location.href = `/collections/${Collection._id}`
                } else {

                    alert(response.data.mes || response.data.err)
                }
            })
    }


    return (
        <div>
            <Descriptions title="Collection Info">
                <Descriptions.Item label="Title"> {Collection.title}</Descriptions.Item>
                <Descriptions.Item label="Topic">{Collection.topic}</Descriptions.Item>
                <Descriptions.Item label="Items">{Collection.items}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Collection.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex' }}>

                <Button style={{ marginRight: 10 }} onClick={DeLeteCollection}
                >
                    Delete Collection
               </Button>


                <Button style={{ marginRight: 10 }} onClick={update}

                >
                    Change Collection
                  </Button>
                <Button style={{ marginRight: 10 }} onClick={collectionItems}

                >
                    Items
                 </Button>
                <Button style={{ marginRight: 10 }} onClick={additem}

                >
                    AddItems
                     </Button>
            </div>
            <br />
            <br />
            <br />




            <div>
                <h2>Add fields to items</h2>
                <label style={{ marginRight: 10 }}>Type of the field</label>
                <select  onChange={onTypeFieldsChange}>
                    {TypesOfFields.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>

                    ))}
                </select>
                <br />
                <label>Name of the field</label>
                <Input
                    onChange={onNameFieldsChange}
                    value={NameFields}

                />
                <br />
                <br />

                <Button
                    onClick={onAdd}
                >
                    Add field
                </Button>
            </div>
        </div>
    )
}

export default CollectionInfo