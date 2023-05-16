import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


function Login() {

    const navigate = useNavigate();
    const url = "https://4818-125-17-251-66.ngrok-free.app/login"
    const token = localStorage.getItem('token')
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
        }, {
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
                    // navigate("/nav")
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
            {/* <background src="https://images.unsplash.com/photo-1613742631162-cdba058776b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5JTIwYmx1ZXxlbnwwfHwwfHw%3D&w=1000&q=80"/> */}
            <div className="container" style={{backgroundImage: 'https://images.unsplash.com/photo-1613742631162-cdba058776b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2t5JTIwYmx1ZXxlbnwwfHwwfHw%3D&w=1000&q=80'}}>
                <div className="row d-flex justify-content-center">
                    <div className="col"></div>

                    <div className="col-8 px-5 py-19 mx-auto" style={{ paddingTop: '10%' }}>
                        <div className="card " style={{ width: '30rem', backgroundColor: 'skyblue', height: '38rem' }}>
                            <img src="data:image/png;base64,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" />
                            <div className="card-body" style={{ width: '30rem' }}>
                                {/* <div className="container-fluid" style={{ position: 'relative', right: '-25%', top:'25%', fontSize:'150%' }}> */}

                                <h3 className="font-weight-bold text-center mx-auto" style={{ padding: '5%' }}> Login </h3>

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