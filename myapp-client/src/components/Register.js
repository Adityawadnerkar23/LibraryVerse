import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import logo from "./assests/user_166246.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    address: "",
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/post_register", formData);
      if (response.status === 201) {
        swal("Success", "User registered successfully!", "success");
        setFormData({ firstName: "", middleName: "", lastName: "", gender: "", email: "", password: "", phone: "", dob: "", address: "" });
      } else {
        swal("Error", "User registration failed", "error");
      }
    } catch (error) {
      swal("Error", "User registration failed", "error");
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          <h2>Create Your Account</h2>
        </div>
        <form onSubmit={registerUser}>
          <div className="form-group">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
          </div>
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <div className="password-container">
            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="button" onClick={togglePasswordVisibility} className="toggle-password">
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          <button type="submit" className="register-button">Register</button>
        </form>
        <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
      </div>

      {/* Inline Styles */}
      <style>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f9;
        }

        .form-container {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .logo-container {
          margin-bottom: 20px;
        }

        .logo {
          width: 50px;
          height: 50px;
          object-fit: contain;
          margin-bottom: 10px;
        }

        h2 {
          font-size: 24px;
          color: #333;
        }

        .form-group {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        input, select {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 16px;
        }

        select {
          width: 100%;
          padding: 12px;
        }

        .password-container {
          position: relative;
        }

        .toggle-password {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }

        button.register-button {
          width: 100%;
          padding: 12px;
          background-color: #4CAF50;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }

        button.register-button:hover {
          background-color: #45a049;
        }

        .login-link {
          margin-top: 20px;
          font-size: 14px;
          color: #555;
        }

        .login-link a {
          color: #4CAF50;
          text-decoration: none;
        }

        .login-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Register;
