const assinanteModel = require('../models/assinanteModel.js');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(), // Armazenando os dados em memória
  });

class AssinanteController {
    
    async salvar(req, res) {
        try {
          let assinante = req.body;
      
          const max = await assinanteModel.findOne({}).sort({ codigo: -1 });
          assinante.codigo = max == null ? 1 : max.codigo + 1;
      
          // Verificar se uma imagem foi enviada
          if (req.file) {
            console.log(req.file);
            assinante.imagem = req.file.path;
          }
          
          const resultado = await assinanteModel.create(assinante);
          res.status(201).json(resultado);
        } catch (error) {
          res.status(500).json({ error: 'Erro ao criar o perfil' });
        }
      }

    async listar(req, res) {
        const resultado = await assinanteModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorId(req, res) {
        const codigo = req.params.codigo;
        const resultado = await assinanteModel.findOne({ 'codigo': codigo });
        res.status(200).json(resultado);
    }

    async buscarPorNome(req, res) {
        const nome = req.params.nome;
        const resultado = await assinanteModel.find({ 'nome': nome });
        res.status(200).json(resultado);
    }
    async buscarPorSobrenome(req, res) {
        const sobrenome = req.params.sobrenome;
        const resultado = await assinanteModel.find({ 'sobrenome': sobrenome });
        res.status(200).json(resultado);
    }
    async buscarPorCidade(req, res) {
        const cidade = req.params.cidade;
        const resultado = await assinanteModel.find({ 'cidade': cidade });
        res.status(200).json(resultado);
    }
    async buscarPorEstado(req, res) {
        const estado = req.params.estado;
        const resultado = await assinanteModel.find({ 'estado': estado });
        res.status(200).json(resultado);
    }
    async buscarPorStatus(req, res) {
        const status = req.params.status;
        const resultado = await assinanteModel.find({ 'status': status });
        res.status(200).json(resultado);
    }

    

    /*async atualizar(req, res) {
        const codigo = req.params.codigo;
        const _codigo = String((await assinanteModel.findOne({ 'codigo': codigo }))._codigo);
        await assinanteModel.findByIdAndUpdate(String(_codigo), req.body);
        res.status(200).send();
    }*/

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await assinanteModel.findOne({ 'codigo': codigo }))._id);
        await assinanteModel.findByIdAndUpdate(String(_id), req.body);
        res.status(200).send();
    }

    async excluir(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await assinanteModel.findOne({ 'codigo': codigo }))._id);
        await assinanteModel.findByIdAndRemove(String(_id));
        res.status(200).send();
    }
}

module.exports = new AssinanteController();