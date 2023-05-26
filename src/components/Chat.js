import React from 'react'
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";

function Chat({webSocketAPI, userName}) {

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{userName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt=""/>
                    <img src={Add} alt=""/>
                    <img src={More} alt=""/>
                </div>
            </div>

            <Messages webSocketAPI={webSocketAPI} userName={userName}/>

            <Input webSocketAPI={webSocketAPI } userName={userName}/>
        </div>
    );
}

export default Chat;