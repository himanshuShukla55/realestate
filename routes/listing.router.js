import express from "express";
import {
  createListing,
  getListing,
  getListings,
} from "../controllers/listing/index.js";
import { authenticate } from "../middlewares/auth.js";

export const listingRouter = express.Router();

listingRouter.get("/", getListings);

listingRouter.use(authenticate);

listingRouter.post("/create", createListing);
listingRouter.get("/:id", getListing);
