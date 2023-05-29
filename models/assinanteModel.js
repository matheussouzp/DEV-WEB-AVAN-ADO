const mongoose = require('mongoose');

const assinanteSchema  = new mongoose.Schema({
    codigo: Number,
    nome: String,
    sobrenome: String,
    dataNascimento: Date,
    telefone: String,
    endereco: String,  
    cidade: String, 
    estado: String,
    status: String, 
    imagemPerfil: String
    /*imagemPerfil: {
      data: Buffer,
      contentType: String
    }*/
    });
    

module.exports = mongoose.model('assinantes', assinanteSchema);