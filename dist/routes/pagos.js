"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pagos_1 = require("../controllers/pagos");
var router = express_1.Router();
router.get("/", pagos_1.getPagos);
router.post("/", pagos_1.postPagos);
exports.default = router;
//# sourceMappingURL=pagos.js.map