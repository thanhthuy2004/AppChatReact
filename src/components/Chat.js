import React, {useState} from 'react'
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import Messages from "./Messages";
import Input from "./Input";
import ChatInfor from "./ChatInfor";
function Chat({webSocketAPI, userName, userType}) {

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{userName}</span>
                <div className="chatIcons">

                    <img src={Cam} alt="" />

                    <img src={Add} alt=""/>
                    <ChatInfor webSocketAPI={webSocketAPI} userName={userName} userType={userType}/>
                </div>
            </div>

            <Messages webSocketAPI={webSocketAPI} userName={userName} userType={userType}/>

            <Input webSocketAPI={webSocketAPI } userName={userName} />
        </div>
    );
}

export default Chat;