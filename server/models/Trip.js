const { Schema, model } = require('mongoose');

const schema = new Schema({
    startPoint: {
        type: String,
        required: true,
        minLength: [4, 'Starting Point should be at least 4 characters long!']
    },
    endPoint: {
        type: String,
        required: true,
        minLength: [4, 'End Point should be at least 4 characters long!']
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true,
        min: [0, 'Seats must be a positive number in range 0-4!'],
        max: [4, 'Seats must be a positive number in range 0-4!']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least 10 characters long!']
    },
    carImage: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Image Url is not valid!']
    },
    carBrand: {
        type: String,
        required: true,
        minLength: [4, 'Car Brand should be at least 2 characters long!']
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be a positive number in range 1-50!'],
        max: [50, 'Price must be a positive number in range 1-50!']
    },
    smoking: {
        type: Boolean,
        default: false
    },
    eating: {
        type: Boolean,
        default: false
    },
    drinking: {
        type: Boolean,
        default: false
    },
    climatic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString()
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    buddies: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = model('Trip', schema);
