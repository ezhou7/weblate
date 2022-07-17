import { Router } from "express";

import pingRouter from "./routes/ping";

const router = Router();

router.use("/ping", pingRouter);

export default router;
