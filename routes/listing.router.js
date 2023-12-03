import express from "express";
import {
  createListing,
  getListing,
  getListings,
} from "../controllers/listing/index.js";
import { authenticate } from "../middlewares/auth.js";

export const listingRouter = express.Router();

listingRouter.get("/", getListings);
listingRouter.get("/:id", getListing);

listingRouter.post("/create", authenticate, createListing);
