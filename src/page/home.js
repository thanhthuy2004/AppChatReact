import React from 'react'
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function Home() {
    // Tạo một đối tượng WebSocket
    const socket = new WebSocket('ws://140.238.54.136:8080/chat/chat');
//
// // Thiết lập các bộ lắng nghe cho các sự kiện của WebSocket
    socket.addEventListener('open', function (event) {
        // WebSocket đã kết nối thành công
        console.log('WebSocket connected');

        // Đăng nhâp
        var login = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: "thanhthuy",
                    pass: "12345"
                }
            }
        };
        // Gửi yêu cầu đăng ký tài khoản
        var registerData = {
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: {
                    user: 'thanhthuy',
                    pass: '12345'
                }
            }
        };
        // đăng xuất
        var logout = {
            action: 'onchat',
            data: {
                event: 'LOGOUT'
            }
        };
        var check = {
            action: 'onchat',
            data: {
                event: "CHECK_USER",
                data: {
                    "user": "thanh"
                }
            }
        };
        var getchatmessroom = {
            action: "onchat",
            data: {
            event: "GET_ROOM_CHAT_MES",
                data: {
                    name: "abcRoom",
                    page:1
            }
        }
        };
        var getchatmesspeople = {
            action: "onchat",
            data: {
            event: "GET_PEOPLE_CHAT_MES",
                data: {
                name: "test1",
                    page:1
            }
        }
        };
        socket.send(JSON.stringify(login));
        socket.send(JSON.stringify(getchatmessroom));
        socket.send(JSON.stringify(getchatmesspeople));
        // socket.send(JSON.stringify(check));
        // socket.send(JSON.stringify(logout));
    });

    socket.addEventListener('message', function (event) {
        // Nhận một tin nhắn từ WebSocket
        console.log('WebSocket message received:', event.data);

        // Kiểm tra nếu nhận được phản hồi đăng xuất thành công, đóng kết nối với WebSocket
        // if (event.data === '{"action":"onchat","data":{"event":"LOGOUT_OK"}}') {
        //     console.log('Logged out successfully');
        //     // socket.close();
        // }
    });

    socket.addEventListener('close', function (event) {
        // WebSocket đã đóng kết nối

        console.log('WebSocket closed');
    });

    socket.addEventListener('error', function (event) {
        // Kết nối đến WebSocket bị lỗi
        console.error('WebSocket error:', event);
    });
    return (
        <div className="home">
            <div className="container">
            <Sidebar/>
            <Chat/>
            </div>
        </div>
    );
}

export default Home;