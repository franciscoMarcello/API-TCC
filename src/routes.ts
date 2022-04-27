import { Router } from "express";
import ChamadoController from "./controllers/ChamadosController";
import { CustomerController } from "./controllers/CustomerController";

const router = Router();
const customer = new CustomerController();
const chamado = new ChamadoController()

router.post("/customer", customer.create);
router.post("/auth", customer.auth);
router.post('/chamado', chamado.create)

export default router;
