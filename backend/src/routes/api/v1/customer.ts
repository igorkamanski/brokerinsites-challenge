import { Router } from "express";
import { createCustomer, getCustomers } from "../../../controllers/customer";

const router = Router();

router.route("/").get(getCustomers).post(createCustomer);

export { router as customerRouter };
