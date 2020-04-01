import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import FieldsOfItem from '../../utils/FieldsOfItem'
import Itemid from './Sections/Itemid'
import Like from '../../utils/Like'
import { Col, Card, Row, } from 'antd';



const { Meta } = Card;


function ItemsOfCollection(props) {
    console.log(props)
    const [Item, setItems] = useState([])
    const collectionId = props.match.params.collectionId


    useEffect(() => {
        Axios.get(`/api/collections/items?id=${collectionId}`)
            .then(response => {

                if (response.data.success) {
                    setItems(response.data.items)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])


    const renderCards = Item.map((item, index) => {

        return <Col >
            <Card
                hoverable={true}
                cover={<a href={`/items/${item._id}`} ></a>}
            >
                <Meta
                    title={item.name}
                    description={item.tag}
                />
                <br />
                <br />
                <FieldsOfItem
                    fields={item.fields}

                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <Like itemId={item._id}
                    />
                    <Itemid itemId={item._id}
                        itemlenght={Item.length}
                        collectionId={collectionId}
                    />





                </div>


            </Card>
        </Col>
    })




    return (

        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Items   </h2>
            </div>


            {Item.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />
        </div>

    )
}
export default ItemsOfCollection