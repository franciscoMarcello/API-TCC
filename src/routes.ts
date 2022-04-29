import { Router } from "express";
import ChamadoController from "./controllers/ChamadosController";
import { CustomerController } from "./controllers/CustomerController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();
const customer = new CustomerController();
const chamado = new ChamadoController()

router.post("/customer", customer.create);
router.post("/auth", customer.auth);
router.post('/chamado', isAuthenticated, chamado.create)

export default router;
