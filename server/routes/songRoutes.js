const express = require('express');
const router = express.Router();
const Song = require('../models/Song');

const isValidYouTubeLink = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
};


router.post('/', async (req, res) => {
    try {
        const { title, artist, youtubeLink, comments } = req.body;

        if (!title || !artist || !youtubeLink) {
            console.error('Datos faltantes:', { title, artist, youtubeLink });
            return res.status(400).json({ success: false, message: 'Todos los campos obligatorios deben estar llenos.' });
        }

        if (!isValidYouTubeLink(youtubeLink)) {
            console.error('Enlace de YouTube inválido:', youtubeLink);
            return res.status(400).json({ success: false, message: 'Enlace de YouTube inválido.' });
        }

        const newSong = new Song({ title, artist, youtubeLink, comments });
        await newSong.save();

        res.status(201).json({ success: true, message: 'Canción agregada con éxito.', song: newSong });
    } catch (err) {
        console.error('Error al guardar la canción:', err);
        res.status(500).json({ success: false, message: 'Error interno al guardar la canción.' });
    }
});

module.exports = router;
