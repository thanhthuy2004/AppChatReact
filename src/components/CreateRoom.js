import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WebSocketAPI from "../store/WebSocketAPI";
import { IoIosAddCircleOutline } from "react-icons/io";
function MyhhVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}

            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Tạo phòng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <label className="mb-3">Tên phòng: </label>

              <input className="mb-3 col-12" type="text" id="roomName" placeholder={"Nhập vào tên phòng..."}/>
            </Modal.Body>
            <Modal.Footer>

                <Button variant="secondary" onClick={props.onHide}>Thoát</Button>
                <Button variant="primary" onClick={createNewRoom}>Xong</Button>
            </Modal.Footer>
        </Modal>
    );
}

function CreateRoom() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            {/*<Button variant="primary" onClick={() => setModalShow(true)}>*/}
            {/*    Tạo phòng mới*/}
            {/*</Button>*/}
            <IoIosAddCircleOutline class="create-room" size={28} onClick={() => setModalShow(true)} style={{ cursor: 'pointer' }} />

            <MyhhVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
function createNewRoom(){
    const socket = new WebSocketAPI();
    var name = document.getElementById("roomName").value;

    socket.on("open", function (){console.log(name)
        const login = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: "test1",
                    pass: '11111'
                }
            }
        }

        const data = {
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name: name
                }
            }

        }
        socket.send(login);

        socket.send(data);
    });
    socket.on("message", function (event) {
        // Nhận một tin nhắn từ WebSocket
        console.log("WebSocket message received:", event.data);
    });
    // window.location.reload()
    // socket.close();

}

export default CreateRoom;