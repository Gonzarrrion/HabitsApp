const express = require('express');
const mongoose = require('mongoose');
const Habito = require('./models/Habito');
const path = require('path');

// Crea una aplicación Express
const app = express();

// Define la URI de tu base de datos
const URI = 'mongodb+srv://user:6nMR89zH@cluster0.kwn9cfb.mongodb.net/';

// Conecta a la base de datos
mongoose.connect(URI).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));;


/*6. Define una ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});*/

// Después de todas tus rutas
app.use(express.static(path.join(__dirname, '../Habits/dist/habits/browser')));

app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../Habits/dist/habits/browser/index.html')) });


// 7. Inicia tu servidor Express
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

