import React, { useEffect, useState } from 'react'
import {Row, Table } from 'antd'
import Axios from "axios"
import UserCard from './UserCard/UserCard'

function Users() {
    const [Users, setUsers] = useState([])
    useEffect(() => {
        Axios.post("/api/users/getAllUsers")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])
    console.log(Users)
    const refresh = (e) =>{
        setUsers(e)
    }
    
    const columns = [
        {
            width: "primary",
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'IsBlocked',
            dataIndex: 'isBlocked',
            key: 'isBlocked',
            render:(block,index)=>{
                return(
                <a>{block?<label style={{color:"Red"}}>Blocked</label>:<label style={{color:"blue"}}>Not Blocked</label>}</a>
                )
            }
        },
        {
            title: 'isAdmin',
            dataIndex: 'role',
            key: 'isAdmin',
            render:(role,index)=>{
                return(
                <a>{role?<label style={{color:"Red"}}>Admin</label>:<label style={{color:"blue"}}>User</label>}</a>
                )
            }
            
        },

        {
            width: "800px",
            title: 'Action',
            key: 'action',
            render: (user, index) => (
                <UserCard refresh={refresh} block={user.isBlocked} id={user._id} role={user.role}/>               
            ),
        },
    ];
    return (
        <div className="users">
            <div style={{ height: '500px' }}>
                <Row gutter={[16, 16]}>
                    <Table columns={columns} dataSource={Users} bordered />
                </Row>
            </div>
        </div>
    )
}
export default Users