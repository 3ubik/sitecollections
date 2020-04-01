import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

function ComentCard(props) {
    console.log(props)
    return (
        <div style={{ width: '100%' }}>
            <Comment
                author={props.sender.name}
                avatar={
                    <Avatar
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
                content={                 
                        <p>
                            {props.message}
                        </p>
                }
                datetime={
                    <Tooltip title={moment(props.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(props.createdAt).fromNow(moment(props.createdAt))}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default ComentCard;