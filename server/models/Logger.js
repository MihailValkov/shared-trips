const { Schema, model } = require('mongoose');

const schema = new Schema({
    email: String,
    avatarImg: String,
    action: String,
    message: String,
    time: {
        type: Date,
        default: new Date
    },
    status: String
});

module.exports = model('Logger', schema);