import React from 'react'
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import "../App.css"
function Sidebar({webSocketAPI}) {


    return (
        <div className="sidebar">
            <Navbar webSocketAPI={webSocketAPI}/>
            <Search webSocketAPI={webSocketAPI}/>
            <Chats webSocketAPI={webSocketAPI}/>
        </div>
    );
}

export default Sidebar;