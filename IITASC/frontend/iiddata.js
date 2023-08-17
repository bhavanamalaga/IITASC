import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

const Iiddetails = () => {
    let params = useParams();
    const [iiddata, setIiddata] = useState([]);

    useEffect(() => {
        getiiddata();
    }, [iiddata]);

    const getiiddata = async () => {
        let result = await fetch(`http://localhost:4000/instructor/${params.id}`);
        result = await result.json();
        console.warn(result);
        setIiddata(result);
    }

    const iiddatar = iiddata.reduce((groupediiddata, item) => {
        const id = `Name: ${item.name}                      Dept_name: ${item.dept_name}`;
        if (!groupediiddata[id]) { groupediiddata[id] = []; }
        groupediiddata[id].push(item);
        return (groupediiddata);
    }, {});
    console.log(iiddatar);
    return (
        <div>
            <h1 className="iinfo"> Details of Instructor: {params.id}</h1>
            <h3 className="iinfo"> On clicking on any of course_id or course_name will redirect you to course webpage</h3>
            {
                Object.keys(iiddatar).map((id) =>
                    <div key={id}>
                        <h1><pre>{id}</pre></h1>
                        <h2>Courses teaching in this semester/taught previously: </h2>
                        {
                            iiddatar[id].map((item) => <h3><pre><Link to={`/course/${item.course_id}`}>{item.course_id}</Link>     {item.title}       {item.semester}      {item.year}</pre></h3>)
                        }
                    </div>
            )}
        </div>
    )
}

export default Iiddetails;