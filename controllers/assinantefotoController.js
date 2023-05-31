const fs = require("fs");
const assinantefotoModel = require("../models/assinantefotoModel");

class AssinanteFotoController {
  async salvar(req, res) {
    const {usuario_codigo} = req.body;
    const file = req.file;

    const foto = new assinantefotoModel({
      usuario_codigo,
      src: file.path,
    });
    const resultado = await assinantefotoModel.create(foto);
    res.status(201).json(resultado);
}catch (error) {
    res.status(500).json({ error: 'Erro ao criar o perfil' });
}
 
 

  async listar(req, res) {
    const resultado = await assinantefotoModel.find({});
    res.status(200).json(resultado);
  }

  
 
  async excluir(req, res) {
    const usuario_codigo = req.params.usuario_codigo;
    const _id = String((await assinantefotoModel.findOne({ 'usuario_codigo': usuario_codigo }))._id);
    await assinantefotoModel.findByIdAndRemove(String(_id));
    res.status(200).send();
}
}

module.exports = new AssinanteFotoController();