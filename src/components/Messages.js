import React, {useEffect, useState} from 'react'
import Message from "./Message";

function Messages({webSocketAPI, userName, userType}) {
    const [messageList, setMessageList] = useState([]);
    const getMessPeopleList = {
        action: "onchat",
        data: {
            event: "GET_PEOPLE_CHAT_MES",
            data: {
                name: userName,
                page: 1
            }
        }
    }
    const getMessRoomList = {
        action: "onchat",
        data: {
            event: "GET_ROOM_CHAT_MES",
            data: {
                name: userName,
                page: 1
            }
        }
    }
    if(userType === 0) {
        webSocketAPI.send(getMessPeopleList);
    }else if (userType === 1){
        webSocketAPI.send(getMessRoomList);
    }
    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }

        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);

            if(message.event === "GET_PEOPLE_CHAT_MES"){
                const listMessagePeople = message.data;
                setMessageList(listMessagePeople);
                // console.log(listMessagePeople.slice().reverse());
            }
            else if (message.event === "GET_ROOM_CHAT_MES") {
                let listMessageRoom = [];
                if (message.data && message.data.chatData) {
                    listMessageRoom = message.data.chatData;
                }
                console.log(message.data);
                setMessageList(listMessageRoom);
            }
        })
    }, [webSocketAPI]);

    return (
        <div className="messages">
            {messageList.map((message) => (
                <Message key={message.id} id={message.id} name={message.name} type={message.type} to={message.to} mes={message.mes}/>
            ))}

        </div>
    );
}


export default Messages;