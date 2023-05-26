// import {createContext, useEffect, useState} from "react";
// import WebSocketAPI from "../store/WebSocketAPI";
//
// export const AuthContext = createContext(
//     {
//         isLoggedIn: false,
//         login: () => {},
//         logout: () => {},
//     }
// );
// export const AuthContextProvider = ({children}) => {
//     const [webSocketAPI, setWebSocketAPI] = useState(null);
//     const [currentUser, setCurrentUser] = useState({});
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [loginError, setLoginError] = useState(null);
//     const [failedAttempts, setFailedAttempts] = useState(0);
//     const [isLocked, setIsLocked] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(0);
//
//     useEffect(() => {
//         const socket = new WebSocketAPI();
//         setWebSocketAPI(socket);
//
//         return () => socket.close();
//     }, []);
//
//         return (
//             <AuthContextProvider value={{currentUser, isLoggedIn}}>
//                 {children}
//             </AuthContextProvider>
//         );
//
//     // function logout() {
//     //     // Gửi yêu cầu đăng xuất đến máy chủ (nếu cần) và cập nhật giá trị của isLoggedIn thành false
//     //     setIsLoggedIn(false);
//     // }
// }