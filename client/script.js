
const songForm = document.getElementById('songForm');
const randomButton = document.getElementById('randomButton');
const songContainer = document.getElementById('songContainer');
const formMessage = document.getElementById('formMessage');

const songs = [];

const isValidYouTubeLink = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
};

songForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const artist = document.getElementById('artist').value.trim();
    const youtubeLink = document.getElementById('youtubeLink').value.trim();
    const comments = document.getElementById('comments').value.trim();

    if (!title || !artist || !youtubeLink) {
        formMessage.textContent = 'Todos los campos obligatorios deben estar llenos.';
        formMessage.style.color = 'red';
        return;
    }

    if (!isValidYouTubeLink(youtubeLink)) {
        formMessage.textContent = 'Enlace de YouTube inválido.';
        formMessage.style.color = 'red';
        return;
    }

    const song = { title, artist, youtubeLink, comments };
    songs.push(song);

    formMessage.textContent = 'Canción agregada';
    formMessage.style.color = 'green';

    songForm.reset();
});

randomButton.addEventListener('click', () => {
    if (songs.length === 0) {
        songContainer.innerHTML = '<p>No hay canciones ingresadas.</p>';
        return;
    }

    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];

    displaySong(randomSong);
});

function displaySong(song) {
    songContainer.innerHTML = `
        <h3>${song.title} - ${song.artist}</h3>
        <p><strong>Comentarios:</strong> ${song.comments || 'No hay comentarios'}</p>
        <a href="${song.youtubeLink}" target="_blank">Ver en YouTube</a>
        <div>
            <button onclick="rateSong('${song.title}', 1)">★</button>
            <button onclick="rateSong('${song.title}', 2)">★★</button>
            <button onclick="rateSong('${song.title}', 3)">★★★</button>
            <button onclick="rateSong('${song.title}', 4)">★★★★</button>
            <button onclick="rateSong('${song.title}', 5)">★★★★★</button>
            <button onclick="deleteSong('${song.title}')">Eliminar</button>  
        </div>
    `;
}

function rateSong(title, rating) {
    alert(`Calificación registrada para la canción ${title}: ${rating} estrellas.`);
}

function deleteSong(title) {
    const songIndex = songs.findIndex(song => song.title === title);
    
    if (songIndex > -1) {
        songs.splice(songIndex, 1); 
        songContainer.innerHTML = '<p>Canción eliminada de forma exitosa</p>';
    } else {
        songContainer.innerHTML = '<p>Error: No se encontró la canción.</p>';
    }
}
