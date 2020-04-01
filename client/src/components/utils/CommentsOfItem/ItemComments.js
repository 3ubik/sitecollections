import React, { Component } from 'react'
import { Form, Col, Input, Row, Icon, Button } from 'antd'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import moment from 'moment'
import { getChats,afterPostMessage } from '../../../_actions/chat_actions'
import ComentCard from './Sections/ComentCard'



export class ItemComments extends Component {
    state = {
        chatMessage: "",
    }
   
    


    componentDidMount() {
        let server = "https://nzcollections.herokuapp.com"

        this.props.dispatch(getChats(this.props.match.params.itemId))

        this.socket = io(server)
        this.socket.on("Output Comment", messageFromBackEnd => {
            this.props.dispatch(afterPostMessage(messageFromBackEnd))
            
        })
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }


    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }
    
    renderCards=()=>
    
        this.props.chats.chats &&
            this.props.chats.chats.map((chat)=>(
               
                <ComentCard key={chat._id} {...chat}/>
                
            ))

    
    submitChatMessage = (e) => {
        e.preventDefault()
        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }

        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name
        let userImage = this.props.user.userData.image
        let itemId = this.props.match.params.itemId
        let nowTime = moment()
        let type = "Text"

        this.socket.emit("Input Comment", {
            chatMessage,
            userId,
            userName,
            userImage,
            itemId,
            nowTime,
            type
        })
        this.setState({ chatMessage: "" })


    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}> Comments</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container">
                         {this.props.chats && (
                            this.renderCards()
                          )} 
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Comment"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                />
                            </Col>
                            <Col span={2}>

                            </Col>

                            <Col span={4}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage} htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.user,
        chats:state.chat,
    }
}
export default connect(mapStateToProps)(ItemComments)
