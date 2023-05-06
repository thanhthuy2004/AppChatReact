import React from 'react'
function Register() {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Welcome!</span>
                <span className="title">Đăng ký</span>
                <form>
                    <input type="text" placeholder="Username"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>
                    <button>Đăng ký</button>
                </form>
                <p>Bạn đã có tài khoản? <a href="">Đăng nhập</a></p>
            </div>
        </div>
    );
}

export default Register;