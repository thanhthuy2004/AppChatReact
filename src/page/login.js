import React, {useState, useEffect} from "react";
import {useNavigate , Link} from "react-router-dom";

function Login({webSocketAPI, setIsLogin}) {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);


    const handleLogin = (event) => {
        event.preventDefault(); // Ngăn form submit lại trang khác
        const loginData = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: username,
                    pass: password,
                },
            },
        };
        webSocketAPI.send(loginData);

        localStorage.setItem("username",username);
    };
    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }
        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);
            if(message.event === "LOGIN") {
                if (message.status === "error") {
                    setLoginError("Tên tài khoản hoặc mật khẩu không đúng!");
                    console.log(message.mes);
                } else if (message.status === "success"){
                    // Đăng nhập thành công, chuyển hướng đến trang home
                    console.log("Login sucessful");
                    setIsLogin(true);
                    navigate("/");
                }
            }

            if (message.data && message.data.RE_LOGIN_CODE) {
                const encodedValue = window.btoa(message.data.RE_LOGIN_CODE);
                localStorage.setItem("RE_LOGIN_CODE", encodedValue);
            }
        });

    }, [webSocketAPI]);
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Xin chào!</span>
                <span className="title">Đăng nhập</span>
                <form onSubmit={handleLogin}>
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
                    {loginError && <span className="error">{"*" + loginError}</span>}
                    <button>Đăng nhập</button>
                </form>

                <p>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;