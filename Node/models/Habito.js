const mongoose = require('mongoose');

const Visualizacion = Object.freeze({
  Tick: 'tick',
  Barra: 'barra'
});

const Frecuencia = Object.freeze({
  Dia: 'dia',
  Semana: 'semana',
  Mes: 'mes',
  Ano: 'ano'
});

const HabitoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  visualizacion: {
    type: String,
    enum: Object.values(Visualizacion),
  },
  posicionLista: Number,
  ultimoReset: Date,
});

Object.assign(HabitoSchema.statics, {
  Visualizacion,
  Frecuencia,
});

module.exports = mongoose.model('Habito', HabitoSchema);