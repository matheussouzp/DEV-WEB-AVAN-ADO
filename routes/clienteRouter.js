const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorId);
router.put('/:codigo', upload.single('imagem'), clienteController.atualizar);
router.delete('/:codigo', clienteController.excluir);
router.post('/', upload.single('imagem'), clienteController.salvar);
router.post('/login', clienteController.autenticar);
router.get('/validar', clienteController.validarToken);


module.exports = router;