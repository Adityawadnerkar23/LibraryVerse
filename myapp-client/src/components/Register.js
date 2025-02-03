import React, { useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import logo from "./assests/work-progress_5578703.png";
import { Link } from "react-router-dom";
// import pana from "../assests/pana.png";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const data = {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        gender: gender,
        email: email,
        password: password,
        phone: phone,
        dob: dob,
        address: address,
      };

      const response = await axios.post('http://localhost:5000/api/post_register', data);

      if (response.status === 201) {
        swal("Success", "User registered successfully!", "success");
        
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setGender('');
        setEmail('');
        setPassword('');
        setPhone('');
        setDob('');
        setAddress('');
      } else {
        swal("Error", "User registration failed", "error");
      }
    } catch (error) {
      swal("Error", "User registration failed", "error");
      console.error("Error registering user:", error);
    }
  };
  
  return (
    <div>
    <div className="login" style={{ background: "#F7EAED" }}>
    <div className="row" style={{ alignItems: "center" }}>
    {/* <div className="col-lg-6" style={{ paddingRight: 0, paddingLeft: 0 }}>
    <img src={pana} style={{ width: "100%", padding: "100px" }} alt="pana" />
    </div> */}
    <div className="col-lg-6" style={{ paddingRight: 40, paddingLeft: 20 }}>
    <div className="login_form">
    <div className="login_form1">
    <img src={logo} alt="logo" />
    <h2>Create your account</h2>
    <form onSubmit={registerUser}>
    <div className="scrollregister">
    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
    <div className="mb-4 input-group">
    <span className="input-group-text" id="basic-addon1">
    <i className="fa fa-user" aria-hidden="true" />
    </span>
    <input
    required=""
    name="First Name"
    placeholder="First Name"
    aria-label="First Name"
    type="text"
    className="form-control"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    />
    </div>
    </div>
    <Row>
                      <div className="col-lg-6" style={{ display: "block", margin: "auto" }}>
                        <div className="mb-4 input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-user" aria-hidden="true" />
                          </span>
                          <input
                            required=""
                            name="Middle Name"
                            placeholder="Middle Name"
                            aria-label="Middle Name"
                            type="text"
                            className="form-control"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6" style={{ display: "block", margin: "auto" }}>
                        <div className="mb-4 input-group">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-user" aria-hidden="true" />
                          </span>
                          <input
                            required=""
                            name="Last Name"
                            placeholder="Last Name"
                            aria-label="Email ID"
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </Row>
                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                      <div className="mb-4 input-group">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-user" aria-hidden="true" />
                        </span>
                        <select
                          className="form-control"
                          aria-label="Default select example"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                      <div className="mb-4 input-group">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                        </span>
                        <input
                          required=""
                          name="email"
                          placeholder="Email Id"
                          aria-label="Email ID"
                          type="text"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                      <div className="mb-4 input-group">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-lock" aria-hidden="true" />
                        </span>
                        <input
                          required=""
                          name="password"
                          placeholder="Enter Password"
                          aria-label="Enter Password"
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                          className="input-group-text"
                          id="basic-addon1"
                          style={{ cursor: "pointer" }}
                          onClick={togglePasswordVisibility}
                        >
                          <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                      <div className="mb-4 input-group">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-phone" aria-hidden="true" />
                        </span>
                        <input
                          required=""
                          name="Phone Number"
                          placeholder="Phone Number"
                          aria-label="Phone Number"
                          type="text"
                          className="form-control"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                      <div className="mb-4 input-group">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-calendar" aria-hidden="true" />
                        </span>
                        <input
                          required=""
                          name="Date Of Birth"
                          placeholder="Date Of Birth"
                          aria-label="Date Of Birth"
                          type="date"
                          className="form-control"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12" style={{ display: "block", margin: "auto" }}>
                      <div className="mb-4 input-group">
                        <span className="input-group-text" id="basic-addon1">
                          <i className="fa fa-map-marker" aria-hidden="true" />
                        </span>
                        <input
                          required=""
                          name="Address"
                          placeholder="Enter Address"
                          aria-label="Eddress"
                          type="text"
                          className="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-1 mt-3" style={{ display: "block", margin: "auto" }}>
                      <button type="submit" className="login_btnup">
                        Register
                      </button>
                    </div>
                  </div>
                </form>
                <span className="login_forgot">
                  Already have an account? <Link to='/'>Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
