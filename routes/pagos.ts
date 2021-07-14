import { Router } from "express";
import { getPagos, postPagos } from "../controllers/pagos";

const router = Router();

router.get("/",   getPagos);
router.post("/",  postPagos);

export default router;
