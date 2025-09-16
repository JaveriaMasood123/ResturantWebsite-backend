import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  eventDate: { type: Date, required: true },
  guests: { type: Number, required: true },
  status: { type: String, default: "Pending" },
});

// 🟢 Yahan default export karo
export default mongoose.model("Order", orderSchema);
