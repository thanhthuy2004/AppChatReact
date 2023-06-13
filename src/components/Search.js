import React, {useEffect, useState} from 'react'
import CreateRoom from "./CreateRoom";
import "../App.css"
import {FiSearch} from "react-icons/fi";
import webSocketAPI from "../store/WebSocketAPI";

function Search({webSocketAP}) {
    return (
        <div></div>
        // <div className="search" >
        //     <CreateRoom webSocketAPI={webSocketAPI}></CreateRoom>
        //     <div className="searchForm">
        //         <form>
        //             <input type="text" placeholder="Tìm kiếm"/>
        //             <button className="btn-search">
        //                 <FiSearch />
        //             </button>
        //         </form>
        //     </div>
        // </div>
    );
}

export default Search;