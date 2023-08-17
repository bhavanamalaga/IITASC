import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Cdninfo = () => {
    const [cdndata, setCdndata] = useState([]);

    useEffect(() => {
        getcdndata();
    }, [cdndata]);

    const getcdndata = async () => {
        let result = await fetch(`http://localhost:4000/course/dept_name`);
        result = await result.json();
        setCdndata(result);
    }

    return (
        <div className="courseinfo">
            <h1>List of departments running courses this semester</h1>
            <h3>Click on Department to view list of courses</h3>
            {
                cdndata.map((item, index) =>
                        <li className="courseid"><Link to={`/course/running/${item.dept_name}`}>{item.dept_name}</Link></li>
                )
            }
            <Outlet />
        </div>
    );
}

export default Cdninfo;