import express from "express";

import { getTranslate } from "../controllers/getTranslate.js";
import middle from "../middleware/caching.js"
const router = express.Router();


router.post("/", middle, getTranslate)

export default router;