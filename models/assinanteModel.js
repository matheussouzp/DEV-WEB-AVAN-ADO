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
    status: String
    
    });
    

module.exports = mongoose.model('assinantes', assinanteSchema);