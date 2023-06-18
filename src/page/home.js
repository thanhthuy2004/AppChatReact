import React, {useState, useEffect} from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import "../App.css"
import WebSocketAPI from '../store/WebSocketAPI'

function Home({webSocketAPI, setWebSocketAPI, setIsLogin, reLogin}) {
    const reLoginCode = localStorage.getItem("RE_LOGIN_CODE");
    const getUserName = localStorage.getItem("username");
    const decodedReLoginCode = atob(reLoginCode);
    const [userName, setUserName] = useState('');
    const [userType, setUserType] = useState(0);
    reLogin(webSocketAPI);
    return (
        <div className="home">
            <div className="container1">
                <Sidebar
                    webSocketAPI={webSocketAPI}
                    setWebSocketAPI={setWebSocketAPI}
                    setUserName={setUserName}
                    userName={userName}
                    setUserType={setUserType}
                    userType={userType}
                    setIsLogin={setIsLogin}
                    reLogin={reLogin}
                />
                <Chat
                    webSocketAPI={webSocketAPI}
                    userName={userName}
                    userType={userType}
                />
            </div>
        </div>
    );
}

export default Home;