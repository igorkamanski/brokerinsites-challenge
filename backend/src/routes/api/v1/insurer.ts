import { Router } from "express";
import { createInsurer, getInsurers } from "../../../controllers/insurer";

const router = Router();

router.route("/").get(getInsurers).post(createInsurer);

export { router as insurerRouter };
