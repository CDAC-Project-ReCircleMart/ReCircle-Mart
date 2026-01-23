import React, { useState } from 'react';

import { register } from '../Service/user';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'


export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()


  const onRegister = async () => {
    if (email.length == 0) {
      toast.warning('please enter email')
    }
    else if (password.length == 0) {
      toast.warning('please enter password')
    }
    else if (name.length == 0) {
      toast.warning('please enter name')
    }
    else if (phone.length == 0) {
      toast.warning('please enter phone')

    }
    else if (password != confirmPassword) {
      toast.warning('confirm pass and pass should be same ')
    }
    else {
      console.log("sending the register request to server")
      const response = await register(name, email, password, phone)

      if (response.status == 'success') {


        navigate('/login')
        toast.success("User Registered Successfully")
      }
      else {
        console.log(response)
      }
    }



  }



  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div className="tagline">
          <h1>Fast, Friendly & Trusted Marketplace.</h1>
          <p>Your go-to platform for smart buying & selling.</p>
        </div>

        <h2>Create Your Account</h2>
        <p className="subtitle">Join the fastest growing marketplace today!</p>

        <div className='login-container'>
          <input
            onChange={(e) => {
              setName(e.target.value)
            }}
            type="text"
            placeholder="Full Name"
            className='form-control mb-3'
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            type="email"
            placeholder="Email ID"
            className='form-control mb-3'
          />
          <input
            onChange={(e) => {
              setPhone(e.target.value)
            }}
            type="tel"
            placeholder="Mobile Number (OTP verification)"
            className='form-control mb-3' />
          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            type="password" placeholder="Password"
            className='form-control mb-3' />
          <input
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
            type="password" placeholder="Confirm Password"
            className='form-control mb-3' />
          <button
            onClick={onRegister}
            className="login-btn">Sign Up</button>
        </div>

        <p className="signup">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
