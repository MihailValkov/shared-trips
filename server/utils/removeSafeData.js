function removeUserPassword(user) {
    const { __v, password, ...data } = user;
    return data;
}

module.exports = {
    removeUserPassword
};