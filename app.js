const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ========================================
// IMPORT ROUTES
// ========================================

const dashboardRoutes = require("./routes/dashboard");
const laborerRoutes = require("./routes/laborers");
const paymentRoutes = require("./routes/payments");

// ========================================
// MONGODB CONNECTION
// ========================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// ========================================
// EXPRESS CONFIGURATION
// ========================================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Parse JSON data
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ========================================
// ROUTES
// ========================================

app.use("/", dashboardRoutes);
app.use("/laborers", laborerRoutes);
app.use("/payments", paymentRoutes);

// ========================================
// 404
// ========================================

app.use((req, res) => {
  res.status(404).send("Page not found");
});

// ========================================
// SERVER
// ========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
