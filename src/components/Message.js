import React, { useState, useEffect } from 'react';

function Message({ id, name, type, to, mes }) {
    const APP_ID = "" //2a871409-8b80-4c11-9d99-d4c5bc4419a4
    const [linkPreview, setLinkPreview] = useState(null);
    const user = localStorage.getItem('username');
    const imgPersonal = 'https://www.studytienganh.vn/upload/2022/05/112275.jpg';
    let classOwn = '';
    if (to === user || name !== user) {
        classOwn = 'message';
    } else if (to !== user || name === user) {
        classOwn = 'message owner';
    }
    let hours = new Date(Date.now()).getHours() >= 12 ? 'PM' : 'AM';
    let month = new Date(Date.now()).getMonth() + 1;
    let timer =
        new Date(Date.now()).getDate() +
        '-' +
        month +
        '-' +
        new Date(Date.now()).getFullYear() +
        ', ' +
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes() +
        ' ' +
        hours;

    useEffect(() => {
        if (mes.startsWith('https://www')) {
            fetch(
                `https://opengraph.io/api/1.1/site/${encodeURIComponent(
                    mes
                )}?app_id=` + APP_ID
            )
                .then((response) => response.json())
                .then((data) => setLinkPreview(data));
        }
    }, [mes]);

    function isLinkImg(str) {
        const pattern = /https?:\/\/firebasestorage\.googleapis\.com\/v0\/b\/nlu-chatapp\.appspot\.com\/o\/images/g;
        return str.match(pattern);
    }
    function isLinkAudio(str) {
        const pattern = /https?:\/\/firebasestorage\.googleapis\.com\/v0\/b\/nlu-chatapp\.appspot\.com\/o\/record/g;
        return str.match(pattern);
    }

    return (
        <div className={classOwn}>
            <div className="messageInfo">
                <div className="messageInfoDetail">
                    <span className="username">{name}</span>
                </div>
                <img src={imgPersonal} alt="" />
                <div className="timeMess">{timer}</div>
            </div>
            <div className="messageContent">
                {!isLinkImg(mes) && !isLinkAudio(mes) && !linkPreview && (
                    <p className="mess">{mes}</p>
                )}
                <img src={isLinkImg(mes) ? mes : ''} alt="" />
                {isLinkAudio(mes) && (
                    <audio src={mes} alt="" controls id="audio" />
                )}
                {linkPreview && linkPreview.hybridGraph && (
                    <div className="web-review">
                        <p className="mess-wr">
                            <a target="_blank" href={linkPreview.hybridGraph.url}>
                                {linkPreview.hybridGraph.url}
                            </a>
                        </p>
                        <img src={linkPreview.hybridGraph.image} alt="" />
                        <div className="container-title-wr">
                            <span className="title-wr">{linkPreview.hybridGraph.title}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Message;
