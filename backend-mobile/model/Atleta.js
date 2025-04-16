const mongoose = require('mongoose');

const AtletaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  imagem: { type: String },
  apostas: { type: Number, default: 0 }
});

module.exports = mongoose.model('Atleta', AtletaSchema);
