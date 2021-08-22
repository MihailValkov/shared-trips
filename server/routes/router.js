const userRouter = require('./user.js');
const tripRouter = require('./trip.js');
const adminRouter = require('./admin.js');
const { isAdmin } = require('../middlewares/authentication');

module.exports = app => {
    app.use('/api/auth', userRouter);
    app.use('/api/trip', tripRouter);
    app.use('/api/admin', isAdmin(), adminRouter);
};