import React, {useEffect, useState} from 'react';
import Img from '../img/img.png';
import { FiSend } from "react-icons/fi";
import InputEmoji from 'react-input-emoji';
import {FaMicrophone} from "react-icons/fa";
import vmsg from "vmsg";
import {getDownloadURL, listAll, ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";
import { storage } from "../firebase";



function Input({webSocketAPI, userName}) {
    const [type, setType] = useState("");
    const [newMessage, setNewMessage] = useState("");

    const [isLoading, setLoading]  = useState(false);
    const [isRecording, setRecord]  = useState(false);
    const [recorder] = useState(new vmsg.Recorder({
        wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
    }));
    const [urlAudio, setUrlAudio] = useState("");


    const [imageUpload, setImageUpload] = useState(null);
    const [urlImg, setUrlImg] = useState("");

    if (!webSocketAPI) {
        return null;
    }

    // send img
    const uploadFileImg = (event) => {
        const file = event.target.files[0];
        setImageUpload(file);
        console.log(file)
        if (file === null) return;
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setUrlImg(url);
                // alert("Uploaded");
            });
        });
        // console.log(urlImg);
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
        let mes ="";

        event.preventDefault();

        let  messEncode = "";
        if (urlImg !== ""){
            messEncode = urlImg;
           mes = messEncode;
        }
        else if (urlAudio !== ""){
            messEncode = urlAudio;
            mes = messEncode;
        }
        else{
            const mess = newMessage;
            messEncode = encodeURI(mess);
            mes = messEncode.replace(/%20/g," ")
        }

        const data = {
            action: "onchat",
                data: {
                    event: "SEND_CHAT",
                    data: {
                        type: type,
                        to: userName,
                        // mes: mess
                        mes: mes
                    }
                }
            };

        webSocketAPI.send(data);
        setNewMessage("");
        setImageUpload("");
        setUrlImg("");
        setUrlAudio("");

        if(type === "people") {
            webSocketAPI.send(getMessPeopleList);
        }else if (type === "room"){
            webSocketAPI.send(getMessRoomList);
        }

    };

    const convertBlobToFile = (blob) => {
        // Tạo URL từ Blob
        const blobUrl = URL.createObjectURL(blob);
        const filename = blobUrl.substring(27,blobUrl.lenght) +".mp3";

        // Tạo một đối tượng File từ Blob và tên file
        const file = new File([blob], filename, {type: blob.type});
        return file;
    }

    const record = async () => {
        setLoading(true);

        if (isRecording) {
            const blob = await recorder.stopRecording();
            setLoading(false);
            setRecord(false);
            const fileAudio = convertBlobToFile(blob);
            if (fileAudio === null) return;
            const audioRef = ref(storage, `record/${fileAudio + v4()}`);
            uploadBytes(audioRef, fileAudio).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setUrlAudio(url);
                });
            });

        } else {
            try {
                await recorder.initAudio();
                await recorder.initWorker();
                recorder.startRecording();
               setLoading(false);
               setRecord(true);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
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

              <button className={isRecording?"micro-btn-active" :"micro-btn" } type="button" disabled={isLoading} onClick={record}>  <FaMicrophone/> </button>
                <input type="file"  id="file"
                       style={{ display: "none" }}
                       onChange={uploadFileImg}

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
