module.exports = (error) => {
    return error.message.includes('Path')
        ? 'Please fullfil all fields!'
        : Object.values(error.errors)[0]?.properties?.message;
};