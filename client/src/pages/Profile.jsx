import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleFileUpload } from "../utils/firebase.js";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice.js";

const Profile = () => {
  //* getting the global state.
  const {
    currentUser: { _id, username, email, avatar },
    error,
    loading,
  } = useSelector((state) => state.user);

  //! declaring state and refs.
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccessful, setUpdateSuccessful] = useState(false);

  //* function to handle form state change
  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  //* function to submit form.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/update/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) dispatch(updateUserFailure(data.message));
      else {
        dispatch(updateUserSuccess(data.data));
        setUpdateSuccessful(true);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  //* function to delete a user
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/users/delete/${_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) dispatch(deleteUserFailed(data.message));
      else dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailed(error.message));
    }
  };

  //* useEffect hook to update the avatar
  useEffect(() => {
    if (file)
      handleFileUpload(
        file,
        setFilePercentage,
        setFileUploadError,
        setFormData
      );
  }, [file]);

  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-3xl text-center my-7 text-slate-500 font-bold">
        Profile
      </h1>
      {error && (
        <div className="max-w-md mb-3 mx-auto my-0">
          <h3 className=" bg-red-400 rounded-lg text-center text-white  text-2xl m-0 p-2">
            {error}
          </h3>
        </div>
      )}
      {updateSuccessful && (
        <div className="max-w-md my-2 mx-auto">
          <h3 className=" bg-green-400 rounded-lg text-center text-white  text-2xl m-0 p-2">
            Profile Updated!
          </h3>
        </div>
      )}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          hidden
        />
        <img
          src={formData.avatar || avatar}
          alt={username}
          className="rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center my-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-center">
          {fileUploadError ? (
            <span className="text-red-600">Image Upload Failed!</span>
          ) : (
            filePercentage > 0 &&
            (filePercentage < 100 ? (
              <span className="text-slate-700">
                Uploading {filePercentage}%...
              </span>
            ) : (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ))
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg focus:outline-none"
          id="username"
          name="username"
          defaultValue={username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
          name="email"
          defaultValue={email}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 rounded-lg text-white p-3 hover:bg-slate-500 disabled:bg-slate-400"
        >
          {loading ? "Loading..." : "UPDATE"}
        </button>
      </form>
      <div className="flex justify-between mt-5 px-1">
        <span
          className="text-red-600 hover:cursor-pointer"
          onClick={handleDelete}
        >
          Delete Account
        </span>
        <span className="text-red-600 hover:cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
