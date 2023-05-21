import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function Home() {
    const reLoginCode = localStorage.getItem("RE_LOGIN_CODE");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
        socket.addEventListener("open", function (event) {
            console.log("WebSocket connected");

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
            socket.addEventListener("message", function (event) {
                console.log("WebSocket message received:", event.data);
                const message = JSON.parse(event.data);

                // Kiểm tra xem có thuộc tính data.RE_LOGIN_CODE trong tin nhắn không
                if (message.data && message.data.RE_LOGIN_CODE) {
                    // Lưu giá trị RE_LOGIN_CODE vào localStorage
                    localStorage.setItem("RE_LOGIN_CODE", message.data.RE_LOGIN_CODE);
                }
            });
            socket.send(JSON.stringify(re_loginData));
        });
    }, []);

    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Home;
