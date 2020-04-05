import React, { useState } from 'react'
import { Menu } from 'antd';
import Top5Collections from './Sections/Top5Collections'
import LastAddedItems from './Sections/LastAddedItems'
import Users from './Sections/Users'

function LandingPage(props) {
    console.log(props)
    const [click, setClick] = useState(false)
    const [Admin, setAdmin] = useState(false)
    let isAdmin = false

    if (props.user.userData)
        isAdmin = props.user.userData.isAdmin

        const onClick = () => {
        setAdmin(false)
        setClick(true)
    }
    const onAdmin = () => {
        setAdmin(true)
        setClick(false)
    }
    return (

        <div >
            <Menu mode="horizontal">
                <Menu.Item key="items">
                    <a href="/">Last added items</a>
                </Menu.Item>
                <Menu.Item key="collections">
                    <a onClick={onClick}>Top 6 collections</a>
                </Menu.Item>
                {isAdmin && <Menu.Item key="users">
                    <a onClick={onAdmin}>users</a>
                </Menu.Item>}


            </Menu>
            {click ? <Top5Collections /> : Admin ? <Users /> : <LastAddedItems />}
        </div>
    )
}

export default LandingPage


