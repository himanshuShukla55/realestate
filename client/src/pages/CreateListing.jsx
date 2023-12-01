import React, { useState } from "react";
import { storeImage } from "../utils/firebase";
import { MdDelete } from "react-icons/md";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  //* function to upload preview images
  const handleImageSubmit = () => {
    setImageUploadError(false);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      setUploading(true);
      for (let i = 0; i < files.length; i++) promises[i] = storeImage(files[i]);
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setUploading(false);
          setFiles([]);
        })
        .catch((error) => {
          setUploading(false);
          setImageUploadError("image upload failed! max size :  2mb/image");
        });
    } else if (files.length === 0 && formData.imageUrls.length < 6)
      setImageUploadError("please select an image first!");
    else setImageUploadError("You can upload max 6 images!");
  };

  //* function to delete preview image
  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, ind) => index !== ind),
    });
  };
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
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
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
                required
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
                required
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                className="p-3 border border-gray-300 rounded-lg max-w-[170px]"
                required
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
                required
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
          <div className="flex gap-4 items-start">
            <div>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded-lg w-full"
              />
              {imageUploadError && (
                <p className="text-sm text-red-600 p-1">{imageUploadError}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-[14.5px] text-green-700 border border-green-700 rounded-lg hover:shadow-lg disabled:opacity-80"
              disabled={uploading}
            >
              {uploading ? "UPLOAING..." : "UPLOAD"}
            </button>
          </div>
          {formData.imageUrls.length > 0 && (
            <>
              <h3 className="font-semibold text-slate-700">Images Preview</h3>
              <div className="max-h-[292px] overflow-y-scroll">
                {formData.imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-3 border-2 rounded-lg items-center mb-4"
                  >
                    <img
                      src={url}
                      alt="listing-preview-image"
                      className="w-[150px] h-[100px] object-contain rounded-lg"
                    />
                    <MdDelete
                      className="text-red-500 w-10 h-10 hover:cursor-pointer"
                      onClick={() => handleImageDelete(index)}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-500 disabled:opacity-80">
            CREATE LISTING
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
