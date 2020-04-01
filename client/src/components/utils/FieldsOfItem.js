import React from 'react'
import { Descriptions, Row} from 'antd';

function FieldsOfItem(props) {

    const Fields = props.fields
    
    const getFields = () => {      

        const children = [];

        for (let i = 0; i < Fields.length; i++) {
            children.push(
                <Descriptions>
                    <Descriptions.Item label={Fields[i].title}>{Fields[i].value} </Descriptions.Item>
                </Descriptions>
            );
        }

        return children;
    };


    return (

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Row gutter={8}>{getFields()}</Row>
        </div>
    )
}
export default FieldsOfItem
