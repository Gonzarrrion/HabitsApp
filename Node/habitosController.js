// habitosController.js

const Habito = require('./models/Habito');

// Obtener todos los hábitos
async function getHabitos(req, res) {
  const habitos = await Habito.find();
  res.json(habitos);
}

// Obtener un hábito por ID
async function getHabitoById(req, res) {
  const habito = await Habito.findById(req.params.id);
  if (habito) {
    res.json(habito);
  } else {
    res.status(404).send('Hábito no encontrado');
  }
}

// Añadir un nuevo hábito
async function addHabito(req, res) {
  const nuevoHabito = new Habito(req.body);
  const resultado = await nuevoHabito.save();
  res.status(201).json(resultado);
}

// Actualizar un hábito
async function updateHabito(req, res) {
  const habito = await Habito.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (habito) {
    res.json(habito);
  } else {
    res.status(404).send('Hábito no encontrado');
  }
}

// Eliminar un hábito
async function deleteHabito(req, res) {
  const habito = await Habito.findByIdAndRemove(req.params.id);
  if (habito) {
    res.send('Hábito eliminado');
  } else {
    res.status(404).send('Hábito no encontrado');
  }
}

module.exports = {
  getHabitos,
  getHabitoById,
  addHabito,
  updateHabito,
  deleteHabito
};