import './App.css';
import Register from "./page/register";
import Login from "./page/login";
import Home from "./page/home";
import {findAllByDisplayValue} from "@testing-library/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import WebSocketAPI from "./store/WebSocketAPI";




function App() {
    const [webSocketAPI, setWebSocketAPI] = useState(null);
    const reLoginCode = localStorage.getItem("RE_LOGIN_CODE");
    useEffect(() => {
        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
        // return () => socket.close();
    }, []);

    window.addEventListener('load', () => {
        const re_loginData = {
            status: "success",
            event: "RE_LOGIN",
            data: {
                RE_LOGIN_CODE: {reLoginCode}
            }
        };
        webSocketAPI.send(re_loginData);
        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);
            if (message.event === "RE_LOGIN") {
                const listUser = message.data;
                console.log(listUser);
            }
        })
    });
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home webSocketAPI={webSocketAPI} setWebSocketAPI={setWebSocketAPI}/>} />
                    <Route path='login' element={<Login webSocketAPI={webSocketAPI} setWebSocketAPI={setWebSocketAPI}/>} />
                    <Route path='register' element={<Register webSocketAPI={webSocketAPI}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
