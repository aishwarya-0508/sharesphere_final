import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    condition: { type: String, default: "Good" },
    status: { type: String, default: "Available" },
    location: { type: String, default: "" },

    // ✅ FIXED FIELD NAME
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);