import { Router } from "express";
import { createPolicy, getPolicies } from "../../../controllers/policy";

const router = Router();

router.get("/", getPolicies);

router.post("/", createPolicy);

export { router as policyRouter };
