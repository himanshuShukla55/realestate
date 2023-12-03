import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [append, setAppend] = useState(false);

  //*function to handle show more
  const handleShowMore = () => {
    setAppend((prev) => true);
    setSearchParams((prev) => {
      prev.set("startIndex", listings.length);
      return prev;
    });
  };

  //* function to handle sidebar inputs
  const handleChange = ({ target: { name, value, checked } }) => {
    if (name === "sell" || name === "rent" || name === "all")
      setSidebarData((prev) => ({ ...prev, type: name }));
    else if (name === "parking" || name === "furnished" || name === "offer")
      setSidebarData((prev) => ({ ...prev, [name]: checked }));
    else if (name === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebarData((prev) => ({ ...prev, sort, order }));
    } else if (name === "searchTerm")
      setSidebarData((prev) => ({ ...prev, searchTerm: value }));
  };

  //* function to change address bar url as per the sidebar inputs
  const handleSumbit = (e) => {
    e.preventDefault();
    setSearchParams((prev) => {
      prev.set("searchTerm", sidebarData.searchTerm);
      prev.set("type", sidebarData.type);
      prev.set("offer", sidebarData.offer);
      prev.set("parking", sidebarData.parking);
      prev.set("furnished", sidebarData.furnished);
      prev.set("sort", sidebarData.sort);
      prev.set("order", sidebarData.order);
      if (prev.get("startIndex")) prev.delete("startIndex");
      return prev;
    });
    navigate(`/search?${searchParams.toString()}`);
  };

  //* function to change sidebar inputs as per url change
  useEffect(() => {
    setSidebarData((prev) => {
      const searchTerm = searchParams.get("searchTerm");
      const type = searchParams.get("type");
      const offer = searchParams.get("offer");
      const furnished = searchParams.get("furnished");
      const parking = searchParams.get("parking");
      const sort = searchParams.get("sort");
      const order = searchParams.get("order");
      if (searchTerm) prev = { ...prev, searchTerm };
      if (type) prev = { ...prev, type };
      if (offer) prev = { ...prev, offer: offer === "true" ? true : false };
      if (furnished)
        prev = { ...prev, furnished: furnished === "true" ? true : false };
      if (parking)
        prev = { ...prev, parking: parking === "true" ? true : false };
      if (sort) prev = { ...prev, sort };
      if (order) prev = { ...prev, order };
      return prev;
    });
  }, []);

  //* function to get listings data
  const getListings = async () => {
    try {
      setLoading(true);
      setShowMore(false);
      if (!append && searchParams.get("startIndex")) {
        setSearchParams((prev) => {
          prev.delete("startIndex");
          return prev;
        });
      }
      const res = await fetch(`/api/listing?${searchParams.toString()}`);
      const data = await res.json();
      if (data.data.length > 5) setShowMore(true);
      if (append) setListings([...listings, ...data.data]);
      else setListings(data.data);
      setLoading(false);
      setAppend(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListings();
  }, [searchParams]);

  return (
    <div className="md:flex">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:border-b-0">
        <form onSubmit={handleSumbit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              name="searchTerm"
              placeholder="search"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex flex-2 gap-1">
              <input
                type="checkbox"
                name="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input
                type="checkbox"
                name="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input
                type="checkbox"
                name="sell"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sell"}
              />
              <span>Sale</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input
                type="checkbox"
                name="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex flex-2 gap-1">
              <input
                type="checkbox"
                name="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input
                type="checkbox"
                name="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort</label>
            <select
              className="border rounded-lg p-3 focus:outline-none"
              name="sort_order"
              onChange={handleChange}
              value={`${sidebarData.sort}_${sidebarData.order}`}
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-500">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1 p-7">
        <h1 className="text-3xl font-semibold border-b text-slate-700 my-5 py-3">
          Listing Results:
        </h1>
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <p className="text-xl text-center text-slate-700 w-full">
              Loading...
            </p>
          ) : listings.length === 0 ? (
            <p className="text-xl text-slate-700">No Listings Found</p>
          ) : (
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))
          )}
        </div>
        {showMore && (
          <div className="flex justify-center">
            <button
              onClick={handleShowMore}
              className="py-5  text-center text-xl text-slate-700 hover:underline hover:translate-y-[-5px] transition-translate duration-500"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
