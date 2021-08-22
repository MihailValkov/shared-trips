const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { rounds, defaultFields } = require('../config/config');

const schema = new Schema({
    email: {
        type: String,
        required: true,
        match: [/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/, 'Email is not valid!']
    },
    username: {
        type: String,
        default: 'Username',
        minLength: [4, 'Username should be at least 4 characters long!']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password should be at least 4 characters long!']
    },
    gender: {
        type: String,
        required: true
    },
    company: {
        type: String,
        default: 'Company',
        minLength: [3, 'Company should be at least 3 characters long!']
    },
    city: {
        type: String,
        default: 'City',
        minLength: [3, 'City should be at least 3 characters long!']
    },
    profession: {
        type: String,
        default: 'Profession',
        minLength: [3, 'Profession should be at least 3 characters long!']
    },
    avatarImg: {
        type: String,
        default: function () {
            return this.gender === 'male' ? defaultFields.male : defaultFields.female;
        }
    },
    coverImg: {
        type: String,
        default: defaultFields.coverImage
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString()
    },
    status: {
        type: String,
        enum: ['Member', 'Admin'],
        default: 'Member'
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    createdTrips: [{ type: Schema.Types.ObjectId, ref: 'Trip' }]
});

schema.methods.comparePasswords = function (pass) {
    return bcrypt.compare(pass, this.password);
};

schema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hash = await bcrypt.hash(this.password, rounds);
            this.password = hash;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = model('User', schema);