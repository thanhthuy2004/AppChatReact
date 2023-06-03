import React from 'react'
function Message({id,name,type,to,mes}) {
    const user = localStorage.getItem('username');
    const imgPersonal = "https://www.studytienganh.vn/upload/2022/05/112275.jpg";
    let classOwn = "";
    if(to === user || name !== user){
        classOwn = "message";
    }else if (to !== user || name === user){
        classOwn = "message owner";
    }
    let hours = new Date(Date.now()).getHours() >= 12 ? 'PM':'AM';
    let timer = new Date(Date.now()).getDate()+
        "-"+ new Date(Date.now()).getMonth()+
        "-"+ new Date(Date.now()).getFullYear()+
        ", "+ new Date(Date.now()).getHours()+
        ":"+ new Date(Date.now()).getMinutes()+
        " "+ hours;
    return (
        // <div className="message owner">
        <div className={classOwn}>
            <div className="messageInfo">
                <div className="messageInfoDetail">
                    <span className="username">{name}</span>
                    {/*<span></span>*/}
                </div>
                <img src={imgPersonal} alt=""/>

            </div>

            <div className="messageContent">
                <p>{mes}</p>
                {/*<img src="https://cdn.memevui.com/2022-05/30/meo-cuoi-nham-hiem.jpg" alt=""/>*/}
            </div>
            <div className="timeMess">
                {timer}
            </div>
        </div>


    );
}

export default Message;