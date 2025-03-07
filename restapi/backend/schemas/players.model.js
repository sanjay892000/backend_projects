const { default: mongoose } = require("mongoose");

const playerSchema = new mongoose.Schema({
    player_id: {
        type: Number,
        required: true,
        unique: true,
        min: 75600

    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    birth_place: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;