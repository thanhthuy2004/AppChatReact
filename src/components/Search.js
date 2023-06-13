import React from 'react'
import CreateRoom from "./CreateRoom";
import "../App.css"
function Search({webSocketAPI}) {
    return (

        <div className="search">

            <div className="searchForm col-10">
                <input type="text" placeholder="Tìm kiếm"/>
            </div>
            <div className="col-1">
                <CreateRoom websocketapi={webSocketAPI}/>
            </div>


            {/*<div className="userChat">*/}
            {/*    <img src="https://th.bing.com/th/id/R.6b8d9385853cc377b5b17617d0635101?rik=Euc8HcZ%2f20KSSg&pid=ImgRaw&r=0" alt=""/>*/}
            {/*    <div className="userChatInfo">*/}
            {/*        <span>Thanh Thùy</span>*/}
            {/*    </div>*/}
            {/*</div>*/}

            
        </div>
    );
}

export default Search;