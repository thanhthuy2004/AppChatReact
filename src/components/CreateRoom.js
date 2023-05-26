import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IoIosAddCircleOutline } from "react-icons/io";

function MyhhVerticallyCenteredModal(props) {
    const { webSocketAPI } = props;
    const [roomName, setRoomName] = React.useState('');

    const createNewRoom = () => {
        const data = {
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name: roomName
                }
            }
        };

        webSocketAPI.send(data);

        webSocketAPI.on("message", function (event) {
            console.log("WebSocket message received:", event.data);
        });

        props.onHide(); // Hide the modal after creating the room
    };

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tạo phòng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className="mb-3">Tên phòng: </label>
                <input
                    className="mb-3 col-12"
                    type="text"
                    placeholder="Nhập vào tên phòng..."
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Thoát</Button>
                <Button variant="primary" onClick={createNewRoom}>Xong</Button>
            </Modal.Footer>
        </Modal>
    );
}

function CreateRoom({ webSocketAPI }) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <IoIosAddCircleOutline
                className="create-room"
                size={28}
                onClick={() => setModalShow(true)}
                style={{ cursor: 'pointer' }}
            />

            <MyhhVerticallyCenteredModal
                webSocketAPI={webSocketAPI}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default CreateRoom;
