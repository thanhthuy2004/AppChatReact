import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import login from "./login";
import WebSocketAPI from "../store/WebSocketAPI";
function Register({ webSocketAPI }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState(null);
    const handleRegister = (event) => {
        event.preventDefault(); // Ngăn form submit lại trang khác
        if (password !== confirmpassword) {
            setRegisterError("Vui lòng xác nhận lại mật khẩu trước đó!");
            return;
        }

        // Gửi yêu cầu đăng kí đến API appchat
        const registerData = {
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: {
                    user: username,
                    pass: password
                }
            }
        };
        webSocketAPI.send(registerData);

        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);

            if (message.status === "error") {
                setRegisterError("Tên tài khoản đã tồn tại");
                console.log(message.mes);
            } else if(password != confirmpassword){
                setRegisterError("Vui lòng xác nhận lại mật khẩu trước đó!")
            } else {
                // Đăng nhập thành công, chuyển hướng đến trang home
                navigate("/login");
                console.log("Register sucessful");
            }
        });
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Xin chào!</span>
                <span className="title">Đăng ký</span>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Tên tài khoản vd: guest123"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required={true}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required={true}
                    />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmpassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        required={true}
                    />
                    {registerError && <span className="error">{"*" + registerError}</span>}
                    <button type={"submit"}>Đăng ký</button>
                </form>
                <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;