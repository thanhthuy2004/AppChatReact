import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import WebSocketAPI from "../store/WebSocketAPI";
import "../App.css"
import { FiLogOut } from "react-icons/fi";

function Navbar({webSocketAPI, setWebSocketAPI,setIsLogin}) {
    const user = localStorage.getItem('username');
    const reLoginCode = window.atob(localStorage.getItem("RE_LOGIN_CODE"));
    const navigate = useNavigate();
    const handleLogout = () => {
        // Gửi yêu cầu đăng xuất đến API appchat
        const logout = {
            action: 'onchat',
            data: {
                event: 'LOGOUT'
            }
        };
        webSocketAPI.send(logout);

    };
    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }
        webSocketAPI.on('message', function (event) {
            const message = JSON.parse(event.data);
            if(message.event === "LOGOUT"){
                if (message.status === "error") {
                    // setLogoutError("Đăng xuất không thành công, bạn chưa đăng nhập?");
                    console.log(message.mes);
                } else {
                    navigate("/login");
                    setIsLogin(false);
                    localStorage.clear();
                    const socket = new WebSocketAPI();
                    setWebSocketAPI(socket);
                }
            }


        });
    }, [webSocketAPI, setIsLogin]);
    return (
        <div className="navbar">
            <span className="logo">Nhóm 26</span>
            <div className="user">
                <img
                    src="https://www.studytienganh.vn/upload/2022/05/112275.jpg"
                    alt=""
                />
                <span>{user}</span>
                <button onClick={handleLogout} title="Đăng xuất">
                    <FiLogOut />
                </button>
            </div>
        </div>
    );
}

export default Navbar;
