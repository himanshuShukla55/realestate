import React, { useState } from "react";
import { storeImage } from "../utils/firebase";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const initialFormState = {
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    imageUrls: [],
  };
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //* function to handle formData change
  const handleChange = ({ target: { name, checked, value, type } }) => {
    if (name === "sell" || name === "rent")
      setFormData({ ...formData, type: name });
    else if (name === "offer" || name === "parking" || name === "furnished")
      setFormData({ ...formData, [name]: checked });
    else {
      if (type === "number") setFormData({ ...formData, [name]: +value });
      else setFormData({ ...formData, [name]: value });
    }
  };

  //*function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      if (formData.imageUrls.length < 1) {
        const error = new Error();
        error.message = "You need to upload atleast one image!";
        throw error;
      }
      if (formData.regularPrice <= formData.discountPrice) {
        const error = new Error();
        error.message = "Discounted price should be less than Regular Price";
        throw error;
      }
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) setError(data.message);
      else {
        setFormData(initialFormState);
        navigate(`/listing/${data.data._id}`);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

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
      {error && (
        <p className="bg-red-500 text-white text-center p-3 rounded-lg my-4">
          {error}
        </p>
      )}
      <form
        className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength={62}
            minLength={10}
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="border p-3 rounded-lg"
            onChange={handleChange}
            value={formData.description}
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="sell"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Frunished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="bedrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
                required
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="bathrooms"
                min="1"
                max="10"
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
                required
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                name="regularPrice"
                className="p-3 border border-gray-300 rounded-lg w-[170px]"
                onChange={handleChange}
                value={formData.regularPrice}
                min={50}
                max={1000000}
                required
              />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                {formData.type === "rent" && (
                  <span className="text-xs">($/month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex gap-2 text-center">
                <input
                  type="number"
                  name="discountPrice"
                  className="p-3 border border-gray-300 rounded-lg w-[170px]"
                  onChange={handleChange}
                  value={formData.discountPrice}
                  required
                />
                <div className="flex flex-col text-center">
                  <span>Discounted Price</span>
                  {formData.type === "rent" && (
                    <span className="text-xs">($/month)</span>
                  )}
                </div>
              </div>
            )}
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
              className="p-[14.5px] text-green-700 border border-green-700 rounded-lg hover:shadow-lg disabled:opacity-80 disabled:cursor-not-allowed"
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
          <button
            className="p-3 bg-slate-700 text-white rounded-lg hover:bg-slate-500 disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={loading || uploading}
          >
            {loading ? "CREATING..." : "CREATE LISTING"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
