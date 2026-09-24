import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createRequest,
  getSellerRequests,
  updateRequestStatus,
} from "../controllers/requestController.js";

const router = express.Router();

router.get("/seller", authMiddleware, getSellerRequests);

router.patch(
  "/:requestId/status",
  authMiddleware,
  updateRequestStatus
);

router.post(
  "/:resourceId",
  authMiddleware,
  createRequest
);

export default router;