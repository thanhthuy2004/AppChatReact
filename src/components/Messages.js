import React, {useEffect, useState} from 'react'
import Message from "./Message";
import {getDownloadURL, listAll, ref} from "firebase/storage";
import {storage} from "../firebase";

function Messages({webSocketAPI, userName, userType}) {
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }

        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);

            if(message.event === "GET_PEOPLE_CHAT_MES"){
                let listMessagePeople  = message.data;
                setMessageList(listMessagePeople);
                // console.log(listMessagePeople);
            }
            else if (message.event === "GET_ROOM_CHAT_MES") {
                let listMessageRoom = [];
                if (message.data && message.data.chatData) {
                    listMessageRoom = message.data.chatData;
                }
                setMessageList(listMessageRoom);
                // console.log(listMessageRoom);
            }
        })


    }, [webSocketAPI]);

    return (
        <div className="messages">
            {messageList.map((message) => (
                <Message key={message.id}
                         id={message.id} name={message.name}
                         type={message.type} to={message.to}
                         // mes={message.mes}
                         mes={decodeURI(message.mes)
                         }
                />
            ))}

        </div>
    );
}


export default Messages;