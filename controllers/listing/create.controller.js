import { ListingModel } from "../../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await ListingModel.create({
      ...req.body,
      userRef: req.userId,
    });
    res.status(201).json({
      success: true,
      message: "Listing successfully created.",
      data: listing._doc,
    });
  } catch (error) {
    console.error("error while creating the listing!");
    next(error);
  }
};
