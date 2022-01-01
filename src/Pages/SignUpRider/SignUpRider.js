import axios from "axios";
import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import "./SignUpRider.css";

const SignUpRider = () => {
  const history = useHistory();
  const location = useLocation();
  const [registerError, setRegisterError] = useState("");
  const redirect_uri = location.state?.from || "/profile";

  const { registerUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { email, password, userName, cPassword } = data;
    if (password !== cPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password not matched!",
      });
    } else {
      registerUser(data.email, data.password, data.fullName, history, location);
    }

    axios.post("https://rocky-island-87400.herokuapp.com/riderUsersCollection", data)
      .then((response) => {
        if (response.data.insertedId) {
          const url = "/profile";
          history.push(url);
        }
      });
  };

  return (
    <div className="section-wrapper">
      <Container>
        <div className="sign--inner-wrapper signup-rider-inner">
          <Row className="learner-row-wrap">
            <Col sm={12} md={5}>
              <div>
                <img
                  className="img-fluid riding-img-design"
                  src="https://i.ibb.co/MNzY6g5/bicicleta-animada-gif-14.gif"
                  alt="Bike Riding"
                />
              </div>
            </Col>
            <Col sm={12} md={7}>
              <div className="form-wrapper">
                <h2 className="sign-in-text">Sign Up Rider</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-wrapper-inner">
                    <div className="personal-info-wrapper">
                      {/* FullName */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Full Name: </label> */}
                        <input
                          placeholder="FullName"
                          className="inp-field"
                          {...register("fullName", {
                            required: true,
                            maxLength: 40,
                          })}
                        />
                      </div>
                      {/* Email */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Email: </label> */}
                        <input
                          placeholder="Email"
                          className="inp-field"
                          type="email"
                          {...register("email", {
                            required: true,
                            maxLength: 40,
                          })}
                        />
                      </div>
                      {/* Age */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Age: </label> */}
                        <input
                          placeholder="Age"
                          className="inp-field"
                          type="number"
                          {...register("age", { min: 18, max: 99 })}
                        />
                      </div>
                      {/* Address */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Address: </label> */}
                        <input
                          placeholder="Address"
                          className="inp-field"
                          type="text"
                          {...register("address", {
                            required: true,
                            maxLength: 40,
                          })}
                        />
                      </div>
                      {/* Area */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Area: </label> */}
                        <input
                          placeholder="Area"
                          className="inp-field"
                          type="text"
                          {...register("area", {
                            required: true,
                            maxLength: 40,
                          })}
                        />
                      </div>
                      {/* Phone */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Phone: </label> */}
                        <input
                          placeholder="Phone"
                          className="inp-field"
                          type="number"
                          {...register("phone", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>

                      {/* NID Picture */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">NID picure url:</label> */}
                        <input
                          placeholder="NID Picture URL"
                          className="inp-field"
                          type="text"
                          {...register("NIDPicture", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                      {/* Profile Picture Url */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Profile picure url:</label> */}
                        <input
                          placeholder="Profile Picture URL"
                          className="inp-field"
                          type="text"
                          {...register("photo", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                    </div>
                    {/* Car Information Start */}
                    <div className="car-info-wrapper">
                      {/* Car/Bike Name */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Name:</label> */}
                        <input
                          placeholder="Car/Bike Name"
                          className="inp-field"
                          type="text"
                          {...register("carName", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                      {/* Car/Bike Model */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Model:</label> */}
                        <input
                          placeholder="Car/Bike Model"
                          className="inp-field"
                          type="text"
                          {...register("carModel", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                      {/* Name Plate */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Name Plate:</label> */}
                        <input
                          placeholder="Name Plate"
                          className="inp-field"
                          type="text"
                          {...register("namePlate", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>

                      {/* Password */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Password: </label> */}
                        <input
                          placeholder="Password"
                          className="inp-field"
                          type="password"
                          {...register("password", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                      {/* Confirm Password */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">C Password: </label> */}
                        <input
                          placeholder="Confirm Password"
                          className="inp-field"
                          type="password"
                          {...register("cPassword", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                      {/* Vechile Type */}
                      <div className="input-group-wrapper">
                        {/* <label className="inp-label">Vehicle type: </label> */}
                        <select
                          className="inp-field"
                          id="user1"
                          name="carType"
                          {...register("carType")}
                        >
                          <option value="select">Select</option>
                          <option value="car">Car</option>
                          <option value="bike">Bike</option>
                        </select>
                      </div>
                      {/* Driving Lincence */}
                      <div className="input-group-wrapper">
                        <input
                          placeholder="Driving Lincence URL"
                          className="inp-field"
                          type="text"
                          {...register("drivingLincence", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                      {/* User type */}
                      <div
                        className="input-group-wrapper"
                        style={{ display: "none" }}
                      >
                        <label className="inp-label">User Type: </label>
                        <input
                          placeholder=" "
                          className="inp-field"
                          type="text"
                          value="learner"
                          {...register("userType", {
                            required: true,
                            maxLength: 12,
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <input placeholder=" " type="submit" className="submit-btn" />
                </form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SignUpRider;
