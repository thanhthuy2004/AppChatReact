import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import WebSocketAPI from '../store/WebSocketAPI';
import "../App.css"
function Home() {
    const [webSocketAPI, setWebSocketAPI] = useState(null);
    const reLoginCode = localStorage.getItem("RE_LOGIN_CODE");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
        socket.on("open", function (event) {

            // Gửi yêu cầu đăng nhập đến API appchat
            const re_loginData = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: username,
                        code: reLoginCode,
                    },
                },
            };
            socket.on("message", function (event) {
                console.log("WebSocket message received:", event.data);
                const message = JSON.parse(event.data);

                // Kiểm tra xem có thuộc tính data.RE_LOGIN_CODE trong tin nhắn không
                if (message.data && message.data.RE_LOGIN_CODE) {
                    // Lưu giá trị RE_LOGIN_CODE vào localStorage
                    localStorage.setItem("RE_LOGIN_CODE", message.data.RE_LOGIN_CODE);
                }
            });
            socket.send(re_loginData);
        });
        return () => {
            socket.close();
        };
    }, []);


    return (
        <div className="home">
            <div className="container1">
                <Sidebar webSocketAPI={webSocketAPI}/>
                <Chat webSocketAPI={webSocketAPI}/>
            </div>
        </div>
    );
}

export default Home;
