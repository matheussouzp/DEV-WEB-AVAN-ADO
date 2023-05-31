const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const assinantefotoController = require("../controllers/assinantefotoController");


router.post("/", upload.single("file"), assinantefotoController.salvar);
router.get("/", assinantefotoController.listar);
router.delete("/:usuario_codigo", assinantefotoController.excluir);

module.exports = router;