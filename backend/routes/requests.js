import express from "express";

const router = express.Router();

// Get all requests
router.get("/", (req, res) => {
  res.json({
    success: true,
    requests: [],
  });
});

// Create request
router.post("/", (req, res) => {
  res.json({
    success: true,
    message: "Request created",
  });
});

export default router;