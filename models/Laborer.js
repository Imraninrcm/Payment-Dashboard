const mongoose = require("mongoose");
const Counter = require("./Counter");

const laborerSchema = new mongoose.Schema(
  {
    // Custom human-readable ID
    // 1, 2, 3, 4...
    laborerId: {
      type: Number,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    contactInfo: {
      type: String,
      trim: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    address: {
      type: String,
      trim: true,
    },

    jobRole: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// ========================================
// GENERATE NEXT LABORER ID
// ========================================

laborerSchema.statics.getNextLaborerId = async function () {
  const counter = await Counter.findOneAndUpdate(
    {
      _id: "laborerId",
    },

    {
      $inc: {
        seq: 1,
      },
    },

    {
      new: true,
      upsert: true,
    },
  );

  return counter.seq;
};

module.exports = mongoose.model("Laborer", laborerSchema);
