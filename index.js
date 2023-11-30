import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//* importing db connection
import { connection } from "./config/db.js";

import { authRouter } from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { usersRouter } from "./routes/users.route.js";
import { authenticate } from "./middlewares/auth.js";
import { listingRouter } from "./routes/listing.router.js";

dotenv.config();
const app = express();

//* applying middlewares
app.use(express.json());
app.use(cookieParser());

//* routes
app.use("/api/auth", authRouter);
app.use(authenticate);
app.use("/api/users", usersRouter);
app.use("/api/listing", listingRouter);

//* applying error handler
app.use(errorHandler);

const port = process.env.PORT || 8000;
const url = process.env.DBURL;

//*creating the server and connecting to database.
app.listen(port, async () => {
  try {
    await connection(url);
    console.log("connected to database");
  } catch (error) {
    console.log("error in conneting to database");
    console.error(error);
  }
  console.log(`server is listening on port: ${port}`);
});
