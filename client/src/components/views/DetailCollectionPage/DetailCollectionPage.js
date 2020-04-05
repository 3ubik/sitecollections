import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import CollectionImage from './Sections/CollectionImage';
import CollectionInfo from './Sections/CollectionInfo';

function DetailCollection(props) {
    const collectionId = props.match.params.collectionId
    const [Collection, setCollection] = useState([])
    useEffect(() => {
        Axios.get(`/api/collections/collection_by_id?&id=${collectionId}`)
            .then(response => {
                setCollection(response.data.collection[0])
            })
    }, [])

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Collection.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <CollectionImage detail={Collection} />
                </Col>
                <Col lg={12} xs={24}>
                    <CollectionInfo detail={Collection} />                       
                </Col>
            </Row>
        </div>
    )
}
export default DetailCollection