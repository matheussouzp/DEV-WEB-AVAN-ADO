const express = require('express');
const router = express.Router();
const assinanteController = require('../controllers/assinanteController');

router.get('/', assinanteController.listar);
router.post('/', assinanteController.salvar);
router.get('/:codigo', assinanteController.buscarPorId);
router.get('/nome/:nome', assinanteController.buscarPorNome);
router.get('/sobrenome/:sobrenome', assinanteController.buscarPorSobrenome);
router.get('/cidade/:cidade', assinanteController.buscarPorCidade);
router.get('/estado/:estado', assinanteController.buscarPorEstado);
router.get('/status/:status', assinanteController.buscarPorStatus);
router.put('/:codigo', assinanteController.atualizar);
router.delete('/:codigo', assinanteController.excluir);

module.exports = router;