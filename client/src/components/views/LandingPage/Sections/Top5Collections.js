import React, {useEffect,useState }from 'react'
import './CssUtils/Collections.css'
import { Col, Card, Row } from 'antd';
import Axios from 'axios'
import ImageSlider from '../../../utils/ImageSlider';

const { Meta } = Card;
function Top5Collections() {
    const [Collections, setCollections] = useState([])
    useEffect(() => {
        Axios.post(`/api/collections/getAllCollections`)
            .then(response => {
                if (response.data.success) {
                    var collections = response.data.collections
                    collections.sort((prev, next) => {
                        if (prev.items > next.items) return -1
                    });
                    if (collections.length == 1 || collections.length == 2 || collections.length == 3 || collections.length == 4 || collections.length == 5) setCollections(collections)
                    else setCollections(collections.slice(0, 6))
                }
                else {
                    alert('Failed to get collections datas')
                }
            })
    }, [])

    const renderCards = Collections.map((collection, index) => {
        
        return <Col  md={8} xs={24}>
            <h1 style={{ color: '#40a9ff' }}> {collection.items + " " + "items"}</h1>
            <Card
                hoverable={true}
                cover={<a><ImageSlider images={collection.images} /></a>}
            >
                <Meta
                    title={collection.title}
                    description={collection.topic}
                />
            </Card>
        </Col>
    })
    return (

        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Top 6collections   </h2>
            </div>


            {Collections.length === 0 ?
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
export default Top5Collections

