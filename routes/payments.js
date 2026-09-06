const express = require("express");

const router = express.Router();

const Laborer = require("../models/Laborer");
const Payment = require("../models/Payment");

// ========================================
// ADD PAYMENT PAGE
// ========================================

router.get("/add", async (req, res) => {
  try {
    const laborers = await Laborer.find({
      isActive: true,
    }).sort({
      laborerId: 1,
    });

    res.render("payments/add", {
      laborers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to load laborers");
  }
});

// ========================================
// CREATE PAYMENT
// ========================================

router.post("/add", async (req, res) => {
  try {
    const { laborerId, amount, paymentDate, remarks } = req.body;

    // Basic validation
    if (!laborerId || !amount || !paymentDate || !remarks || !remarks.trim()) {
      return res.status(400).send("All payment fields are required");
    }

    // Check laborer
    const laborer = await Laborer.findById(laborerId);

    if (!laborer) {
      return res.status(404).send("Laborer not found");
    }

    // Create payment
    const payment = await Payment.create({
      laborerId: laborer._id,

      amount: Number(amount),

      paymentDate,

      remarks: remarks.trim(),
    });

    // Open printable slip
    res.redirect(`/payments/${payment._id}/slip`);
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to add payment");
  }
});

// ========================================
// PRINTABLE PAYMENT SLIP
// ========================================

router.get("/:id/slip", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("laborerId");

    if (!payment) {
      return res.status(404).send("Payment not found");
    }

    res.render("payments/slip", {
      payment,

      laborer: payment.laborerId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to load payment slip");
  }
});

module.exports = router;
