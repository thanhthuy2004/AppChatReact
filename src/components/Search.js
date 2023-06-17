import React, {useEffect, useState} from 'react'
import CreateRoom from "./CreateRoom";
import "../App.css"
import {FiSearch} from "react-icons/fi";
import webSocketAPI from "../store/WebSocketAPI";
import JoinRoom from "./JoinRoom";

function Search({webSocketAPI, handleCheckboxChange, handleAddUser, newUserName, setNewUserName}) {
    return (
        <div className="search">
            <div className="col-1">
                <CreateRoom websocketapi={webSocketAPI}/>
            </div>
            <div className="searchForm col-11">
                <input className="col-8" type="text" placeholder="Tìm kiếm" value={newUserName} onChange={e => setNewUserName(e.target.value)}/>
                <input type="checkbox" onChange={handleCheckboxChange} title="Tìm kiếm phòng"/>   <JoinRoom websocketapi={webSocketAPI} title="Tham gia phòng"/>
                <button className="btn-search" onClick={handleAddUser} title="Tìm kiếm">
                    <FiSearch className="userSearch"/>
                </button>
            </div>
        </div>
    );
}

export default Search;