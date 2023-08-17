import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";

const Ciddetails = () => {
    let params = useParams();
    const [ciddata, setCiddata] = useState([]);

    useEffect(() => {
        getciddata();
    }, [ciddata]);

    const getciddata = async () => {
        let result = await fetch(`http://localhost:4000/course/${params.id}`);
        result = await result.json();
        setCiddata(result);
    }
    return (
        <div>
            <h1> Details of Courseid: {params.id}</h1>
            <table>
                <tr>
                    <th>COURSE NAME</th>
                    <th>DEPARTMENT NAME</th>
                    <th>CREDITS</th>
                    <th>PREREQ</th>
                </tr>
                {
                    ciddata.map((item,index) =>
                        <tr>
                            <td>{ item.title }</td>
                            <td>{ item.dept_name }</td>
                            <td>{ item.credits }</td>
                            <td><Link to={`/course/${item.prereq_id}`}>{item.prereq_id}</Link></td>
                        </tr>
                    )
                }
            </table>
        </div>
    )
}

export default Ciddetails;