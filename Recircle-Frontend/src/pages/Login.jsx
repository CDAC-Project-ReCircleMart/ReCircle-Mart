import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Service/user";
import { useAuth } from "../providers/AuthProvider";

function newUser(response) {
  if (response.profile.bio == null && response.profile.addresses.length == 0) {
    return true;
  }
  return false;
}


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

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

        // console.log(response.data)
        loginUser({
          userToken: response.token,
          user: response.data
        })
        // console.log(response)


        if (newUser(response.data)) {
          console.log("This is the new user ")
        }
        else {
          navigate('/home')
        }




      } else {
        toast.error("Login Credentials not matched")
      }
    }


  };



  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="form-control mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control mb-3"
        />

        <button onClick={onLogin} className="login-btn">
          Login
        </button>

        <p className="signup">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
