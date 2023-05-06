function Login() {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Welcome!</span>
                <span className="title">Đăng nhập</span>
                <form>
                    <input type="text" placeholder="Username"/>
                    {/*<input type="email" placeholder="Email"/>*/}
                    <input type="password" placeholder="Password"/>
                    <button>Đăng nhập</button>
                </form>
                <p>Bạn chưa có tài khoản? <a href="">Đăng ký ngay</a></p>
            </div>
        </div>
    );
}

export default Login;