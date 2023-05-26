import logo from './logo.svg';
import './App.css';
import Register from "./page/register";
import Login from "./page/login";
import Home from "./page/home";
import {findAllByDisplayValue} from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {

// Tạo một đối tượng WebSocket
  const socket = new WebSocket('ws://140.238.54.136:8080/chat/chat');
//
// // Thiết lập các bộ lắng nghe cho các sự kiện của WebSocket
    socket.addEventListener('open', function (event) {
        // WebSocket đã kết nối thành công
        console.log('WebSocket connected');
        // const username = localStorage.getItem("username");
        // const password = localStorage.getItem("password");
        // Đăng nhâp
        var login = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: "",
                    pass: ""
                }
            }
        };
        // Gửi yêu cầu đăng ký tài khoản
        var registerData = {
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: {
                    user: 'thanhthuan',
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
          "user": "thanhthuan"
        }
      }
        };
        // socket.send(JSON.stringify(registerData));
        // socket.send(JSON.stringify(check));
        // socket.send(JSON.stringify(login));
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
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </Router>
    );
}

export default App;
