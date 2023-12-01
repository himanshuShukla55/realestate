import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-slate-700">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            //TODO make it required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            //TODO make it required
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            //TODO make it required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" name="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" name="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                name="parking"
                className="w-5"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                name="furnished"
                className="w-5"
              />
              <span>Frunished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" name="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                //TODO add required
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                //TODO add required
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                className="p-3 border border-gray-300 rounded-lg max-w-[170px]"
                //TODO add required
              />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex gap-2 text-center">
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                className="p-3 border border-gray-300 rounded-lg max-w-[170px]"
                //TODO add required
              />
              <div className="flex flex-col text-center">
                <span>Discounted Price</span>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The First Image will be the cover (max-6).
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <button className="p-3 text-green-700 border border-green-700 rounded-lg hover:shadow-lg disable:opacity-80">
              UPLOAD
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-500 disabled:opacity-80">
            CREATE LISTING
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
