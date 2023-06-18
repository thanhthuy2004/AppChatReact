import React from 'react'
import Navbar from "./Navbar";
// import Search from "./Search";
import Chats from "./Chats";

function Sidebar({webSocketAPI , setWebSocketAPI, setUserName, userName, setUserType, userType,setIsLogin, reLogin}) {

    reLogin(webSocketAPI);
    webSocketAPI.socket.onopen = () => reLogin(webSocketAPI);
    return (
        <div className="sidebar">
            <Navbar webSocketAPI={webSocketAPI} setWebSocketAPI={setWebSocketAPI} setIsLogin={setIsLogin}/>
            {/*<Search webSocketAPI={webSocketAPI}/>*/}
            <Chats webSocketAPI={webSocketAPI} setUserName={setUserName} userName={userName} setUserType={setUserType} userType={userType} reLogin={reLogin}/>
        </div>
    );
}

export default Sidebar;