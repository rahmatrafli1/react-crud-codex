import { Router } from "express";
import userRoute from "./user.js";
import itemRoute from "./item.js";

const router = Router();

router.use("/users", userRoute);
router.use("/items", itemRoute);

export default router;
