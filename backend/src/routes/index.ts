import { Router } from "express";
import { apiRouter } from "./api/api.routes";

const router = Router();

router.use("/api", apiRouter);

export { router };
