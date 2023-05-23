import logo from './logo.svg';
import './App.css';
import Register from "./page/register";
import Login from "./page/login";
import Home from "./page/home";
import {findAllByDisplayValue} from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </Router>
    );
}

export default App;
