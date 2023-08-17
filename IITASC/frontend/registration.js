import React, { useState, useEffect } from 'react';

const Registration = () => {
    const auth = localStorage.getItem("student");
    const sid = JSON.parse(auth).id;

    const [cdata, setCdata] = useState([]);

    useEffect(() => {
        getcdata();
    }, []);

    const getcdata = async () => {
        let result = await fetch(`http://localhost:4000/search`);
        result = await result.json();
        setCdata(result);
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        console.warn(key);
        if (key) {
            console.warn("fetching data with search");
            let result = await fetch(`http://localhost:4000/search/${key}`);
            result = await result.json();
            setCdata(result);
        }
        else {
            getcdata();
        }
    }

    const register = async (info) => {
        console.log(info);
        const cid = info.course_id;
        const secid = info.sec_id;
        console.log(cid, secid);
        let result = await fetch('http://localhost:4000/course/registration', {
            method: 'post',
            body: JSON.stringify({ sid, cid, secid }),
            headers: { 'Content-type': 'application/json' }
        });
        result = await result.json();
        setCdata(result);
    }

    return (
        <div className="cdata">
            <input type="text" className="csearch" placeholder="search course id or name" onChange={searchHandle}></input>
            <table>
                <tr className="creg">
                    <th>id</th>
                    <th>name</th>
                    <th>section</th>
                    <th>registration option</th>
                </tr>
            {
                cdata.map((item, index) =>
                    <tr className="creg">
                        <td>{item.course_id}</td>
                        <td>{item.title}</td>
                        <td>{item.sec_id}</td>
                        <td><button onClick={()=>register(item)}>Register</button></td>
                    </tr>
                )
            }
            </table>
        </div>
    );
}

export default Registration;