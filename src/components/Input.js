import React from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { FiSend } from "react-icons/fi";

function Input({ webSocketAPI }) {
    const sendChat = () => {
        const mess = document.getElementById('mess').value;

        const data = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: "people",
                    to: "test2",
                    mes: mess
                }
            }
        };

        webSocketAPI.send(data);

        webSocketAPI.on("message", function (event) {
            console.log("WebSocket message received:", event.data);
        });

        document.getElementById('mess').value = ''; // Clear the input field after sending chat
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
