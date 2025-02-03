import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginimage from './assests/user_166246.png';
import swal from 'sweetalert';
import { Link } from "react-router-dom";


        const Login = () => {
        const navigate = useNavigate();

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');

        const handleSubmit = async () => {
        setEmailError('');  
        setPasswordError(''); 

        if (email === '') {
        setEmailError('Please enter your email');
        return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError('Please enter a valid email');
        return;
        }

        if (password === '') {
        setPasswordError('Please enter a password');
        return;
        }

        // if (password.length < 8) {
        //   setPasswordError('The password must be 8 characters or longer');
        //   return;
        // }

        try {
        const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        };

        const response = await fetch('http://localhost:5000/api/post_log', reqOptions);
        const data = await response.json();
        console.log(data,"on Data")
        if (data.status == 200) {
        localStorage.setItem('user_data', JSON.stringify(data.data));
        localStorage.setItem('token',JSON.stringify(data.token))
        navigate('/banner'); 
        } else {
        swal({
          title: 'Error!',
          text: data.message,
          type: 'error',
          icon: 'error',
        });
        }
        } catch (error) {
        console.error('Error during fetch:', error);  
        swal({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        type: 'error',
        icon: 'error',
        });
        }
        };

  return (
      <div className="mainContainer">
      <div className="titleContainer">
      <img className="loginimage" width="60px" src={loginimage} alt="login" />
      </div>
    <br/>
      <div className="inputContainer">
      <input
        type="email"
        value={email}
        placeholder="Enter your email here"
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
      />
      <label className="errorLabel">{emailError}</label>
      </div>
    <br/>
      <div className="inputContainer">
      <input
        type="password"
        value={password}
        placeholder="Enter your password here"
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
      />
      <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
      <input
        className="inputButton"
        type="button"
        onClick={handleSubmit}
        value="Log in"
      />
    <br/>
      <div className='mb-4'>
      <p>new user?
      <Link to='/register'>Register</Link>
      </p>
      </div>
      </div>
      </div>
      );
      };

export default Login;
