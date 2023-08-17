import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    const auth = localStorage.getItem("student");
    const sid = JSON.parse(auth).id;

    console.warn(sid);

    const [sdatapc, setSdatapc] = useState([]);
    const [sdatacc, setSdatacc] = useState([]);

    useEffect(() => {
        getsdatapc();
        getsdatacc();
    }, []);

    const getsdatapc = async() => {
        let result = await fetch(`http://localhost:4000/datapc/${sid}`);
        result = await result.json();
        setSdatapc(result);
    }

    const getsdatacc = async () => {
        let result = await fetch(`http://localhost:4000/datacc/${sid}`);
        result = await result.json();
        setSdatacc(result);
    }

    const gsdatapc = sdatapc.reduce((groupedsdata, item) => {
        const sem = `${item.year} ${item.semester}`;
        if (!groupedsdata[sem]) { groupedsdata[sem] = []; }
        groupedsdata[sem].push(item);
        return (groupedsdata);
    }, {});

    const gsdatacc = sdatacc.reduce((groupedsdata, item) => {
        const sem = `${item.year} ${item.semester}`;
        if (!groupedsdata[sem]) { groupedsdata[sem] = []; }
        groupedsdata[sem].push(item);
        return (groupedsdata);
    }, {});
    console.log(gsdatapc);

    const dropcourse = async (id, cid) => {
        console.warn(id, cid);
        let result = await fetch(`http://localhost:4000/drop/${id}/${cid}`, {
            method:"Delete"
        });
        console.warn(result);
        result = await result.json();
        console.warn(result);
        if (result) { alert("course dropped successfully") };

    }

    return (
        <div className="sdata">
            <Link to="/home/registration"><button className="regbutton">Click here for registration</button></Link>
            {
                Object.keys(gsdatacc).map((semester) =>
                    <div key={semester}>
                        <h2> ID: {gsdatacc[semester][0].id}</h2>
                        <h2> Name: {gsdatacc[semester][0].name}</h2>
                        <h2>Department: {gsdatacc[semester][0].dept_name}</h2>
                        <h2>Total Credits: {gsdatacc[semester][0].tot_cred}</h2>
                        <h4>Running Courses taken in {semester}</h4>
                        <ul className="sdata">
                            <li className="sdata">course</li>
                            <li className="sdata">section</li>
                            <li className="sdata">grade</li>
                            <li className="sdata">Drop Option</li>
                        </ul>
                        {
                            gsdatacc[semester].map((item, index) =>
                                <ul className="sdata">
                                    <li className="sdata">{item.course_id}</li>
                                    <li className="sdata">{item.sec_id}</li>
                                    <li className="sdata">{item.grade}</li>
                                    <li className="sdata"><button onClick={() => dropcourse(item.id, item.course_id)}>DROP</button></li>
                                </ul>
                            )
                        }
                    </div>
                )
            }
            {
                Object.keys(gsdatapc).map((semester) =>
                    <div key={semester}>
                        <h4>Courses taken in {semester}</h4>
                        <ul className="sdata">
                            <li className="sdata">course</li>
                            <li className="sdata">section</li>
                            <li className="sdata">grade</li>
                        </ul>
                        {
                            gsdatapc[semester].map((item, index) =>
                                <ul className="sdata">
                                    <li className="sdata">{item.course_id}</li>
                                    <li className="sdata">{item.sec_id}</li>
                                    <li className="sdata">{item.grade}</li>
                                </ul>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Home;