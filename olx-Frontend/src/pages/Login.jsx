import React, { useState } from 'react';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Service/user';
import { useAuth } from '../providers/AuthProvider';


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login: loginUser } = useAuth()

  const navigate = useNavigate()


  // click event handler of Login button
  const onLogin = async () => {
    if (email.length == 0) {
      toast.warning('please enter email')
    } else if (password.length == 0) {
      toast.warning('please enter password')
    } else {
      console.log("sending the request for login ")
      const response = await login(email, password)
      if (response.status == 'success') {
        toast.success('login successful')

        // get the token from response and cache it in local storage
        localStorage.setItem('token', response.token)
        // localStorage.setItem('firstName', response['data']['firstName'])
        // localStorage.setItem('lastName', response['data']['lastName'])

        // set the logged in user information
        loginUser({
          userToken: response.token
        })

        // navigate to the PropertyListing page
        navigate('/home')
      } else {
        toast.error("Login Credentials not matched")
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

        <div className="welcome">
          <h2>Welcome Back</h2>
          <p className="subtitle">Please login to your account</p>
        </div>

        <div className='login-container'>
          <div className='mb-3'>
            <input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="email"
              placeholder="Email address"
              className='form-control'
            />
          </div>

          <div className='mb-3'>
            <input
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type="password"
              placeholder="Password"
              className='form-control'
            />
          </div>

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>
          <button
            onClick={onLogin}
            className="login-btn">Login</button>
        </div>

        <p className="signup">
          Don&apos;t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
