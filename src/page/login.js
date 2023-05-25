import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import WebSocketAPI from "../store/WebSocketAPI";

function Login() {
    const [webSocketAPI, setWebSocketAPI] = useState(null);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        // Lấy thời gian mà việc đăng nhập bị khóa từ localStorage
        const lockTime = localStorage.getItem("lockTime");

        // Nếu có thời gian mà việc đăng nhập bị khóa
        if (lockTime) {
            // Tính thời gian còn lại cho đến khi mở khóa
            const remainingTime = Math.round(5 - (Date.now() - lockTime) / 1000);

            // Nếu thời gian còn lại lớn hơn 0
            if (remainingTime > 0) {
                // Đặt trạng thái isLocked thành true
                setIsLocked(true);
                setTimeLeft(remainingTime);

                // Đặt hẹn giờ để mở khóa sau khi thời gian còn lại kết thúc
                const intervalId = setInterval(() => {
                    setTimeLeft((prevTimeLeft) => {
                        if (prevTimeLeft <= 1) {
                            clearInterval(intervalId);
                            setIsLocked(false);
                            setFailedAttempts(0);
                            localStorage.removeItem("lockTime");
                            return 0;
                        } else {
                            return prevTimeLeft - 1;
                        }
                    });
                }, 1000);
            }
        }
    }, []);

    const handleLogin = (event) => {
        event.preventDefault(); // Ngăn form submit lại trang khác

        if (isLocked) {
            return;
        }

        const socket = new WebSocketAPI();
        setWebSocketAPI(socket);
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

        socket.on("message", function (event) {
            // Nhận một tin nhắn từ WebSocket
            console.log("WebSocket message received:", event.data);

            // Chuyển đổi dữ liệu nhận được từ chuỗi JSON sang đối tượng JavaScript
            const message = JSON.parse(event.data);
            // Kiểm tra xem có thuộc tính data.RE_LOGIN_CODE trong tin nhắn không
            if (message.data && message.data.RE_LOGIN_CODE) {
                // Lưu giá trị RE_LOGIN_CODE vào localStorage
                localStorage.setItem("RE_LOGIN_CODE", message.data.RE_LOGIN_CODE);
            }
        });
        socket.on("message", function (event) {
            const message = JSON.parse(event.data);
            if (message.status === "error") {
                setLoginError("Tên tài khoản hoặc mật khẩu không đúng!");
                console.log(message.mes);
                setFailedAttempts((prevAttempts) => prevAttempts + 1);

                if (failedAttempts >= 4) {
                    setIsLocked(true);
                    setTimeLeft(5);
                    localStorage.setItem("lockTime", Date.now());

                    const intervalId = setInterval(() => {
                        setTimeLeft((prevTimeLeft) => {
                            if (prevTimeLeft <= 1) {
                                clearInterval(intervalId);
                                setIsLocked(false);
                                setFailedAttempts(0);
                                localStorage.removeItem("lockTime");
                                return 0;
                            } else {
                                return prevTimeLeft - 1;
                            }
                        });
                    }, 1000);
                }
            } else {
                // Đăng nhập thành công, chuyển hướng đến trang home
                localStorage.setItem("username", username);
                console.log("Login sucessful");
                navigate("/home");
            }
        });
        socket.send(loginData);
        return () => {
            socket.close();
        };

    };
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
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {loginError && <span className="error">{"*" + loginError}</span>}
                    {isLocked ? (
                        <div>
                            <p><span className="block">Đăng nhập bị khóa do nhập sai quá nhiều lần.</span></p>
                            <p>Thời gian còn lại: {timeLeft} giây</p>
                        </div>
                    ) : (
                        <button type={"submit"}>Đăng nhập</button>
                    )}
                </form>

                <p>
                    Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
