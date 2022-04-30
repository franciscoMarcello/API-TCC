import { Router } from "express";
import ChamadoController from "./controllers/ChamadosController";
import { CustomerController } from "./controllers/CustomerController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from "./config/multer";
import multer from "multer";
const router = Router();
const customer = new CustomerController();
const chamado = new ChamadoController()

const upload = multer(uploadConfig.upload("./tmp"));
router.post("/customer", upload.single('picture'), customer.create);
router.post("/auth", customer.auth);
router.post('/chamado', isAuthenticated, chamado.create)

export default router;
