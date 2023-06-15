import React, {useEffect, useState} from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import {FiSend} from "react-icons/fi";
import InputEmoji from 'react-input-emoji';
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import { storage } from "../firebase";


function Input({webSocketAPI, userName}) {
    const [type, setType] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    const [urlImg, setUrlImg] = useState("");



    if (!webSocketAPI) {
        return null;
    }

    // send img
    const uploadFile = (event) => {
        const file = event.target.files[0];
        setImageUpload(file);

        if (file === null) return;
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                // setImageUrls((prev) => [...prev, url]);
                setUrlImg(url);
                alert("Uploaded");
            });
        });
    };

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };

    webSocketAPI.on("message", function (event) {
        const message = JSON.parse(event.data);
        if (message.event === "GET_PEOPLE_CHAT_MES") {
            setType("people");
        } else if (message.event === "GET_ROOM_CHAT_MES") {
            setType("room");
        }
    });
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

    const sendChat = (event) => {
        event.preventDefault();

        let messUtf8 = "";
        if (urlImg !== ""){
            messUtf8 = urlImg;
        }else{
            const mess = newMessage;
            messUtf8 = encodeURI(mess);
        }

        const data = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: type,
                    to: userName,
                    // mes: mess
                    mes: messUtf8
                }
            }
        };
        webSocketAPI.send(data);
        setNewMessage("");
        setImageUpload("");
        setUrlImg("");

        if(type === "people") {
            webSocketAPI.send(getMessPeopleList);
        }else if (type === "room"){
            webSocketAPI.send(getMessRoomList);
        }

    };

    return (

        <form className="input" onSubmit={sendChat}>
            <div className="img_div">
               <div className="item_img">
                   {urlImg !== "" && <img src={urlImg} alt=""/>}
                </div>
            </div>

            <div className="send">
                <div className="chat-sender">
                    <InputEmoji id="mess" value={newMessage} onChange={handleChange} placeholder="Aa"/>
                </div>

                <img src={Attach} alt="" />

                <input type="file"  id="file"
                       style={{ display: "none" }}
                       // onChange={(event) => {
                       //     setImageUpload(event.target.files[0]);
                       // }}
                    onChange={uploadFile}

                />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button id="submitButton" className="send-btn" type="submit">
                    <FiSend />
                </button>

            </div>


        </form>
    );
}
export default Input;
