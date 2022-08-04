import { Router } from "express";
import {
  createPolicyType,
  getPolicyTypes,
} from "../../../controllers/policyType";

const router = Router();

router.get("/", getPolicyTypes);

router.post("/", createPolicyType);

export { router as policyTypeRouter };
