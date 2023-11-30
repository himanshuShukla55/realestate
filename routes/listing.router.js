import express from "express";
import { createListing } from "../controllers/listing/index.js";

export const listingRouter = express.Router();

listingRouter.post("/create", createListing);
