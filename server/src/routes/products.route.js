import express, { json } from "express";
import {
  allProducts,
  deleteProduct,
  productCreate,
  singleProduct,
  updateProduct,
} from "../controllers/products.controller.js";
import { productValidator } from "../validators/products.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
import uploads from "../config/multer.config.js";
const router = express.Router();

router.post(
  "/",
  authenticate,
  (req, res, next) => {
    if (req.user.role != "seller") {
      return res.status(403).json({
        message: "User is not authorized",
      });
    }
    next();
  },
  uploads.array("images"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes));
    next();
  },
  productValidator,
  productCreate,
);

router.get("/", authenticate, allProducts);

router.get("/:id", authenticate, singleProduct);

router.delete(
  "/:id",
  authenticate,
  (req, res, next) => {
    if (req.user.role != "seller") {
      return res.status(403).json({
        message: "User is not authorized to delete products",
      });
    }
    next();
  },
  deleteProduct,
);

router.put("/:id",authenticate,(req, res, next) => {
    if (req.user.role != "seller") {
      return res.status(403).json({
        message: "User is not authorized to delete products",
      });
    }
    next();
  },updateProduct)

export default router;
