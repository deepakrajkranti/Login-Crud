import React, { useState } from 'react'
import { FaLock, FaUser } from "react-icons/fa";
import './LoginForm.css'
import styled from 'styled-components'
import img from '../background.jpg'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
height:100vh;
display:flex;
align-items: center;
justify-content: center;
background:url(${img});
background-size:cover;
background-position:center;
`
const LoginForm = () => {

  const navigate=useNavigate();

  const [user,SetUser]=useState('');
  const [password1,SetPassword1]=useState('');
  const email="eve.holt@reqres.in";
  const password="cityslicka";
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log({user,password1});
    axios.post("https://reqres.in/api/login", {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);
      navigate('/crud');
      
    }).catch(error=>{
      alert('service error');
      console.log(error);
    })


    SetUser('');
    SetPassword1('');
    ;
  }
  return (
    <Container>
    <div className='wrapper'>
        <h1>LOGIN</h1>
        <div className="input-box">
            <input type='text'  value={user} onChange={(e)=>SetUser(e.target.value)} placeholder='Username' required/>
            <FaUser className='icons'/>
        </div>
        <div className="input-box">
            <input type='password' value={password1}  onChange={(e)=>SetPassword1(e.target.value)} placeholder='password' required/>
            <FaLock className='icons'/>
        </div>
        <div className="remember-forgot">
           <label><input type='checkbox' /> Rememeber Me</label>
           {/* <a href='/'>Forgot Password</a> */}
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
    </div>
    </Container>
  )
}

export default LoginForm