
import React, {useState, useEffect} from "react";
import UserChat from "../components/UserChat";
import CreateRoom from "./CreateRoom";
import { FiSearch} from "react-icons/fi";
import JoinRoom from "./JoinRoom";
import Modal from 'react-modal';
function Chats({webSocketAPI, setUserName, userName, setUserType, userType, reLogin}) {
    const [userList, setUserList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [newUserName, setNewUserName] = useState("");
    const [typeUser, setTypeUser] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    function formatActionTime(actionTime) {
        const date = new Date(actionTime);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const handleAddUser = (event) => {
        event.preventDefault();
        const createdTime = new Date();
        const newUser = {
            name: newUserName,
            type: typeUser,
            actionTime: formatActionTime(createdTime.getTime())
        };
        const existingUserIndex = userList.findIndex(user => user.name === newUserName && user.type === newUser.type);
        if (existingUserIndex !== -1) {
            // Nếu đã tồn tại, thêm class userChatActive vào div chứa user đó
            const userChats = document.querySelectorAll('.userChat');
            userChats.forEach((userChat) => {
                userChat.classList.remove('userChatActive');
            });
            const existingUserSpans = document.querySelectorAll('.userChat span:not(.userChatInfo)');
            let userFound = false;
            existingUserSpans.forEach((span) => {
                const typeSpan = span.closest('.userChat').querySelector('.type_user');
                if (span.innerHTML === newUser.name && typeSpan.innerHTML === newUser.type.toString()) {
                    userFound = true;
                    const activeUserChat = span.closest('.userChat');
                    activeUserChat.classList.add('userChatActive');
                    const divElement = document.querySelector('.chats');
                    const divInto = document.querySelector('.userChatActive');
                    divElement.scrollTop= divInto.offsetTop - divElement.offsetTop;
                }
            });
            if (!userFound) {
                const divElement = document.querySelector('.chats');
                divElement.scrollTop = 0;
            }
        } else if (typeUser === 1 && !roomList.some(room => room.name === newUserName)) {
            // Kiểm tra nếu type là 1 (phòng chat) và newUserName không nằm trong roomList, hiển thị thông báo lỗi
            setModalIsOpen(true);
            return;
        } else {
            // Nếu chưa tồn tại, thêm user mới vào đầu danh sách
            setUserList(prevList => [newUser, ...prevList]);
        }
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
        // Kiểm tra và xóa class userChatActive trên tất cả các thẻ div trong danh sách người dùng
        const userChats = document.querySelectorAll('.userChat');
        userChats.forEach((userChat) => {
            userChat.classList.remove('userChatActive');
        });

        // Thêm class userChatActive vào thẻ div của người dùng được chọn (nếu có)
        const selectedUserDiv = document.getElementById(`${name}-${type}`);
        if (selectedUserDiv) {
            selectedUserDiv.classList.add('userChatActive');
        }

        setUserName(name);
        setUserType(type);
        const getMessPeopleList = {
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: userName,
                    page: 1
                }
            }
        }
        const getMessRoomList = {
            action: "onchat",
            data: {
                event: "GET_ROOM_CHAT_MES",
                data: {
                    name: userName,
                    page: 1
                }
            }
        }
        if(userType === 0) {
            webSocketAPI.send(getMessPeopleList);
        } else {
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
                // console.log(listUser)
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
            <div className="search">
                <div className="col-1">
                    <CreateRoom websocketapi={webSocketAPI}/>
                </div>
                <div className="searchForm col-11">
                    <input className="col-8" type="text" placeholder="Tìm kiếm" value={newUserName} onChange={e => setNewUserName(e.target.value)} required={true}/>
                    <input type="checkbox" onChange={handleCheckboxChange} title="Tìm kiếm phòng"/>  <JoinRoom websocketapi={webSocketAPI} title="Tham gia phòng"  userlist={userList} setuserlist={setUserList}/>
                    <button className="btn-search" onClick={handleAddUser} title="Tìm kiếm">
                        <FiSearch className="userSearch"/>
                    </button>
                </div>
            </div>
            {userList.map((user, index) => (
                <div onClick={() => handleUserChatClick(user.name, user.type)} key={index}>
                    <UserChat id={index} name={user.name} type={user.type} actionTime={formatActionTime(user.actionTime)} userName={userName} />
                </div>
            ))}
            <Modal className="ModalWarningRoom" isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2 className="modal-title-warning">Thông báo</h2>
                <p className="modal-message">Bạn chưa tham gia hoặc phòng này chưa được tạo!</p>
                <button className="modal-button" onClick={() => setModalIsOpen(false)}>OK</button>
            </Modal>
        </div>

    );
}

export default Chats;