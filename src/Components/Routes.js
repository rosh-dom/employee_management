import React from 'react';
import { BrowserRouter,Route, Routes} from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Expenses from '../Pages/Expenses';
import Leaves from '../Pages/Leaves';
import Login from '../Pages/Login';
import Navbar from './Navbar';
import Services from '../Pages/Services';
import Home from '../Pages/Home';
import Protected from '../Pages/Protected';
import ExpenseModal from '../Pages/Modal';


function Routesf(){
  const token=localStorage.getItem('token')
  const isLogin = token !== null;

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/login' element={<Login />} />

        <Route
            path="/leaves"
            element={
              <Protected isLogin={isLogin} components={<Leaves/>} />
            }
          />

        <Route
            path="/expenses"
            element={
              <Protected isLogin={isLogin} components={<Expenses/>} />
            }
          />  

        <Route
            path="/dashboard"
            element={
              <Protected isLogin={isLogin} components={<Dashboard/>} />
            }
          />
        
        <Route
            path="/services"
            element={
              <Protected isLogin={isLogin} components={<Services/>} />
            }
          />
        
     
        <Route
            path="/nav"
            element={
              <Protected isLogin={isLogin} components={<Navbar/>} />
            }
          />

        <Route exact path='/ex-req' element={<ExpenseModal />} />
        <Route exact path='*' element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routesf;
