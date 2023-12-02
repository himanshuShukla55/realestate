import React from "react";

const Search = () => {
  return (
    <div className="md:flex">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:border-b-0">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              name="searchTerm"
              placeholder="search"
              className="border rounded-lg p-3 w-full focus:outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex flex-2 gap-1">
              <input type="checkbox" name="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input type="checkbox" name="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input type="checkbox" name="sell" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input type="checkbox" name="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex flex-2 gap-1">
              <input type="checkbox" name="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex flex-2 gap-1">
              <input type="checkbox" name="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort</label>
            <select
              className="border rounded-lg p-3 focus:outline-none"
              name="sort_order"
            >
              <option>Price High to Low</option>
              <option>Price Low to High</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-500">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
      </div>
    </div>
  );
};

export default Search;
