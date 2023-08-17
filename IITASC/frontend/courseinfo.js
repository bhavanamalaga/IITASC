import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';

const Cinfo = () => {
    let params = useParams();
    const [cdata, setCdata] = useState([]);

    useEffect(() => {
        getcdata();
    }, [cdata]);

    const getcdata = async () => {
        let result = await fetch(`http://localhost:4000/course/running/${params.dept_name}`);
        result = await result.json();
        setCdata(result);
    }

    return (
        <div className="courseinfo">
            <h1>COURSE INFORMATION</h1>
            <h2>dept_name: {params.dept_name}</h2>
            <h2>Click on Courseid to view course details</h2>
            {
                cdata.map((item, index) =>
                    <li className="sdata"><Link to={`/course/${item.course_id}`}>{item.course_id}</Link></li>
                )
            }
            <Outlet />

        </div>
    );
}

export default Cinfo;