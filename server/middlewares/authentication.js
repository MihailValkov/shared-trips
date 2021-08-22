const tripModel = require('../models/Trip');

function isAuthNeeded(isAuthNeeded = true) {
    return (req, res, next) => {
        const needAuth = !req.user && isAuthNeeded;
        const noNeedAuth = req.user && !isAuthNeeded;
        if (needAuth || noNeedAuth) {
            res.status(403).json({ message: 'Accessing the page or resource you were trying to reach is absolutely forbidden for some reason!' });
            return;
        }
        next();
    };
};

function isOwner() {
    return async (req, res, next) => {
        try {
            const trip = await tripModel.findById(req.params.tripId);
            if ((trip && trip.creator == req.user?._id) || req.user?.status == 'Admin') {
                req.data = { trip, isOwner: true };
                return next();
            }
            res.status(403).json({ message: 'Accessing the page or resource you were trying to reach is absolutely forbidden for some reason!' });
        } catch (error) {
            res.status(400).json({ message: 'Someting went wrong!' });
        }
    };
}
function isAdmin() {
    return async (req, res, next) => {
        return req.user.status === 'Admin'
            ? next()
            : res.status(403).json({ message: 'Accessing the page or resource you were trying to reach is absolutely forbidden for some reason!' });
    };
}

module.exports = {
    isAuthNeeded,
    isOwner,
    isAdmin
};