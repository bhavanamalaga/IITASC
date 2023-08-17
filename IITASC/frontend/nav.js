import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem("student");
    const navigate = useNavigate();
    return (
        <div>
            { auth ?
                <div className="afterlogin">
                    <Link to="/home/">Home</Link>
                    <Link to="/course/running">CourseInformation</Link>
                    <Link to="/instructor/">InstructorInformation</Link>
                </div>
                :
                <div className="loginbutton">
                    <Link to="/login/">Login</Link>
                </div>
            }

        </div>
    );
};




export default Nav;
