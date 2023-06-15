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
    let month = new Date(Date.now()).getMonth() + 1;
    let timer = new Date(Date.now()).getDate()+
        "-"+ month+
        "-"+ new Date(Date.now()).getFullYear()+
        ", "+ new Date(Date.now()).getHours()+
        ":"+ new Date(Date.now()).getMinutes()+
        " "+ hours;
    return (
        <div className={classOwn}>
            <div className="messageInfo">
                <div className="messageInfoDetail">
                    <span className="username">{name}</span>
                </div>
                <img src={imgPersonal} alt=""/>

            </div>
            <div className="messageContent">
                <p className="mess">{mes}</p>
                {/*<img src={mes} alt="" />*/}
                {/*<a href="https://cdn.memevui.com/2022-05/30/meo-cuoi-nham-hiem.jpg">https://cdn.memevui.com/2022-05/30/meo-cuoi-nham-hiem.jpg</a>*/}
                {/*<div className="web-review">*/}
                {/*    <p className="mess">*/}
                {/*    <a href="https://cdn.memevui.com/2022-05/30/meo-cuoi-nham-hiem.jpg">https://cdn.memevui.com/2022-05/30/meo-cuoi-nham-hiem.jpg</a>*/}
                {/*</p>*/}
                {/*    <img src="https://cdn.memevui.com/2022-05/30/meo-cuoi-nham-hiem.jpg" alt="" />*/}
                {/*    <div className="container-title-wr">*/}
                {/*    <span className="title-wr">Đây là title</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="timeMess">
                {timer}

            </div>

        </div>


    );
}

export default Message;