import React, { useState } from 'react';
import Img from '../img/img.png';
import { FiSend } from "react-icons/fi";
import InputEmoji from 'react-input-emoji';
import {FaMicrophone} from "react-icons/fa";
import vmsg from "vmsg";

function Input({ webSocketAPI, userName }) {
    const [type, setType] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setLoading]  = useState(false);
    const [isRecording, setRecord]  = useState(false);
    const [recordings, setRecordings]= useState([]);
    const [recorder] = useState(new vmsg.Recorder({
        wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
    }))


    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };


    if (!webSocketAPI) {
        return null;
    }

    webSocketAPI.on("message", function (event) {
        const message = JSON.parse(event.data);
        if (message.event === "GET_PEOPLE_CHAT_MES") {
            setType("people");
        } else if (message.event === "GET_ROOM_CHAT_MES") {
            setType("room");
        }
    });

    const sendChat = (event) => {
        const mess = newMessage;
        event.preventDefault();
        const messEncode = encodeURI(mess);
        const mes =messEncode.replace(/%20/g," ");


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
    };



    const record = async () => {
        setLoading(true);

        if (isRecording) {
            const blob = await recorder.stopRecording();
            setLoading(false);
            setRecord(false);
            setRecordings(recordings.concat(URL.createObjectURL(blob)));
            console.log(recordings.toString())

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
            <div className="send">
                <div className="chat-sender">
                    <InputEmoji id="mess" value={newMessage} onChange={handleChange}   placeholder="Nhập vào tin nhắn..."/>
                </div>
              <button className={isRecording?"micro-btn-active" :"micro-btn" } type="button" disabled={isLoading} onClick={record}>  <FaMicrophone/> </button>
                <input type="file" style={{ display: "none" }} id="file" />
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
