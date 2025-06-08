import { Router } from "express";
import { getNameAge } from "../controllers/name.controller";

const router = Router();

router.get("/", getNameAge);

export default router;
