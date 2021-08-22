const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config');

module.exports = {
    create({ _id, email, avatarImg, status, gender }) {
        return jwt.sign({ _id, email, avatarImg, status, gender }, jwt_secret);
    },
    verify(token) {
        return jwt.verify(token, jwt_secret);
    }
};