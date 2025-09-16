import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// Create inquiry
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const inquiry = new Inquiry({ name, email, message });
    await inquiry.save();

    res.status(201).json({ message: "Inquiry saved", inquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
