const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    code: String,
    name: String,
    borrowedBooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    isPenalized: { type: Boolean, default: false },
    penalizedUntil: Date,
});

module.exports = mongoose.model('Member', memberSchema);
