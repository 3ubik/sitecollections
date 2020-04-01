import React, { useState } from 'react'
import { Input, Checkbox, InputNumber } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Axios from 'axios'

function TypeofNewItem(props) {
    const [value, setValue] = useState(props.valueOfField)
    const type = props.typeOfField
    const name = props.nameOfField


    
    const Change =  (event) => {
        let valueOfField = "false"
        if (type == 1 || type == 2 || type == 4) {
            const e = event.currentTarget.value
            setValue(e)
            valueOfField = e
        }
        else if (type == 3) 
        {        
            const e = event.target.checked
            setValue(e)
            valueOfField = e
        }
        
        else 
        {
            const e = event
            setValue(e)
            valueOfField = e
        } 
        const field = {
            value: valueOfField,
            title: name
        }
        if (props.collectionId) {
             Axios.put(`/api/collections/upDatefield?id=${props.collectionId}`, field)
                .then(response => {
                    
                    if (!response.data.success)
                        alert('Failed to fectch product datas')
                    else props.refreshfunction(response.data.fields)
                })
        }
        if (props.itemId) {
             Axios.put(`/api/collections/ItemupDatefield?id=${props.itemId}&i=${props.i}&value=${valueOfField}`, field)
        
               
        }
    }

    if (type == 1) {
        return (
            <div>
                <Input onChange={Change} value={value} />
            </div>
        )
    }
    if (type == 2) {
        return (
            <div>
                <TextArea onChange={Change}value={value} />
            </div>
        )
    }
    if (type == 3) {
        return (
            <div>
                <Checkbox onChange={Change} checked={value} />
            </div>
        )
    }
    if (type == 4) {
        return (
            <div>
                <Input type='date' onChange={Change}  value={value}/>
            </div>
        )
    }
    if (type == 5) {
        return (
            <div>
                <InputNumber onChange={Change} value={value} />
            </div>
        )
    }

}
export default TypeofNewItem