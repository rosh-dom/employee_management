import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


function Login() {

    const navigate = useNavigate();
    const url = "https://44a7-125-17-251-66.ngrok-free.app/login"
    const token=localStorage.getItem('token')
    console.log(token)
    
    const [data, setData] = useState({
        email: "",
        password: ""
    })
   

    function submit(e) {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (data.password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }
        Axios.post(url, {
            email: data.email,
            password: data.password
        },{
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
        .then(res => {
            if (res.data) {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                // alert(res.data.user);
                navigate("/nav")
            } else {
                localStorage.setItem('token', res.data.token)
                alert(res.data.message);
                    navigate("/nav")
                    // Redirect to home page or perform other actions as needed
                }

            })
            .catch(err => {
                console.log(err);
                alert("An error occurred while logging in.");
            });

           
    }

    function handle(e) {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)

    }


    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col"></div>

                    <div className="col-8 px-5 py-19 mx-auto"  style={{paddingTop:'10%'}}>
                        <div className="card " style={{ width: '25rem', backgroundColor:'skyblue', height:'rem'}}>
                            <div className="card-body" style={{ width:'25rem'}}>
                                {/* <div className="container-fluid" style={{ position: 'relative', right: '-25%', top:'25%', fontSize:'150%' }}> */}

                                <h3 className="font-weight-bold text-center mx-auto" style={{padding:'5%'}}> Login </h3>

                                <form className="text-center" onSubmit={(e) => submit(e)}>
                                    <label >

                                        Enter Your Email:
                                        <input onChange={(e) => handle(e)} id="email" value={data.email} placeholder="email" class="input-group-text" type='text' ></input>
                                    </label>  <br /> <br />
                                    <label>
                                        Enter Password:
                                        <input onChange={(e) => handle(e)} id="password" value={data.password} placeholder="password" class="input-group-text" type='password'></input>
                                    </label><br /> <br />
                                    <div >
                                        <button className="btn btn-info" >
                                            <h3> Login  </h3>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
            </div>
        </>




    );
};

export default Login;