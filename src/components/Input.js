import React from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import WebSocketAPI from "../store/WebSocketAPI";
import { FiSend } from "react-icons/fi";


function Input() {

    return (
        <div className="input">
            <input type="text" name="" id="mess" placeholder="Type something..."/>
            <div className="send">
                <img src={Attach} alt=""/>
                <input type="file" style={{display: "none"}} id="file"/>
                <label htmlFor="file">
                    <img src={Img} alt=""/>
                </label>
                <FiSend class ="send-btn" onClick={sendChat}>

                </FiSend>
            </div>

        </div>
    );
}
function sendChat(){
    var mess = document.getElementById('mess').value;
    const socket = new WebSocketAPI();
    socket.on("open", function (){

        const login = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: "test1",
                    pass: '11111'
                }
            }
        }
        socket.send(login);



        var data = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: "people",
                    to: "test2",
                    mes: mess
                }
            }
        }
        socket.send(data);




    });
        socket.on("message", function (event) {
            // Nhận một tin nhắn từ WebSocket
            console.log("WebSocket message received:", event.data);
        });
}

export default Input;