import React, {useState} from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import {FiSend} from "react-icons/fi";
// import {
//     arrayUnion,
//     doc,
//     serverTimestamp,
//     Timestamp,
//     updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Input({webSocketAPI, userName}) {
    const [type, setType] = useState([]);
    const [mess, setMess] = useState("");
    const [img, setImg] = useState(null);
    if (!webSocketAPI) {
        return;
    }
    webSocketAPI.on("message", function (event) {
        const message = JSON.parse(event.data);
        if (message.event === "GET_PEOPLE_CHAT_MES") {
            setType("people");
        } else if (message.event === "GET_ROOM_CHAT_MES") {
            setType("room");
        }
    });

    // if (img) {
    //     const storageRef = ref(storage, uuid());
    //
    //     const uploadTask = uploadBytesResumable(storageRef, img);
    //
    //     uploadTask.on(
    //         (error) => {
    //             //TODO:Handle Error
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
    //                 await updateDoc(doc(db, "chats", userName), {
    //                     messages: arrayUnion({
    //                         id: uuid(),
    //                         mess,
    //                         senderId: userName,
    //                         date: Timestamp.now(),
    //                         img: downloadURL,
    //                     }),
    //                 });
    //             });
    //         }
    //     );
    // } else {
    //      updateDoc(doc(db, "chats", userName), {
    //         messages: arrayUnion({
    //             id: uuid(),
    //             mess,
    //             senderId: userName,
    //             date: Timestamp.now(),
    //         }),
    //     });
    // }
    const sendChat = (event) => {
        // const mess = document.getElementById('mess').value;
        // const messUtf8 = encodeURI(mess);
        event.preventDefault();

        const data = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: type,
                    to: userName,
                    mes: mess
                    // mes: messUtf8
                }
            }
        };
        webSocketAPI.send(data);
        setMess("");
    };

    return (
        <form className="input" onSubmit={sendChat}>
            <input type="text" name=""
                   value={mess}
                   onChange={event => setMess(event.target.value)}
                   placeholder="Aa" required={true}/>
            <div className="send">
                <img src={Attach} alt=""/>
                <input type="file" style={{display: "none"}}
                       id="file"
                       // value={img}
                       // onChange={event => setImg(event.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={Img} alt=""

                    />
                </label>
                <button id="submitButton" className="send-btn"><FiSend/></button>
            </div>
        </form>
    );
}

export default Input;
