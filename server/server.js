const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/music')
    .then(() => console.log('Conexión a la base de datos "music" exitosa.'))
    .catch(err => console.error('Error al conectar con MongoDB:', err));


const songRoutes = require('./routes/songRoutes');
app.use('/api/songs', songRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
