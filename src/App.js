import './App.css';
import Register from "./page/register";
import Login from "./page/login";
import Home from "./page/home";
import {findAllByDisplayValue} from "@testing-library/react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import WebSocketAPI from "./store/WebSocketAPI";
import {AuthContext} from "./context/AuthContext";

function App() {
    const [webSocketAPI, setWebSocketAPI] = useState(null);
    useEffect(() => {
        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
        // setInterval(function() {
        //     if (webSocketAPI.readyState === WebSocket.CLOSED) {
        //         const socket = new WebSocketAPI();
        //         setWebSocketAPI(socket);
        //     }
        // }, 1000);
        // return () => socket.close();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home webSocketAPI={webSocketAPI}/>} />
                    <Route path='login' element={<Login webSocketAPI={webSocketAPI}/>} />
                    <Route path='register' element={<Register webSocketAPI={webSocketAPI}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
