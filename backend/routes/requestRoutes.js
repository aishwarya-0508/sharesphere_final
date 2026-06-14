import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createRequest,
} from "../controllers/requestController.js";

const router = express.Router();

router.post(
  "/:resourceId",
  authMiddleware,
  createRequest
);

export default router;