import { Router } from "express";
import { ChamadoController } from "./controllers/ChamadosController";
import { CustomerController } from "./controllers/CustomerController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from "./config/multer";
import multer from "multer";
const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));
router.post(
  "/customer",
  upload.single("picture"),
  new CustomerController().create
);
router.post("/auth", new CustomerController().auth);
router.post("/chamado", isAuthenticated, new ChamadoController().create);

export default router;
