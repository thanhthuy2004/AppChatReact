import React, {useState, useEffect} from "react";
import UserChat from "../components/UserChat";

function Chats({webSocketAPI, setUserName, userName}) {
    const [userList, setUserList] = useState([]);
    const handleUserChatClick = (name, type) => {
        setUserName(name);
        const getMessPeopleList = {
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: name,
                    page: 1
                }
            }
        }
        const getMessRoomList = {
            action: "onchat",
            data: {
                event: "GET_ROOM_CHAT_MES",
                data: {
                    name: name,
                    page: 1
                }
            }
        }
        if(type === 0) {
            webSocketAPI.send(getMessPeopleList);
        }else{
            webSocketAPI.send(getMessRoomList);
        }
    };
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
            if (message.event === "GET_USER_LIST") {
                const listUser = message.data;
                setUserList(listUser);
            }
        })
    }, [webSocketAPI]);

    return (
        <div className="chats">
            { userList.map((user, index) => (
          <div onClick={() => handleUserChatClick(user.name, user.type)}>
              <UserChat key={index} id={index} name={user.name} type={user.type} actionTime={user.actionTime} userName={userName}/>
          </div>

            ))}
        </div>
    );
}

    export default Chats;