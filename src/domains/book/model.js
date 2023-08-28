const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    code: String,
    title: String,
    author: String,
    stock: Number,
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
    },
    borrowedAt: Date,
    returnedAt: Date,
});

module.exports = mongoose.model('Book', bookSchema);
