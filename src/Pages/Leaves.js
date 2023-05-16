import React from 'react';
import Navbar from '../Components/Navbar';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { message } from 'antd';
// import axios from 'axios';


function Expenses() {
  // function handleClick() {
  //   alert('Successful')

  // }

  const navigate = useNavigate();
  const url = "https://4818-125-17-251-66.ngrok-free.app/leave_request"
  const baseUrl = "https://4818-125-17-251-66.ngrok-free.app/leaves";
  const updateUrl = "https://4818-125-17-251-66.ngrok-free.app/update_leave_status";
  const [users, setUsers] = useState([]);
  // const [data, setData] = useState({
  // start_date: "",
  // end_date: "",
  // description: ""
  // })
  
  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [description, setDescription] = useState("");

  const [statusFilter, setStatusFilter]= useState("");

  // const [expenses,setLeaves]=useState("");
  const token = localStorage.getItem("token");
  // const config={
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  //   responseType:"json",
  //   "ContentType": `application/json`,
  //   withCredentials: true,

  // };

  const [data, setData] = useState({
    comments:""
})

  const assignFromDate = e => {
    const newValueFromDate = e.target.value;
    console.log(`New value of FromDate: ${newValueFromDate}`);
    setFromDate(newValueFromDate);


  };

  function Refresh(){
    window.location.reload(true);
  }

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  function handle(e) {
    const newData = { ...data }
    newData.comments = e.target.value
    setData(newData)
    console.log(newData)
    

}

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

  const handleAccept = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "accept": "json",
      "ContentType": `application/json`,

    };
    
    const comments=data.comments;
    Axios.post(updateUrl, { id: id, status: "approved", comments: comments }, config)
      .then((response) => {
        console.log(response.data);
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            return { ...user, status: "approved" };
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        Refresh();
      })
      .catch((error) => console.error(error));


  }


  const handleReject = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "accept": "json",
      "ContentType": `application/json`,

    };
    const comments= data.comments;
    Axios.post(updateUrl, { id: id, status: "rejected", comments: comments }, config)
      .then((response) => {
        console.log(response.data);
        const updatedUsers = users.map((user) => {
          if (user.id === id) {
            return { ...user, status: "rejected" };
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
        Refresh();
      })
      .catch((error) => console.error(error));


  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      "accept": "json",
      "ContentType": `application/json`,

    };
    Axios.post(url, {
      start_date: fromDate,
      end_date: toDate,
      description: description,

    }, config)
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
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "json",
      "Content-Type": 'application/json',
      withCredentials: true,
    };
    // console.log(`Bearer ${token}`); // Log the Bearer token value to the console

    Axios.get(baseUrl, config)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
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
            <button type="button" className="btn btn-outline-primary float-right" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" >Leave Request</button>

            <select value={statusFilter} onChange={handleFilterChange} style={{position:'absolute', bottom: '-2px', left:'20px'}}>
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            {/* <button type="button" className="btn btn-primary float-left" onClick={handleTable}  >Refresh table</button> */}
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
                  <th scope="col"> Write comments</th>
                  <th scope="col"> Comment Display</th>
                  <th scope="col">status</th>
                  <th scope="col">Approved/Rejected By</th>
                  <th scope="col">Validate request</th>

                </tr>
              </thead>
              <tbody>
                {users && users.filter((user) =>
                 
                  statusFilter !=="" ? user.status === statusFilter : true
                 )
                
                .map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.start_date}</td>
                    <td>{user.end_date}</td>
                    <td>{user.description}</td>
                    <td ><input onChange={(e)=>handle(e)} id="comments" value={data.comments.id} placeholder='comments' className="input-group-text" type='text'></input> 
                    {/* <button className="btn-group" role="group" aria-label="Basic example">Save</button> */}
                   
                    </td>
                    <td>
                    {user.comments}
                    </td>

                    <td className="btn-group" role="group" aria-label="Basic example">
                      {user.status === "pending" ? (
                        <button className="btn btn-outline-warning btn-sm">
                          {user.status}
                        </button>
                      ) : user.status === "approved" ? (
                        <button className="btn btn-outline-success btn-sm">
                          {user.status}
                        </button>
                      ) : (
                        <button className="btn btn-outline-danger btn-sm">
                          {user.status}
                        </button>
                      )}
                    </td>
                      <td>{user.approved_by_rejected_by}</td>
                    <td class="btn-group" role="group" aria-label="Basic example">
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => handleAccept(user.id)}
                      >
                        Approve
                      </button>
                      
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleReject(user.id)}
                      >
                        Reject
                      </button>
                    </td>

                  </tr>
                ))}

                {/* <tr>
                    <th scope="row">2</th>
                    <td input type='text'> </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr> */}
              </tbody>

            </table>
          </span>
        </div>


      </div>


    </>
  );
};

export default Expenses;