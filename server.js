// *Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./config/logger");
const {
  errorConvertor,
  errorHandler,
} = require("./middleware/errorMiddleware");
const { authRoutes, formDataRoutes } = require("./routes");
const ApiError = require("./config/error");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const app = express();

//  *MiddleWares
app.use(express.json());
app.use(cors());

//*Routes Place holder
app.use("/api/auth", authRoutes);
app.use("/api/formData", formDataRoutes);

app.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, "Not Found"));
});

// *Error Handlers
app.use(errorConvertor);
app.use(errorHandler);

// *MongoDB Connection
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    logger.info(`Connected To DataBase `);

    // *Server Connection
    app.listen(process.env.PORT || 5000, () => {
      logger.info(`Server Started at port no:${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log("🚀 ~ file: server.js:40 ~ error:", error);
    logger.error(`Error With DataBase Connection ${error}`);
  });
