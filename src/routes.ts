import { Router } from "express";
import { ChamadoController } from "./controllers/ChamadosController";
import { CustomerController } from "./controllers/CustomerController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from "./config/multer";
import multer from "multer";
import { TecnicController } from "./controllers/TecnicController";
const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));
//Customer
router.post(
  "/customer",
  upload.single("picture"),
  new CustomerController().create
);

router.post("/auth", new CustomerController().auth);

//Tecnic
router.post("/tecnic", upload.single("picture"), new TecnicController().create)
router.post("/tecnic/auth", new TecnicController().auth)
//Chamados
router.post("/chamado", isAuthenticated, new ChamadoController().create);
router.patch("/chamado", isAuthenticated, new ChamadoController().assumir)
router.get("/chamados", isAuthenticated, new ChamadoController().chamados)
export default router;
