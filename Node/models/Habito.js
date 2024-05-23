const mongoose = require('mongoose');

const Frecuencia = Object.freeze({
  Dia: 'dia',
  Semana: 'semana',
  Mes: 'mes',
  Ano: 'ano'
});

const HabitoSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  descripcion: String,
  progreso: Number,
  cumplidos: Number,
  meta: Number,
  frecuencia: {
    type: String,
    enum: Object.values(Frecuencia),
  },
  posicionLista: Number,
  ultimoReset: Date,
});

Object.assign(HabitoSchema.statics, {
  Frecuencia,
});

module.exports = mongoose.model('Habito', HabitoSchema);