// habitosController.js

const Habito = require('./models/Habito');

// Obtener todos los hábitos
async function getHabitos(req, res) {
  const habitos = await Habito.find();
  res.json(habitos);
}

// Obtener un hábito por ID
async function getHabitoById(req, res) {
  try {
    const habito = await Habito.findOne({ id: req.params.id });
    if (!habito) {
      return res.status(404).json({ message: 'Habito no encontrado' });
    }
    res.json(habito);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Añadir un nuevo hábito
async function addHabito(req, res) {
  const nuevoHabito = new Habito(req.body);

  // Obtén el hábito con la ID más alta y agrega 1 para la nueva ID
  const ultimoHabito = await Habito.findOne().sort('-id');
  nuevoHabito.id = ultimoHabito ? ultimoHabito.id + 1 : 1;

  // Establece los valores predeterminados para los otros campos
  nuevoHabito.progreso = 0;
  nuevoHabito.cumplidos = 0;
  nuevoHabito.posicionLista = ultimoHabito ? ultimoHabito.posicionLista + 1 : 1;
  nuevoHabito.ultimoReset = new Date();

  const resultado = await nuevoHabito.save();
  res.status(201).json(resultado);
}

// Actualizar un hábito
async function updateHabito(req, res) {
  try {
    const habito = await Habito.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!habito) {
      return res.status(404).send('Hábito no encontrado');
    }
    res.json(habito);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

/// Eliminar un hábito
async function deleteHabito(req, res) {
  try {
    const habito = await Habito.findOneAndDelete({ id: req.params.id });
    if (!habito) {
      return res.status(404).json({ message: 'Hábito no encontrado' });
    }
    res.json({ message: 'Hábito eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getHabitos,
  getHabitoById,
  addHabito,
  updateHabito,
  deleteHabito
};