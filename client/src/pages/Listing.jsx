import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useSelector } from "react-redux";

import "swiper/css/bundle";
import Contact from "../components/Contact";

const Listing = () => {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  //* function to get listing data
  const fetchListing = async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(`/api/listing/${params.listingId}`);
      const data = await res.json();
      setLoading(false);
      if (!data.success) setError(data.message);
      setListing(data.data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <main>
      {loading ? (
        <p className="text-5xl p-3 text-center">Loading...</p>
      ) : error ? (
        <p className="bg-red-500 rounded-lg p-3 m-2 text-center text-4xl font-semibold text-white">
          {error}
        </p>
      ) : (
        listing && (
          <>
            <Swiper navigation>
              {listing.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="h-[300px] sm:h-[640px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="m-4">
              <p className="display : flex flex-col gap-0 leading-none">
                <span className="text-3xl font-semibold text-slate-700">
                  {listing.name}
                </span>
                <span className="text-slate-500">
                  {listing.type === "sell" ? "Own at: " : "Rent at: "}$
                  {(listing.offer
                    ? listing.discountPrice
                    : listing.regularPrice
                  ).toLocaleString("en-US")}
                  {listing.type === "rent" && "/month"}
                </span>
              </p>
              <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
                <FaMapMarkerAlt className="text-green-600" />
                <span>{listing.address}</span>
              </p>
              <div className="my-2 flex gap-2">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {listing.type === "sell" ? "For Sale" : "For Rent"}
                </p>
                {listing.offer && (
                  <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    Discount: $
                    {(
                      listing.regularPrice - listing.discountPrice
                    ).toLocaleString("en-US")}
                  </p>
                )}
              </div>
              <div className="my-6">
                <h2 className="font-semibold text-slate-700 text-2xl">
                  About {listing.name}
                </h2>
                <p className="text-slate-600 break-normal my-2">
                  {listing.description}
                </p>
                <ul className="text-green-700 flex gap-3 sm:gap-6">
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBed className="h-6 w-6" />
                    <span>
                      {listing.bedrooms}
                      {listing.bedrooms > 1 ? " beds" : "bed"}
                    </span>
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaBath className="h-6 w-6" />
                    <span>
                      {listing.bathrooms}
                      {listing.bathrooms > 1 ? " baths" : "bath"}
                    </span>
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaParking className="h-6 w-6" />
                    <span>{listing.parking ? "Parking" : "No Parking"}</span>
                  </li>
                  <li className="flex items-center gap-1 whitespace-nowrap">
                    <FaChair className="h-6 w-6" />
                    <span>
                      {listing.furnished ? "Furnished" : "Unfurnished"}
                    </span>
                  </li>
                </ul>
              </div>
              {currentUser ? (
                currentUser._id !== listing.userRef &&
                (contact ? (
                  <Contact listing={listing} />
                ) : (
                  <button
                    className="bg-slate-700 text-white rounded-lg p-3 hover:bg-slate-500 text-center w-full"
                    onClick={() => setContact(true)}
                  >
                    CONTACT LANDLORD
                  </button>
                ))
              ) : (
                <button
                  className="bg-slate-700 text-white rounded-lg p-3 hover:bg-slate-500 text-center w-full"
                  onClick={() => navigate("/sign-in")}
                >
                  LOGIN TO CONTACT LANDLORD
                </button>
              )}
            </div>
          </>
        )
      )}
    </main>
  );
};

export default Listing;
