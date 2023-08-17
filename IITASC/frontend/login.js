import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        console.warn(name, id);
        let result = await fetch('http://localhost:4000/login', {
            method: 'post',
            body: JSON.stringify({ id, name }),
            headers: {'Content-type':'application/json'}
        });

        result = await result.json();
        console.warn(result)

        if (result.name) {
            localStorage.setItem("student", JSON.stringify(result));
            navigate("/home/");
        }
        else { console.log("wrong details"); alert("enter correct details"); }
    }

    return (
        <div className="login">
            <h5 className="logindata">ID:</h5>
            <input className="details" type="text" placeholder="Enter id" onChange={(e) => setId(e.target.value)} value={id} />
            <h5 className="logindata">Password:</h5>
            <input className="details" type="text" placeholder="Enter password" onChange={(e) => setName(e.target.value)} value={name} />
            <button className="loginbutton" onClick={handleLogin} type="button">Login</button>
        </div>
    );
};



export default Login;
