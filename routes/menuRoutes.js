import express from "express";
import MenuItem from "../models/MenuItem.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// get all menu items (public)
router.get("/", async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add new menu item (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const item = new MenuItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
