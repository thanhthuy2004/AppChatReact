import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {IoIosPeople} from "react-icons/io";
import {icons} from "react-icons";

function ModalJoinRoom(props) {
    const { websocketapi, userList, setUserList} = props;
    const [name, setName] = useState('');

    const joinRoom = () => {
        const JoinRoom = {
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: name
                }
            }
        };
        websocketapi.send(JoinRoom);
        websocketapi.on("message", function (event){
            const mess = JSON.parse(event.data);
            if(mess.status === "error"){
                showError();
            }
            if(mess.event === "JOIN_ROOM" && mess.status === "success"){
                const newRoom = {
                    name: name,
                    type: 1,
                    actionTime: new Date().toLocaleString()
                };
                const existingUserIndex = userList.findIndex(user => user.name === name && user.type === 1);
                if (existingUserIndex !== -1) {
                    // Nếu đã tồn tại, thêm class userChatActive vào div chứa user đó
                    const userChat = document.querySelectorAll('.userChat');
                    userChat.forEach((userChat) => {
                        userChat.classList.remove('userChatActive');
                    });
                    const existingUserSpans = document.querySelectorAll('.userChat span:not(.userChatInfo)');
                    existingUserSpans.forEach((span) => {
                        if (span.innerHTML === newRoom.name) {
                            const activeUserChat = span.closest('.userChat');
                            activeUserChat.classList.add('userChatActive');
                            activeUserChat.scrollIntoView({ behavior: 'smooth' });
                        }
                    });
                } else {

                    setUserList([newRoom, ...userList]);
                }
                props.onHide();
                setName("");
            }
        });
    };
    return (
        <>
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tham gia phòng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="mb-3">Tên phòng: </label>
                <input
                    className="mb-3 col-12"
                    type="text"
                    placeholder="Nhập vào tên phòng..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <span id="error" className="error"></span>
            </Modal.Body>
            <Modal.Footer>
                <Button className="f-left" variant="secondary" onClick={props.onHide}>Thoát</Button>
                <Button onClick={joinRoom}>Xong</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

function JoinRoom({ websocketapi, title, userList, setUserList }) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <IoIosPeople title = {title}
                className="roomSearch"
                size={28}
                onClick={() => setModalShow(true)}
                style={{ cursor: 'pointer' }}
            />

            <ModalJoinRoom
                websocketapi={websocketapi}
                userList = {userList}
                setUserList={setUserList}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
function showError() {
    const errorElement = document.getElementById("error");
    if (errorElement) {
        errorElement.innerText = "Phòng này chưa được tạo!";
    }
}


export default JoinRoom;
