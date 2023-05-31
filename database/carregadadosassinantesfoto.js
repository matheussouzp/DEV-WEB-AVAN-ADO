require("./mongodb");
const mongoose = require("mongoose");
const assinanteFotoModel = require("../models/assinanteFotoModel");
const assinantesFotos = require ("./assinantesfoto.json");

async function carregaDadosAssinantesFotos() {
    try {
        await assinanteFotoModel.deleteMany({});
        for(const assinanteFoto of assinantesFotos) {
            await assinanteFotoModel.create(assinanteFoto);
        }
        console.log("Carga de filmes feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}


carregaDadosAssinantesFotos();