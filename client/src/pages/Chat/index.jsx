import React, { useEffect, useState, useRef } from 'react'
import './chat.css';
//Importing bootstrap and other modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ThreeDots } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { sendChat, getChatMessages, resetChatMessages } from '../../redux/chat/chatSlice';
import moment from 'moment'
import { STATIC_FILES_URL } from '../../constants/url'

const Chat = () => {

    const dispatch = useDispatch()
    const { state: { user, ad } } = useLocation()
    const { fullName } = user
    const { title, price, images } = ad
    const initials = fullName.charAt(0)

    const currentUser = useSelector((selector) => selector.auth)
    const [data, setData] = useState({
        senderId: currentUser.user._id,
        recipientId: user._id,
        adId: ad._id,
        content: "",
    })

    const { chatMessages, errorMessage, successMessage, isError, isSuccess, isLoading } =
        useSelector((selector) => selector.chats)

    const bottomRef = useRef(null);

    const [reloadChat, setReloadChat] = useState(false)

    // useEffect(() => {
    //     // if (isError && errorMessage) {
    //     //     toast.error(errorMessage)
    //     // }

    //     // if (isSuccess && successMessage) {
    //     //     toast.success(successMessage)
    //     // }
    // }, [isError, isSuccess, errorMessage, successMessage, dispatch])

    useEffect(() => {
        const queryData = {
            senderId: data.senderId,
            recipientId: data.recipientId,
            adId: data.adId,
        }
        dispatch(getChatMessages(queryData))
        setReloadChat(false)
        return () => dispatch(resetChatMessages())
    }, [reloadChat, dispatch])


    useEffect(() => {
        if (bottomRef) {
            bottomRef.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])


    const handleChatBox = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSendAction = (e) => {
        e.preventDefault()

        dispatch(sendChat(data))

        setData({
            senderId: currentUser.user._id,
            recipientId: user._id,
            adId: ad._id,
            content: "",
        })
        setReloadChat(true)
    }


    if (isLoading) {
        return (
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ThreeDots color="#3a77ff" height={100} width={100} />
            </div>
        )
    }

    return (
        <div className="container">
            <h3 className=" text-center">Chats</h3>
            <div className="messaging">
                <div className="inbox_msg">
                    <div className="inbox_people">
                        <div className="headind_srch">
                            <div className="recent_heading">
                                <h4>Recent</h4>
                            </div>
                            <div className="srch_bar">
                                <div className="stylish-input-group">
                                    <input type="text" className="search-bar" placeholder="Search" />
                                    <span className="input-group-addon">
                                        <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                    </span> </div>
                            </div>
                        </div>
                        <div className="inbox_chat">
                            <div className="chat_list active_chat">
                                <div className="chat_people">
                                    <div className="chat_img">{initials}</div>
                                    <div className="chat_ib">
                                        <h5> {fullName} <span className="chat_date">date</span></h5>
                                        <p>{title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mesgs">
                        <div className="active_chat_user">
                            <div className="active_chat_img">{initials}</div>
                            <div className="active_chat_name">
                                <h5> {fullName}</h5>
                            </div>
                        </div>
                        <div className='active_ad_user'>
                            <div className="active_ad_img" key={"ad_image"}>
                                <img src={`${STATIC_FILES_URL}/${images[0]}`}
                                    alt="image"
                                    width={100}
                                    height={80}
                                />
                            </div>
                            <div className="active_ad_info" key={"ad_info"}>
                                <h5> {title}</h5>
                                <p> Rs {price}</p>
                            </div>
                        </div>
                        <div className="msg_history" ref={bottomRef}>
                            {chatMessages.length > 0 ? (
                                chatMessages.map((message) => (
                                    <div key={message._id}>
                                        {
                                            (message.sender == user._id) ? (
                                                <div className="incoming_msg">
                                                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                                    <div className="received_msg">
                                                        <div className="received_withd_msg">
                                                            <p>{message.content}</p>
                                                            <span className="time_date">{moment(message.timestamp).fromNow()}</span></div>
                                                    </div>
                                                </div>
                                            )
                                                :
                                                (<div className="outgoing_msg">
                                                    <div className="sent_msg">
                                                        <p>{message.content}</p>
                                                        <span className="time_date">{moment(message.timestamp).fromNow()}</span> </div>
                                                </div>)
                                        }
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: "center" }}>
                                    <h5>You have no chats to show</h5>
                                </div>
                            )}
                        </div>
                        <div className="type_msg">
                            <div className="input_msg_write">
                                <input type="text" className="write_msg" placeholder="Type a message" onChange={handleChatBox} name="content" value={data.content} />
                                <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" onClick={handleSendAction}></i></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div></div>
    )
}

export default Chat;