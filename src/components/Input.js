
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


const sendChat = (event) => {
        const mess = document.getElementById('mess').value;
        // const messUtf8 = encodeURI(mess);
    event.preventDefault();

        const data = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: type,
                    to: userName,
                    mes: mess
                    // mes: messUtf8
                }
            }
        };
        webSocketAPI.send(data);

        document.getElementById('mess').value = '';

    };

    return (
        <form className="input" onSubmit={sendChat}>
            <input type="text" name="" id="mess" placeholder="Aa" required={true}/>
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
               <button id="submitButton" className="send-btn" > <FiSend /> </button>
            </div>
        </form>
    );
}

export default Input;
