import React from 'react'
function Navbar() {
    return (
        <div className="navbar">
            <span className="logo">
                Nhóm 26
            </span>
            <div className="user">
                <img src="https://th.bing.com/th/id/R.6b8d9385853cc377b5b17617d0635101?rik=Euc8HcZ%2f20KSSg&pid=ImgRaw&r=0" alt=""/>
                <span>Thùy</span>
                <button>Đăng xuất</button>
            </div>
        </div>
    );
}

export default Navbar;