import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import Axios from 'axios'


function Like(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)

    useEffect(() => {
        Axios.post(`/api/like/GetLike?itemId=${props.itemId}`)
            .then(response => {                
                if (response.data.success) {                   
                    setLikes(response.data.likes.length)  
                    console.log(window.localStorage.getItem('userId'))
                    if(response.data.userId){
                        response.data.likes.map(like => {                        
                            if (like.userId === response.data.userId) {
                                setLikeAction('liked')
                            }
                        })
                    }                   
                } else {
                    alert('Failed to get likes')
                }
            })
    }, [])
    const onLike = () => {

        if (LikeAction === null) {

            Axios.post(`/api/like/upLike?itemId=${props.itemId}` )
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')                

                        


                    } else {
                        alert('Failed to increase the like')
                    }
                })


        } else {

            Axios.post(`/api/like/unLike?itemId=${props.itemId}`)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }

    }
   
    return (

        <React.Fragment >
            <span key="comment-basic-like" style={{ margin: '25px' }}>
                <Tooltip title="Like" >
                    <Icon type="like" 
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}

                        onClick={onLike}
                    />


                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>


            </span>
        </React.Fragment>
    )
}
export default Like