import React, {useEffect, useState} from "react";
import More from "../img/more.png";
import Modal from "react-modal";
import { MdClose } from 'react-icons/md';

function ChatInfor({webSocketAPI, userName, userType}) {
    const imgPersonal = "https://www.studytienganh.vn/upload/2022/05/112275.jpg";
    const imgRoom = "https://toigingiuvedep.vn/wp-content/uploads/2023/03/hinh-avatar-nhom-chibi-4-co-gai-cute.jpg";
    const [listInfor, setListInfor] = useState([]);
    const [listUserChatRoom, setListUserChatRoom] = useState([]);
    const [own, setOwn] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
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
    }else if (userType === 1){
        webSocketAPI.send(getMessRoomList);
    }
    useEffect(() => {
        if (!webSocketAPI) {
            return;
        }

        webSocketAPI.on("message", function (event) {
            const message = JSON.parse(event.data);

            if(message.event === "GET_PEOPLE_CHAT_MES"){
                const listMessagePeople = message.data;
                setListInfor(listMessagePeople);
            }
            else if (message.event === "GET_ROOM_CHAT_MES") {
                let listInfor = [];
                let listUser = [];
                let owner = "";
                if (message.data && message.data) {
                    listInfor = message.data;
                    listUser = message.data.userList;
                    owner = message.data.own;
                }
                setOwn(owner);
                setListInfor(listInfor);
                setListUserChatRoom(listUser)
            }
        })
    }, [webSocketAPI]);
    const handleImageClick = () => {
        console.log(listInfor);
        console.log(own);
        console.log(listUserChatRoom);
        setModalOpen(true);
    }
    return(
        <>
    <img src={More} onClick={handleImageClick} alt=""/>
            <Modal className="ModalInforChat" isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
                <div className="modal-close" onClick={() => setModalOpen(false)}><MdClose/></div>
                <h2 className="modal-title-infor">Thông tin</h2>
                <div className="containerimg">
                <img className="imgChatInfor" src={userType === 0 ? imgPersonal : imgRoom} alt=""/>
                    <h4 className="nameChat">{userName}</h4>
                </div>
                {userType === 1 && (
                    <>
                        <p className="ml-20">Quản trị viên: <span className="Owner-modal">{own}</span> </p>
                        <p className="ml-20">Danh sách các thành viên:</p>
                        {listUserChatRoom.map(user => (
                            <p key={user.id} className="modal-listuser">{user.name}</p>
                        ))}
                    </>
                )}
            </Modal>
        </>
    )
}
export default ChatInfor;