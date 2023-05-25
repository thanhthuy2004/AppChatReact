import React from 'react'
function Chats({webSocketAPI}) {
    const getUserList = {
        action: "onchat",
        data: {
            event: "GET_USER_LIST"
        }
    }
    webSocketAPI.send(getUserList);
    webSocketAPI.on("message", function (event) {
        console.log(JSON.parse(event.data));
    })
    return (
        <div className="chats">
            <div className="userChat">
                <img src="https://th.bing.com/th/id/R.6b8d9385853cc377b5b17617d0635101?rik=Euc8HcZ%2f20KSSg&pid=ImgRaw&r=0" alt=""/>
                <div className="userChatInfo">
                    <span>Thanh Thùy</span>
                    <p>Hôm nay nắng đẹp</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://th.bing.com/th/id/R.6b8d9385853cc377b5b17617d0635101?rik=Euc8HcZ%2f20KSSg&pid=ImgRaw&r=0" alt=""/>
                <div className="userChatInfo">
                    <span>Thanh Thùy</span>
                    <p>Hôm nay nắng đẹp</p>
                </div>
            </div>
            <div className="userChat">
                <img src="https://th.bing.com/th/id/R.6b8d9385853cc377b5b17617d0635101?rik=Euc8HcZ%2f20KSSg&pid=ImgRaw&r=0" alt=""/>
                <div className="userChatInfo">
                    <span>Thanh Thùy</span>
                    <p>Hôm nay nắng đẹp</p>
                </div>
            </div>

        </div>
    );
}

export default Chats;