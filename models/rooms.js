const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maxcount: {
        type: Number,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    rentperday: {
        type: Number,
        required: true,
    },
    imageurls: [],
    currentsbookings: [],
    type: {
        type: String,
        required: true,
    },
    description: {  // Fixed the typo in 'description'
        type: String,
        required: true,
    },
}, {
    timestamps: true,  // Corrected the option name to 'timestamps'
});

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel;
