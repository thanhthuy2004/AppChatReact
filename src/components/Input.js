
import React, {useState} from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { FiSend } from "react-icons/fi";

function Input({ webSocketAPI, userName }) {
    const [type, setType] = useState([]);
    if (!webSocketAPI) {
        return;
    }
    webSocketAPI.on("message", function (event) {
        const message = JSON.parse(event.data);
        if(message.event === "GET_PEOPLE_CHAT_MES"){
            setType("people");
        }
        else if(message.event === "GET_ROOM_CHAT_MES"){
            setType("room");
        }
    });


const sendChat = () => {
        const mess = document.getElementById('mess').value;

        const data = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: type,
                    to: userName,
                    mes: mess
                }
            }
        };
        webSocketAPI.send(data);

        document.getElementById('mess').value = '';

    };


    return (
        <div className="input">
            <input type="text" name="" id="mess" placeholder="Type something..." />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <FiSend className="send-btn" onClick={sendChat} />
            </div>
        </div>
    );
}

export default Input;
