import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  //! states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //* function to handle password visibility
  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };
  //* function to handle confirmPassword visibility
  const handleConfirmPasswordVisibility = (event) => {
    event.preventDefault();
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  //* function to handle user state change
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  //* function to handle Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
  };
  const { username, email, password, confirmPassword } = user;
  return (
    <>
      <h1 className="text-3xl text-center mt-7 text-slate-500 font-bold">
        Sign Up
      </h1>
      <form className="flex flex-col mx-auto max-w-md mt-5 gap-3 px-8 sm:px-3">
        <input
          className="p-3 focus:outline-none rounded-lg"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter Username"
        />
        <input
          className="p-3 focus:outline-none rounded-lg"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        <div className="bg-white flex justify-between p-3 rounded-lg">
          <input
            className="focus:outline-none bg-transparent w-[94%]"
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <button className="text-xl" onClick={handlePasswordVisibility}>
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <div className="bg-white flex justify-between p-3 rounded-lg">
          <input
            className="focus:outline-none bg-transparent w-[94%]"
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <button className="text-xl" onClick={handleConfirmPasswordVisibility}>
            {confirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        <button
          className="bg-slate-700 rounded-lg p-3 text-white hover:bg-slate-500"
          type="submit"
          onClick={handleSubmit}
        >
          SIGN UP
        </button>
      </form>
      <div className="flex m-auto max-w-md px-8 sm:px-3 mt-5">
        <p>Have an account?</p>
        <Link className="mx-1 text-blue-500" to="/sign-in">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
