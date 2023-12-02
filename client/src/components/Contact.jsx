import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState();
  const [message, setMessage] = useState("");

  const getUser = async () => {
    try {
      const res = await fetch(`/api/users/${listing.userRef}`);
      const data = await res.json();
      if (!data.success) return;
      setLandlord(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username} </span>
            for <span className="font-semibold">{listing.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message} `}
            className="bg-slate-700 text-center text-white p-3 rounded-lg hover:bg-slate-500"
          >
            SEND MESSAGE
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;
