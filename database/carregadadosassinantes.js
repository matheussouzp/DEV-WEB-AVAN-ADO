require("./mongodb");
const mongoose = require("mongoose");
const assinanteModel = require("../models/assinanteModel");
const assinantes = require ("./assinantes.json");

async function carregaDadosAssinantes() {
    try {
        await assinanteModel.deleteMany({});
        for(const assinante of assinantes) {
            await assinanteModel.create(assinante);
        }
        console.log("Carga de filmes feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}


carregaDadosAssinantes();