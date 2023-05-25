import React, {useEffect, useState} from 'react'
import Message from "./Message";
function Messages({webSocketAPI, userName}) {
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }
        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);
            if(message.event === "GET_PEOPLE_CHAT_MES"){
                const listMessagePeople = message.data;
                setMessageList(listMessagePeople.slice().reverse());
                // console.log(listMessagePeople.slice().reverse());
            }
            else if(message.event === "GET_ROOM_CHAT_MES"){
                const listMessageRoom = message.data.chatData;
                setMessageList(listMessageRoom.slice().reverse());
                // console.log(listMessageRoom);
            }
        })
    }, [webSocketAPI]);
    return (
        <div className="messages">
            {messageList.map((message, index) => (
                <Message key={index} id={message.id} name={message.name} type={message.type} to={message.to} mes={message.mes}/>
            ))}

        </div>
    );
}

export default Messages;