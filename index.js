import express from "express";
import dotenv from "dotenv";

//* importing db connection
import { connection } from "./config/db.js";
import { authRouter } from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

//* applying middlewares
app.use(express.json());

//* routes
app.use("/auth", authRouter);

//* applying error handler
app.use(errorHandler);

const port = process.env.PORT || 8000;
const url = process.env.DBURL;

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
