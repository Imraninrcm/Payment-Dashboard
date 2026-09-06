const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // Payment amount entered manually
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Date when payment was made
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    // Laborer who received the payment
    laborerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laborer",
      required: true,
    },

    // Payment remarks
    // This is TEXT only.
    remarks: {
      type: String,
      required: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Payment", paymentSchema);
