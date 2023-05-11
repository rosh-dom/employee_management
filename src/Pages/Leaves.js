import React from 'react';
// import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import ExpenseModal from './Modal';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from 'antd';
import { Link } from "react-router-dom";
const baseUrl = "https://44a7-125-17-251-66.ngrok-free.app/total_leaves";

function Leaves() {
  function handleClick() {
    alert('Successful')

  }

  const navigate = useNavigate();
  const url = "https://44a7-125-17-251-66.ngrok-free.app/leave_request"
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    startDate: "",
    endDate: "",
    description: ""
  })
  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [description, setDescription] = useState("");

  const assignFromDate = e => {
    const newValueFromDate = e.target.value;
    console.log(`New value of FromDate: ${newValueFromDate}`);
    setFromDate(newValueFromDate);


  };

  const handleToDateChange = (e) => {
    const newValueToDate = e.target.value;
    console.log(`New value of toDate: ${newValueToDate}`);
    setToDate(newValueToDate);
  };

  const handleDescriptionChange = (e) => {
    const newValueDesc = e.target.value;
    console.log(newValueDesc);
    setDescription(newValueDesc);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config={
      headers: {
        Authorization: `Bearer ${token}`,
      },
       "accept":"json",
      "ContentType": `application/json`,
     
    };
    Axios.post(url,  {
      start_date: fromDate,
      end_date: toDate,
      description: description,

    },config)

      .then(response => {
        console.log(response.data);
        message.success('Leave Request Successful');
        navigate("/nav");
      })
      .catch(error => {
        console.log(error);
        message.error('Leave Request Failed');
      });
  }
  

  useEffect(() => {
    const token=localStorage.getItem("token")
    const config={
      headers: {
      'Authorization': `Bearer ${token}`,},
      responseType: "json",
      "Content-Type": `application/json`,
      withCredentials: true,
    };
    // console.log(config)
    Axios.get(baseUrl,config)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data)
        // console.log(response.headers)

      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <>
      <div className=" row d-flex flex-column">
          <div className="col-12">
            <Navbar />
          </div>

        
        <div className="col-12">
          <div style={{ padding: "15px" }} >
            <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >Leave Request</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ padding: "80px" }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h2 className="modal-title" id="exampleModalLabel">Leave Request</h2>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body" >
                    <form onSubmit={handleSubmit} >
                      <div className='form-inline'>
                        <div className="form-group ">
                          <label htmlFor="startDate " className="col-form-label" style={{ padding: "7px", align: 'left' }} ><h6>Start Date</h6></label>
                          {/* <input type="text" className="form-control" id="recipient-name"/> */}
                          <input

                            type="date"
                            name="from"
                            id="startdate"
                            value={fromDate}
                            onChange={assignFromDate}
                            className="form-control datepicker"
                            style={{ width: "150px" }}
                          />
                        </div>
                        <div className="form-group ">

                          <label htmlFor="endDate" className="col-form-label" style={{ padding: "10px", alignContent: 'right' }}><h6>End Date</h6></label>
                          {/* <input type="text" className="form-control" id="recipient-name"/> */}
                          <input
                            type="date"
                            name="to"
                            min={fromDate}
                            id="enddate"
                            value={toDate}
                            placeholder="Select Date"
                            onChange={handleToDateChange}
                            className="form-control datepicker"
                            style={{ width: "150px" }}
                          />

                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="message-text" className="col-form-label" style={{ padding: "10px" }}><h6>Description</h6></label>
                        <textarea className="form-control" id="message-text" onChange={handleDescriptionChange}></textarea>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" value={description} onClick={handleSubmit} style={{ backgroundColor: 'black' }}>Request Leave</button>
                  </div>
                </div>
              </div>
            </div>
            {/* <Link to="/ex-req" type= "button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"> Leave request </Link> */}
          </div>


        </div>
        

        <div className=" col-12" >
          <span className="border ">
            <table className="table table-striped table-responsive-md table-hover table-bordered " >
             
                <thead >
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Approved/Rejected By</th>
                    <th scope="col">Comments</th>
                  </tr>
                </thead>
                <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.start_date}</td>
                <td>{user.end_date}</td>
                <td>{user.description}</td>
                <td>{user.status}</td>
                <td>{user.approved_by_rejected_by}</td>
                <td>{user.comments}</td>
                
              </tr>
            ))}
          
                </tbody>
            
            </table>
          </span>
        </div>


      </div>
      

    </>
  );
};

export default Leaves;