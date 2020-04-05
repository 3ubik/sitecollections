import React from 'react'
import TypeOfNewItem from './TypeofNewItem'
import { Descriptions, Row, Form } from 'antd';

function FieldsOfItem(props) {
    var flag = false
    if (props.flag) {
        flag = props.flag
    }
    const Fields = props.fields

    const getFields = () => {

        const children = [];
        if (Fields.length == 0) children.push(
            <Descriptions column={1} >
                <Descriptions.Item> {"There is no more information"}</Descriptions.Item>
            </Descriptions>
        )

        for (let i = 0; i < Fields.length; i++) {
            let value = Fields[i].value
            if (Fields[i].value == "true") value = "yes"
            if (Fields[i].value == "false") value = "no"
            children.push(
                <div>
                    {flag ? (
                        <Form.Item label={Fields[i].title}>
                            <TypeOfNewItem valueOfField={Fields[i].value} i={i} typeOfField={Fields[i].type} itemId={props.id} />
                        </Form.Item>
                    ) : (
                            <Descriptions column={1} >
                                <Descriptions.Item label={Fields[i].title}>{Fields[i].value ? value : "There is no information"}</Descriptions.Item>
                            </Descriptions>
                        )}
                </div>               
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
