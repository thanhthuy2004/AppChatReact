import React from "react";
function UserChat({id, name, type, actionTime, userName}){
    const imgPersonal = "https://www.studytienganh.vn/upload/2022/05/112275.jpg";
    const imgRoom = "https://toigingiuvedep.vn/wp-content/uploads/2023/03/hinh-avatar-nhom-chibi-4-co-gai-cute.jpg";
    function formatActionTime(actionTime) {
        const date = new Date(actionTime);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }
    return (
    <div key={id} className={name !== userName ? "userChat": "userChat userChatActive"}>
        <img src={type === 0 ? imgPersonal : imgRoom} alt=""/>
        <div className="userChatInfo">
            <span>{name}</span>
            <p>{formatActionTime(actionTime)}</p>
        </div>
    </div>
    );
}
export default UserChat;