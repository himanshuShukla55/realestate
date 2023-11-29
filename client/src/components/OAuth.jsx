import React from "react";
import { authenticateWithGoogle } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { singInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const { user } = await authenticateWithGoogle();
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success) {
        dispatch(singInSuccess(data.data));
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Google OAuth Error!");
      console.error(error);
    }
  };
  return (
    <button
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg hover:bg-red-500 hover:cursor-pointer"
      onClick={handleGoogleClick}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
};

export default OAuth;
