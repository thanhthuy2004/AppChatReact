import React from 'react'
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
function Sidebar({webSocketAPI , setWebSocketAPI, setUserName, userName}) {

    return (
        <div className="sidebar">
            <Navbar webSocketAPI={webSocketAPI} setWebSocketAPI={setWebSocketAPI}/>
            <Search webSocketAPI={webSocketAPI}/>
            <Chats webSocketAPI={webSocketAPI} setUserName={setUserName} userName={userName}/>
        </div>
    );
}

export default Sidebar;