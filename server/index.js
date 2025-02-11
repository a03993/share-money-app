const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const expenseRoutes = require("./expenseRoutes");
const settlementRoutes = require("./settlementRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", expenseRoutes);
app.use("/api", settlementRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
