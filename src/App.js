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
    useEffect(() => {
        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
        // return () => socket.close();
    }, []);

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
