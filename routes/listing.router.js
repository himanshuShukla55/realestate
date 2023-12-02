import express from "express";
import { createListing, getListing } from "../controllers/listing/index.js";

export const listingRouter = express.Router();

listingRouter.post("/create", createListing);
listingRouter.get("/:id", getListing);
