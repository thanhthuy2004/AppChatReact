import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import WebSocketAPI from "../store/WebSocketAPI";
import "../App.css"

function Navbar({webSocketAPI}) {
    const user = localStorage.getItem('username');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logoutError, setLogoutError] = useState(null);

    // useEffect(() => {
    //     if (!webSocketAPI) {
    //         return;
    //     }
    //
    // }, [webSocketAPI]);
    const handleLogout = () => {
        // Gửi yêu cầu đăng nhập đến API appchat
        const logout = {
            action: 'onchat',
            data: {
                event: 'LOGOUT'
            }
        };
        webSocketAPI.send(logout);
        webSocketAPI.on('message', function (event) {
            const message = JSON.parse(event.data);

            if (message.status === "error") {
                // setLogoutError("Đăng xuất không thành công, bạn chưa đăng nhập?");
                console.log(message.mes);
            } else {
                navigate("/login");
                console.log("Logout sucessful");
            }
        });
    };
    return (
        <div className="navbar">
            <span className="logo">Nhóm 26</span>
            <div className="user">
                <img
                    src="https://th.bing.com/th/id/R.6b8d9385853cc377b5b17617d0635101?rik=Euc8HcZ%2f20KSSg&pid=ImgRaw&r=0"
                    alt=""
                />
                <span>{user}</span>
                <button onClick={handleLogout}>Đăng xuất</button>
            </div>
        </div>
    );
}

export default Navbar;
