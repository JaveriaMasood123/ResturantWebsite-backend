import express from "express";
import Order from "../models/Order.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Create new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const order = new Order({
      customer: req.user.id,
      items: req.body.items,
      eventDate: req.body.eventDate,
      guests: req.body.guests,
    });

    await order.save();

    // 🟢 Populate karke order return karo (item ka naam, price bhi aayega)
    const populatedOrder = await Order.findById(order._id).populate(
      "items.menuItem",
      "name price image"
    );

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 🟢 Get all orders of logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate("items.menuItem", "name price image");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
