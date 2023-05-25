import React, {useState, useEffect} from "react";
import UserChat from "../components/UserChat";

function Chats({webSocketAPI}) {
    const [userList, setUserList] = useState([]);

    const getUserList = {
        action: "onchat",
        data: {
            event: "GET_USER_LIST"
        }
    }

    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }
        webSocketAPI.send(getUserList);
        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);
            if(message.event === "GET_USER_LIST"){
            const listUser = message.data;
            setUserList(listUser);
            }
        })
    }, [webSocketAPI]);

    return (
        <div className="chats">
            {userList.map(user => (
           <UserChat key={user.name} name={user.name} type={user.type} actionTime={user.actionTime}/>
            ))}
        </div>
    );
}

    export default Chats;