import './App.css';
import React from "react";
import Nav from "./nav.js";
import Login from "./login.js";
import Home from "./home.js";
import Cdninfo from "./cdeptdetails.js";
import Cinfo from "./courseinfo.js";
import Iinfo from "./instructors.js";
import Ciddetails from "./ciddetails";
import Iiddetails from "./iiddata";
import Regdetails from "./registration.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateComponent from './privatecomponent.js';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<div className="welcome"><h1 className="welcome">WELCOME TO IITASC</h1><h3>Click on login to enter login page</h3></div>}></Route>
                    <Route path="/login/" element={<Login />}></Route>
                    <Route element={<PrivateComponent />}>
                        <Route path="/home/" element={<Home />}></Route>
                        <Route path="/home/registration" element={<Regdetails />}></Route>
                        <Route path="/course">
                            <Route path="running" element={<Cdninfo />}>
                                <Route path=":dept_name" element={<Cinfo />}></Route>
                            </Route>
                            <Route path=":id" element={<div><Ciddetails /></div>} />
                        </Route>
                        <Route path="/instructor/" element={<Iinfo />} >
                            <Route path=":id" element={<Iiddetails />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
} 

export default App;