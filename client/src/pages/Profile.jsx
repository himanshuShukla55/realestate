import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { handleFileUpload } from "../utils/firebase.js";

const Profile = () => {
  const {
    currentUser: { username, email, avatar },
  } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
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
      <form className="flex flex-col gap-4">
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
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg focus:outline-none"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg focus:outline-none"
          id="password"
        />
        <button className="bg-slate-700 rounded-lg text-white p-3 hover:bg-slate-500">
          UPDATE
        </button>
      </form>
      <div className="flex justify-between mt-5 px-1">
        <span className="text-red-600 hover:cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-600 hover:cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
