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
const public_novel_router = require("./routes/public/novelRoute");
// PROTECTED ROUTES
const protected_user_router = require("./routes/protected/userRoute");
const protected_review_router = require("./routes/protected/reviewRoute");
// ADMIN ROUTES
const admin_auth_router = require("./routes/admin/authRoute");
const admin_author_router = require("./routes/admin/authorRoute");
const admin_novel_router = require("./routes/admin/novelRoute");
const admin_review_router = require("./routes/admin/reviewRoute");
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
app.use("/api/v1/public/novel", public_novel_router);
// PROTECTED ROUTERS
app.use("/api/v1/protected/user", authUser, protected_user_router);
app.use("/api/v1/protected/review", authUser, protected_review_router);
// ADMIN ROUTERS
app.use("/api/v1/admin/authentication", admin_auth_router);
app.use("/api/v1/admin/author", authAdmin, admin_author_router);
app.use("/api/v1/admin/novel", authAdmin, admin_novel_router);
app.use("/api/v1/admin/review", authAdmin, admin_review_router);

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
