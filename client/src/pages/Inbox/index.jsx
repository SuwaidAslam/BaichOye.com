import React, { useEffect, useState, useRef } from 'react'
import './inbox.css';
//Importing bootstrap and other modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ThreeDots } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { sendChat, myChats, resetChats, getChatMessages, resetChatMessages } from '../../redux/chat/chatSlice';
import moment from 'moment'

const Inbox = () => {

    const dispatch = useDispatch()
    // const { state: { user, ad } } = useLocation()
    // const { fullName } = user
    // const { title, price, images } = ad
    // const initials = fullName.charAt(0)

    const [data, setData] = useState({
        receiver: "",
        ad: "",
        message: ""
    })


    const [message_history, setMessage_history] = useState({})
    const [active_chat_data, setActive_chat_data] = useState({})
    const bottomRef = useRef(null)

    const { chats, chatMessages, errorMessage, successMessage, isError, isSuccess, isLoading } =
        useSelector((selector) => selector.chats)

    const currentUser = useSelector((selector) => selector.auth)
    const [reloadChat, setReloadChat] = useState(false)

    useEffect(() => {
        // if (isError && errorMessage) {
        //     toast.error(errorMessage)
        // }

        // if (isSuccess && successMessage) {
        //     toast.success(successMessage)
        // }
    }, [isError, isSuccess, errorMessage, successMessage, dispatch])

    useEffect(() => {
        dispatch(myChats())
        // setReloadChat(false)
        return () => dispatch(resetChats())
    }, [dispatch])

    
    useEffect(() => {
        const queryData = {
            receiver: data.receiver,
            sender: currentUser.user._id,
            ad: data.ad,
        }
        console.log(queryData)
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
            ...data,
            message: ""
        })
        setReloadChat(true)
    }

    const handleChatClick = (messages, chat) => {

        if (chat.messages[0].sender[0]._id == currentUser.user._id) {
            const receiver = chat.messages[0].receiver[0]._id
            setData({
                ...data,
                receiver: receiver,
                ad: chat._id[0]._id,
            })
        }
        else {
            const receiver = chat.messages[0].sender[0]._id
            setData({
                ...data,
                receiver: receiver,
                ad: chat._id[0]._id,
            })
        }
        setMessage_history(messages)
        setActive_chat_data(chat)
        setReloadChat(true)
    }

    // if (isLoading) {
    //     return (
    //         <div
    //             style={{
    //                 height: '100vh',
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //             }}
    //         >
    //             <ThreeDots color="#3a77ff" height={100} width={100} />
    //         </div>
    //     )
    // }

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
                            {chats.length > 0 ? (
                                chats.map((chat) => <div className="chat_list active_chat"
                                    key={chat} onClick={() => handleChatClick(chat.messages, chat)}>
                                    <div className="chat_people">
                                        <div className="chat_img">{chat.messages[0].receiver[0].fullName.charAt(0)}</div>
                                        <div className="chat_ib">
                                            {(chat.messages[0].sender[0]._id == currentUser.user._id)
                                                ?
                                                <h5> {chat.messages[0].receiver[0].fullName} <span className="chat_date">{moment(chat.messages[0].createdAt).fromNow()}</span></h5>
                                                :
                                                <h5> {chat.messages[0].sender[0].fullName} <span className="chat_date">{moment(chat.messages[0].createdAt).fromNow()}</span></h5>
                                            }
                                            <p>{chat._id[0].title}</p>
                                        </div>
                                    </div>
                                </div>)
                            ) : (
                                <div style={{ textAlign: "center" }}>
                                    <h5>You have no chats to show</h5>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mesgs">
                        {(Object.keys(active_chat_data).length != 0)
                            &&
                            <>
                                <div className="active_chat_user">
                                    {(active_chat_data._id[0].user == currentUser.user._id)
                                        ?
                                        <>
                                            <div className="active_chat_img">{active_chat_data.messages[0].receiver[0].fullName.charAt(0)}</div>
                                            <div className="active_chat_name">
                                                <h5> {active_chat_data.messages[0].receiver[0].fullName}</h5>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="active_chat_img">{active_chat_data.messages[0].sender[0].fullName.charAt(0)}</div>
                                            <div className="active_chat_name">
                                                <h5> {active_chat_data.messages[0].sender[0].fullName}</h5>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className='active_ad_user'>
                                    <div className="active_ad_img">
                                        <img src={`/uploads/${active_chat_data._id[0].images[0]}`}
                                            alt="image"
                                            width={100}
                                            height={80}
                                        />
                                    </div>
                                    <div className="active_ad_info">
                                        <h5> {active_chat_data._id[0].title}</h5>
                                        <p> Rs {active_chat_data._id[0].price}</p>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="msg_history" ref={bottomRef}>
                            {chatMessages.length > 0 ? (
                                chatMessages.map((message) => (
                                    (message.sender == currentUser.user._id)
                                        ?
                                        <div className="outgoing_msg">
                                            <div className="sent_msg">
                                                <p>{message.message}</p>
                                                <span className="time_date">{moment(message.createdAt).fromNow()}</span> </div>
                                        </div>
                                        :
                                        <div className="incoming_msg">
                                            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                            <div className="received_msg">
                                                <div className="received_withd_msg">
                                                    <p>{message.message}</p>
                                                    <span className="time_date">{moment(message.createdAt).fromNow()}</span></div>
                                            </div>
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
                                <input type="text" className="write_msg" placeholder="Type a message" onChange={handleChatBox} name="message" value={data.message} />
                                <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" onClick={handleSendAction}></i></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div></div>
    )
}

export default Inbox;