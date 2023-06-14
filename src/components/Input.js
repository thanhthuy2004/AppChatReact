import React, { useState } from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { FiSend } from "react-icons/fi";
import InputEmoji from 'react-input-emoji';

function Input({ webSocketAPI, userName }) {
    const [type, setType] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };


    if (!webSocketAPI) {
        return null;
    }

    webSocketAPI.on("message", function (event) {
        const message = JSON.parse(event.data);
        if (message.event === "GET_PEOPLE_CHAT_MES") {
            setType("people");
        } else if (message.event === "GET_ROOM_CHAT_MES") {
            setType("room");
        }
    });

    const sendChat = (event) => {
        const mess = newMessage;
        const messUtf8 = encodeURI(mess);
        event.preventDefault();
        const data = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: type,
                    to: userName,
                    // mes: mess
                    mes: messUtf8
                }
            }
        };
      webSocketAPI.send(data);
      setNewMessage("");
    };

    return (
        <form className="input" onSubmit={sendChat}>
            <div className="send">
                <div className="chat-sender">
                    <InputEmoji id="mess" value={newMessage} onChange={handleChange}   placeholder="Nhập vào tin nhắn..."/>
                </div>
                <img src={Attach} alt="" />
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button id="submitButton" className="send-btn" type="submit">
                    <FiSend />
                </button>
            </div>
        </form>
    );
}

export default Input;
