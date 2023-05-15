
import React from "react";
import Login from "../Pages/Login";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const jwt_token = localStorage.getItem('token')
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');

        // const token=localStorage.getItem('token')
        if (jwt_token) {

            navigate("/nav")
        }
        else {
            navigate("/login")
        }
    }
    if (jwt_token) {


        return (
            <>
                {/* <div className="container" >
                    <div className="row">
                        {/* <div className="col-7"></div> */}
                        {/* <div className="col" ></div> */}
                        {/* <div className="col-12"> */} 
                      
                            <nav className="navbar navbar-expand-md navbar-light bg-light">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <a className="navbar-brand" href="#">
                                    <img src="https://lever-client-logos.s3.us-west-2.amazonaws.com/e51a226b-a430-49c3-951a-828fb3a7fe71-1657119027793.png" alt="" width="30" height="24" />
                                    Shyftlabs
                                </a>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
                                        <li className="nav-item active">
                                            <Link to="/dashboard" className="nav-link">Dashboard </Link>
                                        </li>
                                        <li className="nav-item" >
                                            <Link to="/leaves" className="nav-link">Leaves</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/expenses" className="nav-link">Expenses</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/services" className="nav-link">Services</Link>
                                        </li>
                                    </ul>

                                    <img src="https://static.vecteezy.com/system/resources/previews/006/086/198/original/notification-icon-for-web-vector.jpg" alt="" width="30" height="24" />
                                    <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                        <div className="btn-group dropdown">
                                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                            </a>
                                            {/* <FontAwesomeIcon icon={light("circle-user")} beat /> */}
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
                                                {/* <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a> */}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </nav>
                        {/* </div>
                    </div>
                </div> */}
            </>
        )

    }

    else {
        return (
            <div>

                <Login />

            </div>
        )
    }
}

export default Navbar;

