import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import adminAuth from "../middleware/adminAuth.js";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});
foodRouter.post("/add", adminAuth, upload.single("image"), addFood);
foodRouter.get("/list", listFood);
ffoodRouter.post("/remove", adminAuth, removeFood);

export default foodRouter;
