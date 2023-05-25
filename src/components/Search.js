import React from 'react'
import CreateRoom from "./CreateRoom";
import "../App.css"
function Search() {
    return (

        <div className="search">
            <CreateRoom></CreateRoom>
            <div className="searchForm">
                <input type="text" placeholder="Tìm kiếm"/>
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