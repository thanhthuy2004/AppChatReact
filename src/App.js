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
    const reLoginCode = localStorage.getItem("RE_LOGIN_CODE");
    const userName = localStorage.getItem("username");
    const decodedReLoginCode = atob(reLoginCode);
    const [isLogin, setIsLogin] = useState(false);


    // create socket
    useEffect(() => {
        Modal.setAppElement('#root');
        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
    }, []);
    // useEffect(() => {
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);


    // window.addEventListener('reload', () => {
    //     const socket = new WebSocketAPI();
    //     setWebSocketAPI(socket);
    //     const re_loginData = {
    //     action: 'onchat',
    //         data: {
    //         event: "RE_LOGIN",
    //             data: {
    //             user: userName,
    //                 code: decodedReLoginCode
    //         }
    //     }
    // };
    //
    // webSocketAPI.send(re_loginData);
    //     webSocketAPI.on("message", function (event) {
    //         const message = JSON.parse(event.data);
    //         if (message.event === "RE_LOGIN") {
    //             console.log(message.data);
    //         }
    //     })
    //     console.log("reload nè");
    // });

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
                            <Home webSocketAPI={webSocketAPI} setWebSocketAPI={setWebSocketAPI} setIsLogin={setIsLogin}/>
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
