import './App.css';
import Register from "./page/register";
import Login from "./page/login";
import Home from "./page/home";
import {findAllByDisplayValue} from "@testing-library/react";
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import WebSocketAPI from "./store/WebSocketAPI";

function App() {
    const [webSocketAPI, setWebSocketAPI] = useState(null);
    const reLoginCode = localStorage.getItem("RE_LOGIN_CODE");
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
    }, []);

    // window.addEventListener('load', () => {
    //     const re_loginData = {
    //         status: "success",
    //         event: "RE_LOGIN",
    //         data: {
    //             RE_LOGIN_CODE: {reLoginCode}
    //         }
    //     };
    //     webSocketAPI.send(re_loginData);
    //     webSocketAPI.on("message", function (event) {
    //         const message = JSON.parse(event.data);
    //         if (message.event === "RE_LOGIN") {
    //             const listUser = message.data;
    //             // console.log(listUser);
    //         }
    //     })
    // });
    // if(!isLogin){
    //     return navigate("login");
    // }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={
                            <Home webSocketAPI={webSocketAPI} setWebSocketAPI={setWebSocketAPI}/>
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
