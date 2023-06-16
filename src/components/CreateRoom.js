import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineUsergroupAdd} from "react-icons/ai";


function MyhhVerticallyCenteredModal(props) {
    const { websocketapi } = props;
    const [roomName, setRoomName] = useState('');

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
        websocketapi.send(data);
        websocketapi.on("message", function (ev){
            const mess = JSON.parse(ev.data);
            if(mess.mes === "Room Exist"){
                showError();
            }
            if(mess.event === "CREATE_ROOM" && mess.status === "success"){
                props.onHide();
                setRoomName("");
            }
        });

    };

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tạo phòng mới
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
                <span id="error" className="error"></span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Thoát</Button>
                <Button  id="submit"  onClick={createNewRoom}>Xong</Button>
            </Modal.Footer>
        </Modal>
    );
}

function CreateRoom({ websocketapi }) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <AiOutlineUsergroupAdd
                className="create-room"
                size={28}
                onClick={() => setModalShow(true)}
                style={{ cursor: 'pointer' }}
            />

            <MyhhVerticallyCenteredModal
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
        errorElement.innerText = "* Tên phòng mà bạn vừa nhập đã tồn tại! *";
    }
}


export default CreateRoom;
