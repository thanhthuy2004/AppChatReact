import React, {useState, useEffect} from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import "../App.css"
import WebSocketAPI from '../store/WebSocketAPI'

function Home({webSocketAPI, setWebSocketAPI}) {

    // const username = localStorage.getItem("username");

    // useEffect(() => {
    //     if (!webSocketAPI) {
    //         return;
    //     }
    // webSocketAPI.on("message", function (event) {
    //     console.log("WebSocket message received:", event.data);
    //     const message = JSON.parse(event.data);
    //
    //     // Kiểm tra xem có thuộc tính data.RE_LOGIN_CODE trong tin nhắn không
    //     if (message.data && message.data.RE_LOGIN_CODE) {
    //         // Lưu giá trị RE_LOGIN_CODE vào localStorage
    //         localStorage.setItem("RE_LOGIN_CODE", message.data.RE_LOGIN_CODE);
    //     }
    // });

    // return () => {
    //     socket.close();
    // };
    // }, [webSocketAPI]);


    const [userName, setUserName] = useState('');
    const [userType, setUserType] = useState(0);

    return (
        <div className="home">
            <div className="container1">
                <Sidebar
                    webSocketAPI={webSocketAPI}
                    setWebSocketAPI={setWebSocketAPI}
                    setUserName={setUserName}
                    userName={userName}
                    setUserType={setUserType}
                    userType={userType}
                />
                <Chat
                    webSocketAPI={webSocketAPI}
                    userName={userName}
                    userType={userType}
                />
            </div>
        </div>
    );
}

export default Home;