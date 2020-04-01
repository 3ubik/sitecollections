
import React from 'react'
import {Button } from 'antd'


function Comments(props) {
    const onClick = () => {
        
        window.location.href = `/collections/CommentsOfItem/${props.itemId}`
    }
    return (
        
        <div>
            <Button onClick={onClick}>
                Comments
            </Button>
            
        </div>
    )
}
export default Comments