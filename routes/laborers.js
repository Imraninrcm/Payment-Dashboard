const express = require("express");

const router = express.Router();

const Laborer = require("../models/Laborer");
const Payment = require("../models/Payment");

// ========================================
// ADD LABORER PAGE
// ========================================

router.get("/add", (req, res) => {
  res.render("laborers/add");
});

// ========================================
// CREATE LABORER
// ========================================

router.post("/add", async (req, res) => {
  try {
    const { name, contactInfo, joiningDate, address, jobRole } = req.body;

    // Generate custom ID
    const laborerId = await Laborer.getNextLaborerId();

    await Laborer.create({
      laborerId,

      name,

      contactInfo,

      joiningDate,

      address,

      jobRole,
    });

    // Return to dashboard
    res.redirect("/");
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to add laborer");
  }
});

// ========================================
// VIEW LABORER
// ========================================

router.get("/:id", async (req, res) => {
  try {
    const laborer = await Laborer.findById(req.params.id);

    if (!laborer) {
      return res.status(404).send("Laborer not found");
    }

    // Get payment history
    const payments = await Payment.find({
      laborerId: laborer._id,
    }).sort({
      paymentDate: -1,
    });

    res.render("laborers/view", {
      laborer,

      payments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to load laborer");
  }
});

module.exports = router;
