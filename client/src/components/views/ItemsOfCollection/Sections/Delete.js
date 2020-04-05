import React from 'react'
import { Button } from 'antd';

import Axios from 'axios'
function DeleteItem (props){
    const onDelete = () =>{
       Axios.delete(`/api/collections/item_by_id?id=${props.id}&collectionId=${props.collectionId}&itemlenght=${props.length}`)
        .then(response => {
            if (response.data.success) {
                props.refreshfunction(response.data.items)
                alert("Item deleted")
            } else alert('Failed to delete item')
        })
    }
    return(
        <div>
            <Button  onClick={onDelete}>
                Delete
            </Button>
        </div>
    )
}
export default DeleteItem