require("dotenv").config();
require("express-async-errors");

// EXTRA SECURITY PACKAGES
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// APP
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const { authUser, authAdmin } = require("./middleware/authentication");

// PUBLIC ROUTES
const public_auth_router = require("./routes/public/authRoute");
// ADMIN ROUTES
const admin_auth_router = require("./routes/admin/authRoute");

// ERROR HANDLER
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// INITIAL APP
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());

// PUBLIC ROUTERS
app.use("/api/v1/public/authentication", public_auth_router);
// ADMIN ROUTERS
app.use("/api/v1/admin/authentication", admin_auth_router);

// ERROR HANDLER
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
