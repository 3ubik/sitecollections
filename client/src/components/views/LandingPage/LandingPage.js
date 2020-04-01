import React, {useState} from 'react'
import { Menu } from 'antd';
import Top5Collections from './Sections/Top5Collections'
import LastAddedItems from './Sections/LastAddedItems'

function LandingPage(props) {
    const [click, setClick] = useState(false)
    const onClick = () => {
        
        setClick(true)
    }
    return (
       
        <div className="collections">
        <Menu mode="horizontal">
            <Menu.Item key="items">
                <a href="/">Last added items</a>
            </Menu.Item>
            <Menu.Item key="collections">
                <a onClick={onClick}>Top 6 collections</a>
            </Menu.Item>
            
            
        </Menu>
        {click ? <Top5Collections /> : <LastAddedItems />}
    </div>
    )
}

export default LandingPage
