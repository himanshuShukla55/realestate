import { ListingModel } from "../../models/listing.model.js";
import { customError } from "../../utils/customError.js";

export const getListing = async (req, res, next) => {
  const id = req.params.id;
  try {
    const listing = await ListingModel.findOne({ _id: id });
    if (!listing) customError(404, "Listing not found");
    res.status(200).json({
      success: true,
      message: "got listing!",
      data: listing._doc,
    });
  } catch (error) {
    console.log("error while getting a listing");
    next(error);
  }
};
