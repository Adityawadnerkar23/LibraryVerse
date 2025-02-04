import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginimage from './assests/Leftlogo.webp';
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
      console.log(data, "on Data")
      if (data.status == 200) {
        localStorage.setItem('user_data', JSON.stringify(data.data));
        localStorage.setItem('token', JSON.stringify(data.token))
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
      <div className="formContainer">
        <div className="titleContainer">
          <img className="loginimage" width="60px" src={loginimage} alt="login" />
        </div>
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
        <button className="inputButton" onClick={handleSubmit}>Log In</button>
        <div className="registerLink">
          <p>New user? <Link to='/register'>Register</Link></p>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        /* General reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Arial', sans-serif;
          background-color: #f1f1f1;
        }

        /* Main container */
        .mainContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 10px;
        }

        /* Form container */
        .formContainer {
          background-color: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .titleContainer {
          margin-bottom: 20px;
        }

        .loginimage {
          border-radius: 50%;
          border: 2px solid #4CAF50;
          padding: 5px;
        }

        /* Input fields */
        .inputContainer {
          position: relative;
          margin-bottom: 20px;
        }

        .inputBox {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border: 2px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .inputBox:focus {
          border-color: #4CAF50;
        }

        .errorLabel {
          position: absolute;
          top: 35px;
          left: 0;
          font-size: 12px;
          color: #f44336;
        }

        /* Button */
        .inputButton {
          width: 100%;
          padding: 14px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .inputButton:hover {
          background-color: #45a049;
        }

        /* Register Link */
        .registerLink {
          margin-top: 20px;
          font-size: 14px;
        }

        .registerLink a {
          color: #4CAF50;
          text-decoration: none;
        }

        .registerLink a:hover {
          text-decoration: underline;
        }

        /* Responsive Styles */
        @media (max-width: 600px) {
          .formContainer {
            padding: 20px;
            width: 100%;
          }

          .inputBox {
            padding: 10px;
            font-size: 14px;
          }

          .inputButton {
            padding: 12px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
