const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    youtubeLink: { type: String, required: true },
    comments: { type: String },
    votes: { type: [Number], default: [] } 
});


songSchema.methods.getAverageVote = function() {
    if (this.votes.length === 0) return 0;
    const sum = this.votes.reduce((acc, curr) => acc + curr, 0);
    return (sum / this.votes.length).toFixed(1); 
};

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
