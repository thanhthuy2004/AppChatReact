import React, {useEffect, useState} from "react";
import More from "../img/more.png";
import Modal from "react-modal";
import { MdClose } from 'react-icons/md';

function ChatInfor({webSocketAPI, userName, userType}) {
    const imgPersonal = "https://www.studytienganh.vn/upload/2022/05/112275.jpg";
    const imgRoom = "https://toigingiuvedep.vn/wp-content/uploads/2023/03/hinh-avatar-nhom-chibi-4-co-gai-cute.jpg";
    const [listInfor, setListInfor] = useState([]);
    const [listMess, setListMess] = useState([]);
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
                setListMess(listMessagePeople);
            }
            else if (message.event === "GET_ROOM_CHAT_MES") {
                let listInfor = [];
                let listUser = [];
                let listMessRoom= [];
                let owner = "";
                if (message.data) {
                    listMessRoom = message.data.chatData;
                    listInfor = message.data;
                    listUser = message.data.userList;
                    owner = message.data.own;
                }
                setListMess(listMessRoom);
                setOwn(owner);
                setListInfor(listInfor);
                setListUserChatRoom(listUser)
            }
        })
    }, [webSocketAPI]);
    function isFirebaseImageURL(url) {
        return url.startsWith(
            'https://firebasestorage.googleapis.com/v0/b/nlu-chatapp.appspot.com/o/images'
        );
    }
    function isFirebaseAudioURL(url) {
        return url.startsWith(
            'https://firebasestorage.googleapis.com/v0/b/nlu-chatapp.appspot.com/o/record'
        );
    }
    function isFirebaseURL(url) {
        return url.startsWith(
            'https://www'
        );
    }
    const handleImageClick = () => {
        setModalOpen(true);
    }
    return(
        <>
    <img src={More} onClick={handleImageClick} alt=""/>
            <Modal className="ModalInforChat" isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} aria-labelledby="contained-modal-title-vcenter">
                <div className="modal-close" onClick={() => setModalOpen(false)}><MdClose/></div>
                <h2 className="modal-title-infor">Thông tin</h2>
                <div className="containerimg">
                <img className="imgChatInfor" src={userType === 0 ? imgPersonal : imgRoom} alt=""/>
                    <h4 className="nameChat">{userName}</h4>
                </div>
                <p className="ml-20">Ảnh:</p>
                {listMess
                    .filter((item) => isFirebaseImageURL(item.mes))
                    .map((item) => (
                        <img className="listImgInfor" key={item.id}  src={item.mes} alt="" />
                    ))}
                <p className="ml-20">Âm thanh:</p>
                {listMess
                    .filter((item) => isFirebaseAudioURL(item.mes))
                    .map((item) => (
                    <audio className="listAudioInfor" key={item.id} src={item.mes} controls id="audio" />
                    ))}
                <p className="ml-20">Liên kết:</p>
                {listMess
                    .filter((item) => isFirebaseURL(item.mes))
                    .map((item) => (
                        <div key={item.id}  className="cover-link">
                        <a className="ml-20 listURLInfor" target="_blank" href={item.mes}>{item.mes}</a>
                        </div>
                    ))}
                {userType === 1 && (
                    <>
                        <p className="ml-20">Danh sách các thành viên:</p>
                        <div className="modal-listuser">
                            <img className="avtUser" src="https://www.studytienganh.vn/upload/2022/05/112275.jpg"/>
                            <div className="border-member">
                                <span className="nameUser">{own}</span>
                                <p className="member">Người tạo phòng</p>
                            </div>
                        </div>

                        {listUserChatRoom.map(user => (
                            <div key={user.id} className="modal-listuser">
                                <img className="avtUser" src="https://www.studytienganh.vn/upload/2022/05/112275.jpg"/>
                                <div className="border-member">
                                    <span className="nameUser">{user.name}</span>
                                    <p className="member">Thành viên</p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </Modal>
        </>
    )
}
export default ChatInfor;