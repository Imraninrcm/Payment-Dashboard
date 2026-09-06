const express = require("express");

const router = express.Router();

const Laborer = require("../models/Laborer");
const Payment = require("../models/Payment");

// ========================================
// DASHBOARD
// ========================================

router.get("/", async (req, res) => {
  try {
    // Get all laborers
    const laborers = await Laborer.find().sort({
      laborerId: 1,
    });

    // Get all payments
    const payments = await Payment.find().populate("laborerId").sort({
      paymentDate: -1,
    });

    res.render("dashboard", {
      laborers,
      payments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to load dashboard");
  }
});

module.exports = router;
