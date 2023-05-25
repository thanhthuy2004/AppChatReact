import React from "react";
import Input from "./Input";
function UserChat({name, type, actionTime}){
    const imgPersonal = "https://www.studytienganh.vn/upload/2022/05/112275.jpg";
    const imgRoom = "https://toigingiuvedep.vn/wp-content/uploads/2023/03/hinh-avatar-nhom-chibi-4-co-gai-cute.jpg";
    return (
    <div className="userChat">
        <img src={type === 0 ? imgPersonal : imgRoom} alt=""/>
        <div className="userChatInfo">
            <span>{name}</span>
            <p>{actionTime}</p>

        </div>
    </div>
    );
}
export default UserChat;