import './App.css';
import Register from "./page/register";
import Login from "./page/login";
import Home from "./page/home";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import WebSocketAPI from "./store/WebSocketAPI";
import Modal from 'react-modal';
import {listAll} from "firebase/storage";


function App() {
    const [webSocketAPI, setWebSocketAPI] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    // define reLogin function
    const reLogin = (webSocketAPI) => {
        if (!webSocketAPI || webSocketAPI.socket.readyState !== WebSocket.OPEN) {
            return;
        }
        const username = localStorage.getItem("username");
        const encodedValue = localStorage.getItem("RE_LOGIN_CODE");
        if (username && encodedValue) {
            const reLoginCode = window.atob(encodedValue);
            const reLoginData = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: username,
                        code: reLoginCode,
                    },
                },
            };
            webSocketAPI.send(reLoginData);
        }
    };

    // create socket
    useEffect(() => {
        Modal.setAppElement('#root');
        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
        const isLogined = sessionStorage.getItem("isLogin");
        if (isLogined) {
            setIsLogin(isLogined);
        }
    }, []);

    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }
        // call reLogin function
        reLogin(webSocketAPI);
        webSocketAPI.socket.onopen = () => reLogin(webSocketAPI);
        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);
            if(message.event === "RE_LOGIN") {
                if (message.status === "success") {
                    setIsLogin(true);
                }
            }
            if (message.data && message.data.RE_LOGIN_CODE) {
                const encodedValue = window.btoa(message.data.RE_LOGIN_CODE);
                localStorage.setItem("RE_LOGIN_CODE", encodedValue);
            }
        });
    }, [webSocketAPI]);

    // chưa đăng nhập thì chuyển hướng sang trang login
    const ProtectedRoute = ({children}) => {
        if (!isLogin) {
            return <Navigate to="/" />
        }
        return children;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={
                        <ProtectedRoute>
                            {/* pass reLogin function as prop */}
                            <Home webSocketAPI={webSocketAPI} setWebSocketAPI={setWebSocketAPI} setIsLogin={setIsLogin} reLogin={reLogin}/>
                        </ProtectedRoute>
                    }/>
                    <Route path='login' element={
                        <Login
                            webSocketAPI={webSocketAPI}
                            setIsLogin={setIsLogin}/>}
                    />
                    <Route path='register' element={<Register webSocketAPI={webSocketAPI}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

