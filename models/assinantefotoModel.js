const mongoose = require('mongoose');

const assinanteFotoSchema  = new mongoose.Schema({
    
    usuario_codigo: Number,
    src: String
    });
    

module.exports = mongoose.model('assinantesfotos', assinanteFotoSchema);