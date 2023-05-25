import React, {useState, useEffect} from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import WebSocketAPI from '../store/WebSocketAPI'

function Home({webSocketAPI, setWebSocketAPI}) {
    // const reLoginCode = localStorage.getItem("RE_LOGIN_CODE");
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
    // const handleReLogin = () => {
    //     // Gửi yêu cầu đăng nhập đến API appchat
    //     const re_loginData = {
    //         action: "onchat",
    //         data: {
    //             event: "RE_LOGIN",
    //             data: {
    //                 user: username,
    //                 code: reLoginCode,
    //             },
    //         },
    //     };
    //     if(username !== ''){
    //         // webSocketAPI.send(re_loginData);
    //     }
    // };

    const [userName, setUserName] = useState('');

    return (
        <div className="home">
            <div className="container">
                <Sidebar
                    webSocketAPI={webSocketAPI}
                    setWebSocketAPI={setWebSocketAPI}
                    setUserName={setUserName}
                />
                <Chat
                    webSocketAPI={webSocketAPI}
                    userName={userName}
                />
            </div>
        </div>
    );
}

export default Home;
