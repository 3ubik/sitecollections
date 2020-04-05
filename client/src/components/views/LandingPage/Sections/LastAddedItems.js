import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Col, Card, Row } from 'antd';
import moment from 'moment';
import Like from '../../../utils/Like'
import FieldsOfItem from '../../../utils/FieldsOfItem';
import Comments from './Comments';
const { Meta } = Card;

function LastAddedItems(props) {
    const [Items, setItems] = useState([])
    useEffect(() => {
        Axios.post("/api/collections/latestitems")
            .then(response => {
                if (response.data.success) {
                    
                    setItems(response.data.items.reverse())
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])

    const renderCards = Items.map((item, index) => {
        let mmoment = moment(item.createdAt)
        while (index < 12) {
            return <Col lg={24} md={8} xs={24}>
                <Card

                    actions={[
                        <Like itemId={item._id} />,
                        <Comments itemId={item._id} />
                    ]}
                    size="small"
                    hoverable={true}
                >
                    <Meta title={item.name} tag={item.tag} description={mmoment.format('DD-MM-YYYY HH:mm:ss')} />
                    <br></br>
                    <FieldsOfItem click={true} fields={item.fields} />
                </Card>
            </Col>
        }


    })

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Latest 12 items </h2>
            </div>
            {Items.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No items yet...</h2>
                </div> :
                <div >
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br /><br />
        </div>
    )





}

export default LastAddedItems

