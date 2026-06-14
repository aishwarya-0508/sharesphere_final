import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  addResource,
  getAllResources,
  getSellerResources,
  getResourceById,
  updateResource,
  deleteResource,
} from "../controllers/resourceController.js";

const router = express.Router();

router.get("/", getAllResources);
router.get("/all", getAllResources);
router.get("/seller", authMiddleware, getSellerResources);

router.get("/:id", getResourceById);

router.post("/", authMiddleware, addResource);

router.put("/:id", authMiddleware, updateResource);

router.delete("/:id", authMiddleware, deleteResource);

export default router;