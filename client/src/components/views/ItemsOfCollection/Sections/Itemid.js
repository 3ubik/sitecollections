import React from 'react'
import { Button } from 'antd'
import Axios from 'axios'



function Itemid(props){
    const onUpdate=(()=>{
        window.location.href=`/collections/UpdateItem/${props.itemId}`
    })
    const onComments=(()=>{
        window.location.href=`/collections/CommentsOfItem/${props.itemId}`
    })
    
    const onDeleteItem = () => {

        Axios.delete(`/api/collections/item_by_id?&id=${props.itemId}&collectionId=${props.collectionId}&itemlenght=${props.itemlenght}`)
            .then(response => {
                if (response.data.success) {
                    alert('Item Successfully Deleted')
                    window.location.href = `/collections/itemsOfCollection/${props.collectionId}`

                } else {
                    alert('Failed to delete Item')
                }
            })
    }
    return (

        <div>
           
           <Button onClick={onUpdate} style={{ margin: '20px' }} >
                Update item
            </Button>

            <Button onClick={onDeleteItem} style={{ margin: '20px' }}>
                Delete item
            </Button>
            <Button onClick={onComments} style={{ margin: '20px' }}>
                Comments
            </Button>
        </div>
    )
}
export default Itemid