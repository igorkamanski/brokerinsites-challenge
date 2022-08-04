import { Router } from "express";
import { customerRouter } from "./customer";
import { insurerRouter } from "./insurer";
import { policyRouter } from "./policy";
import { policyTypeRouter } from "./policyType";

const router = Router();

router.use("/customer", customerRouter);
router.use("/insurer", insurerRouter);
router.use("/policy", policyRouter);
router.use("/policy-type", policyTypeRouter);

export { router as v1Router };
