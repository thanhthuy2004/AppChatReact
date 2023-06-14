import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import {IoIosPeople} from "react-icons/io";
import ReactModal from 'react-modal';

function ModalJoinRoom(props) {
    const { websocketapi } = props;
    const [name, setName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
                props.onHide();
                setModalIsOpen(true);
                setRoomName(name);
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
            <ReactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2 className="modal-title-sucess">Thành công</h2>
                <p className="modal-message">Bạn vừa tham gia phòng <span className="roomName">{roomName}</span>, hãy tìm kiếm và chat ngay nào!</p>
                <button className="modal-button" onClick={() => setModalIsOpen(false)}>OK</button>
            </ReactModal>
        </>
    );
}

function JoinRoom({ websocketapi, title }) {
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
