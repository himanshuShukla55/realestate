import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  //! states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [badRequest, setBadRequest] = useState(null);

  const navigate = useNavigate();

  //? useEffect to validate inputs
  useEffect(() => {
    validateEmail();
    validatePassword();
  }, [user]);

  //* email validation function
  const validateEmail = () => {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!user.email)
      setFormErrors((prev) => {
        return { ...prev, email: "email is required!" };
      });
    else if (!user.email.match(pattern))
      setFormErrors((prev) => {
        return { ...prev, email: "invalid email!" };
      });
    else {
      setFormErrors((prev) => {
        if (prev.email) {
          const { email, ...copy } = prev;
          return copy;
        }
        return prev;
      });
    }
  };
  //* password validation function
  const validatePassword = () => {
    if (!user.password)
      setFormErrors((prev) => {
        return { ...prev, password: "password is required!" };
      });
    else
      setFormErrors((prev) => {
        if (prev.password) {
          const { password, ...copy } = prev;
          return copy;
        }
        return prev;
      });
  };
  //* function to handle password visibility
  const handlePasswordVisibility = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible);
  };
  //* function to handle user state change
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  //* function to handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    setBadRequest(null);
    if (Object.keys(formErrors).length === 0) {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      const data = await res.json();
      if (!data.success) setBadRequest(data.message);
      else console.log("signed in");
    }
  };
  const { email, password } = user;
  return (
    <>
      <h1 className="text-3xl text-center mt-7 text-slate-500 font-bold">
        Sign In
      </h1>
      {badRequest && (
        <div className="max-w-md px-8 sm:px-3 mt-2 mx-auto my-0">
          <h3 className=" bg-red-600 rounded-lg text-center text-white  text-2xl m-0 p-2">
            {badRequest}
          </h3>
        </div>
      )}
      <form className="flex flex-col mx-auto max-w-md mt-5 gap-3 px-8 sm:px-3">
        <div>
          <input
            className={`p-3 focus:outline-none rounded-lg w-full ${
              formSubmitted && formErrors.email && "border-2 border-red-600"
            }`}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          {formSubmitted && formErrors.email && (
            <p className="text-red-600 text-xs pl-1">{formErrors.email}</p>
          )}
        </div>
        <div>
          <div
            className={`bg-white flex justify-between p-3 rounded-lg ${
              formSubmitted && formErrors.password && "border-2 border-red-600"
            }`}
          >
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
          {formSubmitted && formErrors.password && (
            <p className="text-red-600 text-xs pl-1">{formErrors.password}</p>
          )}
        </div>
        <button
          className="bg-slate-700 rounded-lg p-3 text-white hover:bg-slate-500"
          type="submit"
          onClick={handleSubmit}
        >
          SIGN IN
        </button>
      </form>
      <div className="flex m-auto max-w-md px-9 sm:px-4 mt-5">
        <p>Don't have an account?</p>
        <Link className="mx-1 text-blue-500" to="/sign-up">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
