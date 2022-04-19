import { Router } from "express";
import { CustomerController } from "./controllers/CustomerController";

const router = Router();
const customer = new CustomerController();

router.post("/customer", customer.create);
router.post("/auth", customer.auth);

export default router;
