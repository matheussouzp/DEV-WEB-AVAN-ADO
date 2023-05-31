const express = require('express');
const router = express.Router();
const upload = require("../config/multer");
const assinanteController = require('../controllers/assinanteController');

router.get('/', assinanteController.listar);
router.get('/:codigo', assinanteController.buscarPorId);
router.get('/nome/:nome', assinanteController.buscarPorNome);
router.get('/sobrenome/:sobrenome', assinanteController.buscarPorSobrenome);
router.get('/cidade/:cidade', assinanteController.buscarPorCidade);
router.get('/estado/:estado', assinanteController.buscarPorEstado);
router.get('/status/:status', assinanteController.buscarPorStatus);
router.put('/:codigo', upload.single('imagem'), assinanteController.atualizar);
router.delete('/:codigo', assinanteController.excluir);
router.post('/assinantes', upload.single('imagem'), assinanteController.salvar);

module.exports = router;