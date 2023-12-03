import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingCard from "../components/ListingCard";

import "swiper/css/bundle";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  SwiperCore.use([Navigation]);

  const getData = async () => {
    try {
      const offerRes = await fetch(`/api/listing?offer=true&order=asc`);
      const offers = await offerRes.json();
      setOfferListings(
        offers.data.length > 4 ? offers.data.slice(0, 4) : offers.data
      );
      const rentRes = await fetch(`/api/listing?type=rent`);
      const rentListings = await rentRes.json();
      setRentListings(
        rentListings.data.length > 4
          ? rentListings.data.slice(0, 4)
          : rentListings.data
      );
      const saleRes = await fetch(`/api/listing?type=sell`);
      const saleListings = await saleRes.json();
      setSaleListings(
        saleListings.data.length > 4
          ? saleListings.data.slice(0, 4)
          : saleListings.data
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col gap-7 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">Perfect</span> <br />
          Place with ease.
        </h1>
        <div className="text-slate-500 text-xs sm:text-sm ">
          Unlock Your Dream Home: Where Elegance Meets Comfort. Your Key to
          Premier Properties and Unparalleled Living Experiences Awaits!
          <br />
          We have a wide range of properties to choose from.
        </div>
        <Link
          className="text-xs sm:text-sm font-bold text-slate-700 hover:underline"
          to="/search"
        >
          Lets get started
        </Link>
      </div>

      <Swiper navigation>
        {offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[500px]"
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="flex flex-col gap-8 my-10 items-center px-10">
        {offerListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">Offers</h2>
              <Link
                className="text-sm hover:underline text-blue-800"
                to="/search?offer=true"
              >
                View More Offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {saleListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">Buy</h2>
              <Link
                className="text-sm hover:underline text-blue-800"
                to="/search?type=sell"
              >
                View More
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
        {rentListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">Rent</h2>
              <Link
                className="text-sm hover:underline text-blue-800"
                to="/search?type=rent"
              >
                View More
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
