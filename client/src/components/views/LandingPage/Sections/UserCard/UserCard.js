import React from 'react'
import { Button } from 'antd';
import Axios from 'axios'

function UserCard(props) {
    console.log(props)
    let id = props.id
    let block = !props.block
    


    const onView = () => {
        window.location.href = `/collections/get/${id}`
    }
    const onUpdate = () => {
        window.location.href = `/collections/upload/${id}`
    }
    const onNewAdmin = () => {
        Axios.post(`/api/users/admin_by_id?id=${id}`)
            .then(response => {
                if (response.data.success) {
                    props.refresh(response.data.users)
                    alert('Now user is admin!')
                } else {
                    alert('Failed to make new admin')
                }
            })
    }
    const onBlock = () => {
        Axios.post(`/api/users/block_by_id?id=${id}&block=${block}`)
            .then(response => {
                if (response.data.success) {
                    props.refresh(response.data.users)
                } else {
                    alert('Failed to block user')
                }
            })
    }
    const onDelete = () => {
        Axios.post(`/api/users/delete_by_id?id=${id}`)
            .then(response => {
                if (response.data.success) {
                    props.refresh(response.data.users)
                } else {
                    alert('Failed to delete user')
                }
            })
    }


    if (!props.role) {
        return (
            <div>
                <Button style={{ width: '20%' }} style={{ marginRight: 10 }} onClick={onNewAdmin} >New Admin</Button>
                <Button style={{ width: '20%' }} style={{ marginRight: 10 }} onClick={onUpdate} >Add Collection</Button>
                <Button style={{ width: '20%' }} style={{ marginRight: 10 }} onClick={onView} >User Collections</Button>
                <Button style={{ width: '20%' }} style={{ marginRight: 10 }} onClick={onDelete} >Delete user</Button>
                {props.block ? <Button style={{ width: '20%' }} style={{ marginRight: 10 }} onClick={onBlock} >Unblock user</Button> :
                    <Button style={{ width: '20%' }} style={{ marginRight: 10 }} onClick={onBlock} >Block user</Button>}
            </div>
        )
    }
    else {
        return (
            <label style={{ width: '20%' }} style={{ marginRight: 10 }}>Is admin</label>
        )
    }

}
export default UserCard