
import React, {useState, useEffect} from "react";
import UserChat from "../components/UserChat";
import CreateRoom from "./CreateRoom";
import { FiSearch} from "react-icons/fi";
import JoinRoom from "./JoinRoom";
import Modal from 'react-modal';
import Search from "./Search";
function Chats({webSocketAPI, setUserName, userName, setUserType, userType}) {
    const [userList, setUserList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [newUserName, setNewUserName] = useState("");
    const [typeUser, setTypeUser] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleAddUser = (event) => {
        event.preventDefault();
        const createdTime = new Date();
        const newUser = {
            name: newUserName,
            type: typeUser,
            actionTime: createdTime.getTime()

        };
        const existingUserIndex = userList.findIndex(user => user.name === newUserName && user.type === newUser.type);
        if (existingUserIndex !== -1) {
            // Nếu đã tồn tại và cùng type, xóa username cũ
            userList.splice(existingUserIndex, 1);
        }
        if (typeUser === 1 && !roomList.some(room => room.name === newUserName)) {
            // Kiểm tra nếu type là 1 (phòng chat) và newUserName không nằm trong roomList, hiển thị thông báo lỗi
            setModalIsOpen(true);
            return;
        }
        setUserList(prevList => [newUser, ...prevList]);
        setNewUserName('');
    }
    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setTypeUser(1);
        } else {
            setTypeUser(0);
        }
    }


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
        setUserType(type);
        if(type === 0) {
            webSocketAPI.send(getMessPeopleList);
        }else  if(type === 1){
            webSocketAPI.send(getMessRoomList);
        }

    };


    const getUserList = {
        action: "onchat",
        data: {
            event: "GET_USER_LIST"
        }
    }
    webSocketAPI.send(getUserList);

    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }

        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);
            if (message.event === "GET_USER_LIST") {
                const listUser = message.data;
                const createdTime = new Date();
                const newUser = {
                    name: newUserName,
                    type: typeUser,
                    actionTime: createdTime.getTime()
                };
                // Kiểm tra xem newUserName đã tồn tại trong danh sách hay chưa
                const existingUserIndex = listUser.findIndex(user => user.name === newUserName && user.type === newUser.type);
                if (existingUserIndex !== -1) {
                    // Nếu đã tồn tại và cùng type, xóa username cũ
                    listUser.splice(existingUserIndex, 1);
                }

                // Đưa newUserName lên đầu danh sách
                listUser.unshift(newUser);
                const listRoom = listUser.filter(item => item.type === 1);
                setRoomList(listRoom);
                if (typeUser === 1 && !roomList.some(room => room.name === newUserName)) {
                    // Kiểm tra nếu type là 1 (phòng chat) và newUserName không nằm trong roomList, hiển thị thông báo lỗi
                    setModalIsOpen(true);
                    return;
                }
                setUserList(prevList => {
                    const newList = [...prevList];
                    listUser.forEach(user => {
                        if (!newList.some(u => u.name === user.name)) {
                            newList.push(user);
                        }
                    });
                    return newList;
                });
            }
        })


    }, [webSocketAPI]);
    return (
        <div className="chats">
           <Search webSocketAPI={webSocketAPI} handleCheckboxChange={handleCheckboxChange} handleAddUser={handleAddUser} newUserName={newUserName} setNewUserName={setNewUserName}/>
            {userList.map((user, index) => (
                <div onClick={() => handleUserChatClick(user.name, user.type)} key={index}>
                    <UserChat id={index} name={user.name} type={user.type} actionTime={user.actionTime} userName={userName} />
                </div>
            ))}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2 className="modal-title-warning">Thông báo</h2>
                <p className="modal-message">Bạn chưa tham gia hoặc phòng này chưa được tạo!</p>
                <button className="modal-button" onClick={() => setModalIsOpen(false)}>OK</button>
            </Modal>
        </div>

    );
}

export default Chats;