import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Iinfo = () => {
    const [idata, setIdata] = useState([]);

    useEffect(() => {
        getidata();
    }, [idata]);

    const getidata = async () => {
        let result = await fetch(`http://localhost:4000/instructor/`);
        result = await result.json();
        setIdata(result);
    }

    return (
        <div className="courseinfo">
            <h1 className="iinfo">List of Instructor ID's</h1>
            <h3 className="iinfo">Click on Instructorid to view Instructor details</h3>
            {
                idata.map((item, index) =>
                    <li className="courseid"><Link to={`/instructor/${item.id}`}>{item.id}</Link></li>
                )
            }
            <Outlet />

        </div>
    );
}

export default Iinfo;