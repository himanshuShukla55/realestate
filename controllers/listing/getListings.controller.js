import { ListingModel } from "../../models/listing.model.js";

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let type = req.query.type;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    if (offer === undefined || offer === false) offer = { $in: [false, true] };
    if (furnished === undefined || furnished === false)
      furnished = { $in: [false, true] };
    if (parking === undefined || parking === false)
      parking = { $in: [false, true] };
    if (type === undefined || type === "all") type = { $in: ["rent", "sell"] };

    const listings = await ListingModel.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json({
      success: true,
      message: `${listings.length} listings`,
      data: listings,
    });
  } catch (error) {
    console.log("error in getting all listings");
    next(error);
  }
};
